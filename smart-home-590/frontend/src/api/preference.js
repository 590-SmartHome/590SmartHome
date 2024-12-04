import axios from "axios";

const URL = "http://localhost:5000";

export async function getPreferences() {
    const response = await axios.get(`${URL}/preferences`);
      if(response.status === 200){
        return response.data;
      }
      else{
        return;
      }
}

export async function getPreference(id) {
    const response = await axios.get(`${URL}/preferences/${id}`);
    if(response.status === 200){
      return response.data;
    }
    else{
      return;
    }
}

export async function createPreference(preference) {
    const response = await axios.post(`${URL}/preferences`, preference);
    return response;
}

export async function updatePreference(id, preference) {
    const response = await axios.get(`${URL}/preferences/${id}`, preference);
    return response;
    
}

export async function deletePreference() {
    const response = await axios.delete(`${URL}/preferences`);
    return response;
}