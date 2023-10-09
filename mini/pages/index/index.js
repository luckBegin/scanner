import {Tree} from '../../utils/tree'
let canvas , ctx
Page({
	data: {
		windowWidth: 0,
		windowHeight: 0,
		eventInvoke: false,
		tree:null
	},
	onLoad() {
	},
	onReady() {
		// const query = wx.createSelectorQuery()
		// const {windowWidth, windowHeight} = wx.getSystemInfoSync()
		// this.setData({ windowWidth , windowHeight})
		// query.select('#canvas')
		// 	.fields({node: true, size: true})
		// 	.exec((res) => {
		// 		canvas = res[0].node
		// 		ctx = canvas.getContext('2d')
		// 		const dpr = wx.getSystemInfoSync().pixelRatio
		// 		canvas.width = res[0].width * dpr
		// 		canvas.height = res[0].height * dpr
		// 		ctx.scale(dpr, dpr)
		// 		const tree = new Tree(res[0].node,windowWidth,windowHeight, dpr)
		// 		this.setData({ tree })
		// 	})
	},
	canvasClick() {
		if( this.data.eventInvoke ) return
		this.setData({eventInvoke: true})
		this.data.tree.die()
	},
})
