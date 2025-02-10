export interface Camera {
  name: string;
  disabled?: boolean;
  videos: string[];
}

export interface Folder {
  name: string;
  cameras: Camera[];
}

export interface Catalog {
  name: string;
  folders: Folder[];
}
