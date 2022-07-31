const fs = require("fs");
const axios = require("axios");

function cat(path) {
  fs.readFile(path, "utf8", (err, data) => {
    if (err) {
      console.log("ERROR: ", err);
      process.kill(1);
    } else {
      console.log(data);
    }
  });
}

async function webCat(path) {
  try {
    res = await axios.get(path);
    console.log(res.data);
  } catch (err) {
    console.log("Error: Request failed with status code 404");
  }
}

if (
  process.argv[2].startsWith("http://") ||
  process.argv[2].startsWith("https://")
) {
  webCat(process.argv[2]);
} else {
  cat(process.argv[2]);
}
