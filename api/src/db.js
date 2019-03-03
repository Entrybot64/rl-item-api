import mongoose from 'mongoose'

//	Return a connection function that returns a Promise
export default () =>
	mongoose.connect(
		`${process.env.DB_URL}/${process.env.DB_NAME}`,
		{ useNewUrlParser: true }
	)
