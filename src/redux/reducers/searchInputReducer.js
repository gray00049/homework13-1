import { CHANGE_SEARCH_QUERY, GET_REQUEST_FAILURE, GET_REQUEST_SUCCESS, SEND_SEARCH_REQUEST } from '../actions/actionType'

const initialState = {
  query: '',
  data: [],
  error: '',
  loading: false
}

export default function searchInputReduser(state = initialState, action) {
  switch(action.type) {
    case CHANGE_SEARCH_QUERY:
      const query = action.payload;
      if (query == '') {
        return {...state, query, loading: false, data: []}
      }
      return {...state, query, loading: false}
    case GET_REQUEST_SUCCESS:
      const data = action.payload;
      return {...state, data, error: '', loading: false}
    case GET_REQUEST_FAILURE:
      const error = action.payload;
      return {...state, error, loading: false, data: []}
    case SEND_SEARCH_REQUEST: 
      return {...state, loading: true}
    default:
      return state
  }
}