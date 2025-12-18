import './TaskItem.css';

interface TaskItemProps {
  name: string;
  timeAgo: string;
  onRefresh: () => void;
  taskId: string;
  onClick: () => void;
  isDeleted?: boolean;
  labels?: string[];
}

function TaskItem({ name, timeAgo, onClick, isDeleted, labels }: TaskItemProps) {
  return (
    <div className={`task-item ${isDeleted ? 'task-deleted' : ''}`} onClick={onClick}>
      <span className="task-name">{name}</span>
      <div className="task-right">
        {labels && labels.length > 0 && (
          <div className="task-labels">
            {labels.map(label => (
              <span key={label} className={`label-badge label-${label}`}>
                {label}
              </span>
            ))}
          </div>
        )}
        <span className="task-time">{timeAgo}</span>
      </div>
    </div>
  );
}

export default TaskItem;
