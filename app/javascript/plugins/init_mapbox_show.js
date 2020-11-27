import mapboxgl from 'mapbox-gl';

const initMapboxShow = () => {
  const mapElement = document.getElementById('map');
  const fitMapToMarkers = (map, markers) => {
  const bounds = new mapboxgl.LngLatBounds();
  [markers].forEach(marker => bounds.extend([ marker.lng, marker.lat ]));
  map.fitBounds(bounds, { padding: 70, maxZoom: 15, duration: 0 });
  };
  if (mapElement && mapElement.dataset.itinerary) {
    mapboxgl.accessToken = mapElement.dataset.mapboxApiKey;
    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/basilerieu/ckhyok575203a19o53s6png7h'
    });
    const markers = JSON.parse(mapElement.dataset.markers);
    const itinerary = JSON.parse(mapElement.dataset.itinerary);
    const color = JSON.parse(mapElement.dataset.color);
    [markers].forEach((marker) => {
      new mapboxgl.Marker()
        .setLngLat([ marker.lng, marker.lat ])
        .addTo(map);
    });
    fitMapToMarkers(map, markers);
     map.on('load', function () {
        map.addSource('trace', {
          type: 'geojson',
          'data': {
            'type': 'Feature',
            'properties': {},
            'geometry': {
              'type': 'LineString',
              'coordinates': itinerary
            }
          }
        });
        map.addLayer({
          'id': 'trace',
          'type': 'line',
          'source': 'trace',
          'paint': {
            'line-color': 'yellow',
            'line-opacity': 0.75,
            'line-width': 5
          }
        });
      });
  }
};

export { initMapboxShow };