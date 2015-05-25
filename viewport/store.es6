import { StateRecord } from './records';
import { Store } from 'flummox';

export default class ViewportStore extends Store {
  static assignState(oldState, newState) { return newState }

  constructor(flux) {
    super();

    const actionIds = flux.getActionIds('viewport');
    this.register(actionIds.setSpineItemIndex, this.setSpineItemIndex);

    this.state = new StateRecord({
      id: `viewport-${new Date().getTime()}`
    });
  }

  get id() { return this.state.id }
  get spineItemIndex() { return this.state.spineItemIndex }
  setSpineItemIndex(index) { this.setState(this.state.set('spineItemIndex', index)) }
}
