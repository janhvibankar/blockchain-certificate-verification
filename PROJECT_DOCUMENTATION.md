# PROJECT DOCUMENTATION
## Blockchain-Based Certificate Verification System

**Course:** B.Tech Computer Engineering
**Subject:** Final Year Project
**Academic Year:** 2026–2027

---

## Abstract

This project presents a decentralized application (DApp) for issuing and verifying academic certificates using the Ethereum blockchain. The system eliminates the dependency on centralized databases for certificate verification by storing certificate records as immutable data on the blockchain. Certificates are issued by an authorized institute admin wallet through a Solidity smart contract. Anyone — students, employers, or universities — can verify a certificate's authenticity in real time using its unique Certificate ID. Additionally, a SHA-256 file hash mechanism allows users to verify that a physical or digital certificate file has not been tampered with. The application uses Hardhat for local blockchain development, ethers.js for blockchain interaction, MetaMask for wallet authentication, and vanilla HTML/CSS/JavaScript for the frontend.

---

## 1. Introduction

Academic certificates are critical documents that prove a person's qualifications and achievements. In today's world, certificate fraud is a growing problem. Many individuals present fake degrees, forged mark sheets, or modified certificates to employers and educational institutions. Traditional verification methods require contacting the issuing institution directly, which is slow, costly, and not always reliable — especially if the institution no longer exists or its records are lost.

Blockchain technology offers a powerful solution. A blockchain is a distributed, immutable ledger where data, once written, cannot be changed or deleted. By storing certificate records on a blockchain, we remove the single point of failure of a centralized database. The smart contract enforces rules automatically — only the authorized admin can issue certificates, and certificate IDs must be unique.

This project demonstrates a working prototype of such a system, built for local development using the Hardhat Ethereum development environment.

---

## 2. Existing System and Its Problems

### Existing System
Currently, certificate verification is handled in one of these ways:
- Manual verification by contacting the issuing institution via email or phone
- Centralized online portals maintained by the institution
- Physical document submission and verification by third parties

### Problems in the Existing System

| Problem | Description |
|---|---|
| **Certificate Forgery** | Certificates can be easily faked using photo editing software |
| **Slow Verification** | Contacting institutions manually takes days or weeks |
| **Single Point of Failure** | Institution's database can be hacked or go offline |
| **No Tamper Detection** | No reliable way to know if a certificate has been modified |
| **Geographic Limitations** | Employers in other countries cannot verify foreign certificates easily |
| **High Cost** | Some verification services charge fees |
| **Data Loss** | Institutions can lose records due to disasters, system failures |

---

## 3. Proposed System

The proposed system uses Ethereum blockchain technology to:

1. Store certificate records permanently on a decentralized network
2. Provide instant public verification via a web interface
3. Use SHA-256 cryptographic hashing to detect document tampering
4. Eliminate the need for any central authority in the verification process

The system consists of:
- A **Solidity smart contract** that stores and manages certificate records
- A **web frontend** (DApp) that allows admins to issue and verifiers to check certificates
- **MetaMask** as the wallet and transaction signer
- **ethers.js** as the JavaScript library to communicate with the blockchain

---

## 4. Objectives

1. Design and implement a Solidity smart contract for certificate management
2. Build a professional frontend DApp using HTML, CSS, and JavaScript
3. Integrate MetaMask wallet for secure transaction signing
4. Implement SHA-256 certificate file hashing using the browser Web Crypto API
5. Provide an admin dashboard for certificate issuance and revocation
6. Provide a public verification interface for certificate lookup
7. Write comprehensive automated tests for the smart contract
8. Deploy and test the system on a local Hardhat blockchain

---

## 5. Scope

**In Scope:**
- Issuing certificates on a local Ethereum blockchain
- Verifying certificates by Certificate ID
- SHA-256 file hash comparison for tamper detection
- Certificate revocation by admin
- Admin dashboard with certificate table
- 27 automated smart contract tests

**Out of Scope:**
- Deployment to Ethereum mainnet or paid testnet
- PDF generation
- Email notifications
- Multi-institution support
- Mobile application

---

## 6. Functional Requirements

