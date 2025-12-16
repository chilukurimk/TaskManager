import './TaskItem.css';

interface TaskItemProps {
  name: string;
  timeAgo: string;
  onRefresh: () => void;
  taskId: string;
  onClick: () => void;
}

function TaskItem({ name, timeAgo, onClick }: TaskItemProps) {
  return (
    <div className="task-item" onClick={onClick}>
      <div className="task-content">
        <span className="task-name">{name}</span>
      </div>
      <span className="task-time">{timeAgo}</span>
    </div>
  );
}

export default TaskItem;
