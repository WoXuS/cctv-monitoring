import {
  createContext,
  Dispatch,
  JSX,
  SetStateAction,
  useContext,
  useMemo,
  useState,
} from 'react';
import { Camera, Folder } from '../types/catalogs';
import { startOfToday } from 'date-fns';

interface MediaPlayerContextProps {
  folders: Folder[];
  setFolders: Dispatch<SetStateAction<Folder[]>>;
  cameras: Camera[];
  setCameras: Dispatch<SetStateAction<Camera[]>>;
  selectedCamera: Camera | null;
  setSelectedCamera: Dispatch<SetStateAction<Camera | null>>;
  currentDay: Date;
  setCurrentDay: Dispatch<SetStateAction<Date>>;
  currentMonth: number;
  setCurrentMonth: Dispatch<SetStateAction<number>>;
  currentYear: number;
  setCurrentYear: Dispatch<SetStateAction<number>>;
  videoUrl: string | null;
  cameraSequenceStep: number;
  setCameraSequenceStep: Dispatch<SetStateAction<number>>;
  timelineMarkerOffset: number;
  setTimelineMarkerOffset: Dispatch<SetStateAction<number>>;
  currentTimelineTime: Date;
  setCurrentTimelineTime: Dispatch<SetStateAction<Date>>;
  isPlaying: boolean;
  setIsPlaying: Dispatch<SetStateAction<boolean>>;
  playbackSpeed: number;
  setPlaybackSpeed: Dispatch<SetStateAction<number>>;
  handleResetAppState: () => void;
}

interface MediaPlayerContextProviderProps {
  children: JSX.Element;
}

export const MediaPlayerContext = createContext<MediaPlayerContextProps>({
  folders: [],
  setFolders: () => {},
  cameras: [],
  setCameras: () => {},
  selectedCamera: null,
  setSelectedCamera: () => {},
  currentDay: new Date(),
  setCurrentDay: () => {},
  currentMonth: 1,
  setCurrentMonth: () => {},
  currentYear: 2025,
  setCurrentYear: () => {},
  videoUrl: null,
  cameraSequenceStep: 0,
  setCameraSequenceStep: () => {},
  timelineMarkerOffset: 12,
  setTimelineMarkerOffset: () => {},
  currentTimelineTime: startOfToday(),
  setCurrentTimelineTime: () => {},
  isPlaying: true,
  setIsPlaying: () => {},
  playbackSpeed: 1,
  setPlaybackSpeed: () => {},
  handleResetAppState: () => {},
});

export const MediaPlayerContextProvider = ({
  children,
}: MediaPlayerContextProviderProps) => {
  const today = new Date();
  const [currentDay, setCurrentDay] = useState<Date>(today);
  const [currentMonth, setCurrentMonth] = useState<number>(
    today.getMonth() + 1
  );
  const [currentYear, setCurrentYear] = useState<number>(today.getFullYear());
  const [folders, setFolders] = useState<Folder[]>([]);
  const [cameras, setCameras] = useState<Camera[]>([]);
  const [selectedCamera, setSelectedCamera] = useState<Camera | null>(null);
  const [cameraSequenceStep, setCameraSequenceStep] = useState<number>(0);
  const [timelineMarkerOffset, setTimelineMarkerOffset] = useState<number>(12);
  const [currentTimelineTime, setCurrentTimelineTime] = useState<Date>(
    startOfToday()
  );
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);

  const videoUrl = useMemo(() => {
    if (!selectedCamera || !selectedCamera.videos.length) return null;

    return `/videos/${selectedCamera.videos[cameraSequenceStep]}.mp4`;
  }, [selectedCamera, cameraSequenceStep]);

  const handleResetAppState = () => {
    setFolders([]);
    setCameras([]);
    setSelectedCamera(null);
    setCurrentDay(today);
    setCurrentMonth(today.getMonth() + 1);
    setCurrentYear(today.getFullYear());
    setCameraSequenceStep(0);
    setTimelineMarkerOffset(12);
    setCurrentTimelineTime(startOfToday());
    setIsPlaying(true);
    setPlaybackSpeed(1);
  };

  return (
    <MediaPlayerContext.Provider
      value={{
        folders,
        setFolders,
        cameras,
        selectedCamera,
        setSelectedCamera,
        setCameras,
        currentDay,
        setCurrentDay,
        currentMonth,
        setCurrentMonth,
        currentYear,
        setCurrentYear,
        videoUrl,
        cameraSequenceStep,
        setCameraSequenceStep,
        timelineMarkerOffset,
        setTimelineMarkerOffset,
        currentTimelineTime,
        setCurrentTimelineTime,
        isPlaying,
        setIsPlaying,
        playbackSpeed,
        setPlaybackSpeed,
        handleResetAppState,
      }}
    >
      {children}
    </MediaPlayerContext.Provider>
  );
};

export const useMediaPlayerContext = () => {
  return useContext(MediaPlayerContext);
};