| ID | Requirement | Priority |
|---|---|---|
| FR-01 | Admin can connect MetaMask wallet | High |
| FR-02 | Admin can issue a new certificate with all required fields | High |
| FR-03 | System generates SHA-256 hash of uploaded certificate file | High |
| FR-04 | Only admin wallet can issue certificates | High |
| FR-05 | Duplicate Certificate IDs must be rejected | High |
| FR-06 | Anyone can verify a certificate by ID | High |
| FR-07 | System displays full certificate details on verification | High |
| FR-08 | System shows NOT FOUND for unknown certificate IDs | High |
| FR-09 | Admin can revoke a certificate | Medium |
| FR-10 | Revoked certificates show REVOKED status | High |
| FR-11 | User can upload certificate file and compare hash | Medium |
| FR-12 | Admin dashboard shows all issued certificates | Medium |
| FR-13 | System shows transaction hash after issuance | Medium |

---

## 7. Non-Functional Requirements

- **Security:** Only admin can write data; no private keys in frontend code
- **Reliability:** Blockchain data is immutable and permanently stored
- **Performance:** Certificate verification completes within 2–3 seconds
- **Usability:** Interface is intuitive and beginner-friendly
- **Portability:** Runs on any OS with Node.js and a modern browser
- **Maintainability:** Well-commented code with clear structure
- **Scalability:** Smart contract can store thousands of certificate records

---

## 8. Hardware Requirements

| Component | Minimum Requirement |
|---|---|
| Processor | Intel Core i3 / AMD Ryzen 3 or better |
| RAM | 4 GB (8 GB recommended) |
| Storage | 5 GB free space (for Node.js, dependencies) |
| Internet | Required for installing packages (not for runtime) |
| Browser | Chrome, Firefox, or Brave (with MetaMask support) |

---

## 9. Software Requirements

| Software | Version | Purpose |
|---|---|---|
| Node.js | v18 or later | JavaScript runtime |
| npm | v8 or later | Package manager |
| Hardhat | v2.22.x | Ethereum development framework |
| Solidity | ^0.8.19 | Smart contract language |
| ethers.js | v6.7.x | Blockchain library |
| MetaMask | Latest | Browser wallet |
| VS Code | Latest | Code editor |
| Git | Latest | Version control (optional) |

---

## 10. System Architecture

```
┌──────────────────────────────────────────────────────────┐
│                     USERS                                │
│         Admin / Student / Employer / Verifier            │
└─────────────────────────┬────────────────────────────────┘
                          │  HTTP
                          ▼
┌──────────────────────────────────────────────────────────┐
│              FRONTEND DApp (Browser)                      │
│      index.html  |  style.css  |  app.js                 │
│   - Navigation   - Forms   - Verification UI             │
└─────────────────────────┬────────────────────────────────┘
                          │  window.ethereum API
                          ▼
┌──────────────────────────────────────────────────────────┐
│              MetaMask (Browser Extension)                 │
│     - Wallet Management   - Transaction Signing          │
│     - Account Management  - Network Switching            │
└─────────────────────────┬────────────────────────────────┘
                          │  JSON-RPC
                          ▼
┌──────────────────────────────────────────────────────────┐
│                   ethers.js v6                           │
│   - BrowserProvider  - Contract  - Signer               │
└─────────────────────────┬────────────────────────────────┘
                          │  Smart Contract Calls
                          ▼
┌──────────────────────────────────────────────────────────┐
│         CertificateVerification.sol (Smart Contract)     │
│   issueCertificate()  |  verifyCertificate()            │
│   revokeCertificate() |  getCertificate()               │
└─────────────────────────┬────────────────────────────────┘
                          │  Storage
                          ▼
┌──────────────────────────────────────────────────────────┐
│       Hardhat Local Blockchain (Chain ID: 31337)         │
│         mapping(string => Certificate)                   │
│            Permanent, Immutable Storage                  │
└──────────────────────────────────────────────────────────┘
```

---

## 11. Use Case Description

### Use Case 1: Admin Issues a Certificate

| Field | Description |
|---|---|
| **Actor** | Institute Admin |
| **Precondition** | Admin has MetaMask connected with admin wallet |
| **Main Flow** | Admin fills form → uploads certificate file → hash auto-generated → submits → MetaMask confirms → transaction sent to blockchain |
| **Postcondition** | Certificate record stored on blockchain; transaction hash displayed |
| **Exceptions** | Duplicate ID rejected; non-admin wallet rejected |

### Use Case 2: Verifier Checks a Certificate

