// please convert this to react code to react-query:
import { client } from "../helpers";

export const getTodo = async () => { 
    const response = await client.get("/todos");
    return response.data;
}

export const addTodo = async (todo) => { 
    const response = await client.post("/todos", todo);
    return response.data;
}

export const updateTodo = async (todo) => { 
    const response = await client.patch(`/todos/${todo.id}`, todo);
    return response.data;
}

export const deleteTodo = async ({id}) => { 
    const response = await client.delete(`/todos/${id}`, id);
    return response.data;
}