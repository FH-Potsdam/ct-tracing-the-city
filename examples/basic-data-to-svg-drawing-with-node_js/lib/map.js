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
module.exports = { map };
