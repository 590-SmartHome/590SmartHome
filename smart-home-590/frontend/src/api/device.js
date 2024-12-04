import axios from "axios";

const URL = "http://localhost:5000";

export async function getDevices() {
    const response = await axios.get(`${URL}/devices`);
      if(response.status === 200){
        return response.data;
      }
      else{
        return;
      }
}

export async function getDevice(id) {
    const response = await axios.get(`${URL}/devices/${id}`);
    if(response.status === 200){
      return response.data;
    }
    else{
      return;
    }
}

export async function createDevice(device) {
    const response = await axios.post(`${URL}/devices`, device);
    return response;
}

export async function updateDevice(id, device) {
    const response = await axios.get(`${URL}/devices/${id}`, device);
    return response;
    
}

export async function deleteDevice() {
    const response = await axios.delete(`${URL}/devices`);
    return response;
}