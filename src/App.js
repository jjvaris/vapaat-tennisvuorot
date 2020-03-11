import 'react-datepicker/dist/react-datepicker.css';
import React from 'react';
import getAllAvailableHours from './hallit';
import { format, parseISO } from 'date-fns';
import DatePicker from 'react-datepicker';
import TimeRangePicker from './components/TimeRangePicker';
import { Box, Heading } from '@chakra-ui/core';

const urlParams = new URLSearchParams(window.location.search);
const startUrlParam = urlParams.get('start');
const endUrlParam = urlParams.get('end');
const dateUrlParam = urlParams.get('date') && parseISO(urlParams.get('date'));

const formatDate = date => {
  return format(date, 'yyyy-MM-dd');
};

function App() {
  const [searchDate, setSearchDate] = React.useState(
    dateUrlParam || new Date()
  );
  const [[start, end], setTimeRange] = React.useState([
    startUrlParam || '06:00',
    endUrlParam || '22:00'
  ]);
  const [places, setPlaces] = React.useState([]);

  React.useEffect(() => {
    async function fetchAvailableHours(date) {
      setPlaces(await getAllAvailableHours(date));
    }

    fetchAvailableHours(searchDate);
  }, [setPlaces, searchDate]);

  React.useEffect(() => {
    window.history.pushState(
      '',
      '',
      `/?date=${formatDate(searchDate)}&start=${start}&end=${end}`
    );
  }, [searchDate, start, end]);

  const handleTimeRangeChange = React.useCallback(
    range => setTimeRange(range),
    []
  );

  return (
    <div style={{ maxWidth: '100%', padding: '10px' }}>
      <Heading mb="2rem">Vapaat tennisvuorot</Heading>
      <DatePicker
        selected={searchDate}
        onChange={date => {
          setSearchDate(date);
          setPlaces([]);
        }}
        minDate={new Date()}
        inline
      />
      <TimeRangePicker onChange={handleTimeRangeChange} from={start} to={end} />
      {places.length > 0 ? (
        places.map(place => (
          <div key={place.name}>
            <a href={place.link} target="_blank" rel="noopener noreferrer">
              <Heading size="sm" my="1rem">
                {place.name}
              </Heading>
            </a>
            {renderHours(place, start, end)}
          </div>
        ))
      ) : (
        <div style={{ marginTop: '20px' }}>
          <h2>Ladataan vapaita vuoroja...</h2>
        </div>
      )}
    </div>
  );
}

function renderHours(place, start, end) {
  const hours = place.availableHours
    .filter(
      hour => parseInt(hour) > parseInt(start) && parseInt(hour) < parseInt(end)
    )
    .map(hour => (
      <a href={place.link} key={hour} target="_blank" rel="noopener noreferrer">
        <span
          style={{
            display: 'inline-block',
            margin: '5px',
            border: 'solid',
            borderWidth: '1px',
            padding: '3px'
          }}
        >
          {hour}
        </span>
      </a>
    ));
  return hours.length > 0 ? hours : <Box>Ei vapaita vuoroja.</Box>;
}

export default App;
