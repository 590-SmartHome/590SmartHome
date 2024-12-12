import { useState } from "react";
import { updateDevice } from "../api/api";

export function Light ({id, name, setting}) {
    const [deviceSetting, setDeviceSetting] = useState(( setting== "default") ? "OFF": setting);

    async function handleChange() {
        if(deviceSetting == "ON"){
            let response = await updateDevice(id, {"setting": "OFF"});
            if(response.status==200){  
                //window.location.reload(); 
                setDeviceSetting("OFF")  
                console.log(`${name} turned off!`)
            }
            return;
        }
        else if(deviceSetting == "OFF"){
            let response = await updateDevice(id, {"setting": "ON"});
            if(response.status==200){   
                //window.location.reload();  
                setDeviceSetting("ON")  
                console.log(`${name} turned on!`)
            }
            return;
        }
    }

    return(
        <>
        <div className="card bg-primary text-primary-content w-full h-full">
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