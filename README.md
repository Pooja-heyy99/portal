# PortalTrace

PortalTrace is a Portaldot-native supply-chain transparency dApp that lets manufacturers register products on-chain, lets users verify authenticity in the browser, and uses **POT** as gas for live blockchain actions.

It is built for the **Portaldot Online Mini Hackathon S1** and is designed to be a runnable MVP with a clear demo flow.

## Problem

Supply chains still struggle with:

For this hackathon, the key requirement is not just an idea. The project must be deployed on Portaldot, use **POT** for gas, and be demo-ready.

## Solution

PortalTrace stores product records on-chain and exposes them through a simple browser UI.

With PortalTrace, a user can:

The result is a transparent, easy-to-demo MVP that shows why Portaldot works well for real-world traceability.

## Why This Fits Portaldot

PortalTrace is intentionally built around the hackathon requirements:

## Features


## Tech Stack


## Architecture

### Contract

The contract stores product records and exposes the following actions:

### Frontend

The deployment package contains:

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


## Setup

### 1. Contract metadata

After building the ink! contract, upload the generated metadata file to:

`deploy/assets/portaltrace.contract.json`

### 2. Configure the app

Edit `deploy/index.html` and set:


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


## Troubleshooting

### Wallet does not connect


### Register fails


### Verify fails


## Open Source

Core contract code should remain open source as required by the hackathon rules.

## Short Pitch

PortalTrace is a Portaldot-native supply-chain verification MVP that lets anyone register and verify products on-chain using POT gas and a simple browser UI.
