import express, { Express, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import config from '@stock-platform/config';

const app: Express = express();

app.use(express.json());

// Health check
app.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', service: 'user-service' });
});

// Register endpoint
app.post('/auth/register', async (req: Request, res: Response) => {
  try {
    const { email, password, fullName } = req.body;
    
    // TODO: Hash password
    // TODO: Save to database
    // TODO: Return user + token
    
    res.json({
      message: 'User registered successfully',
      user: {
        id: 'user-id',
        email,
        fullName,
        subscriptionPlan: 'free',
      },
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Login endpoint
app.post('/auth/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    
    // TODO: Verify password
    // TODO: Generate JWT
    
    res.json({
      message: 'Login successful',
      token: 'jwt-token',
      user: {
        id: 'user-id',
        email,
        subscriptionPlan: 'free',
      },
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get user profile
app.get('/users/:userId', async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    
    // TODO: Fetch from database
    
    res.json({
      id: userId,
      email: 'user@example.com',
      fullName: 'User Name',
      subscriptionPlan: 'free',
      status: 'active',
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update subscription
app.put('/users/:userId/subscription', async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const { plan } = req.body;
    
    // TODO: Update in database
    
    res.json({
      message: 'Subscription updated',
      subscriptionPlan: plan,
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

const PORT = 3005;
app.listen(PORT, () => {
  console.log(`🚀 User Service running on port ${PORT}`);
});

export default app;
