import FolderIcon from '@mui/icons-material/Folder';
import VideocamIcon from '@mui/icons-material/Videocam';
import VideocamOffIcon from '@mui/icons-material/VideocamOff';
import './styles.css';
import { COLORS } from '../../utils/colors';
import { useMediaPlayerContext } from '../../contexts/mediaPlayerContext';
import { catalogsData } from '../../utils/data';
import { Camera } from '../../types/catalogs';
import { setHours, setMinutes, setSeconds } from 'date-fns';

const Catalogs = () => {
  const {
    folders,
    cameras,
    setFolders,
    setCameras,
    setSelectedCamera,
    setCameraSequenceStep,
    setCurrentTime,
  } = useMediaPlayerContext();

  const handleCameraClick = (camera: Camera) => {
    setCameraSequenceStep(0);
    setSelectedCamera(camera);

    const [hours, minutes, seconds] = camera.videos[0].time.split(':');
    setCurrentTime((prevState) =>
      setHours(setMinutes(setSeconds(prevState, +seconds), +minutes), +hours)
    );
  };

  return (
    <div className='catalogs__wrapper'>
      <div className='catalogs__catalogs'>
        <p className='section__header'>KATALOG:</p>
        <div className='section__wrapper'>
          {catalogsData.map((catalog) => (
            <div
              key={catalog.name}
              className='section__row'
              onClick={() => setFolders(catalog.folders)}
            >
              <FolderIcon sx={{ color: COLORS.blue }} />
              <p>{catalog.name}</p>
            </div>
          ))}
        </div>
      </div>
      <div className='catalogs__folders'>
        <p className='section__header'>FOLDERY:</p>
        <div className='section__wrapper'>
          {folders.map((folder, index) => (
            <div
              key={folder.name}
              className='section__row'
              onClick={() => setCameras(folder.cameras)}
            >
              <FolderIcon sx={{ color: COLORS.blue }} />
              <p>{`${index < 9 ? `0${index + 1}` : index + 1}_${
                folder.name
              }`}</p>
            </div>
          ))}
        </div>
      </div>
      <div className='catalogs__cameras'>
        <p className='section__header'>KAMERY:</p>
        <div className='section__wrapper'>
          {cameras.map((camera) => (
            <div
              key={camera.name}
              className='section__row'
              onClick={() => handleCameraClick(camera)}
            >
              <p>{camera.name}</p>
              {camera.disabled ? (
                <VideocamOffIcon sx={{ color: COLORS.red }} />
              ) : (
                <VideocamIcon sx={{ color: COLORS.lightGray }} />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Catalogs;
