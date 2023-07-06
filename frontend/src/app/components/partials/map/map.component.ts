/* eslint-disable @angular-eslint/component-selector */
import {
  Component,
  ElementRef,
  Input,
  OnChanges,
  ViewChild,
} from '@angular/core';
import {
  LatLng,
  LatLngExpression,
  LatLngTuple,
  LeafletMouseEvent,
  Map,
  Marker,
  icon,
  map,
  marker,
  tileLayer,
} from 'leaflet';
import * as L from 'leaflet';
import 'leaflet-search';
import { Order } from '../../../shared/models/order';
import { LocationService } from 'src/app/services/location.service';
import { LayerGroup } from 'leaflet';
import 'leaflet-control-geocoder';
import 'leaflet';
import Control from 'leaflet-control-geocoder';
import Geocoder from 'leaflet-control-geocoder';

@Component({
  selector: 'map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements OnChanges {
  @Input()
  order!: Order;
  @Input()
  readonly = false;
  private readonly MARKER_ZOOM_LEVEL = 16;
  private readonly MARKER_ICON = icon({
    iconUrl:
      'https://res.cloudinary.com/foodmine/image/upload/v1638842791/map/marker_kbua9q.png',
    iconSize: [42, 42],
    iconAnchor: [21, 42],
  });

  private readonly DEFAULT_LATLNG: LatLngTuple = [1.29, 36.82];
  @ViewChild('map', { static: true })
  mapElement!: ElementRef;

  private searchControl!: Control & any;

  map!: Map;
  currentMarker!: Marker;

  constructor(private locationService: LocationService) {}

  ngOnChanges(): void {
    if (!this.order) return;
    this.initializeMap();

    if (this.readonly && this.addressLatLng) {
      this.showLocationOnReadonlyMode();
      this.geocodeAddress(this.addressLatLng);
    }
  }

  showLocationOnReadonlyMode() {
    const m = this.map;
    this.setMarker(this.addressLatLng);
    m.setView(this.addressLatLng, this.MARKER_ZOOM_LEVEL);
    m.dragging.disable();
    m.touchZoom.disable();
    m.doubleClickZoom.disable();
    m.scrollWheelZoom.disable();
    m.boxZoom.disable();
    m.keyboard.disable();
    m.off('click');
    m.tap?.disable();
    this.currentMarker.dragging?.disable();
  }

  initializeMap() {
    if (this.map) return;
    this.map = L.map(this.mapElement.nativeElement, {
      attributionControl: false,
    }).setView(this.DEFAULT_LATLNG, 1);

    L.tileLayer('https://{s}.tile.osm.org/{z}/{x}/{y}.png').addTo(this.map);
    const searchLayer = new LayerGroup();
    this.searchControl = new (L.Control as any).Search({
      position: 'topright',
      layer: searchLayer,
      initial: false,
      collapsed: false,
    });
    this.searchControl.addTo(this.map);
  }

  findMyLocation() {
    this.locationService.getCurrentLocation().subscribe({
      next: (latLng) => {
        this.map.setView(latLng, this.MARKER_ZOOM_LEVEL);
        this.setMarker(latLng);
      },
    });
  }

  setMarker(latlng: LatLngExpression) {
    this.addressLatLng = latlng as LatLng;
    if (this.currentMarker) {
      this.currentMarker.setLatLng(latlng);
      return;
    }
    this.currentMarker = marker(latlng, {
      draggable: true,
      autoPan: true,
      icon: this.MARKER_ICON,
    }).addTo(this.map);

    this.currentMarker.on('dragend', () => {
      this.addressLatLng = this.currentMarker.getLatLng();
      this.geocodeAddress(this.addressLatLng);
    });

    this.geocodeAddress(latlng);
  }

  geocodeAddress(latlng: LatLngExpression) {
    if (this.map.options.crs) {
      (L.Control as any).Geocoder.nominatim().reverse(
        latlng,
        this.map.options.crs.scale(this.map.getZoom()),
        (results: any) => {
          if (results && results.length > 0) {
            const placeName = results[0].name;
            console.log('Place name:', placeName);
          }
        }
      );
    }
  }

  set addressLatLng(latlng: LatLng) {
    if (!latlng.lat.toFixed) return;
    // mongodb doesnt accept more than 8 points
    latlng.lat = parseFloat(latlng.lat.toFixed(8));
    latlng.lng = parseFloat(latlng.lng.toFixed(8));
    this.order.addressLatLng = latlng;
    console.log(this.order.addressLatLng);
  }

  get addressLatLng() {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return this.order.addressLatLng!;
  }
}
