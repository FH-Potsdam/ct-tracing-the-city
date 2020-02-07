const overpass = require("query-overpass");
const fs = require("fs");
const path = require("path");
function writeOut(query, filename, minify = true) {
  overpass(query, function(err, data) {
    if (err) {
      console.log(query);
      console.log(err);
    } else {
      console.log(query);

      fs.writeFile(
        path.resolve(process.cwd(), `${filename}.min.geojson`),
        JSON.stringify(data, null, 4),
        function(err) {
          if (err) throw err;
          if (minify) {
            fs.writeFile(
              path.resolve(process.cwd(), `${filename}.min.geojson`),
              JSON.stringify(data),
              function(error) {
                if (error) throw error;
                console.log("done");
              }
            );
          }
        }
      );
    }
  });
}

module.exports = { writeOut };
