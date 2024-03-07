const express = require('express')
const cors = require('cors')
const app = express()
const { auth } = require('express-oauth2-jwt-bearer')
const axios = require('axios')

require('dotenv').config()

const port = process.env.PORT || 8080
const auth0Domain = process.env.AUTH0_DOMAIN
const auth0ApiDomain = process.env.AUTH0_API_DOMAIN

const jwtCheck = auth({
	audience: `${process.env.BASE_URL}:${port}/`,
	issuerBaseURL: auth0Domain,
	tokenSigningAlg: 'RS256',
})

const corsOptions = {
	origin: process.env.CLIENT_URL,
}

app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// enforce on all endpoints
app.use(jwtCheck)

app.get('/authorized', function (req, res) {
	const { sub: uid } = req.auth.payload
	res.json({ uid })
})

app.patch('/current_user/password', async function (req, res) {
	const { sub } = req.auth.payload
	const { newPassword } = req.body

	const url = auth0ApiDomain + '/users/' + sub
	const data = { password: newPassword }
	const config = {
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json',
			Authorization: 'Bearer ' + process.env.AUTH0_MGMT_API_TOKEN,
		},
	}

	axios
		.patch(url, data, config)
		.then(response => {
			return res.json(response.data)
		})
		.catch(err => {
			const { statusCode } = err.response.data
			return res.status(statusCode).json(err.response.data)
		})
})

app.listen(port)

console.log('Running on port ', port)
