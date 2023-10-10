import * as paper from 'paper'
import {Subject} from "rxjs";
import * as TWEEN from '@tweenjs/tween.js'

export interface IHeartTree {
    x: number
    y: number,
    layer: paper.Layer
}

enum Color {
    Branch = 'red',
    Land = 'red',
    Seed = 'red',
    Heart = 'red'
}

export class Base {
    protected x: number
    protected y: number
    protected mainLayer: paper.Layer
    protected dpr = window.devicePixelRatio
    protected layer = new paper.Layer()
    protected clientWidth = document.body.clientWidth;
    protected clientHeight = document.body.clientHeight
    protected bottom = this.clientHeight - this.clientHeight * 0.1
    public subject = new Subject()

    constructor(o: IHeartTree) {
        this.x = o.x
        this.y = o.y
        this.mainLayer = o.layer
    }

    createLayer() {
        return new paper.Layer()
    }

    debugPoint(point: number[], c = 'red') {
        new paper.Shape.Circle({
            center: point,
            radius: 3,
            fillColor: c
        })
    }
}

export class HeartTree extends Base {
    constructor(o: IHeartTree) {
        super(o)
        // const heartLine = new HeartLine(o)
        // const seed = new Seed(o)
        // seed.init()

        const branch = new Branch(o)
        branch.init()
        // heartLine.subject.subscribe( () => seed.init() )
    }
}

export class HeartLine extends Base {
    constructor(o: IHeartTree) {
        super(o);
        this.init()
    }

    init() {
        this.drawHeart()
        this.drawLine()
        this.drawText()
        this.layer.scale(this.dpr)
        this.mainLayer.addChild(this.layer)
    }

    private drawHeart() {
        const points = []
        const l = new paper.Layer()
        const point = new paper.Point(this.x, this.y)

        for (let i = 1; i < 380; i += 1) {
            const rad = i / Math.PI
            const x = 20 * Math.pow(Math.sin(rad), 3)
            const y = 13 * Math.cos(rad) - 5 * Math.cos(2 * rad) - 2 * Math.cos(3 * rad) - Math.cos(4 * rad);
            points.push([x, -y])
        }
        const shape = new paper.Path({
            segments: points,
            fillColor: Color.Heart,
            closed: true,
            applyMatrix: false
        });
        l.addChild(shape)
        l.translate(point)

        this.layer.addChild(l)
        let stop = false
        const zoomOut = () => {
            const t = shape.tween({scaling: 1}, {scaling: 2}, {duration: 500})
                .then(() => stop ? t.stop() : zoomIn())
        }
        const zoomIn = () => {
            const t = shape.tween({scaling: 2}, {scaling: 1}, {duration: 500})
                .then(() => stop ? t.stop() : zoomOut())
        }
        zoomOut()
        shape.on('click', (e: any) => {
            stop = true
            this.subject.next('terminate')
        })
    }

    private drawLine() {
        const shape = new paper.Path({
            segments: [
                [this.x, this.y],
                [this.x + 20, this.y + 15],
                [this.x + 45, this.y + 15]
            ],
            strokeWidth: 2,
            strokeColor: Color.Heart,
        });
        const l = new paper.Layer()
        l.addChild(shape)
        this.layer.addChild(l)
    }

    private drawText() {
        const point = new paper.Point({x: this.x + 25, y: this.y + 10})
        const text = new paper.PointText(point)
        text.content = 'Come'
        text.fillColor = new paper.Color(Color.Heart)
        text.fontSize = 6
        const l = new paper.Layer()
        l.addChild(text)
        this.layer.addChild(l)
    }
}


export class Seed extends Base {
    private landWidth: number
    private seedSize = 4;
    private duration = 1200
    private color = Color.Seed
    private landSize = 15

    constructor(o: IHeartTree) {
        super(o);
        this.landWidth = Math.ceil(this.clientWidth * 0.8 / 2)
    }

    public init() {
        this.drawSeed()
        this.drawLand()
        this.layer.scale(this.dpr)
        this.mainLayer.addChild(this.layer)
    }

