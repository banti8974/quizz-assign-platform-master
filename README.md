# Quizz Assign Platform (Backend)

**GitHub Repo:** [Quizz Assign Platform](https://github.com/banti8974/quizz-assign-platform-master)  
**Deployed Link:** [Live App](https://quizz-assign-platform-master.onrender.com/)  

## 📌 Overview  
This is the backend for a **Quiz Assignment Platform** built using the **MERN stack**. It provides APIs for user authentication, quiz creation, quiz attempts, and result tracking.  

## 🚀 Features  
- User authentication (signup/login) with JWT  
- Create and manage quizzes with questions and time limits  
- Take quizzes with real-time timer support  
- Track scores and view correct/incorrect answers  
- Secure REST API with input validation and error handling  

## 🛠 Tech Stack  
- **Backend:** Node.js, Express.js  
- **Database:** MongoDB (Mongoose)  
- **Authentication:** JWT (JSON Web Token)  


## 💂️ Project Structure  
```
/backend
  ├── controllers/        # Business logic for APIs
  ├── models/             # Mongoose database schemas
  ├── routes/             # API endpoints
  ├── middleware/         # Authentication and validation
  ├── config/             # Database connection settings
  ├── server.js           # Main entry point
```

## 🛠 Setup & Installation  
### 1️⃣ Clone the Repository  
```bash
git clone https://github.com/banti8974/quizz-assign-platform-master.git
cd quizz-assign-platform-master
```
### 2️⃣ Install Dependencies  
```bash
npm install
```
### 3️⃣ Set Up Environment Variables  
Create a `.env` file in the project root and add:  
```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```
### 4️⃣ Run the Server  
```bash
npm start
```
The backend will run on `http://localhost:5000/`  

## 📬 API Endpoints  
| Method | Endpoint | Description |
|--------|---------|-------------|
| POST | `/api/auth/signup` | User Registration |
| POST | `/api/auth/login` | User Login |
| GET | `/api/quiz` | Fetch All Quizzes |
| POST | `/api/quiz/create` | Create a Quiz |
| POST | `/api/quiz/attempt` | Submit Quiz Response |

## 🔗 Frontend Integration  
The backend is designed to work with the React.js frontend. Ensure the frontend makes API requests to the correct backend URL.  

---

This README makes it easy to understand and run your project! 🚀

