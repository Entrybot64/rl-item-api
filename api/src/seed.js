import mongoose from 'mongoose'

/**
 * Seeds DB for model with seed file
 * @param {mongoose.Model} _schema
 * @param {[*]} seed
 */
const seed = (_schema, seed) => {
	_schema.find((err, res) => {
		if (err) {
			console.error(err)
		}

		if (res.length < 1) {
			console.log(`Seeding ${_schema.collection.name} as the collection was empty.`)
			_schema.insertMany(seed, (err, res) => {
				if (err) {
					console.error(err)
				}
			})
		}
	})
}

export default seed
