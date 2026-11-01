import {useState} from "react"
import axios from "axios"

function CreateTask({ onClose ,onSuccess}){
  const [title,setTitle] =useState("") 
  const [description,setDescription] =useState("")
  const [dueDate,setDueDate] =useState("")
  const [success,setSuccess] = useState("")


   const handleSubmit = async (e) => {
    e.preventDefault()
    
    console.log("form submitted",{title,description,dueDate})
    try{
        const response = await axios.post(
            "http://localhost:5000/api/tasks",
            {
                title,
                description,
                dueDate
            },{
                withCredentials:true
            }
        )

        setSuccess("Task Created Successfully! 🎉")
        console.log("Task created", response.status, response.data)
        setTimeout(()=>{
        onClose()
        },1400)
        onSuccess()
    }
    catch (error){
     console.log("Error creating task:",error.response?.data || error.message)
    }
   }                        





    return (
  
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
            <div className="w-full max-w-lg rounded-2xl border border-white/10 bg-[#171722] p-6">
            <div className="mb-6 flex items-center justify-between">
                <h2 className="text-xl font-semibold text-white">
                    Create Task
                </h2>
                <button 
                onClick = {onClose}
                className="rounded-lg px-3 py-1 text-gray-400 hover:bg-white/10 hover:text-white">
                    ✕
                </button>
            </div>
             {
                success && 
                <p className="mt-3 mb-3 text-sm font-medium text-lime-400">
                    {success}
                </p>
             }
             <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                    <label className="mb-2 block text-sm text-gray-400">
                        Task Title
                    </label>

                  <input 
                  value = {title}
                  onChange = {(e) => setTitle(e.target.value)}
                  type="text"
                  placeholder="what need to be done ?"
                  className="w-full rounded-xl 
                   border border-white/10 bg-[#0b0b12] 
                   px-4 py-3 text-white outline-none
                    focus:border-lime-400" />
                </div>

                <div>
                    <label className="mb-2 block text-sm text-gray-400">
                        Description
                    </label>

                  <textarea
                  value={description}
                  onChange = {(e) => setDescription(e.target.value)}
                  type="text"
                  placeholder="Add some details"
                  className="w-full rounded-xl h-20
                   border border-white/10 bg-[#0b0b12] 
                   px-4 py-3 text-white outline-none
                    focus:border-lime-400" />
                </div>

                <div>
                    <label className="mb-2 block text-sm text-gray-400">
                        Due Date
                    </label>

                  <input 
                  value={dueDate}
                  onChange = {(e)=>setDueDate(e.target.value)}
                  type="date"
                  placeholder="what need to be done ?"
                  className="w-full rounded-xl 
                   border border-white/10 bg-[#0b0b12] 
                   px-4 py-3 text-white outline-none
                    focus:border-lime-400
                    [color-scheme:dark]" />
                </div>

                <div className="flex justify-end gap-3 pt-2">
                    <button 
                    type="button"
                    onClick={onClose}
                    className="rounded-xl px-4 py-3 text-gray-400 hover:bg-white/10"
                    >
                        Cancel
                    </button>

                    <button 
                    type="submit"
                    className="rounded-xl bg-lime-400 px-5 py-3
                     font-semibold text-black
                      hover:bg-lime-300">
                        Create Task
                    </button>

                </div>
             </form>




            </div>

        </div>



    )
}

export default CreateTask