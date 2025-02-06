import React, { useState, useEffect } from "react";
import * as api from "../api/api.js";
import * as jwt_decode from "jwt-decode";
import { HomesPanel } from "../components/HomesPanel.js";
import { MembersPanel } from "../components/MembersPanel.js";
import { AddHomePanel } from "../components/AddHomePanel.js";
import { AddDevicePanel } from "../components/AddDevicePanel.js";

function Home() {
  
  const [userId, setUserId] = useState("");
  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    email: "",
    username: "",
    avatarUrl: ""
  });

  const [homes, setHomes] = useState([{
    "id": "",
    "name": "", 
    "devices": [{_id: "", name: "", type: "", setting: ""}],
    "users": [{name: "", _id:""}]
  }]);
  let indexArr = []
  for (let i = 0; i < homes.length; i ++) {
    indexArr.push(i);
  }
  const [home, setHome] = useState(0);
  useEffect(() => {
      async function loadUserData() {
        const token = sessionStorage.getItem("User")
        const decodedUser = jwt_decode.jwtDecode(token);
        setUser(decodedUser)
        setUserId(userId);
        let myhomes = await api.getHomes(decodedUser._id);
        let configHomes = [];
        myhomes.forEach(home => {
          let newHome = {
            id: home._id.toString(),
            name: home.name,
            devices: home.devices,
            users: home.users
          }
          configHomes.push(newHome);
        }); 
        setHomes(configHomes)
       /*  let myHomeIds = []
        myhomes.forEach(home => {
          myHomeIds.push(home._id);
        }); */
        //console.log(myhomes);
      }
      loadUserData();
  }, []);
    //console.log(homes[home]);
    
    return (
     <div className="flex flex-col gap-5 p-3 w-full h-full">
      <div className="flex flex-col lg:flex-row gap-5 p-3 w-full h-full">
          <div className="card card-side bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">Welcome {user.first_name}!</h2>
              <p>Welcome to your home dashboard!</p>
              <div className="card-actions justify-end">
              </div>
            </div>
          </div>
          <div className="flex flex-col w-full h-fit gap-2">
            <select className="select select-bordered w-full max-w-xs " onChange={(e)=>setHome(e.target.value)} name="home" required>
                          <option disabled selected>Pick Home</option>
                          {indexArr.map((i => {
                            
                            return(
                              <option value={i}>{homes[i].name}</option>
                            )
                          }))} 
            </select>
            <HomesPanel home={homes[home]} userId={userId}></HomesPanel>
          </div>
      </div>
      <div className="card bg-base-100 shadow-xl w-full">
        <div className="card-body">
          <h2 className="card-title">Edit Panel</h2>
          <div className="flex flex-row gap-5 w-full min-h-fit">
            <AddHomePanel></AddHomePanel>
            <AddDevicePanel homes={homes}></AddDevicePanel>
          </div>
        </div>
      </div>
     </div>
    );
  }


export default Home;
