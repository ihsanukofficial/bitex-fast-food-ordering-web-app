# BiteX

BiteX is a responsive restaurant menu and ordering experience built with React and Vite. It brings menu discovery, product customization, promotional deals, and a persistent shopping cart into a polished single-page application.

## Highlights

- Browse a structured catalog by category or search the menu by name and description.
- Review product details, pricing, ratings, variations, add-ons, and availability.
- Configure products with quantities and special instructions before adding them to the cart.
- Add individual products or bundled deals, apply promotional codes, and review calculated order totals.
- Retain cart contents across browser sessions with validated local storage and an in-memory fallback.
- Complete a client-side delivery form with accessible validation and order confirmation states.
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
| Hosting support | Static asset worker with SPA fallback |

## Getting Started

### Prerequisites

- Node.js `20.19+` or `22.12+`
- npm

### Installation

Install the project dependencies:

```bash
npm install
```

Start the local development server:

```bash
npm run dev
```

Vite will display the local address in the terminal after the server starts.

## Available Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Starts the Vite development server with hot module replacement. |
| `npm run build` | Validates application data and creates a production build in `dist/`. |
| `npm run check:data` | Verifies product, category, deal, review, and navigation invariants. |
| `npm run lint` | Runs Oxlint across the project. |
| `npm run preview` | Serves the production build locally for final verification. |

To verify a production build locally:

```bash
npm run build
npm run preview
```

## Application Routes

| Route | Purpose |
| --- | --- |
| `/` | Home page with featured content, popular items, and category discovery. |
| `/menu/:category?` | Searchable menu with an optional category filter. |
| `/deals` | Promotional deal collections and bundled offers. |
| `/about` | BiteX story, mission, values, and quality commitments. |
| `/productdetail/:slug` | Product information, reviews, configuration, and ordering controls. |
| `*` | Branded not-found experience for unknown routes. |

## Project Structure

```text
BiteX/
|-- public/                 Static icons and favicon assets
|-- scripts/                Build-time data validation
|-- server/                 Static asset worker and SPA route fallback
|-- src/
|   |-- assets/             Fonts, gallery images, and catalog imagery
|   |-- components/         Reusable interface components grouped by feature
|   |-- data/               Catalog, category, deal, and site content sources
|   |-- hooks/              Animation, accessibility, and navigation hooks
|   |-- pages/              Route-level page components
|   |-- utils/              Cart persistence and route-loading utilities
|   |-- App.jsx             Application shell and route definitions
|   `-- main.jsx            Browser entry point
|-- index.html              Application document shell
|-- vite.config.js          Build, development, and worker configuration
`-- package.json            Dependencies and project scripts
```

## Data and Content

The application keeps its core content in `src/data/`. `catalog.js` is the canonical product source, while categories, menu projections, popular items, and deals provide related presentation data.

After changing catalog or navigation content, run:

```bash
npm run check:data
```

This check prevents invalid builds by detecting duplicate identifiers, broken catalog references, incorrect category counts, mismatched review totals, missing deal images, and inconsistent routes.

## Cart and Checkout Behavior

Cart data is stored in the browser under the `bitex-cart` local-storage key. Product configurations are normalized before persistence, and stale catalog references are removed when the cart is opened.

Checkout is currently a front-end demonstration: the delivery form is validated in the browser, the cart is cleared after confirmation, and no order is sent to an external API or database.

## Production Build and Hosting

Running `npm run build` creates the optimized client bundle and copies the static asset worker to `dist/server/index.js`. The worker serves matching assets directly and falls back to `index.html` for client-side routes, allowing bookmarked and refreshed React Router URLs to resolve correctly.
