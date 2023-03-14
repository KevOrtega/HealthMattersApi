import { connect } from "mongoose";

(async () => {
	try {
		const db = await connect('mongodb+srv://healthmatters:healthmatters@healthmatters.rabrrsd.mongodb.net/healthmatters');
		console.log(`db connected to ${db.connection.name}`);
	} catch (err) {
		console.error(err);
	}
})();
