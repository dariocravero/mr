import { Record } from 'immutable';

// PackageDocument
export default class StateRecord extends Record({
  manifest: undefined,
  metadata: undefined,
  rootFile: undefined,
  rootXml: undefined,
  smil: undefined,
  spine: undefined,
  uri: undefined
}) {};
