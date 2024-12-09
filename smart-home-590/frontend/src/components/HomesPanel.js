import React, { useState, useEffect } from "react";
import * as api from "../api/api.js";
import * as jwt_decode from "jwt-decode";
import { DeviceWidget } from "./DeviceWidget.js";
import { MembersPanel } from "./MembersPanel.js";

export function HomesPanel ({homes = [{}]}) {
    const [home, setHome] = useState(0);
    return (
        <>
        <div className="card bg-base-100 w-3/4 shadow-xl">
            <div className="card-body">
                <h2 className="card-title">{homes[home].name}</h2>
                <div className="flex">
                    {homes[home].devices.map((device => {
                        return(
                            <DeviceWidget device={{name: device.name, type: device.type, name: device.setting,}}></DeviceWidget>
                        )
                    }))}
                    <MembersPanel name={homes[home].name} users={homes[home].users}></MembersPanel>
                </div>
            </div>
        </div>  
        </>
    )
}