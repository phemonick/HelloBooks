import {
  FETCH_BOOKS,
  FETCH_BOOKS_FULFILLED,
  FETCH_BOOKS_REJECTED
} from '../actions/type';


/**
 * *
 *
 * @export
 * @param {boolean} [state={
 *   books: [],
 *   fetching: false,
 *   fetched: false,
 *   error: null
 * }]
 * @param {any} action
 * @returns state
 */
export default function bookReducer(state = {
  books: [],
  fetching: false,
  fetched: false,
  error: null
}, action) {
  switch (action.type) {
    case FETCH_BOOKS:
    {
      return {
        ...state,
        fetching: true
      };
    }
    case FETCH_BOOKS_FULFILLED:
    {
      return {
        ...state,
        fetching: false,
        fetched: true,
        books: action.books
      };
    }
    case FETCH_BOOKS_REJECTED:
    {
      return {
        ...state,
        fetching: false,
        error: action.error.message
      };
    }
    default:
      return state;
  }
}