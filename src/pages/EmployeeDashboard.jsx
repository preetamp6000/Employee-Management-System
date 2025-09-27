import React, { useState } from 'react';
import Header from '../components/Header';
import TaskCard from '../components/TaskCard';
import { useAuth } from '../context/AuthContext';

const EmployeeDashboard = () => {
  const { currentUser, tasks, updateTask } = useAuth();
  const [activeFilter, setActiveFilter] = useState('all');

  const userTasks = tasks.filter(task => task.assignedTo === currentUser?.id);
  
  const filteredTasks = userTasks.filter(task => {
    if (activeFilter === 'all') return true;
    return task.status === activeFilter;
  });

  const handleStatusUpdate = (taskId, newStatus) => {
    updateTask(taskId, { status: newStatus });
  };

  const getTaskCounts = () => {
    return {
      all: userTasks.length,
      pending: userTasks.filter(task => task.status === 'pending').length,
      'in-progress': userTasks.filter(task => task.status === 'in-progress').length,
      completed: userTasks.filter(task => task.status === 'completed').length,
    };
  };

  const taskCounts = getTaskCounts();

  return (
    <div className="min-h-screen bg-gray-900">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-2">My Tasks</h2>
          <p className="text-gray-400">Welcome to your task dashboard</p>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gray-800 rounded-lg p-6 text-center">
            <div className="text-3xl font-bold text-white">{taskCounts.all}</div>
            <div className="text-gray-400">Total Tasks</div>
          </div>
          <div className="bg-gray-800 rounded-lg p-6 text-center">
            <div className="text-3xl font-bold text-red-500">{taskCounts.pending}</div>
            <div className="text-gray-400">Pending</div>
          </div>
          <div className="bg-gray-800 rounded-lg p-6 text-center">
            <div className="text-3xl font-bold text-yellow-500">{taskCounts['in-progress']}</div>
            <div className="text-gray-400">In Progress</div>
          </div>
          <div className="bg-gray-800 rounded-lg p-6 text-center">
            <div className="text-3xl font-bold text-green-500">{taskCounts.completed}</div>
            <div className="text-gray-400">Completed</div>
          </div>
        </div>

        {/* Task Filters */}
        <div className="flex space-x-4 mb-6">
          {['all', 'pending', 'in-progress', 'completed'].map(filter => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-2 rounded-lg capitalize ${
                activeFilter === filter
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              {filter} ({taskCounts[filter]})
            </button>
          ))}
        </div>

        {/* Tasks List */}
        <div className="grid gap-6">
          {filteredTasks.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 text-lg">
                {activeFilter === 'all' 
                  ? "You don't have any tasks assigned yet."
                  : `No ${activeFilter} tasks found.`
                }
              </div>
            </div>
          ) : (
            filteredTasks.map(task => (
              <TaskCard
                key={task.id}
                task={task}
                onStatusUpdate={handleStatusUpdate}
                showActions={true}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default EmployeeDashboard;