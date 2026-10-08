# VIVA QUESTIONS & ANSWERS
## Blockchain-Based Certificate Verification System

> **35 Questions and Answers for Final Year Engineering Project Viva**
> Prepared for B.Tech Computer Engineering — Final Year Project Demonstration

---

### Q1. What is blockchain?

**Answer:**
Blockchain is a distributed digital ledger that records transactions across multiple computers in a chain of blocks. Each block contains data, a timestamp, and a cryptographic hash of the previous block. Once data is recorded in a block, it cannot be changed without changing all subsequent blocks. This makes blockchain tamper-resistant and trustworthy.

In simple words: it is like a shared notebook that everyone can read, but no one can secretly erase or modify what has already been written.

---

### Q2. What is Ethereum?

**Answer:**
Ethereum is an open-source blockchain platform that supports smart contracts and decentralized applications (DApps). It was created by Vitalik Buterin in 2015. Unlike Bitcoin, which is mainly a payment system, Ethereum allows developers to write programs (smart contracts) that run on the blockchain.

Ethereum uses a token called ETH (Ether) to pay for transactions. In this project, we use a local Hardhat network that simulates Ethereum, so we don't need real ETH.

---

### Q3. What is a smart contract?

**Answer:**
A smart contract is a self-executing program stored on the blockchain. It contains rules written in code, and once deployed, it automatically enforces those rules without needing any middleman.

In this project, the smart contract `CertificateVerification.sol` stores certificate records, enforces that only the admin can issue certificates, rejects duplicate IDs, and allows anyone to verify a certificate. The contract runs exactly as coded — no one can change its behavior.

---

### Q4. What is a DApp?

**Answer:**
A DApp (Decentralized Application) is an application that runs on a blockchain or peer-to-peer network instead of being controlled by a single central server. The backend logic is handled by a smart contract on the blockchain.

In this project, our DApp consists of:
- Frontend: HTML, CSS, JavaScript (runs in the browser)
- Backend: Solidity smart contract (runs on Ethereum blockchain)

---

### Q5. What is Solidity?

**Answer:**
Solidity is a high-level, statically-typed programming language designed specifically for writing Ethereum smart contracts. It is similar to JavaScript and C++ in syntax.

In this project, I wrote the `CertificateVerification.sol` contract in Solidity version 0.8.19. It defines the Certificate struct, the mapping, and functions like `issueCertificate()`, `verifyCertificate()`, and `revokeCertificate()`.

---

### Q6. What is MetaMask?

**Answer:**
MetaMask is a browser extension that acts as an Ethereum wallet. It allows users to:
- Store, send, and receive ETH and tokens
- Connect to Ethereum DApps
- Sign transactions securely without exposing the private key to websites

In this project, MetaMask is used by the admin to sign certificate issuance transactions. When the admin clicks "Issue Certificate", MetaMask pops up and asks for confirmation before sending the transaction to the blockchain.

---

### Q7. What is Hardhat?

**Answer:**
Hardhat is a development environment and framework for Ethereum. It provides:
- A local Ethereum network for testing (called Hardhat Network)
- Tools to compile Solidity contracts
- Tools to deploy contracts
- A testing framework (Mocha + Chai)
- 20 pre-funded test accounts with 10,000 ETH each

In this project, we use `npx hardhat node` to start a local blockchain on `http://127.0.0.1:8545`, which simulates the real Ethereum network without needing real ETH.

---

### Q8. What is ethers.js?

**Answer:**
ethers.js is a JavaScript library used to interact with the Ethereum blockchain from a web browser or Node.js. It allows developers to:
- Connect to MetaMask
- Call smart contract functions
- Send transactions
- Listen for events

In this project, `app.js` uses ethers.js v6 to connect to MetaMask, create a contract instance with the ABI and address, and call functions like `issueCertificate()` and `verifyCertificate()`.

---

### Q9. What is SHA-256 and why do we use it?

**Answer:**
SHA-256 (Secure Hash Algorithm 256-bit) is a cryptographic hash function that converts any input (like a PDF file) into a fixed 64-character hexadecimal string called a "hash". 

Key properties:
- Same input always produces same hash
- Even 1-bit change in the file produces a completely different hash
- Cannot reverse the hash back to the original file (one-way)

We use SHA-256 in this project to create a "fingerprint" of the certificate file. This fingerprint is stored on the blockchain. Later, if someone uploads the same file, we recalculate the hash and compare it with the blockchain hash to check if the file is original.

---

### Q10. Why store the hash instead of the actual PDF?

**Answer:**
There are several reasons:
1. **Gas costs** — Storing large files on the blockchain is extremely expensive
2. **Efficiency** — A 64-character hash is tiny compared to a multi-MB PDF
3. **Privacy** — The actual document may contain sensitive personal data
4. **Same security** — The hash is a unique mathematical fingerprint; if the file changes even slightly, the hash changes completely

