const AWS = require("aws-sdk");
const validateToken = require("../utils/validateToken"); // Import token validation
AWS.config.update({ region: "us-east-1" });

const dynamoDB = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = "Transactions";

exports.handler = async (event) => {
  const { httpMethod, body, headers } = event;

  try {
    // Ensure the Authorization header is present and valid
    const authHeader = headers.Authorization || headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return unauthorizedResponse("Missing or invalid Bearer token");
    }

    // Extract and validate the Bearer token
    const token = authHeader.split(" ")[1];
    const decodedToken = await validateToken(token); // Validate the token
    const userId = decodedToken.uid; // Extract user ID

    switch (httpMethod) {
      case "GET":
        return await handleGetRequest(userId);

      case "POST":
        return await handlePostRequest(body, userId);

      default:
        return methodNotAllowedResponse();
    }
  } catch (error) {
    console.error("Error:", error);
    return serverErrorResponse(error.message);
  }
};

// Handle GET request
const handleGetRequest = async (userId) => {
  try {
    const data = await dynamoDB
      .scan({
        TableName: TABLE_NAME,
        FilterExpression: "userId = :userId",
        ExpressionAttributeValues: { ":userId": userId },
      })
      .promise();

    return {
      statusCode: 200,
      headers: responseHeaders(),
      body: JSON.stringify(data.Items),
    };
  } catch (error) {
    console.error("Error fetching transactions:", error);
    return serverErrorResponse("Error fetching transactions");
  }
};

// Handle POST request
const handlePostRequest = async (body, userId) => {
  try {
    const { recipient, amount, method, date } = JSON.parse(body);

    // Validate required fields
    if (!recipient || !amount || !method || !date) {
      return badRequestResponse("Missing required fields");
    }

    // Generate a unique ID using the current timestamp
    const id = `${Date.now()}`;

    // Add transaction to DynamoDB
    await dynamoDB
      .put({
        TableName: TABLE_NAME,
        Item: { id, userId, recipient, amount, method, date },
      })
      .promise();

    return {
      statusCode: 201,
      headers: responseHeaders(),
      body: JSON.stringify({ id, userId, recipient, amount, method, date }),
    };
  } catch (error) {
    console.error("Error adding transaction:", error);
    return serverErrorResponse("Error adding transaction");
  }
};

// Helper functions for responses
const responseHeaders = () => ({
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "OPTIONS, GET, POST",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
});

const unauthorizedResponse = (message) => ({
  statusCode: 401,
  headers: responseHeaders(),
  body: JSON.stringify({ error: message }),
});

const badRequestResponse = (message) => ({
  statusCode: 400,
  headers: responseHeaders(),
  body: JSON.stringify({ error: message }),
});

const methodNotAllowedResponse = () => ({
  statusCode: 405,
  headers: responseHeaders(),
  body: "Method Not Allowed",
});

const serverErrorResponse = (message) => ({
  statusCode: 500,
  headers: responseHeaders(),
  body: JSON.stringify({ error: "Internal Server Error", details: message }),
});
