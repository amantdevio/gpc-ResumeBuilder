import express from 'express';
import cors from 'cors';
import "dotenv/config";
import connectDB from './config/db.js';
import userRouter from './routes/userRoutes.js';
import resumeRouter from './routes/resumeRoutes.js';
import aiRouter from './routes/aiRoutes.js';

const app=express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.get('/',(req,res)=>{
    res.send("Server is Live");
})
app.use('/api/users',userRouter);
app.use('/api/resumes',resumeRouter);
app.use('/api/ai',aiRouter);

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server is running on localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error.message);
    process.exit(1);
  }
};

startServer();
