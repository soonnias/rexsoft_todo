import React, { useState, useEffect } from 'react'
import TodoForm from '../components/todo/TodoForm'
import TodoList from '../components/todo/TodoList'
import Alert from '../components/common/Alert'
import {
  createTask,
  deleteTask,
  getTasks,
  updateTask as updateTaskFunc,
} from '../api/todoApi'

const TodoPage = () => {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [editingTask, setEditingTask] = useState(null)

  useEffect(() => {
    loadTasks()
  }, [])

  const loadTasks = async () => {
    try {
      setLoading(true)
      setError(null)
      const taskList = await getTasks()
      console.log('taskList ', taskList)
      setTasks(taskList)
    } catch (err) {
      setError('Error loading tasks. Please try again later.')
      console.error('Error loading tasks:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmitTask = async (taskData) => {
    try {
      setLoading(true)
      setError(null)

      if (editingTask) {
        const updateTask = await updateTaskFunc(taskData._id, taskData)
        setTasks((prev) =>
          prev.map((task) => (task._id === taskData._id ? updateTask : task))
        )
        setEditingTask(null)
      } else {
        const newTask = await createTask(taskData)
        setTasks((prev) => [newTask, ...prev])
      }
    } catch (err) {
      setError(
        editingTask
          ? 'Error saving changes. Please try again.'
          : 'Error creating task. Please try again.'
      )
      console.error('Error submitting task:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleToggleTask = async (id, isCompleted) => {
    try {
      setLoading(true)
      setError(null)

      const currentTask = tasks.find((task) => task._id === id)
      if (!currentTask) {
        throw new Error('Task not found')
      }

      // Оновлюємо завдання з усіма його полями
      const updatedTask = await updateTaskFunc(id, {
        ...currentTask,
        isCompleted,
      })

      setTasks((prev) =>
        prev.map((task) => (task._id === id ? updatedTask : task))
      )
    } catch (err) {
      setError('Error updating task status.')
      console.error('Error toggling task:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleEditTask = (task) => {
    console.log('Set editing task:', task)
    setEditingTask(task)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleCancelEdit = () => {
    setEditingTask(null)
  }

  const handleDeleteTask = async (id) => {
    try {
      setLoading(true)
      setError(null)
      await deleteTask(id)
      setTasks((prev) => prev.filter((task) => task._id !== id))

      if (editingTask && editingTask._id === id) {
        setEditingTask(null)
      }
    } catch (err) {
      setError('Error deleting task. Please try again.')
      console.error('Error deleting task:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleCloseAlert = () => {
    setError(null)
  }

  return (
    <div className="min-vh-100 py-4">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-lg-8 col-xl-6">
            <div className="todo-container">
              {/* Header */}
              <div className="todo-header text-center">
                <h1>
                  <i className="fas fa-tasks me-3"></i>
                  TODO List
                </h1>
                <p>Organize your tasks efficiently</p>
              </div>

              <div>
                {error && (
                  <Alert
                    variant="danger"
                    dismissible
                    onClose={handleCloseAlert}
                    className="mb-4"
                  >
                    <i className="fas fa-exclamation-circle me-2"></i>
                    {error}
                  </Alert>
                )}

                <TodoForm
                  onSubmit={handleSubmitTask}
                  loading={loading}
                  editTask={editingTask}
                  onCancel={handleCancelEdit}
                />

                {loading && tasks.length === 0 && (
                  <div className="text-center py-5">
                    <div className="spinner-border text-primary" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                    <p className="mt-3 text-muted">Loading tasks...</p>
                  </div>
                )}

                {!loading || tasks.length > 0 ? (
                  <TodoList
                    tasks={tasks}
                    onToggle={handleToggleTask}
                    onEdit={handleEditTask}
                    onDelete={handleDeleteTask}
                    loading={loading}
                  />
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TodoPage
