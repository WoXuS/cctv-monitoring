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
        name: 'Browarnia',
        cameras: [
          { name: 'CAM_059', videos: [] },
          { name: 'CAM_060', videos: [] },
          { name: 'CAM_061', videos: [] },
          { name: 'CAM_062', videos: [] },
        ],
      },
      {
        name: 'Krakowska',
        cameras: [
          { name: 'CAM_055', videos: ['4', '6', '8', '10'] },
          { name: 'CAM_056', videos: ['6'] },
          { name: 'CAM_057', videos: ['8'] },
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
          { name: 'CAM_024', videos: [] },
        ],
      },
      {
        name: 'Chopina',
        cameras: [
          { name: 'CAM_025', videos: [] },
          { name: 'CAM_026', videos: [] },
          { name: 'CAM_027', videos: [] },
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
          { name: 'CAM_039', videos: [], disabled: true },
          { name: 'CAM_041', videos: [] },
          { name: 'CAM_042', videos: [] },
          { name: 'CAM_044', videos: [] },
          { name: 'CAM_045', videos: [] },
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
