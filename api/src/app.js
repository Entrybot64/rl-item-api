import server from './server'
import database from './db'

import Item from './mongoose/models/Item'
import itemSeeds from './mongoose/seeds/Items.json'

import seed from './seed'

import rest from './rest'
import graphql from './graphql'

import decompress from 'decompress'
import decompressUnzip from 'decompress-unzip'
import fs from 'fs'
import path from 'path'

if (!fs.existsSync(path.resolve(`images`))) {
	decompress('images.zip', './', {
		plugins: [decompressUnzip()]
	}).then(() => {
		console.info('Images Decompressed')
	})
}

//	Connect to the database and start the server inside the Promise
database()
	.then((db) => {
		server.listen()

		//	Add the GraphQL API to our server
		graphql(server.getApp(), '/graphql')

		//	Use REST API on specific route
		server.getApp().use('/', rest(db))

		seed(Item, itemSeeds)
	})
	.catch((reason) => {
		//	Close the server on database error
		console.error(reason)
		process.exit(1)
	})

export default server
