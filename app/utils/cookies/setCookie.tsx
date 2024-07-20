
import Cookies from 'js-cookie';

export const setCookieValue = (cookieName:any, value:any, options = {}) => {
  Cookies.set(cookieName, value, {
    expires: 2, 
    path: '/',
    ...options,
  });
};
