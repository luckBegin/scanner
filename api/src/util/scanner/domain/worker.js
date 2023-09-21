const dns = require('dns') ;
const clc = require("cli-color");
const domain = /-domain=(.*)/gi.exec(process.argv[2])[1]
const id = /-id=(.*)/gi.exec(process.argv[3])[1]

const update = (type=0,d = {}) => {
	process.send({
		type ,
		message: "" ,
		success: d.success || true ,
		data: d.data
	})
}
process.on("message", d => {
	if( d.type === 0 ) startTask(d)
})
const startTask = ({ data }) => {
	const host = `${data}.${domain}`
	// console.log(`${clc.red('[DOMAIN-DISCOVER]')} - ${clc.green(`[PID-${process.pid}]`)} - ${host}`)
	dns.lookup(host, (err, address, family) => {
		const result = { address: '' ,domain: host, success: true }
		if( err ) {
			result.success = false
			return update(1,{ success: false , data:result })
		}
		result.address = address
		return update(1,{ data:result })
	});
}
update()
