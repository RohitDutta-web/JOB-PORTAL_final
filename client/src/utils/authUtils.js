

export const setToken = (token) => {
  localStorage.setItem('Token', token);
  document.cookie = `Token=${token}; path=/; max-age=86400; SameSite=Strict`;
};

export const getToken = () => {
  return localStorage.getItem('Token');
};

export const removeToken = () => {
  localStorage.removeItem('Token');
};

export const isAuthenticated = () => {
  return getToken() !== null;
};