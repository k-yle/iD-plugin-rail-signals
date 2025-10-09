import { promises as fs } from 'node:fs';
import { join } from 'node:path';
import yaml from 'yaml';
import type { Category, Schema } from '../src/data/types.def.js';

interface Yaml {
  features: {
    country?: string;
    description: string;
    exampleIcon?: string;
    icon: {
      default: string;
      match?: string;
      cases?: { all?: string[]; exact?: string }[];
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

const grouped: Schema.Root = {};
const seen = new Set<string>();

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
    console.log('complex extra', key);
    continue; // skip if a subtag is from a different category
  }

  const otherValues = otherTagsSameCat.map((tag) => [
    tag.tag.replace(`railway:signal:${cat}:`, ''),
    tag.value || tag.any?.[0],
  ]);
  if (otherValues.length) console.log(Object.fromEntries(otherValues));

  if (seen.has(key)) {
    console.log('dupe', key);
    grouped[signal.country]![region]!.signals[cat] = grouped[signal.country]![
      region
    ]!.signals[cat]?.filter((k) => k.id !== mainValue);
    continue;
  }
  seen.add(key);

  const countryName = new Intl.DisplayNames(['en'], { type: 'region' }).of(
    signal.country,
  )!;

  const icon = signal.icon[0]?.match?.split(':');
  const extra: Schema.Signal['extra'] = {};
  const values =
    signal.icon[0]?.cases?.every((c) => c.all || c.exact) &&
    new Set(signal.icon[0].cases.flatMap((c) => c.all || [c.exact!]));
  if (icon && icon[3] && icon[2] === cat) {
    extra[icon[3] as keyof typeof extra] = {
      options: values ? [...values] : [],
    };
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
    image: `https://raw.githubusercontent.com/hiddewie/OpenRailwayMap-vector/${LATEST_COMMIT}/symbols/${signal.icon[0]?.default || signal.exampleIcon}.svg`,
    form: (form?.value || 'light') as 'sign' | 'light',
    extra: Object.keys(extra).length ? extra : undefined,
  });
}

const outFileName = join(
  import.meta.dirname,
  '../src/data/generated-schema.json',
);
await fs.writeFile(outFileName, JSON.stringify(grouped, null, 2));
