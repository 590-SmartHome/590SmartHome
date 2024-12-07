import { createUser } from "../api/api"
import { useState } from "react"

export function CreateUser() {
    const [user, setUser] = useState({
        username: "",
        email: "",
        hashedPassword: "",
        avatarUrl: "",
        first_name: "",
        last_name: ""
    })
    function handleChange(e) {
        setUser({ ...user, [e.target.name]: e.target.value})
    }

    async function handleSubmit(e) {
        e.preventDefault();
        let response = await createUser(user);
        if(response.status !== 200) {
            alert("User account could not be created")
        }
    }

    return (
    <>
    <form onSubmit={handleSubmit} class= "flex flex-col">
        <input class="input input-bordered w-full max-w-xs" onChange={handleChange} name="first_name" placeholder={"First Name"} required></input>
        <input class="input input-bordered w-full max-w-xs" onChange={handleChange} name="last_name" placeholder={"Last Name"} required></input>
        <input class="input input-bordered w-full max-w-xs" onChange={handleChange} name="username" placeholder={"Username"} required></input>
        <input class="input input-bordered w-full max-w-xs" onChange={handleChange} name="email" placeholder={"Email"} required></input>
        <input class="input input-bordered w-full max-w-xs" onChange={handleChange} name="hashedPassword" type="password" placeholder={"Password"} required></input>
        <button type="submit">Create Account</button>
    </form>

    </>
    )
}