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
	canvas = null
	ctx = null
	screenWidth = null
	screenHeight = null
	center = {x: 0, y: 0}

	text = null
	heart = null

	constructor(c, w, h) {
		super(c, w, h)
		this.text = new Text(c, w, h)
		this.heart = new Heart(c, w, h)
		this.init()
	}

	init() {
	}
}

class Heart extends BaseShape {
	animateId = 0;
	animaScale = 1
	animaScaleRate = 0.02
	scale = 2 ;
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
		this.clearScreen()
		this.draw()
		this.animate(() => this.init())
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
			this.ctx.lineTo(x * this.animaScale * this.scale , -y * this.animaScale * this.scale)
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

	init () {
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
