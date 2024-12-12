import { Light } from "./Light"
import { Lock } from "./Lock"
import { ThermoStat } from "./Thermostat"

export function DeviceWidget ({id, name, type, setting}) {

    if(type == 'light'){
        return(
            <Light id={id} name={name} setting={setting}></Light>
        )
    }
    
    if(type == 'lock'){
        return(
            <Lock id={id} name={name} setting={setting}></Lock>
        )
    }
    
    if(type == 'thermostat'){
        return(
            <ThermoStat id={id} name={name} setting={setting}></ThermoStat>
        )
    }
}