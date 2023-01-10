import React, { useState } from 'react';
import './App.css';

function App() {
  const [ todo, setTodo ] = useState("")
  const [ todoArr, setTodoArr] = useState([])

  const handleSubmit = (e) => {
    e.preventDefault();

    if (todo.length === 0){
      return;
    }
    const todoObj = {
      todo,
      completed: false,
      id: Math.floor(Math.random() * 10000000)
    }
    setTodoArr([...todoArr, todoObj]);
    setTodo("")
  }

  const handleDelete = (id) => {
    let remainingItems = todoArr.filter((todoObj) => todoObj.id !== id);
    setTodoArr(remainingItems)
  }

  const handleToggleComplete = (id) => {
    const updatedTodos = todoArr.map((todo, i) => {
      if (id === i) {
        const updatedToDo = {...todo, completed: !todo.completed }
        return updatedToDo
      }
      return todo
    })
    setTodoArr(updatedTodos)
  }

  return (
    <div className="App">
    <form onSubmit={ handleSubmit }>
      <label>To Do Item: </label>
      <input 
          type="text" 
          name="todo" 
          value={ todo }
          onChange={(e) => setTodo(e.target.value)} 
      />
      <button type="submit">Add To Do Item</button>
    </form>
    <h1>All To Do Items</h1>
    {
      todoArr.map((item, i) => (
        <div key={i}>
          <input 
            type="checkbox"
            onChange={(e) => {
            handleToggleComplete(i)}} 
            checked={item.completed} />
          <span>{ item.todo }</span>
          <span>{ item.completed }</span>
          <span>
            <button onClick={() => handleDelete(item.id)} 
            style={{backgroundColor:"blue", color:"white"}}>Delete
            </button>
          </span>
          <hr></hr>
        </div>))
    }
    </div>
  );
}

export default App;
