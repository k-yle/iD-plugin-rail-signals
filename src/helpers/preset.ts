import type { Tags } from '@openstreetmap/id-plugin-sdk';
import { SCHEMA } from '../data/schema.js';
import type { Category, Schema } from '../data/types.def.js';

export function createSignalId(signal: Schema.Signal) {
  const extra = Object.entries(signal.const || {})
    .map((kv) => kv.join('='))
    .join('|');

  return `${signal.id} ${signal.form} ${signal.name} ${extra}`.trim();
}

export function findPreset(tags: Tags, category: Category) {
  const value = tags[`railway:signal:${category}`];
  if (!value) return undefined;

  // search every country's presets
  return Object.values(SCHEMA)
    .flatMap((x) => Object.values(x))
    .map((network) =>
      // search backwards, since the more specific presets must be
      // defined after the more general presets
      network.signals[category]?.toReversed().find(
        (sig) =>
          // the ID must match
          sig.id === value &&
          // and if there are other subtags, each one must match
          Object.entries(sig.const || {}).every(
            ([k, v]) => tags[`railway:signal:${category}:${k}`] === v,
          ),
      ),
    )
    .find(Boolean);
}
