Project Structure
Apna-market app/
│
├── frontend/         # React frontend
│   └── ...
│
├── backend/         # Node.js/Express backend
│   └── ...
│
├── .env.example    # Sample env variables
├── README.md       # Project documentation
└── package.json    # Root package (optional)
Prerequisites
Node.js (v14+ recommended)

MongoDB (local or MongoDB Atlas)

npm or yarn

Backend Setup
Navigate to the backend folder:
cd backend
Install dependencies:
npm install
Create a .env file:
fill this
PORT=5000
MONGODB_URI=mongodb://localhost:27017/ecommerce
JWT_SECRET=your_jwt_secret
Start the backend server:
node server.js
Frontend Setup:
Navigate to the frontend folder:
cd frontend
Install dependencies:
npm install
Start the React app:
npm start
Open in Browser
Frontend: http://localhost:3000

Backend: http://localhost:5000

