const Item = `
	type Item {
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
