import type { CATEGORIES } from './schema.js';

export type Category = keyof typeof CATEGORIES;

export type ExtraField =
  | 'type'
  | 'shape'
  | 'states'
  | 'states_long'
  | 'speed'
  | 'caption';

export type FieldOption = { icon?: string; label: string };
export type FieldConfig = {
  /** @default false */
  multiple?: true;
  /** @default false - not enforced, just a visual indicator */
  required?: true;
  /** empty array = text input */
  options: (string | FieldOption)[];
};

export namespace Schema {
  export interface Signal {
    id: string;
    name: string;
    terms?: string[];
    image: string;
    form: 'light' | 'sign' | 'semaphore' | 'mechanical';
    const?: Partial<Record<ExtraField, string>>;
    extra?: {
      /** empty array means plain-text input */
      [field in ExtraField]?: FieldConfig;
    };
  }

  export interface Network {
    networkName: string;
    networkImage: string;
    wikiPage: string;
    signals: {
      [Cat in Category]?: Signal[];
    };
  }

  export interface Root {
    [countryCode: string]: {
      [networkCode: string]: Network;
    };
  }
}
