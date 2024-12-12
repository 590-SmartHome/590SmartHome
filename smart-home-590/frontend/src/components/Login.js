import { verifyUser } from "../api/api"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"

export function Login() {
    const [user, setUser] = useState({
        email: "",
        hashedPassword: ""
    })

    const navigate = useNavigate()

    function handleChange(e) {
        setUser({ ...user, [e.target.name]: e.target.value})
    }

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            let response = await verifyUser(user);
            if(response.status==200){
                sessionStorage.setItem("User", response.data)
                axios.defaults.headers.common["Authorization"] = `Bearer ${response.data}`
                navigate("/home")
            }
        } catch (error) {
            alert(error)
        }
    }

    return (
    <>
        <div className="hero bg-primary text-primary-content h-fit w-2/3 rounded-box p-5 m-5">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Login now!</h1>
                    <p className="py-6">
                        Fill in your email and password to log in to your very own smart home dashboard!
                    </p>
                </div>
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                    <form className="card-body" onSubmit={handleSubmit}>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input className="input input-bordered w-full max-w-xs" onChange={handleChange} name="email" placeholder={"Email"} required></input>
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input className="input input-bordered w-full max-w-xs" onChange={handleChange} name="hashedPassword" type="password" placeholder={"Password"} required></input>
                        </div>
                        <div className="form-control mt-6">
                        <button className="btn btn-primary" type="submit">Login</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </>
    )
}