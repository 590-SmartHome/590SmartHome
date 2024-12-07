import { CreateUser } from "../components/CreatUser";
import { Login } from "../components/Login";
import { useState } from "react";

function Landing() {

    const [view, setView] = useState(0)

    return (
     <>
        {!view ? 
        <>
          <Login></Login> 
          <button onClick={()=> setView(!view)}>Create new Account</button>
        </> : 
        <>
          <CreateUser></CreateUser>
          <button onClick={()=> setView(!view)}>Login to existing account</button>
        </>
        }
     </>
    );
  }


export default Landing;
