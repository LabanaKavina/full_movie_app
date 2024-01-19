import { userAction } from "./userSlice";
import store from "../store";

export const login = (data) => {
  return async (dispatch) => {
    try {
      const response = await fetch("http://localhost:5000/user", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error("Could not login ");
      }
      const result = await response.json();

      dispatch(userAction.setUser(result));
      localStorage.setItem("key", result.id);
      return true;
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const getUser = async (id) => {
        try {
      const response = await fetch(`http://localhost:5000/user?id=${id}`);
      if (!response.ok) {
        throw new Error("Could not fetch user ");
      }
      const result = await response.json();
      store.dispatch(userAction.setUser(result));
    } catch (error) {
      console.log(error.message);
    }
  
};