So by storing only the hash, we can still verify file authenticity without storing the actual file on-chain.

---

### Q11. How does certificate verification work in this project?

**Answer:**
Certificate verification works in 3 steps:
1. The user enters a Certificate ID (e.g., "CERT-2026-001")
2. Our frontend calls `verifyCertificate(certId)` on the smart contract via ethers.js
3. The contract checks its `mapping(string => Certificate)`:
   - If the ID doesn't exist → returns status 0 (NOT FOUND)
   - If it exists and is active → returns status 1 (VERIFIED)
   - If it exists and is revoked → returns status 2 (REVOKED)
4. The frontend also calls `getCertificate(certId)` to get full details
5. Results are displayed in the UI with appropriate styling

All of this reads directly from the blockchain — no server, no database involved.

---

### Q12. How is tampering detected?

**Answer:**
Tampering is detected using SHA-256 file hash comparison:

1. When a certificate is issued, the admin uploads the original certificate file
2. The browser calculates its SHA-256 hash and stores it on the blockchain
3. Later, if a verifier wants to check if their copy of the certificate is genuine, they upload it
4. The browser recalculates the SHA-256 hash of the uploaded file
5. This new hash is compared with the hash stored on the blockchain
6. If hashes match → file is authentic; if they don't → file has been tampered

Since SHA-256 is deterministic and collision-resistant, even changing one character in the document changes the hash completely.

---

### Q13. What happens if a certificate is revoked?

**Answer:**
When the admin revokes a certificate:
1. The smart contract's `revokeCertificate()` function is called
2. It sets `certificates[certId].revoked = true` in the blockchain
3. The `CertificateRevoked` event is emitted
4. The counter `totalCertificatesRevoked` is incremented

When anyone tries to verify a revoked certificate:
- The `verifyCertificate()` function returns status 2 with message "Certificate has been revoked by the institute"
- The frontend shows a yellow "⚠ CERTIFICATE REVOKED" banner

The revocation is permanent — it cannot be undone.

---

### Q14. What is a blockchain transaction?

**Answer:**
A blockchain transaction is any state-changing operation on the blockchain. In Ethereum, writing data to the blockchain requires a transaction.

