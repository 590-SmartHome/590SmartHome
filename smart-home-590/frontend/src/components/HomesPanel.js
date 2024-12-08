import React, { useState, useEffect } from "react";
import * as api from "../api/api.js";
import * as jwt_decode from "jwt-decode";

export function HomesPanel () {
    const [homes, setHomes] = useState([]);
    
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
        <>
        <div className="card bg-base-100 w-3/4 shadow-xl">

        </div>  
        </>
    )
}