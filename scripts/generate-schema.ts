import { promises as fs } from 'node:fs';
import { join } from 'node:path';
import yaml from 'yaml';
import type { Category, Schema } from '../src/data/types.def.js';

interface Case {
  // for matching:
  regex?: string;
  all?: string[];
  any?: string[];
  exact?: string;

  // for data:
  example?: string;
  value: string;
  description?: string;
}

interface Yaml {
  features: {
    country?: string;
    description: string;
    exampleIcon?: string;
    icon: {
      default: string;
      match?: string;
      cases?: Case[];
    }[];
    tags: { tag: string; value?: string; any: string[] }[];
  }[];
}

const LATEST_COMMIT = await fetch(
  'https://api.github.com/repos/hiddewie/OpenRailwayMap-vector/commits?sha=master',
)
  .then((r) => r.json())
  .then((commits): string => commits[0].sha);

const signals: Yaml = await fetch(
  `https://github.com/hiddewie/OpenRailwayMap-vector/raw/${LATEST_COMMIT}/features/signals_railway_signals.yaml`,
)
  .then((r) => r.text())
  .then(yaml.parse);

function iconToUrl(fileName: string) {
  return `https://raw.githubusercontent.com/hiddewie/OpenRailwayMap-vector/${LATEST_COMMIT}/symbols/${fileName}.svg`;
}

const grouped: Schema.Root = {};

for (const signal of signals.features) {
  if (!signal.country) continue; // skip global features

  const mainTag = signal.tags.find((tag) => {
    const [a, b, c, d] = tag.tag.split(':');
    return a === 'railway' && b === 'signal' && c && !d;
  });
  if (!mainTag) {
    console.error(`no main tag for '${signal.description}', skipping`);
    continue;
  }

  const form = signal.tags.find((tag) => tag.tag.endsWith(':form'));

  const cat = mainTag.tag.split(':')[2]! as Category;
  const mainValue = mainTag.value || mainTag.any![0]!;
  const key = `${signal.country}/${cat}/${mainValue}`;
  const region = mainValue.split(':').at(-2) || mainValue.split(':')[0]!;

  const otherTags = signal.tags.filter(
    (tag) => tag !== mainTag && tag !== form,
  );

  const otherTagsSameCat = otherTags.filter(
    (tag) => tag.tag.split(':')[2] === cat,
  );
  const otherTagsDiffCat = otherTags.filter(
    (tag) => tag.tag.split(':')[2] !== cat,
  );
  if (otherTagsDiffCat.length) {
    console.log(`skip ${key}\t(tags include multiple categories)`);
    continue; // skip if a subtag is from a different category
  }

  const otherValues = otherTagsSameCat.map((tag) => [
    tag.tag.replace(`railway:signal:${cat}:`, ''),
    tag.value || tag.any?.[0],
  ]);

  const countryName = new Intl.DisplayNames(['en'], { type: 'region' }).of(
    signal.country,
  )!;

  const extra: Schema.Signal['extra'] = {};

  for (const icon of signal.icon) {
    const iconMatchKey = icon.match?.split(':');

    const values: Record<string, Case> = {};
    for (const casē of icon.cases || []) {
      if (casē.regex) {
        // values[casē.regex] = casē; // TODO: support this
      } else if (casē.exact) {
        values[casē.exact] = casē;
      } else if (casē.any) {
        for (const value of casē.any) {
          values[value] = casē;
        }
      } else if (casē.all) {
        values[casē.all.join(';')] = casē;
      } else {
        values[''] = casē;
      }
    }

    if (iconMatchKey && iconMatchKey[3] && iconMatchKey[2] === cat) {
      const extraField = iconMatchKey[3] as keyof typeof extra;
      extra[extraField] ||= { options: [] };

      extra[extraField].options.push(
        ...(Object.values(values).some(Boolean)
          ? Object.entries(values).map(([value, casē]) => ({
              value,
              label: casē.description,
              icon: iconToUrl(casē.example || casē.value),
            }))
          : Object.keys(values)),
      );
    }
  }

  grouped[signal.country] ||= {};
  grouped[signal.country]![region] ||= {
    networkName:
      signal.country === region ? countryName : `${countryName} - ${region}`,
    networkImage: 'File:Example.png',
    wikiPage: '',
    signals: {},
  };
  grouped[signal.country]![region]!.signals[cat] ||= [];
  grouped[signal.country]![region]!.signals[cat]!.push({
    id: mainValue,
    name: signal.description,
    image: iconToUrl((signal.icon[0]?.default || signal.exampleIcon)!),
    form: (form?.value || 'light') as 'sign' | 'light',
    extra: Object.keys(extra).length ? extra : undefined,
    const: otherValues.length ? Object.fromEntries(otherValues) : undefined,
  });
}

const outFileName = join(
  import.meta.dirname,
  '../src/data/generated-schema.json',
);
await fs.writeFile(outFileName, JSON.stringify(grouped, null, 2));
