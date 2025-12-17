# Task Manager

A simple task management application with React + TypeScript frontend and Node.js backend.

## Features

- Create, edit, and delete tasks
- Add comments to tasks
- Filter tasks by status (Active, All, Closed)
- Soft delete (deleted tasks shown in red in All tab)

## Project Structure

```
TaskManager/
├── frontend/         # React + TypeScript + Vite
│   └── src/
│       ├── components/
│       └── App.tsx
├── server/           # Node.js + Express
│   ├── routes/
│   ├── controllers/
│   ├── models/
│   └── server.js
└── package.json
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** v14 or higher
- **npm** v6 or higher

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/chilukurimk/TaskManager.git
   cd TaskManager
   ```

2. **Install root dependencies**
   ```bash
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd frontend
   npm install
   cd ..
## Getting Started

### Installation

```bash
# Install dependencies
npm install
cd frontend && npm install && cd ..
```

### Run the Application

**Terminal 1 - Backend:**
```bash
node server/server.js
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

Open http://localhost:5173 in your browser.

### Example Requests

**Create a Task:**
```bash
curl -X POST http://localhost:3000/tasks \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Complete project documentation",
    "description": "Write comprehensive README",
    "date": "2025-12-20",
    "time": "14:00"
  }'
```

**Get All Tasks:**
```bash
curl http://localhost:3000/tasks
```

**Add Comment:**
## API Endpoints

- `GET /tasks` - Get all tasks
- `GET /tasks/:id` - Get task by ID
- `POST /tasks` - Create task
- `PUT /tasks/:id` - Update task
- `DELETE /tasks/:id` - Delete task (soft delete)
- `POST /tasks/:id/comments` - Add comment*Vite** - Fast build tool and dev server
- **CSS3** - Modern styling with Flexbox and Grid

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variable management
- **UUID** - Unique ID generation

## Usage

- Click **+** to create a task
- Click a task to view/edit details
- Click **Edit** to modify, **Close** to mark as closed, **Delete** to remove
- Use tabs to filter: Active, All, Closed
- Deleted tasks appear in red in the All tab
```typescript
{
  id: string;              // Unique identifier
  text: string;            // Comment text
  createdAt: string;       // ISO timestamp
}
```

## 🔮 Future Enhancements

- [ ] User authentication and authorization
- [ ] Database integration (MongoDB/PostgreSQL)
- [ ] Task priority levels
- [ ] Due date reminders
- [ ] Task categories/tags
- [ ] File attachments
- [ ] Search functionality
- [ ] Export tasks (CSV/PDF)
- [ ] Dark mode
- [ ] Drag-and-drop reordering
- [ ] Mobile app (React Native)
- [ ] Real-time updates with WebSockets

## 🐛 Known Issues

- Tasks are stored in a local JSON file (data persists between server restarts)
- No authentication system (single-user application)
- No pagination for large task lists
- Comments cannot be edited or deleted

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License.

## 👨‍💻 Author

**chilukurimk**
- GitHub: [@chilukurimk](https://github.com/chilukurimk)

## 🙏 Acknowledgments

- Built with modern web technologies
- Inspired by popular task management applications
- Created as a learning project for full-stack development

---