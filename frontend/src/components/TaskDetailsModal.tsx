import { useState, useEffect } from 'react';
import './TaskDetailsModal.css';

interface Comment {
  id: string;
  text: string;
  createdAt: string;
}

interface Task {
  id: string;
  name: string;
  description: string;
  status: string;
  createdAt: string;
  modifiedAt: string;
  comments: Comment[];
}

interface TaskDetailsModalProps {
  taskId: string;
  onClose: () => void;
  onRefresh: () => void;
}

function TaskDetailsModal({ taskId, onClose, onRefresh }: TaskDetailsModalProps) {
  const [task, setTask] = useState<Task | null>(null);
  const [commentText, setCommentText] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTaskDetails();
  }, [taskId]);

  const fetchTaskDetails = async () => {
    try {
      const response = await fetch(`http://localhost:3000/tasks/${taskId}`);
      const data = await response.json();
      setTask(data);
    } catch (error) {
      console.error('Error fetching task:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddComment = async () => {
    if (!commentText.trim()) return;

    try {
      await fetch(`http://localhost:3000/tasks/${taskId}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: commentText }),
      });
      setCommentText('');
      fetchTaskDetails();
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this task?')) return;

    try {
      await fetch(`http://localhost:3000/tasks/${taskId}`, {
        method: 'DELETE',
      });
      onRefresh();
      onClose();
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (loading) {
    return (
      <div className="modal-backdrop" onClick={handleBackdropClick}>
        <div className="modal-content task-details-modal">
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  if (!task) return null;

  return (
    <div className="modal-backdrop" onClick={handleBackdropClick}>
      <div className="modal-content task-details-modal">
        <div className="modal-header">
          <h2>Task Details</h2>
          <button className="close-button" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="task-details-body">
          <div className="detail-section">
            <label className="detail-label">Title</label>
            <p className="detail-text">{task.name}</p>
          </div>

          <div className="detail-section">
            <label className="detail-label">Description</label>
            <p className="detail-text">{task.description}</p>
          </div>

          <div className="detail-section">
            <label className="detail-label">Status</label>
            <span className="status-badge">{task.status}</span>
          </div>

          <div className="detail-dates">
            <div className="date-item">
              <span className="date-label">Created</span>
              <span className="date-value">{formatDate(task.createdAt)}</span>
            </div>
            <div className="date-item">
              <span className="date-label">Modified</span>
              <span className="date-value">{formatDate(task.modifiedAt)}</span>
            </div>
          </div>

          <div className="comments-section">
            <h3 className="comments-title">Comments ({task.comments?.length || 0})</h3>
            
            {(!task.comments || task.comments.length === 0) && (
              <p className="no-comments">No comments yet. Add one below.</p>
            )}

            {task.comments && task.comments.length > 0 && (
              <div className="comments-list">
                {task.comments.map((comment) => (
                  <div key={comment.id} className="comment-item">
                    <p className="comment-text">{comment.text}</p>
                    <span className="comment-date">{formatDate(comment.createdAt)}</span>
                  </div>
                ))}
              </div>
            )}

            <div className="add-comment">
              <input
                type="text"
                placeholder="first comment"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAddComment()}
              />
              <button className="add-comment-btn" onClick={handleAddComment}>
                Add Comment
              </button>
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button className="delete-btn" onClick={handleDelete}>
            Delete
          </button>
          <div className="footer-right">
            <button className="close-btn" onClick={onClose}>
              Close
            </button>
            <button className="edit-btn">
              Edit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TaskDetailsModal;
