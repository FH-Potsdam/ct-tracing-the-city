/* merry xmas 2019-12-25 */
let table; // <<---<<--<<-- https://p5js.org/reference/#/p5.Table

function preload() {
  // @ts-ignore
  table = loadTable("data/foobah.csv", "csv", "header");
}
function setup() {
  createCanvas(200, 200); // setup the screen. Remenber 1px ≈ 1mm
  //----------------------------------------------------------------
  /**
   * Getting minumn and maximum values
   * Identify the maximum and minimum values ins the table column 1
   *
   */
  /**
   * max {Number} Holds the maximum value after analysis
   * We check if there is a number larger then the current value of max
   * if so it will be set to that value. Thats why we start low (negativ inifinity)
   *
   */
  let max = -Infinity;
  /**
   * min {Number} Holds the minimum value after analysis
   * We check if there is a number smaller then the current value of min
   * if so it will be set to that value. Thats why we start high (positiv inifinity)
   *
   */
  let min = Infinity;

  /**
   * We loop through all the rows in the table
   */
  for (let i = 0; i < table.getRowCount(); i++) {
    let row = table.getRow(i); // isolate one row. It is a row object
    const num = parseInt(row.getString(0), 10); // We parse the value to an integer. We know its only ints in the table. If there are floats we should use `parseFloat`

    if (isNaN(num) !== true) {
      // check if the parsed value is a number (NaN = "Not a Number")
      if (num > max) {
        // now check if the value is higher then max
        max = num; // if so set max
      }
      if (num < min) {
        // check if the value is lower then min
        min = num; // if so set min
      }
    }
  }
  /**
   * And we log our output
   */
  console.log(`max is :${max}`);
  console.log(`min is :${min}`);

  /**
   * Of course there is always multiple ways to do this.
   * Here we use array.map to create a new array of numbers with the parsed values.
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map
   *
   */

  const column = table.getColumn(0); // isolate one column (holds an array of all values in the culumn 0)
  const convertedToNum = column.map((elem) => {
    // use array.map
    const num = parseInt(elem);
    if (isNaN(num) !== true) {
      return num;
    } else {
      return null;
    }
  });

  /**
   *  Now we use the build in Math.max on all the values of the array using the spread operator.
   * Math.max https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/max
   * Math.min https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/min
   * Spread https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
   *
   *
   */
  console.log(`max is: ${Math.max(...convertedToNum)}`);
  console.log(`min is: ${Math.min(...convertedToNum)}`);
  //---------------------------------------------------------------------

  /**
   * Now that we have our values and their max and minimum we can draw them to screen by mapping them into a range. The Max will span the whole page.
   *
   */

  const step = width / convertedToNum.length; // this is the x increment
  beginShape(); // we begin a shape
  let x = 0; // start at 0
  noFill(); // don't want a fill
  for (let i = 0; i < convertedToNum.length; i++) {
    // loop all nums in convertedToNum array
    const value = convertedToNum[i]; // isolate the value
    const mappedValue = map(value, min, max, 0, height); // map it into the screen size
    vertex(x, height / 2 - mappedValue / 2); // draw two verticies one on the top
    vertex(x, height / 2 + mappedValue / 2); // and one on the bottm
    x += step;
  }
  endShape();
  noLoop();
}

function draw() {
  /* We don't need animation */
}

/**
 * Logic for tables creation could be extracted from here
 * https://github.com/processing/p5.js/blob/27d9299568088f38a7570551ad66c67086cf4908/src/io/files.js
 * https://github.com/processing/p5.js/blob/master/src/io/p5.Table.js
 * https://github.com/processing/p5.js/blob/master/src/io/p5.TableRow.js
 *
 */
