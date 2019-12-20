# Tracing the City


<!-- @import "[TOC]" {cmd="toc" depthFrom=2 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [Tracing the City](#tracing-the-city)
  - [Find Data](#find-data)
  - [Clean Data](#clean-data)
    - [MacOS](#macos)
    - [Windows](#windows)
    - [Cross Platform](#cross-platform)
  - [Visualize Data](#visualize-data)
  - [Generate SVG (Optional)](#generate-svg-optional)
  - [Generate GCode](#generate-gcode)
  - [Optimize GCode](#optimize-gcode)
  - [Check GCode](#check-gcode)
    - [Trouble with Node version?](#trouble-with-node-version)
  - [Plot](#plot)
  - [Iterate](#iterate)

<!-- /code_chunk_output -->


## Find Data

There are lots of data sets out there. The links below are just some examples where you can find some.  

- [www.statistik-berlin-brandenburg.de](https://www.statistik-berlin-brandenburg.de/webapi/jsf/login.xhtml)
- [data.technologiestiftung-berlin.de](https://data.technologiestiftung-berlin.de/)
- [geocommons.com](http://geocommons.com/)


## Clean Data

When you have some data you will have to clean it up. Try to remove all noise and clutter there might be in it to reduce it only to the data you need. These are some tools you can use to work clean them up.

### MacOS

- [Table Tool](https://github.com/jakob/TableTool)
- …
  
### Windows

- [CSVPad](http://www.trustfm.net/software/utilities/CSVpad.php)
- …

### Cross Platform

- [Tad](https://www.tadviewer.com/)
- [Google Sheets](https://www.google.com/sheets/about/)
- [Data Curator](https://github.com/ODIQueensland/data-curator)
- [Open Office](https://www.openoffice.org/)
- [Libre Office](https://www.libreoffice.org/)

## Visualize Data

This is where you have to get into code. To get a grip on what is going on I suggest to start with P5.js. It has a nice and convenient function called `loadTable` [(reference)](https://p5js.org/reference/#/p5/loadTable). Take a look at the [basic data drawing with p5js](examples/basic-data–drawing-with-p5js/README.md) examples in this repository to get a grip on it.

If you are working with spatial data take a look into [basic spatial data drawing example](examples/basic-spatial-data-drawing-example/README.md).  

*If you manage to export SVG directly from p5.js (or Processing) you can skip the next step*.  

## Generate SVG (Optional)

To generate SVG data we can't use the normal canvas. You will have to translate your P5.js sketch into something that is able to export the data. See the example that ports the "basic data drawing with p5js" to [basic data to SVG drawing with Node.js](/examples/basic-data-to-svg-drawing-with-node_js/README.md).  

## Generate GCode


To create GCode from your generated SVG files you will have to run them through our converter tool called [@tsb/svg2gcode-cli](https://github.com/technologiestiftung/svgcode-cli). Just take a look into the example [generate GCode from SVG](examples/generate-gcode-from-svg/README.md).  

## Optimize GCode

Now your freshly generated GCode from the step before might have the [traveling salesman problem](https://en.wikipedia.org/wiki/Travelling_salesman_problem). Check out [xyzbots.com gcode-optimizer](https://xyzbots.com:4000/gcode-optimizer/) or grab the source code for it and run it yourself 👇. 

```bash
git clone https://github.com/andrewhodel/gcode-optimizer.git 
cd gcode-optimizer
npm init -y
npm install reload -D
./node_modules/.bin/reload -p 3000 -b
```

## Check GCode

*!Note: To install cncjs you will have to run **Node.js <= 10**. Use nvm to install another version. nvm install v10.16.3*

To see if your GCode can be understood by the CityLAB plotter you should run it through [cncjs](https://cnc.js.org/). To be able to connect cncjs and preview your GCode you need an Arduino board running on a USB port. The right solution to do this should be installing [GRBL](https://github.com/gnea/grbl/wiki/Compiling-Grbl) on that board.

(For the lazy ones:) Just flash the sketch below to your board and connect from the connection widget of cncjs to the listed board.


```arduino
void setup() {
Serial.begin(115200);
}
void loop() {}
```

### Trouble with Node version?

In the example [check GCode with Node.js 12](examples/check-gcode-with-node-12/README.md) you can find a hacked setup that allows to run cncjs under Node 12.

## Plot

Finally. You have some working GCode?! **woohoo!\o/**. Come to the CityLAB and make that thing run.  

## Iterate

If you reached this point you might be unhappy with your result. Iterate through (some of) the steps and do it all again.

