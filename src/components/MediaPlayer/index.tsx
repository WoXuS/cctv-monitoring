import ReactPlayer from 'react-player';
import { useState } from 'react';
import { IconButton, Slider, Typography } from '@mui/material';
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

const iconStyles = {
  color: COLORS.lightGray,
  width: 50,
  height: 50,
};

const MediaPlayer = () => {
  const {
    videoUrl,
    selectedCamera,
    playbackSpeed,
    isPlaying,
    setPlaybackSpeed,
    setIsPlaying,
  } = useMediaPlayerContext();

  const [volume, setVolume] = useState(35);

  const handleUpdateVolume = (_: Event, newValue: number | number[]) => {
    setVolume(newValue as number);
  };

  const handleUpdatePlaybackSpeed = () => {
    const newStep = playbackSpeed === 3 ? 1 : playbackSpeed + 1;
    setPlaybackSpeed(newStep);
  };

  console.log(selectedCamera);

  return (
    <div className='media-player__wrapper'>
      <div className='media-player__video'>
        {videoUrl ? (
          <ReactPlayer
            url={videoUrl}
            height={'100%'}
            width={'100%'}
            volume={0}
            muted
            playing={isPlaying}
            playbackRate={playbackSpeed}
          />
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
          <IconButton>
            <FastRewindIcon sx={iconStyles} />
          </IconButton>
          <IconButton onClick={() => setIsPlaying(false)}>
            <PauseIcon sx={iconStyles} />
          </IconButton>
          <IconButton onClick={() => setIsPlaying(true)}>
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
              color={COLORS.lightGray}
              fontWeight={700}
              fontSize={26}
            >{`X${playbackSpeed}`}</Typography>
          </IconButton>
          <IconButton>
            <FastForwardIcon sx={iconStyles} />
          </IconButton>
        </div>
        <div className='controls__settings'>
          <IconButton>
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
