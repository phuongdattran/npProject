let mymap = L.map('map');

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    maxZoom: 50
}).addTo(mymap);

function drawTrack(track) {
    let coordinates = track.points.map(p => [p.lat.toFixed(5), p.lon.toFixed(5)]);
    let polyline = L.polyline(coordinates, { weight: 4, color: '#37474f' }).addTo(mymap);

    // zoom the map to the polyline
    mymap.fitBounds(polyline.getBounds());
}

fetch(trackPath)
    .then(function (response) {
        return response.text();
    }).then(function (gpxData) {
        let gpx = new gpxParser();
        gpx.parse(gpxData);

        document.getElementById("totalDistance").innerText = (gpx.tracks[0].distance.total / 1000).toFixed(2);
        document.getElementById("gpxDownload").innerText = "Download";
        document.getElementById("gpxDownload").setAttribute("href", trackPath);

        drawTrack(gpx.tracks[0]);
});

