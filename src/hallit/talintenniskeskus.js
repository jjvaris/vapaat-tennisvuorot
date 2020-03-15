import { get } from '../utils/api';
import $ from 'jquery';
import { format, subDays } from 'date-fns';

const getAvailableHours = async date => {
  const today = format(subDays(date, 1), 'yyyy-MM-dd');
  const url = `https://varaukset.talintenniskeskus.fi/booking/booking-calendar?BookingCalForm%5Bp_laji%5D=1&BookingCalForm%5Bp_pvm%5D=${today}&BookingCalForm%5Bp_pvm_interval%5D=1&BookingCalForm%5Bp_pvm_custom%5D=Sunnuntai+08.03.2020`;
  const response = await get(url);
  const html = response.data.contents;
  const availableHours = $($.parseHTML(html))
    .find('a[class=time-link]')
    .map((_, e) => $(e).text())
    .get();
  return { name: 'Talin Tenniskeskus', availableHours, link: url };
};

export default getAvailableHours;
