import { get } from '../utils/api';
import $ from 'jquery';
import { format } from 'date-fns';

const getAvailableHours = async date => {
  const today = format(date, 'yyyy-MM-dd');
  const url = `https://vj.slsystems.fi/tennispuisto/ftpages/ft-varaus-table-01.php?laji=1&pvm=${today}&goto=0`;
  const response = await get(url);
  const html = response.data.contents;
  const availableHours = $(html)
    .find('a')
    .map((_, e) =>
      $(e)
        .attr('href')
        .split('klo=')[1]
        .substring(0, 5)
    )
    .get();
  return {
    name: 'Tapiolan Tennispuisto',
    availableHours: [...new Set(availableHours)],
    link: url
  };
};

export default getAvailableHours;
