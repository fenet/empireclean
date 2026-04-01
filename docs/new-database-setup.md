# New database setup (EmpireClean)

This project uses Prisma + PostgreSQL.

## 1) Create a PostgreSQL database

Use one option:

- Local PostgreSQL
- Docker PostgreSQL
- Managed PostgreSQL (Neon, Supabase, Railway, Render, etc.)

Example local DB name:

- `empireclean`

## 2) Configure backend environment

In the backend folder, create an env file from the example:

- copy [backend/.env.example](../backend/.env.example) to `backend/.env`
- set `DATABASE_URL` to your real PostgreSQL connection string
- set `JWT_SECRET` and `ADMIN_INVITE_CODE`

Example:

- `DATABASE_URL=postgresql://postgres:postgres@localhost:5432/empireclean?schema=public`

## 3) Install backend dependencies

From `backend/`:

- `npm install`

## 4) Run Prisma migrations

From `backend/`:

- `npx prisma migrate deploy` (for existing migration files)

If you are starting fresh and want a new migration:

- `npx prisma migrate dev --name init`

## 5) Generate Prisma client

From `backend/`:

- `npx prisma generate`

## 6) (Optional) Open Prisma Studio

From `backend/`:

- `npx prisma studio`

## 7) Start backend

From `backend/`:

- `npm run dev`

## 8) Test connection quickly

The API should run and connect successfully when you can:

- register/login
- create a booking
- fetch bookings as admin

## Notes

- Provider is already PostgreSQL in [backend/prisma/schema.prisma](../backend/prisma/schema.prisma).
- If your DB host is remote, ensure network/firewall allows your machine.
- Keep secrets only in `backend/.env` (never commit real secrets).
