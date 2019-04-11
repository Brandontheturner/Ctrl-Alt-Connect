import db from '../api/db'
import { CREATE_POST, GET_POSTS, GET_ERRORS, POST_LOADING } from './types'

export const createPost = postData => dispatch => {
  db.post('/posts', postData)
    .then(res => dispatch({ type: CREATE_POST, payload: res.data }))
    .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }))
}

export const getPosts = postData => dispatch => {
  dispatch(setPostLoading())
  db.get('/posts')
    .then(res => dispatch({ type: GET_POSTS, payload: res.data }))
    .catch(err => dispatch({ type: GET_POSTS, payload: null }))
}

export const setPostLoading = () => ({ type: POST_LOADING })
