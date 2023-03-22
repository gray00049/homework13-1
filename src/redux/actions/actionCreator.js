import { CHANGE_SEARCH_QUERY, SEND_SEARCH_REQUEST, GET_REQUEST_SUCCESS, GET_REQUEST_FAILURE } from "./actionType";

export const changeSearchQuery = (query) => {
    return {type: CHANGE_SEARCH_QUERY, payload: query}
}

export const sendSearchRequest = (query) => {
  return {type: SEND_SEARCH_REQUEST, payload: query}
}

export const getRequestSuccess = (data) => {
  return {type: GET_REQUEST_SUCCESS, payload: data}
}

export const getRequestFailure = (error) => {
  return {type: GET_REQUEST_FAILURE, payload: error}
}