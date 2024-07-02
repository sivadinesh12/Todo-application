import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenSquare } from "@fortawesome/free-solid-svg-icons"; 
import {faTrash} from '@fortawesome/free-solid-svg-icons'
import './index.css';

const TaskItem = (props) => {
    const { taskDetails , onDeleteTask ,onEditTask} = props;
    const { text , id} = taskDetails;
    const [editmode, setEditMode] = useState(false)
    const [editedText, setEditedText] = useState("")

    const deleteTask = () =>{
        onDeleteTask(id)
    }

    const handleEditTask = () =>{
        setEditMode(true)
    }

    const handleInputChange = event =>{
        setEditedText(event.target.value)
    }

    const cancelEdit = () => {
        setEditMode(false)
    }

    const handleEditText = () =>{
        onEditTask(id,editedText)
        setEditMode(false)
    }
    
    return (
        <li className="task-item">
        {editmode ? (
            <div>
                <input className="edit-input" 
                type="text" 
                value={editedText} 
                onChange={handleInputChange}/>
                <button className="save-btn" onClick={handleEditText}>save</button>
                <button className="cancel-btn" onClick={cancelEdit}>cancel</button>
            </div>) : 
        (
            <>
            <p>{text}</p>
            <div className="icons-container">
                <FontAwesomeIcon icon={faPenSquare} className="icon" onClick={handleEditTask}/>
                <FontAwesomeIcon icon={faTrash} className="icon" onClick={deleteTask}/>
            </div>
            </>
        )}

            
        </li>
    );
};

export default TaskItem;
