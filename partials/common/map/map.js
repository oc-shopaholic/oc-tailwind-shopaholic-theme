import loadGoogleMapsApi from 'load-google-maps-api';

export default new class ContactMap {
  constructor() {
    this.mapSelector = 'map';
    this.idSelector = 'data-api-key';
    this.coordinatesSelector = 'data-coordinates';

    this.markerPath = 'data-marker-path';
    this.maxWidth = 280;

    this.handler();
  }

  handler() {
    window.addEventListener('load', () => {
      this.initMap();
    });
  }

  initMap() {
    const map = document.querySelector(`.${this.mapSelector}`);

    if (!map) return;

    const key = map.getAttribute(this.idSelector);

    if (!key) {
      throw new Error(errorText.gmapKeyNotFound);
    }

    const coordinates = map.getAttribute(this.coordinatesSelector).split(',');

    if (!coordinates.length) {
      throw new Error(errorText.gmapCoordinatesNotFound);
    }

    const markerPath = map.getAttribute(this.markerPath);

    this.drawMap(key, coordinates, markerPath);
  }

  drawMap(key, coordinates = [0, 0], markerPath) {
    loadGoogleMapsApi({ key }).then((googleMaps) => {
      const center = {
        lat: parseFloat(coordinates[0]),
        lng: parseFloat(coordinates[1]),
      };

      const map = new googleMaps.Map(document.querySelector(`.${this.mapSelector}`), {
        center,
        zoom: 14,
      });
      const marker = new googleMaps.Marker({ position: coordinates, map, icon: markerPath });

      $.request('onAjax', {
        update: { 'common/map/popup': `.${this.mapSelector}` },
        success: (res) => {
          const content = res['contact/popup'];
          const infowindow = new googleMaps.InfoWindow({ content, maxWidth: this.maxWidth });

          infowindow.open(map, marker);
          marker.addListener('click', () => {
            infowindow.open(map, marker);
          });
        },
      });
      $.getJSON("/map-style.json", function (data) {
        map.setOptions({ styles: data });
      });
    }).catch((error) => { throw new Error(error); });
  }
}();
