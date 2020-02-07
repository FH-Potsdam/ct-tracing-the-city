var overpass = require('query-overpass'),
    fs = require('fs');

var bbox = '(52.3382388102358,13.0883536782043,52.6755085785852,13.761131111581)';

var types = [
    ["boundary","national_park"],
    ["landuse","recreation_ground"],
    ["landuse","forest"],
    ["landuse","village_green"],
    ["landuse","meadow"],
    ["landuse","grass"],
    ["leisure","park"],
    ["natural","wood"],
    ["natural","garden"],
    ["natural","scrub"],
    ["leisure","common"],
    ["leisure","garden"],
    ["leisure","nature_reserve"]
];

var waters = [
    ["waterway","river"],
    ["waterway","canal"],
    ["waterway","drain"],
    ["waterway","stream"],
    ["natural","water"],
    ["natural","lake"]
];

var query = '[out:json];(';
for(var i = 0; i<types.length;i++){
    //query += 'way["'+types[i][0]+'"="'+types[i][1]+'"]'+bbox+';>;';
    query += '((relation["'+types[i][0]+'"="'+types[i][1]+'"]'+bbox+';>;)->.relations);node(r.relations:"outer");';
}
query += ');out;';

overpass(query, function(err, data){
    if(err){
        console.log(query);
        console.log(err);
    }else{
        console.log(query);

        var outputFilename = "parks.geojson";
        fs.writeFile(outputFilename, JSON.stringify(data, null, 4), function(err) {
            var outputFilename = "parks.min.geojson";
            fs.writeFile(outputFilename, JSON.stringify(data), function(err) {
                console.log("done");
            });
        });
    }
});
