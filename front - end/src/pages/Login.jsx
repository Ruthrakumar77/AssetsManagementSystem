import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useEffect, useState } from "react";


function Login() {

    const { user, login } = useAuth()
    const navigate = useNavigate()
    const [credentials, setCredentials] = useState({ email: "", password: "" })

    useEffect(() => {
        if (user) {
            setTimeout(() => navigate('/'), 500)
        }
    }, [user])


    async function handleLogin(e) {
        e.preventDefault()
        if (credentials.email && credentials.password) {
            await login(credentials) // wait for the login to complete
        }
    }
    function changeHandler(e) {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    return (
        <>
            <h1 className="text-green-400 text-5xl font-bold text-center mt-10">Login</h1>
            <form className="w-[500px] bg-gray-300 rounded-2xl flex flex-col justify-center items-center m-auto mt-20 py-10 gap-12" onSubmit={handleLogin}>
                <div className="flex gap-20 w-4/5 justify-start items-center">
                    <div>
                        <label htmlFor="email" className="text-xl font-bold">Email</label>
                    </div>
                    <div>
                        <input type="email" id="email" name="email" placeholder="Write your Email" required
                            className="outline-1 rounded-md text-xl flex-1 bg-white p-1"
                            onChange={changeHandler} value={credentials.email} />
                    </div>
                </div>
                <div className="flex gap-10 w-4/5 justify-start items-center">
                    <div>
                        <label htmlFor="password" className="text-xl font-bold">Password</label>
                    </div>
                    <div>
                        <input type="password" id="password" name="password" placeholder="Write your Password" required className="outline-1 rounded-md text-xl flex-1  bg-white p-1" onChange={changeHandler} value={credentials.password} />
                    </div>
                </div>
                <div>
                    <button type="submit" className="py-2 px-20 bg-emerald-600 text-white text-2xl rounded-2xl">Login</button>
                </div>
            </form>
        </>
    )
}
export default Login
