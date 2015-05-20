import { StateRecord } from './records';
import { Store } from 'flummox';

export default class PublicationStore extends Store {
  static assignState(oldState, newState) { return newState }

  constructor(flux) {
    super();

    const actionIds = flux.getActionIds('publication');
    this.register(actionIds.load, this.load);

    this.state = new StateRecord();
  }

  get spine() { return this.state.spine }
  get contentBaseUri() { return `${this.state.uri}/OPS` }

  load(publication) {
    this.setState(new StateRecord(publication));
  }
}
