import axios from "axios";

const URL = "http://localhost:4004";

export async function getUsers() {
    const response = await axios.get(`${URL}/users`);
      if(response.status === 200){
        return response.data;
      }
      else{
        return;
      }
}

export async function getUser(id) {
    const response = await axios.get(`${URL}/users/${id}`);
    if(response.status === 200){
      return response.data;
    }
    else{
      return;
    }
}

export async function createUser(user) {
    const response = await axios.post(`${URL}/users`, user);
    return response;
}

export async function updateUser(id, user) {
    const response = await axios.get(`${URL}/users/${id}`, user);
    return response;
    
}

export async function deleteUser() {
    const response = await axios.delete(`${URL}/users`);
    return response;
}

export async function verifyUser(user) {
  try {
    const response = await axios.post(`${URL}/users/login`, user)
    return response;
  } catch (e) {
    throw `${e.response.data}`;
  }
}

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