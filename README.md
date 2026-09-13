# CAMS

**A full-stack College Academic Management System — grades, timetables, and notices, all in one place.**

![HTML](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-000000?style=flat&logo=express&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=flat&logo=mysql&logoColor=white)
![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)

![Stars](https://img.shields.io/github/stars/your-username/campushub?style=social)
![Last commit](https://img.shields.io/github/last-commit/your-username/campushub)
![Issues](https://img.shields.io/github/issues/your-username/campushub)

---

| 3 | 1 | 4 | 0 |
|---|---|---|---|
| **User roles** | **Unified dashboard** | **Core modules** | **Paperwork left** |

---

## Table of contents
- [Why](#why)
- [Features](#features)
- [Screenshots](#screenshots)
- [How it works](#how-it-works)
- [Tech stack](#tech-stack)
- [Getting started](#getting-started)
- [Project structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## Why

Colleges still run marks on scattered spreadsheets, timetables on WhatsApp forwards, and notices on scattered notice boards. Students chase teachers for grades; teachers chase admins for room changes; admins chase everyone for reports. **CampusHub** puts all three roles — Student, Teacher, and Admin — on one platform, so:

- grades are entered once and show up on the student's dashboard immediately,
- timetables and notices are updated centrally instead of being re-typed into five group chats,
- and admins get a single place to manage students, teachers, and courses instead of juggling registers.

Built as a college mini-project to demonstrate a complete role-based web application with real authentication, a relational database, and a working front-to-back data flow.

## Features

| | |
|---|---|
| **Role-based dashboards** | Separate views and permissions for Student, Teacher, and Admin — each role only sees and does what it's supposed to. |
| **Grades & marks** | Teachers upload marks per subject/exam; students get an instant, organized grade report. |
| **Timetable management** | Admin sets up and edits the timetable centrally — every student and teacher sees the same source of truth. |
| **Notices & announcements** | Admin or teachers post notices that appear on every relevant dashboard. |
| **Secure authentication** | Session/JWT-based login with role-based access control — no page is reachable without the right role. |
| **Admin control panel** | Add/remove students and teachers, assign courses, and generate quick reports. |
| **Responsive UI** | Works on desktop and mobile browsers without a separate app. |

## Screenshots

| Login | Student Dashboard | Teacher Dashboard | Admin Panel |
|---|---|---|---|
| *Role-based login* | *Grades, timetable & notices at a glance* | *Upload marks & post notices* | *Manage students, teachers, courses* |

*(Add real screenshots here once the UI is ready — drop images into a `/screenshots` folder and link them.)*

## How it works

```
                ┌─────────────┐
                │   Browser   │
                │ (HTML/CSS/JS)│
                └──────┬──────┘
                       │ HTTP requests
                       ▼
                ┌─────────────┐
                │  Express.js  │
                │   Backend    │
                │ (Auth + APIs)│
                └──────┬──────┘
                       │ SQL queries
                       ▼
                ┌─────────────┐
                │    MySQL     │
                │   Database   │
                └─────────────┘
```

A logged-in user's role (Student / Teacher / Admin) determines which routes and data they can access. Every action — uploading a grade, editing the timetable, posting a notice — writes to the database once and is reflected across every dashboard that depends on it, with no manual re-entry.

## Tech stack

| Layer | Technology |
|---|---|
| **Frontend** | HTML5, CSS3, Bootstrap, JavaScript |
| **Backend** | Node.js, Express.js |
| **Database** | MySQL |
| **Auth** | Session-based / JWT, role-based access control |
| **Version control** | Git & GitHub |

## Getting started

### Prerequisites
- Node.js (v18+)
- MySQL Server
- npm

### Installation

```bash
git clone https://github.com/your-username/campushub.git
cd campushub
npm install
```

### Configure the database

1. Create a MySQL database:
   ```sql
   CREATE DATABASE campushub;
   ```
2. Import the schema:
   ```bash
   mysql -u root -p campushub < database/schema.sql
   ```
3. Copy `.env.example` to `.env` and fill in your database credentials.

### Run the app

```bash
npm start
```

Visit `http://localhost:3000` in your browser.

## Project structure

```
campushub/
├── public/            # Static frontend (HTML, CSS, JS)
│   ├── student/
│   ├── teacher/
│   └── admin/
├── routes/            # Express route handlers (auth, grades, timetable, notices)
├── controllers/       # Business logic for each module
├── models/            # Database queries/models
├── database/
│   └── schema.sql     # Full DB schema
├── middleware/        # Auth & role-based access checks
├── config/            # DB connection & environment config
├── server.js          # App entry point
└── package.json
```

## Contributing

This is a college team project — contributions from team members happen via feature branches and pull requests into `main`. Suggested workflow:

```bash
git checkout -b feature/your-feature-name
git commit -m "Add: your feature"
git push origin feature/your-feature-name
```

Then open a PR for review before merging.

## License

This project is licensed under the MIT License — see [LICENSE](LICENSE) for details.

---

*If CampusHub helped with your own college project, consider starring the repo.* ⭐
