document.addEventListener("DOMContentLoaded", function() {
  //
  //  the loadTable function uses Promises https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise
  // means that all the loaded data will be availalbe in the ".then()" part
  // loadTable(...args).then((table)=>{
  //  !!!!!! Here we can use  "table"
  // })
  //
  // Add your csv file to the data folder and load it here
  //          |
  //          |
  //          V
  loadTable("data/foobah.csv", ",", true)
    .then((table) => {
      // check it out we are logging table to the console.
      console.log(table); // eslint-disable-line
      const canvas = document.querySelector("canvas#sketch"); // get the canvas from the html
      // make some error checks
      if (!canvas) {
        throw new Error("Could not find #canvas");
      }
      // make some more error checks
      if (canvas instanceof HTMLCanvasElement) {
        const ctx = canvas.getContext("2d"); // get the drawing context of the canvas
        canvas.width = 200; // set width
        canvas.height = 200; // set height
        const width = canvas.width; // get them into variables like in p5js
        const height = canvas.height; // get them into variables like in p5js
        // error check the context
        if (ctx !== null) {
          //
          //
          //
          // YOUR CODE STARTS HERE YOUR CODE STARTS HERE YOUR CODE STARTS HERE
          // YOUR CODE STARTS HERE YOUR CODE STARTS HERE YOUR CODE STARTS HERE
          // YOUR CODE STARTS HERE YOUR CODE STARTS HERE YOUR CODE STARTS HERE
          // YOUR CODE STARTS HERE YOUR CODE STARTS HERE YOUR CODE STARTS HERE
          // YOUR CODE STARTS HERE YOUR CODE STARTS HERE YOUR CODE STARTS HERE
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
          for (let i = 0; i < table.rows.length; i++) {
            let row = table.rows[i]; // isolate one row. It is a row object
            const num = parseInt(row[0], 10); // We parse the value to an integer. We know its only ints in the table. If there are floats we should use `parseFloat`

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
          console.log(`max is: ${max}`); // eslint-disable-line
          console.log(`min is: ${min}`); // eslint-disable-line
          /**
           * Of course there is always multiple ways to do this.
           * Here we use array.map to create a new array of numbers with the parsed values.
           * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map
           *
           */

          const column = table.columns[0]; // isolate one column (holds an array of all values in the culumn 0)
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
          console.log(`max is: ${Math.max(...convertedToNum)}`); // eslint-disable-line
          console.log(`min is: ${Math.min(...convertedToNum)}`); // eslint-disable-line
          /**
           * Now that we have our values and their max and minimum we can draw them to screen by mapping them into a range. The Max will span the whole page.
           *
           */

          const step = width / convertedToNum.length;
          let x = 0; // start at 0
          ctx.beginPath();
          ctx.moveTo(0, height / 2);
          for (let i = 0; i < convertedToNum.length; i++) {
            // loop all nums in convertedToNum array
            const value = convertedToNum[i]; // isolate the value
            const mappedValue = map(value, min, max, 0, height); // map it into the screen size
            ctx.lineTo(x, height / 2 - mappedValue / 2); // draw two verticies one on the top
            ctx.lineTo(x, height / 2 + mappedValue / 2); // and one on the bottm
            x += step;
          }
          ctx.stroke();

          // YOUR CODE ENDS HERE YOUR CODE ENDS HERE YOUR CODE ENDS HERE
          // YOUR CODE ENDS HERE YOUR CODE ENDS HERE YOUR CODE ENDS HERE
          // YOUR CODE ENDS HERE YOUR CODE ENDS HERE YOUR CODE ENDS HERE
          // YOUR CODE ENDS HERE YOUR CODE ENDS HERE...
        }
      }
    })
    .catch((err) => {
      throw err;
    });
});

//  ___  ___  _________  ___  ___       ________
// |\  \|\  \|\___   ___\\  \|\  \     |\   ____\
// \ \  \\\  \|___ \  \_\ \  \ \  \    \ \  \___|_
//  \ \  \\\  \   \ \  \ \ \  \ \  \    \ \_____  \
//   \ \  \\\  \   \ \  \ \ \  \ \  \____\|____|\  \
//    \ \_______\   \ \__\ \ \__\ \_______\____\_\  \
//     \|_______|    \|__|  \|__|\|_______|\_________\
//                                        \|_________|

//------------ UTILITY ---------------
/**
 * Reading and parsing CSV table
 * @param {string} path The path to the file relativ to your document root
 * @param {string} separator The csv seperator default to ","
 * @param {boolean} header If the file has a header default to true
 */
async function loadTable(path, separator = ",", header = true) {
  let table = {
    headers: [],
    columns: [],
    rows: [],
  };
  let text = await fetchData(path);
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
}

/**
 * Loading data using fetch api
 * @param {string} path The path to the to file relativ to the document root
 * @returns Promise
 */
async function fetchData(path) {
  try {
    const res = await fetch(path);
    if (res.ok) {
      const text = await res.text();
      return text;
    } else {
      throw new Error(`Could not load data at path ${path}`);
    }
  } catch (error) {
    throw error;
  }
}

/**
 * Map one value from a range into another
 *
 * taken from https://gist.github.com/xposedbones/75ebaef3c10060a3ee3b246166caab56
 * @param {Number} value The vingalue to map
 * @param {Number} in_min Minimum of the incoming value
 * @param {Number} in_max Maximum of the incoming value
 * @param {Number} out_min Minimum of the outgoing value
 * @param {Number} out_max Maximum of the outgoing value
 */
function map(value, in_min, in_max, out_min, out_max) {
  return ((value - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min;
}
