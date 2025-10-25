import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import logo2 from "../images/logo2.jpeg"
import BASE_URL from "../utils/constants";
import { removeUser } from "../utils/userSlice";
import axios from "axios";

const Navbar = () => {

  const user = useSelector((store) => store.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });
      dispatch(removeUser());
      return navigate("/login");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="navbar bg-gray-900/95 backdrop-blur-sm border-b border-gray-800 z-50">
      <div className="flex-1 text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
        <Link to="/" className="flex">
          <img src="null" alt="" className="" />
          Login Portal
        </Link>
      </div>
      <div className="flex-none">
        {!user ? (
          <>
            <Link
              to="/login"
              className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-6 py-2 rounded-lg hover:from-cyan-600 hover:to-blue-700 transition-all transform hover:scale-105 font-medium shadow-lg mx-2"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-6 py-2 rounded-lg hover:from-cyan-600 hover:to-blue-700 transition-all transform hover:scale-105 font-medium shadow-lg mx-2"
            >
              Create Account
            </Link>
          </>
        ) : (
          <div className="dropdown dropdown-end">
            Welcome, {user.firstName}
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar mx-1.5"
            >
              <div className="w-10 rounded-full">
                <img alt="MyPhoto" src={logo2} />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link to="/change-password" className="justify-between">
                  Change your Password
                  <span className="badge">New</span>
                </Link>
              </li>
              <li>
                <a onClick={handleLogout}>Logout</a>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
