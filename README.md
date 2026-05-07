#  Expense Tracker App

A full-stack Expense Tracking web application that allows users to manage their finances by tracking daily expenses, and viewing reports.



##  Live Demo

*  Frontend (Netlify):
  https://expense-tracker-frontend100.netlify.app

*  Backend API (Render):
  https://expense-tracker-hhlo.onrender.com



##  Features

###  Authentication

* User registration
* Secure login with JWT authentication
* Token-based session handling

###  Expense Management

* Add new expenses
* Edit existing expenses
* Delete expenses
* View all expenses

###  Reports

* Total expense summary
* Daily expense breakdown
* Monthly expense reports

###  UX Improvements

* Dynamic report cards (not static)
* Ability to close reports manually
* Clean and structured dashboard layout
* Auto-clearing input fields after submission



##  Tech Stack

### Frontend

* HTML5
* CSS3
* JavaScript 

### Backend

* Python
* FastAPI
* SQLAlchemy
* PostgreSQL
* JWT Authentication

### Deployment

* Frontend: Netlify
* Backend: Render
* Database: Render PostgreSQL



##  Project Structure

```
EXPENSE TRACKER/
│
├── app/                    # Backend (FastAPI)
│   ├── main.py
│   ├── database.py
│   ├── routes/
│   │   ├── auth.py
│   │   ├── expenses.py
│   │   └── reports.py
│   ├── models/
│   └── schemas/
│
├── frontend/              # Frontend
│   ├── index.html
│   ├── login.html
│   ├── register.html
│   ├── css/
│   └── js/
│       ├── api.js
│       └── dashboard.js
│
├── alembic/               # Database migrations 
├── alembic.ini
├── requirements.txt
└── README.md
```


##  Installation (Local Setup)

### 1. Clone the repository

```
git clone https://github.com/Micheal-Onyinye/Expense-Tracker.git
cd EXPENSE TRACKER
```



### 2. Backend Setup

Create virtual environment:

```
python -m venv venv
venv\Scripts\activate   # Windows
```

Install dependencies:

```
pip install -r requirements.txt
```

Create `.env` file:

```
DATABASE_URL=your_local_database_url
SECRET_KEY=your_secret_key
ALGORITHM=HS256
```

Run server:

```
uvicorn app.main:app --reload
```

---

### 3. Frontend Setup

Just open:

```
frontend/index.html
```

Or use Live Server in VS Code.

---

##  Deployment

### Backend (Render)

* Connected GitHub repo
* Set environment variables:

  * `DATABASE_URL`
  * `SECRET_KEY`
  * `ALGORITHM`
* Start command:

```
uvicorn app.main:app --host 0.0.0.0 --port $PORT
```

---

### Frontend (Netlify)

* Uploaded `frontend` folder
* Connected to backend via API base URL

---

##  Environment Variables

| Variable     | Description                  |
| ------------ | ---------------------------- |
| DATABASE_URL | PostgreSQL connection string |
| SECRET_KEY   | JWT secret key               |
| ALGORITHM    | JWT algorithm (HS256)        |



##  Common Issues

###  Failed to fetch

* Check backend URL in `api.js`
* Ensure CORS is configured correctly

###  Database connection error

* Do NOT use `localhost` in production
* Use Render PostgreSQL external URL

###  Unauthorized (401)

* Token expired or missing
* User needs to login again



##  Future Improvements

* Add charts (monthly spending graph)
* Budget tracking
* Category filtering
* Export reports (PDF/CSV)
* Dark mode UI



##  Author

**Michael Onyinye**

* Python Backend Developer/ Automation
* Skilled in Python,FastAPI,SQLALChemy,RESTful API,PostgreSQL
* Currently learning AI Automation



##  License

This project is open-source and available for learning and personal use.
