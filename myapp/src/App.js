import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaTrash } from "react-icons/fa";

function App() {
  const [todoList, setTodoList] = useState([]);
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/todos")
      .then((res) => setTodoList(res.data));
  }, []);

  const handleDelete = (index) => {
    setTodoList(todoList.filter((item, i) => i !== index));
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      setTodoList([...todoList, { title: newTask }]);
      setNewTask("");
    }
  };

  return (
    <>
      <h1>Implement A To Do List</h1>
      <div className="todo">
        <ul>
          <h2>To Do List</h2>
          <input
            type="text"
            placeholder="Add a new task"
            value={newTask}
            onChange={(event) => setNewTask(event.target.value)}
            onKeyDown={handleKeyDown}
          />

          {todoList.map((todo, index) => (
            <li key={index}>
              {todo.title}
              <button onClick={() => handleDelete(index)}>
                <FaTrash />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;
