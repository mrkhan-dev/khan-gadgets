import {Outlet} from "react-router-dom";
import Navbar from "../components/Navbar";

const Main = () => {
  return (
    <div>
      <div className="h-20">
        <Navbar />
      </div>
      <Outlet />
    </div>
  );
};

export default Main;
