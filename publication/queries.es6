import { smil as extractSmil } from './parser/extract';

export default class PublicationQueries {
  constructor(flux) {
    this.actions = {
      loadSmil: flux.getActions('publication').loadSmil
    };

    this.smil = this.smil.bind(this);
  }

  async smil(uri, spine, manifest, mediaOverlayDurations) {
    this.actions.loadSmil(await extractSmil(uri, spine, manifest, mediaOverlayDurations));
  }
}
