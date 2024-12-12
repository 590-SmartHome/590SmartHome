import { useState } from "react";
import { updateDevice } from "../api/api";

export function ThermoStat ({id, name, setting}) {
    const [deviceSetting, setDeviceSetting] = useState(( setting== "default") ? "72": setting);

    async function handleChange(e) {
        setDeviceSetting(e.target.value);
    }

    async function handleSubmit(e) {
        let response = await updateDevice(id, {"setting": deviceSetting});
        if(response.status==200){  
            //window.location.reload(); 
            console.log(`${name} set to ${deviceSetting} degrees!`)
        }
        return;
    }
        

    return(
        <>
        <div className="card bg-secondary text-secondary-content w-full h-full">
            <div className="card-body">
                <h2 className="card-title">{name}</h2>
                <div className="card-actions justify-end">
                    <form onSubmit={handleSubmit}>
                        <label> {deviceSetting}
                        <input type="range" min={0} max="100" value={deviceSetting} onChange={handleChange} className="range range-sm" />
                        </label>
                        <button type="submit" className="btn">Set Temperature</button>
                    </form>
                </div>
            </div>
        </div>
        </>
    )
}