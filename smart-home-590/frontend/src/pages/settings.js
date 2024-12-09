import React, { useState, useEffect } from "react";
import * as api from "../api/api.js";
import * as jwt_decode from "jwt-decode";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Settings() {
  const [user, setUser] = useState({
    _id: "",
    first_name: " ",
    last_name: "",
    username: "",
  });

  useEffect(() => {
      async function loadUserData() {
        const token = sessionStorage.getItem("User")
        const decodedUser = jwt_decode.jwtDecode(token);
        setUser(decodedUser)
        //console.log(decodedUser);
      }
      loadUserData();
  }, []);

  const navigate = useNavigate()

  function handleChange(e) {
    setUser({ ...user, [e.target.name]: e.target.value})
  }

  async function handleSubmit(e) {
      e.preventDefault();
      try {
        const updateUser = {
          first_name: user.first_name,
          last_name: user.last_name,
          username: user.username}
          
        const response = await api.updateUser(user._id, updateUser)

        if(response.status==200){
          sessionStorage.setItem("User", response.data)
          axios.defaults.headers.common["Authorization"] = `Bearer ${response.data}`
          navigate("/settings");
        } 
      } catch (error) {
          alert(error)
      }
  }

  return (
    <div className = "flex flex-col w-full h-full p-5 m-5">
      <div className="flex flex-row gap-5">
        <div className="avatar placeholder">
          <div className="bg-primary text-primary-content w-48 rounded-full">
            <div className="text-7xl">{user.first_name[0]}</div>
          </div>
        </div>
        <div className="flex flex-col p-5 content-between">
          <h1 className="text-5xl">Settings</h1>
          <p className="text-3xl">Edit your profile here.</p>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col w-1/2 gap-y-10 p-5 m-5">
        <label className="input input-bordered flex items-center gap-2">
          First Name
          <input type="text" className="grow" placeholder="First Name" onChange={handleChange} name="first_name" value={user.first_name} />
        </label>
        <label className="input input-bordered flex items-center gap-2">
          Last Name
          <input type="text" className="grow" placeholder="Last Name" onChange={handleChange} name="last_name" value={user.last_name}/>
        </label>
        <label className="input input-bordered flex items-center gap-2">
          Username
          <input type="text" className="grow" placeholder="Username" onChange={handleChange} name="username" value={user.username}/>
        </label>
        <label className="flex w-max gap-20">
          Update Profile
          <button className="btn btn-secondary w-full justify-self-end" type="submit">Save</button>
        </label>
      </form>
    </div>
  );
}


export default Settings;