    private drawSeed() {
        const l = new paper.Layer()
        const seed = new paper.Shape.Circle({
            center: [this.x, this.y],
            radius: this.seedSize,
            fillColor: 'red',
            applyMatrix: false
        })
        seed.tween(
            {position: {x: this.x, y: this.y}},
            {position: {x: this.x, y: this.bottom}},
            {duration: this.duration}
        ).then(() => {
            seed.remove();
            this.subject.next('complete')
        })
        l.addChild(seed)
        this.layer.addChild(l)
    }

    private drawLand() {
        const l = this.createLayer()
        const leftLand = new paper.Path({
            segments: [
                new paper.Point(this.x, this.bottom),
            ],
            strokeWidth: this.landSize,
            strokeColor: this.color,
            strokeCap: 'round'
        });
        const rightLand = new paper.Path({
            segments: [
                new paper.Point(this.x, this.bottom),
            ],
            strokeWidth: this.landSize,
            strokeColor: this.color,
            strokeCap: 'round'
        });
        const c = {lx: this.x, rx: this.x}
        let animateId: number = 0
        const t = new TWEEN.Tween(c, false)
            .to({lx: this.x + this.landWidth, rx: this.x - this.landWidth}, this.duration)
            .easing(TWEEN.Easing.Linear.None)
            .onUpdate(() => {
                leftLand.add(new paper.Point(c.lx, this.bottom))
                rightLand.add(new paper.Point(c.rx, this.bottom))
                cancelAnimationFrame(animateId)
            })
            .start()

        const a = (time: number | undefined) => {
            t.update(time)
            animateId = requestAnimationFrame(a)
        }
        requestAnimationFrame(a)
        this.mainLayer.addChild(l)
    }
}

interface BranchPoint {
    x: number
    y: number
    radius: number
    child: BranchPoint[]
}
export class Branch extends Base {
    private color = Color.Branch
    private branches: Array< BranchPoint > = []

    constructor(o: IHeartTree) {
        super(o);
    }

    public init() {
        this.drawBranch()
        this.mainLayer.addChild(this.layer)
    }

    private drawBranch() {
        const start = [this.x, this.bottom];
        const end = [this.x - 7 * this.dpr, this.y];
        const delta = [this.x, this.bottom - this.dpr * 60]
        const delta2 = [this.x, this.y]
        this.branches = this.makePoints([start, delta, delta2, end], 3 * this.dpr)
        const points = this.branches
        const point = points[points.length - 15]
        const sub: any = [
            [
                point,
                [point.x + 30, point.y - 50],
                [point.x + 50, point.y - 75],
                [point.x + 70, point.y - 73],
                point.radius
            ]
        ]
        sub.forEach((s: any) => {
            points[points.length - 15].child = this.makePoints([s[0],s[1],s[2],s[3]],s[4])
        })
        const l = new paper.Layer()
        let timeout = 0;
        const draw = () => {
            timeout = setTimeout(() => {
                if (!this.branches.length) {
                    clearTimeout(timeout)
                    return
                }
                const point = this.branches.shift() as BranchPoint
                l.addChild(this.createBranch(point))
                draw()
            }, 10)
        }
        draw()
        this.layer.addChild(l)
    }

    static threeBezier(t: number, p1: number[], cp1: number[], cp2: number[], p2: number[]) {
        const [x1, y1] = p1;
        const [x2, y2] = p2;
        const [cx1, cy1] = cp1;
        const [cx2, cy2] = cp2;
        let x =
            x1 * (1 - t) * (1 - t) * (1 - t) +
            3 * cx1 * t * (1 - t) * (1 - t) +
            3 * cx2 * t * t * (1 - t) +
            x2 * t * t * t;
        let y =
            y1 * (1 - t) * (1 - t) * (1 - t) +
            3 * cy1 * t * (1 - t) * (1 - t) +
            3 * cy2 * t * t * (1 - t) +
            y2 * t * t * t;
        return [x, y];
    }

    makePoints(p: number[][], r: number): Array< BranchPoint > {
        const points = []
        let radius = r
        for (let i = 0; i < 100; i++) {
            const result = Branch.threeBezier(i / 100, p[0], p[1], p[2], p[3])
            points.push({
                x: result[0],
                y:result[1],
                radius,
                child: []
            })
            radius *= 0.99
        }
        return points
    }

    createBranch(p: BranchPoint ) {
        return new paper.Shape.Circle({
            center: [p.x, p.y],
            radius: p.radius ,
            fillColor: this.color
        })
    }
}
