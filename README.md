# Lab 4 – Minimal Dictionary RESTful Service

A cross-origin dictionary application w/ a Node.js REST API backend & vanilla JavaScript frontend, demo RESTful service architecture & CORS communication.

## Project Structure

```
Lab-4/
│
├── frontend/                 # Client-side application (Server 1)
│   ├── index.html           # Homepage with navigation
│   ├── search.html          # Search definitions page
│   ├── store.html           # Add definitions page
│   ├── css/style.css        # Styling
│   ├── lang/en/en.json      # Frontend language strings
│   └── js/
│       ├── ApiClient.js     # HTTP client for API calls
│       ├── SearchPage.js    # Search page controller
│       ├── StorePage.js     # Store page controller
│       └── LangUtil.js      # Frontend language utility
│
├── backend/                 # REST API server (Server 2)
│   ├── package.json         # Project configuration
│   ├── lang/en/en.json      # Backend language strings
│   └── js/
│       ├── App.js           # Main server application
│       ├── Dictionary.js    # In-memory data store
│       ├── RequestHandler.js # HTTP request router
│       └── LangUtil.js      # Backend language utility
│
├── .gitignore              # Git ignore rules
└── README.md               # Project documentation
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

**Note**: For production, the frontend uses: `https://lab4-dictionary-api.onrender.com`

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
1. Open `index.html` to access the homepage with navigation
2. Navigate to `store.html` to add a word and definition
3. Navigate to `search.html` to search for words
4. Verify cross-origin communication is working

## Deployment
- **Frontend** (Server 1): Static files hosted on any web server
- **Backend** (Server 2): Node.js application hosted separately
- **CORS**: Enabled for cross-origin requests

### Production URLs
- **Frontend**: https://comp4537lab4s7frontend.netlify.app
- **Backend API**: https://lab4-dictionary-api.onrender.com

### Hosting Services
- **Frontend (Server 1)**: Netlify (Static hosting)
- **Backend (Server 2)**: Render.com (Node.js hosting)

## Features
- RESTful API with GET/POST endpoints
- Cross-origin resource sharing (CORS) enabled
- In-memory data storage with proper variable naming (`dictionary`)
- Request counting and error handling with appropriate HTTP status codes
- Input validation (client and server side)
- JSON response formatting with user-friendly display
- Internationalization support with separate language files
- Responsive design with navigation between pages
- JavaDoc-style comments in all JavaScript files
- Class-based architecture following ES6 standards

## Technology Stack

- **Frontend**: Vanilla JavaScript (ES6), HTML5, CSS3
- **Backend**: Node.js (built-in modules only)

- **Architecture**: Client-server with RESTful API
- **Data Storage**: In-memory array (no database required)
- **Internationalization**: JSON language files for user-facing strings

## Usage

1. **Homepage**: Access `index.html` for navigation between store and search pages

2. **Add Definitions**: Use `store.html` to add new word/definition pairs
   - Displays both JSON response and user-friendly success/error messages
   - Form clears automatically on successful submission

3. **Search Words**: Use `search.html` to look up existing definitions
   - Shows both raw JSON and formatted word: definition display
   - Provides clear "not found" messages for missing words

4. **API Responses**: All responses include request count and appropriate HTTP status codes
