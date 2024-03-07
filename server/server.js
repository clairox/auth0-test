const express = require('express')
const cors = require('cors')
const app = express()
const { auth } = require('express-oauth2-jwt-bearer')
require('dotenv').config()

const port = process.env.PORT || 8080
const auth0Domain = process.env.AUTH0_DOMAIN

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

app.use('/current_user', require('./routes/currentUser'))

app.listen(port)

console.log('Running on port ', port)
