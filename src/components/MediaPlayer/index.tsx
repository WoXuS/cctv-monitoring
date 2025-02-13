import ReactPlayer from 'react-player';
import { useEffect, useState } from 'react';
import {
  CircularProgress,
  IconButton,
  Slider,
  Typography,
} from '@mui/material';

import './styles.css';

import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import FastRewindIcon from '@mui/icons-material/FastRewind';
import FastForwardIcon from '@mui/icons-material/FastForward';
import StopIcon from '@mui/icons-material/Stop';
import VolumeUp from '@mui/icons-material/VolumeUp';
import SettingsIcon from '@mui/icons-material/Settings';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import EjectIcon from '@mui/icons-material/Eject';
import { COLORS } from '../../utils/colors';
import { useMediaPlayerContext } from '../../contexts/mediaPlayerContext';
import Timeline from '../Timeline';
import { SequenceStepStype } from '../../types/catalogs';
import {
  differenceInSeconds,
  setHours,
  setMinutes,
  setSeconds,
} from 'date-fns';

const iconStyles = {
  color: COLORS.lightGray,
  width: 50,
  height: 50,
};

const activeButtonStyles = {
  backgroundColor: COLORS.gray,
  svg: { path: { fill: COLORS.white } },
};

const MediaPlayer = () => {
  const {
    currentVideo,
    selectedCamera,
    playbackSpeed,
    isPlaying,
    cameraSequenceStep,
    shouldAutoplay,
    shouldLoad,
    shouldShowVideoName,
    currentDay,
    setCurrentTime,
    setCatalogsData,
    setPlaybackSpeed,
    setIsPlaying,
    setCameraSequenceStep,
    setSettingsModalOpen,
  } = useMediaPlayerContext();

  const [volume, setVolume] = useState(35);
  const [isLoading, setIsLoading] = useState(false);
  const [timeRatio, setTimeRatio] = useState(1);

  const handleUpdateVolume = (_: Event, newValue: number | number[]) => {
    setVolume(newValue as number);
  };

  const handleUpdatePlaybackSpeed = () => {
    const newStep = playbackSpeed === 3 ? 1 : playbackSpeed + 1;
    setPlaybackSpeed(newStep);
  };

  const handlePlayPauseClick = (play: boolean) => {
    if (!selectedCamera) return;

    setIsPlaying(play);

    const control = play ? 'play' : 'pause';

    handleSequenceControlClick(control);
  };

  const handleSequenceControlClick = (control: SequenceStepStype) => {
    if (!selectedCamera) return;

    const newStep = cameraSequenceStep + 1;

    if (newStep < selectedCamera.videos.length) {
      if (control === 'play' && isPlaying === false) {
        setIsPlaying(true);
        return;
      }

      if (
        selectedCamera.sequence[cameraSequenceStep] === control &&
        newStep < selectedCamera.videos.length
      ) {
        setCameraSequenceStep(newStep);
      } else if (control !== 'pause') {
        setIsPlaying(true);
      }
    } else if (selectedCamera?.onSequenceEnd === 'disable-camera') {
      setCatalogsData((prevState) => {
        const newState = [...prevState];
        newState[0].folders[12].cameras[0].disabled = true;
        return newState;
      });
    }
  };

  const handleVideoEnded = () => {
    if (!selectedCamera) return;

    setIsPlaying(false);

    const newStep = cameraSequenceStep + 1;
    if (newStep < selectedCamera.videos.length) {
      setCameraSequenceStep(newStep);
    } else if (selectedCamera?.onSequenceEnd === 'disable-camera') {
      setCatalogsData((prevState) => {
        const newState = [...prevState];
        newState[0].folders[12].cameras[0].disabled = true;
        return newState;
      });
    }
  };

  const handleSetTimeline = (videoDuration: number) => {
    if (!selectedCamera || !selectedCamera.videos[cameraSequenceStep].endTime)
      return;

    const [startHours, startMinutes, startSeconds] =
      selectedCamera.videos[cameraSequenceStep].startTime.split(':');
    const [endHours, endMinutes, endSeconds] =
      selectedCamera.videos[cameraSequenceStep].endTime.split(':');

    const startTime = setHours(
      setMinutes(setSeconds(currentDay, +startSeconds), +startMinutes),
      +startHours
    );
    const endTime = setHours(
      setMinutes(setSeconds(currentDay, +endSeconds), +endMinutes),
      +endHours
    );

    const diff = differenceInSeconds(endTime, startTime);
    const ratio = diff / Math.floor(videoDuration);

    setTimeRatio(ratio);
    setCurrentTime(startTime);
  };

  useEffect(() => {
    if (!currentVideo || !selectedCamera) return;

    if (shouldAutoplay || !selectedCamera?.sequence.length) {
      setIsPlaying(true);
    }

    if (shouldLoad) {
      setIsLoading(true);
      setTimeout(() => setIsLoading(false), 500);
    }
  }, [currentVideo]);

  return (
    <div className='media-player__wrapper'>
      <div className='media-player__video'>
        {currentVideo ? (
          isLoading ? (
            <div className='loader'>
              <CircularProgress size={120} />
            </div>
          ) : selectedCamera?.videos[cameraSequenceStep].type === 'image' ? (
            <img src={currentVideo.url} />
          ) : (
            <ReactPlayer
              url={currentVideo.url}
              height={'100%'}
              width={'100%'}
              volume={0}
              muted
              playing={isPlaying}
              playbackRate={playbackSpeed}
              onEnded={handleVideoEnded}
              onDuration={handleSetTimeline}
            />
          )
        ) : null}
        {shouldShowVideoName && (
          <div className='current-video-name'>{currentVideo?.url}</div>
        )}
      </div>
      <div className='media-player__controls'>
        <div className='controls__volume'>
          <VolumeUp sx={{ ...iconStyles, width: 30, height: 30 }} />
          <Slider
            value={volume}
            onChange={handleUpdateVolume}
            sx={{
              color: COLORS.lightGray,
              '.MuiSlider-thumb': { color: COLORS.white },
            }}
          />
        </div>
        <div className='controls__controls'>
          <IconButton
            onClick={() => handleSequenceControlClick('rewind')}
            sx={
              currentVideo && currentVideo?.isRewinded && isPlaying
                ? activeButtonStyles
                : {}
            }
          >
            <FastRewindIcon sx={iconStyles} />
          </IconButton>
          <IconButton
            onClick={() => handlePlayPauseClick(false)}
            sx={currentVideo && !isPlaying ? activeButtonStyles : {}}
          >
            <PauseIcon sx={iconStyles} />
          </IconButton>
          <IconButton
            onClick={() => handlePlayPauseClick(true)}
            sx={
              currentVideo &&
              isPlaying &&
              !currentVideo?.isRewinded &&
              !currentVideo?.isFastforwared
                ? activeButtonStyles
                : {}
            }
          >
            <PlayArrowIcon sx={iconStyles} />
          </IconButton>
          <IconButton onClick={() => setIsPlaying(false)}>
            <StopIcon sx={iconStyles} />
          </IconButton>
          <IconButton>
            <SkipNextIcon sx={iconStyles} />
          </IconButton>
          <IconButton>
            <EjectIcon sx={{ ...iconStyles, transform: 'rotate(90deg)' }} />
          </IconButton>
          <IconButton onClick={handleUpdatePlaybackSpeed}>
            <Typography
              sx={{
                ...iconStyles,
                fontWeight: 700,
                fontSize: 28,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >{`X${playbackSpeed}`}</Typography>
          </IconButton>
          <IconButton
            onClick={() => handleSequenceControlClick('skip')}
            sx={
              currentVideo && currentVideo?.isFastforwared && isPlaying
                ? activeButtonStyles
                : {}
            }
          >
            <FastForwardIcon sx={iconStyles} />
          </IconButton>
        </div>
        <div className='controls__settings'>
          <IconButton onClick={() => setSettingsModalOpen(true)}>
            <SettingsIcon
              sx={{ ...iconStyles, color: COLORS.white, width: 30, height: 30 }}
            />
          </IconButton>
        </div>
      </div>
      <Timeline timeRatio={timeRatio} />
    </div>
  );
};

export default MediaPlayer;
