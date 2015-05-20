import { StateRecord } from './records';
import { Store } from 'flummox';

export default class RendererStore extends Store {
  static assignState(oldState, newState) { return newState }

  constructor(flux) {
    super();

    const actionIds = flux.getActionIds('renderer');
    this.register(actionIds.setSpineItem, this.setSpineItem);

    const publicationActionIds = flux.getActionIds('publication');
    this.register(publicationActionIds.load, this.initialise);

    this.state = new StateRecord();
  }

  initialise(publication) {
    this.setSpineItem(publication.spine[1]);
  }

  get spineItem() { return this.state.spineItem }

  setSpineItem(spineItem) {
    this.setState(this.state.set('spineItem', spineItem));
  }
}
