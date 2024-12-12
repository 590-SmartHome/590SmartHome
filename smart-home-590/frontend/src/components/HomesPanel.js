import React, { useState, useEffect } from "react";
import { getDevice, createPreference } from "../api/api.js"; 
import * as jwt_decode from "jwt-decode";
import { DeviceWidget } from "./DeviceWidget.js";
import { MembersPanel } from "./MembersPanel.js";

export function HomesPanel ({home = {
    name: "", 
    "devices": [{_id: "", name: "", type: "", setting: ""}],
    "users": [{name: "", _id:""}]
    }, userId}) {
    
    const [devPref, setDevPref] = useState("");
    
   /*  async function handleSubmit(e) {
        const mydevice = await getDevice(devPref);
        let response = await createPreference(id, {"setting": deviceSetting});
        return;
    }
     */
    return (
        <>
        <div className="card bg-base-200 padding-5 w-full h-full shadow-xl">
            <div className="card-body">
                <h2 className="card-title">{home.name}</h2>
                <div className="flex gap-5 w-full">
                    <div className="flex flex-col gap-5 w-2/3">
                        <div className="grid grid-cols-3 gap-5 w-full">
                            {home.devices.map((device => {
                                return(
                                    <DeviceWidget id={device._id} name={device.name} type= {device.type} setting= {device.setting}></DeviceWidget>
                                )
                            }))}
                        </div>
                        <form>
                            <select className="select select-bordered w-full max-w-xs " onChange={(e)=>setDevPref(e.target.value)} name="device" required>
                                {home.devices.map((device => {
                                    return(
                                        <option value={device._id}>{device.name}</option>
                                    )
                                }))}
                            </select>
                            <button className="btn btn-neutral">Save Current Device Preferences</button>
                        </form>
                    </div>
                    <div className="justify-self-end w-1/3">
                        <MembersPanel name={home.name} users= {home.users}></MembersPanel>
                    </div>
                </div>
            </div>
        </div>  
        </>
    )
}