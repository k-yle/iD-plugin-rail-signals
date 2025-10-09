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
  shunting_route: 'Shunting Route', // TODO: add
  crossing: 'Crossing',
  crossing_distant: 'Crossing Distant',
  crossing_info: 'Crossing Info',
  crossing_hint: 'Crossing Hint',
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
  switch: 'Switch', // TODO: add
  short_route: 'Short Route',
  brake_test: 'Brake Test',
  fouling_point: 'Fouling Point',
  helper_engine: 'Helper Engine',
  train_protection: 'Train Protection',
  steam_locomotive: 'Steam Locomotive',
};

export const SCHEMA: Schema.Root = {
  AU: {
    MNWSW: {
      networkName: 'Sydney Metro',
      networkImage: 'File:Sydney Metro Line.svg',
      wikiPage: 'Australian_Tagging_Guidelines/Railway_Signals',
      signals: {
        minor: [
          {
            id: 'AU:MNWSW:location',
            name: 'Location Marker Board',
            form: 'sign',
            image: 'File:Sydney_Metro_Location_Marker_Board.jpg',
            extra: { caption: { options: [] } },
          },
        ],
        fouling_point: [
          {
            id: 'AU:MNWSW:points_cleared',
            name: 'Points Cleared',
            form: 'sign',
            image: 'File:Sydney_Metro_Points_Cleared_Board.jpg',
            extra: { caption: { options: [] } },
          },
        ],
        main: [
          {
            id: 'AU:MNWSW:points_indiciator',
            name: 'Point Position Indicator',
            form: 'light',
            image: 'File:Sydney_Metro_Point_Position_Indicator.jpg',
            extra: {
              states: {
                multiple: true,
                options: [
                  {
                    label: 'stop',
                    icon: 'File:Australia_tram_signal_aspect_single-stop-red.svg',
                  },
                  { label: 'straight', icon: 'File:DFStrab_F1.svg' },
                  { label: 'right', icon: 'File:DFStrab_F2.svg' },
                  { label: 'left', icon: 'File:DFStrab_F3.svg' },
                ],
              },
            },
          },
        ],
        route: [
          {
            id: 'AU:MNWSW:route_indicator',
            name: 'Route Indicator',
            form: 'light',
            image: 'File:Sydney_Metro_Route_Indicator.jpg',
            extra: { states: { options: [] }, states_long: { options: [] } },
          },
        ],
        stop: [
          {
            id: 'AU:MNWSW:fixed_red',
            name: 'Fixed Red',
            form: 'light',
            image: 'File:Sydney_Metro_buffer_stop.jpg',
          },
        ],
      },
    },
    LightRail: {
      networkName: 'Light Rail',
      networkImage: 'File:205_Tramvaj.png',
      wikiPage: '',
      signals: {
        speed_limit: [
          {
            id: 'AU:LightRail:W1-10',
            name: 'W1-10',
            image: 'File:Australia_road_sign_W1-10.svg',
            form: 'sign',
            extra: { speed: { options: [] } },
            // TODO: also sync: traffic_sign=AU:W1-10[60]
          },
          {
            id: 'AU:LightRail:G9-390N',
            name: 'G9-390N',
            image: 'File:Australia_road_sign_G9-390N.svg',
            form: 'sign',
            extra: { speed: { options: [] } },
            // TODO: also sync: traffic_sign=AU:G9-390N[60]
          },
          {
            id: 'AU:LightRail:G9-390N',
            name: 'G9-390N (Turnout Left)',
            image: 'File:Australia_road_sign_G9-390N-L.svg',
            form: 'sign',
            const: { shape: 'turnout_left' },
            extra: { speed: { options: [] } },
            // TODO: also sync: traffic_sign=AU:G9-390N[X;Y]
          },
          {
            id: 'AU:LightRail:G9-390N',
            name: 'G9-390N (Turnout Right)',
            image: 'File:Australia_road_sign_G9-390N-R.svg',
            form: 'sign',
            const: { shape: 'turnout_right' },
            extra: { speed: { options: [] } },
            // TODO: also sync: traffic_sign=AU:G9-390N[X;Y]
          },
        ],
        stop: [
          {
            id: 'AU:LightRail:fixed_red',
            name: 'Fixed Red',
            form: 'sign',
            image: 'File:AU-NSW Light Rail Sign FixedRed.svg',
          },
          {
            id: 'AU:LightRail:NSW:stop',
            name: 'Stop',
            form: 'sign',
            image: 'File:AU-NSW Light Rail Sign Stop.svg',
          },
          {
            id: 'AU:LightRail:NSW:SWI',
            name: 'SWI',
            form: 'sign',
            image: 'File:AU-NSW Light Rail Sign SWI.svg',
          },
          {
            id: 'AU:LightRail:VIC:double_yellow',
            name: '[VIC] Double solid yellow line (Compulsory Stop Mark)',
            form: 'sign',
            image: 'File:AU-VIC Tram Stop line double.svg',
          },
          {
            id: 'AU:LightRail:VIC:single_yellow',
            name: '[VIC] Single solid yellow line (Fouling Mark)',
            form: 'sign',
            image: 'File:AU-VIC Tram Stop line single.svg',
          },
        ],
        electricity: [
          {
            id: 'AU:LightRail:coast_on',
            name: 'Coast On',
            form: 'sign',
            image: 'File:AU-ACT Light Rail Sign Coast-On.svg',
          },
          {
            id: 'AU:LightRail:coast_off',
            name: 'Coast Off',
            form: 'sign',
            image: 'File:AU-ACT Light Rail Sign Coast-Off.svg',
          },
          {
            id: 'AU:LightRail:NSW:raise_OHW',
            name: 'Raise OHW',
            form: 'sign',
            image: 'File:AU-NSW Light Rail Sign RaiseOHW.svg',
          },
          {
            id: 'AU:LightRail:NSW:lower_OHW',
            name: 'Lower OHW',
            form: 'sign',
            image: 'File:AU-NSW Light Rail Sign LowerOHW.svg',
          },
          {
            id: 'AU:LightRail:NSW:raise_OESS',
            name: 'Raise OESS',
            form: 'sign',
            image: 'File:AU-NSW Light Rail Sign RaiseOESS.svg',
          },
          {
            id: 'AU:LightRail:NSW:lower_OESS',
            name: 'Lower OESS',
            form: 'sign',
            image: 'File:AU-NSW Light Rail Sign LowerOESS.svg',
          },
          {
            id: 'AU:LightRail:NSW:raise_APS',
            name: 'Raise APS',
            form: 'sign',
            image: 'File:AU-NSW Light Rail Sign RaiseAPS.svg',
          },
          {
            id: 'AU:LightRail:NSW:lower_APS',
            name: 'Lower APS',
            form: 'sign',
            image: 'File:AU-NSW Light Rail Sign LowerAPS.svg',
          },
          {
            id: 'AU:LightRail:VIC:cut_off',
            name: '[VIC] Cut Off',
            form: 'sign',
            image: 'File:AU-VIC Tram Sign Cut Off.svg',
          },
        ],
        main: [
          {
            id: 'AU:LightRail:NSW:ground',
            name: '[NSW] Ground Signal',
            form: 'light',
            image:
              'File:UK Ground Position Light Signal - Shunt Signal - On - Pre-1996.svg',
            extra: {
              states: {
                multiple: true,
                options: [
                  {
                    label: 'stop',
                    icon: 'File:UK Ground Position Light Signal - Shunt Signal - On.svg',
                  },
                  {
                    label: 'caution',
                    icon: 'File:UK Ground Position Light Signal - Shunt Signal - On - Pre-1996.svg',
                  },
                  {
                    label: 'clear',
                    icon: 'File:UK Ground Position Light Signal - Shunt Signal - Off.svg',
                  },
                ],
              },
            },
          },
          {
            id: 'AU:LightRail:NSW:SI',
            name: '[NSW] Signal',
            form: 'light',
            image: 'File:AU-NSW LightRail Signal.svg',
            extra: {
              states: {
                multiple: true,
                options: [
                  {
                    label: 'stop',
                    icon: 'File:AU-NSW LightRail Signal Stop.svg',
                  },
                  {
                    label: 'straight',
                    icon: 'File:AU-NSW LightRail Signal Straight.svg',
                  },
                  {
                    label: 'right',
                    icon: 'File:AU-NSW LightRail Signal Right.svg',
                  },
                  {
                    label: 'left',
                    icon: 'File:AU-NSW LightRail Signal Left.svg',
                  },
                ],
              },
            },
          },
          {
            id: 'AU:LightRail:NSW:PI',
            name: '[NSW] Points Indicator',
            form: 'light',
            image: 'File:AU-NSW LightRail Points Indicator.svg',
            extra: {
              states: {
                multiple: true,
                options: [
                  {
                    label: 'stop',
                    icon: 'File:AU-NSW LightRail Signal Stop.svg',
                  },
                  {
                    label: 'straight',
                    icon: 'File:AU-NSW LightRail Points Indicator Straight.svg',
                  },
                  {
                    label: 'right',
                    icon: 'File:AU-NSW LightRail Points Indicator Right.svg',
                  },
                  {
                    label: 'left',
                    icon: 'File:AU-NSW LightRail Points Indicator Left.svg',
                  },
                ],
              },
            },
          },

          {
            id: 'AU:LightRail:SI',
            name: 'Signal System Lanterns',
            form: 'light',
            image: 'File:Australia_tram_signal_aspect_double-straight.svg', // TODO: better image
            extra: {
              states: {
                multiple: true,
                options: [
                  {
                    label: 'stop',
                    icon: 'File:Australia_tram_signal_aspect_double-stop.svg',
                  },
                  {
                    label: 'straight',
                    icon: 'File:Australia_tram_signal_aspect_double-straight.svg',
                  },
                  {
                    label: 'right',
                    icon: 'File:Australia_tram_signal_aspect_double-right.svg',
                  },
                  {
                    label: 'left',
                    icon: 'File:Australia_tram_signal_aspect_double-left.svg',
                  },
                  { label: 'error', icon: 'File:DFStrab F4.svg' },
                  {
                    label: 'warning',
                    icon: 'File:Australia tram signal aspect orange.svg',
                  },
                ],
              },
            },
          },
        ],
        minor: [
          {
            id: 'AU:LightRail:PI',
            name: 'Points Indicator',
            form: 'light',
            image: 'File:DFStrab_F1.svg', // TODO: better image
            extra: {
              states: {
                multiple: true,
                options: [
                  {
                    label: 'stop_red',
                    icon: 'File:Australia_tram_signal_aspect_single-stop-red.svg',
                  },
                  { label: 'stop', icon: 'File:DFStrab_F0.svg' },
                  { label: 'straight', icon: 'File:DFStrab_F1.svg' },
                  { label: 'right', icon: 'File:DFStrab_F2.svg' },
                  { label: 'left', icon: 'File:DFStrab_F3.svg' },
                ],
              },
            },
          },
          {
            id: 'AU:LightRail:SPI',
            name: 'Signal Operated Points Indicator',
            form: 'light',
            image: 'File:BOStrab W1.svg', // TODO: better image
            extra: {
              states: {
                multiple: true,
                options: [
                  {
                    label: 'locked',
                    icon: 'File:Australia tram signal aspect diamond.svg',
                  },
                  { label: 'straight', icon: 'File:BOStrab W1.svg' },
                  { label: 'right', icon: 'File:BOStrab W2.svg' },
                  { label: 'left', icon: 'File:BOStrab W3.svg' },
                ],
              },
            },
          },
          {
            id: 'AU:LightRail:NSW:CS',
            name: 'CS',
            form: 'sign',
            image: 'File:AU-NSW Light Rail Sign CS.svg',
          },
          {
            id: 'AU:LightRail:NSW:D',
            name: 'D',
            form: 'sign',
            image: 'File:AU-NSW Light Rail Sign D.svg',
          },
        ],
        route: [
          {
            id: 'AU:LightRail:route_indicator',
            name: 'Route Indicator',
            form: 'light',
            image: 'File:AU_Light_Rail_Route-Indicator.svg',
            extra: { states: { options: [] }, states_long: { options: [] } },
          },
          {
            id: 'AU:LightRail:NSW:set_route',
            name: 'Set Route (NSW)',
            form: 'sign',
            image: 'File:AU-NSW Light Rail Sign U.svg',
          },
          {
            id: 'AU:LightRail:ACT:set_route',
            name: 'Set Route (ACT)',
            form: 'sign',
            image: 'File:AU-ACT Light Rail Sign Set-Route.svg',
          },
          {
            id: 'AU:LightRail:QLD:set_route',
            name: 'Set Route (QLD)',
            terms: ['Select Points Now'],
            form: 'light',
            image: 'File:AU-QLD Light Rail Sign Select Points Now.svg',
          },
        ],
        shunting: [
          {
            id: 'AU:LightRail:NSW:LM',
            name: 'LM',
            form: 'sign',
            image: 'File:AU-NSW Light Rail Sign LM.svg',
          },
          {
            id: 'AU:LightRail:NSW:SL',
            name: 'SL',
            form: 'sign',
            image: 'File:AU-NSW Light Rail Sign SL.svg',
          },
          {
            id: 'AU:LightRail:NSW:SZ',
            name: 'SZ',
            form: 'sign',
            image: 'File:AU-NSW Light Rail Sign SZ-Ends.svg',
          },
        ],
        departure: [
          {
            id: 'AU:LightRail:NSW:RTS',
            name: 'RTS',
            form: 'sign',
            image: 'File:AU-NSW Light Rail Sign RTS.svg',
          },
        ],
      },
    },
    NSW: {
      networkName: 'NSW',
      networkImage: 'File:TfNSW T.svg',
      wikiPage: 'Australian_Tagging_Guidelines/Railway_Signals',
      signals: {
        route_distant: [
          {
            id: 'AU:NSW:turnout_repeater',
            name: 'Turnout Repeater',
            form: 'light',
            image: 'File:NSW Railway Signal Turnout Repeater - theatre box.svg',
            extra: {
              shape: {
                options: [
                  {
                    label: 'theatre_box',
                    icon: 'File:NSW Railway Signal Turnout Repeater - theatre box.svg',
                  },
                  {
                    label: 'feather',
                    icon: 'File:NSW Railway Signal Turnout Repeater - feather.svg',
                  },
                ],
              },
              states: {
                multiple: true,
                options: [
                  { label: 'straight', icon: 'File:DFStrab_F1.svg' },
                  { label: 'right', icon: 'File:DFStrab_F2.svg' },
                  { label: 'left', icon: 'File:DFStrab_F3.svg' },
                  {
                    label: 'off',
                    icon: 'File:BOStrab_Weichensignal_Kompakt_Basis.svg',
                  },
                ],
              },
            },
          },
        ],
        route: [
          {
            id: 'AU:NSW:theatre_box',
            name: 'Mainline Route Indicator (Theatre Box)',
            form: 'light',
            image: 'File:Theatre-boxes.jpg',
            extra: { states: { options: [] }, states_long: { options: [] } },
          },
        ],
        main: [
          {
            id: 'AU:NSW:main',
            name: 'Main Signal',
            form: 'light',
            image: 'File:NSW_Railway_Signal_(single)_GYR.svg',
            extra: {
              states: {
                required: true,
                options: [
                  {
                    label: 'GYR',
                    icon: 'File:NSW_Railway_Signal_(single)_GYR.svg',
                  },
                  {
                    label: 'GR',
                    icon: 'File:NSW_Railway_Signal_(single)_GR.svg',
                  },
                  {
                    label: 'YR',
                    icon: 'File:NSW_Railway_Signal_(single)_YR.svg',
                  },
                  {
                    label: 'R',
                    icon: 'File:NSW_Railway_Signal_(single)_R.svg',
                  },
                  {
                    label: 'G',
                    icon: 'File:NSW_Railway_Signal_(single)_G.svg',
                  },
                ],
              },
              type: {
                options: [
                  {
                    label: 'aligned',
                    icon: 'File:NSW_Railway_Signal_(double)_GR-GR.svg',
                  },
                  {
                    label: 'staggered',
                    icon: 'File:NSW Railway Signal (double) GR-GR staggered.svg',
                  },
                ],
              },
              shape: {
                options: [
                  {
                    label: 'multi_unit',
                    icon: 'File:Traffic lights dark all-on.svg',
                  },
                  { label: 'searchlight', icon: 'File:Searchlight_signal.gif' },
                ],
              },
            },
          },
        ],
        distant: [
          {
            id: 'AU:NSW:distant',
            name: 'Distant Signal',
            form: 'light',
            image: 'File:NSW_Railway_Signal_(single)_GYR.svg',
            extra: {
              states: {
                required: true,
                options: [
                  {
                    label: 'GYR',
                    icon: 'File:NSW_Railway_Signal_(single)_GYR.svg',
                  },
                  {
                    label: 'GR',
                    icon: 'File:NSW_Railway_Signal_(single)_GR.svg',
                  },
                  {
                    label: 'YR',
                    icon: 'File:NSW_Railway_Signal_(single)_YR.svg',
                  },
                  {
                    label: 'R',
                    icon: 'File:NSW_Railway_Signal_(single)_R.svg',
                  },
                  {
                    label: 'GYRg',
                    icon: 'File:NSW_Railway_Signal_(single)_GYRg.svg',
                  },
                  {
                    label: 'GRg',
                    icon: 'File:NSW_Railway_Signal_(single)_GRg.svg',
                  },
                  {
                    label: 'YRg',
                    icon: 'File:NSW_Railway_Signal_(single)_YRg.svg',
                  },
                  {
                    label: 'GY',
                    icon: 'File:NSW Railway Signal (single) GY.svg',
                  },
                ],
              },
              shape: {
                options: [
                  {
                    label: 'multi_unit',
                    icon: 'File:Traffic lights dark all-on.svg',
                  },
                  { label: 'searchlight', icon: 'File:Searchlight_signal.gif' },
                ],
              },
            },
          },
        ],
        switch: [
          {
            id: 'AU:NSW:turnout_route',
            name: 'Turnout Route',
            form: 'light',
            image: 'File:NSW Railway Signal (single) Turnout Route R.svg',
            extra: {
              states: {
                required: true,
                multiple: true,
                options: [
                  {
                    label: 'right',
                    icon: 'File:NSW Railway Signal (single) Turnout Route R.svg',
                  },
                  {
                    label: 'left',
                    icon: 'File:NSW Railway Signal (single) Turnout Route L.svg',
                  },
                  {
                    label: 'off',
                    icon: 'File:NSW Railway Signal (single) Turnout Route Off.svg',
                  },
                ],
              },
            },
          },
          {
            id: 'AU:NSW:facing_points',
            name: 'Facing Points Indicator',
            form: 'light',
            image: 'File:NSW Railway Signal Points Indicator WWR.svg',
          },
          {
            id: 'AU:NSW:trailing_points',
            name: 'Trailing Points Indicator',
            form: 'light',
            image: 'File:NSW Railway Signal Points Indicator RWR - solid.svg',
          },
        ],
        minor: [
          {
            id: 'AU:NSW:low_speed',
            name: 'Low Speed',
            form: 'light',
            image: 'File:NSW Railway Signal (single) Low Speed.svg',
          },
          {
            id: 'AU:NSW:close_up',
            name: 'Close Up',
            form: 'light',
            image: 'File:NSW Railway Signal (single) Close Up.svg',
          },
        ],
        shunting_route: [
          {
            id: 'AU:NSW:stencil',
            name: 'Shunt Route Indicator (Stencil)',
            form: 'light',
            image: 'File:NSW_Railway_Signal_Route_Indicator_-_stencil.svg',
            extra: { states: { options: [] }, states_long: { options: [] } },
          },
        ],
        shunting: [
          {
            id: 'AU:NSW:subsidiary',
            name: 'Calling-On / Shunt Ahead',
            form: 'light',
            image: 'File:NSW_Railway_Signal_orange_light.svg',
            extra: { type: { options: ['calling_on', 'shunt_ahead'] } },
          },
          {
            id: 'AU:NSW:shunt',
            name: 'General Shunt Signal',
            form: 'light',
            image: 'File:NSW Railway Signal Shunt.svg',
            extra: {
              shape: {
                options: [
                  { label: 'box', icon: 'File:NSW Railway Signal Shunt.svg' },
                  {
                    label: 'vertical',
                    icon: 'File:NSW Railway Signal Shunt - Vertical.svg',
                  },
                ],
              },
            },
          },
          {
            id: 'AU:NSW:intermediate',
            name: 'Intermediate Shunt Signal',
            form: 'light',
            image: 'File:NSW Railway Signal Shunt - Intermediate.svg',
            extra: {
              shape: {
                options: [
                  {
                    label: 'box',
                    icon: 'File:NSW Railway Signal Shunt - Intermediate.svg',
                  },
                  {
                    label: 'vertical',
                    icon: 'File:NSW Railway Signal Shunt - Intermediate Vertical.svg',
                  },
                ],
              },
            },
          },
          {
            id: 'AU:NSW:repeater',
            name: 'Shunt Repeater',
            form: 'light',
            image: 'File:NSW Railway Signal Shunt - Repeater.svg',
          },
          {
            id: 'AU:NSW:shunting_limit',
            name: 'Shunting Limit',
            form: 'sign',
            image: 'File:NSW Railway Sign Shunting Limit.svg',
            extra: { caption: { options: [] } },
          },
        ],
        short_route: [
          {
            id: 'AU:NSW:dead_end',
            name: 'Dead End',
            form: 'light',
            image: 'File:NSW Railway Signal Deadend Siding R.svg',
            extra: {
              shape: {
                options: [
                  {
                    label: 'right',
                    icon: 'File:NSW Railway Signal Deadend Siding R.svg',
                  },
                  {
                    label: 'left',
                    icon: 'File:NSW Railway Signal Deadend Siding L.svg',
                  },
                ],
              },
            },
          },
        ],
        train_protection: [
          {
            id: 'AU:NSW:A',
            name: 'Automatic (A) Light',
            form: 'light',
            image: 'File:NSW Railway Signal A.svg',
          },
          {
            id: 'AU:NSW:warning_light',
            name: 'Warning Light',
            form: 'light',
            image: 'File:NSW Railway Signal Warning Light - array.svg',
            extra: {
              shape: {
                options: [
                  {
                    label: 'bulb',
                    icon: 'File:NSW Railway Signal Warning Light - bulb.svg',
                  },
                  {
                    label: 'array',
                    icon: 'File:NSW Railway Signal Warning Light - array.svg',
                  },
                ],
              },
            },
          },
          {
            id: 'AU:NSW:begin_single_light',
            name: 'Begin Single Light Indication',
            form: 'sign',
            image: 'File:NSW Railway Sign Begin Single Light Indication.svg',
          },
          {
            id: 'AU:NSW:end_single_light',
            name: 'End Single Light Indication',
            form: 'sign',
            image: 'File:NSW Railway Sign End Single Light Indication.svg',
          },
          {
            id: 'AU:NSW:begin_TOW',
            name: 'Begin Train Order Working (TOW)',
            form: 'sign',
            image: 'File:NSW Railway Sign Begin TOW.svg',
          },
          {
            id: 'AU:NSW:end_TOW',
            name: 'End Train Order Working (TOW)',
            form: 'sign',
            image: 'File:NSW Railway Sign End TOW.svg',
          },
          {
            id: 'AU:NSW:begin_ATP',
            name: 'Begin Automatic Train Protection (ATP)',
            form: 'sign',
            image: 'File:NSW Railway Sign Begin ATP.svg',
          },
          {
            id: 'AU:NSW:end_ATP',
            name: 'End Automatic Train Protection (ATP)',
            form: 'sign',
            image: 'File:NSW Railway Sign End ATP.svg',
          },
          {
            id: 'AU:NSW:end_signalled_authority',
            name: 'End Signalled Authority',
            form: 'sign',
            image: 'File:NSW Railway Sign End Signalled Authority.svg',
          },
        ],
        helper_engine: [
          {
            id: 'AU:NSW:tonnage',
            name: 'Tonnage (T) Light',
            form: 'light',
            image: 'File:BOStrab A1.svg',
          },
        ],
        main_repeated: [
          {
            id: 'AU:NSW:LED_repeater',
            name: 'LED Repeater',
            form: 'light',
            image: 'File:NSW Railway Signal Repeater.svg',
          },
          {
            id: 'AU:NSW:guards_indicator',
            name: "Guard's Indicator",
            form: 'light',
            image: 'File:NSW_Railway_Signal_Guards_Indicator.svg',
          },
          {
            id: 'AU:NSW:alert',
            name: 'Alert',
            form: 'sign',
            image: 'File:NSW Railway Sign Alert.svg',
            extra: { caption: { options: [] } },
          },
        ],
        stop: [
          {
            id: 'AU:NSW:end_of_track',
            name: 'End of Track',
            form: 'light',
            image: 'File:NSW Railway Signal End of Track WR.svg',
            extra: {
              states: {
                options: [
                  {
                    label: 'WR',
                    icon: 'File:NSW Railway Signal End of Track WR.svg',
                  },
                  {
                    label: 'R',
                    icon: 'File:NSW Railway Signal End of Track R.svg',
                  },
                ],
              },
            },
          },
          {
            id: 'AU:NSW:stop_position',
            name: 'Stop Position',
            form: 'sign',
            image: 'File:NSW_Railway_Sign_Stop_Position_6.svg',
            extra: { states: { options: [] } },
          },
          {
            id: 'AU:NSW:safety_overrun',
            name: 'Safety Overrun',
            form: 'sign',
            image: 'File:NSW_Railway_Signal_Example_-_safety_run_off_area.jpg',
          },
          {
            id: 'AU:NSW:stop',
            name: 'Stop',
            form: 'sign',
            image: 'File:NSW Railway Sign Stop.svg',
            extra: {
              shape: {
                options: [
                  {
                    label: 'horizontal',
                    icon: 'File:NSW Railway Sign Stop.svg',
                  },
                  {
                    label: 'vertical',
                    icon: 'File:NSW Railway Sign Stop.svg',
                  },
                  {
                    label: 'octogon',
                    icon: 'File:Australia road sign R1-1.svg',
                  },
                ],
              },
            },
          },
          {
            id: 'AU:NSW:catch_point',
            name: 'Catch Point',
            form: 'sign',
            image: 'File:NSW Railway Sign Catch Point.svg',
          },
          {
            id: 'AU:NSW:derail',
            name: 'Derail',
            form: 'sign',
            image: 'File:NSW Railway Sign Derail.svg',
          },
          {
            id: 'AU:NSW:loading_gauge',
            name: 'Loading Gauge limit',
            form: 'sign',
            image: 'File:NSW_Railway_Sign_Loading_Gauge_Limit.svg',
            extra: { caption: { options: [] } },
          },
        ],
        speed_limit: [
          {
            id: 'AU:NSW:general_medium_high',
            name: 'General + Medium + High',
            form: 'sign',
            image: 'File:NSW Railway Sign Speed General+Medium+High.svg',
            extra: { speed: { options: [] } },
          },
          {
            id: 'AU:NSW:general_high',
            name: 'General + High',
            form: 'sign',
            image: 'File:NSW Railway Sign Speed General+High.svg',
            extra: { speed: { options: [] } },
          },
          {
            id: 'AU:NSW:general',
            name: 'General',
            form: 'sign',
            image: 'File:NSW Railway Sign Speed General.svg',
            extra: { speed: { options: [] } },
          },
          {
            id: 'AU:NSW:medium',
            name: 'Medium',
            form: 'sign',
            image: 'File:NSW Railway Sign Speed Medium.svg',
            extra: { speed: { options: [] } },
          },
          {
            id: 'AU:NSW:high',
            name: 'High',
            form: 'sign',
            image: 'File:NSW Railway Sign Speed High.svg',
            extra: { speed: { options: [] } },
          },
          {
            id: 'AU:NSW:yard',
            name: 'Yard Speed',
            form: 'sign',
            image: 'File:NSW Railway Sign Yard Speed.svg',
            extra: { speed: { options: [] } },
          },
          {
            id: 'AU:NSW:train_stop',
            name: 'Intermediate Train Stop Advisory Speed',
            form: 'sign',
            image: 'File:NSW Railway Sign Train Stop Speed.svg',
            extra: { speed: { options: [] } },
          },
        ],
        station_distant: [
          {
            id: 'AU:NSW:YL',
            name: 'Yard Limit (YL)',
            form: 'sign',
            image: 'File:NSW Railway Sign YL.svg',
            extra: { caption: { options: [] } },
          },
          {
            id: 'AU:NSW:location',
            name: 'Location',
            form: 'sign',
            image: 'File:NSW Railway Sign Location.svg',
            extra: { caption: { options: [] } },
          },
          {
            id: 'AU:NSW:landmark',
            name: 'Landmark',
            form: 'sign',
            image: 'File:NSW Railway Sign Landmark.svg',
          },
        ],
        departure: [
          {
            id: 'AU:NSW:EYL',
            name: 'End Yard Limit (EYL)',
            form: 'sign',
            image: 'File:NSW Railway Sign EYL.svg',
            extra: { caption: { options: [] } },
          },
        ],
        electricity: [
          {
            id: 'AU:NSW:block_join',
            name: 'Block Join',
            form: 'sign',
            image: 'File:NSW Railway Sign Block Join.svg',
          },
          {
            id: 'AU:NSW:electric_limit',
            name: 'Electric Train Stop',
            form: 'sign',
            image: 'File:NSW Railway Sign Electric Train Stop.svg',
          },
          {
            id: 'AU:NSW:turnout',
            name: 'Unelectrified Turnout',
            form: 'sign',
            image: 'File:NSW Railway Sign Pantograph Down.svg',
          },
        ],
        fouling_point: [
          {
            id: 'AU:NSW:points_cleared',
            name: 'Points Cleared',
            form: 'sign',
            image: 'File:NSW Railway Sign Points Cleared.svg',
            extra: { caption: { options: [] } },
          },
        ],
        whistle: [
          {
            id: 'AU:NSW:whistle',
            name: 'Whistle',
            form: 'sign',
            image: 'File:NSW Railway Sign Whistle.svg',
            extra: { caption: { options: [] } },
          },
          {
            id: 'AU:NSW:no_whistle',
            name: 'No Whistle',
            form: 'sign',
            image: 'File:NSW Railway Sign No Whistle.svg',
            extra: { caption: { options: [] } },
          },
        ],
        crossing_hint: [
          {
            id: 'AU:NSW:unsignalised',
            name: 'Unsignalised Level Crossing Ahead',
            form: 'sign',
            image: 'File:Australia road sign W7-8.svg',
            extra: { caption: { options: [] } },
          },
          {
            id: 'AU:NSW:signalised',
            name: 'Signalised Level Crossing Ahead',
            form: 'sign',
            image: 'File:Australia road sign W7-4.svg',
            extra: { caption: { options: [] } },
          },
        ],
      },
    },
  },
  NZ: {
    NZ: {
      networkName: 'KiwiRail',
      networkImage: 'https://www.kiwirail.co.nz/favicons/apple-touch-icon.png',
      wikiPage: 'New_Zealand/Railways',
      signals: {
        main: [
          {
            id: 'NZ:main_MM',
            name: '[MM] MultiUnit + MultiUnit',
            image: 'File:NZ_Railway_Signal_MM.svg',
            form: 'light',
            extra: {
              shape: {
                options: ['aligned', 'staggered'],
              },
            },
          },
          {
            id: 'NZ:main_MS',
            name: '[MS] MultiUnit + SearchLight',
            image: 'File:NZ_Railway_Signal_MS.svg',
            form: 'light',
            extra: {
              shape: {
                options: ['aligned', 'staggered'],
              },
            },
          },
          {
            id: 'NZ:main_MD',
            name: '[MD] MultiUnit + Disk',
            image: 'File:NZ_Railway_Signal_MD.svg',
            form: 'light',
            extra: {
              shape: {
                options: ['aligned', 'staggered'],
              },
            },
          },
          {
            id: 'NZ:main_SM',
            name: '[SM] SearchLight + MultiUnit',
            image: 'File:NZ_Railway_Signal_SM.svg',
            form: 'light',
            extra: {
              shape: {
                options: ['aligned', 'staggered'],
              },
            },
          },
          {
            id: 'NZ:main_SS',
            name: '[SS] SearchLight + SearchLight',
            image: 'File:NZ_Railway_Signal_SS.svg',
            form: 'light',
            extra: {
              shape: {
                options: ['aligned', 'staggered'],
              },
            },
          },
          {
            id: 'NZ:main_SD',
            name: '[SD] SearchLight + Disk',
            image: 'File:NZ_Railway_Signal_SD.svg',
            form: 'light',
            extra: {
              shape: {
                options: ['aligned', 'staggered'],
              },
            },
          },
          {
            id: 'NZ:M',
            name: '2-position main signal',
            image: 'File:NZ Railway Signal 2-aspect main.svg',
            form: 'light',
          },
          {
            id: 'NZ:M',
            name: '2-position main signal (semaphore)',
            image: 'File:Railroad Signalhead Red main semaphore.svg',
            form: 'semaphore',
          },
        ],
        distant: [
          {
            id: 'NZ:M',
            name: '2-position distant signal',
            image: 'File:NZ Railway Signal 2-aspect distant.svg',
            form: 'light',
          },
          {
            id: 'NZ:M',
            name: '2-position distant signal (semaphore)',
            image: 'File:Railroad Signalhead Yellow advance semaphore.svg',
            form: 'semaphore',
          },
        ],
        shunting: [
          {
            id: 'NZ:shunt',
            name: 'Shunt Signal',
            image: 'File:NZ_Railway_Signal_shunt_3-aspect.svg',
            form: 'light',
            extra: {
              states: {
                options: ['RYG', 'RY'],
              },
            },
          },
          {
            id: 'NZ:shunting_limit',
            name: 'Shunting Limit',
            form: 'sign',
            image: 'File:NZ_Railway_Sign_Shunting_Limit.svg',
          },
        ],
        crossing: [
          {
            id: 'NZ:XI',
            name: 'Level Crossing Indicator',
            form: 'light',
            image: 'File:NZ Railway Signal XI.svg',
          },
        ],
        switch: [
          {
            id: 'NZ:AI',
            name: 'Arrow Indicator',
            form: 'light',
            image: 'File:NZ Railway Signal AI L.svg',
            extra: {
              states: { options: ['left', 'right'] },
            },
          },
        ],
        minor: [
          {
            id: 'NZ:low_speed',
            name: 'Low Speed Light',
            image: 'File:NZ_Railway_Sign_Low_Speed.svg',
            form: 'light',
          },
          {
            id: 'NZ:R',
            name: 'Restricted Speed Light',
            image: 'File:NZ_Railway_Sign_R.svg',
            form: 'light',
          },
          {
            id: 'NZ:TWC_siding',
            name: 'TWC Siding',
            terms: ['Track Warrant Control Siding'],
            form: 'sign',
            image: 'File:NZ_Railway_Sign_TWC_Siding.svg',
          },
          {
            id: 'NZ:TWC_intermediate',
            name: 'TWC Intermediate Board',
            terms: ['Track Warrant Control Intermediate Board'],
            form: 'sign',
            image: 'File:NZ_Railway_Sign_TWC_Intermediate_Board.svg',
          },
        ],
        station_distant: [
          {
            id: 'NZ:TWC_signalled',
            name: 'TWC (signalised) Station Warning',
            terms: ['Track Warrant Control (signalised) Station Warning'],
            form: 'sign',
            image: 'File:NZ Railway Sign TWC Station Warning signalised.svg',
            extra: { caption: { options: [] } },
          },
          {
            id: 'NZ:TWC_unsignalled',
            name: 'TWC (unsignalised) Station Warning',
            terms: ['Track Warrant Control (unsignalised) Station Warning'],
            form: 'sign',
            image: 'File:NZ Railway Sign TWC Station Warning unsignalised.svg',
            extra: { caption: { options: [] } },
          },
        ],
        speed_limit: [
          {
            id: 'NZ:speed_indicator',
            name: 'Dynamic Speed Indicator',
            image: 'File:NZ_Railway_Signal_Speed_Indicator.svg',
            form: 'light',
            extra: { states: { options: [] } },
          },
          {
            id: 'NZ:permanent',
            name: 'Permanent Speed',
            form: 'sign',
            image: 'File:NZ_Railway_Sign_Speed_Slow.svg',
            extra: {
              states: { options: ['SLOW', 'MEDIUM', 'THROUGH TURNOUT SLOW'] },
              speed: { options: [] },
            },
          },
          {
            id: 'NZ:curve',
            name: 'Curve Speed',
            form: 'sign',
            image: 'File:NZ_Railway_Sign_Curve_Speed.svg',
          },
        ],
        speed_limit_distant: [
          {
            id: 'NZ:curve_warning',
            name: 'Curve Speed - Advance Warning',
            form: 'sign',
            image: 'File:NZ_Railway_Sign_Curve_Speed_Advance.svg',
          },
        ],
        train_protection: [
          {
            id: 'NZ:A',
            name: 'A-light',
            image: 'File:NZ_Railway_Sign_A.svg',
            form: 'light',
          },
          {
            id: 'NZ:AS_begins',
            name: 'AS Begins',
            terms: ['Automatic Signalling Begins'],
            form: 'sign',
            image: 'File:NZ_Railway_Sign_AS_Begins.svg',
          },
          {
            id: 'NZ:AS_ends',
            name: 'AS Ends',
            terms: ['Automatic Signalling Ends'],
            form: 'sign',
            image: 'File:NZ_Railway_Sign_AS_Ends.svg',
          },
          {
            id: 'NZ:CTC_begins',
            name: 'CTC Begins',
            terms: [
              'Centralised Train Control Begins',
              'Centralized Traffic Control Begins',
            ],
            form: 'sign',
            image: 'File:NZ_Railway_Sign_CTC_Begins.svg',
          },
          {
            id: 'NZ:CTC_ends',
            name: 'CTC Ends',
            terms: [
              'Centralised Train Control Ends',
              'Centralized Traffic Control Ends',
            ],
            form: 'sign',
            image: 'File:NZ_Railway_Sign_CTC_Ends.svg',
          },
          {
            id: 'NZ:ETCS_begins',
            name: 'ETCS Begins',
            terms: ['European Train Control System Begins'],
            form: 'sign',
            image: 'File:NZ_Railway_Sign_ETCS_Begins.svg',
          },
          {
            id: 'NZ:ETCS_ends',
            name: 'ETCS Ends',
            terms: ['European Train Control System Ends'],
            form: 'sign',
            image: 'File:NZ_Railway_Sign_ETCS_Ends.svg',
          },
          {
            id: 'NZ:TWC_begins',
            name: 'TWC Begins',
            terms: ['Track Warrant Control Begins'],
            form: 'sign',
            image: 'File:NZ_Railway_Sign_TWC_Begins.svg',
          },
          {
            id: 'NZ:TWC_ends',
            name: 'TWC Ends',
            terms: ['Track Warrant Control Ends'],
            form: 'sign',
            image: 'File:NZ_Railway_Sign_TWC_Ends.svg',
          },
        ],
        route: [
          {
            id: 'NZ:L',
            name: 'Loop Light',
            image: 'File:NZ_Railway_Sign_L.svg',
            form: 'light',
          },
          {
            id: 'NZ:E',
            name: 'Electrified Route',
            image: 'File:NZ_Railway_Sign_E.svg',
            form: 'light',
          },
          {
            id: 'NZ:route_indicator',
            name: 'Route Indicator',
            image: 'File:Theatre-boxes.jpg',
            form: 'light',
            extra: { states: { options: [] }, states_long: { options: [] } },
          },
        ],
        main_repeated: [
          {
            id: 'NZ:banner_indicator33',
            name: 'Double Banner Indicator',
            form: 'light',
            image: 'File:NZ_Railway_Signal_Banner_Indicator_double.svg',
          },
          {
            id: 'NZ:banner_indicator3D',
            name: 'Single Banner Indicator',
            form: 'light',
            image: 'File:NZ_Railway_Signal_Banner_Indicator_single.svg',
          },
        ],
        stop: [
          {
            id: 'NZ:emu_stop',
            name: 'EMU Stop',
            form: 'sign',
            image: 'File:NZ_Railway_Sign_EMU_Stop.svg',
          },
          {
            id: 'NZ:stop_disk',
            name: 'Stop Disk',
            form: 'sign',
            image: 'File:NZ_Railway_Sign_Stop_Disk.svg',
          },
          {
            id: 'NZ:stop_plate',
            name: 'Stop Plate',
            form: 'sign',
            image: 'File:NZ Railway Sign Stop Plate.svg',
          },
          {
            id: 'NZ:stop_block',
            name: 'Stop Block Entry',
            form: 'sign',
            image: 'File:NZ Railway Sign Stop Block Entry.svg',
          },
          {
            id: 'NZ:all_trains_stop',
            name: 'All Trains Stop',
            form: 'sign',
            image: 'File:NZ Railway Sign All Trains Stop.svg',
          },
        ],
        electricity: [
          {
            id: 'NZ:electric_limit',
            name: 'Electric Services Limit',
            form: 'sign',
            image: 'File:NZ Railway Sign Electric Services Limit.svg',
          },
        ],
        whistle: [
          {
            id: 'NZ:whistle',
            name: 'Whistle',
            form: 'sign',
            image: 'File:NZ_Railway_Sign_Whistle.svg',
          },
        ],
        crossing_hint: [
          {
            id: 'NZ:saltire',
            name: 'Level Crossing Ahead',
            form: 'sign',
            image: 'File:NZ_Railway_Sign_Level_Crossing.svg',
          },
        ],
        crossing_info: [
          {
            id: 'NZ:alarms_start_here',
            name: 'Alarms Start Here',
            form: 'sign',
            image: 'File:NZ Railway Sign Alarms Starts Here.svg',
          },
        ],
        radio: [
          {
            id: 'NZ:channel_area',
            name: 'Radio Channel Area',
            form: 'sign',
            image: 'File:NZ_Railway_Sign_Entering_Channel_Area.svg',
          },
        ],
      },
    },
  },
};
