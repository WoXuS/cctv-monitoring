import ReactPlayer from 'react-player';
import { useEffect, useState } from 'react';
import {
  CircularProgress,
  IconButton,
  Slider,
  Typography,
} from '@mui/material';
import unavailable from '../../assets/images/unavailable.png';

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
    videoUrl,
    selectedCamera,
    playbackSpeed,
    isPlaying,
    cameraSequenceStep,
    shouldAutoplay,
    shouldLoad,
    setPlaybackSpeed,
    setIsPlaying,
    setCameraSequenceStep,
    setSettingsModalOpen,
  } = useMediaPlayerContext();

  const [volume, setVolume] = useState(35);
  const [isLoading, setIsLoading] = useState(false);

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

    if (
      selectedCamera.sequence[cameraSequenceStep] === control &&
      newStep < selectedCamera.videos.length
    ) {
      setCameraSequenceStep(newStep);
    }
  };

  const handleVideoEnded = () => {
    setIsPlaying(false);
  };

  useEffect(() => {
    if (!videoUrl) return;

    if (shouldAutoplay) {
      setIsPlaying(true);
    }

    if (shouldLoad) {
      setIsLoading(true);
      setTimeout(() => setIsLoading(false), 500);
    }
  }, [videoUrl]);

  return (
    <div className='media-player__wrapper'>
      <div className='media-player__video'>
        {videoUrl ? (
          isLoading ? (
            <div className='loader'>
              <CircularProgress size={120} />
            </div>
          ) : (
            <ReactPlayer
              url={videoUrl}
              height={'100%'}
              width={'100%'}
              volume={0}
              muted
              playing={isPlaying}
              playbackRate={playbackSpeed}
              onEnded={handleVideoEnded}
            />
          )
        ) : selectedCamera?.disabled ? (
          <img src={unavailable} />
        ) : null}
      </div>
      <div className='media-player__controls'>
        <div className='controls__volume'>
          <VolumeUp sx={{ ...iconStyles, width: 30, height: 30 }} />
          <Slider
            value={35}
            onChange={handleUpdateVolume}
            sx={{
              color: COLORS.lightGray,
              '.MuiSlider-thumb': { color: COLORS.white },
            }}
          />
        </div>
        <div className='controls__controls'>
          <IconButton onClick={() => handleSequenceControlClick('rewind')}>
            <FastRewindIcon sx={iconStyles} />
          </IconButton>
          <IconButton
            onClick={() => handlePlayPauseClick(false)}
            sx={videoUrl && !isPlaying ? activeButtonStyles : {}}
          >
            <PauseIcon sx={iconStyles} />
          </IconButton>
          <IconButton
            onClick={() => handlePlayPauseClick(true)}
            sx={videoUrl && isPlaying ? activeButtonStyles : {}}
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
          <IconButton onClick={() => handleSequenceControlClick('skip')}>
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
      <Timeline />
    </div>
  );
};

export default MediaPlayer;
