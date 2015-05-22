import Component from './component';
import FluxComponent from 'flummox/component';
import React from 'react';

export default class RendererContainer extends React.Component {
  get stores() {
    return {
      publication: store => ({contentBaseUri: store.contentBaseUri, smil: store.smil}),
      renderer: store => ({spineItem: store.spineItem})
    };
  }

  render() {
    return <FluxComponent connectToStores={this.stores}><Component /></FluxComponent>;
  }
}