| Field | Description |
|---|---|
| **Actor** | Student, Employer, or Anyone |
| **Precondition** | Certificate must have been issued on the blockchain |
| **Main Flow** | Verifier enters Certificate ID → clicks Verify → app queries blockchain → results displayed |
| **Postcondition** | Certificate details shown with VERIFIED/NOT FOUND/REVOKED status |
| **Exceptions** | Unknown ID returns NOT FOUND; revoked shows REVOKED |

### Use Case 3: File Hash Verification

| Field | Description |
|---|---|
| **Actor** | Student, Employer |
| **Precondition** | Certificate must be verified by ID first |
| **Main Flow** | User uploads certificate file → SHA-256 hash calculated → compared with blockchain hash |
| **Postcondition** | Shows whether file is authentic or tampered |

---

## 12. Data Flow

### Certificate Issuance Data Flow
```
Admin fills form
       ↓
Frontend validates input (all fields non-empty)
       ↓
File uploaded → Web Crypto API → SHA-256 Hash
       ↓
ethers.js calls contract.issueCertificate(...)
       ↓
MetaMask signs the transaction
       ↓
Transaction broadcast to Hardhat local blockchain
       ↓
Smart contract validates (onlyOwner, no duplicate ID)
       ↓
Certificate struct stored in mapping
       ↓
CertificateIssued event emitted
       ↓
Transaction receipt returned → TX hash displayed
```

### Certificate Verification Data Flow
```
Verifier enters Certificate ID
       ↓
ethers.js calls contract.verifyCertificate(certId)
       ↓
Contract returns status code (0/1/2) and message
       ↓
ethers.js calls contract.getCertificate(certId)
       ↓
Contract returns full certificate struct
       ↓
Frontend displays results in the UI
```

---

## 13. Smart Contract Design

### Certificate Struct

```solidity
struct Certificate {
    string  certificateId;    // Unique ID: "CERT-2026-001"
    string  studentName;      // "Rahul Patil"
    string  studentEmail;     // "rahul@example.com"
    string  courseName;       // "B.Tech Computer Engineering"
    string  instituteName;    // "Rajaram Institute of Technology"
    string  issueDate;        // "04 September 2026"
    string  certificateHash;  // SHA-256 hash of certificate file
    address issuer;           // Admin wallet address
    bool    revoked;          // false = active, true = revoked
    bool    exists;           // Used to check if record exists
}
```

### Storage Mapping

```solidity
mapping(string => Certificate) private certificates;
```

Maps a Certificate ID string to the Certificate struct. The `exists` field is used to distinguish between a never-issued ID and a zero-value struct.

### Functions

| Function | Access | Description |
|---|---|---|
| `issueCertificate(...)` | onlyOwner | Issues a new certificate |
| `revokeCertificate(id)` | onlyOwner | Revokes a certificate |
| `verifyCertificate(id)` | public view | Returns status code + message |
| `getCertificate(id)` | public view | Returns all certificate fields |
| `certificateExists(id)` | public view | Returns true/false |
| `getAllCertificateIds()` | public view | Returns all IDs (for admin) |
| `getOwner()` | public view | Returns admin address |

### Security: `onlyOwner` Modifier

```solidity
modifier onlyOwner() {
    require(msg.sender == owner, "Access denied: Only the institute admin can perform this action");
    _;
}
```

### Events

```solidity
event CertificateIssued(string indexed certificateId, string studentName, address indexed issuer);
event CertificateRevoked(string indexed certificateId, address indexed revokedBy);
```

Events are permanently recorded on the blockchain and can be queried by external tools.

---

## 14. Certificate Hashing Process

SHA-256 is a one-way cryptographic hash function. Any input file produces a fixed 256-bit (64 hex character) hash. Even a single byte change produces a completely different hash.

```
Certificate File (PDF/PNG/JPG)
           ↓
    Read as ArrayBuffer
           ↓
 crypto.subtle.digest("SHA-256", data)
           ↓
  256-bit hash (as Uint8Array)
           ↓
  Convert to hex string (64 characters)
           ↓
  e.g. "abc123def456..."
           ↓
  Stored on blockchain as certificateHash
```

**Browser API Used:**
```javascript
const hash = await crypto.subtle.digest("SHA-256", arrayBuffer);
```

This uses the browser's built-in Web Crypto API — no external library needed, no server required.

---

## 15. Blockchain Verification Process

