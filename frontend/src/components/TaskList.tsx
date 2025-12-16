import { useState, useEffect } from 'react';
import './TaskList.css';
import TaskItem from './TaskItem';
import TaskDetailsModal from './TaskDetailsModal';

interface Task {
  id: string;
  name: string;
  date: string;
  time: string;
  description: string;
  status: string;
  createdAt: string;
  modifiedAt: string;
}

type FilterType = 'active' | 'all' | 'closed';

function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<FilterType>('active');
  const [loading, setLoading] = useState(true);
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await fetch('http://localhost:3000/tasks');
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'active') return task.status === 'active';
    if (filter === 'closed') return task.status === 'closed';
    return true;
  });

  const getTimeAgo = (dateString: string) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / 60000);
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes === 1) return '1 minute ago';
    if (diffInMinutes < 60) return `${diffInMinutes} minutes ago`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours === 1) return '1 hour ago';
    if (diffInHours < 24) return `${diffInHours} hours ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays === 1) return '1 day ago';
    return `${diffInDays} days ago`;
  };

  return (
    <div className="task-list">
      <div className="filter-buttons">
        <button
          className={`filter-button ${filter === 'active' ? 'active' : ''}`}
          onClick={() => setFilter('active')}
        >
          Active
        </button>
        <button
          className={`filter-button ${filter === 'all' ? 'active' : ''}`}
          onClick={() => setFilter('all')}
        >
          All
        </button>
        <button
          className={`filter-button ${filter === 'closed' ? 'active' : ''}`}
          onClick={() => setFilter('closed')}
        >
          Closed
        </button>
      </div>

      <div className="tasks">
        {loading ? (
          <div className="empty-state">Loading tasks...</div>
        ) : filteredTasks.length === 0 ? (
          <div className="empty-state">No tasks found</div>
        ) : (
          filteredTasks.map(task => (
            <TaskItem
              key={task.id}
              name={task.name}
              timeAgo={getTimeAgo(task.createdAt)}
              onRefresh={fetchTasks}
              taskId={task.id}
              onClick={() => setSelectedTaskId(task.id)}
            />
          ))
        )}
      </div>

      {selectedTaskId && (
        <TaskDetailsModal
          taskId={selectedTaskId}
          onClose={() => setSelectedTaskId(null)}
          onRefresh={fetchTasks}
        />
      )}
    </div>
  );
}

export default TaskList;
