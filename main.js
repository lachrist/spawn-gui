
var StdioWidget = require("stdio-widget");
var ToggleWidget = require("toggle-widget");
var CommonjsEditor = require("commonjs-editor");

module.exports = function (container, playground) {
  var child = null;
  var spawn = null;
  var input = document.createElement("input");
  var div1 = document.createElement("div");
  var div2 = document.createElement("div");
  var div3 = document.createElement("div");
  var toggle = ToggleWidget(div1, {
    colors: ["green", "red"]
  });
  var stdio = StdioWidget(div2);
  var editor = CommonjsEditor(div3, playground);

  function update () {
    child = null;
    editor.setReadOnly(false);
    toggle();
  }

  function ontoggle () {
    if (child) {
      child.removeListener("exit", update);
      child.kill();
      child = null;
    } else {
      child = spawn(editor.getBundle(), input.value ? input.value.split(" ") : []);
      child.addListener("exit", update);
      stdio(child.stdin, child.stdout, child.stderr);
    }
    editor.setReadOnly(Boolean(child));
  }

  div2.addEventListener("ctrl", function (event) { event.key === "c" && child && child.kill() });

  div1.addEventListener("toggle", ontoggle);
  div1.disabled = true;
  input.placeholder = "argv...";
  container.className += " spawn-widget";

  (function layout () {
    div1.style.marginRight = "10px";
    div2.style.minWidth = "300px";
    div2.style.resize = "both";
    div2.style.flexGrow = "1";
    div3.style.flexGrow = "1";
    input.style.flexGrow = "1";
    input.style.fontFamily = "monospace";

    var div4 = document.createElement("div");
    div4.style.flexShrink = 0;
    div4.style.display = "flex";
    div4.style.flexDirection = "row";
    div4.style.marginBottom = "10px";
    div4.appendChild(div1);
    div4.appendChild(input);

    var div5 = document.createElement("div");
    div5.style.marginRight = "10px";
    div5.style.display = "flex";
    div5.style.flexDirection = "column";
    div5.appendChild(div4);
    div5.appendChild(div2);

    container.style.width = "initial";
    container.style.display = "flex";
    container.style.flexDirection = "row";
    container.appendChild(div5);
    container.appendChild(div3);
  } ());

  return function (sp) {
    child && child.kill();
    div1.disabled = !sp;
    spawn = sp;
  };

};
