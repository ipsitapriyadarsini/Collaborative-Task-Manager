import TaskCard from "./TaskCard";

export default function TaskBoard({ tasks, onEdit, onDelete }) {
  const statuses = ["To Do", "In Progress", "Done"];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {statuses.map((status) => (
        <div key={status} className="bg-white rounded-lg shadow-md p-4">
          <h3 className="text-lg font-semibold text-gray-700 mb-4 pb-2 border-b border-gray-200">
            {status}
          </h3>
          <div className="space-y-4">
            {tasks
              .filter((task) => task.status === status)
              .map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onEdit={onEdit}
                  onDelete={onDelete}
                />
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}
