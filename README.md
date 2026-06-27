# D Games Website

A modern e-commerce store for game torrent downloads and gaming controllers.

## Features

- **Game Store** — Browse and buy games with graphics-tier pricing (newer/bigger = higher price)
- **uTorrent Downloads** — After payment, magnet links open directly in uTorrent
- **Controllers** — Wired, wireless, fight sticks, and racing wheels
- **Shopping Cart & Checkout** — Full cart flow with payment form
- **Fair Pricing** — FC 26 costs more than FC 23; Mortal Kombat 11 costs more than classic MK1

## Getting Started

```bash
cd "/Users/mac/Documents/d games website"
npm install
npm run dev
```

Open http://localhost:5173 in your browser.

## Build for Production

```bash
npm run build
npm run preview
```

## How Downloads Work

1. Add games to cart and complete checkout
2. On the order confirmation page, click **Open in uTorrent**
3. uTorrent will launch and start downloading the magnet link

> Make sure uTorrent is installed and set as your default torrent client.
