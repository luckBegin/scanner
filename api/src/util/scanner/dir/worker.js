const dns = require('dns');
const clc = require("cli-color");
const domain = /-domain=(.*)/gi.exec(process.argv[2])[1]
const id = /-id=(.*)/gi.exec(process.argv[3])[1]
const axios = require('axios');
const http = axios.create();

const update = (type = 0, d = {}) => {
	process.send({
		type,
		data: d.data
	})
}
process.on("message", d => {
	if (d.type === 0) startTask(d)
})

const defaultStatus = [200, 201, 302, 301, 500, 503, 504, 403]
const startTask = async ({data, para}) => {
	const host = `${ para.protocol || 'http'}://${domain}/${data}`
	const defaultMethods = ['get', 'post', "delete", "put"];
	const statusCode = [...defaultStatus]
	const methods = para.methods || ['get', "post"]
	const includeStatus = [...defaultStatus]
	const s = includeStatus.filter( i => statusCode.includes(i))
	const filter = para.filter ? eval(para.filter) : null ;
	const req = async (m) => {
		return new Promise( async (resolve, reject) => {
			try {
				const r = await axios[m](host)
				const {status,headers} = r;
				if( s.includes( status ) ) {
					const result ={
						type: m ,host,
						size: Number(headers['content-length'] / 1024).toFixed(2) + 'k',
						statusCode: status
					}
					if(!filter || filter(r.data)) {
						resolve(result)
					}
				}
			} catch (e) {
				reject({success: false, message: e.message })
			}
		})
	}
	try {
		const result = await Promise.all(methods.map(i => req(i)))
		update(1,{ data: {success: true } })
	} catch (e) {
		update(2, { data: e })
	}
}
update()
