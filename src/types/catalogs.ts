export interface Camera {
  name: string;
  disabled?: boolean;
  videos: {
    url: string;
    time: string;
  }[];
  sequence: SequenceStepStype[];
}

export interface Folder {
  name: string;
  cameras: Camera[];
}

export interface Catalog {
  name: string;
  folders: Folder[];
}

export type SequenceStepStype =
  | 'skip'
  | 'rewind'
  | 'play'
  | 'pause'
  | 'timeline';
