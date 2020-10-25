import { get } from '../utils/api';
import $ from 'jquery';
import { format } from 'date-fns';

const getAvailableHours = async (date) => {
  const today = format(date, 'yyyy-MM-dd');
  const url = `https://smashcenter.slsystems.fi/booking/booking-calendar?BookingCalForm%5Bp_laji%5D=1&BookingCalForm%5Bp_pvm%5D=${today}&BookingCalForm%5Bp_pvm_interval%5D=&BookingCalForm%5Bp_calmode%5D=2&BookingCalForm%5Bp_pvm_custom%5D=Torstai+12.03.2020`;
  const response = await get(url);
  const html = response.data.contents;
  const availableHours = $($.parseHTML(html))
    .find('td[class="s-avail"]')
    .map((_, e) => {
      return $(e).text().trim();
    })
    .get()
    .filter((hour) => hour.startsWith('K'))
    .filter((hour) => !hour.startsWith('K14'))
    .map((hour) => {
      const s = hour.split(':');
      return `${s[0].substring(s[0].length - 2)}:${s[1].substring(0, 2)}`;
    });
  return {
    name: 'Smash Center Helsinki',
    availableHours: [...new Set(availableHours)],
    link: url,
  };
};

export default getAvailableHours;
