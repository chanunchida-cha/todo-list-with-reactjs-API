import React, { useState, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { store } from "./Store";

//store.loadAllPost()

const TodoList = observer(() => {
  const [editNote, setEditNote] = useState(null);
  useEffect(() => {
    store.loadAllTask();
  }, []);

  function onEditeTaskValueChange(event) {
    const { name, value } = event.target;
    setEditNote((prevNote) => {
      return {
        ...prevNote,
        [name]: value,
      };
    });
  }

  function updateTask(event) {
    event.preventDefault();
    store.posts.map((post) => {
      if (post.id !== editNote.id) return post;
      return store.updateTask(post.id, editNote);
    });
    setEditNote(null);
  }

  let editeNoteElement = null;
  if (!!editNote) {
    editeNoteElement = (
      <div>
        <div>
          <form onSubmit={updateTask}>
            <input
              type="text"
              placeholder="add your new todo..."
              name="task"
              value={editNote.task}
              onChange={onEditeTaskValueChange}
            />
            <button type="submit">update</button>
            <button
              onClick={() => {
                setEditNote(null);
              }}
            >
              cancel
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <center>
      <div className="checkbox">
        <ul>
          {store.posts.map((item) => {
            const deleteTask = () => {
              store.deleteTask(item.id);
            };
            return (
              <div key={item.id}>
                <label htmlFor={item.id} className={item.task ? "true" : ""}>
                  <input
                    type="checkbox"
                    checked={item.done}
                    id={item.id}
                    onClick={() => {
                      store.checkTask(item.id);
                    }}
                    
                  />

                  {item.task}
                </label>
                <button
                  onClick={() => {
                    setEditNote(item);
                  }}
                >
                  Edit
                </button>
                <button onClick={deleteTask}>Delete</button>
              </div>
            );
          })}
        </ul>
      </div>
      <div>{editeNoteElement}</div>
    </center>
  );
});

export default TodoList;
