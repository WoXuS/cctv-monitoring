import { createPortal } from 'react-dom';
import './styles.css';
import { useMediaPlayerContext } from '../../contexts/mediaPlayerContext';
import CloseIcon from '@mui/icons-material/Close';
import { FormControlLabel, IconButton } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import { ChangeEvent } from 'react';

const modalWrapper = document.getElementById('portal');

const SettingsModal = () => {
  const {
    settingsModalOpen,
    shouldAutoplay,
    shouldShowVideoName,
    setShouldAutoplay,
    setShouldShowVideoName,
    setSettingsModalOpen,
  } = useMediaPlayerContext();

  const handleCloseModal = () => {
    setSettingsModalOpen(false);
  };

  if (!modalWrapper || !settingsModalOpen) return null;

  return createPortal(
    <>
      <div className='modal__overlay' onClick={handleCloseModal}></div>
      <div className='modal__wrapper'>
        <div className='modal__close'>
          <IconButton onClick={handleCloseModal}>
            <CloseIcon />
          </IconButton>
        </div>
        <div className='modal__options'>
          <FormControlLabel
            label='Autoplay video po wybraniu kamery'
            control={
              <Checkbox
                checked={shouldAutoplay}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  setShouldAutoplay(e.target.checked);
                }}
              />
            }
          />
          <FormControlLabel
            label='Pokaż nazwę aktualnego video'
            control={
              <Checkbox
                checked={shouldShowVideoName}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  setShouldShowVideoName(e.target.checked);
                }}
              />
            }
          />
        </div>
      </div>
    </>,
    modalWrapper
  );
};

export default SettingsModal;
