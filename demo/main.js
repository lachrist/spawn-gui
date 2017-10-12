const Stream = require("stream");
const Events = require("events");
const SpawnWidget = require("../main.js");
const ChildSandbox = require("./child-sandbox.js");
const div = document.createElement("div");
document.body.appendChild(div);
function kill (signal) { this.emit("exit", null, signal) }
const pair = (writer, reader, name) => {
  reader[name] = new Stream.Readable({read:()=>{}});
  writer[name] = new Stream.Writable({
    decodeStrings: false,
    write: (chunk, encoding, callback) => {
      reader[name].push(chunk, encoding);
      callback();
    }
  });
}
SpawnWidget(div, ChildSandbox)((path, script, argv) => {
  const child = new Events();
  child.kill = kill;
  child.on("exit", () => { child.stdin.end() });
  const process = {
    argv: ["node", path].concat(argv),
    exit: (code) => { child.emit("exit", code, null) }
  };
  pair(child, process, "stdin");
  pair(process, child, "stdout");
  pair(process, child, "stderr");
  Function("process", script)(process);
  return child;
});