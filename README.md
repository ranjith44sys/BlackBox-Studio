# 📸 BlackBox Studio

> A full-stack photography studio web application for showcasing portfolios, managing bookings, and handling client inquiries — built with React + Vite on the frontend and Flask on the backend.

**Live Site:** [blackbox-studio23.netlify.app](https://blackbox-studio23.netlify.app)

---

## 🌟 Overview

BlackBox Studio is a modern photography studio website that serves as both a client-facing portfolio platform and a business tool. It features an animated gallery, service package listings, a booking system, and a contact form — all backed by a Python/Flask REST API with MongoDB and email notification support.

---

## 🗂️ Project Structure

```
BlackBox-Studio/
├── client/                  # React + Vite frontend
│   ├── src/
│   │   ├── Home.jsx         # Landing page with auto-scrolling image gallery
│   │   ├── About.jsx        # About the studio
│   │   ├── packages.jsx     # Photography service packages
│   │   ├── contact.jsx      # Contact form
│   │   ├── client.jsx       # Gallery page
│   │   ├── App.jsx          # Route definitions
│   │   └── api.js           # Axios API config
│   ├── public/
│   ├── index.html
│   └── package.json
│
└── server/                  # Flask backend
    ├── app.py               # Flask app entry point
    ├── routes/
    │   ├── photos.py        # Photo upload routes
    │   ├── booking.py       # Booking creation
    │   ├── contact.py       # Contact form + email
    │   └── gallery.py       # Gallery listing & image serving
    ├── database/
    │   └── mongo_connection.py  # MongoDB via PyMongo
    ├── config/
    │   └── email_config.py  # Flask-Mail configuration
    ├── models/
    ├── uploads/             # Locally stored uploaded images
    └── requirements.txt
```

---

## ✨ Features

- **Animated Portfolio Gallery** — Smooth, infinite auto-scrolling image reel on the homepage
- **Gallery Page** — Browse all studio photographs served dynamically from the backend
- **Service Packages** — Detailed photography packages (Wedding, Portrait, Events, etc.)
- **Booking System** — Clients can submit bookings, stored in MongoDB
- **Contact Form** — Sends email notifications via Flask-Mail
- **About Page** — Studio story and team information
- **Responsive Design** — Mobile-friendly layout
- **WhatsApp Integration** — Direct WhatsApp chat button
- **Instagram & Social Links** — Social media integration

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| React 19 | UI framework |
| Vite 7 | Build tool & dev server |
| React Router DOM 7 | Client-side routing |
| Axios | HTTP requests |
| React Icons | Icon library |
| Lucide React | Additional icons |

### Backend
| Technology | Purpose |
|---|---|
| Flask | Python web framework |
| Flask-CORS | Cross-origin resource sharing |
| Flask-Mail | Email notifications |
| PyMongo | MongoDB driver |
| Gunicorn | Production WSGI server |
| Python-dotenv | Environment variable management |

---

## 🚀 Getting Started

### Prerequisites

- Node.js >= 18
- Python >= 3.9
- MongoDB (local or Atlas URI)
- A mail server (Gmail SMTP recommended)

---

### 1. Clone the Repository

```bash
git clone https://github.com/ranjith44sys/BlackBox-Studio.git
cd BlackBox-Studio
```

---

### 2. Backend Setup

```bash
cd server
pip install -r requirements.txt
```

Create a `.env` file in the `server/` directory:

```env
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/
MAIL_SERVER=smtp.gmail.com
MAIL_PORT=587
MAIL_USE_TLS=True
MAIL_USERNAME=your_email@gmail.com
MAIL_PASSWORD=your_app_password
MAIL_DEFAULT_SENDER=your_email@gmail.com
RECIPIENT_EMAIL=studio_owner@gmail.com
```

Run the Flask server:

```bash
python app.py
# Server runs on http://localhost:5000
```

---

### 3. Frontend Setup

```bash
cd client
npm install
npm run dev
# App runs on http://localhost:5173
```

---

## 📡 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/gallery` | List all gallery images |
| `GET` | `/api/uploads/images/<filename>` | Serve a specific image |
| `POST` | `/photos/upload` | Upload a photo |
| `POST` | `/booking/create` | Create a new booking |
| `POST` | `/contact/send` | Send a contact message (email) |

---

## 🌐 Pages & Routes

| Route | Component | Description |
|---|---|---|
| `/` | `Home.jsx` | Landing page with scrolling gallery |
| `/Gallery` | `client.jsx` | Full photo gallery |
| `/services` | `packages.jsx` | Photography packages & pricing |
| `/about` | `About.jsx` | About the studio |
| `/contact` | `contact.jsx` | Contact form |

---

## 🏗️ Deployment

- **Frontend** — Deployed on [Netlify](https://netlify.com)
- **Backend** — Can be deployed on Render, Railway, or any platform supporting Python/Gunicorn

The CORS policy in `app.py` is configured to allow requests from `https://blackbox-studio23.netlify.app`. Update this if deploying to a different domain.

---

## 📁 Image Storage

Uploaded images are stored locally in `server/uploads/images/`. The backend serves them via the `/api/uploads/images/<filename>` endpoint. Optional GitHub-based image storage code is included (commented out) in `gallery.py` for future use.

---

## 📄 License

This project is currently unlicensed. All rights reserved by the author.

---

## 🙋 Author

**Ranjith** — [@ranjith44sys](https://github.com/ranjith44sys)
