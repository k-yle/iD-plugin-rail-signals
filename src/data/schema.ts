import type { Schema } from './types.def.js';

/** from https://osm.wiki/Tag:railway:signal#List_of_signal_categories */
export const CATEGORIES = {
  main: 'Main',
  main_repeated: 'Main Repeated',
  distant: 'Distant',
  minor: 'Minor',
  minor_distant: 'Minor Distant',
  combined: 'Combined',
  shunting: 'Shunting',
  crossing: 'Crossing',
  crossing_distant: 'Crossing Distant',
  crossing_info: 'crossing Info',
  crossing_hint: 'crossing Hint',
  electricity: 'Electricity',
  humping: 'Humping',
  speed_limit: 'Speed Limit',
  speed_limit_distant: 'Speed Limit Distant',
  whistle: 'Whistle',
  ring: 'Ring',
  route: 'Route',
  route_distant: 'Route Distant',
  wrong_road: 'Wrong Road',
  stop: 'Stop',
  stop_demand: 'Stop on demand',
  station_distant: 'Station Distant',
  radio: 'Radio',
  departure: 'Departure',
  resetting_switch: 'Resetting Switch',
  resetting_switch_distant: 'Resetting Switch Distant',
  snowplow: 'Snowplow',
  short_route: 'Short Route',
  brake_test: 'Brake Test',
  fouling_point: 'Fouling Point',
  helper_engine: 'Helper Engine',
  train_protection: 'Train Protection',
  steam_locomotive: 'Steam Locomotive',
};

export const SCHEMA: Schema.Root = {
  NZ: {
    NZ: {
      networkName: 'KiwiRail',
      networkImage: 'https://www.kiwirail.co.nz/favicons/apple-touch-icon.png',
      wikiPage: 'New_Zealand/Railways',
      signals: {
        main: {
          'NZ:main_MM': {
            name: '[MM] MultiUnit + MultiUnit',
            image: 'File:NZ_Railway_Signal_MM.svg',
            form: 'light',
            extra: { shape: ['NZ:aligned', 'NZ:offset'] },
          },
          'NZ:main_MS': {
            name: '[MS] MultiUnit + SearchLight',
            image: 'File:NZ_Railway_Signal_MS.svg',
            form: 'light',
            extra: { shape: ['NZ:aligned', 'NZ:offset'] },
          },
          'NZ:main_MD': {
            name: '[MD] MultiUnit + Disk',
            image: 'File:NZ_Railway_Signal_MD.svg',
            form: 'light',
            extra: { shape: ['NZ:aligned', 'NZ:offset'] },
          },
          'NZ:main_SM': {
            name: '[SM] SearchLight + MultiUnit',
            image: 'File:NZ_Railway_Signal_SM.svg',
            form: 'light',
            extra: { shape: ['NZ:aligned', 'NZ:offset'] },
          },
          'NZ:main_SS': {
            name: '[SS] SearchLight + SearchLight',
            image: 'File:NZ_Railway_Signal_SS.svg',
            form: 'light',
            extra: { shape: ['NZ:aligned', 'NZ:offset'] },
          },
          'NZ:main_SD': {
            name: '[SD] SearchLight + Disk',
            image: 'File:NZ_Railway_Signal_SD.svg',
            form: 'light',
            extra: { shape: ['NZ:aligned', 'NZ:offset'] },
          },
        },
        shunting: {
          'NZ:shunt': {
            name: 'Shunt Signal',
            image: 'File:NZ_Railway_Signal_shunt_3-aspect.svg',
            form: 'light',
            extra: {
              states: ['NZ:red;NZ:yellow;NZ:green', 'NZ:red;NZ:yellow'],
            },
          },
        },
        minor: {
          'NZ:low_speed': {
            name: 'Low Speed Light',
            image: 'File:NZ_Railway_Sign_Low_Speed.svg',
            form: 'light',
          },
          'NZ:R': {
            name: 'Restricted Speed Light',
            image: 'File:NZ_Railway_Sign_R.svg',
            form: 'light',
          },
        },
        speed_limit: {
          'NZ:speed_indicator': {
            name: 'Dynamic Speed Indicator',
            image: 'File:NZ_Railway_Signal_Speed_Indicator.svg',
            form: 'light',
            extra: { states: [] },
          },
        },
        train_protection: {
          'NZ:A': {
            name: 'A-light',
            image: 'File:NZ_Railway_Sign_A.svg',
            form: 'light',
          },
        },
        route: {
          'NZ:L': {
            name: 'Loop Light',
            image: 'File:NZ_Railway_Sign_L.svg',
            form: 'light',
          },
          'NZ:E': {
            name: 'Electrified Route',
            image: 'File:NZ_Railway_Sign_E.svg',
            form: 'light',
          },
          'NZ:route_indicator': {
            name: 'Route Indicator',
            image: 'File:Theatre-boxes.jpg',
            form: 'light',
            extra: { states: [], states_long: [] },
          },
        },
      },
    },
  },
};
