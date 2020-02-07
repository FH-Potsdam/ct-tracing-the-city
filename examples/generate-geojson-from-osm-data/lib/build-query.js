function buildQuery(types, bbox) {
  let query = "[out:json];(";
  for (var i = 0; i < types.length; i++) {
    query +=
      '((relation["' +
      types[i][0] +
      '"="' +
      types[i][1] +
      '"]' +
      bbox +
      ';>;)->.relations);node(r.relations:"outer");';
  }
  query += ");out;";
  return query;
}

module.exports = { buildQuery };
