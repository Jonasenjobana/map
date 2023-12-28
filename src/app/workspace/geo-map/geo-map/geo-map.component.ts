import { PlotInfo } from './../../../../shared/leaflet/layer/canvas.layer';
import { Point1, Point2, Track1, Track2 } from './constant';
import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import * as _ from 'lodash';
import { SLTrackLayer } from 'src/shared/leaflet/layer/track.layer';
@Component({
  selector: 'app-geo-map',
  templateUrl: './geo-map.component.html',
  styleUrls: ['./geo-map.component.less'],
})
export class GeoMapComponent implements OnInit {
  map: L.Map;
  baseUrl: string = 'http://192.168.1.89:8787/geoserver/shiptrack/wms';
  maxZoom = 18;
  minZoom = 3;
  zoom = 3;
  latlng;
  isFull: boolean = false;
  drawLayer: L.LayerGroup;
  layer: SLTrackLayer
  isPlay: boolean = false
  constructor() {}
  ngOnInit(): void {
    this.initMap();
  }
  initMap() {
    this.map = L.map('map', {
      minZoom: this.minZoom,
      maxZoom: this.maxZoom,
    }).setView([33.79, 120.95], 1);
    this.map.on('zoom', () => {
      this.zoom = this.map.getZoom();
    });
    this.map.on('mousemove', (e) => {
      this.latlng = e.latlng;
    });
    // 添加基础地图图层
    const baseLayer = L.tileLayer(
      'http://webrd0{s}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}',
      {
        attribution: '',
        subdomains: ['1', '2', '3', '4'],
      }
    );
    baseLayer.addTo(this.map);
    this.setCanvasLayer();
  }
  move() {
    this.isPlay = !this.isPlay
    // this.layer.anime(this.isPlay)
  }
  setCanvasLayer() {
    const allData = this.getPlotData()
    this.layer = new SLTrackLayer(allData).addTo(this.map);
    [Track1, Track2].forEach(track => {
      this.layer.setTracks(track[0].mmsi, track)
    })
  }
  getPlotData(): PlotInfo {
    const children: PlotInfo[] = [Track1, Track2].map(track => {
      return {
        plotType: 'track',
        children: track.map(item2 => {
          return {
            plotType: 'track-point',
            latlng: [item2.lat, item2.lng],
            data: item2
          }
        }),
        data: {
          mmsi: '566926000',
          dates: ['2023-12-08 18:00:00', '2023-12-15 23:00:00']
        }
      }
    })
    return {
      plotType: 'group',
      children
    }
  }
}
