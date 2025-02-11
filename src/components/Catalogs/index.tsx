import FolderIcon from '@mui/icons-material/Folder';
import VideocamIcon from '@mui/icons-material/Videocam';
import VideocamOffIcon from '@mui/icons-material/VideocamOff';
import './styles.css';
import { COLORS } from '../../utils/colors';
import { useMediaPlayerContext } from '../../contexts/mediaPlayerContext';
import { Camera } from '../../types/catalogs';

const Catalogs = () => {
  const {
    selectedCatalog,
    selectedFolder,
    selectedCamera,
    catalogsData,
    setSelectedCatalog,
    setSelectedFolder,
    setSelectedCamera,
    setCameraSequenceStep,
  } = useMediaPlayerContext();

  const handleCameraClick = (camera: Camera) => {
    if (
      camera.name === 'CAM_041' &&
      catalogsData[0].folders[12].cameras[0].disabled
    ) {
      setCameraSequenceStep(4);
    } else {
      setCameraSequenceStep(0);
    }

    setSelectedCamera(camera);
  };

  return (
    <div className='catalogs__wrapper'>
      <div className='catalogs__catalogs'>
        <p className='section__header'>KATALOG:</p>
        <div className='section__wrapper'>
          {catalogsData.map((catalog) => (
            <div
              key={catalog.name}
              className={`${
                selectedCatalog && selectedCatalog.name === catalog.name
                  ? '--selected '
                  : ''
              }section__row`}
              onClick={() => setSelectedCatalog(catalog)}
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
          {selectedCatalog?.folders.map((folder, index) => (
            <div
              key={folder.name}
              className={`${
                selectedFolder && selectedFolder.name === folder.name
                  ? '--selected '
                  : ''
              }section__row`}
              onClick={() => setSelectedFolder(folder)}
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
          {selectedFolder?.cameras.map((camera) => (
            <div
              key={camera.name}
              className={`${
                camera.disabled
                  ? '--disabled '
                  : camera.name === selectedCamera?.name
                  ? '--selected '
                  : ''
              }section__row`}
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
