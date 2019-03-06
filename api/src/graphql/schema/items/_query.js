import Items from '../../../mongoose/models/Item'
import Mongoose from 'mongoose'

const Query = `
 extend type Query {
   Items(name: String, rarity: String, type: String, paints: [String], crate: [String], paintable: Boolean, sort: [OrderObject], limit: Int): [Item]
   getPaintable: [Item]
 }
`

export const queryTypes = () => [Query]

export const queryResolvers = {
	Query: {
		Items: (id, input) => {
			let sort = false
			let sortObject = {}
			let limit = 0

			if ('paints' in input) {
				input.paints = { $in: input.paints }
			}

			if ('crate' in input) {
				input.crate = { $in: input.crate }
			}

			if ('sort' in input) {
				sort = true

				input.sort.map((value) => {
					if ([1, -1].includes(value.direction)) {
						sortObject[value.field] = value.direction
					} else {
						throw new Error('The sort direction must be an instance of 1 or -1.')
					}
				})

				delete input.sort
			}

			if ('limit' in input) {
				if (input.limit > 0) {
					limit = input.limit
				} else {
					throw new Error('The limit value must be positive.')
				}

				delete input.limit
			}

			let query = Items.find(input)

			if (sort) {
				query.sort(sortObject)
			}

			if (limit !== false) {
				query.limit(limit)
			}

			return query
		}
	}
}
