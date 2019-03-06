import mongoose from 'mongoose'
import dlog from '../../utils/dlog'

/**
 * Seeds DB for model with seed file
 * @param {mongoose.Model} _schema
 * @param {[*]} seed
 */
const seed = (_schema, seed) => {
	_schema.find((err, res) => {
		if (err) {
			dlog(err)
		}

		if (res.length < 1) {
			dlog(
				`Seeding ${
					_schema.collection.name
				} as the collection was empty.`
			)
			_schema.insertMany(seed, (err, res) => {
				if (err) {
					dlog(err)
				}
			})
		}
	})
}

export default seed
