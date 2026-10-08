// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

/**
 * @title CertificateVerification
 * @author Blockchain Certificate Project
 * @notice This smart contract allows an educational institute to issue,
 *         verify, and revoke digital certificates on the blockchain.
 *
 * @dev Key concepts:
 *  - Only the contract owner (the deploying address) can issue/revoke certificates.
 *  - Certificates are stored using a mapping from certificateId => Certificate struct.
 *  - We store a SHA-256 hash of the certificate file, NOT the file itself.
 *  - Anyone can verify a certificate by calling verifyCertificate() or getCertificate().
 */
contract CertificateVerification {

    // ================================================================
    // DATA STRUCTURES
    // ================================================================

    /**
     * @notice Represents a single academic certificate stored on-chain.
     */
    struct Certificate {
        string  certificateId;   // Unique ID like "CERT-2026-001"
        string  studentName;     // Full name of the student
        string  studentEmail;    // Student email address
        string  courseName;      // Name of the course/degree
        string  instituteName;   // Name of the issuing institute
        string  issueDate;       // Issue date as a string e.g. "04 September 2026"
        string  certificateHash; // SHA-256 hash of the certificate PDF
        address issuer;          // Wallet address of the admin who issued this
        bool    revoked;         // true if the certificate has been revoked
        bool    exists;          // true if the certificate record exists (used to detect non-existent IDs)
    }

    // ================================================================
    // STATE VARIABLES
    // ================================================================

    /// @notice The owner/admin of the contract (the address that deployed it)
    address public owner;

    /// @notice Total number of certificates ever issued
    uint256 public totalCertificatesIssued;

    /// @notice Total number of certificates that have been revoked
    uint256 public totalCertificatesRevoked;

    /**
     * @notice Main storage: maps a certificate ID string to its Certificate struct.
     * @dev Using string as key allows human-readable IDs like "CERT-2026-001"
     */
    mapping(string => Certificate) private certificates;

    /**
     * @notice Keeps a list of all certificate IDs ever issued (for admin dashboard).
     */
    string[] private certificateIds;

    // ================================================================
    // EVENTS
    // ================================================================

    /**
     * @notice Emitted when a new certificate is successfully issued.
     * @param certificateId The unique certificate ID
     * @param studentName   The name of the student
     * @param issuer        The wallet address of the admin who issued it
     */
    event CertificateIssued(
        string indexed certificateId,
        string studentName,
        address indexed issuer
    );

    /**
     * @notice Emitted when a certificate is revoked.
     * @param certificateId The unique certificate ID that was revoked
     * @param revokedBy     The wallet address of the admin who revoked it
     */
    event CertificateRevoked(
        string indexed certificateId,
        address indexed revokedBy
    );

    // ================================================================
    // MODIFIERS
    // ================================================================

    /**
     * @notice Restricts a function so only the contract owner can call it.
     */
    modifier onlyOwner() {
        require(msg.sender == owner, "Access denied: Only the institute admin can perform this action");
        _;
    }

    // ================================================================
    // CONSTRUCTOR
    // ================================================================

    /**
     * @notice Sets the deploying address as the owner/admin of the contract.
     */
    constructor() {
        owner = msg.sender;
    }

    // ================================================================
    // CORE FUNCTIONS
    // ================================================================

    /**
     * @notice Issues a new certificate and stores it on the blockchain.
     * @dev Only the owner can call this. Certificate ID must be unique.
     *
     * @param _certificateId   A unique human-readable certificate ID (e.g., "CERT-2026-001")
     * @param _studentName     Full name of the student
     * @param _studentEmail    Email address of the student
     * @param _courseName      Name of the course or degree
     * @param _instituteName   Name of the issuing institution
     * @param _issueDate       Date string of certificate issuance
     * @param _certificateHash SHA-256 hash of the certificate file
     */
    function issueCertificate(
        string memory _certificateId,
        string memory _studentName,
        string memory _studentEmail,
        string memory _courseName,
        string memory _instituteName,
        string memory _issueDate,
        string memory _certificateHash
    ) public onlyOwner {
        // --- Input Validation ---
        require(bytes(_certificateId).length > 0,   "Certificate ID cannot be empty");
        require(bytes(_studentName).length > 0,     "Student name cannot be empty");
        require(bytes(_studentEmail).length > 0,    "Student email cannot be empty");
        require(bytes(_courseName).length > 0,      "Course name cannot be empty");
        require(bytes(_instituteName).length > 0,   "Institute name cannot be empty");
        require(bytes(_issueDate).length > 0,       "Issue date cannot be empty");
        require(bytes(_certificateHash).length > 0, "Certificate hash cannot be empty");

        // --- Prevent Duplicate Certificate IDs ---
        require(!certificates[_certificateId].exists, "Certificate ID already exists. Please use a unique Certificate ID.");

        // --- Store the Certificate ---
        certificates[_certificateId] = Certificate({
            certificateId:   _certificateId,
            studentName:     _studentName,
            studentEmail:    _studentEmail,
            courseName:      _courseName,
            instituteName:   _instituteName,
            issueDate:       _issueDate,
            certificateHash: _certificateHash,
            issuer:          msg.sender,
            revoked:         false,
            exists:          true
        });

        // Track the ID for the admin dashboard list
        certificateIds.push(_certificateId);

        // Update counter
        totalCertificatesIssued++;

        // Emit event (recorded permanently on the blockchain)
        emit CertificateIssued(_certificateId, _studentName, msg.sender);
    }

    /**
     * @notice Revokes an existing certificate.
     * @dev Only the owner can revoke. Cannot revoke an already-revoked certificate.
     *
     * @param _certificateId The ID of the certificate to revoke
     */
    function revokeCertificate(string memory _certificateId) public onlyOwner {
        require(certificates[_certificateId].exists,   "Certificate not found");
        require(!certificates[_certificateId].revoked, "Certificate is already revoked");

        certificates[_certificateId].revoked = true;
        totalCertificatesRevoked++;

        emit CertificateRevoked(_certificateId, msg.sender);
    }

    // ================================================================
    // VIEW / READ FUNCTIONS (Free to call - no gas for read-only)
    // ================================================================

    /**
     * @notice Returns all details of a certificate.
     * @dev Returns all fields. Frontend uses this for the verification page.
     *
     * @param _certificateId The certificate ID to look up
     * @return certificateId  The unique certificate ID
     * @return studentName    The student's full name
     * @return studentEmail   The student's email address
     * @return courseName     The course or degree name
     * @return instituteName  The issuing institution name
     * @return issueDate      The issue date string
     * @return certificateHash The SHA-256 hash of the certificate file
     * @return issuer         The wallet address that issued the certificate
     * @return revoked        Whether the certificate has been revoked
     * @return exists         Whether the certificate record exists
     */
    function getCertificate(string memory _certificateId) public view returns (
        string  memory certificateId,
        string  memory studentName,
        string  memory studentEmail,
        string  memory courseName,
        string  memory instituteName,
        string  memory issueDate,
        string  memory certificateHash,
        address        issuer,
        bool           revoked,
        bool           exists
    ) {
        Certificate memory cert = certificates[_certificateId];
        return (
            cert.certificateId,
            cert.studentName,
            cert.studentEmail,
            cert.courseName,
            cert.instituteName,
            cert.issueDate,
            cert.certificateHash,
            cert.issuer,
            cert.revoked,
            cert.exists
        );
    }

    /**
     * @notice Checks if a certificate ID exists and is valid (not revoked).
     * @dev Returns a status code and human-readable message for the frontend.
     *
     * @param _certificateId The certificate ID to verify
     * @return status  0 = not found, 1 = valid & active, 2 = revoked
     * @return message Human-readable verification result
     */
    function verifyCertificate(string memory _certificateId) public view returns (
        uint8  status,
        string memory message
    ) {
        if (!certificates[_certificateId].exists) {
            return (0, "Certificate not found on blockchain");
        }
        if (certificates[_certificateId].revoked) {
            return (2, "Certificate has been revoked by the institute");
        }
        return (1, "Certificate is valid and verified on blockchain");
    }

    /**
     * @notice Quick check if a certificate ID exists.
     *
     * @param _certificateId The certificate ID to check
     * @return true if the certificate exists, false otherwise
     */
    function certificateExists(string memory _certificateId) public view returns (bool) {
        return certificates[_certificateId].exists;
    }

    /**
     * @notice Returns all certificate IDs issued (for admin dashboard).
     * @dev Only useful for admin - anyone can call it but frontend shows it only to admin.
     *
     * @return Array of all certificate ID strings
     */
    function getAllCertificateIds() public view returns (string[] memory) {
        return certificateIds;
    }

    /**
     * @notice Returns the contract owner address.
     * @return The admin wallet address
     */
    function getOwner() public view returns (address) {
        return owner;
    }
}
