import { Catalog } from '../types/catalogs';

export const catalogsData: Catalog[] = [
  {
    name: 'REJON_CENTRUM',
    folders: [
      {
        name: 'Dworzec',
        cameras: [],
      },
      {
        name: 'Wyzwolenia',
        cameras: [],
      },
      {
        name: 'Plac wolności',
        cameras: [],
      },
      {
        name: 'Rynek',
        cameras: [],
      },
      {
        name: 'Waliców',
        cameras: [],
      },
      {
        name: 'Browarna',
        cameras: [
          {
            name: 'CAM_059',
            videos: [],
            sequence: [],
            disabled: false,
          },
          { name: 'CAM_060', videos: [], sequence: [], disabled: false },
          { name: 'CAM_061', videos: [], sequence: [], disabled: false },
          { name: 'CAM_062', videos: [], sequence: [], disabled: false },
        ],
      },
      {
        name: 'Krakowska',
        cameras: [
          { name: 'CAM_055', videos: [], sequence: [], disabled: false },
          { name: 'CAM_056', videos: [], sequence: [], disabled: false },
          { name: 'CAM_057', videos: [], sequence: [], disabled: false },
        ],
      },
      {
        name: 'Sądowa',
        cameras: [],
      },
      {
        name: 'Szkolna',
        cameras: [
          { name: 'CAM_020', videos: [], sequence: [], disabled: false },
          { name: 'CAM_021', videos: [], sequence: [], disabled: false },
          { name: 'CAM_023', videos: [], sequence: [], disabled: false },
          {
            name: 'CAM_024',
            videos: [
              {
                url: '/videos/42.mp4',
                startTime: '02:10:01',
              },
            ],
            sequence: [],
            disabled: false,
          },
        ],
      },
      {
        name: 'Chopina',
        cameras: [
          {
            name: 'CAM_025',
            videos: [
              {
                url: '/videos/40.mp4',
                startTime: '02:08:50',
                endTime: '02:09:24',
              },
            ],
            sequence: [],
            disabled: false,
          },
          { name: 'CAM_026', videos: [], sequence: [], disabled: false },
          {
            name: 'CAM_027',
            videos: [
              {
                url: '/videos/39.mp4',
                startTime: '02:06:18',
              },
            ],
            sequence: [],
            disabled: false,
          },
          { name: 'CAM_028', videos: [], sequence: [], disabled: false },
        ],
      },
      {
        name: 'Stacja',
        cameras: [],
      },
      {
        name: 'Park',
        cameras: [],
      },
      {
        name: 'Rondo',
        cameras: [
          {
            name: 'CAM_039',
            videos: [
              {
                url: '/videos/13-14-15.mp4',
                startTime: '01:48:43',
              },
              {
                url: '/videos/19-26.mp4',
                startTime: '01:50:06',
              },
              {
                type: 'image',
                url: '/images/unavailable.png',
                startTime: '01:50:06',
              },
              {
                url: '/videos/22.mp4',
                startTime: '01:52:20',
              },
              {
                url: '/videos/28.mp4',
                startTime: '01:52:20',
              },
            ],
            sequence: ['skip', 'play', 'rewind', 'play'],
            onSequenceEnd: 'disable-camera',
            disabled: false,
          },
          {
            name: 'CAM_041',
            videos: [
              {
                url: '/videos/4.mp4',
                startTime: '04:03:03',
                endTime: '01:34:17',
              },
              {
                url: '/videos/6.mp4',
                startTime: '01:33:44',
                endTime: '01:33:49',
              },
              {
                url: '/videos/8.mp4',
                startTime: '01:34:02',
                endTime: '01:48:37',
              },
              {
                url: '/videos/10.mp4',
                startTime: '01:48:34',
                endTime: '01:48:29',
              },
              {
                url: '/videos/32.mp4',
                startTime: '01:52:13',
                endTime: '01:52:35',
              },
            ],
            sequence: ['pause', 'play', 'rewind'],
            disabled: false,
          },
          {
            name: 'CAM_042',
            videos: [
              {
                url: '/videos/34.mp4',
                startTime: '01:52:35',
              },
            ],
            sequence: [],
            disabled: false,
          },
          {
            name: 'CAM_044',
            videos: [
              {
                url: '/videos/36.mp4',
                startTime: '01:54:27',
              },
            ],
            sequence: [],
            disabled: false,
          },
          {
            name: 'CAM_045',
            videos: [
              {
                url: '/videos/37.mp4',
                startTime: '01:55:10',
              },
            ],
            sequence: [],
            disabled: false,
          },
        ],
      },
      {
        name: 'Szpital',
        cameras: [],
      },
      {
        name: 'DSR_S4',
        cameras: [],
      },
    ],
  },
  { name: 'REJON_KOLONIA', folders: [] },
  { name: 'REJON_ZALESIE', folders: [] },
  { name: 'REJON_ZATORZE', folders: [] },
];

export const timelineLabels = [
  '12:00',
  '14:00',
  '16:00',
  '18:00',
  '20:00',
  '22:00',
  '00:00',
  '02:00',
  '04:00',
  '06:00',
  '08:00',
  '10:00',
];
