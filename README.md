# 🏥 HealthCare+ Management System

A full-stack web application that digitally connects patients and doctors for managing appointments, medical records, and healthcare communication.

---

## 🌟 Features

### For Patients

- Register and login securely
- Search and filter doctors by specialization
- Book appointments with any doctor
- Track appointment status in real time (Pending → Accepted → Rejected → Completed)
- Store and manage personal medical history
- Receive email notifications instantly
- Upload profile photo and edit personal info

### For Doctors

- Register with specialization and experience
- View all incoming appointment requests
- Accept, reject, or complete appointments
- Set available days and working hours
- Toggle availability on or off
- Manage profile and consultation fee

---

## 🛠️ Technology Stack

| Layer          | Technology                                     |
| -------------- | ---------------------------------------------- |
| Frontend       | React.js, React Router, Axios, React Hot Toast |
| Backend        | Python, Django, Django REST Framework          |
| Authentication | JWT (JSON Web Tokens)                          |
| Database       | MySQL                                          |
| Email          | Gmail SMTP                                     |
| Storage        | Django Media Files                             |

---

## 📁 Project Structure

healthcare-app/
├── backend/ # Django backend
│ ├── core/ # Main settings and URL routing
│ ├── accounts/ # User auth, profiles, medical history
│ ├── appointments/ # Appointment management
│ ├── media/ # Uploaded files (profile photos)
│ ├── manage.py
│ └── .env # Environment variables (not pushed to GitHub)
├── frontend/ # React frontend
│ ├── src/
│ │ ├── components/ # Navbar
│ │ ├── context/ # Auth context
│ │ ├── pages/ # All pages
│ │ └── utils/ # API helper
│ └── public/
└── README.md

---

## ⚙️ Setup Instructions

### Prerequisites

Make sure you have these installed:

- Python 3.11+
- Node.js 18+
- MySQL 8.0+
- Git

---

### Step 1 — Clone the repository

```bash
git clone https://github.com/your-username/healthcare-app.git
cd healthcare-app
```

---

### Step 2 — Backend Setup

```bash
cd backend
python -m venv venv
venv\Scripts\activate        # Windows
pip install -r requirements.txt
```

Create a `.env` file inside the `backend` folder:

Create the MySQL database:

```sql
CREATE DATABASE healthcare_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

Run migrations:

```bash
python manage.py makemigrations
python manage.py migrate
python manage.py createsuperuser
```

---

### Step 3 — Frontend Setup

```bash
cd ../frontend
npm install
```

---

### Step 4 — Run the Application

**Terminal 1 — Backend:**

```bash
cd backend
venv\Scripts\activate
python manage.py runserver
```

**Terminal 2 — Frontend:**

```bash
cd frontend
npm start
```

---

### Step 5 — Open in Browser

---

## 📄 API Endpoints

| Method | Endpoint                       | Description                |
| ------ | ------------------------------ | -------------------------- |
| POST   | /api/auth/register/            | Register new user          |
| POST   | /api/auth/login/               | Login and get JWT token    |
| POST   | /api/auth/logout/              | Logout and blacklist token |
| GET    | /api/auth/profile/             | Get logged in user profile |
| PATCH  | /api/auth/profile/             | Update profile             |
| GET    | /api/auth/doctors/             | List all doctors           |
| GET    | /api/appointments/             | List appointments          |
| POST   | /api/appointments/             | Book appointment           |
| PATCH  | /api/appointments/{id}/status/ | Update appointment status  |
| GET    | /api/auth/medical-history/     | Get medical history        |
| POST   | /api/auth/medical-history/     | Add medical record         |

---

## 📸 Pages

| Page             | URL              | Access       |
| ---------------- | ---------------- | ------------ |
| Home             | /                | Everyone     |
| About            | /about           | Everyone     |
| Contact          | /contact         | Everyone     |
| Login            | /login           | Everyone     |
| Register         | /register        | Everyone     |
| Dashboard        | /dashboard       | Logged in    |
| Find Doctors     | /doctors         | Patient only |
| Appointments     | /appointments    | Logged in    |
| Book Appointment | /book/:id        | Patient only |
| Medical History  | /medical-history | Patient only |
| Profile          | /profile         | Logged in    |

---

## 🔐 User Roles

| Role    | Description                                                 |
| ------- | ----------------------------------------------------------- |
| Patient | Can book appointments, view doctors, manage medical history |
| Doctor  | Can manage appointment requests, set availability           |

---

## 📧 Email Notifications

Patients automatically receive emails when:

- ✅ Appointment is **accepted** by doctor
- ❌ Appointment is **rejected** by doctor
- 🏁 Appointment is marked as **completed**

---

## 👤 Author

**Anjali**

- Project: Healthcare Management System
- College Project — Full Stack Web Development

---

## 📝 License

This project is for educational purposes.
