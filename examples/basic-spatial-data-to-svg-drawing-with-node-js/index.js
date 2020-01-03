// build in modules
const path = require("path");
const fs = require("fs");
// installed modules
const { createCanvas } = require("canvas");
const calcBBox = require("@turf/bbox");

// our own modules
const { drawPolygon, drawBBox } = require("./lib/drawing");
const { loadGeojson } = require("./lib/load-geojson");
const { width } = require("./lib/constants");

// that's why we have another value ↴ there
const canvas = createCanvas(width, 200, "svg");
const ctx = canvas.getContext("2d");
let outFilePath = path.resolve(process.cwd(), `./out/sketch.svg`);

async function main() {
  try {
    // YOUR CODE STARTS HERE YOUR CODE STARTS HERE YOUR CODE STARTS HERE
    //----------------------------------------------------------------

    /**
     * We start by loading the geojson taken from
     * https://data.technologiestiftung-berlin.de/
     */
    const geojson = await loadGeojson("./data/bezirksgrenzen.geojson");

    /**
     * Now we loop all its contents
     */
    for (const feature of geojson.features) {
      console.log(feature.properties.Gemeinde_name); // the name of the Bezirk
      const bboxCoords = calcBBox.default(feature); // <<-- This is a function from the turf library https://turfjs.org/docs/#bbox
      drawBBox(ctx, bboxCoords); // now we draw that bboxCoords see ./lib/drawing.js

      // ---------- now for the polygon drawing

      let coordinates = undefined;
      /**
       * The geojson data is provided as multiple
       * multipolygon objects which is 4 levels deep
       * [
       *  [
       *    [
       *      [Array], [Array], [Array]
       *    ]
       *  ],
       *  [
       *    [
       *      [Array], [Array],  [Array]
       *    ]
       *  ],
       * For the elements where we only have one polygon in it we can flatten that array down.
       */
      if (feature.geometry.coordinates.length === 1) {
        coordinates = feature.geometry.coordinates.flat(2);
        drawPolygon(ctx, coordinates); // see ./lib/drawing.js
      } else {
        /**
         * If we have a complexer shape we need to loop these elements
         * We don't flatten that deep.
         *
         */
        coordinates = feature.geometry.coordinates.flat(1);
        for (let i = 0; i < coordinates.length; i++) {
          const coord = coordinates[i];
          drawPolygon(ctx, coord); // see ./lib/drawing.js
        }
      }
    }

    // ----------------------------------------------------------
    // YOUR CODE ENDS HERE YOUR CODE ENDS HERE YOUR CODE ENDS HERE
    // YOUR CODE ENDS HERE YOUR CODE ENDS HERE...
    fs.writeFileSync(outFilePath, canvas.toBuffer()); // write to file
  } catch (error) {
    throw error;
  }
}

/**
 * We call our main function here and catch all errors
 */
main().catch((err) => {
  throw err;
});
