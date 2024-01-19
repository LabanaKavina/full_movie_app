import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { login } from "./userActions";

const Login = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  let [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onLogin = async (e) => {
    e.preventDefault();
    const properName = /^[a-zA-Z ]{2,30}$/;
    if (!properName.test(name)) {
      return setError("Invalid username");
    }
    const result = await dispatch(login({ name, password }));
    if (!result) {
      return setError("Enter Username or Password is Incorrect");
    }
    navigate("/movies");
  };

  return (
    <>
      <div className=" mt-16 flex w-3/4 h-96 ml-52">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSODh1HiJzM7fdEzhpEtJFJlJssydEXCSxm0w&usqp=CAU"
          className="h-full w-1/3 ml-20"
        />
        <div className=" w-full bg-pink-700 ">
          <div className="text-white text-center text-3xl mt-7 underline decoration-pink-200 underline-offset-4">
            Sign in use
          </div>
          <form className="flex flex-col gap-8  p-16 pl-36" onSubmit={onLogin}>
            <input
              type="text"
              placeholder="Enter Your Username"
              className="pl-3 h-9 rounded-full opacity-85 w-72"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setError("");
              }}
            />

            <input
              type="password"
              placeholder="Enter Your Password"
              className="pl-3 h-9 rounded-full opacity-85 w-72"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError("");
              }}
            />
            <button
              type="submit"
              className="ml-14 h-9 rounded-full opacity-85 w-48 bg-white"
            >
              Submit
            </button>
            {error && <p className="text-white ml-10">{error}</p>}
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
