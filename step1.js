const fs = require("fs");

function cat(path) {
  fs.readFile(path, "utf8", (err, data) => {
    if (err) {
      console.log("ERROR: ", err);
      process.kill(1);
    }
    console.log(data);
  });
}

cat(process.argv[2]);
