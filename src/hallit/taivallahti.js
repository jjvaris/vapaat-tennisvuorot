import { get } from '../utils/api';
import $ from 'jquery';
import { format } from 'date-fns';

const getAvailableHours = async date => {
  const today = format(date, 'yyyy-MM-dd');
  const url = `https://varaukset.talintenniskeskus.fi/booking/booking-calendar?BookingCalForm%5Bp_laji%5D=5&BookingCalForm%5Bp_pvm%5D=${today}&BookingCalForm%5Bp_pvm_interval%5D=&BookingCalForm%5Bp_pvm_custom%5D=Sunnuntai+15.03.2020`;
  const response = await get(url);
  const html = response.data.contents;
  const availableHours = $(html)
    .find('a[class=time-link]')
    .map((_, e) => $(e).text())
    .get();
  return { name: 'Taivallahti', availableHours, link: url };
};

export default getAvailableHours;
