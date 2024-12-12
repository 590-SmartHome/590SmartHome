import { useState } from "react";
import { updateDevice } from "../api/api";

export function Lock ({id, name, setting}) {
    const [deviceSetting, setDeviceSetting] = useState(( setting== "default") ? "LOCKED": setting);

    async function handleChange() {
        if(deviceSetting == "LOCKED"){
            let response = await updateDevice(id, {"setting": "UNLOCKED"});
            if(response.status==200){  
                //window.location.reload(); 
                setDeviceSetting("UNLOCKED")  
                console.log(`${name} turned unlocked!`)
            }
            return;
        }
        else if(deviceSetting == "UNLOCKED"){
            let response = await updateDevice(id, {"setting": "LOCKED"});
            if(response.status==200){   
                //window.location.reload();  
                setDeviceSetting("LOCKED")  
                console.log(`${name} locked!`)
            }
            return;
        }
    }

    return(
        <>
        <div className="card bg-accent text-accent-content w-full h-full">
            <div className="card-body">
                <h2 className="card-title">{name}</h2>
                <div className="card-actions justify-end">
                <button className="btn" onClick={handleChange}>{deviceSetting}</button>
                </div>
            </div>
        </div>
        </>
    )
}