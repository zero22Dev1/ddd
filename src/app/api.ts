
import { Task } from './types';


export const getAlllTodos = async (): Promise<Task[]> => {
    const res = await fetch('http://localhost:3001/tasks' ,
    { cache: 'no-store',}); //SSR OR SSR
    const todos = await res.json();
    return todos;
};


export const addTodo = async (todo : Task): Promise<Task> => {
    const res = await fetch('http://localhost:3001/tasks', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(todo),
    });
    if (!res.ok) {
        throw new Error('Network response was not ok');
    }
    const newTodos = await res.json();
    return newTodos;
};

export const editTodo = async (id:string, newText: string): Promise<Task> => {
    const res = await fetch(`http://localhost:3001/tasks/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify( {text: newText}),
    });
    if (!res.ok) {
        throw new Error('Network response was not ok');
    }
    const updateText = await res.json();
    return updateText;
};

export const delayte = async (id:string): Promise<Task> => {
    const res = await fetch(`http://localhost:3001/tasks/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },

    });
    if (!res.ok) {
        throw new Error('Network response was not ok');
    }
    const delateText = await res.json();
    return delateText;
};