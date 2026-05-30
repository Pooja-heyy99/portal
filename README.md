# PortalTrace

PortalTrace is a Portaldot-native supply-chain transparency dApp that lets manufacturers register products on-chain, lets users verify authenticity in the browser, and uses **POT** as gas for live blockchain actions.

It is built for the **Portaldot Online Mini Hackathon S1** and is designed to be a runnable MVP with a clear demo flow.

## Problem

Supply chains still struggle with:
- Counterfeit products entering the market
- Weak proof of origin
- No simple way to verify authenticity
- Limited chain-of-custody visibility
- Trust based on paperwork instead of on-chain records

For this hackathon, the key requirement is not just an idea. The project must be deployed on Portaldot, use **POT** for gas, and be demo-ready.

## Solution

PortalTrace stores product records on-chain and exposes them through a simple browser UI.

With PortalTrace, a user can:
- Connect a wallet extension
- Register a product on-chain
- Verify a product by ID
- View product metadata such as name, manufacturer, origin, owner, and IPFS pointer

The result is a transparent, easy-to-demo MVP that shows why Portaldot works well for real-world traceability.

## Why This Fits Portaldot

PortalTrace is intentionally built around the hackathon requirements:
- **Built on Portaldot**: the app is meant to be deployed against a live Portaldot contract
- **Uses POT as gas**: live transactions are sent through the wallet using POT
- **Runnable MVP**: the frontend is a simple browser app with register and verify flows
- **Demo-ready**: the flow is easy to show in a short video
- **Open source**: the contract code stays in the repo

## Features

- Wallet connection via browser extension
- Product registration on-chain
- Product verification by product ID
- Product detail display
- QR code display for verification flow
- Responsive UI for desktop and mobile

## Tech Stack

- **Smart contract**: Rust + ink!
- **Network**: Portaldot
- **Gas token**: POT
- **Frontend**: HTML, CSS, JavaScript
- **Wallet integration**: Polkadot.js browser extension compatibility

## Architecture

### Contract

The contract stores product records and exposes the following actions:
- `create_product`
- `transfer_product`
- `verify_product`
- `get_product`
- `get_next_product_id`

### Frontend

The deployment package contains:
- `index.html` for registration
- `verify.html` for verification
- `style.css` for styling
- `app.js` for live chain interaction

## How It Works

### Register Flow

1. Open the app
2. Connect the wallet
3. Enter product name, manufacturer, and origin
4. Send the registration transaction
5. Wait for on-chain confirmation

### Verify Flow

1. Open the verify page
2. Enter a product ID
3. Load the on-chain record
4. Display the product details and verification status

## Demo Video Flow

For the submission video, show this sequence:

1. Open the deployed app
2. Connect the wallet extension
3. Register a product
4. Open the verify page
5. Search by product ID
6. Show the on-chain result and product details

Keep the video short and clear. The hackathon brief values a functioning MVP and a smooth explanation.

## Deployment Requirements

Before deployment, make sure you have:

- A deployed Portaldot contract
- The generated contract metadata JSON uploaded to the app
- The deployed contract address placed in `index.html`
- A wallet extension installed in the browser
- POT available for gas on the wallet

## Setup

### 1. Contract metadata

After building the ink! contract, upload the generated metadata file to:

`deploy/assets/portaltrace.contract.json`

### 2. Configure the app

Edit `deploy/index.html` and set:

- `rpcEndpoint`
- `contractAddress`
- `contractMetadataUrl`

### 3. Deploy to Vercel

Set the Vercel project root to `/deploy` and redeploy.

## How To Use

### For users

1. Open the deployed URL
2. Click **Connect Wallet**
3. Register a product or open the verify page
4. Enter a product ID to verify

### For judges

1. Open the deployed URL
2. Verify that wallet connect works
3. Register a product live on-chain
4. Open the verify page and confirm the record

## Judging Criteria Alignment

### Portaldot Native Deployment

PortalTrace is designed to run against Portaldot and use POT gas. This is the mandatory eligibility requirement.

### Demo Completion

The app includes a full register and verify flow that can be demonstrated live.

### Application Value

The product addresses counterfeiting, provenance, and trust in supply chains.

### Presentation Quality

The flow is simple:
wallet connect -> register -> verify -> show on-chain result.

## Submission Checklist

- [ ] GitHub repo link ready
- [ ] README includes problem, solution, and demo flow
- [ ] Demo video recorded
- [ ] Contract deployed on Portaldot
- [ ] POT gas available in wallet
- [ ] Frontend deployed and reachable
- [ ] Contract metadata uploaded
- [ ] Verified register and verify flow works

## Troubleshooting

### Wallet does not connect

- Install the supported wallet extension
- Unlock the wallet
- Refresh the page

### Register fails

- Check the contract address
- Check the metadata JSON path
- Make sure POT is available for gas

### Verify fails

- Confirm the product ID exists on-chain
- Confirm the contract is deployed correctly
- Check the browser console for RPC or metadata errors

## Open Source

Core contract code should remain open source as required by the hackathon rules.

## Short Pitch

PortalTrace is a Portaldot-native supply-chain verification MVP that lets anyone register and verify products on-chain using POT gas and a simple browser UI.
