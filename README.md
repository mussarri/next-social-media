# 🔗 Modern Social Media Web App

A modern full-stack social media platform built with **Next.js**, **Prisma**, and **MySQL**.  
Includes features like user authentication, posting, liking, commenting, and real-time updates.

---

## 🚀 Tech Stack

- **Frontend**: [Next.js](https://nextjs.org/) (App Router)
- **Backend**: API Routes (Server Actions)
- **Database**: PostgreSQL with [Prisma ORM](https://www.prisma.io/)
- **Auth**: Clerk
- **Styling**: Tailwind CSS
- **Deployment**: Vercel

---

## 🧩 Features

✅ User registration & login  
✅ Create, edit, and delete posts  
✅ Like & comment system  
✅ User profile pages  
✅ Responsive UI (mobile-friendly)  
✅ Protected routes (middleware + session-based access)  
✅ Server-side data fetching with Prisma  
✅ Clean and scalable project structure  
✅ Ready for WebSocket integration (for live notifications or chat)

---

## 📷 Screenshots

![Alt text](/social-media.png)
![Alt text](/social-media.png)
![Alt text](/social-media.png)

---

## ⚙️ Installation

```bash
git clone https://github.com/mussarri/next-social-media.git
cd next-social-media

Create .env
DATABASE_URL
CLERK_SECRET_KEY
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
WEBHOOK_SECRET
NEXT_PUBLIC_CLERK_SIGN_IN_URL
NEXT_PUBLIC_CLERK_SIGN_UP_URL
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
NEXT_PUBLIC_CLOUDINARY_API_KEY
CLOUDINARY_API_SECRET
NODE_ENV = production

npm install
npx prisma migrate dev
npm run dev
