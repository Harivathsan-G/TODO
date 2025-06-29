TODO App (MERN Stack)

A simple and intuitive TODO list manager built using the MERN stack (MongoDB, Express, React, Node.js). This app allows users to create, update, and delete tasks seamlessly with a clean UI.

🚀 Features
✅ Add new tasks

✏️ Edit existing tasks

🗑️ Delete tasks

📋 View all tasks

🌐 Responsive UI using Tailwind CSS

🛠️ Tech Stack
Frontend
React

Tailwind CSS

Axios

Backend
Node.js

Express

MongoDB

Mongoose

📂 Folder Structure
bash
Copy
Edit
TODO/
├── todo_backend/      # Express backend
│   ├── models/        # Mongoose schemas
│   ├── routes/        # API routes
│   └── server.js      # Main server file
├── todo_frontend/     # React frontend
│   ├── src/
│   │   ├── components/
│   │   ├── App.jsx
│   │   └── index.css
└── README.md
⚙️ Installation

1. Clone the Repository
bash
Copy
Edit
git clone https://github.com/Harivathsan-G/TODO.git
cd TODO

3. Setup Backend
bash
Copy
Edit
cd todo_backend
npm install
# Create .env and add MongoDB URI
# Example:
# MONGO_URL=mongodb://localhost:27017/tododb
npm start

3. Setup Frontend
bash
Copy
Edit
cd ../todo_frontend
npm install
npm run dev

**This project is a part of a hackathon run by https://www.katomaran.com**




🧑‍💻 Author
Harivathsan G
GitHub

🤝 Contributing
Contributions are welcome! Feel free to open issues or submit pull requests.
