import { Outlet} from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";



const Body = () => {
  
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
