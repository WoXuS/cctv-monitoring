import { addSeconds, format } from 'date-fns';
import { useMediaPlayerContext } from '../../contexts/mediaPlayerContext';
import { timelineLabels } from '../../utils/data';
import { useEffect } from 'react';

import './styles.css';

const Timeline = () => {
  const {
    cameraSequenceStep,
    videoUrl,
    selectedCamera,
    isPlaying,
    playbackSpeed,
    currentTime,
    timelineMarkerOffset,
    setCameraSequenceStep,
    setTimelineMarkerOffset,
    setCurrentTime,
  } = useMediaPlayerContext();

  const handleUpdateSequenceStep = () => {
    const newStep = cameraSequenceStep + 1;

    if (
      !videoUrl ||
      !selectedCamera ||
      selectedCamera?.videos.length <= newStep
    ) {
      return;
    }

    setCameraSequenceStep(newStep);
  };

  useEffect(() => {
    if (!videoUrl) return;

    const interval = setInterval(() => {
      setTimelineMarkerOffset((prevState) => prevState - 1);
      setCurrentTime((prevState) => addSeconds(prevState, 72));
    }, 50 / playbackSpeed);

    if (!isPlaying) clearInterval(interval);

    return () => clearInterval(interval);
  }, [isPlaying, videoUrl, playbackSpeed]);

  return (
    <div className='media-player__timeline' onClick={handleUpdateSequenceStep}>
      <div className='timeline__line'>
        {Array(10)
          .fill(timelineLabels)
          .flat()
          .map((marker, index) => (
            <div
              key={marker + index}
              className='line__marker'
              style={{
                left: `${timelineMarkerOffset + index * 100}px`,
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