```
User enters Certificate ID
         ↓
contract.verifyCertificate("CERT-2026-001")
         ↓
Smart contract checks mapping:
  certificates["CERT-2026-001"].exists ?
         ↓ YES
  certificates["CERT-2026-001"].revoked ?
    ↓ NO              ↓ YES
  status = 1       status = 2
  "VERIFIED"       "REVOKED"
         ↓ NO (never issued)
       status = 0
    "NOT FOUND"
```

The frontend then calls `getCertificate()` to get all details and renders the result card.

---

## 16. Implementation Details

### Frontend SPA Navigation

The frontend is a Single Page Application (SPA) built without any framework. JavaScript functions `showSection()` handles tab-based navigation by toggling CSS `display` properties.

### MetaMask Integration

The app uses `window.ethereum` (injected by MetaMask) and `ethers.BrowserProvider` to connect. Account and chain change listeners are registered to update the UI reactively.

### Error Handling

A `getFriendlyError()` function maps raw blockchain error messages to user-friendly text. For example, "execution reverted: Certificate ID already exists" becomes "Certificate ID already exists. Please use a unique Certificate ID."

### Auto-generated Contract Config

The `scripts/deploy.js` script automatically writes the contract address and ABI to `frontend/contract-config.js`. This file is loaded before `app.js` in `index.html`, so the frontend always has the correct configuration without manual copy-pasting.

---

## 17. Testing

All tests are written using Hardhat's built-in testing framework with Mocha and Chai.

**Test results: 27/27 PASSING**

| Test Group | Tests | Status |
|---|---|---|
| 1. Deployment | 4 | ✅ All Pass |
| 2. Certificate Issuance | 4 | ✅ All Pass |
| 3. Duplicate Certificate ID | 1 | ✅ Pass |
| 4. Authorization - Issuance | 1 | ✅ Pass |
| 5. Certificate Revocation | 5 | ✅ All Pass |
| 6. Certificate Verification | 2 | ✅ All Pass |
| 7. Non-existing Certificate | 3 | ✅ All Pass |
| 8. Events - CertificateIssued | 1 | ✅ Pass |
| 9. Events - CertificateRevoked | 1 | ✅ Pass |
| 10. Input Validation | 3 | ✅ All Pass |
| 11. Multiple Certificates | 2 | ✅ All Pass |
| **TOTAL** | **27** | **✅ All Pass** |

Run tests: `npx hardhat test`

---

## 18. Results

The system successfully demonstrates:
- Certificate issuance via MetaMask transaction (admin only)
- Real-time certificate verification from blockchain
- SHA-256 hash comparison for file integrity
- Certificate revocation (permanent)
- Prevention of duplicate Certificate IDs
- Prevention of unauthorized certificate issuance
- All 27 automated tests passing

---

## 19. Advantages

1. **No Central Authority Required** — Verification works even if the institute shuts down
2. **Tamper Proof** — Blockchain records cannot be altered after creation
3. **Instant Verification** — Takes 2–3 seconds from anywhere in the world
4. **Transparent** — Anyone can query the blockchain
5. **Cost Effective** — No server infrastructure needed for verification
6. **File Integrity Check** — SHA-256 hash detects even 1-byte modifications

---

## 20. Limitations

1. **Local Network Only** — Requires Hardhat node running locally
2. **Single Admin** — Only one admin wallet can issue certificates
3. **No PDF Storage** — Only hash stored, not the actual document
4. **Irreversible Revocation** — Cannot undo a revocation
5. **Gas Costs on Mainnet** — Real ETH required on public networks
6. **No Batch Operations** — Must issue certificates one by one

---

## 21. Future Scope

1. Deploy to Ethereum Sepolia testnet for real-world testing
2. IPFS integration for decentralized document storage
3. Multi-admin/multi-institute support using role-based access control
4. QR code generation linking to the verification page
5. Issue certificates as NFTs (ERC-721 tokens)
6. Mobile-friendly Progressive Web App (PWA)
7. Integration with university ERP systems

---

## 22. Conclusion

This project successfully demonstrates how blockchain technology can solve the critical problem of academic certificate fraud. By storing certificate records on an immutable Ethereum blockchain and using SHA-256 hashing for file integrity verification, the system provides a transparent, secure, and instant certificate verification mechanism. The DApp is fully functional on a local Hardhat network, demonstrates real smart contract interactions (not simulated), passes 27 automated tests, and is built using beginner-friendly technologies making it an ideal final-year project for demonstrating blockchain concepts.
