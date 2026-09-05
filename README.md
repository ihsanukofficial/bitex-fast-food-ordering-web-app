# BiteX

BiteX is a full-stack restaurant ordering platform: a React/Vite storefront backed by an Express + MongoDB API. Customers register, browse a database-backed menu, order, and track their history from a profile page; a role-based Admin Panel manages every product, category, deal, promo code, order, user, and marketing-copy section (Home/About/Footer/Navigation) on the site.

## Highlights

- Browse a structured catalog by category or search the menu by name and description — all served from MongoDB via the API.
- Review product details, pricing, ratings, variations, add-ons, and availability.
- Configure products with quantities and special instructions before adding them to the cart.
- Add individual products or bundled deals, apply promotional codes (validated server-side), and review calculated order totals.
- Register, log in, and manage account details/password from a Profile page; checkout requires an account so orders always have a home to be tracked from.
- Place real orders: the backend re-resolves and re-prices every line item against live catalog data, so nothing is trusted from the client.
- Admin Panel (`/admin`, `role: 'admin'` accounts only) with full CRUD for Products, Categories, Deals, Promo Codes, Orders (status updates), Users (role/active management), and Site Content (Home/About/Footer/Navigation copy).
- Navigate responsive, route-split pages enhanced with GSAP motion and reduced-motion support.
- Validate catalog relationships automatically before every production build.

## Technology Stack

| Area | Technology |
| --- | --- |
| User interface | React 19 |
| Routing | React Router 7 |
| Build tooling | Vite 8 |
| Animation | GSAP 3 |
| Styling | CSS Modules and global CSS |
| Static analysis | Oxlint |
| Backend API | Node.js, Express 4, Mongoose 8 |
| Database | MongoDB (auto-starts an in-memory instance in dev when `MONGODB_URI` is unset) |
| Auth | JWT in an httpOnly cookie, bcrypt password hashing |
| Hosting support | Static asset worker with SPA fallback (frontend); standalone Node process (backend) |

## Getting Started

### Prerequisites

