# Real-Time Chat Application Backend

A robust backend implementation for a real-time chat application similar to Messenger, built with Node.js, Express, MongoDB, and Socket.IO.

## fontend repo

https://github.com/Mahesh0426/chat-APP-FE

## Features

- 🔐 User authentication with JWT
- 👤 User profile management
- 💬 Real-time messaging
- 🔍 User search functionality
- 📱 Online/offline status tracking
- 👁 Message seen status
- 🖼 Support for text, image, and video messages

## Tech Stack

- **Node.js** - Runtime environment
- **Express** - Web framework
- **MongoDB** - Database
- **Mongoose** - MongoDB ODM
- **Socket.IO** - Real-time communication
- **JWT** - Authentication
- **bcrypt** - Password hashing
- **CORS** - Cross-origin resource sharing
- **yarn** - Package manager

## API Endpoints

### Authentication & User Management

- `POST /api/user/register` - Register new user
- `POST /api/user/checkemail` - Check email existence
- `POST /api/user/checkpassword` - User login
- `GET /api/user/logout` - User logout
- `GET /api/user/userdetails` - Get user details
- `PUT /api/user/update-user` - Update user profile
- `POST /api/user/search-user` - Search users

## Socket Events

- `connection` - New user connection
- `message-page` - Load message page
- `new message` - Send new message
- `seen` - Message seen status
- `sidebar` - Load conversation sidebar
- `disconnect` - User disconnection

## Getting Started

1. Clone the repository
2. Install dependencies:

```sh
yarn install
```

3. Create a `.env` file with the following variables:

```env
PORT=8000
NODE_ENV=development
CLIENT_ROOT_URL='http://localhost:5173'
DB_CONNECT_URL='your_mongodb_url'
JWT_SECRET='your_jwt_secret'
```

4. Run the development server:

```sh
yarn  dev
```

## Database Models

### User Model

- name
- email
- password
- profile_pic

### Conversation Model

- sender
- receiver
- messages

### Message Model

- text
- imageUrl
- videoUrl
- seen
- msgByUserId

## Security Features

- Password hashing with bcrypt
- JWT-based authentication
- HTTP-only cookies
- CORS protection
- Secure session management

## Development Scripts

- `yarn dev` - Start development server with nodemon
- `yarn start` - Start production server

## Environment Requirements

- Node.js >= 14.x
- MongoDB >= 4.x
