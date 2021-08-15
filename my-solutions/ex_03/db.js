const	mongoose = require('mongoose');

module.exports = {
	connect: DB_HOST => {
		mongoose.set('useNewUrlParser', true);
		mongoose.set('useFindAndModify', false);
		mongoose.set('useCreateIndex', true);
		mongoose.set('useUnifiedTopology', true);
		mongoose.connect(DB_HOST);
		mongoose.connection.on('error', err =>{
			console.log(err);
			console.log(
				'MongoDB connection error. Mongo is running?'
			);
			process.exit();
		});
	},

	close: () => {
		mongoose.connections.close();
	}
};