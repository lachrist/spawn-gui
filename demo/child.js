require("./error.js");
process.stdin.setEncoding("utf8");
process.stdin.on("data", function (data) {
  process.stdout.write(JSON.stringify(data)+"\n");
});