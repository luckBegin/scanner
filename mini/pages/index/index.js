import {Tree} from '../../utils/tree'
let canvas , ctx
Page({
	data: {
		windowWidth: 0,
		windowHeight: 0
	},
	onLoad() {
	},
	onReady() {
		const that = this;
		const query = wx.createSelectorQuery()
		const {windowWidth, windowHeight} = wx.getSystemInfoSync()
		this.setData({ windowWidth , windowHeight})
		query.select('#canvas')
			.fields({node: true, size: true})
			.exec((res) => {
				canvas = res[0].node
				ctx = canvas.getContext('2d')
				const dpr = wx.getSystemInfoSync().pixelRatio
				canvas.width = res[0].width * dpr
				canvas.height = res[0].height * dpr
				ctx.scale(dpr, dpr)
				const tree = new Tree(res[0].node,windowWidth,windowHeight)
				// ctx = canvas.getContext('2d')
				// const dpr = wx.getSystemInfoSync().pixelRatio
				// canvas.width = res[0].width * dpr
				// canvas.height = res[0].height * dpr
				// ctx.scale(dpr, dpr)
				//
				// const point = this.data.center
				// ctx.translate(point.x, point.y);
				// this.init()
			})
	},
	init() {
		// if (this.data.scale <= 0.5) {
		// 	this.setData({mark: 1})
		// }
		// if (this.data.scale >= 1.5) {
		// 	this.setData({mark: -1})
		// }
		this.setData({scale: this.data.scale + 0.03 * this.data.mark})
		this.drawHeart()
		// this.drawText()
		// this.drawHeart()
		// const init = canvas.requestAnimationFrame(this.init)
		// this.setData({ init })
	},
	drawHeart() {
		ctx.save()
		ctx.beginPath();
		ctx.lineWidth = 2
		for (let i = 1; i < 90; i += 0.1) {
			const rad = i / Math.PI
			const x = 20 * Math.pow(Math.sin(rad), 3)
			const y = 13 * Math.cos(rad) - 5 * Math.cos(2 * rad) - 2 * Math.cos(3 * rad) - Math.cos(4 * rad);
			ctx.lineTo(x * this.data.scale, -y * this.data.scale)
		}
		ctx.fillStyle = 'red'
		ctx.fill();
		ctx.closePath();
		ctx.restore();
	},
	drawText() {
		ctx.save();
		ctx.beginPath()
		ctx.strokeStyle = '#f00';
		ctx.fillStyle = '#f00';
		ctx.moveTo(0, 0);
		ctx.lineTo(15, 15);
		ctx.lineTo(60, 15);
		ctx.stroke();
		ctx.scale(0.75, 0.75);
		ctx.fontSize = 13
		ctx.fillText("Come", 40, 10);
		ctx.closePath()
		ctx.restore();
	},
	clearScreen() {
		ctx.clearRect(0, 0, this.data.screen_width, this.data.screen_height)
	},
	canvasClick() {
		const id = this.data.init;
		if (id) canvas.cancelAnimationFrame(id)
		this.drawSeed()
	},
	drawSeed() {
		this.clearScreen()
		ctx.save()
		ctx.beginPath()
		ctx.fillStyle = 'red'
		ctx.fillStyle = 'rgb(35, 31, 32)';
		ctx.shadowColor = 'rgb(35, 31, 32)';
		ctx.shadowBlur = 2;
		ctx.arc(0, this.data.bottom, 5, 0, 2 * Math.PI)
		ctx.stroke()
		ctx.closePath()
		ctx.restore()

		this.setData({bottom: this.data.bottom + 1})
		canvas.requestAnimationFrame(this.drawSeed)
	}
})
