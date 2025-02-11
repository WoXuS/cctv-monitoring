import { createPortal } from 'react-dom';
import './styles.css';
import { useMediaPlayerContext } from '../../contexts/mediaPlayerContext';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import { ChangeEvent } from 'react';

const modalWrapper = document.getElementById('portal');

const SettingsModal = () => {
  const {
    settingsModalOpen,
    shouldAutoplay,
    shouldLoad,
    setShouldAutoplay,
    setShouldLoad,
    setSettingsModalOpen,
  } = useMediaPlayerContext();

  const handleCloseModal = () => {
    setSettingsModalOpen(false);
  };

  if (!modalWrapper || !settingsModalOpen) return null;

  return createPortal(
    <div className='modal__wrapper'>
      <div className='modal__close'>
        <IconButton onClick={handleCloseModal}>
          <CloseIcon />
        </IconButton>
      </div>
      <div className='modal__options'>
        <div className='option__wrapper'>
          <Checkbox
            checked={shouldAutoplay}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setShouldAutoplay(e.target.checked);
            }}
          />
          <p>Autoplay video po wybraniu kamery</p>
        </div>
        <div className='option__wrapper'>
          <Checkbox
            checked={shouldLoad}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setShouldLoad(e.target.checked);
            }}
          />
          <p>Ładowanie video z kamery</p>
        </div>
      </div>
    </div>,
    modalWrapper
  );
};

export default SettingsModal;
