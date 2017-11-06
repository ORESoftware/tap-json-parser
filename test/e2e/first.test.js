#!/usr/bin/env node
'use strict';

const suman = require('suman');
const Test = suman.init(module);
const {default: tapJSONParser} = require('tap-json-parser');

Test.create(function (assert, async, it) {

  let finished = false;

  setTimeout(function () {
    finished = true;
  }, 5000);

  let randomValues = [
    true,
    'bunny',
    Buffer.from('dog'),
    {},
    JSON.stringify({foo: 'bar'}),
    JSON.stringify({'@tap-json': true})
  ];

  let getRandomVal = function () {
    return randomValues[Math.floor(Math.random() * randomValues.length)];
  };

  it.cb('works indefinitely', t => {

    const p = tapJSONParser();
    p.once('error', t.fail);

    p.on('testpoint', function () {
      count++;
    });

    let count = 0;

    t.once('done', function () {
      console.log('count => ', count);
    });

    async.whilst(
      function () {
        return finished === false;
      },
      function (cb) {

        let randomVal = getRandomVal();

        let to = Math.random() * 10;

        setTimeout(function () {
          p.write(String(randomVal) + '\n');
          cb();
        }, to);

      }, t);

  });

});
