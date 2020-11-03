let mymap = L.map('map');

L.tileLayer('https://api.mapbox.com/styles/v1/pwetz/ckgz0df0r1why19k9ixujd2m9/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoicHdldHoiLCJhIjoiY2tnejA5MXhyMHo4MjJ5cjE2cndkeHExYiJ9.wQtru8F6EwC_Xf42JRUpVg', {
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
        document.getElementById("gpxDownload").innerHTML = "<i class='material-icons left'>get_app</i>GPX";
        document.getElementById("gpxDownload").setAttribute("href", trackPath);

        drawTrack(gpx.tracks[0]);
});
