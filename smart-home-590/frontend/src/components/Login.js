import { verifyUser } from "../api/api"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

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
                navigate("/home")
            }
        } catch (error) {
            alert(error)
        }
    }

    return (
    <>
    <form onSubmit={handleSubmit} class= "flex flex-col">
        <input class="input input-bordered w-full max-w-xs" onChange={handleChange} name="email" placeholder={"Email"} required></input>
        <input class="input input-bordered w-full max-w-xs" onChange={handleChange} name="hashedPassword" type="password" placeholder={"Password"} required></input>
        <button type="submit">Login</button>
    </form>
    </>
    )
}