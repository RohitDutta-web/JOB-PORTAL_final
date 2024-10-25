

export const setToken = (token) => {
  sessionStorage.setItem('Token', token);
};

export const getToken = () => {
  return sessionStorage.getItem('Token');
};

export const removeToken = () => {
  sessionStorage.removeItem('Token');
};

export const isAuthenticated = () => {
  return getToken() !== null;
};