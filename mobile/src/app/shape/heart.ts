import * as paper from 'paper'
export interface IHeartTree {
    x: number
    y: number,
    layer: paper.Layer
}

export class Base {
    protected x: number
    protected y: number
    protected mainLayer: paper.Layer
    protected dpr = window.devicePixelRatio
    protected layer = new paper.Layer()
    constructor(o: IHeartTree) {
        this.x = o.x
        this.y = o.y
        this.mainLayer=o.layer
    }
}
export class HeartTree extends Base{
    constructor(o: IHeartTree) {
        super(o)
        const heartLine = new HeartLine(o)
    }
}

export class HeartLine extends Base {
    constructor(o: IHeartTree) {
        super(o);
        this.init()
    }

    init () {
        this.drawHeart()
        this.drawLine()
        this.drawText()
        this.layer.scale(this.dpr)
        this.mainLayer.addChild(this.layer)
    }

    private drawHeart() {
        const points = []
        const l = new paper.Layer()
        const point = new paper.Point(this.x , this.y)

        for (let i = 1; i < 380; i += 1) {
            const rad = i / Math.PI
            const x = 20 * Math.pow(Math.sin(rad), 3)
            const y = 13 * Math.cos(rad) - 5 * Math.cos(2 * rad) - 2 * Math.cos(3 * rad) - Math.cos(4 * rad);
            points.push([x ,-y])
        }
        const shape = new paper.Path({
            segments: points,
            fillColor: 'red',
            closed: true
        });
        l.addChild(shape)
        l.translate(point)
        this.layer.addChild(l)
        shape.on('click' , (e: any) => {
        })
    }

    private drawLine () {
        const shape = new paper.Path({
            segments: [
                [this.x , this.y],
                [this.x + 20 , this.y + 15 ],
                [this.x + 45 , this.y + 15 ]
            ],
            strokeWidth: 2,
            strokeColor: 'red',
        });
        const l = new paper.Layer()
        l.addChild(shape)
        this.layer.addChild(l)
    }

    private drawText () {
        const point = new paper.Point({ x:this.x + 25 , y: this.y + 10 })
        const text = new paper.PointText(point)
        text.content = 'Come'
        text.fillColor = new paper.Color('red')
        text.fontSize = 6
        const l = new paper.Layer()
        l.addChild(text)
        this.layer.addChild(l)
    }
}
