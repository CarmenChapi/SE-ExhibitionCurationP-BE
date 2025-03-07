const fs = require("fs");

const selectEndpoints = () => {
  return fs.promises
    .readFile("endpoints.json", "utf-8")
    .then((endP) => {
      const parseEndP = JSON.parse(endP);
      return parseEndP;
    })
    .catch((error) => {
      console.log(error);
      return error;
    });
};


module.exports = { selectEndpoints };
