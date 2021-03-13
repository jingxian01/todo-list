import React, { useState, useEffect } from "react";
import { BiEdit } from "react-icons/bi";
import { CgRemoveR } from "react-icons/cg";

import "./App.css";

function App() {
  const [todo, setTodo] = useState("");
  const [todoList, setTodoList] = useState([]);
  const [edit, setEdit] = useState({ id: null, text: "" });

  useEffect(() => {
    const temp = localStorage.getItem("todoList");
    const loadedTodoList = JSON.parse(temp);

    if (loadedTodoList) {
      setTodoList(loadedTodoList);
    }
  }, []);

  useEffect(() => {
    const temp = JSON.stringify(todoList);
    localStorage.setItem("todoList", temp);
  }, [todoList, edit]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!todo || /^\s*$/.test(todo)) {
      return;
    }

    const newTodo = {
      id: new Date().getTime().toString(),
      text: todo,
      isComplete: false,
    };
    setTodoList((todoList) => [...todoList, newTodo]);
    setTodo("");
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();

    if (!edit.text || /^\s*$/.test(edit.text)) {
      return;
    }

    todoList.map((todo) => {
      if (todo.id === edit.id) {
        todo.text = edit.text;
      }
      setEdit({ id: null, text: "" });
      return todo;
    });
  };

  const completeTodo = (id) => {
    const newTodoList = todoList.map((todo) => {
      if (todo.id === id) {
        todo.isComplete = !todo.isComplete;
      }
      return todo;
    });
    setTodoList(newTodoList);
  };

  const removeTodo = (id) => {
    const newTodoList = todoList.filter((todo) => todo.id !== id);
    setTodoList(newTodoList);
  };

  return (
    <section className="todo-app">
      <h1>To-do List</h1>
      <p>what is the plan for today?</p>
      {edit.id ? (
        <form onSubmit={handleEditSubmit} className="todo-form">
          <div>
            <input
              type="text"
              value={edit.text}
              onChange={(e) => setEdit({ ...edit, text: e.target.value })}
              className="todo-input edit"
            />
            <button type="submit" className="todo-button edit">
              update
            </button>
          </div>
        </form>
      ) : (
        <form onSubmit={handleSubmit} className="todo-form">
          <div>
            <input
              type="text"
              value={todo}
              onChange={(e) => setTodo(e.target.value)}
              className="todo-input"
            />
            <button type="submit" className="todo-button">
              add
            </button>
          </div>
        </form>
      )}

      {todoList.map((todo) => {
        const { id, text, isComplete } = todo;
        return (
          <div
            key={id}
            className={isComplete ? "todo-item complete" : "todo-item"}
          >
            <div onClick={() => completeTodo(id)} className="todo-text">
              {text}
            </div>
            <div className="icons">
              <BiEdit
                onClick={() => setEdit({ id: id, text: text })}
                className="edit-icon"
              />
              <CgRemoveR
                onClick={() => {
                  removeTodo(id);
                }}
                className="remove-icon"
              />
            </div>
          </div>
        );
      })}
    </section>
  );
}

export default App;
