import { useRef, useState } from "react";
import TodoTable from "../TodoTable";
import { AgGridReact } from "ag-grid-react";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css"; // Material Design theme

export default function TodoList() {
  const [todo, setTodo] = useState({
    description: "",
    date: "",
    priority: "",
  });
  const [todos, setTodos] = useState([]);
  const gridRef = useRef();

  const [columnDefs, setColumnDefs] = useState([
    {
      field: "description",
      sortable: false,
      filter: true,
      floatingFilter: true,
    },
    {
      field: "priority",
      filter: true,
      floatingFilter: true,
      cellStyle: (params) =>
        params.value === "High" ? { color: "red" } : { color: "black" },
    },
    { field: "date", filter: true, floatingFilter: true },
  ]);

  const handleClick = () => {
    if (todo.description && todo.date) {
      setTodos([...todos, todo]);
      setTodo({ description: "", date: "", priority: "" });
    } else {
      alert("Type a description, priority and date first!");
    }
  };

  const handleDelete = () => {
    if (gridRef.current.getSelectedNodes().length > 0) {
      setTodos(
        todos.filter(
          (todo, index) => index != gridRef.current.getSelectedNodes()[0].id
        )
      );
    } else {
      alert("Select a row first!");
    }
  };

  return (
    <>
      <input
        placeholder="Description"
        value={todo.description}
        onChange={(e) => setTodo({ ...todo, description: e.target.value })}
      />
      <input
        placeholder="Priority"
        value={todo.priority}
        onChange={(e) => setTodo({ ...todo, priority: e.target.value })}
      />
      <input
        placeholder="Date"
        type="date"
        value={todo.date}
        onChange={(e) => setTodo({ ...todo, date: e.target.value })}
      />
      <button onClick={handleClick}>Add Todo</button>
      <button onClick={() => handleDelete()}>Delete</button>
      <div className="ag-theme-material" style={{ width: 700, height: 500 }}>
        <AgGridReact
          ref={gridRef}
          onGridReady={(params) => (gridRef.current = params.api)}
          rowData={todos}
          columnDefs={columnDefs}
          rowSelection="single"
          animateRows={true}
        />
      </div>
    </>
  );
}
