import { version } from '../../../package.json'
import { Router } from 'express'

import items from './items'

export default (db) => {
	let api = Router()

	api.use('/items', items())

	api.get('/', (req, res) => {
		res.json({ version })
	})

	return api
}
