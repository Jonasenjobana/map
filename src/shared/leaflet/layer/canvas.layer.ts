import { DrawTool } from './canvas.tool';
import * as L from 'leaflet';
import { Canvas } from '@antv/g';
import { Renderer } from '@antv/g-canvas';
export class SLCanvasBaseLayer extends L.Layer {
  protected _map: L.Map;
  protected _canvas: HTMLCanvasElement;
  protected antVCanvas: Canvas 
  protected _ctx: CanvasRenderingContext2D;
  protected _options: CanvasLayerOptions;
  protected plotInfo: PlotInfo;
  protected drawTool: DrawTool;
  constructor(options?: CanvasLayerOptions) {
    super(options);
    this._options = Object.assign({animated: true}, options);
  }
  onAdd(map: L.Map): this {
    this._map = map;
    this._initCanvas();
    this._switchEvent(true);
    return this;
  }
  onRemove(map: L.Map): this {
    this._canvas && L.DomUtil.remove(this._canvas);
    this._switchEvent(false);
    return this;
  }
  private _initCanvas() {
    const {
      className = '',
      zIndex = 200,
      pane = 'overlayPane',
      animated,
    } = this._options;
    const paneElement = this._map.getPane(pane);
    let canvas = (this._canvas = L.DomUtil.create(
      'canvas',
      `leaflet-canvas-layer ${className}`,
      paneElement
    ));
    Object.assign(canvas.style, { transformOrigin: '50% 50%', zIndex });
    const { x, y } = this._map.getSize();
    const dpr = window.devicePixelRatio
    canvas.width = x * dpr;
    canvas.height = y * dpr;
    this._ctx = canvas.getContext('2d');
    this.drawTool = new DrawTool(this._ctx);
    L.DomUtil.addClass(
      canvas,
      'leaflet-zoom-' + (animated ? 'animated' : 'hide')
    );
    this.antVCanvas = new Canvas({
      canvas: this._canvas,
      renderer: new Renderer(),
    })
  }
  protected _redraw() {
    this._resetCanvas();
    this.render();
  };
  public render() {}
  latlngToContainerPoints(latlngs: [number, number][]): [number, number][] {
    return latlngs.map(latlng => {
        const {x, y} = this._map.latLngToContainerPoint(latlng)
        return [x, y]
    })
  }
  protected _resetCanvas() {
    var topLeft = this._map.containerPointToLayerPoint([0, 0]);
    L.DomUtil.setPosition(this._canvas, topLeft);
    var size = this._map.getSize();
    this._canvas.width = size.x;
    this._canvas.height = size.y;
  }
  protected _switchEvent(flag: boolean) {
    let type: 'on' | 'off' = flag ? 'on' : 'off';
    const map = this._map;
    map[type]('viewreset resize moveend', this._redraw, this);
    console.log(this._options);
    
    if (this._options.animated) {
      /**缩放动画 */
      map[type]('zoomanim', this._animateZoom, this);
    }
  }
  /**缩放动画 */
  private _animateZoom(e: any) {
    let map: any = this._map;
    var scale = map.getZoomScale(e.zoom),
      offset = map
        ._getCenterOffset(e.center)
        ._multiplyBy(-scale)
        .subtract(map._getMapPanePos());
    L.DomUtil.setTransform(this._canvas, offset, scale);
  }
}
export type CanvasLayerOptions = {
  zIndex?: number;
  animated?: boolean;
  className?: string;
} & L.LayerOptions;
/**多个绘制元素组合的canvas图层 */
export type PlotInfo = {
  latlng?: [number, number];
  latlngs?: [number, number][];
  data?: any;
  cb?: {[key in string]: (...any) => any};
  plotType?: string // 基本绘制元素 点、图、圆、多边形、矩形
  children?: PlotInfo[]
};
