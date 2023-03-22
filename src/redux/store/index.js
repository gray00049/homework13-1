import { combineReducers, legacy_createStore, compose, applyMiddleware } from 'redux'
import { combineEpics, createEpicMiddleware } from 'redux-observable'
import { changeSearchEpic, sendSearchRequest } from '../epics'
import searchInputReduser from '../reducers/searchInputReducer'

const reducer = combineReducers({
  search: searchInputReduser
});

const rootEpic = combineEpics(
  changeSearchEpic,
  sendSearchRequest
);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const epicMiddleware = createEpicMiddleware();

const store = legacy_createStore(
  reducer,
  composeEnhancers(
    applyMiddleware(epicMiddleware)
  )
)

epicMiddleware.run(rootEpic);

export default store;