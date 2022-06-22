const SET_USER_CURRENT_AUTH = 'SET_USER_CURRENT_AUTH';
const SET_USER_ALL_LIST = 'SET_USER_ALL_LIST';

const defaultState = {
  currentUser: {},
  isAuth: false,
  listUsers: [],
};

export default function userReducer(state = defaultState, action) {
  switch (action.type) {
    case SET_USER_CURRENT_AUTH:
      return {
        ...state,
        currentUser: action.payload,
        isAuth: true,
      };
    case SET_USER_ALL_LIST:
      return {
        ...state,
        listUsers: action.payload,
      };
    default:
      return state;
  }
}

export const setUserCurrentAuth = userCurrentAuth => ({ type: SET_USER_CURRENT_AUTH, payload: userCurrentAuth });
export const setUserAllList = usersAllList => ({ type: SET_USER_ALL_LIST, payload: usersAllList });
