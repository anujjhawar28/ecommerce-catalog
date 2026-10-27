# E-Commerce Product Catalog

Vue 3 + TypeScript storefront that browses [Fake Store API](https://fakestoreapi.com/) products by category, with global search and product detail pages.

## Requirements

- **Node.js:** v24.22.1
- **npm:** 12.1.0

## Setup

```bash
cd ecommerce-catalog
npm install
npm run dev
```

Open the URL shown in the terminal (typically `http://localhost:5173`).

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start Vite dev server |
| `npm run build` | Type-check and production build |
| `npm run preview` | Preview production build |
| `npm run test` | Run Vitest unit tests once |
| `npm run test:watch` | Run Vitest in watch mode |

## Architecture

### Data fetching strategy

The app calls **`GET /products` once** on the dashboard load, then groups and sorts products in the client. Fake Store returns a small catalog (~20 items), so a single request is simpler and faster than four parallel `/products/category/{category}` calls. Product detail uses cached store data when available; otherwise it calls **`GET /products/{id}`**.

Within each category, products are sorted by **`rating.rate` descending** (see `src/utils/productHelpers.ts`).

### State (Pinia)

`src/stores/products.ts` holds:

- Product list, loading/error flags, and search query
- Getters: sorted list, search-filtered list, map grouped by category
- Actions: `loadProducts`, `reloadProducts`, `loadProductDetail`, `setSearchQuery`

### Routing

- `/` — `HomeView` dashboard with horizontal category rows (electronics, jewelry, men's/women's clothing)
- `/product/:id` — Product detail

When the search box has text, `HomeView` shows a **search results grid** instead of category rows.

### UI components

Reusable pieces in `src/components/`:

- `AppHeader`, `SearchBar`, `CategoryRow`, `ProductCard`
- `LoadingSpinner`, `ErrorMessage`

Styling uses **Tailwind CSS v4** via `@tailwindcss/vite`.

### Accessibility

Semantic landmarks (`header`, `main`, `article`), labeled search input, keyboard-focus styles, carousel scroll buttons with `aria-label`, and descriptive `alt` text on product images.

## Tests

Vitest + Vue Test Utils:

- **`productHelpers.spec.ts`** — rating sort, category grouping, search filter
- **`products.spec.ts`** — Pinia fetch caching, grouping, search, error handling
- **`SearchBar.spec.ts`** — v-model and a11y label
- **`ProductCard.spec.ts`** — rendered content and router link

## Project structure

```
src/
  api/           HTTP client for Fake Store API
  components/    Presentational UI
  router/        Vue Router routes
  stores/        Pinia store
  types/         Shared TypeScript types
  utils/         Pure helpers + unit tests
  views/         Route-level pages
```
