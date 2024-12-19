export const setToken = (token) => ({
  type: "SET_TOKEN",
  payload: token,
});

export const setEmail = (email) => ({
  type: "SET_EMAIL",
  payload: email,
});

export const setUserType = (userType) => ({
  type: "SET_USER_TYPE",
  payload: userType,
});
export const setProfileImage = (profileImage) => ({
  type: "SET_PROFILE_IMAGE",
  payload: profileImage,
});
export const logout = () => ({
  type: "LOGOUT",
});
