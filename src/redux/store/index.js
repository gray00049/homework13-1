import { combineReducers, legacy_createStore, compose, applyMiddleware } from 'redux'
import createSagaMiddleware from "redux-saga"
import rootSaga from '../saga'
import searchInputReduser from '../reducers/searchInputReducer'

const reducer = combineReducers({
  search: searchInputReduser
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const sagaMiddleware = createSagaMiddleware();

const store = legacy_createStore(
  reducer,
  composeEnhancers(
    applyMiddleware(sagaMiddleware)
  )
)

sagaMiddleware.run(rootSaga);

export default store;