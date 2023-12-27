export class DrawTool {
    private ctx: CanvasRenderingContext2D
    constructor(ctx: CanvasRenderingContext2D) {
        this.ctx = ctx;
    }
    drawPoint(point: [number, number], radius: number) {
        const [x, y] = point
        this.ctx.moveTo(x, y);
        this.ctx.arc(x, y, radius, 0, Math.PI*2);
    }
    drawPoints(points: [number, number][], radius: number) {
        points.forEach(point => {
            this.drawPoint(point, radius);
        })
        this.ctx.fill();
        this.ctx.stroke();
    }
    drawLines(points: [number, number][], isClose: boolean = false) {
        this.ctx.beginPath();
        const [startX, startY] = points[0]
        this.ctx.moveTo(startX, startY);
        points.slice(1).forEach(point => {
            const [x, y] = point;
            this.ctx.lineTo(x, y);
            this.ctx.moveTo(x, y);
        })
        if (isClose) {
           this.ctx.closePath();
        }
        this.ctx.fill();
        this.ctx.stroke();
    }
    drawRect(lt: [number, number], size: [number, number]) {
        this.ctx.rect(lt[0], lt[1], size[0], size[1]);
        this.ctx.stroke();
        this.ctx.fill();
    }
    drawPolygen(points: [number, number][]) {
        this.drawLines(points, true);
    }
    drawText(centerPoint: [number, number], text: string) {
        this.ctx.save();
        this.ctx.textBaseline = 'middle';
        this.ctx.textAlign = 'center';
        const [x, y] = centerPoint;
        this.ctx.fillText(text, x, y);
        this.ctx.restore();
    }
    setPara(options: Partial<CanvasRenderingContext2D>) {
        this.ctx.save();
        Object.assign(this.ctx, options);
    }
    resetPara() {
        this.ctx.restore();
    }
}