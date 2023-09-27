import { useEffect, useState } from "react";

function App() {

  const [task,setTask]=useState('')
  const [addTask,setAddTask]=useState(false)
  const [taskList,setTaskList]=useState([])
  const [taskDone,setDoneTask]=useState([])

  const uniqueId = () => parseInt(Date.now() * Math.random()).toString();

  const addToLocal=()=>{
    localStorage.setItem('tasks',taskList.length?JSON.stringify(taskList):[])
  }

  useEffect(()=>{
    let list=JSON.parse(localStorage.getItem('tasks'))
    if(list)
      setTaskList(list)
  },[])

  const handleAddTask=(e)=>{
    e.preventDefault()
    let taskItem={
      id:uniqueId(),
      name:task,
      done:false
    }
    taskList.push(taskItem)
    addToLocal()
    setAddTask(false)
  }

  const handleDelete=(id)=>{
    let newList=taskList.filter((task)=>task.id!==id)
    console.log(newList)
    if(newList)
      setTaskList(newList)
    else setTaskList([])
    addToLocal()
  }

  const handleTaskDone=(id)=>{
    
    let newlist=taskList.splice(1,)
    setTaskList(newlist)
    addToLocal()
  }

  return (
    <div className="App">
      <div className='header'> 
        TODO LIST
      </div>

      {addTask?<form className="add-task">
        <span className="add-task-header">Add Task</span>

        <div className="field">
          <input 
            placeholder="task name..."
            onChange={(e)=>setTask(e.target.value)}
          />
        </div>

        <button className='button' onClick={handleAddTask}>
          Add Task
        </button>

      </form>:
      <button className="button" onClick={()=>setAddTask(true)}>
        + Add Task
      </button>}

      {taskList.map((item)=>{
        return (
          <div className="task" key={item.id}>
            <span>

              <input type="checkbox" defaultChecked={item.done?'checked':''} onChange={()=>handleTaskDone(item.id)}/>
              {item.name}
              
            </span>
            
            <span>
              <button className="delete-btn" onClick={()=>handleDelete(item.id)}>Delete</button>
            </span>
          </div>
        )
      })}

      

      
    </div>
  );
}

export default App;
