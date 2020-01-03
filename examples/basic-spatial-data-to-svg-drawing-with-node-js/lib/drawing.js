const boundingBox = require("./bounding-box");
const { width, height } = require("./constants");
/**
 * A function for drawing our polygons from geojson data
 *
 * @param {NodeCanvasRenderingContext2D} context The context of the canvas
 * @param {Array} coords The coordinates of the polygon as [[longitude, latitude],[longitude, latitude]...]
 */
function drawPolygon(context, coords) {
  context.beginPath();
  for (let i = 0; i < coords.length; i++) {
    const lon = coords[i][0];
    const lat = coords[i][1];
    /**
     * Calculate x,y within the bounds of Berlin / Potsdam
     */
    const x =
      width *
      ((boundingBox.left - lon) / (boundingBox.left - boundingBox.right));
    const y =
      height *
      ((boundingBox.top - lat) / (boundingBox.top - boundingBox.bottom));
    /**
     * If we are at iteration 0 we only move the cursor to the starting point
     * else we draw a line
     */
    if (i === 0) {
      context.moveTo(x, y);
    } else {
      context.lineTo(x, y);
    }
  }
  context.closePath(); // close the shape
  context.stroke(); // make it a line
}

/**
 * A funtion for drawing the bounding box calculated by @turf/bbox https://turfjs.org/docs/#bbox
 *
 * @param {NodeCanvasRenderingContext2D} context The context of the canvas
 * @param {Array} coords The coordinates of the bounding box as [[longitude, latitude, longitude, latitude]...] where 0,1 are the upper left point and 2,3 are the lower right point
 */
function drawBBox(context, coords) {
  context.beginPath();
  const topLeft = { lon: coords[0], lat: coords[1] };
  const bottomRight = { lon: coords[2], lat: coords[3] };

  const x1 =
    width *
    ((boundingBox.left - topLeft.lon) / (boundingBox.left - boundingBox.right));
  const y1 =
    height *
    ((boundingBox.top - topLeft.lat) / (boundingBox.top - boundingBox.bottom));

  const x3 =
    width *
    ((boundingBox.left - bottomRight.lon) /
      (boundingBox.left - boundingBox.right));
  const y3 =
    height *
    ((boundingBox.top - bottomRight.lat) /
      (boundingBox.top - boundingBox.bottom));

  const x2 = x3;
  const y2 = y1;
  const x4 = x1;
  const y4 = y3;

  context.moveTo(x1, y1);
  context.lineTo(x2, y2);
  context.lineTo(x3, y3);
  context.lineTo(x4, y4);
  context.closePath();
  context.stroke();
}
module.exports = { drawPolygon, drawBBox };
