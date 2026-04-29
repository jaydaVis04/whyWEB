# whyWEB

whyWEB is a full-stack CRUD web application built for a web design class. It teaches users why web development matters and gives them a polished dashboard for managing web development learning topics stored on a server.

## What the app does

- Shows a professional landing page explaining why web development is useful
- Displays a topic dashboard backed by a real Express API
- Lets the user add, view, edit, search, filter, and delete learning topics
- Stores topic data in a JSON file on the server so changes persist after refresh

## What CRUD means in this project

CRUD stands for:

- Create: add a new learning topic
- Read: view all topics or a single topic's details
- Update: edit an existing topic
- Delete: remove a topic from the database

## Client, server, and data storage

- `client/`: the Vue 3 frontend built with Vite
- `server/`: the Node.js + Express backend
- `server/data/topics.json`: the server-side JSON file that stores the data

The frontend talks to the backend through REST API routes. The backend must be running while you use the frontend.

## Project structure

```text
whyWEB/
  client/
  server/
  README.md
```

## Tech stack

- Frontend: Vue 3 + Vite + Vue Router
- UI style: shadcn-style Vue components
- Styling: Tailwind CSS
- Backend: Node.js + Express
- Data storage: JSON file on the server
- API communication: `fetch`

## Install the project

Open a terminal in the project folder and install the server first:

```bash
cd server
npm install
```

Then install the frontend:

```bash
cd ../client
npm install
```

## Run the backend

In one terminal:

```bash
cd server
npm run dev
```

The backend runs at:

```text
http://localhost:3001
```

## Run the frontend

In a second terminal:

```bash
cd client
npm run dev
```

The frontend runs at:

```text
http://localhost:5173
```

Open `http://localhost:5173` in your browser.

## Important note about the backend

Keep the backend running while you use the frontend. If the backend is not running, the dashboard cannot load or save topics.

## API routes

The Express server includes these routes:

- `GET /api/topics` - return all topics
- `GET /api/topics/:id` - return one topic by id
- `POST /api/topics` - create a new topic
- `PUT /api/topics/:id` - update a topic
- `DELETE /api/topics/:id` - delete a topic

## shadcn-vue style setup notes

This project is already organized with reusable `components/ui` primitives in a shadcn-style structure. If your instructor wants to see the official Vite-friendly shadcn-vue initialization flow, these are the common commands:

```bash
cd client
npx shadcn-vue@latest init
npx shadcn-vue@latest add button card badge dialog input textarea select alert skeleton
```

The app is already built and does not require rerunning those commands unless you want to regenerate or expand the UI library.

## How the app works

1. The Home page introduces the purpose of learning web development.
2. The Dashboard page loads topics from the Express server.
3. When you add, edit, or delete a topic, the frontend sends a request to the backend.
4. The backend updates `server/data/topics.json`.
5. Refreshing the page still shows the latest data because it is stored on the server.

## Demo Checklist

Use this for your class video:

1. Open the home page
2. Explain what whyWEB is
3. Go to the topic dashboard
4. Show the existing topics from the server
5. Use the search and filters
6. Add a new topic
7. View that topic's details
8. Edit the topic
9. Delete the topic
10. Refresh the page to show the data persists on the server

## Good things to point out in your demo

- The app uses a real client and a real server
- The data is not fake frontend-only data
- The dashboard has loading, empty, and error states
- Search and filters help organize the topic database
- The design looks like a modern product instead of a plain assignment

## If something is not loading

- Make sure the backend terminal is still running on port `3001`
- Make sure the frontend terminal is running on port `5173`
- Check that you ran `npm install` in both `server/` and `client/`
- If port `3001` is busy, update the server port and the Vite proxy in `client/vite.config.js`

## What to submit or show

- The home page
- The dashboard page
- A few CRUD actions
- A browser refresh that proves the JSON data persisted on the server
