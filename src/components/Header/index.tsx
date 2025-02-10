import { IconButton } from '@mui/material';
import { useMediaPlayerContext } from '../../contexts/mediaPlayerContext';
import CloseIcon from '@mui/icons-material/Close';
import CropSquareIcon from '@mui/icons-material/CropSquare';
import MinimizeIcon from '@mui/icons-material/Minimize';

import './styles.css';
import { COLORS } from '../../utils/colors';

const Header = () => {
  const { handleResetAppState } = useMediaPlayerContext();

  return (
    <div className='header'>
      <IconButton>
        <MinimizeIcon sx={{ color: COLORS.lightGray }} />
      </IconButton>
      <IconButton>
        <CropSquareIcon sx={{ color: COLORS.lightGray }} />
      </IconButton>
      <IconButton onClick={handleResetAppState}>
        <CloseIcon sx={{ color: COLORS.lightGray }} />
      </IconButton>
    </div>
  );
};

export default Header;
