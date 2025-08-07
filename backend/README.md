
## Getting Started

### Prerequisites

- Node.js (v16+ recommended)
- MongoDB

### Backend Setup

1. Install dependencies:

    ```bash
    cd backend
    npm install
    ```

2. Create a `.env` file in `backend/` with your MongoDB URI:

    ```
    MONGO_URI=mongodb://localhost:27017/coligo
    ```

3. Start the backend server:

    ```bash
    npm run dev
    ```

   The backend runs on [http://localhost:5000](http://localhost:5000).

4. Run backend tests:

    ```bash
    npm test
    ```

### Frontend Setup

1. Install dependencies:

    ```bash
    cd frontend
    npm install
    ```

2. Start the frontend app:

    ```bash
    npm start
    ```

   The frontend runs on [http://localhost:3000](http://localhost:3000).

3. Run frontend tests:

    ```bash
    npm test
    ```

## API Endpoints

- Announcements: `GET /api/announcements`
- Quizzes: `GET /api/quizzes`

> **Note:** The API base URL is configured in `frontend/src/services/announcementService.ts` and `frontend/src/services/quizService.ts`.

## Customization

- Update the API base URL in the frontend service files if your backend runs on a different host/port.
- UI colors and branding can be changed in the theme or component styles.

## Learn More

- [React documentation](https://reactjs.org/)
- [Material-UI documentation](https://mui.com/)
- [Redux Toolkit documentation](https://redux-toolkit.js.org/)
- [Jest documentation](https://jestjs.io/)
- [Express documentation](https://expressjs.com/)
- [Mongoose documentation](https://mongoosejs.com/)

---

© 2025 Coligo Fullstack Challenge