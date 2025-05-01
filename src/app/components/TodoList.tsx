import { Task } from '../types';
import Todec from './Todec';
import React from 'react'

interface TodoListProps {
    todos: Task[];
}

const TodoList = ({todos}: TodoListProps) => {
  return (
    <ul className='space-y-3 '>
        {todos.map((todo) => (
            <Todec key={todo.id} todo={todo} />
        ))}
    </ul>
  )
}

export default TodoList