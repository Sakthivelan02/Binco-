import cors from 'cors';
import express from 'express';

const app = express();

const mockUser = {
  email: 'sakthi@gmail.com',
  password: 'Qwerty02',
  name: 'Sakthi Vel',
  role: 'Workspace Member',
};

app.disable('x-powered-by');
app.use(cors({
  origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
  methods: ['GET', 'POST'],
}));
app.use(express.json({ limit: '10kb' }));

app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok', service: 'Binco API' });
});

app.post('/api/login', (request, response) => {
  const email = typeof request.body?.email === 'string'
    ? request.body.email.trim().toLowerCase()
    : '';
  const password = typeof request.body?.password === 'string'
    ? request.body.password
    : '';

  if (!email || !password) {
    return response.status(400).json({
      success: false,
      message: 'Email and password are required.',
    });
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email) || password.length < 8) {
    return response.status(400).json({
      success: false,
      message: 'Please provide a valid email and a password of at least 8 characters.',
    });
  }

  if (email !== mockUser.email || password !== mockUser.password) {
    return response.status(401).json({
      success: false,
      message: 'Invalid email or password. Please check your details and try again.',
    });
  }

  return response.status(200).json({
    success: true,
    message: 'Login successful.',
    user: {
      name: mockUser.name,
      email: mockUser.email,
      role: mockUser.role,
    },
  });
});

app.use('/api', (_request, response) => {
  response.status(404).json({
    success: false,
    message: 'API route not found.',
  });
});

app.use((error, _request, response, _next) => {
  if (error instanceof SyntaxError && 'body' in error) {
    return response.status(400).json({
      success: false,
      message: 'The request body must contain valid JSON.',
    });
  }

  console.error(error);
  return response.status(500).json({
    success: false,
    message: 'Something went wrong on the server.',
  });
});

export default app;
