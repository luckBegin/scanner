const threeBezier = (t, p1, cp1, cp2, p2) => {
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

const drawPoint = (ctx, p, c = 'red') => {
	ctx.save()
	ctx.beginPath();
	ctx.fillStyle = c
	ctx.arc(p[0], p[1], 2, 0, Math.PI * 2)
	ctx.fill()
	ctx.closePath()
	ctx.restore()
}

export class BaseShape {
	canvas = null;
	ctx = null
	screenWidth = null
	screenHeight = null
	center = {x: 0, y: 0}
	animateId = null
	dpr = 1
	constructor(canvas, screenWidth, screenHeight, dpr) {
		this.canvas = canvas
		this.ctx = canvas.getContext('2d');
		this.screenWidth = screenWidth
		this.screenHeight = screenHeight;
		this.dpr = dpr
		this.center = {x: this.screenWidth / 2, y: this.screenHeight / 2}
	}

	clearScreen() {
		this.ctx.clearRect(0, 0, this.screenWidth, this.screenHeight)
	}

	moveToCenter() {
		this.ctx.translate(this.center.x, this.center.y)
	}

	animate(fn) {
		this.animateId = this.canvas.requestAnimationFrame(fn)
	}

	cancelAnimate() {
		if (this.animateId) this.canvas.cancelAnimationFrame(this.animateId)
		this.animateId = null
	}
}

export class Tree extends BaseShape {
	text = null
	heart = null
	seed = null
	branch = null
	leaf = null
	constructor(c, w, h, dpr) {
		super(c, w, h, dpr)
		this.text = new Text(c, w, h, dpr)
		this.heart = new Heart(c, w, h, dpr)
		this.seed = new Seed(c, w, h, dpr)
		this.branch = new Branch(c,w,h, dpr)
		this.leaf = new Leaf(c,w,h, dpr)
		this.init()
	}

	init() {
		this.animate(() => {
			this.clearScreen()
			this.heart.init()
			this.text.init()
			this.init()
		})
	}

	die() {
		this.cancelAnimate()
		this.clearScreen();
		this.seed.init((h) => {
			this.branch.init(h, () => this.leaf.init() )
		})
	}
}

class Heart extends BaseShape {
	animaScale = 1
	animaScaleRate = 0.03
	scale = 1.5;
	mark = 1

	constructor(c, w, h,dpr) {
		super(c, w, h,dpr);
		this.init()
	}

	init() {
		if (this.animaScale >= 1.5) {
			this.mark = -1
		}
		if (this.animaScale <= 0.5) {
			this.mark = 1
		}
		this.animaScale = this.animaScale + this.mark * this.animaScaleRate
		this.draw()
	}

	draw() {
		this.ctx.save()
		this.moveToCenter()
		this.ctx.beginPath();
		this.ctx.lineWidth = 2
		for (let i = 1; i < 90; i += 0.1) {
			const rad = i / Math.PI
			const x = 20 * Math.pow(Math.sin(rad), 3)
			const y = 13 * Math.cos(rad) - 5 * Math.cos(2 * rad) - 2 * Math.cos(3 * rad) - Math.cos(4 * rad);
			this.ctx.lineTo(x * this.animaScale  * this.dpr, -y * this.animaScale  * this.dpr)
		}
		this.ctx.fillStyle = 'red'
		this.ctx.fill();
		this.ctx.closePath();
		this.ctx.restore()
	}
}

class Text extends BaseShape {
	constructor(c, w, h,dpr) {
		super(c, w, h,dpr);
		this.init()
	}

	init() {
		this.ctx.save();
		this.moveToCenter()
		this.ctx.beginPath()
		this.ctx.strokeStyle = '#f00';
		this.ctx.fillStyle = '#f00';
		this.ctx.moveTo(0, 0);
		this.ctx.lineTo(15 * this.dpr, 15 * this.dpr);
		this.ctx.lineTo(60 * this.dpr, 15 * this.dpr);
		this.ctx.lineWidth = this.dpr
		this.ctx.stroke();
		this.ctx.font = `${10 * this.dpr}px Arial`
		this.ctx.fillText("Come", 25 * this.dpr, 10 * this.dpr);
		this.ctx.closePath()
		this.ctx.restore();
	}
}

class Seed extends BaseShape {
	bottom = 50;
	height = 0
	landBottom = 0
	seedSpeed = 2
	percent = 0
	landSize = 0
	landSpacing = 20 * this.dpr

	constructor(c, w, h,dpr) {
		super(c, w, h,dpr);
		this.landBottom = this.screenHeight / 2 - this.bottom
		this.percent = 0
	}

	drawSeed() {
		this.clearScreen()
		this.ctx.save()
		this.moveToCenter()
		this.ctx.beginPath()
		this.ctx.fillStyle = 'red'
		this.ctx.fillStyle = 'rgb(119, 70, 37)';
		this.ctx.shadowColor = 'rgb(35, 31, 32)';
		this.ctx.shadowBlur = 2;
		this.ctx.arc(0, this.height, 5 * this.dpr, 0, 2 * Math.PI)
		this.ctx.fill()
		this.ctx.closePath()
		this.ctx.restore()
	}

	drawLand() {
		const drawLand = (x) => {
			this.ctx.save()
			this.ctx.beginPath()
			this.moveToCenter()
			this.ctx.moveTo(0, this.landBottom)
			this.ctx.lineTo(x, this.landBottom)
			this.ctx.lineWidth = 9 * this.dpr
			this.ctx.strokeStyle = 'rgb(119, 70, 37)';
			this.ctx.lineCap = "round";
			this.ctx.stroke()
			this.ctx.closePath()
			this.ctx.restore()
		}
		drawLand(this.landSize)
		drawLand(-this.landSize)
	}

	init(fn) {
		this.drawSeed()
		this.drawLand()
		this.height += this.seedSpeed
		const p = this.landBottom / this.seedSpeed / 100
		const percent = this.percent * p > 1 ? 1 : this.percent * p
		this.percent += 0.01;
		this.landSize = (this.screenWidth / 2 - this.landSpacing) * percent
		this.animate(() => this.init(fn))
		if (this.screenHeight / 2 - this.height <= this.bottom) {
			this.cancelAnimate()
			if (fn) fn(this.bottom)
		}
	}

	print () {
		this.drawLand()
	}
}


export class Branch extends BaseShape {
	branches = []
	subBranches = []
	constructor(c, w, h,dpr) {
		super(c, w, h,dpr);
	}

	init (h,cb) {
		const start = [this.center.x, this.center.y * 2 - h - 7 ]
		const end = [this.center.x - 20, this.center.y]
		const delta = [this.center.x, this.center.y + 200]
		const delta2 = [this.center.x, this.center.y]
		this.branches = this.makePoints([start, delta, delta2 , end], 5 * this.dpr)
		this.animateDraw(this.branches)
			.then( _ => {
				this.cancelAnimate()
				this.drawSubBranch().then( _ => cb() )
			})
	}

	makePoints (p ,r) {
		const points = []
		let radius = r
		for (let i = 0; i < 100; i++) {
			const result = threeBezier(i / 100, p[0], p[1], p[2], p[3])
			points.push([result[0],result[1], radius ])
			radius *= 0.98
		}
		return points
	}
	drawSubBranch() {
		return new Promise( resolve => {
			const points = this.branches
			const point = points[points.length - 15]
			const point2 = points[points.length - 30]
			const point3 = points[points.length - 50]
			const point4 = points[points.length - 60]
			const sub = [
				[
					point,
					[point[0] + 30, point[1] - 50],
					[point[0] + 50, point[1] - 75],
					[point[0] + 70, point[1] - 73],
					point[2]
				], [
					point2,
					[point2[0] - 30, point2[1] - 50],
					[point2[0] - 70, point2[1] - 75],
					[point2[0] - 90, point2[1] - 73],
					point2[2]
				], [
					point3,
					[point3[0] - 30, point3[1] - 50],
					[point3[0] - 50, point3[1] - 75],
					[point3[0] - 70, point3[1] - 73],
					point3[2]
				],[
					point4,
					[point4[0] + 30, point4[1] - 50],
					[point4[0] + 70, point4[1] - 75],
					[point4[0] + 90, point4[1] - 73],
					point4[2]
				],
			]
			sub.forEach( s => this.subBranches.push(this.makePoints(s, s[4])))
			let i = this.subBranches.length
			Promise.all( this.subBranches.map(i => this.animateDraw(i)) )
				.then(_=> {
					this.cancelAnimate()
					resolve()
				})
		})
	}

	draw (p) {
		this.ctx.save()
		this.ctx.beginPath()
		this.ctx.arc(p[0], p[1], p[2], 0, 2 * Math.PI)
		this.ctx.fillStyle = 'rgb(119, 70, 37)';
		this.ctx.fill()
		this.ctx.closePath()
		this.ctx.restore()
	}
	animateDraw (branches) {
		return new Promise( resolve => {
			let idx = 0 ;
			const fn = () => {
				if( idx >= branches.length ) {
					resolve()
					return
				}
				this.draw(branches[idx])
				idx ++ ;
				this.animate(fn)
			}
			fn()
		})
	}

	print() {
		this.branches.forEach( s => this.draw(s))
		this.subBranches.forEach( s => s.forEach( j => this.draw(j) ))
	}
}

class Leaf extends BaseShape {
	constructor(c, w, h, dpr) {
		super(c, w, h,dpr);
	}

	init () {
		this.ctx.save()
		this.ctx.beginPath()
		this.ctx.rect(20, this.center.y - 50 * this.dpr , this.screenWidth - 40 ,  50 * this.dpr * 2  )
		this.ctx.strokeStyle = 'red'
		this.ctx.stroke()
		this.ctx.closePath()
		this.ctx.restore()

		this.ctx.save()
		this.moveToCenter()
		this.ctx.beginPath();
		this.ctx.lineWidth = 2
		for (let i = 1; i < 90; i += 0.1) {
			const rad = i / Math.PI
			const x = 20 * Math.pow(Math.sin(rad), 3)
			const y = 13 * Math.cos(rad) - 5 * Math.cos(2 * rad) - 2 * Math.cos(3 * rad) - Math.cos(4 * rad);
			this.ctx.lineTo(x * 4 * this.dpr, -y * 4  * this.dpr)
		}
		this.ctx.fillStyle = 'red'
		this.ctx.stroke();
		this.ctx.closePath();
		this.ctx.restore()
	}
}
