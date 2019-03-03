import Items from '../../../mongoose/models/Item'

const Query = `
 extend type Query {
   getItems: [Item]
   getPaintable: [Item]
 }
`

export const queryTypes = () => [Query]

export const queryResolvers = {
	Query: {
		getItems: () => Items.find(),
		getPaintable: () => Items.find({ paintable: true }).sort({ name: 1 })
	}
}
