import 'react-datepicker/dist/react-datepicker.css';
import React from 'react';
import { format, parseISO } from 'date-fns';
import DatePicker from 'react-datepicker';
import TimeRangePicker from './components/TimeRangePicker';
import { Alert, AlertIcon, Box, Heading, Link } from '@chakra-ui/core';

import { client } from './utils/api';

const urlParams = new URLSearchParams(window.location.search);
const startUrlParam = urlParams.get('start');
const endUrlParam = urlParams.get('end');
const dateUrlParam = urlParams.get('date') && parseISO(urlParams.get('date'));

const formatDate = (date) => {
  return format(date, 'yyyy-MM-dd');
};

const resolveSearchDate = (date) => {
  const today = new Date();
  if (!date) {
    return today;
  }
  return date < today ? today : date;
};

const getHours = (data, searchDate) => {
  if (!data) {
    return [];
  }

  const byDay = data.availableHours.reduce((acc, cur) => {
    if (!acc[cur.day]) {
      acc[cur.day] = [cur];
      return acc;
    }
    acc[cur.day] = [...acc[cur.day], cur];
    return acc;
  }, {});

  const allByDay = byDay[format(searchDate, 'yyyy-MM-dd')];

  if (!allByDay) {
    return [];
  }

  const byHallId = allByDay
    .filter(
      (i) => ['INSIDE', 'INFLATED'].includes(i.courtType) && !i.thirtyMinutes
    )
    .reduce((acc, cur) => {
      if (!acc[cur.hallId]) {
        acc[cur.hallId] = {
          name: data.halls.find((hall) => hall.id === cur.hallId).name,
          availableHours: [cur.hour],
          link: cur.link,
        };
        return acc;
      }
      acc[cur.hallId].availableHours = [
        ...new Set([...acc[cur.hallId].availableHours, cur.hour]),
      ];
      return acc;
    }, {});

  return data.halls
    .slice()
    .sort((a, b) => {
      const nameA = a.name.toUpperCase();
      const nameB = b.name.toUpperCase();
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      return 0;
    })
    .map((hall) => ({
      name: hall.name,
      availableHours: byHallId[hall.id]?.availableHours ?? [],
      link: byHallId[hall.id]?.link ?? hall.link,
    }));
};

function App() {
  const [data, setData] = React.useState();
  const [searchDate, setSearchDate] = React.useState(
    resolveSearchDate(dateUrlParam)
  );
  const [[start, end], setTimeRange] = React.useState([
    startUrlParam || '06:00',
    endUrlParam || '22:00',
  ]);
  const [places, setPlaces] = React.useState([]);

  React.useEffect(() => {
    client
      .get('https://pelivuorot.herokuapp.com/api/available-hours')
      .then((response) => setData(response.data));
  }, []);

  React.useEffect(() => {
    setPlaces(getHours(data, searchDate));
  }, [setPlaces, searchDate, data]);

  React.useEffect(() => {
    window.history.pushState(
      '',
      '',
      `/vapaat-tennisvuorot/?date=${formatDate(
        searchDate
      )}&start=${start}&end=${end}`
    );
  }, [searchDate, start, end]);

  const handleTimeRangeChange = React.useCallback(
    (range) => setTimeRange(range),
    []
  );

  return (
    <div style={{ maxWidth: '100%', padding: '10px' }}>
      <Alert mb="2rem">
        <AlertIcon />
        Vapaat tennisvuorot löytyy nyt osoitteesta{' '}
        <Link ml="10px" href="https://pelivuorot.com" isExternal>
          www.pelivuorot.com
        </Link>
      </Alert>
      <Heading mb="2rem">Vapaat tennisvuorot</Heading>
      <DatePicker
        selected={searchDate}
        onChange={(date) => {
          setSearchDate(date);
          setPlaces([]);
        }}
        minDate={new Date()}
        inline
      />
      <TimeRangePicker onChange={handleTimeRangeChange} from={start} to={end} />
      {places.length > 0 ? (
        places.map((place) => (
          <div key={place.name}>
            <a href={place.link} target="_blank" rel="noopener noreferrer">
              <Heading size="sm" my="1rem">
                {place.name}
              </Heading>
            </a>

            {place.error ? (
              <h2>Virhe vuorojen latauksessa.</h2>
            ) : (
              renderHours(place, start, end)
            )}
          </div>
        ))
      ) : (
        <div style={{ marginTop: '20px' }}>
          <h2>
            {!data
              ? 'Ladataan vapaita vuoroja...'
              : 'Valittu päivämäärä ylittää kaksi viikkoa nykyhetkestä, katso vapaat ajat hallien sivuilta'}
          </h2>
        </div>
      )}
    </div>
  );
}

function renderHours(place, start, end) {
  const hours = place.availableHours
    .filter(
      (hour) =>
        parseInt(hour) >= parseInt(start) && parseInt(hour) <= parseInt(end)
    )
    .map((hour) => (
      <a href={place.link} key={hour} target="_blank" rel="noopener noreferrer">
        <span
          style={{
            display: 'inline-block',
            margin: '5px',
            border: 'solid',
            borderWidth: '1px',
            padding: '3px',
          }}
        >
          {hour}
        </span>
      </a>
    ));
  return hours.length > 0 ? hours : <Box>Ei vapaita vuoroja.</Box>;
}

export default App;
