import Component from './component';
import FluxComponent from 'flummox/component';
import React from 'react';

class ViewportInnerContainer extends React.Component {
  get stores() {
    return {
      publication: store => ({
        contentBaseUri: store.contentBaseUri,
        spineItem: store.getSpineItemByIndex(this.props.spineItemIndex)
      })
    };
  }

  render() {
    return (
      this.props.ready ?
        <FluxComponent connectToStores={this.stores}><Component /></FluxComponent> :
        <span>loading</span>
    );
  }
}

ViewportInnerContainer.propTypes = {
  ready: React.PropTypes.bool.isRequired,
  spineItemIndex: React.PropTypes.number.isRequired
}

export default class ViewportContainer extends React.Component {
  get stores() {
    return {
      publication: store => ({ready: store.ready}),
      viewport: store => ({spineItemIndex: store.spineItemIndex})
    };
  }

  render() {
    return <FluxComponent connectToStores={this.stores}><ViewportInnerContainer /></FluxComponent>;
  }
}
