'use babel';

import { CompositeDisposable } from 'atom';

export default {
  getConfig: (prop) => atom.config.get(prop),
  setStyleValue: (styleType, val) => {
    if (val == 'none') return ''
    return `${styleType}:${val};`
  },
  objectCheck: (selection) => {
    let objectCount = 0
    for (val in selection) {
      if (val == '{') objectCount++
      if (val == '}') objectCount--
    }
    return objectCount
  }
}
