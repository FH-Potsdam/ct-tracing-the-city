/**
 * Taken from
 * https://github.com/sebastian-meier/GreenBerlin/blob/master/01_data/overpass.js
 * by Sebastian Meier https://www.sebastianmeier.eu
 */

const { writeOut } = require("./lib/write");
const { buildQuery } = require("./lib/build-query");

const bbox =
  "(52.3382388102358,13.0883536782043,52.6755085785852,13.761131111581)";

const parks = [
  ["boundary", "national_park"],
  ["landuse", "recreation_ground"],
  ["landuse", "forest"],
  ["landuse", "village_green"],
  ["landuse", "meadow"],
  ["landuse", "grass"],
  ["leisure", "park"],
  ["natural", "wood"],
  ["natural", "garden"],
  ["natural", "scrub"],
  ["leisure", "common"],
  ["leisure", "garden"],
  ["leisure", "nature_reserve"]
];

const waters = [
  ["waterway", "river"],
  ["waterway", "canal"],
  ["waterway", "drain"],
  ["waterway", "stream"],
  ["natural", "water"],
  ["natural", "lake"]
];

writeOut(buildQuery(waters, bbox), "waters");
writeOut(buildQuery(parks, bbox), "parks");
