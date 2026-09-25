# Binco Login System

A complete Week 11 full-stack login assignment built with React, Vite, Axios, Node.js, and Express. It includes responsive styling, client-side validation, API error handling, mock authentication, a protected dashboard, and logout behavior.

## Demo login

- **Email:** `demo@siva.com`
- **Password:** `Welcome1234`

The credentials are intentionally stored in the backend source for this no-database classroom project. Do not use this authentication approach in a real application.

## Requirements

- Node.js 18 or newer
- npm 9 or newer

Check your versions:

```bash
node --version
npm --version
```

## Install and run (recommended)

Open a terminal in the `week11-login-project` folder, then run:

```bash
npm install
npm run setup
npm run dev
```

Open **http://localhost:5173** in your browser. The frontend runs on port `5173` and the API runs on port `5000`.

To stop both servers, press `Ctrl + C` in the terminal.

## Alternative: run in two terminals

Terminal 1 — backend:

```bash
cd backend
npm install
npm run dev
```

Terminal 2 — frontend:

```bash
cd frontend
npm install
npm run dev
```

Then open **http://localhost:5173**.

## Available commands

Run these from the project root after installation:

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start frontend and backend together |
| `npm run build` | Create a production frontend build |
| `npm test` | Test the backend health and login endpoints |
| `npm start` | Start only the backend in production mode |

## Validation and login behavior

- Both fields are required.
- Email must use a valid format.
- Password must contain at least 8 characters.
- Invalid credentials show a clear error returned by the API.
- Valid credentials create a demo session and redirect to `/dashboard`.
- Opening `/dashboard` without a demo session redirects to `/`.
- Logging out clears the demo session and returns to the login page.

## API

### `POST /api/login`

Request body:

```json
{
  "email": "Tharani@.com",
  "password": "Welcome1234"
}
```

Successful response (`200`):

```json
{
  "success": true,
  "message": "Login successful.",
  "user": {
    "name": "Jordan Lee",
    "email": "Tharani@.com",
    "role": "Workspace Member"
  }
}
```

Invalid credentials return status `401`. Missing or malformed data returns status `400`.

## Project structure

```text
week11-login-project/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   └── ProtectedRoute.jsx
│   │   ├── pages/
│   │   │   ├── Dashboard.jsx
│   │   │   └── Login.jsx
│   │   ├── App.jsx
│   │   ├── api.js
│   │   ├── auth.js
│   │   ├── main.jsx
│   │   └── styles.css
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
├── backend/
│   ├── test/
│   │   └── login.test.js
│   ├── app.js
│   ├── server.js
│   └── package.json
├── package.json
└── README.md
```

## How the integration works

Vite forwards frontend requests beginning with `/api` to `http://localhost:5000` during development. Axios sends the form data to Express, and Express compares it with the static demo credentials. No database is used.

For deployment, serve the frontend and backend separately and set `VITE_API_URL` to the public backend URL before building the frontend.

