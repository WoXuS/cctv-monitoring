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
import { DEFAULT_DATE, DEFAULT_MONTH, DEFAULT_YEAR } from '../utils/defaults';

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
  currentTime: Date;
  setCurrentTime: Dispatch<SetStateAction<Date>>;
  isPlaying: boolean;
  setIsPlaying: Dispatch<SetStateAction<boolean>>;
  playbackSpeed: number;
  setPlaybackSpeed: Dispatch<SetStateAction<number>>;
  settingsModalOpen: boolean;
  setSettingsModalOpen: Dispatch<SetStateAction<boolean>>;
  shouldAutoplay: boolean;
  setShouldAutoplay: Dispatch<SetStateAction<boolean>>;
  shouldLoad: boolean;
  setShouldLoad: Dispatch<SetStateAction<boolean>>;
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
  currentTime: startOfToday(),
  setCurrentTime: () => {},
  isPlaying: true,
  setIsPlaying: () => {},
  playbackSpeed: 1,
  setPlaybackSpeed: () => {},
  settingsModalOpen: false,
  setSettingsModalOpen: () => {},
  shouldAutoplay: false,
  setShouldAutoplay: () => {},
  shouldLoad: false,
  setShouldLoad: () => {},
  handleResetAppState: () => {},
});

export const MediaPlayerContextProvider = ({
  children,
}: MediaPlayerContextProviderProps) => {
  const [currentDay, setCurrentDay] = useState<Date>(DEFAULT_DATE);
  const [currentMonth, setCurrentMonth] = useState<number>(DEFAULT_MONTH);
  const [currentYear, setCurrentYear] = useState<number>(DEFAULT_YEAR);
  const [folders, setFolders] = useState<Folder[]>([]);
  const [cameras, setCameras] = useState<Camera[]>([]);
  const [selectedCamera, setSelectedCamera] = useState<Camera | null>(null);
  const [cameraSequenceStep, setCameraSequenceStep] = useState<number>(0);
  const [timelineMarkerOffset, setTimelineMarkerOffset] = useState<number>(12);
  const [currentTime, setCurrentTime] = useState<Date>(startOfToday());
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [settingsModalOpen, setSettingsModalOpen] = useState(true);
  const [shouldAutoplay, setShouldAutoplay] = useState(false);
  const [shouldLoad, setShouldLoad] = useState(false);

  const videoUrl = useMemo(() => {
    if (!selectedCamera || !selectedCamera.videos.length) return null;

    return selectedCamera.videos[cameraSequenceStep].url;
  }, [selectedCamera, cameraSequenceStep]);

  const handleResetAppState = () => {
    setFolders([]);
    setCameras([]);
    setSelectedCamera(null);
    setCurrentDay(DEFAULT_DATE);
    setCurrentMonth(DEFAULT_MONTH);
    setCurrentYear(DEFAULT_YEAR);
    setCameraSequenceStep(0);
    setTimelineMarkerOffset(12);
    setCurrentTime(startOfToday());
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
        currentTime,
        setCurrentTime,
        isPlaying,
        setIsPlaying,
        playbackSpeed,
        setPlaybackSpeed,
        settingsModalOpen,
        setSettingsModalOpen,
        shouldAutoplay,
        setShouldAutoplay,
        shouldLoad,
        setShouldLoad,
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
