const path = require("path");
const fs = require("fs");
/**
 * Reading and parsing CSV table
 * @param {string} filePath The relative path to the csv file
 * @param {string} separator The csv seperator default to ","
 * @param {boolean} header If the file has a header default to true
 */
async function loadTable(filePath, separator = ",", header = true) {
  try {
    let table = {
      headers: [],
      columns: [],
      rows: [],
    };
    let text = readData(filePath);
    text = text.replace("\r", "\n");
    const lines = text.split("\n");
    if (header === true) {
      table.headers.push(...lines[0].split(separator));
    }

    lines.forEach((line, index) => {
      const arr = line.split(separator);
      if (index === 0) {
        arr.forEach((_) => {
          table.columns.push([]);
        });
      } else {
        arr.forEach((elem, index) => {
          table.columns[index].push(elem);
        });
        table.rows.push(arr);
      }
    });

    // console.log(table); // eslint-disable-line

    return table;
  } catch (error) {
    throw error;
  }
}
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
  loadTable,
};
