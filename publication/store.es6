import { List } from 'immutable';
import { StateRecord } from './records';
import { Store } from 'flummox';

export default class PublicationStore extends Store {
  static assignState(oldState, newState) { return newState }

  constructor(flux) {
    super();

    const actionIds = flux.getActionIds('publication');
    this.register(actionIds.load, this.load);
    this.register(actionIds.loadSmil, this.loadSmil);

    this.querying = List();
    this.queries = {
      smil: flux.getQueries('publication').smil
    };

    this.state = new StateRecord();
  }

  get contentBaseUri() { return `${this.state.uri}/OPS` }
  get metadata() { return this.state.metadata }
  get ready() { return this.state.ready }
  get smil() {
    if (!this.state.smil && !this.querying.contains('smil')) {
      if (this.ready) {
        this.querying = this.querying.push('smil');
        this.queries.smil(this.state.uri, this.state.spine, this.state.manifest, this.state.metadata.mediaOverlayDurations);
      }
    }
    return this.state.smil;
  }
  get spine() { return this.state.spine }
  getSpineItemByIndex(index) { return this.state.spine[index] }

  load(publication) {
    this.setState(new StateRecord({
      ...publication,
      ready: true
    }));
  }
  loadSmil(smil) {
    this.querying = this.querying.filter(f => f !== 'smil');
    this.setState(this.state.set('smil', smil));
  }
}
