import "./App.css";
import TodoList from "./component/TodoList";
import FormTodo from "./component/FormTodo";

function App() {
  return (
    <div className="App">
      <h1>Todo-list</h1>
      <FormTodo />
      <TodoList />
    </div>
  );
}

export default App;
