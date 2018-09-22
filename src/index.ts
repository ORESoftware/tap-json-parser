'use strict';

import * as stream from 'stream';
import {JSONParser} from '@oresoftware/json-stream-parser';

//////////////////////////////////////////////////

export interface IParsedObject {
  [index: string]: any
}

//////////////////////////////////////////////////

export const createParser = () => {
  
  const strm = new JSONParser();
  
  strm.on('data', (d: IParsedObject) => {
    if (d && d['@tap-json'] === true) {
      strm.emit('testpoint', d);
    }
  });
  
  return strm;
  
};

export default createParser;

