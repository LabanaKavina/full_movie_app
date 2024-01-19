import { redirect } from "react-router-dom";
import store from "./store";
import { getUser } from "./login/userActions";
export const getAuthKey = () => {
  const authKey = localStorage.getItem("key");
  return authKey;
};

export const checkAuthKey = () => {
  const user = store.getState().user;
  const token = getAuthKey();
  if (!user && token) {
    getUser(token);
    
  }
  if (!token) {
    return redirect("/login");
  }
  return null;
};

export const isLogin = () => {
  const token = getAuthKey();

  if (token) {
    return redirect("/movies");
  }
  return null;
};
