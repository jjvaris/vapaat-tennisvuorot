import React from 'react';
import { Flex, Select, Box } from '@chakra-ui/core';

const HOURS = [
  '06:00',
  '07:00',
  '08:00',
  '09:00',
  '10:00',
  '11:00',
  '12:00',
  '13:00',
  '14:00',
  '15:00',
  '16:00',
  '17:00',
  '18:00',
  '19:00',
  '20:00',
  '21:00',
  '22:00'
];

const TimeRangePicker = ({ onChange, from, to }) => {
  const [start, setStart] = React.useState(from);
  const [end, setEnd] = React.useState(to);

  React.useEffect(() => {
    onChange([start, end]);
  }, [start, end, onChange]);

  return (
    <Flex align="center" justify="center" w="240px">
      <Select
        size="sm"
        value={start}
        onChange={e => setStart(e.target.value)}
        iconSize="0"
        w="55px"
        p="0.1rem"
        style={{ textAlignLast: 'center' }}
      >
        {HOURS.slice(0, -1)
          .filter(hour => hour < end)
          .map(hour => (
            <option value={hour} key={hour}>
              {hour}
            </option>
          ))}
      </Select>
      <Box mx="5px">-</Box>
      <Select
        size="sm"
        value={end}
        onChange={e => setEnd(e.target.value)}
        iconSize="0"
        w="55px"
        p="0.1rem"
        style={{ textAlignLast: 'center' }}
      >
        {HOURS.slice(1)
          .filter(hour => hour > start)
          .map(hour => (
            <option value={hour} key={hour}>
              {hour}
            </option>
          ))}
      </Select>
    </Flex>
  );
};

export default TimeRangePicker;
