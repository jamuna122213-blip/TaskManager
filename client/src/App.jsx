import {useState} from "react"
import CreateTask from "./components/CreateTask.jsx"

function App(){
  const [activeTab,setActiveTab]=useState("Overview")
  const [showCreateTask,setShowCreateTask] = useState(false)



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

  <div className="mt-auto rounded-2xl bg-white/5 p-4">
  <p className="text-sm text-gray-400">Your focus</p>
  <p className="text-lg font-semibold mt-1">One Task at a time.</p>
  <div className="h-1.5 bg-white/10 rounded-full mt-4">
   <div className="h-full w-2/3 bg-lime-400 rounded-full"/>

  </div>
  </div>
</aside>


<main className="flex-1  min-w-0 p-4 md:p-8">
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

  <section className="mt-10">
    <div className="flex justify-between items-center mb-5">
      <h3 className="text-xl font-semibold">Today's focus</h3>
      <button className="text-sm text-gray-400 hover:text-lime-400">
        View All →
      </button>
    </div>

    <div className="bg-[#1a1b18] border border-white/10 rounded-2xl p-5 flex items-center justify-between">
    <div className="flex items-center gap-4">
      <div className="w-5 h-5 rounded-full border-2 border-lime-400" />
       <div>
        <p className="font-medium">Build the TaskFlow interface</p>
        <p className="text-sm text-gray-500 mt-1">
          Design - Today
        </p>
       </div>
    </div>
     
     <span className="text-xs bg-lime-400/10 text-lime-400 px-3 py-1.5 rounded-full ">
     In Progress
     </span>
    </div>
  </section>

</main>

{showCreateTask && (
  <CreateTask 
  onClose ={() => setShowCreateTask(false)}
  />
)}

</div>
 )
}

export default App