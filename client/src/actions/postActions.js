import db from '../api/db'
import {
  CREATE_POST,
  GET_POSTS,
  GET_ERRORS,
  POST_LOADING,
  DELETE_POST,
  GET_POST,
  CLEAR_ERRORS
} from './types'

export const createPost = postData => dispatch => {
  db.post('/posts', postData)
    .then(res => dispatch({ type: CREATE_POST, payload: res.data }))
    .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }))
}

export const getPost = id => dispatch => {
  dispatch(setPostLoading())
  db.get(`/posts/${id}`)
    .then(res => dispatch({ type: GET_POST, payload: res.data }))
    .catch(err => dispatch({ type: GET_POST, payload: null }))
}

export const getPosts = () => dispatch => {
  dispatch(clearErrors())
  dispatch(setPostLoading())
  db.get('/posts')
    .then(res => dispatch({ type: GET_POSTS, payload: res.data }))
    .catch(err => dispatch({ type: GET_POSTS, payload: null }))
}

export const deletePost = id => dispatch => {
  db.delete(`/posts/${id}`)
    .then(res => dispatch({ type: DELETE_POST, payload: id }))
    .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }))
}

export const addLike = id => dispatch => {
  db.post(`/posts/like/${id}`)
    .then(res => dispatch(getPosts()))
    .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }))
}

export const removeLike = id => dispatch => {
  db.post(`/posts/unlike/${id}`)
    .then(res => dispatch(getPosts()))
    .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }))
}

export const addComment = (postId, commentData) => dispatch => {
  dispatch(clearErrors())
  db.post(`/posts/comment/${postId}`, commentData)
    .then(res => dispatch(getPost(postId)))
    .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }))
}

export const deleteComment = (postId, commentId) => dispatch => {
  db.delete(`/posts/comment/${postId}/${commentId}`)
    .then(res => dispatch(getPost(postId)))
    .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }))
}

export const setPostLoading = () => ({ type: POST_LOADING })
export const clearErrors = () => ({ type: CLEAR_ERRORS })
