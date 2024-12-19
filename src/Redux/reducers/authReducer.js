// src/Redux/reducers/authReducer.js

const initialState = {
  token: null,
  email: null,
  userType: null,
  profileImage: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_TOKEN":
      return {
        ...state,
        token: action.payload,
      };
    case "SET_EMAIL":
      return {
        ...state,
        email: action.payload,
      };
    case "SET_USER_TYPE":
      return {
        ...state,
        userType: action.payload,
      };
    case "SET_PROFILE_IMAGE":
      return {
        ...state,
        profileImage: action.payload,
      };
    case "LOGOUT":
      return initialState;
    default:
      return state;
  }
};

export default authReducer;
