import React, { Fragment, useEffect, useState } from 'react'
import Todo from './Todo'

const ListTodos = () => {

    const [todos, setTodos] = useState([])

    const deleteTodo = async (id) =>{
        try{
            await fetch(`http://localhost:5000/todos/${id}`, {
                method: 'DELETE'
            });

            setTodos(todos.filter(todo => todo.todo_id !==id))

        } catch (err){
            console.error(err.message)
        }
    }

    const getTodos = async () => {
        try{
            const response = await fetch('http://localhost:5000/todos')
            const jsonData = await response.json();
            setTodos(jsonData)
            
        } catch (err){
            console.error(err.message)
        }
    }

    useEffect(()=>{
        getTodos()
    }, [])

    return (
        <Fragment>
            <table>
                <thead>
                    <tr>
                        <th>Description</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {todos.map(todo =>(
                        <tr key={todo.todo_id}>
                            <Todo todo={todo} deleteTodo={deleteTodo} getTodos={getTodos} />
                        </tr>
                    ))}
                </tbody>
            </table>
        </Fragment>
    )
}

export default ListTodos
