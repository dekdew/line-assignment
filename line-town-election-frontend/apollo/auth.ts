import { useCookies } from "react-cookie";

const TOKEN_NAME = "authToken";

// custom hook to handle authToken - we use compositon to decouple the auth system and it's storage
export const useAuthToken = () => {
  const [cookies, setCookie, removeCookie] = useCookies([TOKEN_NAME]);
  const setAuthToken = (authToken: any) => setCookie(TOKEN_NAME, authToken);
  const removeAuthToken = () => removeCookie(TOKEN_NAME);
  return { authToken: cookies[TOKEN_NAME], setAuthToken, removeAuthToken };
};

export const useLogout = () => {
  const { removeAuthToken } = useAuthToken();

  const logout = async () => {
    removeAuthToken();
  };
  return logout;
};
