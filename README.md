# 🗳️ DecentralizeIt - Petition System on Blockchain

A decentralized petition management system built using **Solidity**, **Ethereum**, and **React**, designed to ensure transparency, security, and immutability for online petitions.

[![Live Demo](https://img.shields.io/badge/Live%20Site-Vercel-blue)](https://decentralizeit.vercel.app/)

---

## 🚀 Website

🔗 [https://decentralizeit.vercel.app/](https://decentralizeit.vercel.app/)

---

## 📌 Features

- 📜 **Create Petitions** – Allow users to submit new petitions.
- ✍️ **Sign Petitions** – Users can sign petitions directly on the blockchain.
- 🔐 **Immutable Records** – Petitions and signers are stored securely and immutably.
- 🔍 **View All Petitions** – Display and browse all active petitions.
- 🌐 **Decentralized Architecture** – Powered by smart contracts on Ethereum.

---

## 🛠️ Tech Stack

| Layer        | Technology                     |
|--------------|--------------------------------|
| Smart Contract | Solidity, Ethereum, Remix IDE    |
| Frontend     | React.js, Web3.js              |
| Deployment   | Vercel         |
| Wallet       | MetaMask                       |

---

### Prerequisites

- Node.js
- MetaMask extension
- Ganache
- truffle
  
### 📄 Smart Contract 
Written in Solidity
Deployed on Ethereum-compatible network
Use Remix IDE or Truffle to deploy and test locally

### Installation
DecentralizeIt: A Blockchain-Powered Petition System
DecentralizeIt is a modern, decentralized petition platform that leverages the power of blockchain technology to ensure transparency, security, and immutability in online petitions. Built with Solidity, Ethereum, and React, this project aims to create a trustworthy environment for social advocacy and activism.

Live Demo: https://decentralizeit.vercel.app/

📜 Project Overview
In a world where online petitions can influence social and political change, the integrity of these platforms is paramount. Traditional petition systems are centralized, making them vulnerable to censorship, data manipulation, and lack of transparency.

DecentralizeIt solves these problems by building the petition system on the Ethereum blockchain. Every petition created and every signature collected is recorded as a transaction on the blockchain, creating a permanent and unchangeable record. This ensures that all data is transparent, auditable, and resistant to censorship.

✨ Key Features
Create Petitions: Anyone can create a new petition, which will be stored as a smart contract on the blockchain.

Sign Petitions: Users can sign petitions with their unique Ethereum wallet address, ensuring that each signature is authentic and verifiable.

Immutable Records: Once a petition is created or signed, it cannot be altered or deleted, guaranteeing the integrity of the petition.

Transparent and Auditable: All petitions and signatures are publicly viewable on the blockchain, allowing for complete transparency.

Decentralized: The platform is not controlled by any single entity, making it resistant to censorship and shutdowns.

User-friendly Interface: A clean and intuitive user interface built with React makes it easy for users to create and sign petitions.

🛠️ Tech Stack
This project is built with a modern, full-stack decentralized application architecture:

Category	Technology	Description
Blockchain	Solidity, Ethereum	For creating the smart contracts and the backend
Frontend	React.js, Next.js, TypeScript	For building the user interface
Web3	Web3.js, ethers.js	To interact with the Ethereum blockchain
Styling	Tailwind CSS	For modern and responsive styling
Development	Truffle, Ganache	For local blockchain development and testing
Deployment	Vercel	For hosting the frontend application
Wallet	MetaMask	For user authentication and signing transactions

Export to Sheets
🚀 Getting Started
To get a local copy of this project up and running, follow these simple steps.

Prerequisites
Make sure you have the following installed on your local machine:

Node.js (v18.x or higher)

npm or pnpm

Truffle: npm install -g truffle

Ganache: Download and install from the official website.

MetaMask: Install the browser extension from the official website.

Installation & Setup
Clone the repository:

Bash

git clone https://github.com/Pratham-Chavan18/Petition-System-Blockchain.git
cd Petition-System-Blockchain
Install dependencies:

Bash

pnpm install
# or
npm install
Set up Ganache:

Open Ganache and start a new "Quickstart" workspace.

This will create a local Ethereum blockchain running on HTTP://127.0.0.1:7545.

Configure MetaMask:

Add a new network in MetaMask with the following details:

Network Name: Ganache

New RPC URL: http://127.0.0.1:7545

Chain ID: 1337

Import an account from Ganache into MetaMask using the private key.

Compile and deploy the smart contract:

Bash

truffle migrate --reset
Run the development server:

Bash

pnpm dev
# or
npm run dev
Open http://localhost:3000 in your browser to see the application.

usage
Once the application is running, you can perform the following actions:

Connect your Wallet: Click on the "Connect Wallet" button to connect your MetaMask wallet.

Create a Petition: Fill out the form to create a new petition. This will trigger a transaction in MetaMask that you will need to confirm.

Sign a Petition: Browse the existing petitions and click the "Sign" button to add your signature. This will also require a transaction confirmation.

View Petitions: You can view all the petitions that have been created on the platform.

📂 Project Structure
The project is organized as follows:

/
├── app/                # Main application source code
├── components/         # Reusable React components
├── contracts/          # Solidity smart contracts
├── migrations/         # Truffle migration scripts
├── test/               # Test files for smart contracts
├── truffle-config.js   # Truffle configuration
└── ...                 # Other configuration files

📄 License
Distributed under the MIT License. See LICENSE for more information.
```bash
git clone https://github.com/Pratham-Chavan18/Petition-System-Blockchain.git
cd Petition-System-Blockchain
npm install
npm start
