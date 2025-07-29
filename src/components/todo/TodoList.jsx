import React from 'react'
import TodoItem from './TodoItem'

const TodoList = ({ tasks, onToggle, onEdit, onDelete, loading = false }) => {
  const activeTasks = tasks.filter((task) => !task.isCompleted)
  const completedTasks = tasks.filter((task) => task.isCompleted)
  if (tasks.length === 0) {
    return (
      <div className="text-center py-5 fade-in">
        <div className="mb-4">
          <i className="fas fa-clipboard-list text-muted"></i>
        </div>
        <h5 className="text-muted">No tasks yet</h5>
        <p className="text-muted">Add your first task to get started!</p>
      </div>
    )
  }

  return (
    <div className="todo-list">
      {activeTasks.length > 0 && (
        <div className="active-tasks">
          {activeTasks.map((task) => (
            <div key={task._id}>
              <TodoItem
                task={task}
                onToggle={onToggle}
                onEdit={onEdit}
                onDelete={onDelete}
                loading={loading}
              />
            </div>
          ))}
        </div>
      )}

      {completedTasks.length > 0 && (
        <div className="completed-section">
          <div className="section-title">
            Completed ({completedTasks.length})
          </div>
          {completedTasks.map((task) => (
            <div key={task._id}>
              <TodoItem
                task={task}
                onToggle={onToggle}
                onEdit={onEdit}
                onDelete={onDelete}
                loading={loading}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default TodoList
