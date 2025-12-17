import './TaskItem.css';

interface TaskItemProps {
  name: string;
  timeAgo: string;
  onRefresh: () => void;
  taskId: string;
  onClick: () => void;
  isDeleted?: boolean;
}

function TaskItem({ name, timeAgo, onClick, isDeleted }: TaskItemProps) {
  return (
    <div className={`task-item ${isDeleted ? 'task-deleted' : ''}`} onClick={onClick}>
      <div className="task-content">
        <span className="task-name">{name}</span>
      </div>
      <span className="task-time">{timeAgo}</span>
    </div>
  );
}

export default TaskItem;
