import { Circle, Group, HTML, Line, Polygon, Polyline, Text } from '@antv/g';
import * as L from 'leaflet';
import { Track } from 'src/app/workspace/geo-map/geo-map/constant';
import {
  CanvasLayerOptions,
  PlotInfo,
  SLCanvasBaseLayer,
} from './canvas.layer';
import { DrawTool } from './canvas.tool';

export class SLTrackLayer extends SLCanvasBaseLayer {
  protected _map: L.Map;
  protected _canvas: HTMLCanvasElement;
  protected _ctx: CanvasRenderingContext2D;
  protected _options: CanvasLayerOptions;
  protected plotInfo: PlotInfo;
  protected drawTool: DrawTool;
  private trackMap: Map<string, any> = new Map(); 
  ships: {mmsi: string, ship: Group}[] = [];
  /**可以根据progress 百分比获取所在步长 根据步长*/
  allStep: number = 60 * 10 // 总帧数 = 总时长(s) * 刷新率
  tracks: {[key in string]: Track[]} = {};
  preStep: Track
  nextStep: Track
  constructor(plotInfo: PlotInfo, options?: CanvasLayerOptions) {
    super(options);
    this.plotInfo = plotInfo;
  }
  setTracks(mmsi: string, track: any) {
    this.tracks[mmsi] = track;
  }
  protected _redraw() {
    this._resetCanvas();
    this.antVCanvas.destroyChildren();
    this.ships = [];
    this.render();
  }
  public render() {
    this.trackMap = new Map();
    this.plotInfo.children.forEach((track) => {
      let plotObj = {};
      this.trackMap.set(track.data.mmsi, plotObj);
      this.renderTrack(track, plotObj);
    });
  }
  /**绘制船形状 */
  genShipShape(x, y) {
    const polygon = new Polygon({
      style: {
        points: [
          [3, 0],
          [6, 6],
          [3, 4.5],
          [0, 6],
        ],
        stroke: '#1890FF',
        fill: '#1890FF',
        lineWidth: 2
      },
    });
    let group = new Group({
      id: 'ship',
      style: {
        zIndex: 3,

      },
    });
    group.setPosition([x - 3, y - 3]);
    group.appendChild(polygon);
    return group;
  }
  private renderTrack(track: PlotInfo, plotObj: { [key in string]: any }) {
    const zoom = this._map.getZoom();
    let linePoint: [number, number][] = []
    let ship: Group
    let fx, fy
    track.children.forEach((child, index) => {
      const { plotType, latlng } = child;
      if (zoom > 4) {
        if (plotType === 'track-point') {
          const { x, y } = this._map.latLngToContainerPoint(latlng);
          if (index === 0) {
            fx = x, fy = y
          }
          let circle = new Circle({
            style: {
              cx: x,
              cy: y,
              r: zoom < 9 ? 2 : 5,
              fill: 'red',
              stroke: 'red',
              cursor: 'pointer',
              zIndex: 2,
            },
          });
          linePoint.push([x, y]);
          (plotObj['circle'] && plotObj['circle'].push(circle)) ||
            (plotObj['circle'] = [circle]);
          this.antVCanvas.appendChild(circle);
        }
      }
    });
    let polyline = new Polyline({
      style: {
        points: linePoint,
        stroke: '#1890ff',
        zIndex: 1
      }
    })
    this.antVCanvas.appendChild(polyline);
    ship = this.genShipShape(fx, fy);
    this.ships.push({
      mmsi: track.data.mmsi,
      ship
    });
    this.antVCanvas.appendChild(ship);
  }
  /**
   * 动画
   * TODO 需要暂停保留状态
   * @param isPlay 播放暂停
   */
  anime() {
    let startTime = Date.now();
    let animeDraw = () => {
      let currentTime = Date.now();
      let progress = 
      this.ships.forEach(item => {
        // const [x, y] = this.getShipNextPosition(item.mmsi)
        // item.ship.setPosition([x - 3, y - 3])
      })
    }
    requestAnimationFrame(animeDraw);
  }
  playAnime(progress: number) {
    // this.preStep = 
  }
  stopAnime() {

  }
  /**
   * @param mmsi 船 轨迹
   * @param progress 时间进度 
   * @returns 
   */
  getShipNextPosition(mmsi: string, progress: number) {
    let times: number[] = []
    // 总距离
    const totalDistance = this.tracks[mmsi].slice(-1)[0].sumPreDistance
    const totalTime = this.tracks[mmsi].reduce((preTime, item) => {
      let time = item.nextDistance / item.speed
      times.push(time)
      return time
    }, 0)
    let progressArr: number[] = []
    times.forEach(time => {
      progressArr.push(time/totalTime)
    })
    let index = progressArr.findIndex(item => {
      return item > progress
    })
    const prePoint = this.tracks[mmsi][index]
    const nextPoint = this.tracks[mmsi][index + 1]
    // 插值算法计算中间位置
    // this.lerp(prePoint, nextPoint)
    return [0, 0]
  }
  /**
   * 线性插值 计算中间位置
   * @param min 
   * @param max 
   * @param fraction 百分比
   * @returns 
   */
  lerp(min, max, fraction) {
    return (max - min ) * fraction + min;
  }
}
