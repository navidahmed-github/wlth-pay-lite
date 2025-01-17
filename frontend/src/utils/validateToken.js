const admin = require("firebase-admin");

// Initialize Firebase Admin SDK
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.applicationDefault(), // Or use a service account key
  });
}

// Validate Firebase ID Token
const validateToken = async (idToken) => {
  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    return decodedToken; // Returns user info, including uid
  } catch (error) {
    console.error("Error validating token:", error);
    throw new Error("Unauthorized");
  }
};

module.exports = validateToken;
