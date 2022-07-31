const fs = require("fs");
const axios = require("axios");

function cat(path) {
  return fs.readFileSync(path, "utf8", (err, data) => {
    if (err) {
      process.kill(1);
      return "ERROR: " + err;
    } else {
      return data;
    }
  });
}

async function webCat(path) {
  try {
    const res = await axios.get(path);
    return res.data;
  } catch (err) {
    return "Error: Request failed with status code 404";
  }
}

async function handlePath(path) {
  if (path.startsWith("http://") || path.startsWith("https://")) {
    isWeb = true;
    return await webCat(path);
  } else {
    return cat(path);
  }
}

let isWeb = false;

async function recieveArgs() {
  if (process.argv[2] == "--out") {
    const path = process.argv[4];
    const output = process.argv[3];

    const text = await handlePath(path);

    fs.writeFile(output, text, "utf8", (err) => {
      if (err) {
        console.log(`Couldn't write ${output}:`, err);
        process.kill(1);
      } else {
        if (isWeb) {
          console.log(`No output, but ${output} contains HTML from ${path}`);
        } else {
          console.log(`No output, but ${output} contains contents of ${path}`);
        }
      }
    });
  } else {
    path = process.argv[2];
    console.log(await handlePath(path));
  }
}

recieveArgs();
