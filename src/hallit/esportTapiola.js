import { get } from '../utils/api';
import $ from 'jquery';
import { format } from 'date-fns';

const getAvailableHours = async url => {
  const response = await get(url);
  const html = response.data.contents;
  const availableHours = $(html)
    .find('tr[class=state_R],tr[class=state_F]')
    .filter(
      (_, e) => $(e).find('td[class="state_white res_success"]').length > 0
    )
    .map((_, e) => {
      return $(e)
        .text()
        .split(' - ')[0];
    })
    .get();
  return availableHours;
};

const esport1 = async date => {
  const today = format(date, 'dd.MM.yyyy');
  const courts10To14 = `https://varaus.esportcenter.fi/varaus/index.php?func=mod_rc_v2&pageId=3&cdate=${today}`;
  const availableHours = await getAvailableHours(courts10To14);
  return {
    name: 'Esport Center Tapiola 1-8',
    availableHours,
    link: courts10To14
  };
};

const esport2 = async date => {
  const today = format(date, 'dd.MM.yyyy');
  const courts1To8 = `https://varaus.esportcenter.fi/varaus/index.php?func=mod_rc_v2&pageId=4&cdate=${today}`;
  const availableHours = await getAvailableHours(courts1To8);
  return {
    name: 'Esport Center Tapiola 10-14',
    availableHours,
    link: courts1To8
  };
};

export default { esport1, esport2 };
