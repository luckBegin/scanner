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

	constructor(canvas, screenWidth, screenHeight) {
		this.canvas = canvas
		this.ctx = canvas.getContext('2d');
		this.screenWidth = screenWidth
		this.screenHeight = screenHeight;
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

	constructor(c, w, h) {
		super(c, w, h)
		this.text = new Text(c, w, h)
		this.heart = new Heart(c, w, h)
		this.seed = new Seed(c, w, h)
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
			this.drawBranch(h)
		})
	}

	drawBranch(h) {
		const point = []
		const start = [this.center.x, this.center.y * 2 - h - 7]
		const end = [this.center.x - 20, this.center.y]
		const delta = [this.center.x, this.center.y + 200]
		const delta2 = [this.center.x, this.center.y]

		let radius = 10
		for (let i = 0; i < 100; i++) {
			point.push(threeBezier(i / 100, start, delta, delta2, end))
		}
		let idx = 0;
		const draw = () => {
			if (idx >= point.length) {
				this.cancelAnimate()
				this.drawSubBranch(point)
				return
			}
			const p = point[idx]
			this.ctx.save()
			this.ctx.beginPath()
			radius *= 0.98
			p.push(radius);
			this.ctx.arc(p[0], p[1], radius, 0, 2 * Math.PI)
			this.ctx.fillStyle = 'rgb(119, 70, 37)';
			this.ctx.fill()
			this.ctx.closePath()
			this.ctx.restore()
			idx++
			this.animate(draw)
		}
		this.animate(draw)
	}

	drawSubBranch(points) {
		const point = points[points.length - 30]
		const sub = [
			[
				point,
				[point[0] - 100, point[1] - 50],
				[point[0] - 30, point[1] - 50],
				[point[0] - 90, point[1] - 55]
			]
		]

		sub.forEach()
		let radius = 3
		for (let i = 0; i < 100; i++) {
			point.push(threeBezier(i / 100, point, delta, delta2, tarPoint))
		}
		let idx = 0;
		const draw = () => {
			if (idx >= point.length) {
				this.cancelAnimate()
				return
			}
			const p = point[idx]
			this.ctx.save()
			this.ctx.beginPath()
			radius *= 0.98
			this.ctx.arc(p[0], p[1], radius, 0, 2 * Math.PI)
			this.ctx.fillStyle = 'rgb(119, 70, 37)';
			this.ctx.fill()
			this.ctx.closePath()
			this.ctx.restore()
			idx++
			this.animate(draw)
		}
		draw()
	}
}

class Heart extends BaseShape {
	animaScale = 1
	animaScaleRate = 0.03
	scale = 1.5;
	mark = 1

	constructor(c, w, h) {
		super(c, w, h);
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
			this.ctx.lineTo(x * this.animaScale * this.scale, -y * this.animaScale * this.scale)
		}
		this.ctx.fillStyle = 'red'
		this.ctx.fill();
		this.ctx.closePath();
		this.ctx.restore()
	}
}

class Text extends BaseShape {
	constructor(c, w, h) {
		super(c, w, h);
		this.init()
	}

	init() {
		this.ctx.save();
		this.moveToCenter()
		this.ctx.beginPath()
		this.ctx.strokeStyle = '#f00';
		this.ctx.fillStyle = '#f00';
		this.ctx.moveTo(0, 0);
		this.ctx.lineTo(15, 15);
		this.ctx.lineTo(60, 15);
		this.ctx.stroke();
		this.ctx.scale(0.75, 0.75);
		this.ctx.fontSize = 13
		this.ctx.fillText("Come", 40, 10);
		this.ctx.closePath()
		this.ctx.restore();
	}
}

class Seed extends BaseShape {
	bottom = 20;
	height = 0
	landBottom = 0
	seedSpeed = 2
	percent = 0
	landSize = 0
	landSpacing = 20

	constructor(c, w, h) {
		super(c, w, h);
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
		this.ctx.arc(0, this.height, 9, 0, 2 * Math.PI)
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
			this.ctx.lineWidth = 14
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
}
