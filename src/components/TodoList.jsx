import { useState } from "react";
import TodoTable from "../TodoTable";

export default function TodoList() {
  const [todo, setTodo] = useState({
    description: "",
    date: "",
  });
  const [todos, setTodos] = useState([]);

  const handleClick = () => {
    if (todo.description && todo.date) {
      setTodos([...todos, todo]);
      setTodo({ description: "", date: "" });
    } else {
      alert("Type a description and date first!");
    }
  };

  const handleDelete = (index) => {
    setTodos(todos.filter((todo, i) => i !== index));
  };

  return (
    <>
      <tr>
        <th>Description</th>
        <input
          placeholder="Description"
          value={todo.description}
          onChange={(e) => setTodo({ ...todo, description: e.target.value })}
        />
        <th>Date</th>
        <input
          placeholder="Date"
          value={todo.date}
          onChange={(e) => setTodo({ ...todo, date: e.target.value })}
        />
        <button onClick={handleClick}>Add Todo</button>
      </tr>
      <TodoTable todos={todos} handleDelete={handleDelete} />
    </>
  );
}
