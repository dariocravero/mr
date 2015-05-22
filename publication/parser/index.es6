import * as extract from './extract';
import * as fetch from './fetch';

export default async function parse(uri) {
  try {
    const containerXml = await fetch.containerXml(uri);
    const rootFile = extract.rootFile(containerXml);
    const rootXml = await fetch.rootXml(uri, rootFile);

    const manifest = extract.manifest(rootXml);
    const metadata = extract.metadata(rootXml, manifest);
    const spine = extract.spine(rootXml, manifest);
    const smil = await extract.smil(uri, spine, manifest, metadata.mediaOverlayDurations);

    return {
      manifest,
      metadata,
      rootFile,
      rootXml,
      smil,
      spine,
      uri
    };
  } catch(exception) {
    console.error(exception);
  }
}
