"use client";
import { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import TaskCard from "./TaskCard";
import { Menu } from "@headlessui/react";

// ✅ Client-only wrapper to avoid hydration errors
const ClientOnly = ({ children }) => {
  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => {
    setHasMounted(true);
  }, []);
  if (!hasMounted) return null;
  return children;
};

export default function TaskBoard({ tasks, onEdit, onDelete, onStatusChange }) {
  const statuses = ["To Do", "In Progress", "Done"];
  const [filters, setFilters] = useState({ status: "all", priority: "all" });
  const [sortBy, setSortBy] = useState("none");

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const { source, destination, draggableId } = result;
    if (source.droppableId !== destination.droppableId) {
      onStatusChange(draggableId, destination.droppableId);
    }
  };

  const filteredTasks = tasks.filter((task) => {
    if (filters.status !== "all" && task.status !== filters.status)
      return false;
    if (filters.priority !== "all" && task.priority !== filters.priority)
      return false;
    return true;
  });

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (sortBy === "dueDate") {
      if (!a.dueDate) return 1;
      if (!b.dueDate) return -1;
      return new Date(a.dueDate) - new Date(b.dueDate);
    }
    if (sortBy === "priority") {
      const priorityOrder = { High: 0, Medium: 1, Low: 2 };
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    }
    return 0;
  });

  return (
    <ClientOnly>
      <div className="space-y-4">
        <div className="flex flex-wrap gap-4 items-center bg-white p-4 rounded-lg shadow-sm">
          {/* Filter: Status */}
          <Menu as="div" className="relative">
            <Menu.Button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
              Status: {filters.status}
            </Menu.Button>
            <Menu.Items className="absolute z-10 mt-2 w-40 bg-white rounded-md shadow-lg">
              <div className="py-1">
                {["all", ...statuses].map((status) => (
                  <Menu.Item key={status}>
                    {({ active }) => (
                      <button
                        className={`${
                          active ? "bg-gray-100" : ""
                        } block w-full text-left px-4 py-2 text-sm text-gray-700`}
                        onClick={() => setFilters({ ...filters, status })}>
                        {status}
                      </button>
                    )}
                  </Menu.Item>
                ))}
              </div>
            </Menu.Items>
          </Menu>

          {/* Filter: Priority */}
          <Menu as="div" className="relative">
            <Menu.Button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
              Priority: {filters.priority}
            </Menu.Button>
            <Menu.Items className="absolute z-10 mt-2 w-40 bg-white rounded-md shadow-lg">
              <div className="py-1">
                {["all", "Low", "Medium", "High"].map((priority) => (
                  <Menu.Item key={priority}>
                    {({ active }) => (
                      <button
                        className={`${
                          active ? "bg-gray-100" : ""
                        } block w-full text-left px-4 py-2 text-sm text-gray-700`}
                        onClick={() => setFilters({ ...filters, priority })}>
                        {priority}
                      </button>
                    )}
                  </Menu.Item>
                ))}
              </div>
            </Menu.Items>
          </Menu>

          {/* Sort By */}
          <Menu as="div" className="relative">
            <Menu.Button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
              Sort by: {sortBy}
            </Menu.Button>
            <Menu.Items className="absolute z-10 mt-2 w-40 bg-white rounded-md shadow-lg">
              <div className="py-1">
                {["none", "dueDate", "priority"].map((sort) => (
                  <Menu.Item key={sort}>
                    {({ active }) => (
                      <button
                        className={`${
                          active ? "bg-gray-100" : ""
                        } block w-full text-left px-4 py-2 text-sm text-gray-700`}
                        onClick={() => setSortBy(sort)}>
                        {sort}
                      </button>
                    )}
                  </Menu.Item>
                ))}
              </div>
            </Menu.Items>
          </Menu>
        </div>

        <DragDropContext onDragEnd={handleDragEnd} isCombineEnabled={false}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {statuses.map((status) => (
              <Droppable
                key={status}
                droppableId={status}
                isDropDisabled={false}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className={`bg-white rounded-lg shadow-md p-4 ${
                      snapshot.isDraggingOver ? "bg-blue-50" : ""
                    }`}>
                    <h3 className="text-lg font-semibold text-gray-700 mb-4 pb-2 border-b border-gray-200">
                      {status}
                    </h3>
                    <div className="space-y-4">
                      {sortedTasks
                        .filter((task) => task.status === status)
                        .map((task, index) => (
                          <Draggable
                            key={task.id}
                            draggableId={task.id}
                            index={index}>
                            {(provided, snapshot) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className={`${
                                  snapshot.isDragging ? "opacity-50" : ""
                                }`}>
                                <TaskCard
                                  task={task}
                                  onEdit={onEdit}
                                  onDelete={onDelete}
                                />
                              </div>
                            )}
                          </Draggable>
                        ))}
                      {provided.placeholder}
                    </div>
                  </div>
                )}
              </Droppable>
            ))}
          </div>
        </DragDropContext>
      </div>
    </ClientOnly>
  );
}
