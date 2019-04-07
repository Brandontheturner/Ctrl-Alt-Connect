import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
import { Provider } from 'react-redux'
import jwt_decode from 'jwt-decode'
import setAuthToken from './utils/setAuthToken'
import { setCurrentUser } from './actions/authActions'
import store from './store'

// Look for login token in localStorage
if (localStorage.jwtToken) {
  // Set auth header using setAuthToken action
  setAuthToken(localStorage.jwtToken)
  // Decode user data
  const userData = jwt_decode(localStorage.jwtToken)
  // Set current user
  store.dispatch(setCurrentUser(userData))
}

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
