# Title Header (H1 header)
# 🎬 Fraudflix

Fraudflix is a Netflix-inspired web application built for educational purposes. While it doesn’t support video streaming due to copyright constraints, users can still enjoy the experience of browsing and searching for content, managing personal accounts, and navigating a genre-based homepage. Admin accounts provide additional functionality to manage users and content.

## 🧑‍💻 Contributors
- Khang Bui  
- Casey Martin  
- Aaron Howe  

---

## 🚀 Features
- User account creation and login
- Admin panel for content and user management
- Search functionality by title
- Genre-based homepage content display
- Integration with The Movie Database (TMDB) API

---

## 📦 Project Setup

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/fraudflix.git
cd fraudflix
```
### 2. Install Dependencies
#### Backend:
```bash
cd backend
npm install
```
#### Frontend:
```
cd ../frontend
npm install
```

## 🛠️ Environment Variables
Fraudflix requires a .env files to be properly configured.

### Root .env
Create a .env file in the root directory:
``` bash
PORT=5000

# Database
DB_NAME=fraudflixdb
DB_USER=postgres
DB_PASSWORD=Maruko12345!
DB_HOST=localhost

# Authentication Token
JWT_SECRET=supersecretkeythatnobodyknows

```
## ▶️ Running the App
### Start the Backend
```bash
cd backend
npm run dev
```
### Start the Frontend
```bash
cd ../frontend
npm run dev
```
The app should now be running on http://localhost:5173.

## 📝 License
This project is for educational use only. No copyright infringement is intended.




