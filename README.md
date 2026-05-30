# PortalTrace

PortalTrace is a Portaldot-native supply-chain verification dApp.
It lets a manufacturer register a product on-chain, then lets anyone verify that record in the browser using a Polkadot wallet extension and **POT** for gas.

This folder is the production deploy package for the hackathon submission.
Upload this folder to Vercel as the site root.

## Short Pitch

Track products on Portaldot, prove origin on-chain, and verify them instantly from the browser.

## What It Does

- Register products on Portaldot with a wallet signature
- Store product name, manufacturer, origin, and IPFS hash on-chain
- Verify a product by ID from the public verify page
- Use the browser wallet extension for live transactions
- Pay gas in **POT**

## Why This Fits Portaldot

- It is a live blockchain app, not a mockup
- It uses the Portaldot network and the Polkadot browser extension
- It depends on **POT** for gas payments
- It has a clean demo flow: connect, register, verify

## Included Files

- `index.html` — product registration page
- `verify.html` — product verification page
- `style.css` — shared responsive styling
- `app.js` — live chain logic, wallet connection, and contract calls
- `assets/portaltrace.contract.json` — contract metadata file generated from the ink! build

## Tech Stack

- Frontend: HTML, CSS, JavaScript
- Blockchain: Portaldot
- Wallet: Polkadot browser extension
- Contract: ink! smart contract
- Gas token: POT
- Deployment: Vercel

## Contract Features

The ink! contract exposes:

- `create_product`
- `transfer_product`
- `verify_product`
- `get_product`
- `get_next_product_id`

## How It Works

### Register Flow

1. Open the deployed site
2. Click **Connect Wallet**
3. Fill in the product details
4. Submit the register transaction
5. Wait for on-chain confirmation

### Verify Flow

1. Open `verify.html`
2. Enter a product ID
3. Load the on-chain record
4. Show the details and verification status

## Setup

### 1) Build and deploy the contract

Build the ink! contract with your local Rust/ink! toolchain, deploy it to Portaldot, and copy the deployed contract address.

After the build, upload the generated metadata file to:

`deploy/assets/portaltrace.contract.json`

### 2) Configure the live app

Edit these files and set the deployed contract address:

- `deploy/index.html`
- `deploy/verify.html`

Both files already point to the Portaldot RPC endpoint and the metadata path.
Only the contract address needs to be filled in before deployment.

### 3) Deploy to Vercel

Set the Vercel project root to `/deploy`.
Then redeploy the site.

## How To Use

### For users

1. Open the deployed site
2. Click **Connect Wallet**
3. Register a product on the register page
4. Open the verify page
5. Enter the product ID and verify it

### For judges

1. Open the deployed URL
2. Confirm wallet connection works
3. Register a live product on Portaldot
4. Verify the same product by ID
5. Confirm the result comes from the chain

## Demo Video Flow

Use this sequence in the submission video:

1. Open the deployed app
2. Connect the wallet extension
3. Register a product on-chain
4. Open the verify page
5. Search the product by ID
6. Show the verified on-chain result

Keep the video short and direct.
The goal is to prove that the app works live with Portaldot and POT gas.

## Judging Criteria Alignment

- **Portaldot native**: runs against Portaldot and uses POT gas
- **Working MVP**: register and verify flows are both implemented
- **Real utility**: helps with provenance and anti-counterfeit checks
- **Clear demo**: simple path for judges to test quickly

## Submission Checklist

- [ ] Contract built and deployed on Portaldot
- [ ] Contract metadata uploaded to `deploy/assets/portaltrace.contract.json`
- [ ] Contract address added to `deploy/index.html` and `deploy/verify.html`
- [ ] Vercel project root set to `/deploy`
- [ ] Wallet extension tested in the browser
- [ ] POT is available in the connected wallet
- [ ] Register flow tested live
- [ ] Verify flow tested live
- [ ] Demo video recorded

## Troubleshooting

### Wallet does not connect

- Make sure the Polkadot browser extension is installed and unlocked
- Reload the page after approving extension access
- Confirm the correct account is selected in the extension

### Register fails

- Check that the contract address is set correctly
- Confirm the wallet has enough **POT** for gas
- Make sure the metadata file exists at `deploy/assets/portaltrace.contract.json`

### Verify fails

- Confirm the product ID exists on-chain
- Check that the deployed contract address matches the live contract
- Reload after a successful register transaction

## Open Source

The contract and frontend should remain open source for the hackathon submission.

## Final Note

PortalTrace is a live Portaldot verification demo built to be easy to test, easy to explain, and ready for submission.
