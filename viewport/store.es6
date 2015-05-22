import { StateRecord } from './records';
import { Store } from 'flummox';

export default class ViewportStore extends Store {
  static assignState(oldState, newState) { return newState }

  constructor(flux) {
    super();

    const actionIds = flux.getActionIds('viewport');
    this.register(actionIds.setSpineItem, this.setSpineItem);

    const publicationActionIds = flux.getActionIds('publication');
    this.register(publicationActionIds.load, this.init);

    this.state = new StateRecord();
  }

  init(publication) { this.setSpineItem(publication.spine[1]) }
  get spineItem() { return this.state.spineItem }
  setSpineItem(spineItem) { this.setState(this.state.set('spineItem', spineItem)) }
}
