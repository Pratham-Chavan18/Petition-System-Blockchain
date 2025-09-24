# 🗳️ DecentralizeIt - A Blockchain-Powered Petition System

DecentralizeIt is a modern, decentralized petition platform that leverages the power of blockchain technology to ensure transparency, security, and immutability in online petitions. Built with Solidity, Ethereum, and React, this project aims to create a trustworthy environment for social advocacy and activism.

In a world where online petitions can influence social and political change, the integrity of these platforms is paramount. Traditional petition systems are centralized, making them vulnerable to censorship, data manipulation, and lack of transparency. DecentralizeIt solves these problems by building the petition system on the Ethereum blockchain. Every petition created and every signature collected is recorded as a transaction, creating a permanent and auditable record.

**Live Demo:** 🔗 [https://decentralizeit.vercel.app/](https://decentralizeit.vercel.app/)

## 📌 Key Features

- **Create Petitions**: Anyone can create a new petition, which is stored as a smart contract on the blockchain.
- **Sign Petitions**: Users can sign petitions with their unique Ethereum wallet address, ensuring each signature is authentic and verifiable.
- **Immutable Records**: Once a petition is created or signed, it cannot be altered or deleted, guaranteeing its integrity.
- **Transparent and Auditable**: All petitions and signatures are publicly viewable on the blockchain for complete transparency.
- **Decentralized**: The platform is not controlled by any single entity, making it resistant to censorship.
- **User-friendly Interface**: A clean and intuitive UI built with React makes it easy for users to create and sign petitions.

## 🛠️ Tech Stack

This project is built with a modern, full-stack decentralized application architecture:

| Category | Technology | Description |
|----------|------------|-------------|
| **Blockchain** | Solidity, Ethereum | For creating the smart contracts and backend logic |
| **Frontend** | React.js, Next.js, TypeScript | For building the user interface |
| **Web3** | Web3.js, ethers.js | To interact with the Ethereum blockchain |
| **Styling** | Tailwind CSS | For modern and responsive styling |
| **Development** | Truffle, Ganache | For local blockchain development and testing |
| **Deployment** | Vercel | For hosting the frontend application |
| **Wallet** | MetaMask | For user authentication and signing transactions |

## 🚀 Getting Started

Follow these instructions to get a local copy up and running for development and testing purposes.

### Prerequisites

Make sure you have the following installed on your machine:

- **Node.js** (v18.x or higher)
- **pnpm** or **npm**
- **Truffle**: `npm install -g truffle`
- **Ganache**: Download and install from the [official website](https://trufflesuite.com/ganache/)
- **MetaMask**: Install the browser extension

### Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Pratham-Chavan18/Petition-System-Blockchain.git
   cd Petition-System-Blockchain
2. Install dependencies:
   ```bash
   npm install #or pnpm install```
3. Set up Ganache:

Open Ganache and start a new "Quickstart" workspace
This will create a local Ethereum blockchain running on HTTP://127.0.0.1:7545

4. Configure MetaMask:

Add a new network in MetaMask with the following details:
Network Name: Ganache
New RPC URL: http://127.0.0.1:7545
Chain ID: 1337
Import an account from Ganache into MetaMask using its private key

5. Compile and deploy the smart contract:
   ```bash
   truffle migrate --reset```
   
6. Run the development server:
  ```bash
  pnpm dev
  # or
  npm run dev
```

Open http://localhost:3000 in your browser to see the application.

📖 Usage
Once the application is running, you can perform the following actions:

Connect Wallet: Click the "Connect Wallet" button to link your MetaMask wallet
Create a Petition: Fill out the petition form. This will trigger a transaction in MetaMask that you must confirm
Sign a Petition: Browse existing petitions and click the "Sign" button. This also requires transaction confirmation
View Petitions: You can view all petitions created on the platform

📂 Project Structure
```bash
/
├── app/                # Main application source code
├── components/         # Reusable React components
├── contracts/          # Solidity smart contracts
├── migrations/         # Truffle migration scripts
├── test/               # Test files for smart contracts
├── truffle-config.js   # Truffle configuration
└── ...                 # Other configuration files
```

