var Stream = require("stream");
var Events = require("events");
var SpawnWidget = require("../main.js");
var ChildSandbox = require("./child-sandbox.js");
var div = document.createElement("div");
document.body.appendChild(div);
function kill (signal) { this.emit("exit", null, signal) }
function noop () {}
function pair (writer, reader, name) {
  reader[name] = new Stream.Readable({read:noop});
  writer[name] = new Stream.Writable({
    decodeStrings: false,
    write: function (chunk, encoding, callback) {
      reader[name].push(chunk, encoding);
      callback();
    }
  });
}
SpawnWidget(div, ChildSandbox)(function (path, script, argv) {
  var child = new Events();
  var process = {
    argv: ["node", path].concat(argv),
    kill: kill
  };
  pair(child, process, "stdin");
  pair(process, child, "stdout");
  pair(process, child, "stderr");
  Function("process", script)(process);
  return child;
});
