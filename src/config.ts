export const CONFIG = {
	swagger: {
		enabled: true,
		path: 'swagger',
	},
	dataBases: {
		type: 'mysql',
		host: 'localhost',
		port: 3306,
		username: 'root',
		password:'',
		database: 'scanner',
		entities: [
			'dist/**/*.entity.js',
		],
		synchronize: false,
		logging: false,
	},
	port: 3000
};
