# GPC Resume Builder

A full-stack AI-powered resume builder built for **Government Polytechnic College (GPC)**.
Users can create, edit, preview, and share resumes with public/private visibility controls.

## Features

- User registration and login
- OTP verification during registration (email-based)
- Resume builder with section-wise editing
- AI-assisted content generation/enhancement
- Resume preview page
- Public/private resume visibility
- Public resumes listing (preview-only access)
- Dashboard for managing user resumes

## Tech Stack

- Frontend: React, Vite, Tailwind CSS, Redux
- Backend: Node.js, Express.js
- Database: MongoDB
- Email: Nodemailer (SMTP)
- AI: OpenAI-compatible API provider

## Project Structure

```text
resumeBuilder/
├── frontend/        # React app
├── backend/         # Express API
├── .gitignore
└── README.md
```

## Environment Variables

### Backend (`backend/.env`)

```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

OPENAI_API_KEY=your_ai_api_key
OPENAI_BASE_URL=your_openai_compatible_base_url
OPENAI_MODEL=your_model_name

SMTP_USER=your_email@example.com
SMTP_PASS=your_email_app_password
```

### Frontend (`frontend/.env`)

```env
VITE_API_URL=http://localhost:3000
```

## Local Development

1. Clone this repository.
2. Create `.env` files in `backend/` and `frontend/`.
3. Install dependencies and run both servers.

```bash
# Backend
cd backend
npm install
npm run dev

# Frontend
cd ../frontend
npm install
npm run dev
```

## Deployment (Render)

- Deploy `backend` as a Render Web Service
- Deploy `frontend` as a Render Static Site
- Configure all required environment variables in Render dashboard
- Set frontend API URL to deployed backend URL

## Security Notes

- Never commit `.env` files or API keys.
- If any key is exposed, rotate/revoke it immediately.
