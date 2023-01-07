mapboxgl.accessToken = mapToken;
const camp = JSON.parse(campground).geometry.coordinates;

const map = new mapboxgl.Map({
  container: 'map', // container ID
  style: 'mapbox://styles/mapbox/streets-v12', // style URL
  center: camp, // starting position [lng, lat]
  zoom: 9, // starting zoom
});
map.addControl(new mapboxgl.NavigationControl());

new mapboxgl.Marker()
  .setLngLat(camp)
  .addTo(map);
