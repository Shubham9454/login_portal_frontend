import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";

import { useNavigate } from "react-router-dom";
import BASE_URL from "../utils/constants";

const Login = () => {
  const userFromStore = useSelector((store) => store.user);
  const navigate = useNavigate();

  if (userFromStore) return navigate("/");

  
  const [emailID, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [error, setError] = useState("");

  const dispatch = useDispatch();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        {
          emailID,
          password,
        },
        { withCredentials: true }
      );

      dispatch(addUser(res.data.user));
      navigate("/");

    } catch (err) {
      setError(err?.response?.data?.error || "Something Went Wrong");
      console.error(err);
    }
  };

  return (
    <div className="flex justify-center my-10">
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
        <legend className="fieldset-legend">
        Login to your Account
        </legend>
        <div className="text-red-400">{error}</div>

        <label className="label">Email Id</label>
        <input
          type="email"
          value={emailID}
          className="input"
          placeholder="Email Id"
          onChange={(e) => setEmail(e.target.value)}
        />

        <label className="label">Password</label>
        <input
          type="password"
          value={password}
          className="input"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="flex justify-center">
          <button
          className="btn btn-neutral mt-4 px-6"
          onClick={handleLogin}
        >Login
        </button>
        </div>
        <p
          className="flex justify-center my-2 cursor-pointer"
          onClick={() => navigate("/signup")}
        >New User? Sign up Here
        </p>

      </fieldset>
    </div>
  );
};

export default Login;
