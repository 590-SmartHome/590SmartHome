import React, { useState, useEffect } from "react";
import * as api from "../api/api.js";
import * as jwt_decode from "jwt-decode";
import { HomesPanel } from "../components/HomesPanel.js";
import { MembersPanel } from "../components/MembersPanel.js";

function Home() {
  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    email: "",
    username: "",
    avatarUrl: ""
  });

  const [homes, setHomes] = useState([{
    "name": "", 
    "devices": [{name: "", type: "", setting: ""}],
    "users": [{name: "", _id:""}]
  }]);
  const [home, setHome] = useState(0);
  useEffect(() => {
      async function loadUserData() {
        const token = sessionStorage.getItem("User")
        const decodedUser = jwt_decode.jwtDecode(token);
        setUser(decodedUser)
        //console.log(decodedUser);
        let myhomes = await api.getHomes(decodedUser._id);
        setHomes(myhomes)
        //console.log(myhomes);
      }
      loadUserData();
  }, []);
    //console.log(homes[home]);
    
    return (
     <div className="flex gap-5 padding-10 w-full h-full">
        <div className="card card-side bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Welcome {user.first_name}!</h2>
            <p>Welcome to your home dashboard!</p>
            <div className="card-actions justify-end">
            </div>
          </div>
        </div>
        <div className="w-full">
          <HomesPanel home={homes[home]}></HomesPanel>
        </div>
     </div>
    );
  }


export default Home;
