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
          'NZ:shunting_limit': {
            name: 'Shunting Limit',
            form: 'sign',
            image: 'File:NZ_Railway_Sign_Shunting_Limit.svg',
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
          'NZ:TWC_siding': {
            name: 'TWC Siding',
            terms: ['Track Warrant Control Siding'],
            form: 'sign',
            image: 'File:NZ_Railway_Sign_TWC_Siding.svg',
          },
          'NZ:TWC_intermediate': {
            name: 'TWC Intermediate Board',
            terms: ['Track Warrant Control Intermediate Board'],
            form: 'sign',
            image: 'File:NZ_Railway_Sign_TWC_Intermediate_Board.svg',
          },
        },
        speed_limit: {
          'NZ:speed_indicator': {
            name: 'Dynamic Speed Indicator',
            image: 'File:NZ_Railway_Signal_Speed_Indicator.svg',
            form: 'light',
            extra: { states: [] },
          },
          'NZ:permanent': {
            name: 'Permanent Speed',
            form: 'sign',
            image: 'File:NZ_Railway_Sign_Speed_Slow.svg',
            extra: {
              states: ['SLOW', 'MEDIUM', 'THROUGH TURNOUT SLOW'],
              speed: [],
            },
          },
          'NZ:curve': {
            name: 'Curve Speed',
            form: 'sign',
            image: 'File:NZ_Railway_Sign_Curve_Speed.svg',
          },
        },
        speed_limit_distant: {
          'NZ:curve_warning': {
            name: 'Curve Speed - Advance Warning',
            form: 'sign',
            image: 'File:NZ_Railway_Sign_Curve_Speed_Advance.svg',
          },
        },
        train_protection: {
          'NZ:A': {
            name: 'A-light',
            image: 'File:NZ_Railway_Sign_A.svg',
            form: 'light',
          },
          'NZ:AS_begins': {
            name: 'AS Begins',
            terms: ['Automatic Signalling Begins'],
            form: 'sign',
            image: 'File:NZ_Railway_Sign_AS_Begins.svg',
          },
          'NZ:AS_ends': {
            name: 'AS Ends',
            terms: ['Automatic Signalling Ends'],
            form: 'sign',
            image: 'File:NZ_Railway_Sign_AS_Ends.svg',
          },
          'NZ:CTC_begins': {
            name: 'CTC Begins',
            terms: [
              'Centralised Train Control Begins',
              'Centralized Traffic Control Begins',
            ],
            form: 'sign',
            image: 'File:NZ_Railway_Sign_CTC_Begins.svg',
          },
          'NZ:CTC_ends': {
            name: 'CTC Ends',
            terms: [
              'Centralised Train Control Ends',
              'Centralized Traffic Control Ends',
            ],
            form: 'sign',
            image: 'File:NZ_Railway_Sign_CTC_Ends.svg',
          },
          'NZ:ETCS_begins': {
            name: 'ETCS Begins',
            terms: ['European Train Control System Begins'],
            form: 'sign',
            image: 'File:NZ_Railway_Sign_ETCS_Begins.svg',
          },
          'NZ:ETCS_ends': {
            name: 'ETCS Ends',
            terms: ['European Train Control System Ends'],
            form: 'sign',
            image: 'File:NZ_Railway_Sign_ETCS_Ends.svg',
          },
          'NZ:TWC_begins': {
            name: 'TWC Begins',
            terms: ['Track Warrant Control Begins'],
            form: 'sign',
            image: 'File:NZ_Railway_Sign_TWC_Begins.svg',
          },
          'NZ:TWC_ends': {
            name: 'TWC Ends',
            terms: ['Track Warrant Control Ends'],
            form: 'sign',
            image: 'File:NZ_Railway_Sign_TWC_Ends.svg',
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
        main_repeated: {
          'NZ:banner_indicator33': {
            name: 'Double Banner Indicator',
            form: 'light',
            image: 'File:NZ_Railway_Signal_Banner_Indicator_double.svg',
          },
          'NZ:banner_indicator3D': {
            name: 'Single Banner Indicator',
            form: 'light',
            image: 'File:NZ_Railway_Signal_Banner_Indicator_single.svg',
          },
        },
        stop: {
          'NZ:emu_stop': {
            name: 'EMU Stop',
            form: 'sign',
            image: 'File:NZ_Railway_Sign_EMU_Stop.svg',
          },
          'NZ:stop_disk': {
            name: 'Stop Disk',
            form: 'sign',
            image: 'File:NZ_Railway_Sign_Stop_Disk.svg',
          },
          'NZ:stop_plate': {
            name: 'Stop Plate',
            form: 'sign',
            image: 'File:NZ Railway Sign Stop Plate.svg',
          },
          'NZ:stop_block': {
            name: 'Stop Block Entry',
            form: 'sign',
            image: 'File:NZ Railway Sign Stop Block Entry.svg',
          },
          'NZ:all_trains_stop': {
            name: 'All Trains Stop',
            form: 'sign',
            image: 'File:NZ Railway Sign All Trains Stop.svg',
          },
        },
        electricity: {
          'NZ:electric_limit': {
            name: 'Electric Services Limit',
            form: 'sign',
            image: 'File:NZ Railway Sign Electric Services Limit.svg',
          },
        },
        whistle: {
          'NZ:whistle': {
            name: 'Whistle',
            form: 'sign',
            image: 'File:NZ_Railway_Sign_Whistle.svg',
          },
        },
        crossing_hint: {
          'NZ:saltire': {
            name: 'Level Crossing Ahead',
            form: 'sign',
            image: 'File:NZ_Railway_Sign_Level_Crossing.svg',
          },
        },
        radio: {
          'NZ:channel_area': {
            name: 'Radio Channel Area',
            form: 'sign',
            image: 'File:NZ_Railway_Sign_Entering_Channel_Area.svg',
          },
        },
      },
    },
  },
};
