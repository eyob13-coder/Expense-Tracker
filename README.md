# Expense Tracker Application

This is a full-stack Expense Tracker application designed to help users manage their income and expenses efficiently. The application consists of a React-based frontend and a Node.js/Express backend with MongoDB as its database.

## Features

- User authentication (Sign Up, Login)
- Track income and expenses
- Dashboard overview of financial activities
- Detailed views for income and expense transactions
- Data visualization using charts

## Technologies Used

### Backend

- **Node.js**: JavaScript runtime environment
- **Express.js**: Web application framework
- **MongoDB**: NoSQL database
- **Mongoose**: MongoDB object data modeling (ODM)
- **bcryptjs**: For password hashing
- **jsonwebtoken**: For authentication (JWTs)
- **cors**: For enabling Cross-Origin Resource Sharing
- **dotenv**: For loading environment variables
- **cookie-parser**: For parsing cookies
- **multer**: For handling file uploads
- **xlsx**: For reading and parsing Excel files
- **nodemon**: For automatic server restarts during development

### Frontend

- **React**: JavaScript library for building user interfaces
- **Vite**: Next-generation frontend tooling
- **React Router DOM**: For declarative routing in React applications
- **Tailwind CSS**: A utility-first CSS framework for rapid UI development
- **axios**: Promise-based HTTP client for the browser and node.js
- **recharts**: A composable charting library built with React and D3
- **react-hot-toast**: For displaying notifications
- **emoji-picker-react**: For emoji selection
- **moment**: For date and time manipulation

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js (v18 or higher recommended)
- MongoDB instance (local or cloud-based)

### Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/your-username/Expense-Tracker.git
    cd Expense-Tracker
    ```

2.  **Backend Setup:**

    ```bash
    cd backend
    npm install
    ```

    Create a `.env` file in the `backend` directory with the following environment variables:

    ```
    PORT=8080
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret_key
    CLIENT_URL=http://localhost:5173
    ```

    Replace `your_mongodb_connection_string` with your MongoDB connection URI and `your_jwt_secret_key` with a strong, random string.

3.  **Frontend Setup:**

    ```bash
    cd ../frontend/expense-tarcker
    npm install
    ```

### Running the Application

1.  **Start the Backend Server:**

    ```bash
    cd backend
    npm run dev
    ```

    The backend server will run on `http://localhost:8080` (or the `PORT` you specified).

2.  **Start the Frontend Development Server:**

    ```bash
    cd ../frontend/expense-tarcker
    npm run dev
    ```

    The frontend application will typically run on `http://localhost:5173`.

## Project Structure

```
Expense Tracker/
├── backend/
│   ├── config/             # Database and Arcjet configuration
│   ├── controllers/        # Business logic for routes
│   ├── middlewares/        # Express middleware (auth, error handling, upload)
│   ├── models/             # Mongoose schemas for data
│   ├── routes/             # API routes
│   ├── uploads/            # Directory for uploaded files
│   ├── server.js           # Backend entry point
│   ├── package.json        # Backend dependencies and scripts
│   └── ...
└── frontend/
    └── expense-tarcker/
        ├── public/         # Static assets
        ├── src/
        │   ├── assets/     # Images, icons
        │   ├── components/ # Reusable UI components
        │   ├── context/    # React context for global state
        │   ├── hooks/      # Custom React hooks
        │   ├── pages/      # Application pages (Auth, Dashboard)
        │   ├── utils/      # Utility functions (API paths, axios instance)
        │   ├── App.jsx     # Main React component
        │   ├── main.jsx    # Frontend entry point
        │   └── index.css   # Global styles
        ├── index.html      # Main HTML file
        ├── package.json    # Frontend dependencies and scripts
        └── ...
```

## API Endpoints

The backend exposes the following API endpoints (base path `/api/v1`):

- `/auth`: User authentication (signup, login)
- `/income`: Manage income records
- `/expense`: Manage expense records
- `/dashboard`: Dashboard related data

## Contributing

(Optional: Add guidelines for contributions, e.g., how to set up a development environment, run tests, and submit pull requests.)

## License

(Optional: Specify the project's license.)
