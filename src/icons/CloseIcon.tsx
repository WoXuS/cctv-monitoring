import { IconProps } from '../types/icons';
import { COLORS } from '../utils/colors';

const CloseIcon = ({ color = COLORS.lightGray }: IconProps) => {
  return (
    <svg
      width='100'
      height='30'
      viewBox='0 0 100 30'
      xmlns='http://www.w3.org/2000/svg'
      fill={color}
    >
      <line x1='75' y1='10' x2='90' y2='25' stroke={color} strokeWidth='2' />
      <line x1='90' y1='10' x2='75' y2='25' stroke={color} strokeWidth='2' />
    </svg>
  );
};

export default CloseIcon;
