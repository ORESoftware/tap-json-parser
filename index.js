'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
var stream = require("stream");
function default_1() {
    var lastLineData = '';
    var strm = new stream.Transform({
        objectMode: true,
        transform: function (chunk, encoding, cb) {
            var _this = this;
            var data = String(chunk);
            if (lastLineData) {
                data = lastLineData + data;
            }
            var lines = data.split('\n');
            lastLineData = lines.splice(lines.length - 1, 1)[0];
            lines.forEach(function (l) {
                try {
                    l && _this.push(JSON.parse(l));
                }
                catch (err) {
                }
            });
            cb();
        },
        flush: function (cb) {
            if (lastLineData) {
                try {
                    this.push(JSON.parse(lastLineData));
                }
                catch (err) {
                }
            }
            lastLineData = '';
            cb();
        }
    });
    strm.on('data', function (d) {
        if (d && d['@tap-json'] === true) {
            strm.emit('testpoint', d);
        }
    });
    return strm;
}
exports.default = default_1;
