# Coligo Fullstack Challenge

This repository contains a fullstack school management system with a **React + TypeScript** frontend and a **Node.js + Express + MongoDB** backend.

## Features

- Responsive dashboard with sidebar and topbar
- Announcements feed with avatars and subject icons
- Upcoming quizzes and assignments ("What's Due")
- Authentication (login/logout)
- Modern UI using Material-UI
- API integration for announcements and quizzes
- Unit and integration tests with Jest

## Project Structure

coligo-fullstack/
├── backend/
│ ├── controllers/
│ ├── models/
│ ├── routes/
│ ├── app.ts
│ └── server.ts
├── frontend/
│ ├── src/
│ │ ├── components/
│ │ ├── pages/
│ │ ├── services/
│ │ ├── store/
│ │ ├── tests/
│ │ ├── App.tsx
│ │ └── i18n.ts (i18n setup)
│ └── public/
├── .env
├── README.md
└── package.json


## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB
- Yarn or npm

### Environment Variables

Create a `.env` file in the `backend/` directory:
MONGO_URI=YOURURI

### Install Dependencies

```bash
cd backend
npm install

cd ../frontend
npm install
