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
import { differenceInSeconds } from 'date-fns';
import { getTimeDate } from '../../utils/date';

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
    shouldShowVideoName,
    currentDay,
    fastControl,
    setFastControl,
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

  const handleAutoControls = () => {
    if (!currentVideo) return;

    if (currentVideo.rewinded?.start) {
      setTimeout(() => setFastControl('rewind'), currentVideo.rewinded.start);
    }

    if (currentVideo.rewinded?.end) {
      setTimeout(() => setFastControl(null), currentVideo.rewinded.end);
    }

    if (currentVideo.fastForwarded?.start) {
      setTimeout(
        () => setFastControl('forward'),
        currentVideo.fastForwarded.start
      );
    }

    if (currentVideo.fastForwarded?.end) {
      setTimeout(() => setFastControl(null), currentVideo.fastForwarded.end);
    }
  };

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
    handleAutoControls();

    const control = play ? 'play' : 'pause';

    if (control === 'play' && isPlaying === false) {
      setIsPlaying(true);
      return;
    }

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
    if (!selectedCamera) {
      return;
    }

    const video = selectedCamera.videos[cameraSequenceStep];

    if (!video.endTime) {
      return;
    }

    const startTime = getTimeDate(currentDay, video.startTime);
    const endTime = getTimeDate(currentDay, video.endTime);
    const diff = differenceInSeconds(endTime, startTime);
    const ratio = diff / Math.floor(videoDuration);

    setTimeRatio(ratio);
    setCurrentTime(startTime);
  };

  const handleVideoReady = () => {
    if (!currentVideo) return;

    setIsLoading(false);
    setIsPlaying(false);

    if (shouldAutoplay || !selectedCamera?.sequence.length) {
      handleAutoControls();
      setIsPlaying(true);
    }
  };

  const handleRewindClick = () => {
    setFastControl(fastControl === 'rewind' ? null : 'rewind');
    handleSequenceControlClick('rewind');
  };

  const handleForwardClick = () => {
    setFastControl(fastControl === 'forward' ? null : 'forward');
    handleSequenceControlClick('skip');
  };

  useEffect(() => {
    if (!currentVideo) return;

    setIsLoading(true);
    setFastControl(null);
  }, [currentVideo]);

  useEffect(() => {
    if (!selectedCamera || !selectedCamera.disabled) return;

    setIsPlaying(false);
  }, [selectedCamera]);

  return (
    <div className='media-player__wrapper'>
      <div className='media-player__video'>
        {selectedCamera?.disabled ? (
          <div className='camera-disabled'>
            <img src='/images/ERROR_MEMORY_CORRUPTED.jpg' />
          </div>
        ) : currentVideo ? (
          selectedCamera?.videos[cameraSequenceStep].type === 'image' ? (
            <img src={currentVideo.url} />
          ) : (
            <>
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
                onError={(err) => console.log(err)}
                onReady={handleVideoReady}
              />
              {isLoading ? (
                <div className='loader'>
                  <CircularProgress size={150} />
                </div>
              ) : null}
            </>
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
            onClick={handleRewindClick}
            sx={
              !selectedCamera?.disabled &&
              currentVideo &&
              isPlaying &&
              fastControl === 'rewind'
                ? activeButtonStyles
                : {}
            }
          >
            <FastRewindIcon sx={iconStyles} />
          </IconButton>
          <IconButton
            onClick={() => handlePlayPauseClick(false)}
            sx={
              !selectedCamera?.disabled && currentVideo && !isPlaying
                ? activeButtonStyles
                : {}
            }
          >
            <PauseIcon sx={iconStyles} />
          </IconButton>
          <IconButton
            onClick={() => handlePlayPauseClick(true)}
            sx={
              !selectedCamera?.disabled &&
              currentVideo &&
              isPlaying &&
              !fastControl
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
            onClick={handleForwardClick}
            sx={
              !selectedCamera?.disabled &&
              currentVideo &&
              isPlaying &&
              fastControl === 'forward'
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
