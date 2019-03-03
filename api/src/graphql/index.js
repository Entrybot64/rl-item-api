import bodyParser from 'body-parser'
import graphqlExpress from 'express-graphql'
import schema from './schema'

export default (app, route) =>
	app.use(
		route,
		bodyParser.json(),
		graphqlExpress({
			schema: schema,
			debug: process.env.NODE_ENV === 'development',
			graphiql: process.env.NODE_ENV === 'development'
		})
	)
