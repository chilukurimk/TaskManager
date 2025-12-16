import { useState } from 'react';
import './App.css';
import TaskList from './components/TaskList';
import CreateTaskModal from './components/CreateTaskModal';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="app">
      <div className="container">
        <header className="header">
          <h1>My tasks</h1>
          <button className="add-button" onClick={() => setIsModalOpen(true)}>
            +
          </button>
        </header>

        <TaskList />

        {isModalOpen && (
          <CreateTaskModal onClose={() => setIsModalOpen(false)} />
        )}
      </div>
    </div>
  );
}

export default App;
