import React from 'react'
import Button from '../common/Button'
import Checkbox from '../common/Checkbox'

const TodoItem = ({ task, onToggle, onEdit, onDelete, loading = false }) => {
  const handleToggle = () => {
    onToggle(task._id, !task.isCompleted)
  }

  const handleEdit = () => {
    onEdit(task)
  }

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      onDelete(task._id)
    }
  }

  const formatDate = (dateString) => {
    if (!dateString) return ''
    const date = new Date(dateString)
    return date.toLocaleDateString('uk-UA', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  return (
    <div className={`card ${task.isCompleted ? 'task-completed' : ''}`}>
      <div className="card-body">
        <div className="d-flex align-items-start">
          <div className={'me-3 mt-1'}>
            <Checkbox
              id={task._id}
              checked={task.isCompleted}
              onChange={handleToggle}
              disabled={loading}
            />
          </div>

          <div className={'flex-grow-1'}>
            <div
              className={'d-flex justify-content-between align-items-center'}
            >
              <div className={'task-content'}>
                <h6
                  className={`card-title mb-2 ${task.isCompleted ? 'text-decoration-line-through text-muted' : ''}`}
                >
                  {task.title}
                </h6>
                {task.description && (
                  <p
                    className={`card-text small ${task.isCompleted ? 'text-muted' : 'text-secondary'}`}
                  >
                    {task.description}
                  </p>
                )}
                <div className="text-muted small">
                  <i className={`fas fa-clock me-1`}></i>
                  {formatDate(task.createdAt)}
                </div>
              </div>

              <div className={'btn-group btn-group-sm ms-3'} role={'group'}>
                <Button
                  variant="outline-primary"
                  size="sm"
                  onClick={handleEdit}
                  disabled={loading}
                  title="Edit"
                >
                  <i className="fas fa-edit"></i>{' '}
                </Button>
                <Button
                  variant="outline-primary"
                  size="sm"
                  onClick={handleDelete}
                  disabled={loading}
                  title="Delete"
                >
                  <i className="fas fa-trash"></i>
                </Button>
              </div>
            </div>
          </div>
        </div>

        {task.isCompleted && (
          <div className={'mt-2'}>
            <span className="badge badge-success">
              <i className={`fas fa-check me-1`}></i>
              Completed
            </span>
          </div>
        )}
      </div>
    </div>
  )
}

export default TodoItem
