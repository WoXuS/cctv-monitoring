import FolderIcon from '@mui/icons-material/Folder';
import VideocamIcon from '@mui/icons-material/Videocam';
import VideocamOffIcon from '@mui/icons-material/VideocamOff';
import './styles.css';
import { COLORS } from '../../utils/colors';
import { useMediaPlayerContext } from '../../contexts/mediaPlayerContext';
import { Camera, Catalog, Folder } from '../../types/catalogs';

const Catalogs = () => {
  const {
    selectedCatalog,
    selectedFolder,
    selectedCamera,
    catalogsData,
    setCatalogsData,
    setSelectedCatalog,
    setSelectedFolder,
    setSelectedCamera,
    setCameraSequenceStep,
  } = useMediaPlayerContext();

  const handleCameraClick = (camera: Camera) => {
    // fml
    // setting custom sequences
    if (selectedCatalog && selectedFolder && selectedCamera && camera) {
      setCatalogsData((prevState) => {
        const newState = [...prevState];

        const catalogIndex = catalogsData.indexOf(selectedCatalog);
        const folderIndex =
          catalogsData[catalogIndex].folders.indexOf(selectedFolder);
        const cameraIndex =
          catalogsData[catalogIndex].folders[folderIndex].cameras.indexOf(
            selectedCamera
          );

        if (newState[catalogIndex].folders[folderIndex].cameras[cameraIndex]) {
          newState[catalogIndex].folders[folderIndex].cameras[
            cameraIndex
          ].wasPlayed = true;
        }

        return newState;
      });
    }

    if (camera.wasPlayed) {
      switch (camera.name) {
        case 'CAM_041': {
          setCameraSequenceStep(4);
          break;
        }
        case 'CAM_021': {
          setCameraSequenceStep(1);
          break;
        }
        case 'CAM_022': {
          setCameraSequenceStep(2);
          break;
        }
      }
    } else {
      setCameraSequenceStep(0);
    }

    setSelectedCamera(camera);
  };

  const handleSelectCatalog = (catalog: Catalog) => {
    if (catalog.name === selectedCatalog?.name) return;

    setSelectedCatalog(catalog);
    setSelectedFolder(null);
    setSelectedCamera(null);
  };

  const handleSelectFolder = (folder: Folder) => {
    if (folder.name === selectedFolder?.name) return;

    setSelectedFolder(folder);
    setSelectedCamera(null);
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
              onClick={() => handleSelectCatalog(catalog)}
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
              onClick={() => handleSelectFolder(folder)}
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
                camera.name === selectedCamera?.name ? '--selected ' : ''
              }${camera.disabled ? '--disabled ' : ''}section__row`}
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
