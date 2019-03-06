import { Router } from 'express'
import Item from '../mongoose/models/Item'
import fs from 'fs'
import path from 'path'

export default () => {
	let api = Router()

	api.get('/', (req, res) => {
		Item.find()
			.sort({ name: 1 })
			.lean()
			.exec(function(err, docs) {
				res.json(docs)
			})
	})

	api.get('/paintable/:value', (req, res) => {
		if (['true', 'false'].includes(req.params.value)) {
			Item.find({ paintable: req.params.value })
				.sort({ name: 1 })
				.lean()
				.exec(function(err, docs) {
					res.json(docs)
				})
		} else {
			res.sendStatus(400)
		}
	})

	api.get('/paints/:value', (req, res) => {
		if (
			[
				'black',
				'cobalt',
				'crimson',
				'fgreen',
				'grey',
				'lime',
				'orange',
				'pink',
				'purple',
				'saffron',
				'sblue',
				'sienna',
				'white'
			].includes(req.params.value)
		) {
			Item.find({ paints: req.params.value })
				.sort({ name: 1 })
				.lean()
				.exec(function(err, docs) {
					res.json(docs)
				})
		} else {
			res.sendStatus(400)
		}
	})

	api.get('/rarity/:value', (req, res) => {
		if (
			[
				'common',
				'uncommon',
				'rare',
				'very rare',
				'import',
				'exotic',
				'black market',
				'limited'
			].includes(req.params.value)
		) {
			Item.find({ rarity: req.params.value })
				.sort({ name: 1 })
				.lean()
				.exec(function(err, docs) {
					res.json(docs)
				})
		} else {
			res.sendStatus(400)
		}
	})

	api.get('/crate/:value', (req, res) => {
		if (
			[
				'Champions Crate 1',
				'Champions Crate 2',
				'Champions Crate 4',
				'Champions Crate 3',
				'Players Choice Crate',
				'Overdrive Crate',
				'Accelerator Crate',
				'Nitro Crate',
				'Haunted Hallows Crate',
				'Velocity Crate',
				'Secret Santa Crate',
				'Victory Crate',
				'Turbo Crate',
				'Spring Fever Crate',
				'Impact Crate',
				'Zephyr Crate',
				'Golden Egg',
				'Elevation Crate',
				'Golden Gift',
				'Golden Pumpkin',
				'RL Beach Blast Crate',
				'Ferocity Crate',
				'Triumph Crate'
			].includes(req.params.value)
		) {
			Item.find({ crate: req.params.value })
				.sort({ name: 1 })
				.lean()
				.exec(function(err, docs) {
					res.json(docs)
				})
		} else {
			res.sendStatus(400)
		}
	})

	api.get('/name/:value', (req, res) => {
		Item.findOne({ name: req.params.value })
			.lean()
			.exec(function(err, docs) {
				res.json(docs)
			})
	})

	api.get('/url/:value', (req, res) => {
		Item.findOne({ url: req.params.value })
			.lean()
			.exec(function(err, docs) {
				res.json(docs)
			})
	})

	api.get('/image/:size/:url.jpg', (req, res) => {
		if (['large', 'small'].includes(req.params.size)) {
			Item.findOne({ url: req.params.value })
				.lean()
				.exec(function(err, docs) {
					fs.readFile(
						path.resolve(`images/${req.params.size}/${req.params.url}.jpg`),
						(err, data) => {
							if (err) {
								console.log(err)
								res.sendStatus(500)
							} else {
								//res.type('image/jpg')
								res.end(data)
							}
						}
					)
				})
		} else {
			res.sendStatus(400)
		}
	})

	return api
}
