const express = require('express')
const cors = require('cors')
const app = express()
const { auth } = require('express-oauth2-jwt-bearer')

const port = 8080
const baseURL = 'http://127.0.0.1'

const jwtCheck = auth({
	audience: `${baseURL}:${port}/`,
	issuerBaseURL: 'https://dev-ze6km2c7fqtpnwsy.us.auth0.com/',
	tokenSigningAlg: 'RS256',
})

const corsOptions = {
	origin: `${baseURL}:5173`,
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

app.listen(port)

console.log('Running on port ', port)
