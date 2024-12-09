import React, { useState, useEffect } from "react";
import * as api from "../api/api.js";
import * as jwt_decode from "jwt-decode";
import { DeviceWidget } from "./DeviceWidget.js";
import { MembersPanel } from "./MembersPanel.js";

export function HomesPanel ({home = {
    name: "", 
    "devices": [{name: "", type: "", setting: ""}],
    "users": [{name: "", _id:""}]
    }}) {
    
    return (
        <>
        <div className="card bg-base-200 padding-5 w-full h-full shadow-xl">
            <div className="card-body">
                <h2 className="card-title">{home.name}</h2>
                <div className="flex gap-5 w-full">
                    <div className="grid-cols-3 w-2/3">
                        {home.devices.map((device => {
                            return(
                                <DeviceWidget name={device.name} type= {device.type} setting= {device.setting}></DeviceWidget>
                            )
                        }))}
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