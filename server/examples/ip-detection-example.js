/**
 * Example usage of PHP-style getUserIP() function in Node.js
 * 
 * This demonstrates how to use the getUserIP utility in your Express routes
 */

import express from 'express';
import { getUserIP, getUserIPWithRealFallback } from '../utils/getUserIP.js';

const app = express();

// Example 1: Basic usage in a route
app.get('/api/user-info', (req, res) => {
  const userIP = getUserIP(req);
  
  res.json({
    message: 'User information',
    ip: userIP,
    userAgent: req.headers['user-agent'],
    timestamp: new Date().toISOString()
  });
});

// Example 2: Usage with real public IP fallback
app.get('/api/user-info-real-ip', async (req, res) => {
  const userIP = await getUserIPWithRealFallback(req);
  
  res.json({
    message: 'User information with real public IP',
    ip: userIP,
    userAgent: req.headers['user-agent'],
    timestamp: new Date().toISOString()
  });
});

// Example 3: Middleware for logging IP addresses
const logUserIP = (req, res, next) => {
  const userIP = getUserIP(req);
  console.log(`Request from IP: ${userIP} to ${req.path}`);
  req.userIP = userIP; // Add to request object for use in routes
  next();
};

app.use(logUserIP);

// Example 4: Using in authentication with real IP
app.post('/api/login', async (req, res) => {
  const userIP = await getUserIPWithRealFallback(req);
  const { email, password } = req.body;
  
  // Your authentication logic here
  console.log(`Login attempt from IP: ${userIP} for email: ${email}`);
  
  res.json({
    message: 'Login processed',
    ip: userIP,
    timestamp: new Date().toISOString()
  });
});

// Example 5: Security logging with real IP
app.use(async (req, res, next) => {
  const userIP = await getUserIPWithRealFallback(req);
  
  // Log security events
  if (req.path.includes('/admin') || req.path.includes('/api/auth')) {
    console.log(`Security Event: ${req.method} ${req.path} from IP: ${userIP}`);
  }
  
  next();
});

export default app;
