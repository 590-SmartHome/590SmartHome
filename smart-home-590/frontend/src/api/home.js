import axios from "axios";

const URL = "http://localhost:5000";

export async function getHomes() {
    const response = await axios.get(`${URL}/homes`);
      if(response.status === 200){
        return response.data;
      }
      else{
        return;
      }
}

export async function getHome(id) {
    const response = await axios.get(`${URL}/homes/${id}`);
    if(response.status === 200){
      return response.data;
    }
    else{
      return;
    }
}

export async function createHome(home) {
    const response = await axios.post(`${URL}/homes`, home);
    return response;
}

export async function updateHome(id, home) {
    const response = await axios.get(`${URL}/homes/${id}`, home);
    return response;
    
}

export async function deleteHome() {
    const response = await axios.delete(`${URL}/homes`);
    return response;
}