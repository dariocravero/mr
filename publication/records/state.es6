import { Record } from 'immutable';

// PackageDocument
export default class StateRecord extends Record({
  manifest: undefined,
  metadata: undefined,
  ready: false,
  rootFile: undefined,
  rootXml: undefined,
  smil: undefined,
  spine: undefined,
  uri: undefined
}) {};
