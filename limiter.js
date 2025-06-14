
const WINDOW_SIZE = 60; 
const MAX_REQUESTS = 10;

module.exports = function rateLimiter(redisClient) {
  return async function (req, res, next) {
    const ip = req.ip;
    const now = Date.now();
    const key = `rate_limit:${ip}`;
    const windowStart = now - WINDOW_SIZE * 1000;

    try {
      
      await redisClient.zRemRangeByScore(key, 0, windowStart);

     
      const requestCount = await redisClient.zCard(key);

      if (requestCount < MAX_REQUESTS) {
        
        await redisClient.zAdd(key, [{ score: now, value: `${now}` }]);
        await redisClient.expire(key, WINDOW_SIZE);
        next();
      } else {
        res.status(429).json({ error: "Rate limit exceeded. Try again later." });
      }
    } catch (err) {
      console.error("Redis error:", err);
      res.status(500).json({ error: "Internal server error." });
    }
  };
};
