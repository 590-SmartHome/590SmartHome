import { CreateUser } from "../components/CreatUser";
import { Login } from "../components/Login";
import { useState } from "react";

function Landing() {

    const [view, setView] = useState(0)

    return (
     <>
        {!view ? 
        <>
          <div className="flex justify-center flex-col gap-5 h-screen w-screen">
            <Login></Login>
            <div className="card bg-base-100 m-5 p-5 w-fit">
              <div className="card-body">
                <h2 className="card-title">Don't have an account? Make one here!</h2>
                <div className="card-actions justify-center">
                <button className="btn btn-primary" onClick={()=> setView(!view)}>Create new Account</button>
                </div>
              </div>
            </div>
          </div>
        </> : 
        <>
          <div className="flex justify-center flex-col gap-5">
            <CreateUser></CreateUser>
            <div className="card bg-base-100 m-5 p-5 w-fit">
              <div className="card-body">
                <h2 className="card-title">Already have an account? Log in here!</h2>
                <div className="card-actions justify-center">
                <button className="btn btn-secondary" onClick={()=> setView(!view)}>Login to existing account</button>
                </div>
              </div>
            </div>
          </div>
        </>
        }
     </>
    );
  }


export default Landing;
