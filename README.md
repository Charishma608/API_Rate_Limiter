# API Rate Limiter with Node.js & Redis
## A lightweight and efficient API rate-limiting service using Node.js and Redis. It protects your endpoints from abuse by limiting the number of requests per IP using a sliding window algorithm.

 ### Features
⏳ Sliding time window logic
🔐 Per-IP rate limiting
⚡ Fast with Redis backend
📦 Clean modular code (middleware)
🌐 Ready-to-use API routes for testing

### Project Structure
```bash
├── index.js          # Main server file
├── limiter.js        # Rate limiter middleware logic
├── .env              # Redis configuration
├── package.json
├── package-lock.json
```

###  Rate Limiting Logic

#### Max 10 requests per IP in a sliding 60-second window
#### Uses Redis sorted sets 
#### Track timestamps per request
#### Clean up old entries outside the current window
#### Efficiently count active requests

## 🧪 API Endpoints

| Method | Endpoint   | Description                  |
|--------|------------|------------------------------|
| GET    | `/`        | Protected route (rate-limited) |
| GET    | `/status`  | Health check route (rate-limited) |

---

## 📝 Setup Instructions

### 1. Clone the repo & install dependencies

```bash
git clone https://github.com/Charishma608/Api-Rate-Limiter.git
cd api-rate-limiter
npm install
```
### 2. Create a .env file
```bash
REDIS_HOST=localhost
REDIS_PORT=6379
```
### 3. Start Redis Server
```bash
redis-server
```
### 4. Run the app
```bash
node index.js
```



