import tali from './talintenniskeskus';
import meilahti from './meilahti';
import taivallahti from './taivallahti';
import esport from './esportTapiola';
import smashHelsinki from './smashHelsinki';
import smashOlari from './smashOlari';
import tennispuisto from './tennispuisto';

const error = place => error => ({ name: place, error: true });

const getAllAvailableHours = async date =>
  await Promise.all([
    tali(date).catch(error('Talin Tenniskeskus')),
    taivallahti(date).catch(error('Taivallahti')),
    meilahti(date).catch(error('Meilahden liikuntakeskus')),
    esport.esport1(date).catch(error('Esport Center Tapiola 1-8')),
    esport.esport2(date).catch(error('Esport Center Tapiola 10-14')),
    tennispuisto(date).catch(error('Tapiolan Tennispuisto')),
    smashHelsinki(date).catch(error('Smash Center Helsink')),
    smashOlari(date).catch(error('Smash Center Olari'))
  ]);

export default getAllAvailableHours;
