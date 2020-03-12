import tali from './talintenniskeskus';
import meilahti from './meilahti';
import taivallahti from './taivallahti';
import esport from './esportTapiola';
import smash from './smash';

const getAllAvailableHours = async date =>
  await Promise.all([
    tali(date),
    meilahti(date),
    taivallahti(date),
    esport.esport1(date),
    esport.esport2(date),
    smash(date)
  ]);

export default getAllAvailableHours;
