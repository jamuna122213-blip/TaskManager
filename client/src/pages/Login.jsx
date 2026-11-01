import {useState} from "react"
import axios from "axios"
import { API_URL } from "../config"

function Login({onClose,onGoToRegister,onLoginSucess}) {

 const [email,setEmail] = useState("")
 const [password,setPassword] = useState("")
 const [error,setError] = useState("")


 const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    try{
        const response = await axios.post(
                 `${API_URL}/api/auth/login`,
         {
            email,password
         },
         {
            withCredentials:true
        }
        )
        console.log("Login sucess",response.data)
        onLoginSucess(response.data.user)
        onClose()
    }
    catch (err){
        setError(
            err.response?.data?.message || "Login Failed,Please Try Again"
        )
    }
 }


    return (
        <div className=" fixed inset-0 z-50 min-h-scren bg-[#10110f] flex items-center justify-center p-4 text-white ">
        <div className="w-full max-w-md rounded-2xl border border-white/10 bg-[#1a1b18] p-8">
        <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">
            Task<span className="text-lim-400">Manager</span>
        </h1>
        <span 
        onClick = {onClose}
      >X</span>

        </div>
      

        <p className="mt-4 text gray-400">
            Welcomne back!
            Sign in to continue
        </p>
        
        {error && (
            <p className="mt-4 rounded-lg border-red-500/20 bg-red-500/10 p-3 text-sm text-red-400">
                {error}
            </p>
        )}
        
        <form 
        onSubmit = {handleSubmit}
        className="mt-8 space-y-5">
            <div>
                <label className="mb-2 block text-lg text-gray-400">
                    Email
                </label>
                <input 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder = "Enter Your email"
                className="w-full rounded-xl border border-white/10
                 bg-[#0b0b12] px-4 py-3 text-white outline-none focus:border-lime-400 "
                />
            </div>

             <div>
                <label className="mb-2 block text-lg text-gray-400">
                    Password
                </label>
                <input 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder = "Enter Your Password"
                className="w-full rounded-xl border border-white/10
                 bg-[#0b0b12] px-4 py-3 text-white outline-none focus:border-lime-400 "
                />
            </div>

            <button 
            type="submit"
            className="mt-6 text-center text-black text-lg p-2 rounded-lg bg-blue-400 ">
                Sign In
            </button>
            <p className="mt-6 text-center text-lg text-gray-400">
                Don't have an account?{" "}
                <span className="cursor-pointer text-lime-400 hover:underline"
                onClick = {onGoToRegister}
                >
                    Register
                </span>
            </p>

        </form>
        </div>
        </div>
    )
}

export default Login