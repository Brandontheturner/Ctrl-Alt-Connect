import { GET_PROFILE, PROFILE_LOADING, CLEAR_CURRENT_PROFILE } from './types'
import db from '../api/db'

export const getCurrentProfile = () => dispatch => {
  dispatch(setProfileLoding())
  db.get('/api/profile')
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

export const clearCurrentProfile = () => ({
  type: CLEAR_CURRENT_PROFILE
})

export const setProfileLoding = () => ({
  type: PROFILE_LOADING
})
