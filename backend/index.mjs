const AWS = require("aws-sdk");

AWS.config.update({ region: "us-east-1" });
const dynamoDB = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = "Transactions";
const TOKEN = process.env.AUTH_TOKEN;

exports.handler = async (event) => {
  const { httpMethod, body, headers } = event;

  try {
    // Check if the Authorization header is valid
    if (!headers || headers.Authorization !== `Bearer ${TOKEN}`) {
      return unauthorizedResponse("Invalid or missing Authorization token");
    }

    switch (httpMethod) {
      case "GET":
        return await handleGetRequest();

      case "POST":
        return await handlePostRequest(body);

      default:
        return methodNotAllowedResponse();
    }
  } catch (error) {
    console.error("Error:", error);
    return serverErrorResponse(error.message);
  }
};

// Handle GET request
const handleGetRequest = async () => {
  try {
    const data = await dynamoDB
      .scan({
        TableName: TABLE_NAME,
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
const handlePostRequest = async (body) => {
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
        Item: { id, recipient, amount, method, date },
      })
      .promise();

    return {
      statusCode: 201,
      headers: responseHeaders(),
      body: JSON.stringify({ id, recipient, amount, method, date }),
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

const badRequestResponse = (message) => ({
  statusCode: 400,
  headers: responseHeaders(),
  body: JSON.stringify({ error: message }),
});

const unauthorizedResponse = (message) => ({
  statusCode: 401,
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
