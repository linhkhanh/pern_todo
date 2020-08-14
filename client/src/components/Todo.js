import React, { useState, Fragment } from 'react'

const Todo = (props) => {
    const [editState, setEditState] = useState({editing:false})

    const {editing} = editState

    const [editForm, setEditFormData] = useState({
        description: props.todo.description
    })

    const todoDescription = editForm.description

    const handleEditChange = e =>{
        setEditFormData({
            ...editForm, description: e.target.value
        })
    }

    const enableEdit = () => {
        setEditState({
            editing: true
        },[])
    }

    const disableEdit = () => {
        setEditState({
            editing: false
        },[])
    }

    const handleEditSubmit = async(e) =>{
        e.preventDefault()
        try{
            const body = editForm 
            // console.log(body);
            const response = await fetch (`http://localhost:5000/todos/${props.todo.todo_id}`,{
                method: "PUT",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            })
            props.getTodos();
            setEditState({
                editing:false
            })

        } catch (err){
            console.err(err.message)
        }
    }

    return (
        <Fragment>
            <td>
                {editing? 
                <form>
                    <input
                        value ={todoDescription}
                        onChange = {handleEditChange}
                    />
                </form>:<h4>{props.todo.description}</h4>
                }
            </td>
            <td>
                {editing ? 
                <div>
                    <button onClick={handleEditSubmit}>submit</button>
                    <button onClick={disableEdit}>cancel</button>
                </div>
                :<button onClick={enableEdit}>edit</button>    
            }
            </td>
            <td>
                <button 
                    onClick={()=>props.deleteTodo(props.todo.todo_id)}
                >
                    Delete
                </button>
            </td>
        </Fragment>
    )
}

export default Todo
