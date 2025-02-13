import {
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  setMonth,
  setYear,
  startOfMonth,
  startOfWeek,
  isSameMonth,
  isSameDay,
  addWeeks,
} from 'date-fns';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

import './styles.css';
import { IconButton } from '@mui/material';
import { COLORS } from '../../utils/colors';
import { useMediaPlayerContext } from '../../contexts/mediaPlayerContext';

const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const Calendar = () => {
  const {
    currentDay,
    currentMonth,
    currentYear,
    cameraSequenceStep,
    currentVideo,
    selectedCamera,
    setCameraSequenceStep,
    setCurrentDay,
    setCurrentMonth,
    setCurrentYear,
  } = useMediaPlayerContext();

  const date = setYear(setMonth(new Date(), currentMonth - 1), currentYear);
  const days = eachDayOfInterval({
    start: startOfWeek(startOfMonth(date), { weekStartsOn: 0 }),
    end: endOfWeek(endOfMonth(date), { weekStartsOn: 0 }),
  });
  const filteredDays =
    days.length < 36
      ? eachDayOfInterval({
          start: startOfWeek(startOfMonth(date), { weekStartsOn: 0 }),
          end: endOfWeek(addWeeks(endOfMonth(date), 1), { weekStartsOn: 0 }),
        })
      : days;

  const handleUpdateMonth = (step: number) => {
    let newMonthValue = currentMonth + step;
    let newYearValue = currentYear;

    if (newMonthValue > 12) {
      newMonthValue = 1;
      newYearValue++;
    } else if (newMonthValue < 1) {
      newMonthValue = 12;
      newYearValue--;
    }

    setCurrentMonth(newMonthValue);
    setCurrentYear(newYearValue);
  };

  const handleUpdateYear = (step: number) => {
    setCurrentYear((prevState) => prevState + step);
  };

  const handleUpdateDay = (day: Date) => {
    setCurrentDay(day);
    handleUpdateSequenceStep();
  };

  const handleUpdateSequenceStep = () => {
    const newStep = cameraSequenceStep + 1;

    if (
      !currentVideo ||
      !selectedCamera ||
      selectedCamera?.videos.length <= newStep
    ) {
      return;
    }

    setCameraSequenceStep(newStep);
  };

  return (
    <div className='calendar__wrapper'>
      <div className='calendar__details'>
        <p>Wyszukaj</p>
        <div className='date-picker__wrapper'>
          <div className='date-picker__headline'>
            <p>Data:</p>
            <CalendarMonthIcon sx={{ color: COLORS.white }} />
          </div>
          <div>
            <input
              className='date-picker'
              value={format(currentDay, 'dd/MM/yyyy')}
            />
          </div>
        </div>
        <div className='time__wrapper'>
          <p>Godzina: </p>
          <input className='input' value='00:00:00' />
          <p>--</p>
          <input className='input' value='23:59:59' />
        </div>
      </div>
      <div className='calendar__calendar'>
        <div className='calendar__controls'>
          <div className='calendar__control'>
            <IconButton onClick={() => handleUpdateMonth(-1)}>
              <ArrowBackIcon sx={{ color: COLORS.white }} />
            </IconButton>
            <p>{currentMonth}</p>
            <IconButton onClick={() => handleUpdateMonth(1)}>
              <ArrowForwardIcon sx={{ color: COLORS.white }} />
            </IconButton>
          </div>
          <div className='calendar__control'>
            <IconButton onClick={() => handleUpdateYear(-1)}>
              <ArrowBackIcon sx={{ color: COLORS.white }} />
            </IconButton>
            <p>{currentYear}</p>
            <IconButton onClick={() => handleUpdateYear(1)}>
              <ArrowForwardIcon sx={{ color: COLORS.white }} />
            </IconButton>
          </div>
        </div>
        <div className='calendar__days'>
          {weekDays.map((day, index) => (
            <p
              key={day}
              className='calendar__day'
              style={{
                color: index === 5 || index === 6 ? COLORS.blue : COLORS.white,
              }}
            >
              {day}
            </p>
          ))}
        </div>
        <div className='days-wrapper'>
          {filteredDays.map((day, index) => (
            <div
              key={day.toISOString()}
              className='day'
              style={{
                color: isSameDay(day, currentDay)
                  ? COLORS.white
                  : !isSameMonth(day, date)
                  ? COLORS.lightGray
                  : index % 7 === 5 || index % 7 === 6
                  ? COLORS.blue
                  : COLORS.white,
                backgroundColor: isSameDay(day, currentDay)
                  ? COLORS.blue
                  : 'transparent',
              }}
              onClick={() => handleUpdateDay(day)}
            >
              {format(day, 'd')}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Calendar;
