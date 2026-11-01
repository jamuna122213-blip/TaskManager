import {useState} from "react"
import axios from "axios"

function Register({onClose,onGoToLogin}){



     const [name,setName] = useState("")
     const [email,setEmail]=useState("")
     const [password,setPassword] = useState("")
     const [error,setError] = useState("")

     
    
     const handleSubmit = async (e) => {
        e.preventDefault()
        setError("")

        try{
            const response = await axios.post(
                "http://localhost:5000/api/auth/register",
                {   
                    username:name,
                    email,
                    password

                }
            )
         
            console.log("register successfull")
            onGoToLogin()
        }
        catch (error){
            setError(
                error.response?.data?.message || "registration failed"
            )
        }
     }
    

    return (
        <div className="fixed inset-0 z-50 bg-[#10110f] min-h-screen flex items-center justify-center">
        <div className=" w-full max-w-md rounded-2xl border border-white/10 bg-[#1a1b18] p-8">
            <div className="mb-6 flex items-center justify-between">
                <h1 className="text-3xl font-bold">
                    Task<span className="text-lime-400">Manager</span>
                </h1>
                
                <button onClick={onClose}
                className="text-gray hover:text-white"
                >
                  ✕  
                </button>
            </div>
              

            {error && (
                <p className="mt-4 rounded-lg border-red-500/20 bg-red-500/10 p-3 text-sm text-red-400">{error}</p>
            )}

            <p className="text-gray-400 text-lg">
                Create your Account to get started
            </p>

            <form 
            onSubmit = {handleSubmit}
            className="mt-8 space-y-6">
                <div>
                    <label className="mb-2 block text-sm text-gray-400">
                        Name
                    </label>
                    <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    type="text"
                    placeholder = "Enter your Name"
                    className="w-full rounded-xl border-white/10
                     bg-[#0b0b12] px-4 py-3 text-white outline-none
                      focus:border-lime-400" />
                </div>
                 
                  
                 <div>
                    <label className="mb-2 block text-sm text-gray-400">
                        Email
                    </label>
                    <input
                    value={email}
                    onChange={(e) =>setEmail(e.target.value)}
                    type="email"
                    placeholder = "Enter your Email"
                    className="w-full rounded-xl border-white/10
                     bg-[#0b0b12] px-4 py-3 text-white outline-none
                      focus:border-lime-400" />
                </div>

                 <div>
                    <label className="mb-2 block text-sm text-gray-400">
                        Password
                    </label>                   
                   <input
                   value={password}
                   onChange={(e) =>setPassword(e.target.value)}
                    type="password"
                    placeholder = "Enter your Name"
                    className="w-full rounded-xl border-white/10
                     bg-[#0b0b12] px-4 py-3 text-white outline-none
                      focus:border-lime-400" />
                </div>

                <button 
                type="submit"
                className="w-full rounded-xl bg-lime-400 py-3
                 font-semibold text-black hover:bg-lime-300"
                 >
                    Create Account
                 </button>

                 <p className="mt-6 text-center text-sm text-gray-400">
                    Already Have an Account?{" "}
                    <button 
                    type="button"
                    onClick ={onGoToLogin}
                    className="text-lime-400 hover:underline"
                    >Login</button>
                 </p>



            </form>
        </div>
        </div>
    )
}

export  default Register