var wmsSource = new ol.source.TileWMS({
    url: 'http://211.101.37.234:8080/hdmapserver/wms',
    params: {'LAYERS': 'jiangxi_map'},
    serverType: 'geoserver'
});


var wmsLayer = new ol.layer.Tile({
    source: wmsSource
});


var view = new ol.View({
    projection: 'EPSG:4326',
    center: [115.88554, 28.61573],
    zoom: 8
});

var map = new ol.Map({
    controls: ol.control.defaults().extend([
        new ol.control.ScaleLine({
            units: 'degrees'
        })
    ]),
    layers: [wmsLayer],
    target: 'map',
    view: view
});

map.on('singleclick', function (evt) {
    document.getElementById('info').innerHTML = '';
    var viewResolution = /** @type {number} */ (view.getResolution());
    var url = wmsSource.getGetFeatureInfoUrl(
        evt.coordinate, viewResolution, 'EPSG:4326',
        {'INFO_FORMAT': 'text/html'});
    if (url) {
        debugger;
        document.getElementById('info').innerHTML =
            '<iframe seamless src="' + url + '"></iframe>';
    }
});