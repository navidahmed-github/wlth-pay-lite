const { handler } = require(".");

// Generate a valid Bearer token before invoking the Lambda function
(async () => {
  try {
    const token =
      "eyJhbGciOiJSUzI1NiIsImtpZCI6IjBhYmQzYTQzMTc4YzE0MjlkNWE0NDBiYWUzNzM1NDRjMDlmNGUzODciLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vd2x0aC1wYXktbGl0ZSIsImF1ZCI6IndsdGgtcGF5LWxpdGUiLCJhdXRoX3RpbWUiOjE3MzcwNjk4MTMsInVzZXJfaWQiOiIyVEgzUjF0Umt4YVdGTW9Iem5zbXQ4STZaQkEyIiwic3ViIjoiMlRIM1IxdFJreGFXRk1vSHpuc210OEk2WkJBMiIsImlhdCI6MTczNzA2OTgxMywiZXhwIjoxNzM3MDczNDEzLCJlbWFpbCI6Im5haG1lNkBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZW1haWwiOlsibmFobWU2QGdtYWlsLmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6InBhc3N3b3JkIn19.P2VXFbipU3kZ3CBLj31_tEROZ6uHM7t1eBXVBgDx1_ZDxf7y92AN9giwb41oEnqJ_LYH3YgdyLOB8euVR81cSqMIZJ6U1MMAt_ImyC4kioFyjBuEqzcxBv2jvmYeJksDtmNTPcOTQBglTAE0Z-QkAV_eXoDAqluKda89yQGMqY-zFuKB720arP3ChiMYvluAy14224FcfbmiRagoOvKnJBRUao8gNVRhdKZjECOtfsmEtFg5XxRnyHO23YsrHCPxNp_keUwx1bmLWAR3cJ7Bjd_2jVpfQKvbSBuW_e4DS3UVQirmRaYUn9McnXYsNGT8eVHC9v5OFtdO4YtfKcS1HA"; //await getTokenForUser("nahme6@gmail.com", "test1234"); // Replace with valid credentials

    const mockEvent = {
      httpMethod: "POST",
      headers: {
        Authorization: `Bearer ${token}`, // Inject the generated token
      },
      body: JSON.stringify({
        recipient: "John Doe",
        amount: 150.0,
        method: "Credit Card",
        date: "2025-01-17",
      }),
    };

    // Invoke the Lambda handler
    const response = await handler(mockEvent);
    console.log("Response:", response);
  } catch (error) {
    console.error("Error:", error);
  }
})();
