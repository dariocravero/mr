import * as mr from '../index';
import { Flux } from 'flummox';
import FluxComponent from 'flummox/component';
import React from 'react';
import ViewportContainer from '../viewport/container';

class QueriesFlux extends Flux {
  constructor() {
    super();

    this.queries = {};
  }

  createQueries(name, klass) {
    this.queries[name] = new klass(this);
  }

  getQueries(name) {
    return this.queries[name];
  }
}

export default class AppFlux extends QueriesFlux {
  constructor() {
    super();

    this.createActions('publication', mr.Publication.Actions);
    this.createQueries('publication', mr.Publication.Queries);
    this.createStore('publication', mr.Publication.Store, this);

    this.createActions('viewport', mr.Viewport.Actions);
    this.createStore('viewport', mr.Viewport.Store, this);
  }
}

const flux = new AppFlux();

let Playground = {
  flux,
  mr,
  loadBook(name) {
    flux.getActions('publication').load(`/books/${name}`);
  },
  loadSpineItemIndex(index) {
    flux.getActions('viewport').setSpineItemIndex(index);
  },
  getPublicationState() {
    return flux.getStore('publication').state;
  },
  getViewportState() {
    return flux.getStore('viewport').state;
  }
};
window.Playground = Playground;

console.log('Welcome to mr playground.');
console.log('https://github.com/dariocravero/mr');
console.log('Playground module', Playground);

// Start at a different spine item index
// Playground.loadSpineItemIndex(2);
Playground.loadBook('xplor8');

React.render(
  <FluxComponent flux={flux}>
    <ViewportContainer />
  </FluxComponent>,
  document.getElementById('playground-container')
);
