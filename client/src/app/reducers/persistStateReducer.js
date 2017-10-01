import { PERSIST_STATE, USER_LOGGED_OUT } from '../actions/type';


const INITIAL_STATE = {
  
};

/**
 *
 * @export
 * @param {any} [state=[]]
 * @param {any} action
 * @returns
 */
export default function persistReducer(state = [], action) {
  switch (action.type) {
    case PERSIST_STATE:
      return {
        ...state,
        persistedState: action.payload
      };
    default:
      return state;
  }
}
