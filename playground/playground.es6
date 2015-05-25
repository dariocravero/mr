import * as mr from '../index';
import { Flux } from 'flummox';
import buildMediaOverlayData from './build-media-overlay-data';
import buildPackage from './build-package';
import buildReader from './build-reader';
import FluxComponent from 'flummox/component';
import MediaOverlayDataInjector from '@hmh/readium/src/sdk/views/media-overlay-data-injector';
import MediaOverlayModel from '@hmh/readium/src/sdk/models/media-overlay';
import MediaOverlayPlayer from '@hmh/readium/src/sdk/views/media-overlay-player';
import React from 'react';
import ViewerSettings from '@hmh/readium/src/sdk/models/viewer-settings';
import ViewportContainer from '../viewport/container';

class QueriesFlux extends Flux {
  constructor() {
    super();
    this.queries = {};
  }

  createQueries(name, klass, ...options) {
    this.queries[name] = new klass(...options);
  }

  getQueries(name) {
    return this.queries[name];
  }
}

export default class AppFlux extends QueriesFlux {
  constructor() {
    super();

    this.createActions('publication', mr.Publication.Actions);
    this.createQueries('publication', mr.Publication.Queries, this);
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
  getPublicationStore() {
    return flux.getStore('publication');
  },
  getViewportStore() {
    return flux.getStore('viewport');
  },
  Readium: {
    mediaOverlay(viewerSettings = {}) {
      const store = flux.getStore('publication');
      let readiumViewerSettings = new ViewerSettings(viewerSettings);

      function onStatusChanged(...args) {
        console.log('#onStatusChanged', args);
      }

      return new Promise(resolve => {
        store.once('change', () => resolve(buildMediaOverlayData(store.metadata, store.smil)));
        store.smil;
      }).then(dto => {
        let readiumPackage = buildPackage(store.contentBaseUri, store.spine, dto);
        let model = MediaOverlayModel.fromDTO(dto, readiumPackage);
        let readiumReader = buildReader({
          readiumPackage,
          readiumViewerSettings,
          publicationStore: store,
          viewportStore: flux.getStore('viewport')
        });
        let player = new MediaOverlayPlayer(readiumReader, onStatusChanged);
        let dataInjector = new MediaOverlayDataInjector(model, player);
        readiumReader.dataInjector = dataInjector;
        readiumReader.initViewForItem();

        return {
          dataInjector,
          model,
          readiumPackage,
          player,
          readiumReader
        };
      });
    }
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
