import { useState } from 'react';
import './App.css';
import TaskList from './components/TaskList';
import CreateTaskModal from './components/CreateTaskModal';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="app">
      <div className="container">
        <header className="header">
          <h1>My tasks</h1>
          <button className="add-button" onClick={() => setIsModalOpen(true)}>
            +
          </button>
        </header>

        <div className="search-container">
          <input
            type="text"
            className="search-input"
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button className="clear-search" onClick={() => setSearchQuery('')}>
              ✕
            </button>
          )}
        </div>

        <TaskList searchQuery={searchQuery} />

        {isModalOpen && (
          <CreateTaskModal onClose={() => setIsModalOpen(false)} />
        )}
      </div>
    </div>
  );
}

export default App;
