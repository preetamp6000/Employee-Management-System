import React from 'react';
import { useAuth } from '../context/AuthContext';

const TaskCard = ({ task, onEdit, onDelete, onStatusUpdate, showActions = true }) => {
  const { users } = useAuth();

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-red-500';
      case 'in-progress': return 'bg-yellow-500';
      case 'completed': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'pending': return 'Pending';
      case 'in-progress': return 'In Progress';
      case 'completed': return 'Completed';
      default: return status;
    }
  };

  const assignedUser = users.find(user => user.id === task.assignedTo);

  return (
    <div className="bg-gray-800 rounded-lg shadow-lg p-6 hover:shadow-xl transition duration-200">
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-xl font-semibold text-white">{task.title}</h3>
        <span className={`px-3 py-1 rounded-full text-xs font-medium text-white ${getStatusColor(task.status)}`}>
          {getStatusText(task.status)}
        </span>
      </div>
      
      <p className="text-gray-300 mb-4">{task.description}</p>
      
      <div className="flex justify-between items-center text-sm text-gray-400">
        <div>
          <span>Assigned to: </span>
          <span className="text-white">{assignedUser?.name || 'Unknown'}</span>
        </div>
        <div className="text-right">
          <div>Created: {new Date(task.createdAt).toLocaleDateString()}</div>
          <div>Updated: {new Date(task.updatedAt).toLocaleDateString()}</div>
        </div>
      </div>

      {showActions && (
        <div className="flex justify-end space-x-2 mt-4">
          {onStatusUpdate && task.status !== 'completed' && (
            <button
              onClick={() => onStatusUpdate(task.id, 'in-progress')}
              className="bg-yellow-600 hover:bg-yellow-700 text-white px-3 py-1 rounded text-sm"
            >
              Start Progress
            </button>
          )}
          {onStatusUpdate && task.status !== 'completed' && (
            <button
              onClick={() => onStatusUpdate(task.id, 'completed')}
              className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm"
            >
              Complete
            </button>
          )}
          {onEdit && (
            <button
              onClick={() => onEdit(task)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm"
            >
              Edit
            </button>
          )}
          {onDelete && (
            <button
              onClick={() => onDelete(task.id)}
              className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm"
            >
              Delete
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default TaskCard;