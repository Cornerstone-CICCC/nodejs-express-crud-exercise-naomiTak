// Import packages/modules
import express, { NextFunction, Request, Response } from 'express';
import pageRouter from './routes/page.routes';
import todoRouter from './routes/product.routes';
import dotenv from 'dotenv';
dotenv.config()

// Set up Express
const app = express()

// Middleware
app.use((req: Request, res: Response, next: NextFunction) => {
  if (req.url === "/secure-page") { // Block access to secure url
    res.status(401).send("You are not allowed to visit that url...")
  }
  console.log(`Request made to ${req.url} at ${new Date()}`);
  next(); // Proceed to next middleware or route handler
})
app.use(express.json()) // Allow incoming json data

// Routes
app.use('/', pageRouter)
app.use('/api/todos', todoRouter)

// Start server
const PORT: number = Number(process.env.PORT || 5000)
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}...`);
})