import { GET_ERRORS, SET_CURRENT_USER } from './types'
import history from '../history'
import db from '../api/db'
import jwt_decode from 'jwt-decode'
import setAuthToken from '../utils/setAuthToken'

export const registerUser = userData => dispatch => {
  db.post('/api/users/register', userData)
    .then(res => history.push('/login'))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    )
}

export const setCurrentUser = userData => {
  return {
    type: SET_CURRENT_USER,
    payload: userData
  }
}

export const loginUser = userData => dispatch => {
  db.post('/api/users/login', userData)
    .then(res => {
      // Save token to localStorage
      const { token } = res.data
      localStorage.setItem('jwtToken', token)
      // Set auth header with token
      setAuthToken(token)
      // Decode user data from token using jwt_token
      const userData = jwt_decode(token)
      dispatch(setCurrentUser(userData))
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    )
}

export const logoutUser = () => dispatch => {
  // Remove login toke from localStorage
  localStorage.removeItem('jwtToken')
  // Remove auth header
  setAuthToken(false)
  // Remove current user from redux store
  dispatch(setCurrentUser({}))
}
