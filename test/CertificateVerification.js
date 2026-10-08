/**
 * CertificateVerification.js
 *
 * Comprehensive tests for the CertificateVerification smart contract.
 * Run with: npx hardhat test
 *
 * Tests cover:
 *  1.  Contract deployment
 *  2.  Owner assignment
 *  3.  Successful certificate issuance
 *  4.  Certificate retrieval
 *  5.  Duplicate Certificate ID rejection
 *  6.  Unauthorized issuance rejection
 *  7.  Successful certificate revocation
 *  8.  Unauthorized revocation rejection
 *  9.  Verification of revoked certificate
 *  10. Non-existing Certificate ID
 *  11. CertificateIssued event emission
 *  12. CertificateRevoked event emission
 *  13. Empty field validation
 *  14. getAllCertificateIds() function
 *  15. Counter increments
 */

const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("CertificateVerification", function () {

  // ================================================================
  // SETUP: Deploy a fresh contract before each test
  // ================================================================
  let contract;
  let owner;
  let otherUser;
  let anotherUser;

  // Sample certificate data for tests
  const sampleCert = {
    certificateId:   "CERT-2026-001",
    studentName:     "Rahul Patil",
    studentEmail:    "rahul@example.com",
    courseName:      "B.Tech Computer Engineering",
    instituteName:   "Rajaram Institute of Technology",
    issueDate:       "04 September 2026",
    certificateHash: "abc123def456sha256hashvalue",
  };

  beforeEach(async function () {
    // Get test accounts provided by Hardhat
    [owner, otherUser, anotherUser] = await ethers.getSigners();

    // Deploy a fresh contract
    const CertificateVerification = await ethers.getContractFactory("CertificateVerification");
    contract = await CertificateVerification.deploy();
    await contract.waitForDeployment();
  });

  // ================================================================
  // TEST 1 & 2: Deployment and Owner Assignment
  // ================================================================
  describe("1. Deployment", function () {

    it("Should deploy successfully", async function () {
      const address = await contract.getAddress();
      expect(address).to.be.properAddress;
    });

    it("Should set the deployer as the owner", async function () {
      expect(await contract.owner()).to.equal(owner.address);
    });

    it("Should initialize counters to zero", async function () {
      expect(await contract.totalCertificatesIssued()).to.equal(0);
      expect(await contract.totalCertificatesRevoked()).to.equal(0);
    });

    it("Should return correct owner via getOwner()", async function () {
      expect(await contract.getOwner()).to.equal(owner.address);
    });
  });

  // ================================================================
  // TEST 3 & 4: Certificate Issuance and Retrieval
  // ================================================================
  describe("2. Certificate Issuance", function () {

    it("Should allow owner to issue a certificate", async function () {
      await expect(
        contract.issueCertificate(
          sampleCert.certificateId,
          sampleCert.studentName,
          sampleCert.studentEmail,
          sampleCert.courseName,
          sampleCert.instituteName,
          sampleCert.issueDate,
          sampleCert.certificateHash
        )
      ).to.not.be.reverted;
    });

    it("Should store certificate data correctly", async function () {
      await contract.issueCertificate(
        sampleCert.certificateId,
        sampleCert.studentName,
        sampleCert.studentEmail,
        sampleCert.courseName,
        sampleCert.instituteName,
        sampleCert.issueDate,
        sampleCert.certificateHash
      );

      // Retrieve and verify all fields
      const [
        certId, studentName, studentEmail, courseName,
        instituteName, issueDate, certHash, issuer, revoked, exists
      ] = await contract.getCertificate(sampleCert.certificateId);

      expect(certId).to.equal(sampleCert.certificateId);
      expect(studentName).to.equal(sampleCert.studentName);
      expect(studentEmail).to.equal(sampleCert.studentEmail);
      expect(courseName).to.equal(sampleCert.courseName);
      expect(instituteName).to.equal(sampleCert.instituteName);
      expect(issueDate).to.equal(sampleCert.issueDate);
      expect(certHash).to.equal(sampleCert.certificateHash);
      expect(issuer).to.equal(owner.address);
      expect(revoked).to.equal(false);
      expect(exists).to.equal(true);
    });

    it("Should increment totalCertificatesIssued counter", async function () {
      await contract.issueCertificate(
        sampleCert.certificateId,
        sampleCert.studentName,
        sampleCert.studentEmail,
        sampleCert.courseName,
        sampleCert.instituteName,
        sampleCert.issueDate,
        sampleCert.certificateHash
      );

      expect(await contract.totalCertificatesIssued()).to.equal(1);
    });

    it("Should add certificate ID to the list", async function () {
      await contract.issueCertificate(
        sampleCert.certificateId,
        sampleCert.studentName,
        sampleCert.studentEmail,
        sampleCert.courseName,
        sampleCert.instituteName,
        sampleCert.issueDate,
        sampleCert.certificateHash
      );

      const ids = await contract.getAllCertificateIds();
      expect(ids.length).to.equal(1);
      expect(ids[0]).to.equal(sampleCert.certificateId);
    });
  });

  // ================================================================
  // TEST 5: Duplicate Certificate ID
  // ================================================================
  describe("3. Duplicate Certificate ID Prevention", function () {

    it("Should reject a duplicate Certificate ID", async function () {
      // Issue first certificate
      await contract.issueCertificate(
        sampleCert.certificateId,
        sampleCert.studentName,
        sampleCert.studentEmail,
        sampleCert.courseName,
        sampleCert.instituteName,
        sampleCert.issueDate,
        sampleCert.certificateHash
      );

      // Try to issue again with same ID
      await expect(
        contract.issueCertificate(
          sampleCert.certificateId,  // Same ID!
          "Another Student",
          "another@example.com",
          "M.Tech",
          "Some Institute",
          "05 September 2026",
          "differenthashvalue"
        )
      ).to.be.revertedWith("Certificate ID already exists. Please use a unique Certificate ID.");
    });
  });

  // ================================================================
  // TEST 6: Unauthorized Issuance
  // ================================================================
  describe("4. Authorization - Issuance", function () {

    it("Should reject certificate issuance from non-owner", async function () {
      // otherUser tries to issue a certificate
      await expect(
        contract.connect(otherUser).issueCertificate(
          "CERT-FAKE-001",
          "Fake Student",
          "fake@example.com",
          "Fake Course",
          "Fake Institute",
          "01 January 2026",
          "fakehash123"
        )
      ).to.be.revertedWith("Access denied: Only the institute admin can perform this action");
    });
  });

  // ================================================================
  // TEST 7 & 8: Revocation
  // ================================================================
  describe("5. Certificate Revocation", function () {

    beforeEach(async function () {
      // Issue a certificate first
      await contract.issueCertificate(
        sampleCert.certificateId,
        sampleCert.studentName,
        sampleCert.studentEmail,
        sampleCert.courseName,
        sampleCert.instituteName,
        sampleCert.issueDate,
        sampleCert.certificateHash
      );
    });

    it("Should allow owner to revoke a certificate", async function () {
      await expect(
        contract.revokeCertificate(sampleCert.certificateId)
      ).to.not.be.reverted;

      const [, , , , , , , , revoked] = await contract.getCertificate(sampleCert.certificateId);
      expect(revoked).to.equal(true);
    });

    it("Should increment totalCertificatesRevoked counter", async function () {
      await contract.revokeCertificate(sampleCert.certificateId);
      expect(await contract.totalCertificatesRevoked()).to.equal(1);
    });

    it("Should reject revocation from non-owner", async function () {
      await expect(
        contract.connect(otherUser).revokeCertificate(sampleCert.certificateId)
      ).to.be.revertedWith("Access denied: Only the institute admin can perform this action");
    });

    it("Should reject revoking an already revoked certificate", async function () {
      await contract.revokeCertificate(sampleCert.certificateId);

      await expect(
        contract.revokeCertificate(sampleCert.certificateId)
      ).to.be.revertedWith("Certificate is already revoked");
    });

    it("Should reject revoking a non-existent certificate", async function () {
      await expect(
        contract.revokeCertificate("CERT-DOES-NOT-EXIST")
      ).to.be.revertedWith("Certificate not found");
    });
  });

  // ================================================================
  // TEST 9: Verification of Revoked Certificate
  // ================================================================
  describe("6. Certificate Verification", function () {

    beforeEach(async function () {
      await contract.issueCertificate(
        sampleCert.certificateId,
        sampleCert.studentName,
        sampleCert.studentEmail,
        sampleCert.courseName,
        sampleCert.instituteName,
        sampleCert.issueDate,
        sampleCert.certificateHash
      );
    });

    it("Should return status=1 (valid) for an active certificate", async function () {
      const [status, message] = await contract.verifyCertificate(sampleCert.certificateId);
      expect(status).to.equal(1);
      expect(message).to.equal("Certificate is valid and verified on blockchain");
    });

    it("Should return status=2 (revoked) for a revoked certificate", async function () {
      await contract.revokeCertificate(sampleCert.certificateId);

      const [status, message] = await contract.verifyCertificate(sampleCert.certificateId);
      expect(status).to.equal(2);
      expect(message).to.equal("Certificate has been revoked by the institute");
    });
  });

  // ================================================================
  // TEST 10: Non-existing Certificate ID
  // ================================================================
  describe("7. Non-existing Certificate", function () {

    it("Should return status=0 (not found) for unknown ID", async function () {
      const [status, message] = await contract.verifyCertificate("CERT-DOES-NOT-EXIST");
      expect(status).to.equal(0);
      expect(message).to.equal("Certificate not found on blockchain");
    });

    it("certificateExists() should return false for unknown ID", async function () {
      expect(await contract.certificateExists("CERT-DOES-NOT-EXIST")).to.equal(false);
    });

    it("certificateExists() should return true after issuance", async function () {
      await contract.issueCertificate(
        sampleCert.certificateId,
        sampleCert.studentName,
        sampleCert.studentEmail,
        sampleCert.courseName,
        sampleCert.instituteName,
        sampleCert.issueDate,
        sampleCert.certificateHash
      );
      expect(await contract.certificateExists(sampleCert.certificateId)).to.equal(true);
    });
  });

  // ================================================================
  // TEST 11: CertificateIssued Event
  // ================================================================
  describe("8. Events - CertificateIssued", function () {

    it("Should emit CertificateIssued event on issuance", async function () {
      await expect(
        contract.issueCertificate(
          sampleCert.certificateId,
          sampleCert.studentName,
          sampleCert.studentEmail,
          sampleCert.courseName,
          sampleCert.instituteName,
          sampleCert.issueDate,
          sampleCert.certificateHash
        )
      )
        .to.emit(contract, "CertificateIssued")
        .withArgs(sampleCert.certificateId, sampleCert.studentName, owner.address);
    });
  });

  // ================================================================
  // TEST 12: CertificateRevoked Event
  // ================================================================
  describe("9. Events - CertificateRevoked", function () {

    it("Should emit CertificateRevoked event on revocation", async function () {
      // First issue a certificate
      await contract.issueCertificate(
        sampleCert.certificateId,
        sampleCert.studentName,
        sampleCert.studentEmail,
        sampleCert.courseName,
        sampleCert.instituteName,
        sampleCert.issueDate,
        sampleCert.certificateHash
      );

      // Then revoke it and check event
      await expect(contract.revokeCertificate(sampleCert.certificateId))
        .to.emit(contract, "CertificateRevoked")
        .withArgs(sampleCert.certificateId, owner.address);
    });
  });

  // ================================================================
  // TEST 13: Empty Field Validation
  // ================================================================
  describe("10. Input Validation", function () {

    it("Should reject empty Certificate ID", async function () {
      await expect(
        contract.issueCertificate(
          "", // Empty ID
          sampleCert.studentName,
          sampleCert.studentEmail,
          sampleCert.courseName,
          sampleCert.instituteName,
          sampleCert.issueDate,
          sampleCert.certificateHash
        )
      ).to.be.revertedWith("Certificate ID cannot be empty");
    });

    it("Should reject empty student name", async function () {
      await expect(
        contract.issueCertificate(
          sampleCert.certificateId,
          "", // Empty name
          sampleCert.studentEmail,
          sampleCert.courseName,
          sampleCert.instituteName,
          sampleCert.issueDate,
          sampleCert.certificateHash
        )
      ).to.be.revertedWith("Student name cannot be empty");
    });

    it("Should reject empty certificate hash", async function () {
      await expect(
        contract.issueCertificate(
          sampleCert.certificateId,
          sampleCert.studentName,
          sampleCert.studentEmail,
          sampleCert.courseName,
          sampleCert.instituteName,
          sampleCert.issueDate,
          "" // Empty hash
        )
      ).to.be.revertedWith("Certificate hash cannot be empty");
    });
  });

  // ================================================================
  // TEST 14 & 15: Multiple Certificates
  // ================================================================
  describe("11. Multiple Certificates", function () {

    it("Should handle multiple certificates correctly", async function () {
      // Issue 3 certificates
      for (let i = 1; i <= 3; i++) {
        await contract.issueCertificate(
          `CERT-2026-00${i}`,
          `Student ${i}`,
          `student${i}@example.com`,
          "B.Tech Computer Engineering",
          "Test Institute",
          "04 September 2026",
          `hash${i}value`
        );
      }

      expect(await contract.totalCertificatesIssued()).to.equal(3);

      const ids = await contract.getAllCertificateIds();
      expect(ids.length).to.equal(3);
    });

    it("Each certificate should be independently stored", async function () {
      await contract.issueCertificate(
        "CERT-A", "Alice", "alice@example.com",
        "B.Tech", "Institute A", "01 Jan 2026", "hashA"
      );
      await contract.issueCertificate(
        "CERT-B", "Bob", "bob@example.com",
        "M.Tech", "Institute B", "02 Jan 2026", "hashB"
      );

      const [, nameA] = await contract.getCertificate("CERT-A");
      const [, nameB] = await contract.getCertificate("CERT-B");

      expect(nameA).to.equal("Alice");
      expect(nameB).to.equal("Bob");
    });
  });
});
