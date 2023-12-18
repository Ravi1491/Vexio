import * as R from "ramda";

export const isNilOrEmpty = R.anyPass([R.isNil, R.isEmpty]);
export const isPresent = R.complement(isNilOrEmpty);

export const getCookie = (cookieName, cookiesString = "") => {
  const name = cookieName + "=";
  const decodedCookie = isPresent(cookiesString)
    ? cookiesString
    : typeof document !== "undefined"
    ? decodeURIComponent(document.cookie)
    : "";
  const cookieArr = decodedCookie.split("; ");
  let res;

  cookieArr.forEach((cookie) => {
    if (cookie.indexOf(name) === 0) res = cookie.substring(name.length);
  });

  return res;
};
