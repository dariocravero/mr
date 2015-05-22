import { Actions } from 'flummox';
import parse from './parser';

export default class PublicationActions extends Actions {
  async load(uri) {
    return await parse(uri);
  }

  loadSmil(smil) {
    return smil;
  }
}
