export interface Camera {
  name: string;
  disabled: boolean;
  videos: {
    type?: string;
    url: string;
    startTime: string;
    endTime?: string;
  }[];
  sequence: SequenceStepStype[];
  onSequenceEnd?: string;
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
