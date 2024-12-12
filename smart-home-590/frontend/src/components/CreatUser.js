import { createUser } from "../api/api"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

export function CreateUser() {
    const [user, setUser] = useState({
        username: "",
        email: "",
        hashedPassword: "",
        avatarUrl: "",
        first_name: "",
        last_name: ""
    })

    const navigate = useNavigate();

    function handleChange(e) {
        setUser({ ...user, [e.target.name]: e.target.value})
    }
   
    async function handleSubmit(e) {
        e.preventDefault();
        try{
            let response = await createUser(user);
            if(response.status !== 200) {
                alert("User account could not be created")
            }else{
                window.location.reload()
            }
        } catch(e) {
            return(
                alert(e)
            )
        }

    }

    return (
    <>
        <div className="hero bg-secondary text-secondary-content w-2/3 rounded-box p-5 m-5">
            <div className="hero-content flex-col h-fit lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Create an Account</h1>
                    <p className="py-6">
                        Fill in your information to create your smart home dashboard account!
                    </p>
                </div>
                <div className="card bg-base-100 w-full h-fit max-w-sm shadow-2xl">
                    <form className="card-body h-fit text-neutral" onSubmit={handleSubmit}>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">First Name</span>
                            </label>
                            <input class="input input-bordered w-full max-w-xs" onChange={handleChange} name="first_name" placeholder={"First Name"} required></input>
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Last Name</span>
                            </label>
                            <input class="input input-bordered w-full max-w-xs" onChange={handleChange} name="last_name" placeholder={"Last Name"} required></input>
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">User Name</span>
                            </label>
                            <input class="input input-bordered w-full max-w-xs" onChange={handleChange} name="username" placeholder={"Username"} required></input>
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input class="input input-bordered w-full max-w-xs" onChange={handleChange} name="email" placeholder={"Email"} required></input>
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input class="input input-bordered w-full max-w-xs" onChange={handleChange} name="hashedPassword" type="password" placeholder={"Password"} required></input>
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn btn-secondary" type="submit">Create Account</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>


    </>
    )
}