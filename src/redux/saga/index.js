import { put, spawn, debounce, take, takeLatest, retry } from "@redux-saga/core/effects"
import { CHANGE_SEARCH_QUERY, SEND_SEARCH_REQUEST } from "../actions/actionType"
import { sendSearchRequest, getRequestSuccess, getRequestFailure } from "../actions/actionCreator"

// Change Search Query
function filterChangeSearchAction({type, payload}) {
  return type == CHANGE_SEARCH_QUERY && payload.trim() != ''
}

function* handleChangeSearchSaga(action) {
  yield put(sendSearchRequest(action.payload))
}

function* watchChangeSearchSaga() {
  yield debounce(100, filterChangeSearchAction, handleChangeSearchSaga)
}

// Send Search Query
const searchSkill = async (query) => {
  const param = new URLSearchParams({q: query});
  const response = await fetch(`${import.meta.env.VITE_SEARCH_URL}?${param}`);
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return await response.json();
}

function* handleSendSearchRequestSaga(action) {
  try {
    const data = yield retry(3, 1000, searchSkill, action.payload);
    yield put(getRequestSuccess(data));
  } catch (e) {
    put(getRequestFailure(e))
  }
}

function* watchSendSearchRequestSaga() {
  yield takeLatest(SEND_SEARCH_REQUEST, handleSendSearchRequestSaga)
}

export default function* rootSaga() {
  yield spawn(watchChangeSearchSaga);
  yield spawn(watchSendSearchRequestSaga);
}