# Amar Hassen Mohammednur — Portfolio

A full-stack developer portfolio with interactive 3D visuals, a database-driven blog, a contact pipeline, and a private admin dashboard for managing content.

**Live site:** [amar-shesheno-luxury.vercel.app](https://amar-shesheno-luxury.vercel.app)

## Overview

- **Interactive 3D hero** — Three.js scene with smooth Framer Motion transitions
- **Selected work** — six production full-stack projects with source links
- **Experience & designs** — professional background, scholarships, and Figma work
- **Blog** — full articles with likes, shares, views, and comments, served from MongoDB
- **Contact** — validated form persisting messages to the database
- **Admin dashboard** — authenticated panel with content statistics and full CRUD over blogs and messages
- **Dark / light theming** — persistent, system-aware toggle

## Architecture

```
Luxury-Portfolio/
├── backend/          Express REST API
│   ├── controllers/  Authentication
│   ├── models/       Admin, Blog, Message
│   └── routes/       /api/blogs · /api/messages · /api/admin
└── frontend/         React app (Create React App)
    └── src/
        └── components/   Sections, blog reader, admin panel
```

## Tech Stack

| Layer      | Technology                                             |
| ---------- | ------------------------------------------------------ |
| Frontend   | React 19, Three.js, Framer Motion, Tailwind CSS        |
| Backend    | Node.js, Express, Mongoose                             |
| Database   | MongoDB Atlas                                          |
| Security   | Helmet, rate limiting, input sanitization, JWT         |

## Getting Started

**Prerequisites:** Node.js 18+ and a MongoDB connection string.

```bash
# API
cd backend
npm install
# create .env — see Environment below
npm start

# Site
cd frontend
npm install
npm start
```

### Environment

The API expects the following variables in `backend/.env`:

| Variable          | Purpose                                   |
| ----------------- | ----------------------------------------- |
| `MONGODB_URI`     | MongoDB connection string                 |
| `JWT_SECRET`      | Secret for signing admin session tokens   |
| `ALLOWED_ORIGINS` | Comma-separated CORS origin allow-list    |

## Author

**Amar Hassen Mohammednur** — [github.com/Min-joona](https://github.com/Min-joona) · [LinkedIn](https://www.linkedin.com/in/amar-mohammednur-01aa32343)

## License

MIT
