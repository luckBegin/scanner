import axios from 'axios'

const http = axios.create()


process.on('message' , d => {
	console.log(d)
	process.send({ counter: 1 });
})
