import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Auth0Provider } from '@auth0/auth0-react'

ReactDOM.createRoot(document.getElementById('root')).render(
	<Auth0Provider
		domain="dev-ze6km2c7fqtpnwsy.us.auth0.com"
		clientId="Wgfh3njxufmUaW9coCCbtV4vU9ycRWUs"
		useRefreshTokens
		cacheLocation="localstorage"
		authorizationParams={{
			redirect_uri: window.location.origin,
			audience: 'http://127.0.0.1:8080/',
		}}
	>
		<React.StrictMode>
			<App />
		</React.StrictMode>
	</Auth0Provider>
)
