import React, { useState, useEffect } from "react";
import * as jwt_decode from "jwt-decode";
import { joinHome } from "../api/api";
import { useNavigate } from "react-router-dom";


export function AddHomePanel (){
    const [userId, setUserId] = useState("");
    const [home, setHome] = useState({
        name: "",
        hashedPassword: ""
    })


    function handleChange(e) {
        setHome({ ...home, [e.target.name]: e.target.value})
    }
    useEffect(() => {
        async function loadUserData() {
          const token = sessionStorage.getItem("User");
          const decodedUser = jwt_decode.jwtDecode(token);
          setUserId(decodedUser._id);
        }
        loadUserData();
    }, []);
    async function handleSubmit(e) {
        e.preventDefault();
        try {
            let response = await joinHome(userId, home);
            if(response.status==200){
                window.location.reload();
            }
        } catch (error) {
            alert(error)
        }
    }

    return (
        <>
        <div className="card bg-base-200 padding-5 w-fit h-full shadow-xl">
            <div className="card-body">
                <h2 className="card-title">Join a Home</h2>
                <div className="flex gap-5 w-full">
                <form onSubmit={handleSubmit} class= "flex flex-col gap-5">
                    <input className="input input-bordered w-full max-w-xs" onChange={handleChange} name="name" placeholder={"Home Name"} required></input>
                    <input className="input input-bordered w-full max-w-xs" onChange={handleChange} name="hashedPassword" type="password" placeholder={"Home Password"} required></input>
                    <button className = "btn btn-accent" type="submit">Join Home</button>
                </form>
                </div>
            </div>
        </div>  
        </>
    )
}