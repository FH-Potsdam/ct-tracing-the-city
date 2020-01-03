const { readData } = require("./read-data");
async function loadGeojson(filePath) {
  try {
    const text = readData(filePath);
    const json = JSON.parse(text);
    return json;
  } catch (error) {
    throw error;
  }
}

module.exports = { loadGeojson };
