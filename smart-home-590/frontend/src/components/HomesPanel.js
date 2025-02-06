import React, { useState, useEffect } from "react";
import { getDevice, createPreference } from "../api/api.js"; 
import * as jwt_decode from "jwt-decode";
import { DeviceWidget } from "./DeviceWidget.js";
import { MembersPanel } from "./MembersPanel.js";
import { PreferencesButton } from "./PreferencesButton.js";

export function HomesPanel ({home = {
    name: "", 
    "devices": [{_id: "", name: "", type: "", setting: ""}],
    "users": [{name: "", _id:""}]
    }, userId}) {
    
    
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
                <div className="flex flex-col lg:flex-row gap-5 w-full">
                    <div className="flex flex-col gap-5 w-2/3">
                        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5 w-full">
                            {home.devices.map((device => {
                                return(
                                    <DeviceWidget id={device._id} name={device.name} type= {device.type} setting= {device.setting}></DeviceWidget>
                                )
                            }))}
                        </div>
                        
                            {/* <PreferencesButton devices={home.devices} ></PreferencesButton> */}
                        
                    </div>
                    <div className="justify-self-end lg:w-1/3">
                        <MembersPanel name={home.name} users= {home.users} id={userId}></MembersPanel>
                    </div>
                </div>
            </div>
        </div>  
        </>
    )
}