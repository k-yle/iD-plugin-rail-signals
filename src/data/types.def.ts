import type { CATEGORIES } from './schema.js';

export type Category = keyof typeof CATEGORIES;

export namespace Schema {
  export interface Signal {
    name: string;
    terms?: string[];
    image: string;
    form: 'light' | 'sign';
    extra?: {
      shape?: string[];
      states?: string[];
      states_long?: string[];
      speed?: string[];
    };
  }

  export interface Network {
    networkName: string;
    networkImage: string;
    wikiPage: string;
    signals: {
      [Cat in Category]?: {
        [signalCode: string]: Signal;
      };
    };
  }

  export interface Root {
    [countryCode: string]: {
      [networkCode: string]: Network;
    };
  }
}
