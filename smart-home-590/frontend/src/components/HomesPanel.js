import React, { useState, useEffect } from "react";
import * as api from "../api/api.js";
import * as jwt_decode from "jwt-decode";

export function HomesPanel () {
    const [homes, setHomes] = useState([{name:""}]);
    const [home, setHome] = useState(0);
    useEffect(() => {
        async function loadUserData() {
          const token = sessionStorage.getItem("User")
          const decodedUser = jwt_decode.jwtDecode(token);
          let myhomes = decodedUser.homes;
          myhomes.forEach(async home => {
            home = await api.getHome(home);
          });
          setHomes(homes)
        }
        loadUserData();
    }, []);

    return (
        <>
        <div className="card bg-base-100 w-3/4 shadow-xl">
            <div className="card-body">
                <h2 className="card-title">{homes[home].name}</h2>
            </div>
        </div>  
        </>
    )
}