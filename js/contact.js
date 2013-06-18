$(document).ready(function() {
    var map = L.map('map').setView([38.013, 23.826], 16);
    L.tileLayer('http://tile.cloudmade.com/f0e4f6c19e7c4376a00c1bf0967dd8ec/997/256/{z}/{x}/{y}.png', {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OSM</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>',
        maxZoom: 18
    }).addTo(map);
    var marker = L.marker([38.0134, 23.8245]).addTo(map);
})