- Node.js `20.19+` or `22.12+`
- npm
- MongoDB is optional for local dev — see [Backend / Database](#backend--database) below.

### Installation

Install the frontend and backend dependencies (two separate `package.json`s):

```bash
cd frontend && npm install && cd ..
cd backend && npm install && cd ..
```

Copy the backend environment template and adjust as needed (safe defaults are pre-filled for local dev):

```bash
cp backend/.env.example backend/.env
```

Start the backend API (in one terminal):

```bash
cd backend
npm run dev
```

Start the frontend dev server (in another terminal):

```bash
cd frontend
npm run dev
```

Vite proxies `/api` and `/uploads` to the backend (`http://localhost:5000` by default — override with `VITE_API_PROXY_TARGET`), so open the Vite URL shown in the terminal (typically `http://localhost:5173`) and everything just works.

### Backend / Database

By default (`MONGODB_URI` unset in `backend/.env`), the API auto-starts an **in-memory MongoDB** and seeds it from `frontend/src/data/*.js` on first boot — zero setup, but data resets whenever the server restarts. For persistent data, set `MONGODB_URI` in `backend/.env` to a local MongoDB instance or a MongoDB Atlas connection string, then run the migration once:

```bash
cd backend
npm run seed
```

The seed script creates one admin account from `SEED_ADMIN_EMAIL`/`SEED_ADMIN_PASSWORD` in `backend/.env` (defaults: `admin@bitex.com` / `change-this-password` — change these before any real deployment).

## Available Scripts

Frontend (run from `frontend/`):

| Command | Description |
| --- | --- |
| `npm run dev` | Starts the Vite development server with hot module replacement. |
| `npm run build` | Validates seed data and creates a production build in `dist/`. |
| `npm run check:data` | Verifies the `frontend/src/data/*.js` seed sources (product, category, deal, review, and navigation invariants). |
| `npm run lint` | Runs Oxlint across the project (frontend and backend). |
| `npm run preview` | Serves the production build locally for final verification. |

Backend (run from `backend/`):

| Command | Description |
| --- | --- |
| `npm run dev` | Starts the API with nodemon (auto-restarts on change). |
| `npm run start` | Starts the API without a file watcher. |
| `npm run seed` | Migrates `frontend/src/data/*.js` into MongoDB and (re)creates the admin account. |

## Application Routes

| Route | Purpose |
| --- | --- |
| `/` | Home page with featured content, popular items, and category discovery. |
| `/menu/:category?` | Searchable menu with an optional category filter. |
| `/deals` | Promotional deal collections and bundled offers. |
| `/about` | BiteX story, mission, values, and quality commitments. |
| `/productdetail/:slug` | Product information, reviews, configuration, and ordering controls. |
| `/register`, `/login` | Account creation and sign-in (supports `?redirect=` return-to). |
| `/profile` | Signed-in account details, password change, and order history. |
| `/admin/*` | Admin Panel — Dashboard, Products, Categories, Deals, Promo Codes, Orders, Users, Site Content. Requires `role: 'admin'`. |
| `*` | Branded not-found experience for unknown routes. |

## Project Structure

```text
BiteX/
|-- frontend/                React + Vite storefront
|   |-- public/              Static icons and favicon assets
|   |-- scripts/             Build-time seed-data validation
|   |-- server/              Static asset worker and SPA route fallback (frontend hosting only)
|   |-- src/
|   |   |-- assets/          Fonts, gallery images, and catalog imagery
|   |   |-- components/      Reusable interface components grouped by feature
|   |   |-- context/         AuthContext (session state)
|   |   |-- data/            Legacy static content — now used only as the backend seed script's input
|   |   |-- hooks/data/      API-backed data hooks (useCatalog, useCategories, useDeals, useContent, ...)
|   |   |-- hooks/           Animation, accessibility, and navigation hooks
|   |   |-- pages/           Route-level page components, including Admin/
|   |   |-- services/        apiClient — the fetch wrapper used by every hook and form
|   |   |-- utils/           Cart persistence and route-loading utilities
|   |   |-- App.jsx          Application shell and route definitions
|   |   `-- main.jsx         Browser entry point
|   |-- index.html           Application document shell
|   |-- vite.config.js       Build, development, dev-server API proxy, and worker configuration
|   `-- package.json         Frontend dependencies and project scripts
`-- backend/                 Express + MongoDB API (see backend/src for models/controllers/routes)
```

## Data and Content

Product, category, deal, and marketing-copy (Home/About/Footer/Navigation) data now lives in **MongoDB**, managed entirely from the Admin Panel. The original `frontend/src/data/*.js` files remain in the repository solely as the **input to `backend/src/seed/seed.js`** — the one-time migration that seeds the database (including copying every referenced image into `backend/uploads/`). They are no longer imported by any running page or component.

Before seeding (or as part of `npm run build`), run from `frontend/`:

```bash
npm run check:data
```

This check prevents an inconsistent migration by detecting duplicate identifiers, broken catalog references, incorrect category counts, mismatched review totals, missing deal images, and inconsistent routes in the seed source files.

## Cart and Checkout Behavior

Cart data is stored in the browser under the `bitex-cart` local-storage key, same as before. Placing an order requires being signed in; on submission the frontend sends the cart's product/deal references and selections to `POST /api/orders`, where the backend **re-resolves every item against live catalog data and computes its own prices** — client-supplied prices are never trusted. Successful orders clear the cart and appear immediately in the customer's Profile page and the admin Orders screen.

## Production Build and Hosting

Running `npm run build` creates the optimized client bundle and copies the static asset worker to `dist/server/index.js`. The worker serves matching assets directly and falls back to `index.html` for client-side routes, allowing bookmarked and refreshed React Router URLs to resolve correctly. The backend (`backend/`) deploys separately as a standalone Node process — point `CLIENT_ORIGIN` in its `.env` at the deployed frontend origin and the frontend's API calls at the deployed backend URL (or keep them same-origin behind a reverse proxy).
