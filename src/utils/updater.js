import { findDistance, middle_latlng } from "../js/common";
import L from "leaflet";

const getRouteArray = poly => poly.toGeoJSON().geometry.coordinates;

const endMarker = ({ end_latlng, length }) => L.marker(
  [end_latlng[1], end_latlng[0]],
  {
    icon: L.divIcon(
      {
        html: `${length}&nbsp;км`,
        className: 'end_mark'
      }
    )
  }
);

const startMarker = ({ start_latlng, map }) => L.marker(
  [
    start_latlng[1],
    start_latlng[0]
  ],
  {
    icon: L.divIcon({
      html: `<div style="transform: scale(${(map.getZoom() / 13)});"><div class="arr_start"></div></div>`,
      className: 'arr_mark'
    })
  }
);

export const updateMarks = ({ map, poly, km_marks }) => {
  km_marks.clearLayers();
  const route = getRouteArray(poly);
  const latlngs = poly.getLatLngs();
  let start_latlng;
  let end_latlng;
  let i;
  let rotation;
  let middle;
  let distance;

  if (route.length > 0) {
    start_latlng    = route[0];
    end_latlng      = route[route.length - 1];
    km_marks.addLayer(startMarker({ start_latlng, map }));
    if (route.length > 1) {
      const segs = L.GeometryUtil.accumulatedLengths(poly);
      const length = Math.round(segs[segs.length - 1] / 1000);
      // end mark
      km_marks.addLayer(endMarker({ end_latlng, length }));

      //and also length to panel:
      // $('#text_route_length').text(length + 'км');

      for (i = 1; i < latlngs.length; i += 1) {
        rotation = L.GeometryUtil.bearing(latlngs[i - 1], latlngs[i]);
        middle = middle_latlng(latlngs[i], latlngs[i - 1]);
        distance = findDistance(latlngs[i - 1].lat, latlngs[i - 1].lng, latlngs[i].lat, latlngs[i].lng);

        if (distance > 1) {
          km_marks.addLayer(L.marker([middle.lat, middle.lng], { icon: L.divIcon({ html: '<div style="transform: scale(' + (map.getZoom() / 13) + ');"><img src="misc/arr.png" style="transform: translateX(-4px) translateY(-4px) rotate(' + (270 + rotation) + 'deg);"></div>', className: 'arr_mark' }) }));
        }

      }
    } else {
      // $('#text_route_length').text('0 км');
    }
  }
  // local_store_data();
};
