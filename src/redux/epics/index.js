import { ofType } from 'redux-observable'
import { debounceTime, filter, map, tap, of, switchMap, catchError, retry } from 'rxjs'
import { ajax } from 'rxjs/ajax'
import * as actionType from '../actions/actionType'
import * as actions from '../actions/actionCreator'


export const changeSearchEpic = actions$ => actions$.pipe(
  ofType(actionType.CHANGE_SEARCH_QUERY),
  map(o => o.payload.trim()),
  filter(o => o !== ''),
  debounceTime(100),
  map(o => actions.sendSearchRequest(o))
);

export const sendSearchRequest = actions$ => actions$.pipe(
  ofType(actionType.SEND_SEARCH_REQUEST),
  map(o => o.payload),
  map(o => new URLSearchParams({q: o})),
  switchMap(o => ajax.getJSON(`${import.meta.env.VITE_SEARCH_URL}?${o}`).pipe(
    retry(3),
    map(o => actions.getRequestSuccess(o)),
    catchError(o => of(actions.getRequestFailure(o)))
  ))
)