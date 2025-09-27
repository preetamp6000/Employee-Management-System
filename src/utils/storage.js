// Utility functions for localStorage operations
export const storage = {
  // Get data from localStorage
  get: (key) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error(`Error getting ${key} from localStorage:`, error);
      return null;
    }
  },

  // Set data in localStorage
  set: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error setting ${key} in localStorage:`, error);
    }
  },

  // Remove data from localStorage
  remove: (key) => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error(`Error removing ${key} from localStorage:`, error);
    }
  }
};

// Constants for storage keys
export const STORAGE_KEYS = {
  USERS: 'task_manager_users',
  TASKS: 'task_manager_tasks',
  CURRENT_USER: 'task_manager_current_user'
};

// Initialize demo data
export const initializeDemoData = () => {
  // Check if data already exists
  if (!storage.get(STORAGE_KEYS.USERS)) {
    const demoUsers = [
      {
        id: '1',
        email: 'admin@taskmanager.com',
        password: 'admin123',
        name: 'System Admin',
        role: 'admin',
        createdAt: new Date().toISOString()
      },
      {
        id: '2',
        email: 'john@taskmanager.com',
        password: 'employee123',
        name: 'John Doe',
        role: 'employee',
        createdAt: new Date().toISOString()
      },
      {
        id: '3',
        email: 'jane@taskmanager.com',
        password: 'employee123',
        name: 'Jane Smith',
        role: 'employee',
        createdAt: new Date().toISOString()
      }
    ];
    storage.set(STORAGE_KEYS.USERS, demoUsers);
  }

  if (!storage.get(STORAGE_KEYS.TASKS)) {
    const demoTasks = [
      {
        id: '1',
        title: 'Setup Project Structure',
        description: 'Initialize the React project with proper folder structure',
        assignedTo: '2',
        status: 'completed',
        createdAt: new Date(Date.now() - 86400000).toISOString(),
        updatedAt: new Date(Date.now() - 43200000).toISOString()
      },
      {
        id: '2',
        title: 'Implement Authentication',
        description: 'Create login and registration system with role-based access',
        assignedTo: '2',
        status: 'in-progress',
        createdAt: new Date(Date.now() - 43200000).toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: '3',
        title: 'Design Dashboard UI',
        description: 'Create responsive dashboard layouts for admin and employees',
        assignedTo: '3',
        status: 'pending',
        createdAt: new Date(Date.now() - 21600000).toISOString(),
        updatedAt: new Date(Date.now() - 21600000).toISOString()
      },
      {
        id: '4',
        title: 'Add Task Management Features',
        description: 'Implement CRUD operations for tasks with status tracking',
        assignedTo: '3',
        status: 'pending',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ];
    storage.set(STORAGE_KEYS.TASKS, demoTasks);
  }
};