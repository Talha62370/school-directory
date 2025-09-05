🏫 School Management Project

A MERN-like stack project (React + Node.js + MySQL) where schools can be added, stored, and displayed in card format with images and details.

🚀 Features

Add schools with details (name, address, city, state, contact, email, image).

Display schools in a clean card-based UI.

Real-time form submission with Axios.

Backend REST API with Express.js + MySQL.

.env support for sensitive configurations.

🛠️ Tech Stack
Frontend

React (Vite)

Axios (API calls)

React Router DOM

Backend

Node.js

Express.js

MySQL (mysql2)

dotenv (for environment variables)

Multer / Cloudinary (for handling images – optional)

⚙️ Installation & Setup
1️⃣ Clone the Repo
git clone https://github.com/your-username/school-project.git
cd school-project

2️⃣ Backend Setup
cd backend
npm install


Create .env file in backend/:

PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=schooldb
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret


Start backend:

npm start

3️⃣ Frontend Setup
cd frontend
npm install


Create .env file in frontend/:

VITE_API_URL=http://localhost:5000


Start frontend:

npm run dev

📡 API Endpoints
🔹 Add School

POST /api/addschool
Request Body (JSON):

{
  "name": "ABC Public School",
  "address": "123 Main St",
  "city": "Delhi",
  "state": "Delhi",
  "contact": "9876543210",
  "email": "abc@school.com",
  "image": "https://imageurl.com/school.jpg"
}


Response:

{ "message": "School added successfully" }

🔹 Get All Schools

GET /api/getschools
Response:

[
  {
    "id": 1,
    "name": "ABC Public School",
    "address": "123 Main St",
    "city": "Delhi",
    "state": "Delhi",
    "contact": "9876543210",
    "email": "abc@school.com",
    "image": "https://imageurl.com/school.jpg"
  }
]
