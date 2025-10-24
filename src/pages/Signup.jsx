import { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import BASE_URL from "../utils/constants";

const SignUp = () => {
  const userFromStore = useSelector((store) => store.user);
  const navigate = useNavigate();

  if (userFromStore) return navigate("/");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailID, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [error, setError] = useState("");

  const dispatch = useDispatch();

  // function to call the SignUp API
  const handleSignup = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        { firstName, lastName, emailID, password, role },
        { withCredentials: true }
      );

      dispatch(addUser(res.data.data));
      navigate("/");
    } catch (err) {
      setError(err?.response?.data || "Something went wrong");
    }
  };

  return (
    <div className="flex justify-center mb-10">
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
        <legend className="fieldset-legend">Register as a new user</legend>
        <div className="text-red-400">{error}</div>

        <label className="label">First Name</label>
        <input
          type="firstName"
          value={firstName}
          className="input"
          placeholder="First Name"
          onChange={(e) => setFirstName(e.target.value)}
        />
        <label className="label">Last Name</label>
        <input
          type="lastName"
          value={lastName}
          className="input"
          placeholder="Last Name"
          onChange={(e) => setLastName(e.target.value)}
        />
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

        <select
            className="select select-bordered"
            name="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
          >
            <option value="">Select Role</option>
            <option value="normal_user">Normal User</option>
            <option value="admin">Admin</option>
          </select>
    
        <div className="flex justify-center">
          <button className="btn btn-neutral mt-4 px-6" onClick={handleSignup}>
            Create Account
          </button>
        </div>
        <p
          className="flex justify-center my-2 cursor-pointer"
          onClick={() => navigate("/login")}
        >
          Existing user? Login Here
        </p>
      </fieldset>
    </div>
  );
};

export default SignUp;
