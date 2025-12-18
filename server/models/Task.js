const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, '../tasks.json');

class Task {
  constructor() {
    this.tasks = new Map();
    this.loadFromFile();
  }

  generateId() {
    return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
  }

  loadFromFile() {
    try {
      if (!fs.existsSync(DATA_FILE)) {
        fs.writeFileSync(DATA_FILE, '[]', 'utf8');
      }
      const raw = fs.readFileSync(DATA_FILE, 'utf8') || '[]';
      const arr = JSON.parse(raw);
      for (const item of arr) {
        this.tasks.set(item.id, item);
      }
      console.log(`Loaded ${this.tasks.size} tasks from file`);
    } catch (e) {
      console.error('Failed to load tasks from file:', e);
    }
  }

  saveToFile() {
    try {
      const arr = Array.from(this.tasks.values());
      fs.writeFileSync(DATA_FILE, JSON.stringify(arr, null, 2), 'utf8');
    } catch (e) {
      console.error('Failed to save tasks to file:', e);
    }
  }

  create(data) {
    const id = this.generateId();
    const createdAt = new Date().toISOString();

    const task = {
      id,
      name: data.name,
      date: data.date,
      time: data.time,
      description: data.description || '',
      status: 'active',
      labels: data.labels || [],
      comments: [],
      createdAt,
      modifiedAt: createdAt
    };

    this.tasks.set(id, task);
    this.saveToFile();
    return task;
  }

  getAll() {
    return Array.from(this.tasks.values());
  }

  getById(id) {
    return this.tasks.get(id);
  }

  update(id, data) {
    const task = this.tasks.get(id);
    if (!task) return null;

    task.name = data.name !== undefined ? data.name : task.name;
    task.date = data.date !== undefined ? data.date : task.date;
    task.time = data.time !== undefined ? data.time : task.time;
    task.description = data.description !== undefined ? data.description : task.description;
    task.status = data.status !== undefined ? data.status : task.status;
    task.labels = data.labels !== undefined ? data.labels : task.labels;
    task.modifiedAt = new Date().toISOString();

    this.tasks.set(id, task);
    this.saveToFile();
    return task;
  }

  delete(id) {
    const task = this.tasks.get(id);
    if (!task) return false;

    // Soft delete - mark as deleted instead of removing
    task.status = 'deleted';
    task.modifiedAt = new Date().toISOString();
    this.tasks.set(id, task);
    this.saveToFile();
    return true;
  }

  addComment(id, commentText) {
    const task = this.tasks.get(id);
    if (!task) return null;

    if (!task.comments) {
      task.comments = [];
    }

    const comment = {
      id: this.generateId(),
      text: commentText.trim(),
      createdAt: new Date().toISOString()
    };

    task.comments.push(comment);
    task.modifiedAt = new Date().toISOString();

    this.tasks.set(id, task);
    this.saveToFile();
    return comment;
  }
}

module.exports = new Task();