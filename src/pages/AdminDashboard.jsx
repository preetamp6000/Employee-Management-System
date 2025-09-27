import React, { useState } from 'react';
import Header from '../components/Header';
import TaskCard from '../components/TaskCard';
import { useAuth } from '../context/AuthContext';

const AdminDashboard = () => {
  const { users, tasks, addTask, updateTask, deleteTask, getTaskStatistics } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [taskForm, setTaskForm] = useState({
    title: '',
    description: '',
    assignedTo: '',
    status: 'pending'
  });

  const statistics = getTaskStatistics();

  const openTaskModal = (task = null) => {
    if (task) {
      setEditingTask(task);
      setTaskForm({
        title: task.title,
        description: task.description,
        assignedTo: task.assignedTo,
        status: task.status
      });
    } else {
      setEditingTask(null);
      setTaskForm({
        title: '',
        description: '',
        assignedTo: '',
        status: 'pending'
      });
    }
    setShowTaskModal(true);
  };

  const closeTaskModal = () => {
    setShowTaskModal(false);
    setEditingTask(null);
  };

  const handleTaskSubmit = (e) => {
    e.preventDefault();
    if (editingTask) {
      updateTask(editingTask.id, taskForm);
    } else {
      addTask(taskForm);
    }
    closeTaskModal();
  };

  const handleDeleteTask = (taskId) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      deleteTask(taskId);
    }
  };

  const employees = users.filter(user => user.role === 'employee');

  return (
    <div className="min-h-screen bg-gray-900">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tab Navigation */}
        <div className="border-b border-gray-700 mb-8">
          <nav className="-mb-px flex space-x-8">
            {['dashboard', 'tasks', 'employees'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm capitalize ${
                  activeTab === tab
                    ? 'border-blue-500 text-blue-400'
                    : 'border-transparent text-gray-400 hover:text-gray-300'
                }`}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>

        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <div>
            <h2 className="text-2xl font-bold text-white mb-6">Dashboard Overview</h2>
            
            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-gray-800 rounded-lg p-6 text-center">
                <div className="text-3xl font-bold text-white">{statistics.total}</div>
                <div className="text-gray-400">Total Tasks</div>
              </div>
              <div className="bg-gray-800 rounded-lg p-6 text-center">
                <div className="text-3xl font-bold text-red-500">{statistics.pending}</div>
                <div className="text-gray-400">Pending</div>
              </div>
              <div className="bg-gray-800 rounded-lg p-6 text-center">
                <div className="text-3xl font-bold text-yellow-500">{statistics.inProgress}</div>
                <div className="text-gray-400">In Progress</div>
              </div>
              <div className="bg-gray-800 rounded-lg p-6 text-center">
                <div className="text-3xl font-bold text-green-500">{statistics.completed}</div>
                <div className="text-gray-400">Completed</div>
              </div>
            </div>

            {/* Recent Tasks */}
            <div className="bg-gray-800 rounded-lg p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-white">Recent Tasks</h3>
                <button
                  onClick={() => openTaskModal()}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
                >
                  Add New Task
                </button>
              </div>
              <div className="grid gap-4">
                {tasks.slice(0, 5).map(task => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    onEdit={openTaskModal}
                    onDelete={handleDeleteTask}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tasks Tab */}
        {activeTab === 'tasks' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">Task Management</h2>
              <button
                onClick={() => openTaskModal()}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
              >
                Add New Task
              </button>
            </div>
            
            {/* Task Filters */}
            <div className="flex space-x-4 mb-6">
              {['all', 'pending', 'in-progress', 'completed'].map(filter => (
                <button
                  key={filter}
                  className={`px-4 py-2 rounded-lg capitalize ${
                    activeTab === filter
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>

            <div className="grid gap-6">
              {tasks.map(task => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onEdit={openTaskModal}
                  onDelete={handleDeleteTask}
                />
              ))}
            </div>
          </div>
        )}

        {/* Employees Tab */}
        {activeTab === 'employees' && (
          <div>
            <h2 className="text-2xl font-bold text-white mb-6">Employee List</h2>
            <div className="bg-gray-800 rounded-lg overflow-hidden">
              <table className="min-w-full divide-y divide-gray-700">
                <thead className="bg-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Join Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Assigned Tasks
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-gray-800 divide-y divide-gray-700">
                  {employees.map(employee => (
                    <tr key={employee.id} className="hover:bg-gray-700">
                      <td className="px-6 py-4 whitespace-nowrap text-white">
                        {employee.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-300">
                        {employee.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-300">
                        {new Date(employee.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-300">
                        {tasks.filter(task => task.assignedTo === employee.id).length}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Task Modal */}
      {showTaskModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-gray-800 rounded-lg max-w-md w-full p-6">
            <h3 className="text-xl font-semibold text-white mb-4">
              {editingTask ? 'Edit Task' : 'Create New Task'}
            </h3>
            
            <form onSubmit={handleTaskSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Title
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                  value={taskForm.title}
                  onChange={(e) => setTaskForm({ ...taskForm, title: e.target.value })}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Description
                </label>
                <textarea
                  required
                  rows="3"
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                  value={taskForm.description}
                  onChange={(e) => setTaskForm({ ...taskForm, description: e.target.value })}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Assign to
                </label>
                <select
                  required
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                  value={taskForm.assignedTo}
                  onChange={(e) => setTaskForm({ ...taskForm, assignedTo: e.target.value })}
                >
                  <option value="">Select Employee</option>
                  {employees.map(employee => (
                    <option key={employee.id} value={employee.id}>
                      {employee.name}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Status
                </label>
                <select
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                  value={taskForm.status}
                  onChange={(e) => setTaskForm({ ...taskForm, status: e.target.value })}
                >
                  <option value="pending">Pending</option>
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
              
              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={closeTaskModal}
                  className="px-4 py-2 text-gray-300 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
                >
                  {editingTask ? 'Update Task' : 'Create Task'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;