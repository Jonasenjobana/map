import * as L from 'leaflet';
import { SLCanvasBaseLayer } from './canvas.layer';
export class CanvasEventProxy extends SLCanvasBaseLayer {
  private proxyEvent
  constructor(options: L.LayerOptions) {
    super(options);
  }
  protected _switchEvent(flag: boolean) {
    let type: 'on' | 'off' = flag ? 'on' : 'off';
    const map = this._map;
    map[type]('click', this._eventProxy, this);
  }
  protected _eventProxy(e: L.LeafletMouseEvent) {
    const { type, containerPoint, latlng, originalEvent } = e
    switch(type) {
        case 'click':
            
            break;
    }
  }
}
export type SLLeafletEvent = {
    type: string;
    containerPoint: [number, number];
    latlng: [number, number];
    cb: any
}