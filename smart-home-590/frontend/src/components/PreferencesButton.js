import React from 'react'
import { useState } from 'react';
import { createPreference, getDevice } from '../api/api';

export function PreferencesButton ({devices}) {

    const [devPref, setDevPref] = useState("")

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            //device.setting = "default";
            let mydevice = await getDevice(devPref);
            let preference = {deviceid: devPref, deviceSetting: mydevice.setting}
            let response = await createPreference(preference);
            if(response.status==200){
                window.location.reload();
            }
            } catch (error) {
                alert(error)
            }
          }
               
  return (
    <form>
        <select className="select select-bordered w-full max-w-xs " onChange={(e)=>setDevPref(e.target.value)} name="device" required>
            {devices.map((device => {
                return(
                    <option value={device._id}>{device.name}</option>
                )
            }))}
        </select>
      <button className="btn btn-neutral" onClick={handleSubmit}>Save Current Device Preference</button>
    </form>
  )
}

