"use client";

import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import TaskForm from "../components/TaskForm";
import TaskBoard from "../components/TaskBoard";
import { Task } from "./types";

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editTask, setEditTask] = useState<Task | null>(null);

  const handleSave = (task: Task) => {
    if (task.id) {
      setTasks((prev) => prev.map((t) => (t.id === task.id ? task : t)));
      setEditTask(null);
    } else {
      setTasks([...tasks, { ...task, id: uuidv4() }]);
    }
  };

  const handleDelete = (id: string) =>
    setTasks(tasks.filter((t) => t.id !== id));

  const handleEdit = (task: Task) => setEditTask(task);

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 text-center mb-12">
          Task Manager
        </h1>
        <TaskForm onSave={handleSave} editTask={editTask} />
        <TaskBoard tasks={tasks} onEdit={handleEdit} onDelete={handleDelete} />
      </div>
    </main>
  );
}
