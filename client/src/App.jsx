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
   const [search,setSearch] = useState("")
  const [filter,setFilter] = useState("All")
  const [editingTask,setEditingTask] = useState(null)

   const totalTasks = task.length
   
   const filteredTasks = task.filter((item) => 
      {
        const matchSearch = item.title.
        toLowerCase().
        includes(search.toLowerCase())

        const matchFilter =
        filter === "All" || 
        (filter === "Completed" && item.completed) ||
        (filter === "Pending" && !item.completed)

        return matchSearch && matchFilter
      })
  const displayTasks = 
       activeTab === "Completed"?
       filteredTasks.filter((item) => item.completed):
       filteredTasks


   const completedTasks = task.filter(
          (item) => item.completed
        ).length

   const pendingTasks = task.filter(
            (item) => !item.completed
          ).length

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
  

const handleLoginSuccess= async () => {
          try{
          const response = await axios.get(
            "http://localhost:5000/api/auth/me",
            {withCredentials:true}
          )
          setUser(response.data.user)
          await fetchTasks()
          }
          catch (error){
            console.log("Erro loading user:",error.message)
          }
        }


        const menueItems = [
          "Overview",
          "My Tasks",
          "Completed",
          "Settings"
        ]
    
const handleToggleTask = async (id) => {
          try{
            await axios.patch(
              `http://localhost:5000/api/tasks/${id}/toggle`,
              {},
              {withCredentials:true}
            )

            fetchTasks()
          }
          catch (error){
            console.log(error.response?.data || error.message)
          }
        }
const handleDeleteTask = async (id) => {
      try{
        await axios.delete(
          `http://localhost:5000/api/tasks/${id}`,
          {withCredentials:true}
        )
        fetchTasks()
      }
      catch(error){
        console.log(error.response?.data || error.message)
      }
    }

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


{activeTab === "Overview" && (
  <section className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
        <div className="bg-[#1a1b18] border border-white/10 rounded-2xl p-6">
        <p className="text-gray-500 text-xl font-semibold">Total Tasks</p>
        <p className="text-gray-400 font-bold mt-3 text-2xl">{totalTasks}</p>
        <p className="text-lime-400 text-sm mt-3">Tasks in your workspace</p>
        </div>

          <div className="bg-[#1a1b18] border border-white/10 rounded-2xl p-6">
        <p className="text-gray-500 font-semibold text-xl">Completed</p>
        <p className="text-gray-400 font-bold mt-3 text-2xl">{completedTasks}</p>
        <p className="text-lime-400 text-sm mt-3">Keep the momentumn</p>
        </div>

  <div className="bg-[#1a1b18] border border-white/10 rounded-2xl p-6">
        <p className="text-gray-500 text-xl font-semibold">Pending</p>
        <p className="text-gray-400 font-bold mt-3 text-2xl">{pendingTasks}</p>
        <p className="text-lime-400 text-sm mt-3">Ready for your focus</p>
        </div>
  </section> 
)}
  

{activeTab ==="Settings" ? (
  <section className="mt-10 rounded-2xl border-white/10 bg-[#1a1b18] p-6">
    <h3 className="text-xl font-semibold">Settings</h3>
    <p className="mt-3 text-gray-400">
      Manage your TaskFlow Account and preferences
    </p>
    <p classname="mt-4 text-sm text-gray-500">
      Loggesd in as : {user?.username || "Guest"}
    </p>
  </section>
):(
<section className="mt-10">
    <div className="flex justify-between items-center mb-5">
      <h3 className="text-xl font-semibold">
        {activeTab === "Completed" ? "Completed Tasks" : "My Tasks"}
      </h3>
      <span className="text-sm text-gray-400">
        {displayTasks.length} tasks
      </span>
    </div>

    <input 
    type="text"
    placeholder="Search tasks..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    className="w-full mb-4 rounded-xl
     bg-[#1a1b18] border border-white/10 p-3 text-white " />

    <div className="flex gap-3 mb-5">
      {["All","Completed","Pending"].map((item) => (
        <button 
        key={item}
        onClick = {()=>setFilter(item)}
        className={`px-4 py-3 rounded-xl tgext-sm ${
          filter === item 
          ? 
          "bg-lime-400 text-black"
          :"bg-white/5 text-gray-4000"
        }`}
        >
          {item}
        </button>
      ))}
    </div>

    <div className="space-y-4">
      {displayTasks.length===0 ? (
        <p className="text-gray-400">
           No Tasks Found. Create your first task!
        </p>
        ):
        (
        displayTasks.map((item) => (
          <div 
          key={item._id}
          className="bg-[#1a1b18] border border-white/10 rounded-2xl
           p-5 flex items-center justify-between"
          >
            <div >
              <p className="font-medium text-lg ">{item.title}</p>
              <p className="p-5 text-sm text-gray-500 mt-1">
                {item.description}
              </p>

              <p className="text-xs text-gray-500 mt-2">
                Due:{new Date(item.dueDate).toLocaleDateString()}
              </p>
              </div>
              <div className="flex flex-col gap-3" >
              <span
              className={`text-xs px-3 py-1.5 rounded-full ${
                item.completed
                ? "bg-lime-400/10 text-lime-400"
                : "bg-yellow-400/10 text-yellow-400"
              }`}
              >
                {item.completed ? "Completed" : "Pending"}
              </span>
              <button 
              onClick={() => handleToggleTask(item._id)}
                className="rounded-lg bg-lime-400 px-1 py-1 text-black">
                  {item.completed ? "Undo" : "Complete"}
                </button>
                <button 
                 onClick = {() => handleDeleteTask(item._id)}
                 className="rounded-lg  bg-red-500 px-3 py-2 text-white"
                >Delete</button>
                <button onClick = {() => {
                  setEditingTask(item)
                  setShowCreateTask(true)
                }}
                className="rounded-lg bg-blue-500 px-2 py-2 text-white"
                >
                 Edit
                 </button>
                </div>

          </div>
      )
      )
    )}
    </div>


   </section>
)}
   

</main>


{showLogin && !showRegister && (
  <Login 
  onClose={() => setShowLogin(false)}
  onGoToRegister={() => setShowRegister(true)} 
  onLoginSucess = {handleLoginSuccess}
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
  taskToEdit={editingTask}
  onClose={()=>{setShowCreateTask(false)
    setEditingTask(null)}
  }

  onSuccess ={() =>{
    setShowCreateTask(false)
    fetchTasks()
     setEditingTask(null)
  }}
  />

 
)}
</div>
 )
}

export default App