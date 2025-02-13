import {
  addMilliseconds,
  differenceInMinutes,
  format,
  startOfDay,
  subHours,
} from 'date-fns';
import { useMediaPlayerContext } from '../../contexts/mediaPlayerContext';
import { timelineLabels } from '../../utils/data';
import { useEffect } from 'react';

import './styles.css';

interface TimelineProps {
  timeRatio: number;
}

const Timeline = ({ timeRatio }: TimelineProps) => {
  const {
    cameraSequenceStep,
    currentVideo,
    selectedCamera,
    isPlaying,
    playbackSpeed,
    currentTime,
    timelineMarkerOffset,
    setTimelineMarkerOffset,
    setCurrentTime,
    setCameraSequenceStep,
  } = useMediaPlayerContext();

  const handleTimelineClick = () => {
    const newStep = cameraSequenceStep + 1;

    if (
      !currentVideo ||
      !selectedCamera ||
      selectedCamera?.videos.length <= newStep
    ) {
      return;
    }

    setCameraSequenceStep(newStep);
  };

  useEffect(() => {
    if (!currentVideo) return;

    const interval = setInterval(() => {
      setCurrentTime((prevState) => addMilliseconds(prevState, 50 * timeRatio));
      setTimelineMarkerOffset((prevState) => prevState - 1);
    }, 50);

    if (!isPlaying) clearInterval(interval);

    return () => clearInterval(interval);
  }, [isPlaying, currentVideo, playbackSpeed, cameraSequenceStep]);

  useEffect(() => {
    const timeDiff = differenceInMinutes(
      subHours(startOfDay(currentTime), 10),
      currentTime
    );

    setTimelineMarkerOffset(612 + timeDiff);
  }, [currentTime]);

  return (
    <div className='media-player__timeline' onClick={handleTimelineClick}>
      <div
        className={`timeline__line${
          selectedCamera?.disabled ? ' line--disabled' : ''
        }`}
      >
        {Array(10)
          .fill(timelineLabels)
          .flat()
          .map((marker, index) => (
            <div
              key={marker + index}
              className={`line__marker${
                selectedCamera?.disabled ? ' marker--disabled' : ''
              }`}
              style={{
                left: `${timelineMarkerOffset + index * 120}px`,
              }}
            >
              {marker}
            </div>
          ))}
      </div>
      <div className='timeline__time'>{format(currentTime, 'HH:mm:ss')}</div>
      <div className='timeline__pointer'></div>
    </div>
  );
};

export default Timeline;
