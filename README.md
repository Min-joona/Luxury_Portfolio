# Amar Hassen Mohammednur — Portfolio

A full-stack developer portfolio and lightweight CMS: an animated marketing site backed by a database, with project case-study pages, a designed resume, a blog, a contact pipeline, and a private admin dashboard that manages every piece of content without touching code.

**Live site:** [amar-shesheno-luxury.vercel.app](https://amar-shesheno-luxury.vercel.app)

## Overview

### Public site
- **Animated hero** with a blur-up profile card (LQIP placeholder → full image) and dark / light theming
- **Projects** — grid of work, each linking to a full **case-study page** (`/projects/:slug`) with overview, challenge, outcome, features, and tech stack
- **Designs** — a Figma / visual gallery
- **Timeline** — career, skills, and scholarships as horizontally scrolling tracks
- **Resume** — a designed résumé page (`/resume`) that mirrors the site's styling, with animated language-proficiency bars plus **Download PDF** and **Print**
- **Blog** — full articles with likes, shares, views, and comments
- **Contact** — validated form that stores messages and emails the owner on submission

### Admin dashboard (`/admin`)
A private, JWT-protected control panel with analytics (Recharts) and full CRUD over **blogs, projects, designs, timeline, messages, and settings** — including **image uploads** (Cloudinary) and content **publish toggles**. Content edited here updates the public site immediately, since the frontend reads projects, designs, blogs, and the timeline from the API.

## Architecture

```
Luxury-Portfolio/
├── backend/               Express REST API
│   ├── controllers/       Authentication
│   ├── models/            Admin, Blog, Project, Design, Timeline, Message, Setting, PageView
│   ├── routes/            /api/blogs · /api/projects · /api/designs
│   │                      /api/timeline · /api/messages · /api/admin
│   ├── data/              Seed data
│   └── seedRunner.js      Idempotent content seeding
└── frontend/              React app (Create React App)
    └── src/components/     Sections, case-study & blog readers, resume, admin suite
```

The API caches its MongoDB connection and awaits it per request, so it runs reliably on serverless cold starts. Public content endpoints fall back gracefully, and the frontend degrades to built-in data if the API is unreachable.

## Tech Stack

| Layer      | Technology                                                        |
| ---------- | ----------------------------------------------------------------- |
| Frontend   | React 19, Three.js, Framer Motion, Tailwind CSS, Recharts         |
| Backend    | Node.js, Express, Mongoose                                        |
| Database   | MongoDB Atlas                                                     |
| Media      | Cloudinary                                                       |
| Email      | Nodemailer                                                       |
| Security   | Helmet, rate limiting, input sanitization, JWT                    |

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

The API reads the following from `backend/.env`:

| Variable                        | Purpose                                       |
| ------------------------------- | --------------------------------------------- |
| `MONGODB_URI`                   | MongoDB connection string                     |
| `JWT_SECRET`                    | Secret for signing admin session tokens       |
| `ALLOWED_ORIGINS`               | Comma-separated CORS origin allow-list        |
| `CLOUDINARY_*`                  | Credentials for image uploads                 |
| `EMAIL_*`                       | SMTP credentials for contact notifications    |

The frontend reads `REACT_APP_API_URL` (the deployed API base URL).

## Author

**Amar Hassen Mohammednur** — [github.com/Min-joona](https://github.com/Min-joona) · [LinkedIn](https://www.linkedin.com/in/amar-mohammednur-01aa32343)

## License

MIT
