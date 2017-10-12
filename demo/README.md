```sh
node ../node_modules/sandbox-editor/bin.js --path child.js --type browserify > child-sandbox.js
browserify main.js > bundle.js
rm child-sandbox.js
```