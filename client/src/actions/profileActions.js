import {
  GET_PROFILE,
  PROFILE_LOADING,
  CLEAR_CURRENT_PROFILE,
  GET_ERRORS
} from './types'
import db from '../api/db'
import history from '../history'

export const getCurrentProfile = () => dispatch => {
  dispatch(setProfileLoding())
  db.get('/profile')
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    ) // empty profile
    .catch(err =>
      dispatch({
        type: GET_PROFILE,
        payload: {}
      })
    )
}

export const createProfile = profileData => dispatch => {
  db.post('/profile', profileData)
    .then(res => history.push('/dashboard'))
    .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }))
}

export const clearCurrentProfile = () => ({
  type: CLEAR_CURRENT_PROFILE
})

export const setProfileLoding = () => ({
  type: PROFILE_LOADING
})
