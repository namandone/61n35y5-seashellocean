# Vision

An internal design playground for sharing early-stage workflows, interaction concepts, and prototypes — before they become product.

Live at: `https://YOUR-USERNAME.github.io/61n35y5-seashellocean/`

---

## What's inside

### Landing Page
The entry point. Lists all available pages and prototypes with a live search bar. Organised into two sections — **Prototypes** and **Core**.

### Prototypes

| Page | Description | Status |
|---|---|---|
| SSO Launcher | Unified login, app launcher, and account management for a retail SaaS platform | Live |

### Core

| Page | Description | Status |
|---|---|---|
| Design System | Component library, tokens, and usage guidelines for product surfaces | Coming soon |
| Design Guidelines | Principles, patterns, and standards that guide design decisions across products | Coming soon |

---

## SSO Launcher — screens

The SSO prototype covers three screens:

- **Login** — Split-panel login with animated gradient, email/password fields, and a security note
- **App Launcher** — Grid of platform apps with category filtering and licence status indicators
- **Profile** — Three-tab account page covering user info, enterprise settings (domain policy, password policy), and team management

---

## Stack

- React + TypeScript
- Vite
- Tailwind CSS v4

## Running locally

```bash
npm install
npm run dev
```

Open `http://localhost:5173`

## Deploying to GitHub Pages

```bash
npm run build
```

Then push the `dist/` folder to the `gh-pages` branch, or use the GitHub Actions workflow if configured.

---

*Internal use only · 2026*
