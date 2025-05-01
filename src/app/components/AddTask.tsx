"use client"
import React, { useState, FormEvent,ChangeEvent} from 'react'
import { addTodo } from '../api';
import{v4 as uuidv4} from 'uuid';
import { useRouter } from 'next/navigation';


const  AddTask = () => {
  const outer = useRouter();
  const [tasktile,setTask] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!tasktile.trim()) return;
    await addTodo({id: uuidv4(), text: tasktile});
    setTask("");
    outer.refresh(); 
  }
  return (
    <form className='mb-4 space-y-3' onSubmit = {handleSubmit}>
        <input 
         value={tasktile}
         type="text" className='w-full border py-2 px-4 rounded-lg focus:outline-none focus:border-blue-300 text-cyan-950' placeholder='Add a new task' 
        onChange={(e: ChangeEvent<HTMLInputElement>) => setTask(e.target.value)}
        />
        <button className='w-full px-4 py-2 bg-blue-500 rounded transform hover:bg-blue-600 text-white hover:scale-105 transition duration-200'>
            Add Task
        </button>
    </form>
  )
}

export default AddTask