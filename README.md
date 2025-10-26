# Readvio

![readvio-logo](https://github.com/user-attachments/assets/218df98c-309e-426c-910d-d048f8f3d334)

![Next.js 16](https://img.shields.io/badge/Next.js-16-black?logo=nextdotjs&logoColor=white)
![React 19](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&logoColor=white)
![TailwindCSS v4](https://img.shields.io/badge/TailwindCSS-4.0-38BDF8?logo=tailwindcss&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer%20Motion-Animations-EF5DA8?logo=framer&logoColor=white)
![Zod + React Hook Form](https://img.shields.io/badge/Zod%20+%20React%20Hook%20Form-Validation-CA4245?logo=reacthookform&logoColor=white)
![Better Auth](https://img.shields.io/badge/Better%20Auth-Auth%20Helpers-6C63FF?logo=auth0&logoColor=white)
![Zustand](https://img.shields.io/badge/Zustand-State%20Management-764ABC?logo=redux&logoColor=white)
![Lucide Icons](https://img.shields.io/badge/Lucide%20Icons-%E2%9C%A8-orange?logo=lucide&logoColor=white)
![Recharts](https://img.shields.io/badge/Recharts-Data%20Visualization-0088FE?logo=chartdotjs&logoColor=white)

Readvio is a digital e-book store and online library built to showcase a modern referral and credit system. The project’s objective was to implement an end-to-end referral rewards program within a digital library.

Users can register or log in, share unique referral links, earn credits when their invited friends make purchases, and monitor all referral activity from an intuitive dashboard. 


Live Site: https://readvio.vercel.app

Loom Overview:



## Features

- Complete Referral & Credit System
- Referral dashboard with stats, activity chart, and unique shareable link
- Clean, responsive UI (custom Tailwind theme and breakpoints)
- Landing page with categories, carousels, and referral CTA
- Books listing and dynamic book details page with buy CTA
- Authentication (email/password) using Better Auth + React Hook Form + Zod
- Reusable UI: Drawer, Menu, Button, Inputs (text/number/password), Ratings

## Tech Stack

- Next.js 16 (App Router), React 19
- Tailwind CSS v4 (custom CSS variables, breakpoints)
- Framer Motion (animations)
- Zod + React Hook Form (validation/forms)
- Better Auth (auth client/server helpers)
- Zustand (state)
- Lucide Icons
- Recharts

---

## Getting Started

### Prerequisites

- Node.js ≥ 18.18 (recommended LTS)
- npm or pnpm

### Setup

1. Clone and install

```bash
git clone https://github.com/friyad/readvio.git
```

```bash
cd readvio
```

```bash
npm install
```

2. Configure environment variables (create a `.env.local` at the project root)

```bash
# Base URL of your backend API
NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1

# Your frontend application URL
NEXT_PUBLIC_BASE_URL=http://localhost:3000

# Better auth secret for authentication
BETTER_AUTH_SECRET=your_secret

# mongodb URI
MONGODB_URI=your_uri_here
```

3. Run the app in development

```bash
npm run dev
```

4. Build and start

```bash
npm run build
```

```bash
npm start
```

## Environment Variables

| Variable               | Required | Default                 | Description                                                                                        |
| ---------------------- | -------- | ----------------------- | -------------------------------------------------------------------------------------------------- |
| `NEXT_PUBLIC_API_URL`  | ✅ Yes   | –                       | Base URL of your backend API (e.g., `http://localhost:5000/api/v1`). Used for all server requests. |
| `NEXT_PUBLIC_BASE_URL` | ✅ Yes   | `http://localhost:3000` | URL of your frontend application. Used for routing, client-auth and redirects.                     |
| `BETTER_AUTH_SECRET`   | ✅ Yes   | –                       | Secret key used by **Better Auth** for authentication and token signing.                           |
| `MONGODB_URI`          | ✅ Yes   | –                       | Connection string for your MongoDB database for **Better Auth**.                                   |



## API Overview (Frontend Expectations)

The frontend expects a set of RESTful endpoints for books, purchasing, dashboard metrics, referrals, and authentication (via Better Auth). Replace with your backend implementation as needed.

### Books

- **GET** `${NEXT_PUBLIC_API_URL}/books`  
  Returns all books.  
  → `Book[]`

- **GET** `${NEXT_PUBLIC_API_URL}/books/:id`  
  Returns a single book by id.  
  → `Book`


### Purchase (User Only)

- **POST** `${NEXT_PUBLIC_API_URL}/purchase`  
  Creates a new purchase for the currently logged-in user. During the first purchase, it operates the referral logics.
  Expects: `{ bookId: string }`  
  Returns: purchase status/confirmation.


### Dashboard (User Only)

- **GET** `${NEXT_PUBLIC_API_URL}/dashboard`  
  Returns dashboard stats for the currently logged-in user (referral data, credits, recent activity, etc.).

- **GET** `${NEXT_PUBLIC_API_URL}/dashboard/referrals`  
  Returns a list of users referred by the current user and their states.

- **GET** `${NEXT_PUBLIC_API_URL}/dashboard/purchased-books`  
  Returns list of books was purchased by this user.


### Auth (Better Auth)

Client utilities live in `src/lib/auth-client.ts`. Email/password sign-in flows are triggered from the UI; configure providers on the server side as needed.

- Email sign-in: `signIn.email({ email, password })`
- Social sign-in: `signIn.social({ provider: "google" | "twitter" })`


**Note:**  
All `/dashboard/*` and `/purchase` endpoints require authentication (and are accessible by signed-in users only).

---

## Architecture & Business Logic
 
### Key Flows

- Landing Page (`src/app/(home)/page.tsx`)

  - Hero, categories, carousels, referral CTA
  - Colors and gradients align with `globals.css` theme

- Books

  - Listing (`src/app/books/page.tsx`) fetches from `NEXT_PUBLIC_API_URL`
  - Details (`src/app/books/[id]/page.tsx`) shows cover, tags, rating, price, buy CTA + related titles

- Auth

  - Login page (`src/app/(auth)/login/page.tsx`) uses React Hook Form + Zod + Better Auth client
  - Reusable inputs: `input-text`, `input-number`, `input-password`

- Referral Dashboard (`src/app/dashboard/*`)
  - Layout (`layout.tsx`) with `Topbar` and `Sidebar`; on small screens, sidebar appears in a `Drawer`
  - Overview with metric cards, activity visualization, and referral link card
  - Referrals list, credits, and link pages

### Styling & Responsiveness

- Tailwind v4 with custom tokens: `primary-blue`, `primary-orange`, `accent-blue`, etc.
- Custom breakpoints (e.g., `xsm`, `md`, `lg`) defined in `globals.css`

### Project Structure (excerpt)

```
src/
├── app/
│   ├── (home)/
│   │   ├── _components/
│   │   └── page.tsx
│   ├── (auth)/
│   │   └── login/
│   │       └── page.tsx
|   |       sign-up/
|   |       └── page.tsx
│   ├── books/
│   │   ├── _components/
│   │   ├── [id]/
│   │   │   └── page.tsx
│   │   └── page.tsx
│   └── dashboard/
│       ├── _components/
│       ├── referrals/
│       ├── credits/
│       ├── link/
│       └── layout.tsx
├── components/
│   ├── header/
│   ├── footer/
│   └── ui/
├── data/
├── hooks/
├── lib/
├── stores/
├── types/
├── utils/
└── validations/
```

## Screenshots

| Page         | Screenshot  |
| ------------ | ----------- |
| Home         | <img width="1920" height="951" alt="image" src="https://github.com/user-attachments/assets/9f0e27f6-fa7b-4333-bc3e-81b7ec1977bd" /> |
| Books        | <img width="1920" height="951" alt="image" src="https://github.com/user-attachments/assets/9f0e27f6-fa7b-4333-bc3e-81b7ec1977bd" /> |
| Book Details | <img width="1920" height="951" alt="image" src="https://github.com/user-attachments/assets/9f0e27f6-fa7b-4333-bc3e-81b7ec1977bd" /> |
| Dashboard    | <img width="1920" height="951" alt="image" src="https://github.com/user-attachments/assets/9f0e27f6-fa7b-4333-bc3e-81b7ec1977bd" /> |
| Referrals    | <img width="1920" height="951" alt="image" src="https://github.com/user-attachments/assets/9f0e27f6-fa7b-4333-bc3e-81b7ec1977bd" /> |
| Login        | <img width="1920" height="953" alt="image" src="https://github.com/user-attachments/assets/356550de-db27-4e17-9644-f37a1f8b9c73" /> |
| Sign Up      | <img width="1920" height="950" alt="image" src="https://github.com/user-attachments/assets/67cdccf0-83a5-4700-aea4-099140b9a306" /> |


## 🙏 Thank You

Thank you for checking out this project!  
If you find it helpful or inspiring, consider giving it a ⭐ on GitHub — it really motivates me to keep improving and sharing more projects.

Happy coding! 🚀