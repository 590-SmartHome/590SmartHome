import React, { useState, useEffect } from "react";
import * as api from "../api/api.js";
import * as jwt_decode from "jwt-decode";
import { HomesPanel } from "../components/HomesPanel.js";

function Home() {
  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    email: "",
    username: "",
    avatarUrl: ""
  });

  useEffect(() => {
    async function loadUserData() {
      const token = sessionStorage.getItem("User")
      const decodedUser = jwt_decode.jwtDecode(token);
      const myUser = await api.getUser(decodedUser._id)
      setUser(decodedUser)
    }
    loadUserData();
  }, []);

    return (
     <div>
        <div className="card card-side bg-base-100 shadow-xl">
          <figure>
            <img
              src="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp"
              alt="Movie" />
          </figure>
          <div className="card-body">
            <h2 className="card-title">Welcome {user.first_name}!</h2>
            <p>Welcome to your home dashboard!</p>
            <div className="card-actions justify-end">
            </div>
          </div>
        </div>
        <HomesPanel></HomesPanel>
     </div>
    );
  }


export default Home;
