import Cookies from 'js-cookie';

export const getCookieValue = (cookieName:any) => {
  return Cookies.get(cookieName);
};
