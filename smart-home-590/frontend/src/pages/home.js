import React, { useState, useEffect } from "react";
import * as api from "../api/api.js"

function Home() {
  const [users, setUsers] = useState([{first_name: ""}]);

  useEffect(() => {
    async function getUsers() {
      let data = await api.getUsers();
      if(data){
        setUsers(data)
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
            <p><br/>
            email:
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
