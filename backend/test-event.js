const { handler } = require("./src/handlers/transactionHandler");

// const testEvent = {
//   httpMethod: "GET",
// };

const testEvent = {
  httpMethod: "POST", // or 'GET'
  body: JSON.stringify({
    id: "1",
    recipient: "Vendor A",
    amount: 100,
    method: "Credit Card",
    date: "2025-01-16",
  }),
};

handler(testEvent, {})
  .then((response) => {
    console.log("Response:", response);
  })
  .catch((error) => {
    console.error("Error:", error);
  });
