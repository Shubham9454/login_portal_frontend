import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "./test";
import Footer from "./Footer";
import { useEffect } from "react";
import axios from "axios";
import BASE_URL from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";

const Body = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userFromStore = useSelector((store) => store.user);

  const fetchUser = async () => {
    if (userFromStore) return;
    try {
      const res = await axios.get(BASE_URL + "/profile/view",
        {withCredentials: true}
      );
      dispatch(addUser(res.data));
    } catch (err) {
      if (err.status === 401) navigate("/login");
      console.error(err);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      {/* Main content expands to push footer down */}
      <main className="flex-grow pt-16">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default Body;
