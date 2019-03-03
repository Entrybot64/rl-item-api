import mongoose from 'mongoose'

let item = mongoose.Schema({
	_id: String,
	name: String,
	url: String,
	type: String,
	rarity: String,
	paintable: Boolean,
	crate: [String],
	paints: [String]
})

export default mongoose.model('Items', item)
