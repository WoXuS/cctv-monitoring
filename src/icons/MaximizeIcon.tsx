import { IconProps } from '../types/icons';
import { COLORS } from '../utils/colors';

const MinimizeIcon = ({ color = COLORS.lightGray }: IconProps) => {
  return (
    <svg
      width='100'
      height='30'
      viewBox='0 0 100 30'
      xmlns='http://www.w3.org/2000/svg'
      fill={color}
    >
      <rect
        x='40'
        y='10'
        width='15'
        height='15'
        stroke={color}
        fill='none'
        strokeWidth='2'
      />
    </svg>
  );
};

export default MinimizeIcon;