In this project:
- **Issuing a certificate** = a transaction (state change: new certificate added to mapping)
- **Revoking a certificate** = a transaction (state change: revoked flag set to true)
- **Verifying a certificate** = NOT a transaction (it's just reading data — called a "view" function)

Transactions are signed by the sender's private key (via MetaMask) and cost gas.

---

### Q15. What is a wallet address and private key?

**Answer:**
- **Wallet Address:** A unique 42-character identifier (e.g., `0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266`) that acts like a bank account number on the blockchain. Anyone can see your address and send ETH to it.

- **Private Key:** A 64-character secret key (e.g., `0xac0974...`) that proves you own the wallet. You use it to sign transactions. It must NEVER be shared with anyone.

MetaMask stores the private key securely and uses it to sign transactions when you approve them.

---

### Q16. What is gas?

**Answer:**
Gas is the fee paid to perform operations on the Ethereum blockchain. Every computation (writing data, calling a function) costs a certain amount of gas. Gas prevents infinite loops and spam.

Gas fee = Gas Used × Gas Price (in Gwei, where 1 ETH = 1,000,000,000 Gwei)

In this project, we use the local Hardhat network where test accounts have 10,000 free ETH, so gas fees are not a real concern. On the Ethereum mainnet, each certificate issuance would cost a small amount of real ETH.

---

### Q17. What is decentralization? Why does it help here?

**Answer:**
Decentralization means there is no single central point of control. In a decentralized blockchain:
- Data is stored on thousands of computers (nodes) simultaneously
- No single company or government controls it
- Data cannot be deleted by a single authority

For certificate verification, this means:
- Even if the issuing university closes down, the certificate records still exist on the blockchain
- A government cannot erase someone's degree records
- There is no single server to hack
- Verification is available 24/7 from anywhere in the world

---

### Q18. What are smart contract events?

**Answer:**
Events in Solidity are like notifications that a smart contract emits when something important happens. Events are stored in the blockchain's transaction logs and can be monitored by external applications.

In our contract:
```solidity
event CertificateIssued(string indexed certificateId, string studentName, address indexed issuer);
event CertificateRevoked(string indexed certificateId, address indexed revokedBy);
```

When a certificate is issued, `CertificateIssued` is emitted. This is useful for audit trails and for frontend apps to listen for updates without constantly polling the blockchain.

---

### Q19. Why must a Certificate ID be unique?

**Answer:**
Each certificate must have a unique ID because the smart contract uses a mapping `(string => Certificate)`. In Solidity, a mapping is like a dictionary — each key must map to exactly one value.

If two certificates had the same ID, the second one would overwrite the first, losing data. Our contract uses the `exists` field to check for duplicates and throws an error with `require(!certificates[_certificateId].exists, "Certificate ID already exists")`.

This prevents fraud where someone might try to overwrite a legitimate certificate with a fake one.

---

### Q20. What happens if two certificates have the same ID?

**Answer:**
The smart contract will reject the second certificate issuance. The `issueCertificate()` function has this check:

```solidity
require(!certificates[_certificateId].exists, "Certificate ID already exists. Please use a unique Certificate ID.");
```

If the ID already exists, the transaction reverts with an error message. In the frontend, this error is caught and displayed as: "Certificate ID already exists. Please use a unique Certificate ID."

This is tested in our test suite: test case "Should reject a duplicate Certificate ID" verifies this behavior.

---

### Q21. What is the `onlyOwner` modifier?

**Answer:**
`onlyOwner` is a custom Solidity modifier that restricts a function so only the contract owner (the address that deployed the contract) can call it.

```solidity
modifier onlyOwner() {
    require(msg.sender == owner, "Access denied: Only the institute admin can perform this action");
    _;
}
```

When `onlyOwner` is applied to a function, it first checks if `msg.sender` (the caller's address) equals `owner`. If not, it throws an error and reverts the transaction. `_;` means "continue with the rest of the function".

Both `issueCertificate()` and `revokeCertificate()` use this modifier.

---

### Q22. What is a mapping in Solidity?

**Answer:**
A mapping in Solidity is like a hash table or dictionary that associates keys with values.

```solidity
mapping(string => Certificate) private certificates;
```

This says: "for every string key (Certificate ID), store a Certificate struct". Access is O(1) — instant lookup regardless of how many certificates exist.

Mappings cannot be iterated directly in Solidity, which is why we maintain a separate `string[] certificateIds` array for the admin dashboard.

---

### Q23. What is a struct in Solidity?

**Answer:**
A struct is a custom data type that groups related variables together, like a record.

In our contract:
```solidity
struct Certificate {
    string  certificateId;
    string  studentName;
    string  studentEmail;
    string  courseName;
    string  instituteName;
    string  issueDate;
    string  certificateHash;
    address issuer;
    bool    revoked;
    bool    exists;
}
```

This bundles all certificate information into one unit that can be stored in the mapping.

---

### Q24. What is the difference between view functions and regular functions?

**Answer:**

| Aspect | `view` function | Regular function |
|---|---|---|
| Can read state? | Yes | Yes |
| Can write state? | No | Yes |
| Costs gas? | No (free to call) | Yes (costs ETH) |
| Creates a transaction? | No | Yes |
| Example | `verifyCertificate()` | `issueCertificate()` |

In this project, `verifyCertificate()`, `getCertificate()`, `certificateExists()`, and `getAllCertificateIds()` are all `view` functions — they only read data and are free to call. Only `issueCertificate()` and `revokeCertificate()` change state and cost gas.

---

### Q25. What is the Web Crypto API?

**Answer:**
The Web Crypto API is a built-in browser API that provides cryptographic operations like hashing, encryption, and decryption — without needing any external library.

In this project, we use it to compute SHA-256:
```javascript
const hashBuffer = await crypto.subtle.digest("SHA-256", arrayBuffer);
```

The `crypto.subtle.digest()` function is available in all modern browsers (Chrome, Firefox, Edge, Safari). It processes the file entirely in the browser — no file is ever uploaded to any server.

---

### Q26. What is the ABI?

**Answer:**
ABI stands for Application Binary Interface. It is a JSON description of a smart contract's public functions, events, and their input/output types.

The frontend uses the ABI to know how to call the smart contract functions correctly. ethers.js needs the ABI to encode function calls and decode return values.

In this project, the deploy script (`scripts/deploy.js`) automatically extracts the ABI from Hardhat's compiled artifacts and saves it to `frontend/contract-config.js`.

---

### Q27. What is MetaMask's role in this project?

**Answer:**
MetaMask plays several roles:
1. **Wallet** — Stores the admin's private key securely
2. **Identity** — Provides the connected wallet address (`msg.sender`)
3. **Signer** — Signs transactions before they are sent to the blockchain (user must approve)
4. **Network** — Connects to the correct Ethereum network (Hardhat Local in our case)
5. **Injected Provider** — Provides `window.ethereum` that ethers.js uses to communicate with the blockchain

Without MetaMask (or a compatible wallet), the admin cannot issue or revoke certificates because there's no way to sign transactions.

---

### Q28. Why not use a traditional database?

**Answer:**
Traditional databases have these problems for certificate verification:
- **Centralized** — A single point of failure or attack
- **Mutable** — Data can be altered by administrators
- **Not public** — External parties cannot verify without an API
- **Can go offline** — If the server is down, verification fails
- **Trust required** — You have to trust the organization running the database

Blockchain solves all of these:
- Data is distributed across many nodes
- Records are immutable once written
- Anyone can query the blockchain
- Available 24/7
- Trustless — the code enforces rules, not a person

---

### Q29. What are the limitations of this project?

**Answer:**
1. **Local network only** — Runs on Hardhat; not accessible from the internet
2. **Single admin** — Only one wallet can issue certificates
3. **No PDF storage** — Only the hash is stored, not the actual file
4. **Gas costs on real networks** — Each issuance would cost real ETH on Ethereum mainnet
5. **Irreversible revocation** — Cannot undo a revocation once done
6. **Requires MetaMask** — Users without MetaMask cannot issue certificates
7. **Hardhat node must be running** — If `npx hardhat node` is stopped, verification fails
8. **No multi-institute support** — One contract, one admin

---

### Q30. What is the future scope of this project?

**Answer:**
1. **Testnet deployment** — Deploy to Ethereum Sepolia testnet for real-world access
2. **IPFS** — Store actual PDFs on IPFS (decentralized storage) and reference them by hash
3. **NFT certificates** — Issue certificates as ERC-721 NFT tokens that students own
4. **Multi-admin** — Use role-based access control (OpenZeppelin's `AccessControl`) for multiple institutes
5. **QR codes** — Generate QR codes that link to the verification page
6. **Mobile app** — React Native app for scanning QR codes
7. **Email notifications** — Notify students when their certificate is issued
8. **Batch issuance** — Issue multiple certificates in a single transaction

---

### Q31. What is Chain ID 31337?

**Answer:**
Chain ID is a unique identifier for an Ethereum network. It prevents transactions meant for one network from being replayed on another network.

- Ethereum Mainnet: Chain ID 1
- Ethereum Sepolia Testnet: Chain ID 11155111
- **Hardhat Local Network: Chain ID 31337** (this is what we use)

When we configure MetaMask to connect to our local Hardhat node, we set Chain ID to 31337 so MetaMask knows it's connected to the Hardhat network and not the real Ethereum network.

---

### Q32. What is the contract address?

**Answer:**
A contract address is the unique Ethereum address assigned to a smart contract when it is deployed on the blockchain. It looks like: `0x5FbDB2315678afecb367f032d93F642f64180aa3`

In this project, the deploy script automatically:
1. Deploys the contract and gets its address
2. Saves it to `deployments/contract-address.json`
3. Writes it to `frontend/contract-config.js`

The frontend uses this address (along with the ABI) to know which smart contract to talk to. Every time you restart the Hardhat node and redeploy, you get a new address.

---

### Q33. What is a transaction hash?

**Answer:**
A transaction hash (TX hash) is a unique 64-character hexadecimal identifier for a blockchain transaction. It is calculated from the transaction data using the Keccak-256 hash function.

Example: `0x1a2b3c4d5e6f...`

The transaction hash:
- Uniquely identifies a transaction on the blockchain
- Can be used to look up transaction details (on a block explorer for public networks)
- Is generated the moment the transaction is submitted
- Is shown to the admin after successfully issuing a certificate in this project

---

### Q34. What is immutability in blockchain?

**Answer:**
Immutability means that once data is recorded on the blockchain, it cannot be changed, deleted, or tampered with.

This works because each block contains the cryptographic hash of the previous block. If you change any data in a block, its hash changes, which breaks the link to the next block. To tamper with one block, you would have to redo the proof-of-work (or proof-of-stake) for all subsequent blocks, which requires more computing power than all honest nodes combined — practically impossible.

In this project, immutability means: once a certificate is issued, the record is permanent. No one — not even the admin — can edit the certificate details (they can only revoke it).

---

### Q35. What does `require` do in Solidity?

**Answer:**
`require` is a validation statement in Solidity. It checks a condition and throws an error (reverts the transaction) if the condition is false.

Syntax: `require(condition, "error message");`

Examples from our contract:
```solidity
require(bytes(_certificateId).length > 0, "Certificate ID cannot be empty");
require(!certificates[_certificateId].exists, "Certificate ID already exists...");
require(msg.sender == owner, "Access denied: Only the institute admin...");
```

When a `require` fails:
- The transaction is reverted (no state changes occur)
- Any gas already used is consumed
- The error message is returned to the caller
- The frontend catches this and shows a user-friendly message

`require` is the primary security mechanism in smart contracts.

---

*Good luck with your viva! Remember: explain concepts simply, relate every answer back to the project, and show confidence. You built this system — you know it best!*
