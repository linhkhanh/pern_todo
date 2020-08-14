import React, {Fragment, useState} from 'react'

const InputTodo = () => {
    const [description, setDescription] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const body = { description };
            await fetch('http://localhost:5000/todos', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(body)
            })
            window.location = '/'

        }catch (err){
            console.error(err.message)
        }
    }

    return (
        <Fragment>
            <h1>PERN Todo List</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type='text'
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                />
                <button>Add</button>
            </form>
        </Fragment>
    )
}

export default InputTodo
