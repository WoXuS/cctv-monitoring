import {
  createContext,
  Dispatch,
  JSX,
  SetStateAction,
  useContext,
  useMemo,
  useState,
} from 'react';
import { Camera, Catalog, Folder } from '../types/catalogs';
import { startOfToday } from 'date-fns';
import { DEFAULT_DATE, DEFAULT_MONTH, DEFAULT_YEAR } from '../utils/defaults';
import { catalogsData as initialCatalogsData } from '../utils/data';

interface MediaPlayerContextProps {
  catalogsData: Catalog[];
  setCatalogsData: Dispatch<SetStateAction<Catalog[]>>;
  selectedCatalog: Catalog | null;
  setSelectedCatalog: Dispatch<SetStateAction<Catalog | null>>;
  selectedFolder: Folder | null;
  setSelectedFolder: Dispatch<SetStateAction<Folder | null>>;
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
  shouldShowVideoName: boolean;
  setShouldShowVideoName: Dispatch<SetStateAction<boolean>>;
  handleResetAppState: () => void;
}

interface MediaPlayerContextProviderProps {
  children: JSX.Element;
}

export const MediaPlayerContext = createContext<MediaPlayerContextProps>({
  catalogsData: initialCatalogsData,
  setCatalogsData: () => {},
  selectedCatalog: null,
  setSelectedCatalog: () => {},
  selectedFolder: null,
  setSelectedFolder: () => {},
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
  shouldShowVideoName: false,
  setShouldShowVideoName: () => {},
  handleResetAppState: () => {},
});

export const MediaPlayerContextProvider = ({
  children,
}: MediaPlayerContextProviderProps) => {
  const [catalogsData, setCatalogsData] = useState(initialCatalogsData);
  const [currentDay, setCurrentDay] = useState<Date>(DEFAULT_DATE);
  const [currentMonth, setCurrentMonth] = useState<number>(DEFAULT_MONTH);
  const [currentYear, setCurrentYear] = useState<number>(DEFAULT_YEAR);
  const [selectedCatalog, setSelectedCatalog] = useState<Catalog | null>(null);
  const [selectedFolder, setSelectedFolder] = useState<Folder | null>(null);
  const [selectedCamera, setSelectedCamera] = useState<Camera | null>(null);
  const [cameraSequenceStep, setCameraSequenceStep] = useState<number>(0);
  const [timelineMarkerOffset, setTimelineMarkerOffset] = useState<number>(12);
  const [currentTime, setCurrentTime] = useState<Date>(startOfToday());
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [settingsModalOpen, setSettingsModalOpen] = useState(false);
  const [shouldAutoplay, setShouldAutoplay] = useState(false);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [shouldShowVideoName, setShouldShowVideoName] = useState(false);

  const videoUrl = useMemo(() => {
    if (!selectedCamera || !selectedCamera.videos.length) return null;

    return selectedCamera.videos[cameraSequenceStep].url;
  }, [selectedCamera, cameraSequenceStep]);

  const handleResetAppState = () => {
    setCatalogsData(initialCatalogsData);
    setSelectedCatalog(null);
    setSelectedFolder(null);
    setSelectedCamera(null);
    setCurrentDay(DEFAULT_DATE);
    setCurrentMonth(DEFAULT_MONTH);
    setCurrentYear(DEFAULT_YEAR);
    setCurrentTime(startOfToday());
    setCameraSequenceStep(0);
    setTimelineMarkerOffset(12);
    setCurrentTime(startOfToday());
    setIsPlaying(false);
    setPlaybackSpeed(1);
  };

  return (
    <MediaPlayerContext.Provider
      value={{
        catalogsData,
        setCatalogsData,
        selectedCatalog,
        setSelectedCatalog,
        selectedFolder,
        setSelectedFolder,
        selectedCamera,
        setSelectedCamera,
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
        shouldShowVideoName,
        setShouldShowVideoName,
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
