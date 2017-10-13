# spawn-widget

**DEPRECATE moved to https://github.com/lachrist/sandbox-spawner**

Widget for spawning node-like processes in the browser.
Usage [here](/demo), live demo [here](https://cdn.rawgit.com/lachrist/spawn-widget/58580c02/demo/index.html).

### `setspawn = require("spawn-widget")(container, sandbox)`

* `container :: dom.Element`
* `sandbox :: commonjs-editor.Sandbox`
* `setspawn(spawn)`
  * `child = spawn(path, script, argv)`
    * `path :: string`
    * `script :: string`
    * `argv :: [string]`
    * `child :: child_process.ChildProcess`
