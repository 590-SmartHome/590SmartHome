import { Outlet, useNavigate } from "react-router-dom";
import {Navbar} from "../components/Navbar";
import { useEffect } from "react";

const Layout = () => {

  let user = sessionStorage.getItem("User");
  const navigate = useNavigate();

  useEffect(()=>{
    if (!user){
      navigate("/");
    }
  }, [user])

  return (
    <>
      <Navbar />
      <Outlet />
   </>
  )
};

export default Layout;