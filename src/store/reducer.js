import {
  POST_ADMIN_DATA,
  POST_ADMIN_TOKEN,
  LOGOUT_ADMIN,
  NEW_RIDE,
  NEW_SUPPORT
} from "./action";

const myDefaultStore = {
  left: false,
  admin: {}
};

const reducer = (state = myDefaultStore, action) => {
  if (action.type === POST_ADMIN_DATA) {
    return {
      ...state,
      admin: action.data
    };
  } else if (action.type === POST_ADMIN_TOKEN) {
    return {
      ...state,
      token: action.data
    };
  } else if (action.type === LOGOUT_ADMIN) {
    return {
      ...state,
      admin: {}
    };
  }
  return state;
};

export default reducer;
