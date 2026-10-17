# TaskFlow – Task Management Dashboard

TaskFlow is a task management dashboard I built using React and Tailwind CSS. The idea behind this project was to create a simple and clean interface where users can manage their daily tasks, track their progress, and keep everything organized in one place.

I built this project to practice frontend development, work with React, and learn how to deploy a web application online. The project is deployed on Vercel and is available to try through the link below.

**Live Demo:** https://task-management-dashboard-two-sable.vercel.app/

**GitHub Repository:** https://github.com/Parag-Bhoyar/task-management-dashboard

## About the Project

TaskFlow provides a dashboard where users can view their tasks and manage them based on their current status. Instead of keeping everything in one long list, tasks can be viewed through separate sections.

The dashboard also displays task statistics, making it easier to get an overview of completed tasks, ongoing work, and overdue tasks.

## Features

- **Dashboard:** View task statistics and get an overview of your work.
- **All Tasks:** See and manage all available tasks in one place.
- **In Progress:** View tasks that are currently being worked on.
- **Completed:** Keep track of finished tasks.
- **Add Tasks:** Create new tasks with the available task details.
- **Edit Tasks:** Update existing task information.
- **Delete Tasks:** Remove tasks that are no longer needed.
- **Search:** Find tasks using the search feature.
- **Filters and Sorting:** Organize tasks using the available filtering and sorting options.
- **Task Priority:** Set and manage task priorities.
- **Local Storage:** Keep task data saved in the browser after refreshing the page.
- **Responsive Design:** Use the dashboard on different screen sizes.

## Technologies Used

- **React** – For building the user interface.
- **JavaScript** – For application logic and interactive features.
- **Vite** – For running the development server and building the project.
- **Tailwind CSS** – For styling the application.
- **Lucide React** – For icons.
- **Git and GitHub** – For version control and source code management.
- **Vercel** – For deploying the website.

## How It Works

The dashboard is divided into different sections so users can easily navigate between their tasks.

The Dashboard section shows an overview of task activity. All Tasks displays the complete task list, while In Progress and Completed show tasks according to their status.

Users can add new tasks, update existing ones, delete tasks, and use the available search and filtering options to manage their work.

Task data is stored in the browser's local storage, so it can remain available after refreshing the page in the same browser.

## Getting Started

If you want to run TaskFlow on your computer, follow these steps.

### Prerequisites

Make sure you have installed:

- Node.js
- npm
- Git

You can download Node.js from [nodejs.org](https://nodejs.org/).

### Installation

**1. Clone the repository**

```bash
git clone https://github.com/Parag-Bhoyar/task-management-dashboard.git
```

**2. Open the project folder**

```bash
cd task-management-dashboard
```

**3. Install the dependencies**

```bash
npm install
```

**4. Start the development server**

```bash
npm run dev
```

**5. Open the application**

Open the local URL displayed in your terminal. It will usually be:

`http://localhost:5173/`

## Build for Production

To check whether the project builds successfully for production, run:

```bash
npm run build
```

Vite generates the production files in the `dist` folder.

To preview the production build locally, run:

```bash
npm run preview
```

## Project Structure

The main files and folders are organized as follows:

```text
task-management-dashboard/
├── public/
├── src/
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
├── .gitignore
└── README.md
```

- `App.jsx` contains the main dashboard interface and task management logic.
- `index.css` contains the global styles and Tailwind CSS import.
- `main.jsx` starts the React application.
- `package.json` contains the project dependencies and scripts.
- `vite.config.js` contains the Vite configuration.

## Data Storage

Currently, TaskFlow uses browser local storage to save task information.

This means tasks can remain saved after refreshing the page, but they are not automatically synchronized between different browsers or devices. Clearing the browser's stored website data may also remove saved tasks.

## Deployment

I deployed TaskFlow using Vercel by connecting the GitHub repository.

The live application is available here:

**https://task-management-dashboard-two-sable.vercel.app/**

Future changes pushed to the connected GitHub branch can trigger a new deployment automatically.

## What I Learned

While building this project, I got practical experience with:

- Creating a user interface using React.
- Managing application state with React hooks.
- Handling user interactions and updating task data.
- Working with search, filters, and sorting.
- Saving data using browser local storage.
- Styling a responsive interface with Tailwind CSS.
- Managing project files using Git and GitHub.
- Building and deploying a web application with Vercel.

## Future Improvements

There are several things I would like to add in future versions:

- User registration and login.
- Database integration for storing tasks online.
- Synchronization across multiple devices.
- Task reminders and notifications.
- Calendar view for managing deadlines.
- Dark mode.
- More detailed task analytics.

## Author

**Parag Bhoyar**

GitHub: https://github.com/Parag-Bhoyar

I built TaskFlow as a practical project to improve my frontend development skills and gain experience taking a web application from development to deployment.

Thanks for checking out my project!

