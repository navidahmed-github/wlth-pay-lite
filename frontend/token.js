const crypto = require("crypto");
const token = crypto.randomBytes(64).toString("hex");
console.log(token); // Save this securely (e.g., in AWS Secrets Manager or environment variables).
aaad98d490026b917d2c0732ade4ebdae407780b92e3a0f6d583f5700fe52aa2d6b1e1f530827ac343aa9831d03d3660e8bf9902696501909f02a9f4e1ab1ba7;
