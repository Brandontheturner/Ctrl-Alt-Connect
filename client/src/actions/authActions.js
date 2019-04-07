import { GET_ERRORS } from './types'
import history from '../history'
import db from '../api/db'

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
