import React, { useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { getTodo, addTodo, updateTodo, deleteTodo } from "../hooks";
import { FaCircleNotch, FaTrash, FaUpload } from "react-icons/fa";
import { useState } from "react";

const TodoList = () => {
  const queryClient = useQueryClient();
  const [newTodo, setNewTodo] = useState("");
  const [newTitle, setNewTitle] = useState({ title: "" });

  // useEffect(() => {
  //   if (todos) {
  //     setNewTitle({title: todos.title});
  //   }
  //  }, [todos])

  const {
    data: todos,
    isLoading,
    isError,
    error,
  } = useQuery("todos", getTodo, {
    retry: 1,
    select: (data) => data.sort((a, b) => b.id - a.id),
  });

  //  console.log(todos);

  const addTodoMutation = useMutation(addTodo, {
    onSuccess: () => {
      // Invalidate the cache and refetch the data
      queryClient.invalidateQueries("todos");
    },
  });

  const updateTodoMutation = useMutation(updateTodo, {
    onSuccess: () => {
      // Invalidate the cache and refetch the data
      queryClient.invalidateQueries("todos");
    },
  });

  const deleteTodoMutation = useMutation(deleteTodo, {
    onSuccess: () => {
      // Invalidate the cache and refetch the data
      queryClient.invalidateQueries("todos");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    addTodoMutation.mutate({ userId: 1, title: newTodo, completed: false });
    setNewTodo("");
  };

  const newItemsSection = (
    <form onSubmit={handleSubmit}>
      <label htmlFor="new-todo">Enter a new todo item</label>
      <input
        type="text"
        id="new-todo"
        value={newTodo}
        placeholder="Enter new todo"
        onChange={(e) => setNewTodo(e.target.value)}
      />
      <button type="submit">
        <FaUpload />
      </button>
    </form>
  );

  let content;
  if (isLoading) {
    content = <FaCircleNotch className="spinner" />;
  }

  if (isError) {
    content = <p>Error: {error.message}</p>;
  }

  if (todos) {
    content = todos.map((todo) => {
      return (
        <article key={todo.id}>
          <div className="todo">
            <input
              type="checkbox"
              checked={todo.completed}
              id={todo.id}
              onChange={() =>
                updateTodoMutation.mutate({
                  ...todo,
                  completed: !todo.completed,
                })
              }
            />
            <input
              htmlFor={todo.id}
              value={todo.title}
              onChange={(e) =>
                updateTodoMutation.mutate({
                  ...todo,
                  title: e.target.value,
                })
              }
            />
          </div>
          <button
            className="trash"
            onClick={() => deleteTodoMutation.mutate({ id: todo.id })}
          >
            <FaTrash />
          </button>
        </article>
      );
    });
  }

  return (
    <>
      <main>
        <h1>Todo List</h1>
        {newItemsSection}
        {content}
      </main>
    </>
  );
};

export default TodoList;
