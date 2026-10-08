# 🎓 Blockchain Certificate Verification System

[![Solidity](https://img.shields.io/badge/Solidity-0.8.19-363636?style=for-the-badge&logo=solidity)](https://soliditylang.org/)
[![Hardhat](https://img.shields.io/badge/Hardhat-2.x-yellow?style=for-the-badge)](https://hardhat.org/)
[![Ethereum](https://img.shields.io/badge/Ethereum-Local%20Network-627EEA?style=for-the-badge&logo=ethereum)](https://ethereum.org/)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

> A decentralized application (DApp) for issuing, verifying, and revoking academic certificates on the Ethereum blockchain — ensuring tamper-proof credential management using smart contracts and SHA-256 hashing.

---

## 📌 Problem Statement

Traditional paper-based and digitally-issued certificates are highly vulnerable to forgery, tampering, and fraudulent verification. Organizations that rely on centralized databases are exposed to single points of failure, data breaches, and manipulation by insiders. Employers and institutions cannot easily verify the authenticity of certificates without contacting the issuing authority directly — a slow, inefficient, and sometimes unreliable process.

---

## 💡 Proposed Solution

This project proposes a **Blockchain-based Certificate Verification System** that leverages the immutability and transparency of the Ethereum blockchain to store and verify certificate records. Certificate data is hashed using **SHA-256** and stored on the blockchain via a **Solidity smart contract**. Any third party can verify a certificate's authenticity instantly without needing to trust a central authority.

---

## 🎯 Objectives

1. Develop a decentralized platform for issuing academic certificates.
2. Implement SHA-256 hashing to protect certificate integrity.
3. Enable instant, trustless certificate verification by anyone.
4. Allow authorized administrators to revoke invalid certificates.
5. Provide file-based verification to detect document tampering.
6. Eliminate dependency on centralized databases and intermediaries.

---

## ✨ Features

### 👩‍💼 Admin Features
- **Issue Certificate** — Issue a new certificate with student name, course, date, grade, and unique certificate ID.
- **Revoke Certificate** — Mark a previously issued certificate as revoked/invalid.
- **View All Issued Certificates** — Browse all certificates stored on the blockchain.
- **File Hash Verification** — Upload a certificate PDF and compute its SHA-256 hash for integrity checking.

### 🔍 Verifier Features
- **Verify by Certificate ID** — Instantly verify certificate authenticity using the certificate ID.
- **Verify by File Upload** — Upload a certificate file and detect if it has been tampered with.
- **View Certificate Details** — Display full certificate details (student, course, grade, date, issuer, status).
- **Revocation Status Check** — Immediately see if a certificate has been revoked.

---

## 🛠️ Technology Stack

| Layer              | Technology           | Version   | Purpose                                      |
|--------------------|----------------------|-----------|----------------------------------------------|
| Smart Contract     | Solidity             | 0.8.19    | On-chain certificate logic                   |
| Blockchain Network | Ethereum (Hardhat)   | Local      | Decentralized ledger                         |
| Dev Framework      | Hardhat              | 2.x       | Compile, deploy, and test smart contracts    |
| Frontend           | HTML / CSS / JS      | ES6+      | DApp user interface                          |
| Blockchain Library | ethers.js            | 5.x       | Connect frontend to Ethereum                 |
| Wallet             | MetaMask             | Latest    | Browser-based Ethereum wallet                |
| Hashing            | Web Crypto API       | Native    | SHA-256 certificate file hashing             |
| Testing            | Hardhat + Chai       | -         | Smart contract unit testing                  |
| IDE                | Visual Studio Code   | Latest    | Development environment                      |

---

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                        USER INTERFACE LAYER                         │
│                    HTML + CSS + JavaScript DApp                      │
│              (Admin Panel / Verifier Panel / File Check)            │
└────────────────────────────┬────────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────────┐
│                       WALLET / AUTH LAYER                           │
│                    MetaMask Browser Extension                        │
│           (Account Management / Transaction Signing)                │
└────────────────────────────┬────────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────────┐
│                      BLOCKCHAIN LIBRARY LAYER                       │
│                           ethers.js v5                              │
│        (Contract interaction / ABI encoding / Event listening)      │
└────────────────────────────┬────────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────────┐
│                       SMART CONTRACT LAYER                          │
│               CertificateVerification.sol (Solidity)                │
│     issueCertificate() / verifyCertificate() / revokeCertificate()  │
└────────────────────────────┬────────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────────┐
│                        BLOCKCHAIN LAYER                             │
│               Ethereum Hardhat Local Node (Chain ID: 31337)         │
│            (Immutable ledger / Decentralized storage)               │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 📁 Project Structure

```
blockchain_cerficate/
│
├── contracts/
│   └── CertificateVerification.sol   # Main smart contract
│
├── scripts/
│   └── deploy.js                     # Deployment script
│
├── test/
│   └── CertificateVerification.js    # Smart contract tests (27 tests)
│
├── frontend/
│   ├── index.html                    # Admin panel UI
│   ├── verify.html                   # Verifier panel UI
│   ├── style.css                     # Stylesheet
│   └── app.js                        # Frontend JavaScript logic
│
├── artifacts/                        # Compiled contract artifacts (auto-generated)
├── cache/                            # Hardhat cache (auto-generated)
│
├── hardhat.config.js                 # Hardhat configuration
├── package.json                      # Node.js dependencies
├── .env                              # Environment variables (gitignored)
├── .env.example                      # Example environment file
├── .gitignore                        # Git ignore rules
├── README.md                         # This file
├── PROJECT_DOCUMENTATION.md          # Full project report
└── VIVA_QUESTIONS.md                 # Viva preparation Q&A
```

---

## ✅ Prerequisites

Before you begin, ensure you have the following installed:

| Tool         | Minimum Version | Download                                                |
|--------------|-----------------|----------------------------------------------------------|
| Node.js      | v16.x or higher | [nodejs.org](https://nodejs.org/)                       |
| npm          | v7.x or higher  | Included with Node.js                                   |
| MetaMask     | Latest          | [metamask.io](https://metamask.io/)                     |
| VS Code      | Latest          | [code.visualstudio.com](https://code.visualstudio.com/) |
| Git          | Latest          | [git-scm.com](https://git-scm.com/)                     |

Verify installation:
```bash
node --version
npm --version
```

---

## 🚀 Installation

Follow these steps carefully to set up the project locally:

**Step 1:** Clone the repository
```bash
git clone https://github.com/your-username/blockchain_cerficate.git
cd blockchain_cerficate
```

**Step 2:** Install all Node.js dependencies
```bash
npm install
```

**Step 3:** Install Hardhat (if not already installed globally)
```bash
npm install --save-dev hardhat
```

**Step 4:** Copy the environment file and configure it
```bash
cp .env.example .env
```

**Step 5:** Verify the Hardhat setup
```bash
npx hardhat --version
```

**Step 6:** Compile the smart contracts
```bash
npx hardhat compile
```

You should see output confirming compilation success and the creation of the `artifacts/` folder.

---

## ⚙️ Configuration

Create a `.env` file in the root directory. The `.env.example` template is as follows:

```env
# .env.example

# Private key of the deployer account (Hardhat Account #0 - for development only)
# WARNING: Never use this key on a real/mainnet network
PRIVATE_KEY=0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80

# RPC URL of the local Hardhat node
RPC_URL=http://127.0.0.1:8545

# Chain ID for the Hardhat local network
CHAIN_ID=31337

# (Optional) Etherscan API key for mainnet/testnet verification
ETHERSCAN_API_KEY=your_etherscan_api_key_here
```

> ⚠️ **Security Warning:** The private key above is the Hardhat default Account #0. It is publicly known and only safe for **local development**. Never use it on a real network. Never commit your real `.env` file to version control.

---

## 📦 Smart Contract Deployment

You need **two terminal windows** open simultaneously.

### Terminal 1 — Start the Local Hardhat Blockchain Node
```bash
npx hardhat node
```

This starts a local Ethereum node at `http://127.0.0.1:8545` with Chain ID `31337`. You will see 20 test accounts with 10000 ETH each printed in the terminal. **Keep this terminal running.**

### Terminal 2 — Deploy the Smart Contract
```bash
npx hardhat run scripts/deploy.js --network localhost
```

After successful deployment, you will see output like:
```
Deploying CertificateVerification contract...
Contract deployed to: 0x5FbDB2315678afecb367f032d93F642f64180aa3
Contract owner: 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
```

> 📋 **Important:** Copy the contract address printed in the terminal. You will need to update this address in your frontend JavaScript file (`app.js` or `config.js`).

---

## 🦊 MetaMask Setup

### Step 1: Add the Hardhat Local Network to MetaMask

1. Open MetaMask in your browser.
2. Click the **network dropdown** at the top (usually shows "Ethereum Mainnet").
3. Click **"Add a network"** → **"Add a network manually"**.
4. Fill in the following details:

| Field            | Value                     |
|------------------|---------------------------|
| Network Name     | `Hardhat Local`           |
| New RPC URL      | `http://127.0.0.1:8545`   |
| Chain ID         | `31337`                   |
| Currency Symbol  | `ETH`                     |
| Block Explorer   | *(leave blank)*           |

5. Click **Save** and switch to the **Hardhat Local** network.

### Step 2: Import the Admin Account (Account #0)

1. In MetaMask, click the **account icon** (top right circle).
2. Click **"Import Account"**.
3. Select **"Private Key"** as the import type.
4. Paste the following private key:

```
0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
```

5. Click **Import**.

You should now see:
- **Account Address:** `0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266`
- **Balance:** 10000 ETH (local test ETH — not real)

> This is the **admin account** — the contract owner who can issue and revoke certificates.

---

## 🌐 Running the Frontend

### Option 1: VS Code Live Server (Recommended)

1. Install the **Live Server** extension in VS Code (`ritwickdey.LiveServer`).
2. Right-click on `frontend/index.html`.
3. Select **"Open with Live Server"**.
4. The app will open at `http://127.0.0.1:5500`.

### Option 2: Python HTTP Server

```bash
cd frontend
python -m http.server 8080
```

Then open your browser and go to: `http://localhost:8080`

### Option 3: Node.js HTTP Server

```bash
npx http-server frontend -p 8080
```

> ⚠️ **Important:** Do NOT open the HTML file directly by double-clicking (file:// protocol). MetaMask requires the page to be served over HTTP or HTTPS to inject the `window.ethereum` object.

---

## 📝 How to Issue a Certificate

1. Open the Admin Panel (`index.html`) in your browser.
2. Ensure MetaMask is connected and set to **Hardhat Local** network.
3. Click **"Connect Wallet"** — MetaMask will prompt you to connect.
4. Fill in the **Issue Certificate** form with demo data:

| Field              | Demo Value                          |
|--------------------|--------------------------------------|
| Certificate ID     | `CERT-2024-001`                      |
| Student Name       | `Rahul Sharma`                       |
| Course Name        | `Bachelor of Computer Science`       |
| Issue Date         | `2024-05-15`                         |
| Grade              | `A+`                                 |
| Certificate Hash   | *(auto-generated or enter manually)* |

5. Click **"Issue Certificate"**.
6. MetaMask will pop up asking to **confirm the transaction** — click **Confirm**.
7. Wait for the transaction to be mined (a few seconds on local network).
8. A success message will appear with the transaction hash.

---

## 🔍 How to Verify a Certificate

1. Open the Verifier Panel (`verify.html`) in your browser.
2. No wallet connection is needed for verification (it's a read-only operation).
3. Enter the **Certificate ID** (e.g., `CERT-2024-001`) in the search field.
4. Click **"Verify Certificate"**.
5. The system will query the blockchain and display:
   - ✅ **VALID** — Certificate exists, is not revoked, details shown.
   - ❌ **INVALID** — Certificate not found on blockchain.
   - 🚫 **REVOKED** — Certificate was issued but has been revoked.

---

## 📂 How to Verify Certificate File Integrity

1. Go to the **File Verification** section.
2. Click **"Choose File"** and select the certificate PDF/image.
3. The Web Crypto API will compute the **SHA-256 hash** of the file.
4. Click **"Verify File"** to check if the computed hash matches the one stored on the blockchain.
5. Result:
   - ✅ **File is authentic** — Hash matches the blockchain record.
   - ❌ **File has been tampered** — Hash does not match; the file was modified.

---

## 🚫 How to Revoke a Certificate

1. Open the **Admin Panel** with the admin (contract owner) account connected in MetaMask.
2. Go to the **Revoke Certificate** section.
3. Enter the **Certificate ID** to revoke.
4. Click **"Revoke Certificate"**.
5. Confirm the MetaMask transaction.
6. The certificate is now permanently marked as **REVOKED** on the blockchain.

> ⚠️ Note: Only the **contract owner** (admin) can revoke certificates. Any other account will get a transaction error.

---

## 🧪 Testing

Run the full test suite with:

```bash
npx hardhat test
```

Expected output:
```
  CertificateVerification
    Deployment
      ✔ Should set the right owner
      ✔ Should deploy with zero certificates
    Certificate Issuance
      ✔ Should issue a certificate successfully
      ✔ Should emit CertificateIssued event
      ✔ Should reject duplicate certificate IDs
      ✔ Should reject empty certificate ID
      ✔ Should reject empty student name
      ✔ Should reject empty course name
      ✔ Should reject empty certificate hash
      ✔ Only owner can issue certificates
    Certificate Verification
      ✔ Should verify a valid certificate
      ✔ Should return false for non-existent certificate
      ✔ Should return false for revoked certificate
      ✔ Should return correct certificate details
    Certificate Revocation
      ✔ Should revoke a certificate successfully
      ✔ Should emit CertificateRevoked event
      ✔ Should not revoke non-existent certificate
      ✔ Only owner can revoke certificates
      ✔ Cannot revoke already revoked certificate
    ... (and more)

  27 passing (2s)
```

---

## ❗ Common Errors and Solutions

### Error 1: `MetaMask is not installed`
**Cause:** MetaMask browser extension is not installed.  
**Solution:** Install MetaMask from [metamask.io](https://metamask.io/) and reload the page.

---

### Error 2: `Wrong network detected`
**Cause:** MetaMask is connected to Ethereum Mainnet or another network instead of Hardhat Local.  
**Solution:** Switch MetaMask to the **Hardhat Local** network (Chain ID: 31337).

---

### Error 3: `Contract not deployed / Invalid contract address`
**Cause:** The contract address in `app.js` doesn't match the deployed contract, or the Hardhat node was restarted (which resets the blockchain state).  
**Solution:** Restart the Hardhat node, redeploy the contract, and update the contract address in the frontend code.

---

### Error 4: `Cannot connect to http://127.0.0.1:8545`
**Cause:** The Hardhat node is not running.  
**Solution:** Open a terminal and run `npx hardhat node`. Keep it running in the background.

---

### Error 5: `Transaction reverted: Only owner can perform this action`
**Cause:** You are trying to issue or revoke a certificate using a non-admin MetaMask account.  
**Solution:** Switch to the admin account (`0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266`) in MetaMask.

---

### Error 6: `Certificate ID already exists`
**Cause:** You are trying to issue a certificate with a Certificate ID that is already registered on the blockchain.  
**Solution:** Use a unique Certificate ID (e.g., `CERT-2024-002`).

---

### Error 7: `window.ethereum is undefined`
**Cause:** The HTML file is being opened directly (using `file://` protocol) instead of being served by an HTTP server.  
**Solution:** Use VS Code Live Server or `python -m http.server` to serve the files over HTTP.

---

### Error 8: `Nonce too high` or `Invalid nonce`
**Cause:** MetaMask has cached a nonce from a previous Hardhat session. When the Hardhat node restarts, the blockchain resets, but MetaMask still has old state.  
**Solution:** In MetaMask, go to **Settings → Advanced → Clear Activity Tab Data** (or "Reset Account"). This resets the nonce without removing your accounts.

---

### Error 9: `npm install` fails — ENOENT or permission error
**Cause:** Node.js or npm is not properly installed, or there's a permission issue.  
**Solution:** Run the terminal as Administrator (Windows) or use `sudo` (Linux/Mac). Verify Node.js installation with `node --version`.

---

### Error 10: `HardhatError: Cannot find module` 
**Cause:** Dependencies are not installed.  
**Solution:** Run `npm install` in the project root directory.

---

## 🔮 Future Scope

- **Testnet/Mainnet Deployment** — Deploy to Ethereum testnets (Sepolia, Goerli) and eventually mainnet for real-world use.
- **IPFS Integration** — Store actual certificate PDFs on IPFS and save only the content hash on-chain to reduce gas costs.
- **QR Code Verification** — Generate a QR code for each certificate that links directly to the blockchain verification page.
- **Multi-Institution Support** — Allow multiple educational institutions to register and issue certificates under their own authority.
- **Mobile Application** — Develop a React Native mobile app for easy certificate verification on smartphones.
- **NFT Certificates** — Issue certificates as ERC-721 Non-Fungible Tokens (NFTs) for better ownership representation.
- **Role-Based Access Control** — Implement multiple admin roles (super-admin, institution admin, verifier) using OpenZeppelin's access control.
- **Email Notifications** — Notify students via email when their certificates are issued or revoked.
- **Batch Issuance** — Issue multiple certificates in a single transaction to reduce gas costs for institutions.

---

## ⚠️ Limitations

- **Local Network Only** — This project runs on a local Hardhat node. Data is lost when the node is restarted.
- **No IPFS Storage** — The actual certificate documents are not stored on-chain or on IPFS; only hashes are stored.
- **Gas Costs** — On real Ethereum mainnet, issuing certificates costs real ETH (gas fees). On local, gas is free.
- **Single Admin** — Currently, only one admin (the contract deployer) can issue/revoke certificates.
- **No Backend** — There is no traditional backend/API. All data comes directly from the blockchain.
- **MetaMask Dependency** — The DApp requires MetaMask to be installed. Users without MetaMask cannot interact with the admin features.
- **No Authentication UI** — There's no login system; admin access is controlled purely by the MetaMask wallet address.

---

## 🔒 Security Considerations

1. **Private Key Protection** — Never commit real private keys to version control. The key shown in this README is for local development only.
2. **`onlyOwner` Modifier** — All state-changing admin functions are protected by the `onlyOwner` modifier in the smart contract.
3. **Input Validation** — The smart contract validates all inputs using `require()` statements to prevent empty or duplicate data.
4. **Immutability** — Once a certificate is issued, its core data cannot be modified — only revoked. This prevents tampering.
5. **SHA-256 Hashing** — Certificate hashes are collision-resistant, making it computationally infeasible to forge a matching document.
6. **No Ether Handling** — The contract does not handle or store ETH, reducing the attack surface for financial exploits.
7. **Event Logging** — All certificate issuances and revocations emit blockchain events, providing a full audit trail.
8. **Re-entrancy Safety** — The contract does not make external calls, eliminating re-entrancy attack vectors.

---

## 📄 License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.

---

## 👤 Author

Developed as a final-year engineering project demonstrating the application of blockchain technology in academic credential management.

---

*"Trust the math, not the middleman."*
