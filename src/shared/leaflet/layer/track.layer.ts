import * as L from "leaflet";
import { CanvasLayerOptions, PlotInfo, SLCanvasBaseLayer } from "./canvas.layer";
import { DrawTool } from "./canvas.tool";

export class SLTrackLayer extends SLCanvasBaseLayer {
    protected _map: L.Map;
    protected _canvas: HTMLCanvasElement;
    protected _ctx: CanvasRenderingContext2D;
    protected _options: CanvasLayerOptions;
    protected plotInfo: PlotInfo;
    protected drawTool: DrawTool;
    constructor(plotInfo: PlotInfo, options?: CanvasLayerOptions) {
      super(options);
      this.plotInfo = plotInfo;
    }
    protected _redraw() {
      this._resetCanvas();
      this.render();
    };
    public render() {
      this.plotInfo.children.forEach(group => {
          this._renderGroup(group.children)
      })
    }
    private _renderGroup(children: PlotInfo[]) {
      const zoom = this._map.getZoom()
      children.forEach(child => {
          if (zoom > 4) {
              if (child.plotType === 'points') {
                  const points = this.latlngToContainerPoints(child.latlngs)
                  this.drawTool.setPara({
                      fillStyle: '#e5c070',
                      strokeStyle: '#e5c070',
                      lineWidth: 5,
                  });
                  this.drawTool.drawLines(points)
                  this.drawTool.resetPara()
                  this.drawTool.setPara({
                      fillStyle: 'red',
                      strokeStyle: 'red',
                  });
                  let radius = zoom > 9 ? 5 : 2
                  this.drawTool.drawPoints(points, radius)
                  this.drawTool.resetPara()
              }
              if (child.plotType === 'point' && zoom >= 9) {
                  const [x, y] = this.latlngToContainerPoints([child.latlng])[0]
                  this.drawTool.setPara({
                      font: '24px',
                      fillStyle: '#000'
                  })
                  this.drawTool.drawText([x, y + 10], child.data.name)
              }
          }
      })
    }
  }