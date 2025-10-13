# Language Learning Social Platform

A modern **MERN Stack** social platform designed to bridge language barriers and connect language learners worldwide. This full-stack application enables users to find language exchange partners, build meaningful friendships, and practice languages through real-time chat and video calls.

### 🎯 Project Vision

In today's globalized world, language learning has become more important than ever. Our platform solves the challenge of finding native speakers to practice with by creating a social network specifically designed for language exchange. Whether you're learning Spanish, practicing Mandarin, or perfecting your English, find the perfect language partner who shares your passion for learning.


## Tech Stack

- **Frontend:** React with TanStack Query, React Router, DaisyUI
- **Backend:** Express.js (Node.js)
- **Database:** MongoDB Cloud (Atlas)
- **Real-time Chat & Video:** [Stream](https://getstream.io/)

---

## Key Features

### Real-time Chat
- Uses Stream Chat React SDK for messaging
- Automatic channel creation between users
- Message history and real-time updates
- Rich message features (text, emojis, etc.)

### Video Calling
- Integrated video call button in chat interface
- Calls initiated through chat messages with join links
- Uses Stream Video SDK for video functionality

### Friend System
- Send/accept friend requests
- View incoming and outgoing requests
- Friends list with language matching display

### Language Matching
- Users set native and learning languages during onboarding
- Recommended users based on language compatibility
- Flag display for different languages

---

## Backend API Reference

Based on the actual implementation:

### Authentication Routes (`/api/auth`)

| Method | Endpoint              | Functionality                                    |
|--------|-----------------------|--------------------------------------------------|
| POST   | `/api/auth/signup`    | Register new user                               |
| POST   | `/api/auth/login`     | Login and return JWT token                      |
| POST   | `/api/auth/logout`    | Logout user                                     |
| POST   | `/api/auth/onboarding`| Complete user onboarding (languages, profile)  |
| GET    | `/api/auth/me`        | Get current authenticated user profile          |

### User & Friend Management (`/api/users`)

| Method | Endpoint                              | Functionality                        |
|--------|---------------------------------------|--------------------------------------|
| GET    | `/api/users`                         | Get recommended users for matching   |
| GET    | `/api/users/friends`                 | Get list of current friends          |
| POST   | `/api/users/friend-request/:id`      | Send friend request to user          |
| PUT    | `/api/users/friend-request/:id/accept` | Accept friend request              |
| GET    | `/api/users/friend-requests`         | Get received friend requests         |
| GET    | `/api/users/outgoing-friend-requests`| Get sent friend requests            |

### Chat Routes (`/api/chat`)

| Method | Endpoint           | Functionality                        |
|--------|--------------------|--------------------------------------|
| GET    | `/api/chat/token`  | Get Stream token for chat/video     |

---

## Database & Environment Setup

### `.env.example`

```env
# MongoDB Cloud connection string
MONGO_URI=your_mongodb_url

# JWT configuration
JWT_SECRET=your_jwt_secret_key_here

# Stream API configuration
STREAM_API_KEY=your_stream_api_key
STREAM_API_SECRET=your_stream_api_secret

# Server configuration
PORT=5000
NODE_ENV=development

```

### Frontend Environment (`.env`)

```env
# Stream API Key for frontend
VITE_STREAM_API_KEY=your_stream_api_key
```

### Setup Instructions

1. **Clone the repository:**
   ```bash
   git clone https://github.com/hasanravda/Social-Platform.git
   cd Social-Platform
   ```

2. **Backend Setup:**
   ```bash
   cd backend
   npm install
   cp .env.example .env
   # Fill in your environment variables in .env
   npm run dev
   ```

3. **Frontend Setup:**
   ```bash
   cd frontend
   npm install
   # Create .env file with VITE_STREAM_API_KEY
   npm run dev
   ```

4. **MongoDB Cloud Setup:**
   - Create a MongoDB Atlas account at [mongodb.com/cloud/atlas](https://mongodb.com/cloud/atlas)
   - Create a new cluster
   - Get your connection string and add it to `MONGODB_URI`
   - Whitelist your IP address in Atlas Network Access

5. **Stream Setup:**
   - Create a Stream account at [getstream.io](https://getstream.io/)
   - Create a new app and get your API credentials
   - Add `STREAM_API_KEY` and `STREAM_API_SECRET` to backend `.env`
   - Add `VITE_STREAM_API_KEY` to frontend `.env`


---

## Project Structure

```
Social-Platform/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   │   ├── auth.controller.js
│   │   │   ├── user.controller.js
│   │   │   └── chat.controller.js
│   │   ├── routes/
│   │   │   ├── auth.route.js
│   │   │   ├── user.route.js
│   │   │   └── chat.route.js
│   │   ├── middleware/
│   │   │   └── auth.middleware.js
│   │   └── server.js
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── FriendCard.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   └── CallButton.jsx
│   │   ├── pages/
│   │   │   └── ChatPage.jsx
│   │   ├── lib/
│   │   │   ├── api.js
│   │   │   └── axios.js
│   │   └── hooks/
│   └── package.json
└── README.md
```

---

## Dependencies

### Backend
- `express` - Web framework
- `mongoose` - MongoDB ODM
- `jsonwebtoken` - JWT authentication
- `bcryptjs` - Password hashing
- `stream-chat` - Stream Chat server SDK
- `@stream-io/video-react-sdk` - Stream Video SDK

### Frontend
- `react` - UI framework
- `@tanstack/react-query` - Data fetching
- `react-router` - Routing
- `stream-chat-react` - Stream Chat UI components
- `lucide-react` - Icons

---

## Getting Started for Developers

1. Ensure you have Node.js (v16+) installed
2. Set up MongoDB Cloud Atlas account and get connection string
3. Create Stream account and get API credentials
4. Follow setup instructions above
5. Start backend server: `npm run dev` (from backend folder)
6. Start frontend server: `npm run dev` (from frontend folder)
7. Access the app at `http://localhost:5173` (Vite default)

---

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---