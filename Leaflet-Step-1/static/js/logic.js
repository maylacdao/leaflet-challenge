// var mymap = L.map('mapid').setView([51.505, -0.09], 13);

// L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
//     attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
//     maxZoom: 18,
//     id: 'mapbox/streets-v11',
//     tileSize: 512,
//     zoomOffset: -1,
//     accessToken: API_KEY
// }).addTo(mymap);


const url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson";

d3.json(url, function(data) {
    console.log(data.features);
    createFeatures(data.features);
});



// L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
//         attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
//         maxZoom: 18,
//         id: 'mapbox/light-v10',
//         tileSize: 512,
//         zoomOffset: -1,
//         accessToken: API_KEY
//     }).addTo(map);

function createFeatures(earthquakeData) {

    function onEachFeature(feature, layer) {
        layer.bindPopup(feature.properties.place + "<hr />" + new Date(feature.properties.time));
    }

    var earthquakes = L.geoJSON(earthquakeData, {
        onEachFeature: onEachFeature,
        pointToLayer: function(feature, latlng) {
            var circle = L.circle(latlng, {
                radius: feature.properties.mag});
                return circle;
        }
    });

    createMap(earthquakes);
}

function createMap(earthquakes) {

    var lightmap = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/light-v10',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: API_KEY
    });

    var baseMaps = {
        "Light Map": lightmap
    };

    var overlayMaps = {
        "Earthquakes":earthquakes
    };

    var map = L.map("mapid", {
        center: [35.5858333, -117.5511667],
        zoom: 5,
        layers: [lightmap, earthquakes]
    });

    L.control.layers(baseMaps, overlayMaps, {
        collapsed: false
    }).addTo(map);
}