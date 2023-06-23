/* eslint-disable @angular-eslint/component-selector */
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { LatLngTuple, Map, map, tileLayer } from 'leaflet';

@Component({
  selector: 'map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements OnInit {
  private readonly DEFAULT_LATLNG: LatLngTuple = [1.29, 36.82];
  @ViewChild('map', { static: true })
  mapElement!: ElementRef;

  map!: Map;

  ngOnInit(): void {
    this.initializeMap();
  }

  initializeMap() {
    if (this.map) return;
    this.map = map(this.mapElement.nativeElement, {
      attributionControl: false,
    }).setView(this.DEFAULT_LATLNG, 1);

    tileLayer('https://{s}.tile.osm.org/{z}/{x}/{y}.png').addTo(this.map);
  }
}
