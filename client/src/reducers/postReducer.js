import {
  CREATE_POST,
  GET_POSTS,
  GET_POST,
  GET_USERS_POSTS,
  POST_LOADING,
  DELETE_POST
} from '../actions/types'

const initialState = {
  posts: [],
  post: {},
  loading: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case POST_LOADING:
      return { ...state, loading: true }
    case CREATE_POST:
      return { ...state, posts: [action.payload, ...state.posts] }
    case GET_POSTS:
      return { ...state, posts: action.payload, loading: false }
    case GET_POST:
      return { ...state, post: action.payload, loading: false }
    case GET_USERS_POSTS:
      return { ...state, posts: action.payload, loading: false }
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter(post => post._id !== action.payload)
      }
    default:
      return state
  }
}
