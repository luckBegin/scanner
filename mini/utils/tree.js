export class BaseShape {
	canvas = null ;
	ctx = null
	screenWidth = null
	screenHeight = null
	center = { x: 0 , y: 0 }
	constructor(canvas , screenWidth , screenHeight) {
		this.canvas = canvas
		this.ctx = canvas.getContext('2d') ;
		this.screenWidth = screenWidth
		this.screenHeight = screenHeight ;
		this.center = { x: this.screenWidth / 2 , y: this.screenHeight / 2 }
	}

	clearScreen () {
		this.ctx.clearRect(0,0,this.screenWidth , this.screenHeight)
	}

	moveToCenter () {
		this.ctx.translate(this.center.x,this.center.y)
	}
}
export class Tree extends BaseShape{
	canvas= null
	ctx = null
	screenWidth = null
	screenHeight = null
	center = { x: 0 , y: 0 }

	text = null
	heart = null
	constructor(c, w,h) {
		super(c,w,h)
		this.text = new Text(c,w,h)
		this.heart = new Heart(c,w,h)
		this.init()
	}

	init() {
	}
}

class Heart extends BaseShape {
	constructor(c,w,h) {
		super(c,w,h);
		this.init()
	}

	init () {
		this.ctx.save()
		this.moveToCenter()
		this.ctx.beginPath();
		this.ctx.lineWidth = 2
		for (let i = 1; i < 90; i += 0.1) {
			const rad = i / Math.PI
			const x = 20 * Math.pow(Math.sin(rad), 3)
			const y = 13 * Math.cos(rad) - 5 * Math.cos(2 * rad) - 2 * Math.cos(3 * rad) - Math.cos(4 * rad);
			this.ctx.lineTo(x, -y)
		}
		this.ctx.fillStyle = 'red'
		this.ctx.fill();
		this.ctx.closePath();
		this.ctx.restore();
	}
}
class Text extends BaseShape{
	constructor(c,w,h) {
		super(c,w,h);
	}
}
