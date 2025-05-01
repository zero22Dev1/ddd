"use client"
import { useState ,useRef, useEffect} from 'react';
import React, {ChangeEvent}  from 'react'
import { Task } from '../types';
import { editTodo,delayte } from '../api';
import { useRouter } from 'next/navigation';

interface TodoProps {
    todo: Task;
}

function Todec({todo}: TodoProps) {



  const ref = useRef<HTMLInputElement>(null);
  const [idEdithing, setIdEdithing] = useState(false);
  const [text, setText] = useState(todo.text);
  const router = useRouter();

  useEffect(() => {
    if (idEdithing) {
      ref.current?.focus();
    }
  }, [idEdithing]);

  const handleEdit = async () => {
    setIdEdithing(true);
  }
  const handleSave = async () => {
    await editTodo(todo.id, text);
    setIdEdithing(false);
    router.refresh();

  }

  const handleDelete = async () => {
    await delayte(todo.id);
    router.refresh();
  }
  return (
    <li key={todo.id} className='flex justify-between p-4 bg-white border-l-4 border-blue-500 rounded-sm shadow-md text-cyan-950'>
   {idEdithing ? 
    <input 
         ref={ref} 
         type="text" className='mr-3 py-1 px-2 rounded border-gray-400 border' value={text} onChange={(e: ChangeEvent<HTMLInputElement>) => setText(e.target.value)}/> 
   :<span className='text-gray-800'>{todo.text}</span>}
    
    <div>
        {idEdithing ? <button className='text-blue-500 mr-3' onClick={handleSave}>Save</button> : <button className='text-green-400 mr-3' onClick={handleEdit}>Edit</button>}
        
        <button className='text-red-500' onClick={handleDelete}>Delete</button>
    </div>
</li>
  )
}

export default Todec;