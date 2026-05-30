# PortalTrace — Production Deploy Folder

This folder contains a minimal production-ready frontend you can upload to GitHub and deploy to Vercel.

Files:
- `index.html` — main page (set `window.PORTALTRACE_RUNTIME.contractAddress` before deploying)
- `style.css` — styling
- `app.js` — production frontend logic (uses Polkadot.js extension and `@polkadot/api` + `@polkadot/api-contract` via CDN)

Deployment steps:
1. Build and deploy your ink! contract and copy the generated contract metadata JSON to `deploy/assets/portaltrace.contract.json` (or update `contractMetadataUrl` in `index.html`).
2. Edit `index.html` and set `window.PORTALTRACE_RUNTIME.contractAddress` to the deployed contract SS58 address.
3. Commit and push the `deploy/` folder to the branch connected to Vercel.
4. In Vercel, set the Project Root to `/deploy` (or leave root and use `vercel.json` redirects). Redeploy.

Notes:
- This frontend does not include any demo/localStorage fallbacks — it expects a live Portaldot chain and browser extension.
- If you need a server-side build step, adapt the assets accordingly.
