import { useState, useEffect } from "react";

const defaultTask = {
  title: "",
  description: "",
  status: "To Do",
  priority: "Medium",
  dueDate: "",
  assignee: "",
};

export default function TaskForm({ onSave, editTask }) {
  const [task, setTask] = useState(defaultTask);

  useEffect(() => {
    if (editTask) setTask(editTask);
  }, [editTask]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask({ ...task, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(task);
    setTask(defaultTask);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-md rounded-lg p-6 mb-8">
      <div className="space-y-4">
        <input
          name="title"
          required
          placeholder="Title"
          value={task.title}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <textarea
          name="description"
          placeholder="Description"
          value={task.description}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent h-32 resize-none"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <select
            name="status"
            value={task.status}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white">
            <option>To Do</option>
            <option>In Progress</option>
            <option>Done</option>
          </select>
          <select
            name="priority"
            value={task.priority}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white">
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="date"
            name="dueDate"
            value={task.dueDate}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <input
            name="assignee"
            placeholder="Assignee"
            value={task.assignee}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors duration-200 font-medium">
          {editTask ? "Update" : "Add"} Task
        </button>
      </div>
    </form>
  );
}
