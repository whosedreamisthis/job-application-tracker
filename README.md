# Job Application Tracker

A modern Kanban-style job application tracker built with Next.js 16, Tailwind CSS 4, and MongoDB.

## Features

- **Kanban Board**: Visualize your job hunt progress with a drag-and-drop style interface.
- **Application Management**: Add, update, and track job applications including company, position, salary, and notes.
- **Authentication**: Secure user authentication powered by Better-Auth.
- **Auto-initialization**: Automatically creates a default job board for new users upon sign-up.
- **Responsive Design**: Built with Tailwind CSS 4 for a modern, responsive user interface.

## Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Database**: [MongoDB](https://www.mongodb.com/) with [Mongoose](https://mongoosejs.com/)
- **Authentication**: [Better-Auth](https://www.better-auth.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Components**: [Shadcn UI](https://ui.shadcn.com/) (Radix UI)

## Getting Started

### Prerequisites

- Node.js installed
- MongoDB instance (local or Atlas)

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd job-application-tracker
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   Create a `.env.local` file in the root directory and add the following:
   ```env
   MONGODB_URI=your_mongodb_uri
   BETTER_AUTH_SECRET=your_better_auth_secret
   BETTER_AUTH_URL=http://localhost:3000
   NEXT_PUBLIC_BETTER_AUTH_URL=http://localhost:3000
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Seeding Data

To seed the database with sample job applications for testing:
```bash
npm run seed:jobs
```

## Scripts

- `npm run dev`: Starts the development server.
- `npm run build`: Builds the application for production.
- `npm run start`: Starts the production server.
- `npm run lint`: Runs ESLint for code quality checks.
- `npm run seed:jobs`: Seeds the database with initial job data.

## Learn More

To learn more about the technologies used in this project, check out their respective documentations.
