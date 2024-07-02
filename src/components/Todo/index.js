import { useEffect, useState} from "react"
import { v4 as uuidv4 } from 'uuid';
import TaskItem from "../TaskItem"
import './index.css'

const Todo = () =>{
    const [userInput, setUserInput] = useState("")
    const [tasks,setTasks] = useState([])    

    const setValue = event =>{
        setUserInput(event.target.value)
    }

    useEffect(()=>{
        const storedTasks = JSON.parse(localStorage.getItem("tasks"))
        if (storedTasks) {
            setTasks(storedTasks)
        }
    },[])

    const addTasks = () => {
        if (userInput.trim()) {
            const newTask = { id: uuidv4(), text: userInput };
            setTasks([...tasks, newTask]);
            localStorage.setItem("tasks", JSON.stringify([...tasks, newTask]));
            setUserInput("");
        }
    };
    
    const deleteTask = id =>{
        const filteredTasks = tasks.filter(each => each.id !== id )
        setTasks(filteredTasks)
        localStorage.setItem('tasks',JSON.stringify(filteredTasks))
    }

    const editTask = (id,editedText) => {
        const updatedTasks = tasks.map(each => {
            if (each.id === id) {
                return {...tasks,text: editedText}
            }
            return tasks
        })
        setTasks(updatedTasks)
        localStorage.setItem('tasks', JSON.stringify(updatedTasks))
    }

    return (
        <div className="bg-container">
            <h1 className="heading">Todos</h1>
            <div>
                <h1 className="task"><span className="create">Create</span> Task</h1>
            <div className="input-container">
                <input onChange={setValue} className="task-input"type="input" placeholder="What needs to be done?" value={userInput}/>
                <button className="add-btn" onClick={addTasks}>Add</button>
            </div>
            <h1 className="tasks-heading">Tasks</h1>
            <ul className="list-container">
                {tasks.map(eachItem => (
                    <TaskItem key={eachItem.id} taskDetails={eachItem} onDeleteTask = {deleteTask} onEditTask={editTask}/>
                ))}
            </ul>
            </div>
        </div>
    )

}
    

export default Todo