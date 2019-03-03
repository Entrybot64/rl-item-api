import express from 'express'
import cors from 'cors'
import fs from 'fs'

import dotenv from 'dotenv'

//	Generate .env file if it doesn't exist
if (!fs.existsSync(`.env`)) {
	console.log('File .env not found, generating from example')
	fs.copyFileSync(`.env.example`, `.env`)
}

dotenv.config()
const app = express()

/**
 * Define port for the API server to listen
 * @param {number} port
 */
let setPort = (port = process.env.PORT) => {
	app.set('port', parseInt(port, 10))
}

/**
 *	Make the server listen on defined port
 *	or port in .env
 */
let listen = () => {
	const port = app.get('port') || process.env.PORT
	app.listen(port, () => {
		console.log(`Listening on http://${process.env.DOMAIN}:${process.env.PORT}`)
	})
}

//	Allow API to respond to only the APP domain
app.use(
	cors({
		origin: process.env.CORS_DOMAIN,
		optionsSuccessStatus: 200
	})
)

//	Healthcheck
app.get('/status', (req, res) => {
	res.send({ status: 'ok' })
})

export default {
	getApp: () => app,
	setPort,
	listen
}
