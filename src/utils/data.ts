import { Catalog } from '../types/catalogs';

export const catalogsData: Catalog[] = [
  {
    name: 'Centrum',
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
        name: 'Galeria handlowa',
        cameras: [],
      },
      {
        name: 'Chopina',
        cameras: [],
      },
      {
        name: 'Krakowska',
        cameras: [],
      },
      {
        name: 'Rynek',
        cameras: [
          { name: 'CAM_01', videos: ['4', '6', '8', '10'] },
          { name: 'CAM_02', videos: ['6'] },
          { name: 'CAM_03', videos: ['8'] },
          { name: 'CAM_04', videos: ['10'] },
        ],
      },
      {
        name: 'Sądowa',
        cameras: [],
      },
      {
        name: 'Szkolna',
        cameras: [
          { name: 'CAM_01', videos: [] },
          { name: 'CAM_03', videos: [] },
          {
            name: 'CAM_04',
            videos: [],
          },
        ],
      },
      {
        name: 'Waliców',
        cameras: [],
      },
      {
        name: 'Stacja',
        cameras: [],
      },
      {
        name: 'Park',
        cameras: [
          { name: 'CAM_01', videos: [] },
          { name: 'CAM_02', videos: [] },
          {
            name: 'CAM_03',
            disabled: true,
            videos: [],
          },
        ],
      },
      {
        name: 'Rondo',
        cameras: [
          { name: 'CAM_01', videos: [] },
          { name: 'CAM_02', videos: [] },
          { name: 'CAM_03', videos: [] },
          { name: 'CAM_04', videos: [] },
        ],
      },
      {
        name: 'Szpital',
        cameras: [],
      },
      {
        name: 'DRR_S4',
        cameras: [],
      },
    ],
  },
  { name: 'Kolonia', folders: [] },
  { name: 'Zalesie', folders: [] },
  { name: 'Zatorze', folders: [] },
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
