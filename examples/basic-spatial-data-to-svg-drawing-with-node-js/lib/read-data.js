const path = require("path");
const fs = require("fs");
/**
 * Loading data using fetch api
 * @param {string} fielPath The path to the to file relativ to the document root
 * @returns Promise
 */
function readData(filePath) {
  try {
    const text = fs.readFileSync(path.resolve(process.cwd(), filePath), "utf8");
    return text;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  readData,
};
