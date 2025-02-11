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
            videos: [
              {
                url: '/videos/4.mp4',
                time: '01:34:17',
              },
              {
                url: '/videos/6.mp4',
                time: '01:33:44',
              },
              {
                url: '/videos/8.mp4',
                time: '01:34:02',
              },
              {
                url: '/videos/4.mp4',
                time: '01:48:34',
              },
              {
                url: '/videos/32.mp4',
                time: '01:52:13',
              },
            ],
          },
          { name: 'CAM_060', videos: [] },
          { name: 'CAM_061', videos: [] },
          { name: 'CAM_062', videos: [] },
        ],
      },
      {
        name: 'Krakowska',
        cameras: [
          { name: 'CAM_055', videos: [] },
          { name: 'CAM_056', videos: [] },
          { name: 'CAM_057', videos: [] },
        ],
      },
      {
        name: 'Sądowa',
        cameras: [],
      },
      {
        name: 'Szkolna',
        cameras: [
          { name: 'CAM_020', videos: [] },
          { name: 'CAM_021', videos: [] },
          { name: 'CAM_023', videos: [] },
          {
            name: 'CAM_024',
            videos: [
              {
                url: '/videos/42.mp4',
                time: '02:10:01',
              },
            ],
          },
        ],
      },
      {
        name: 'Chopina',
        cameras: [
          { name: 'CAM_025', videos: [] },
          { name: 'CAM_026', videos: [] },
          {
            name: 'CAM_027',
            videos: [
              {
                url: '/videos/39-40.mp4',
                time: '02:06:18',
              },
            ],
          },
          { name: 'CAM_028', videos: [] },
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
                time: '01:48:43',
              },
              {
                url: '/videos/19-26.mp4',
                time: '01:50:06',
              },
              {
                url: '/videos/28.mp4',
                time: '01:52:20',
              },
            ],
            disabled: true,
          },
          { name: 'CAM_041', videos: [] },
          {
            name: 'CAM_042',
            videos: [
              {
                url: '/videos/34.mp4',
                time: '01:52:35',
              },
            ],
          },
          {
            name: 'CAM_044',
            videos: [
              {
                url: '/videos/36.mp4',
                time: '01:54:27',
              },
            ],
          },
          {
            name: 'CAM_045',
            videos: [
              {
                url: '/videos/37.mp4',
                time: '01:55:10',
              },
            ],
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
