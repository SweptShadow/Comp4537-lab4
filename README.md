# Lab 4 – Minimal Dictionary RESTful Service

A cross-origin dictionary application w/ a Node.js REST API backend & vanilla JavaScript frontend, demo RESTful service architecture & CORS communication.

## Project Structure

```
Lab-4/
├── frontend/                 # Client-side application (Server 1)
│   ├── search.html          # Search definitions page
│   ├── store.html           # Add definitions page
│   ├── css/style.css        # Styling
│   └── js/
│       ├── ApiClient.js     # HTTP client for API calls
│       ├── SearchPage.js    # Search page controller
│       └── StorePage.js     # Store page controller
├── backend/                 # REST API server (Server 2)
│   └── js/
│       ├── App.js           # Main server application
│       ├── Dictionary.js    # In-memory data store
│       └── RequestHandler.js # HTTP request router
└── README.md
```

## API Endpoints

- `GET /api/definitions?word={word}` - Retrieve word definition

- `POST /api/definitions` - Add new word/definition pair

## Local Testing Steps

### 1. Start the Backend Server

```bash
# Navigate to backend directory
cd backend/js

# Start the Node.js server
node App.js
```

The server will start on `http://localhost:3000`

### 2. Update Frontend Configuration
In both `SearchPage.js` and `StorePage.js`, update the API base URL:
```javascript
// Change from production URL to local
const api = new ApiClient('http://localhost:3000');
```

### 3. Serve Frontend Files
Since browsers block file:// protocol for security, serve the frontend using:

**Option A - Live Server (VS Code Extension)**
- Install "Live Server" extension in VS Code
- Right-click on `frontend` folder → "Open with Live Server"
- Access at `http://127.0.0.1:5500` or `http://localhost:5500`

**Option B - Python HTTP Server**
```bash
# Navigate to frontend directory
cd frontend

# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```
Access at `http://localhost:8000`

**Option C - Node.js HTTP Server**
```bash
# Install globally (one-time)
npm install -g http-server

# Navigate to frontend directory
cd frontend

# Start server
http-server -p 8000
```

### 4. Test the Application
1. Open `store.html` in your browser
2. Add a word and definition
3. Open `search.html` in your browser  
4. Search for the word you just added

## Deployment
- **Frontend** (Server 1): Static files hosted on any web server
- **Backend** (Server 2): Node.js application hosted separately
- **CORS**: Enabled for cross-origin requests

### Production URLs
- Frontend hosted at: ~frontend URL~
- Backend API hosted at: ~~backend URL~/api/definitions

## Features
- RESTful API with GET/POST endpoints
- Cross-origin resource sharing (CORS)
- In-memory data storage
- Request counting and error handling
- Input validation (client and server)
- JSON response formatting

## Technology Stack

- **Frontend**: Vanilla JavaScript (ES6), HTML5, CSS3
- **Backend**: Node.js (built-in modules only)

- **Architecture**: Client-server with RESTful API
- **Data Storage**: In-memory array (no database required)

## Usage

1. **Add Definitions**: Use `store.html` to add new word/definition pairs

2. **Search Words**: Use `search.html` to look up existing definitions

3. **API Responses**: Include request count and appropriate status codes
