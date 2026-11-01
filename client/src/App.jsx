import {useState,useEffect} from "react"
import CreateTask from "./components/CreateTask.jsx"
import Login from "./pages/Login.jsx"
import Register from "./pages/Register.jsx"
import axios from "axios"

function App(){
  const [activeTab,setActiveTab]=useState("Overview")
  const [showCreateTask,setShowCreateTask] = useState(false)
  const [showLogin,setShowLogin] =useState(false)
   const [showRegister,setShowRegister]=useState(false)
   const [user,setUser] = useState(null)
   const [task,setTasks] = useState([])


   useEffect(() => {
    const getUser = async () => {
    try{
      const response = await axios.get(
        "http://localhost:5000/api/auth/me",
        {withCredentials:true}
      )
      setUser(response.data.user)
    }

    catch (error){
      setUser(null)
    }
  }
  getUser()
   },[])


   const fetchTasks = async () => {
    try{
    const response = await axios.get(
  "http://localhost:5000/api/tasks",
    {withCredentials:true}
    )
    setTasks(response.data.tasks)
    }
    catch(error) {
      console.log("Error Fetching tasks",error.response?.data || error.message)
    }
   }

   useEffect(() => {
    fetchTasks()
   },[])
  



   const menueItems = [
    "Overview",
    "My Tasks",
    "Completed",
    "Settings"
   ]
    


   return (

<div className="min-h-screen bg-[#10110f] text-white flex">

<aside className="hidden border-r p-6 border-white/10 md:flex md:w-64 flex-col">

                         
  <h1 className="text-2xl font-bold-r tracking-tight">Task<span className="text-lime-400">Manager</span></h1>
  <p className="text-xs text-gray-500 mt-2">Your Personal WorkSpace</p>

  <nav className="mt-12 space-y-2">
    {
      menueItems.map((item) => (
        <button 
        key={item}
        onClick ={() => setActiveTab(item)}
        className={`w-full text-left px-4 py-2 rounded-xl transition ${
          activeTab === item
          ? "bg-lime-400 text-black font-semibold":
          "text-gray-400 hover:bg-white/5 hover:text-white"}`}
          >
            {item}
          </button>
      ))
    }
  </nav>
  <button onClick ={() => {
    setShowLogin(true)
    setShowRegister(false)
  }}
  
  className="mt-6 w-full rounded-xl border border-white/10 px-4 py-3 
  text-left text-gray-400 hover:bg-white/5 hover:text-lime-400">
    Login
  </button>
 


  <div className="mt-auto rounded-2xl bg-white/5 p-4">
  <p className="text-sm text-gray-400">Your focus</p>
  <p className="text-lg font-semibold mt-1">One Task at a time.</p>
  <div className="h-1.5 bg-white/10 rounded-full mt-4">
   <div className="h-full w-2/3 bg-lime-400 rounded-full"/>

  </div>
  </div>
</aside>


<main className="flex-1  min-w-0 p-4 md:p-8">


  {user && (
    <h2 className="text-xl font-semibold text-pink-600 mt-2 mb-4">
      Hello <span className="text-red-500">{user.username}</span>
    </h2>
  )}



  <header className="flex justify-between items-center">
   <div>
   <p className="text-gray-500text-sm">WorkSpace / {activeTab}</p>
   <h2 className="text-3xl font-bold mt-2">{activeTab}</h2>
   </div>

   <button  
  onClick ={() => { setShowCreateTask(true)}}
   className="bg-lime-400 text-black px-5 py-3 rounded-xl font-semifold hover:bg-lime-300 transition">
    + Add Task
   </button>
  </header>

  <section className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
        <div className="bg-[#1a1b18] border border-white/10 rounded-2xl p-6">
        <p className="text-gray-500 text-xl font-semibold">Total Tasks</p>
        <p className="text-gray-400 font-bold mt-3 text-2xl">24</p>
        <p className="text-lime-400 text-sm mt-3">Tasks in your workspace</p>
        </div>

          <div className="bg-[#1a1b18] border border-white/10 rounded-2xl p-6">
        <p className="text-gray-500 font-semibold text-xl">Completed</p>
        <p className="text-gray-400 font-bold mt-3 text-2xl">4</p>
        <p className="text-lime-400 text-sm mt-3">Keep the momentumn</p>
        </div>

  <div className="bg-[#1a1b18] border border-white/10 rounded-2xl p-6">
        <p className="text-gray-500 text-xl font-semibold">Pending</p>
        <p className="text-gray-400 font-bold mt-3 text-2xl">8</p>
        <p className="text-lime-400 text-sm mt-3">Ready for your focus</p>
        </div>
  </section>

   <section classname="mt-10">
    <div className="flex justify-between items-center mb-5">
      <h3 classname="text-xl font-semibold">My Tasks</h3>
      <span className="text-sm text-gray-400">
        {task.length}tasks
      </span>
    </div>

    <div className="space-y-4">
      {task.length===0 ? (
        <p className="text-gray-400">
           No Tasks Found. Create your first task!
        </p>
        ):
        (
        task.map((item) => (
          <div 
          key={item._id}
          className="bg-[#1a1b18] border border-white/10 rounded-2xl
           p-5 flex items-center justify-between"
          >
            <div >
              <p className="font-medium">{item.title}</p>
              <p className="text-sm text-gray-500 mt-1">
                {item.description}
              </p>

              <p className="text-xs text-gray-500 mt-2">
                Due:{new Date(item.dueDate).toLocaleDateString()}
              </p>
              </div>
              <span
              className={`text-xs px-3 py-1.5 rounded-full ${
                item.completed
                ? "bg-lime-400/10 text-lime-400"
                : "bg-yellow-400/10 text-yellow-400"
              }`}
              >
                {item.completed ? "Completed" : "Pending"}
              </span>
          </div>
      )
      )
    )}
    </div>


   </section>

</main>

{showCreateTask && (
  <CreateTask 
  onClose ={() => setShowCreateTask(false)}
  />
)}

{showLogin && !showRegister && (
  <Login 
  onClose={() => setShowLogin(false)}
  onGoToRegister={() => setShowRegister(true)} 
  onLoginSucess = {(loggedInUser) => setUser(loggedInUser)}
/>
)}

{showRegister && (
  <Register 
  onClose={() => setShowRegister(false)}
  onGoToLogin = {() =>{
    setShowRegister(false)
      setShowLogin(true)}
  }
/>
)}

{showCreateTask && (
  <CreateTask
  onClose={()=>setShowCreateTask(false)}
  onSuccess ={() =>{
    setSuccessMessage("Task created successfully! 🎉")
    setShowCreateTask(false)
    fetchTasks()
  }}
  />

 
)}
</div>
 )
}

export default App