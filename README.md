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
cd frontend
npm install
```

## Database
### Install Postgres & Create a Server
1. Windows
- Download Postgres from [here](https://www.postgresql.org/download/windows/).
- The executable application will have steps for creating a server.
- Then in your command prompt:
  `psql`
  
  `CREATE DATABASE <name>;`
  
  `CREATE USER <user> WITH ENCRYPTED PASSWORD <password>;`
  
  `GRANT ALL PRIVILEGES ON DATABASE <name> TO <name>;`
  
2. Unix
- In your system terminal:
  
  `sudo apt install postgresql postgresql-contrib`

  `sudo systemctl start postgresql`

  `sudo systemctl enable postgresql`

  `sudo -i -u postgres`

  `psql`

  `CREATE DATABASE <name>;`
  
  `CREATE USER <user> WITH ENCRYPTED PASSWORD <password>;`
  
  `GRANT ALL PRIVILEGES ON DATABASE <name> TO <name>;`

  `\q`

## 🛠️ Environment Variables
Fraudflix requires a .env files to be properly configured.

### Root .env
Create a .env file in the root directory:
``` bash
PORT=5000

# Database
DB_NAME=<database_name>
DB_USER=<user>
DB_PASSWORD=<password>
DB_HOST=localhost

# Authentication Token
JWT_SECRET=<key>

```
Enter your own credentials for each `DB_` field when creating your Postgres server.

## 🎞️ TMDb Integration & Database Setup

Fraudflix uses the TMDb API to fetch popular movie and genre data. These are converted into JSON and then used to populate our PostgreSQL database.

### Steps to Fetch and Convert TMDb Data:

1.  Navigate to the `backend/services/` directory:

```bash
`cd backend/services`
```

2.  Make sure your `.env` file in this directory contains your TMDb API key as the name TMDB_API_KEY.

3.  Run the following scripts to fetch and convert the data:

```bash
node movieService.mjs 
node genreService.mjs
```

These scripts will generate or update the file `movies500.json`, which contains the movie data.

### Database Auto-Population

When the app runs, the backend reads from `movies500.json` to populate the PostgreSQL database automatically with the fetched movie and genre data.

## ▶️ Running the App
### Start the Backend
```bash
cd backend
npm run dev
```
### Start the Frontend
```bash
cd frontend
npm run dev
```
The app should now be running on http://localhost:5173.

## 📝 License
This project is for educational use only. No copyright infringement is intended.




