import React from "react";

function TodoTable(props) {
    const { todos, handleDelete } = props;

  return (
    <>
      <table>
        <tr>
          <th>Description</th>
          <th>Priority</th>
          <th>Date</th>
        </tr>
        <tbody>
          {todos.map((todo, index) => (
            <tr key={index}>
              <td>{todo.description}</td>
              <td>{todo.priority}</td>
              <td>{todo.date}</td>
              <td>
                <button onClick={() => handleDelete(index)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default TodoTable;
