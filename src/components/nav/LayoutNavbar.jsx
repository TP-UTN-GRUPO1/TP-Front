import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

const LayoutNavbar = ({ hideUserButtons }) => {
  return (
    <>
      <Navbar hideUserButtons={hideUserButtons} />
      <Outlet />
    </>
  );
};

export default LayoutNavbar;
