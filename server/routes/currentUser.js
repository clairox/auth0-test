const router = require('express').Router()
const axios = require('axios')

const auth0ApiDomain = process.env.AUTH0_API_DOMAIN + '/users/'
const authorizationHeader = 'Bearer ' + process.env.AUTH0_MGMT_API_TOKEN

router.patch('/password', function (req, res) {
	const { sub } = req.auth.payload // user id
	const { newPassword } = req.body

	const url = auth0ApiDomain + sub
	const data = { password: newPassword }
	const config = {
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json',
			Authorization: authorizationHeader,
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

module.exports = router
