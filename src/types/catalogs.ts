export interface Video {
  type?: string;
  url: string;
  startTime: string;
  endTime?: string;
  rewinded?: {
    start: number;
    end?: number;
  };
  fastForwarded?: {
    start: number;
    end?: number;
  };
}

export interface Camera {
  name: string;
  disabled: boolean;
  wasPlayed: boolean;
  videos: Video[];
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
  | 'timeline'
  | 'calendar';
