import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";

const styles = {
  color: "black"
};

let id = 0;

const Todo = props => {
  return (
    <li>
      <input
        type="checkbox"
        checked={props.task.checked}
        onChange={props.onToggle}
      />
      <button onClick={props.onDelete}>Delete</button>
      <span>{props.task.text}</span>
    </li>
  );
};

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      todos: []
    };
  }

  addTodo() {
    const text = prompt("Enter a task");

    this.setState({
      todos: [
        ...this.state.todos,
        {
          id: id++,
          text: text,
          checked: false
        }
      ]
    });

    console.log(this.state.todos);
  }

  removeTodo(id) {
    this.setState({
      todos: this.state.todos.filter(todo => {
        return todo.id !== id;
      })
    });
  }

  toggleTodo(id) {
    this.setState({
      todos: this.state.todos.map(todo => {
        if (todo.id === id) {
          todo.checked = !todo.checked;

          return todo;
        }

        return todo;
      })
    });
  }

  render() {
    const total_tasks = this.state.todos.length;
    const done_tasks = this.state.todos.filter(todo => {
      return todo.checked;
    }).length;

    return (
      <div className="App" style={styles}>
        <h1>Todo App</h1>

        <h3>
          Task {done_tasks}/{total_tasks}{" "}
        </h3>

        <button onClick={() => this.addTodo()}>Add Todo</button>

        <ul>
          {this.state.todos.map(todo => (
            <Todo
              task={todo}
              onDelete={() => this.removeTodo(todo.id)}
              onToggle={() => this.toggleTodo(todo.id)}
            />
          ))}
        </ul>
      </div>
    );
  }
}

const rootElement = document.getElementById("root");

ReactDOM.render(<App />, rootElement);
