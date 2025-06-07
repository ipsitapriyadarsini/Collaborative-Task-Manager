import { Menu } from "@headlessui/react";

export default function TaskCard({ task, onEdit, onDelete, onStatusChange }) {
  const priorityColors = {
    Low: "bg-green-100 text-green-800",
    Medium: "bg-yellow-100 text-yellow-800",
    High: "bg-red-100 text-red-800",
  };

  const statusColors = {
    "To Do": "bg-gray-100",
    "In Progress": "bg-blue-100",
    Done: "bg-green-100",
  };

  const formatDate = (dateString) => {
    if (!dateString) return "No due date";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div
      className={`${
        statusColors[task.status]
      } rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow duration-200`}>
      <div className="flex justify-between items-start mb-2">
        <div className="flex-1">
          <h4 className="text-lg font-semibold text-gray-800 mb-1">
            {task.title}
          </h4>
          <p className="text-gray-600 text-sm line-clamp-2 mb-2">
            {task.description}
          </p>
        </div>
        <div className="flex space-x-2 ml-4">
          <button
            onClick={() => onEdit(task)}
            className="text-gray-600 hover:text-blue-600 transition-colors duration-200 p-1 rounded hover:bg-blue-50">
            <span role="img" aria-label="edit">
              ✏️
            </span>
          </button>
          <button
            onClick={() => onDelete(task.id)}
            className="text-gray-600 hover:text-red-600 transition-colors duration-200 p-1 rounded hover:bg-red-50">
            <span role="img" aria-label="delete">
              🗑️
            </span>
          </button>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Menu as="div" className="relative">
            <Menu.Button
              className={`text-sm px-3 py-1 rounded-full ${
                statusColors[task.status]
              } hover:opacity-80 transition-opacity duration-200`}>
              {task.status}
            </Menu.Button>
            {onStatusChange && (
              <Menu.Items className="absolute z-10 mt-2 w-40 bg-white rounded-md shadow-lg py-1">
                {["To Do", "In Progress", "Done"].map((status) => (
                  <Menu.Item key={status}>
                    {({ active }) => (
                      <button
                        className={`${
                          active ? "bg-gray-100" : ""
                        } block w-full text-left px-4 py-2 text-sm text-gray-700`}
                        onClick={() => onStatusChange(task.id, status)}>
                        {status}
                      </button>
                    )}
                  </Menu.Item>
                ))}
              </Menu.Items>
            )}
          </Menu>
          <span
            className={`text-xs px-2 py-1 rounded-full ${
              priorityColors[task.priority]
            }`}>
            {task.priority} Priority
          </span>
        </div>

        <div className="flex items-center justify-between text-sm text-gray-600">
          <span className="flex items-center">
            <span role="img" aria-label="calendar" className="mr-1">
              📅
            </span>
            {formatDate(task.dueDate)}
          </span>
          {task.assignee && (
            <span className="flex items-center">
              <span role="img" aria-label="assignee" className="mr-1">
                👤
              </span>
              {task.assignee}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
