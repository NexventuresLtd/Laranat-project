# Lanart21 Creative Studio – Frontend

React frontend for the Lanart21 Creative Studio website (illustration, comics, animation, branding).

## Prerequisites

- **Node.js** 18+ (recommended: 20+)
- **pnpm** (or npm / yarn)

To install pnpm:

```bash
npm install -g pnpm
```

## How to run the frontend

### 1. Install dependencies

From the `client_web` folder:

```bash
cd client_web
pnpm install
```

If you use npm instead:

```bash
npm install
```

### 2. Start the development server

```bash
pnpm dev
```

Or with npm:

```bash
npm run dev
```

Vite will start the app and show a local URL (e.g. `http://localhost:5173`). Open that URL in your browser. The page will reload when you change the code.

### 3. Stop the server

Press `Ctrl+C` in the terminal.

---

## Other commands

| Command        | Description                    |
|----------------|--------------------------------|
| `pnpm dev`     | Run the app in development     |
| `pnpm build`   | Build for production           |
| `pnpm preview` | Preview the production build   |
| `pnpm lint`   | Run ESLint                     |

### Build for production

```bash
pnpm build
```

Output is in the `dist` folder. You can deploy that folder to any static host (e.g. Netlify, Vercel).

### Preview production build locally

```bash
pnpm build
pnpm preview
```

Then open the URL shown in the terminal (e.g. `http://localhost:4173`).

---

## Tech stack

- **React 19** + **TypeScript**
- **Vite** (dev server and build)
- **React Router** (multi-page routing)
- **Tailwind CSS** (styling)
- **Framer Motion** (animations)
- **Lucide React** (icons)

## Project structure

- `src/pages/` – Page components (Home, Books, Services, Portfolio, Contact, About, Login, Register)
- `src/comps/` – Reusable components (Navbar, Footer, Hero, etc.)
- `src/data/` – Static data (e.g. comics)
- `public/Image/` – Static assets (e.g. logo)
