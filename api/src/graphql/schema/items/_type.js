const Item = `
	type Item {
		_id: String
		name: String!
		url: String
		type: String
		rarity: String
		paintable: Boolean
		crate: [String]
		paints: [String]
	}
`

export const types = () => [Item]

export const typeResolvers = {}
