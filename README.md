# WLTH Pay Lite

WLTH Pay Lite is a serverless transaction management system designed to showcase my skills and experience as a Senior Software Engineer. The project highlights my ability to design scalable and secure solutions using AWS, integrate authentication mechanisms, and build seamless interactions between backend and frontend systems.

## Purpose

The primary purpose of this project is to demonstrate my technical proficiency in the following areas:
1. **Backend System Design**:
    - Architecting secure, scalable, and serverless APIs using AWS Lambda, DynamoDB, and API Gateway.
2. **Security-First Approach**:
    - Implementing robust authentication using Firebase and securely managing sensitive data via environment variables.
3. **Cross-Domain Expertise**:
    - Building React-based frontend systems that integrate seamlessly with AWS-powered backends.
4. **Problem-Solving in Real-World Scenarios**:
    - Handling challenges like CORS, environment variable configuration, API authentication, and secure token management.

This project represents a functional demonstration of my readiness to take ownership of backend systems and infrastructure, as well as my ability to deliver end-to-end solutions.

## Key Features

1. **Secure Transaction Management**
    - Endpoints to fetch and add user-specific transactions.
    - Token-based authentication via Firebase for secure API access.

2. **Serverless Architecture**
    - Built using AWS Lambda to minimize infrastructure overhead.
    - API Gateway for efficient routing and request handling.
    - DynamoDB for scalable and efficient data storage.

3. **Frontend Integration**
    - React-based dashboard with a clean UI for managing transactions.
    - Dynamic data fetching from secure backend APIs.

4. **Ease of Deployment**
    - Backend deployed to AWS Lambda via zipped artifacts.
    - Environment variables securely managed using AWS Lambda configuration.

## Technologies Used

### Backend
- **AWS Lambda**: Serverless compute for backend APIs.
- **AWS DynamoDB**: NoSQL database for storing transactions.
- **AWS API Gateway**: Secure routing and API management.
- **Node.js**: Backend runtime environment.
- **Firebase Authentication**: Token-based secure access.
- **Environment Variable Management**: Using AWS Lambda’s settings.

### Frontend
- **React.js**: Dynamic user interface.
- **Axios**: For making secure HTTP requests.
- **TypeScript**: For robust type-checking and cleaner code.
- **CSS**: Basic styling.

## Setup and Deployment

### Frontend
1. Clone the repository.
    ```sh
    git clone https://github.com/your-repo/wlth-pay-lite.git
    cd wlth-pay-lite/frontend
    ```

2. Install dependencies.
    ```sh
    npm install
    ```

3. Run the development server.
    ```sh
    npm start
    ```

4. Configure the `.env` file in the frontend folder:
    ```
    REACT_APP_API_URL=https://your-api-endpoint
    REACT_APP_BEARER_TOKEN=your-firebase-bearer-token
    ```

### Backend
1. Navigate to the backend directory.
    ```sh
    cd wlth-pay-lite/backend
    ```

2. Install dependencies.
    ```sh
    npm install
    ```

3. Zip the files for deployment.
    ```sh
    zip -r function.zip .
    ```

4. Deploy to AWS Lambda:
    ```sh
    aws lambda update-function-code \
         --function-name TransactionsHandler \
         --zip-file fileb://function.zip \
         --region us-east-1
    ```

## Key Files and Directories

### Frontend
- `src/components/Dashboard.tsx`: Main component for transaction management.
- `.env`: Environment variables for API integration.

### Backend
- `index.mjs`: Main entry point for the Lambda function.
- `utils/validateToken.js`: Handles Firebase token validation.
- `template.yml`: SAM template for defining Lambda resources.


## Future Enhancements
1. Improve token management by implementing automatic token refreshing.
2. Add support for analytical finanical tracking
3. Enhance frontend with better error handling and user feedback.

## Acknowledgments

This project was developed to showcase my technical skills and problem-solving abilities as part of an application for the WLTH Senior Software Engineer role.

Feel free to modify the repository to include additional details or tailored sections.
