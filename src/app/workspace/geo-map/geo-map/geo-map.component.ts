import { PlotInfo } from './../../../../shared/leaflet/layer/canvas.layer';
import { Point1, Point2, DensityInfo, ZoomMap } from './constant';
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
  layerMap: Map<number, { layer: L.TileLayer; url: string }> = new Map();
  baseUrl: string = 'http://192.168.1.89:8787/geoserver/shiptrack/wms';
  maxZoom = 18;
  minZoom = 3;
  currentLayer: { layer: L.TileLayer; url: string };
  multiLayerNameTemp: string = 'shiptrack:test-';
  singleLayerNameTemp: string = '';
  multiLayerName: string = '';
  singleLayerName: string = '';
  groupType: 'single' | 'multi' = 'multi';
  zoom = 3;
  latlng;
  isFull: boolean = false;
  drawLayer: L.LayerGroup;
  showRgb: boolean = true;
  densityInfo: DensityInfo[] = [];
  colorValue: string[] = [];
  constructor() {}
  ngOnInit(): void {
    this.initColor();
    this.initMap();
    this.submit();
  }
  initColor() {
    let zoom = this.zoom >=1 && this.zoom <= 13 ? this.zoom : 13
    this.densityInfo = _.cloneDeep(ZoomMap[zoom]);
    this.densityInfo.reverse();
    let info = this.densityInfo.shift();
    this.densityInfo.push(info);
    this.colorValue = this.densityInfo.map(el => {
      return `rgba(${el.rgba})`
    })
  }
  initMap() {
    this.map = L.map('map', {
      minZoom: this.minZoom,
      maxZoom: this.maxZoom,
    }).setView([33.79, 120.95], 1);
    this.map.on('zoom', () => {
      this.zoom = this.map.getZoom();
      this.initColor();
      this.drawPipe();
      if (this.currentLayer && this.groupType == 'multi') {
        // this.currentLayer = this.layerMap.get(this.zoom);
        // this.currentLayer.layer.addTo(this.map);
      }
    });
    this.map.on('zoomstart', (e) => {
      if (this.currentLayer && this.groupType == 'multi') {
        this.currentLayer.layer.remove();
      }

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
  setCanvasLayer() {
    let info: PlotInfo = {
      data: {
        name: '北油管道',
      },
      plotType: 'group',
      children: [
        {
          plotType: 'points',
          latlngs: Point1
        },
        ...Point1.map(point => {
          return {
            plotType: 'point',
            latlng: point,
            data: {
              name: `南保管道gcp-${2 + Math.floor(5+Math.random()*1000)}`
            }
          }
        })
      ]
    }
    let info2: PlotInfo = {
      data: {
        name: '北横管道',
      },
      plotType: 'group',
      children: [
        {
          plotType: 'points',
          latlngs: Point2
        },
        ...Point2.map(point => {
          return {
            plotType: 'point',
            latlng: point,
            data: {
              name: `南巡北海光纤5nm-220G-${2 + Math.floor(5+Math.random()*1000)}`
            }
          }
        })
      ]
    }
    let layerContainerPoint: PlotInfo = {
      data: {
        name: 'container和Layer集合'
      },
      plotType: 'group',
      children: [
        {
          data: {
            name: 'container point'
          },
          plotType: 'point',
          latlng: (function(that) {let a = that.map.containerPointToLatLng([0, 0]); return [a.lat, a.lng]})(this)
        },
        {
          data: {
            name: 'layer point'
          },
          plotType: 'point',
          latlng: (function(that) {let a = that.map.layerPointToLatLng([0, 0]); return [a.lat, a.lng]})(this)
        }
      ]
    }
    let allData: PlotInfo = {
      data: {
        name: '渤海光纤管道'
      },
      plotType: 'total',
      children: [
        info,
        info2
      ]
    }
    new SLTrackLayer(allData).addTo(this.map)
  }
  getLinearColor() {
    return `linear-gradient(${this.colorValue.join(',')})`
  }
  initLayer() {
    // 移除图层
    if (this.layerMap.size > 0) {
      this.layerMap.forEach((value) => {
        value.layer.remove();
      });
    }
    this.layerMap = new Map();
    this.currentLayer && this.currentLayer.layer.remove();
  }
  drawPipe() {
    this.drawLayer && this.drawLayer.remove();
    if (this.zoom < 4) return;
    const line1 = L.polyline(Point1, { color: 'red' });
    const line2 = L.polyline(Point2, { color: 'red' });
    this.drawLayer = L.layerGroup([line1, line2]);
    if (this.zoom >= 9) {
      Point1.forEach((point) => {
        const marker = L.circleMarker(point, { radius: 4, fillOpacity: 1 });
        this.drawLayer.addLayer(marker);
      });
      Point2.forEach((point) => {
        const marker = L.circleMarker(point, { radius: 4, fillOpacity: 1 });
        this.drawLayer.addLayer(marker);
      });
    }
    // this.drawLayer.addTo(this.map);
  }
  submit() {
    this.groupType = !!this.multiLayerNameTemp ? 'multi' : 'single';
    this.initLayer();
    if (this.groupType == 'multi') {
      this.multiLayerName = this.multiLayerNameTemp;
      new Array(this.maxZoom).fill(0).forEach((el, index) => {
        let zoom = index + 1;
        if (zoom >= this.minZoom && zoom <= this.maxZoom) {
          this.layerMap.set(zoom, {
            layer: L.tileLayer.wms(`${this.baseUrl}`, {
              layers: `${this.multiLayerName}${zoom}`,
              format: 'image/gif',
              transparent: true,
              crs: L.CRS.EPSG4326,
              tiled: true,
            } as any),
            url: ``,
          });
        }
      });
      this.currentLayer = this.layerMap.get(this.map.getZoom());
    } else {
      this.singleLayerName = this.singleLayerNameTemp;
      this.currentLayer.layer = L.tileLayer.wms(`${this.baseUrl}`, {
        layers: `${this.singleLayerName}`,
        format: 'image/gif',
        transparent: true,
        crs: L.CRS.EPSG4326,
        tiled: true,
      } as any);
    }
    // this.currentLayer.layer.addTo(this.map);
  }
  multiGroupChange($event) {
    this.multiLayerNameTemp = $event;
    this.singleLayerNameTemp = '';
  }
  singleGroupChange($event) {
    this.multiLayerNameTemp = '';
    this.singleLayerNameTemp = $event;
  }
}
