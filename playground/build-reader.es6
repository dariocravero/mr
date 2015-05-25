export default function buildReader({readiumPackage, readiumViewerSettings, publicationStore, viewportStore}) {
  return {
    $iframe() { return [document.getElementById(viewportStore.id)] },
    initViewForItem(spineItem, callback) {
      this.dataInjector.attachMediaOverlayData(this.$iframe(), spineItem || readiumPackage.spine.items[1], readiumViewerSettings);
    },
    getFirstVisibleMediaOverlayElement() {},
    getLoadedSpineItems() {
      return [readiumPackage.spine.items[viewportStore.spineItemIndex]];
    },
    on(...args) { console.log('buildReader#on', args) },
    package() { return readiumPackage },
    spine() { return readiumPackage.spine },
    viewerSettings() { return readiumViewerSettings }
  };
}
