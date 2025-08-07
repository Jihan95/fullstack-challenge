# Coligo Fullstack Challenge – Frontend

This is the frontend for the Coligo Fullstack Challenge, built with **React**, **TypeScript**, **Redux**, and **Material-UI**.

## Features

- Responsive dashboard layout with sidebar and topbar
- Announcements feed with teacher avatars and subject icons
- Upcoming quizzes and assignments ("What's Due")
- Authentication (login/logout)
- Modern UI using Material-UI v5
- API integration for announcements and quizzes
- Unit and integration tests with Jest and React Testing Library

## Getting Started

### Prerequisites

- Node.js (v16+ recommended)
- npm

### Installation

```bash
npm install
```

### Running the App

```bash
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### Running Tests

```bash
npm test
```

Runs all unit and integration tests in watch mode.

### Building for Production

```bash
npm run build
```

Builds the app for production to the `build` folder.

## Project Structure

```
src/
  components/      # Reusable UI components (Sidebar, Topbar, Announcement, etc.)
  pages/           # Page-level components (HomePage, Dashboard, etc.)
  services/        # API service modules (announcementService, quizService)
  store/           # Redux store and slices
  tests/           # Additional test utilities
```

## API Endpoints

- Announcements: `GET /api/announcements`
- Quizzes: `GET /api/quizzes`

> **Note:** The backend API base URL is configured in `src/services/announcementService.ts` and `src/services/quizService.ts`.

## Customization

- Update the API base URL in the service files if your backend runs on a different host/port.
- UI colors and branding can be changed in the theme or component styles.

## Learn More

- [React documentation](https://reactjs.org/)
- [Material-UI documentation](https://mui.com/)
- [Redux Toolkit documentation](https://redux-toolkit.js.org/)
- [Jest documentation](https://jestjs.io/)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)

---

© 2025 Coligo Fullstack Challenge
