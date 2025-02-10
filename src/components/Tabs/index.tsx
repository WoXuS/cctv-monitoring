import './styles.css';

import MonitorIcon from '@mui/icons-material/Monitor';
import PlaylistPlayIcon from '@mui/icons-material/PlaylistPlay';
import GridViewIcon from '@mui/icons-material/GridView';
import { COLORS } from '../../utils/colors';

const tabsData = [
  {
    title: 'Pogląd na ...',
    icon: <MonitorIcon />,
    active: false,
  },
  {
    title: 'Odtwarzanie',
    icon: <PlaylistPlayIcon />,
    active: true,
  },
  {
    title: 'Konserwacja',
    icon: null,
    active: false,
  },
];

const Tabs = () => {
  return (
    <div className='tabs__wrapper'>
      <GridViewIcon sx={{ fill: COLORS.white }} />
      {tabsData.map((tab) => {
        let className = 'tab';

        if (tab.active) className += ' --active';

        return (
          <div key={tab.title} className={className}>
            {tab.icon ? <div>{tab.icon} </div> : null}
            {tab.title}
          </div>
        );
      })}
    </div>
  );
};

export default Tabs;
