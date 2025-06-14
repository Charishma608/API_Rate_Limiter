
require("dotenv").config();
const express = require("express");
const { createClient } = require("redis");
const rateLimiter = require("./limiter");

const app = express();
const PORT = 3000;

// Redis client
const redisClient = createClient({
  url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
});

redisClient.on("error", (err) => console.error("Redis Client Error", err));

(async () => {
  await redisClient.connect();

  // Middleware
  app.use(rateLimiter(redisClient));

  // Routes
  app.get("/", (req, res) => {
    res.json({ message: "Welcome! You are within the rate limit." });
  });

  app.get("/status", (req, res) => {
    res.json({ status: "OK" });
  });

  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
})();
