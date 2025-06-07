import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { taskSchema } from "../app/schemas/taskSchema";

const defaultTask = {
  title: "",
  description: "",
  status: "To Do",
  priority: "Medium",
  dueDate: "",
  assignee: "",
};

export default function TaskForm({ onSave, editTask }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(taskSchema),
    defaultValues: defaultTask,
  });

  useEffect(() => {
    if (editTask) {
      reset(editTask);
    }
  }, [editTask, reset]);

  const onSubmit = (data) => {
    onSave(data);
    reset(defaultTask);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white shadow-md rounded-lg p-6 mb-8">
      <div className="space-y-4">
        <div>
          <input
            {...register("title")}
            placeholder="Title"
            className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              errors.title ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.title && (
            <p className="mt-1 text-sm text-red-500">{errors.title.message}</p>
          )}
        </div>

        <div>
          <textarea
            {...register("description")}
            placeholder="Description"
            className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent h-32 resize-none ${
              errors.description ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.description && (
            <p className="mt-1 text-sm text-red-500">
              {errors.description.message}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <select
              {...register("status")}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white ${
                errors.status ? "border-red-500" : "border-gray-300"
              }`}>
              <option>To Do</option>
              <option>In Progress</option>
              <option>Done</option>
            </select>
            {errors.status && (
              <p className="mt-1 text-sm text-red-500">
                {errors.status.message}
              </p>
            )}
          </div>

          <div>
            <select
              {...register("priority")}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white ${
                errors.priority ? "border-red-500" : "border-gray-300"
              }`}>
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>
            {errors.priority && (
              <p className="mt-1 text-sm text-red-500">
                {errors.priority.message}
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <input
              type="date"
              {...register("dueDate")}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.dueDate ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.dueDate && (
              <p className="mt-1 text-sm text-red-500">
                {errors.dueDate.message}
              </p>
            )}
          </div>

          <div>
            <input
              {...register("assignee")}
              placeholder="Assignee"
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.assignee ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.assignee && (
              <p className="mt-1 text-sm text-red-500">
                {errors.assignee.message}
              </p>
            )}
          </div>
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
