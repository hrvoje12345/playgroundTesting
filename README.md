# 🧩 Fullstack Project

This is a fullstack project structured with workspaces. It contains:

- **Frontend** – React-based UI
- **Backend** – Node.js (Express) API

---

## 📁 Project Structure

```
playgroundTesting/
├── package.json            # Root - workspace config
├── frontend/
│   ├── package.json
│   └── .env                # Frontend env variables
├── backend/
│   ├── package.json
│   └── .env                # Backend env variables
└── README.md
```

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone git@github.com:hrvoje12345/playgroundTesting.git
cd playgroundTesitng
```

### 2. Install Dependencies

```bash
npm install
```

> This installs all dependencies across `frontend` and `backend`

---

## 🔐 Environment Variables

Create `.env` files in both `frontend/` and `backend/`.

### 📦 `frontend/.env`

```
REACT_APP_GOOGLE_CLIENT_ID=google-client-id
REACT_APP_API_URL=http://localhost:8080
```

### ⚙️ `backend/.env`

```
GOOGLE_CLIENT_ID=client-id
BACKEND_URL=http://localhost:8080
FRONTEND_URL=http://localhost:3000
PORT=8080
GOOGLE_CLIENT_ID=google-client-id
GOOGLE_CLIENT_SECRET=google-client-secret
SESSION_SECRET=google-session-secret
DATABASE_URL=postgress.url
```

---

## 📦 Scripts

### Frontend

```bash
cd frontend
npm run start
```

### Backend

```bash
cd backend
npm run start
```
