const admin = require("firebase-admin");

// Ensure Firebase Admin is initialized
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.applicationDefault(), // Uses the service account credentials
  });
}

/**
 * Validates a Firebase Authentication token.
 * @param {string} token - The Bearer token from the client.
 * @returns {Promise<Object>} - The decoded token if valid.
 * @throws {Error} - If the token is invalid or verification fails.
 */
const validateToken = async (token) => {
  try {
    // Verify the token using Firebase Admin SDK
    const decodedToken = await admin.auth().verifyIdToken(token);
    return decodedToken; // Contains user information like `uid`, `email`, etc.
  } catch (error) {
    console.error("Token validation failed:", error);
    throw new Error("Unauthorized: Invalid token");
  }
};

module.exports = validateToken;
