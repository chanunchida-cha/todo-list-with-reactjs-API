import React, { useState } from "react";
import { store } from "./Store";
import { observer } from "mobx-react-lite";

const FormTodo = observer(() => {
  const [task, setTask] = useState("");

  function onTaskValueChange(event) {
    setTask(event.target.value);
  }

  const saveTask = (event) => {
    event.preventDefault();
    const itemTask = task;
    store.createTask(itemTask);
    setTask("");
  };

  // const postTask = () => {
  //   axios.post("http://34.124.220.187", task);
  // };

  return (
    <div>
      <form onSubmit={saveTask}>
        <input
          type="text"
          placeholder="add your new todo..."
          name="task"
          onChange={onTaskValueChange}
          value={task}
        />
        <button type="submit">Add</button>
      </form>
    </div>
  );
});

export default FormTodo;
