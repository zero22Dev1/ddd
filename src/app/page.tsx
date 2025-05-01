

import AddTask from "./components/AddTask";
import TodoList from "./components/TodoList";
import { getAlllTodos } from "./api";


export default async function Home() {
  const todos = await getAlllTodos();
  //console.log(todos);
  return (
    <main className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-200">
      <h1 className="text-4xl font-bold text-gray-700">Nextjs 15 Todo App</h1>
      <div className="w-full max-w-xl mt-5">
        <div className="w-full px-8 py-6 bg-white rounded-lg shadow-md">
          <AddTask />
          <TodoList todos={todos} />          
        </div>
      </div>
    </main> 
  );
  }