import React, { useState, useEffect } from "react";
import axios from "axios"

function Home() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function getUsers() {
      const response = await axios.get("http://localhost:5000/users")
      if(response.status === 200){
        setUsers(response.data);
      }
    }

    getUsers();
  }, []);

    return (
     <div>
        <div class="card card-side bg-base-100 shadow-xl">
  <figure>
    <img
      src="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp"
      alt="Movie" />
  </figure>
  <div class="card-body">
    <h2 class="card-title">Welcome {users[0].first_name}!</h2>
    <p>{users[0].first_name} {users[0].last_name} <br/>
    email: {users[0].email}
    </p>
    <div class="card-actions justify-end">
      <button class="btn btn-primary">Watch</button>
    </div>
  </div>
</div>
     </div>
    );
  }


export default Home;
