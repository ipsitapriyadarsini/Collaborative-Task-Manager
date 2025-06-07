export default function TaskCard({ task, onEdit, onDelete }) {
  const priorityColors = {
    Low: "bg-green-100 text-green-800",
    Medium: "bg-yellow-100 text-yellow-800",
    High: "bg-red-100 text-red-800",
  };

  return (
    <div className="bg-white rounded-lg shadow p-4 border border-gray-100 hover:shadow-md transition-shadow duration-200">
      <div className="flex justify-between items-start mb-2">
        <h4 className="text-lg font-semibold text-gray-800">{task.title}</h4>
        <div className="flex space-x-2">
          <button
            onClick={() => onEdit(task)}
            className="text-gray-600 hover:text-blue-600 transition-colors duration-200">
            ✏️
          </button>
          <button
            onClick={() => onDelete(task.id)}
            className="text-gray-600 hover:text-red-600 transition-colors duration-200">
            🗑️
          </button>
        </div>
      </div>
      <p className="text-gray-600 text-sm mb-3">{task.description}</p>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span
            className={`text-xs px-2 py-1 rounded-full ${
              priorityColors[task.priority]
            }`}>
            {task.priority} Priority
          </span>
          <span className="text-sm text-gray-500">
            Due: {task.dueDate || "None"}
          </span>
        </div>
        {task.assignee && (
          <p className="text-sm text-gray-600">👤 {task.assignee}</p>
        )}
      </div>
    </div>
  );
}
