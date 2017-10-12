# spawn-widget

Widget to spawn node-like processes in the browser.
Usage [here](/demo), live demo [here](https://cdn.rawgit.com/lachrist/spawn-widget/d23fd67c/demo/index.html).

### `setspawn = require("spawn-widget")(container, playground)`

* `container :: dom.Element`
* `playground :: commonjs-editor.Playground`
* `setspawn(spawn)`
  * `child = spawn(path, script, argv)`
    * `path :: string`
    * `script :: string`
    * `argv :: [string]`
    * `child :: child_process.ChildProcess`
