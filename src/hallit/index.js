import tali from './talintenniskeskus';
import meilahti from './meilahti';

const getAllAvailableHours = async date => {
  return await Promise.all([tali(date), meilahti(date)]);
};

export default getAllAvailableHours;
