import { Outlet } from "react-router-dom";
import navbar from "../components/navbar";

const Layout = () => {
  return (
    <>
    <navbar></navbar>
    <Outlet />
   </>
  )
};

export default Layout;