import items from './items';

const ATTRIBUTES = {
  id: 'idref',
  linear: 'linear',
  properties: 'properties'
};
const ITEM = 'itemref';
const TAG = 'spine';
const YES = 'yes';

export default function spine(rootXml, manifest) {
  return items(rootXml.querySelector(TAG), ITEM, ATTRIBUTES).map(item => {
    return {
      ...manifest.find(mitem => mitem.id === item.id),
      ...item,
      linear: item.linear === YES
    };
  });
}

// TODO
// - page-progression-direction
//   https://github.com/dariocravero/readium-js/blob/master/src/epub/package-document-parser.js#L68
