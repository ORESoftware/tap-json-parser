#!/usr/bin/env node
'use strict';

const suman = require('suman');
const Test = suman.init(module);
const {default: tapJSONParser} = require('tap-json-parser');


Test.create(function (assert, async, it, fs, path) {

  it.cb('works indefinitely', t => {

    const p = tapJSONParser();
    p.once('error', t.fail);

    p.on('testpoint', function () {
      console.log('test point has been reached.');
      count++;
    });

    let count = 0;

    t.once('done', function () {
      console.log('count => ', count);
    });

    const dest = fs.createReadStream(path.resolve(__dirname + '/../fixtures/read')).pipe(p);

    dest.once('error', t.fail);
    dest.once('end', t.pass);

  });

});
