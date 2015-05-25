import Package from '@hmh/readium/src/sdk/models/package';

export default function buildPackage(contentBaseUri, spine, mediaOverlayData) {
  return new Package({
    media_overlay: mediaOverlayData,
    rootUrl: contentBaseUri,
    rootUrlMO: contentBaseUri,
    spine: {
      items: spine
    }
  });
}
