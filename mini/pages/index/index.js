var  wxDraw= require("../../utils/wxdraw.min.js").wxDraw;
var Shape = require("../../utils/wxdraw.min.js").Shape;

let canvas;
let ctx ;
Page({
	data: {
		screen_width:0,
		screen_height:0,
		center : { x: 0, y: 0 },
		scale: 1,
		mark: 1
	},
	onLoad() {
		const that = this
		wx.getSystemInfo({
			success: function (res) {
				that.setData({
					model: res.model,
					screen_width: res.windowWidth,
					screen_height: res.windowHeight,
					center: {
						x: res.windowWidth / 2,
						y: res.windowHeight / 2
					}
				})
			}
		})
	},
	onReady() {
		const that = this ;
		const query = wx.createSelectorQuery()
		query.select('#canvas')
			.fields({node: true, size: true})
			.exec((res) => {
				canvas = res[0].node
				ctx = canvas.getContext('2d')
				const dpr = wx.getSystemInfoSync().pixelRatio
				canvas.width = res[0].width * dpr
				canvas.height = res[0].height * dpr
				ctx.scale(dpr, dpr)
				this.init()
			})
	},
	init () {
		if( this.data.scale <= 0.5) {
			this.setData({mark : 1 })
		}
		if( this.data.scale >= 1.5 ) {
			this.setData({mark : -1 })
		}
		this.setData({ scale: this.data.scale + 0.03 * this.data.mark})
		this.drawHeart()
		this.drawText()
		canvas.requestAnimationFrame(this.init)
	},
	drawHeart() {
		ctx.clearRect(0,0,this.data.screen_width , this.data.screen_height)
		ctx.save()
		ctx.translate(this.data.screen_width / 2,this.data.screen_height / 2)
		ctx.beginPath();
		ctx.lineWidth = 2
		for( let i = 1 ; i < 90 ; i+= 0.1 ) {
			const rad = i / Math.PI
			const x = 20 * Math.pow(Math.sin(rad),3)
			const y = 13 * Math.cos(rad) - 5 * Math.cos(2*rad) - 2 * Math.cos(3*rad) - Math.cos(4*rad) ;
			ctx.lineTo(x * this.data.scale ,-y * this.data.scale )
		}
		ctx.fillStyle = 'red'
		ctx.fill();
		ctx.closePath();
		ctx.restore();
	},
	drawText () {
		const point = this.data.center
		ctx.save();
		ctx.strokeStyle = '#f00';
		ctx.fillStyle = '#f00';
		ctx.translate(point.x, point.y);
		ctx.moveTo(0, 0);
		ctx.lineTo(15, 15);
		ctx.lineTo(60, 15);
		ctx.stroke();

		ctx.moveTo(0, 0);
		ctx.scale(0.75, 0.75);
		ctx.fontSize = 13
		ctx.fillText("Come", 40, 10);
		ctx.restore();
	},
	canvasClick () {
	}
})
