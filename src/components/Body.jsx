import { Outlet} from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";



const Body = () => {
  
  return (
    <div className="flex flex-col min-h-screen bg-base-100">
      <Navbar />

      {/* Main content expands to push footer down */}
      <main className="flex-grow pt-10 px-4 md:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Body;
