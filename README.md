# Sortable List

A shareable, URL-persisted drag-and-drop list builder for organizing players across teams. No account or backend required — everything lives in the URL.

## Features

- **Drag to reorder** — rearrange items via drag and drop (mouse and touch)
- **Team color coding** — left border color indicates which team a player falls on based on configurable slot counts (Black, Blue, Gray, White)
- **Swipe actions on mobile** — swipe left to reveal Edit and Delete
- **Notes per player** — add freeform notes to any item; view inline or edit in a drawer
- **Shareable URL** — all list data, settings, title, and author are encoded in the URL; copy a shortened link via [is.gd](https://is.gd)
- **Settings drawer** — configure list name, author, and team slot counts
- **Summary modal** — grouped view of all players by team with counts

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3001](http://localhost:3001).

## How It Works

All state is stored in URL query params as base64-encoded JSON:

| Param    | Contents                        |
|----------|---------------------------------|
| `list`   | Array of list items             |
| `name`   | List title                      |
| `author` | Author name                     |
| `config` | Team slot configuration         |

The URL updates on every change via `history.replaceState`. Sharing the URL gives someone an exact copy of the list at that moment. On non-localhost deployments, the copy button shortens the URL via the [is.gd API](https://is.gd/apishorteningreference.php).

## Tech Stack

- [Next.js 16](https://nextjs.org) — static export (`output: "export"`)
- [React 19](https://react.dev)
- [dnd-kit](https://dndkit.com) — drag and drop
- [Tailwind CSS 4](https://tailwindcss.com)
- [Font Awesome](https://fontawesome.com) — icons
- TypeScript 6

## Scripts

```bash
npm run dev    # start dev server on port 3001
npm run build  # static export to /out
npm run lint   # prettier + eslint fix
```
