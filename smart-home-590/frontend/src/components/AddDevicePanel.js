import React, { useState, useEffect } from "react";
import * as jwt_decode from "jwt-decode";
import { createDevice } from "../api/api";
import { useNavigate } from "react-router-dom";


export function AddDevicePanel ({homes}){
    const [homeId, setHomeId] = useState("");
    const [device, setDevice] = useState({
        name: "",
        type: "",
        setting: ""
    })

    function handleChange(e) {
        setDevice({ ...device, [e.target.name]: e.target.value})
    }
    async function handleSubmit(e) {
        e.preventDefault();
        try {
            device.setting = "default";
            console.log(homes)
            console.log(homeId)
            let response = await createDevice(homeId, device);
            if(response.status==200){
                window.location.reload();
            }
        } catch (error) {
            alert(error)
        }
    }

    return (
        <>
        <div className="card bg-base-200 padding-5 w-1/4 h-full shadow-xl">
            <div className="card-body">
                <h2 className="card-title">Add a New Device</h2>
                <div className="flex gap-5 w-full">
                <form onSubmit={handleSubmit} class= "flex flex-col gap-5">
                    <select className="select w-full max-w-xs" onChange={(e)=>setHomeId(e.target.value)} name="home" required>
                        <option disabled selected>Pick Home</option>
                        {homes.map((home => {
                        return(
                            <option value={home.id}>{home.name}</option>
                        )
                    }))} 
                    </select>
                    <input className="input input-bordered w-full max-w-xs" onChange={handleChange} name="name" placeholder={"Device Name"} required></input>
                    <select className="select w-full max-w-xs" onChange={handleChange} name="type" required>
                        <option disabled selected>Pick device Type</option>
                        <option value={"light"}>Light</option>
                        <option value={"lock"}>Lock</option>
                        <option value={"thermostat"}>Thermostat</option>
                    </select>
                    <button className = "btn btn-accent" type="submit">Add device</button>
                </form>
                </div>
            </div>
        </div>  
        </>
    )
}