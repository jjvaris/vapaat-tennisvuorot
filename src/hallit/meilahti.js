import axios from 'axios';
import $ from 'jquery';
import { format, addDays } from 'date-fns';

const getAvailableHours = async date => {
  const today = format(addDays(date, 1), 'yyyy-MM-dd');
  const originalUri = `https://meilahti.slsystems.fi/booking/booking-calendar?BookingCalForm%5Bp_laji%5D=1&BookingCalForm%5Bp_pvm%5D=${today}&BookingCalForm%5Bp_pvm_interval%5D=-1&BookingCalForm%5Bp_pvm_custom%5D=Maanantai+09.03.2020`;
  const uri = `https://api.allorigins.win/get?url=${encodeURIComponent(
    originalUri
  )}`;
  const response = await axios.get(uri);
  const html = response.data.contents;
  const availableHours = $(html)
    .find('a[class=time-link]')
    .map((_, e) => $(e).text())
    .get();
  return {
    name: 'Meilahden liikuntakeskus',
    availableHours,
    link: originalUri
  };
};

export default getAvailableHours;
