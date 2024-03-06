import { useEffect } from 'react'
import './App.css'
import { useAuth0 } from '@auth0/auth0-react'

function App() {
	const { user, isLoading, isAuthenticated, loginWithRedirect, logout, getAccessTokenSilently } =
		useAuth0()

	useEffect(() => {
		console.log('user:', user?.nickname || 'none')
	}, [user, getAccessTokenSilently])

	useEffect(() => {
		const getAuthorized = async () => {
			try {
				const accessToken = await getAccessTokenSilently({
					authorizationParams: {
						audience: 'http://127.0.0.1:8080/',
					},
				})

				const response = await fetch('http://127.0.0.1:8080/authorized', {
					headers: {
						Authorization: `Bearer ${accessToken}`,
					},
				})

				const data = await response.json()
				console.log(data.message)
			} catch (err) {
				console.log(err.message)
			}
		}

		getAuthorized()
	}, [isAuthenticated])

	if (isLoading) {
		return <div>Loading...</div>
	}

	if (isAuthenticated && user) {
		return (
			<div>
				<p>Logged in as {user.nickname}</p>
				<button onClick={() => logout()}>Logout</button>
			</div>
		)
	}

	return <button onClick={() => loginWithRedirect()}>Login</button>
}

export default App