# Backend - GPC Resume Builder

Express API for the GPC Resume Builder application.

## Features

- Authentication (register/login)
- OTP flow support for registration
- Resume CRUD APIs
- Public/private resume visibility APIs
- AI enhancement endpoints
- Email integration via SMTP (Nodemailer)

## Tech Stack

- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication
- Nodemailer

## Environment Variables (`backend/.env`)

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

## Run Locally

```bash
cd backend
npm install
npm run dev
```

## Production

```bash
npm start
```

## Notes

- Keep all secrets in `.env` only.
- Do not commit `.env` to git.
