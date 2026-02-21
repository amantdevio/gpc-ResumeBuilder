import express from 'express';
import { getUserById, getUserResumes, loginUser, registerUser, sendRegisterOtp } from '../controller/userController.js';
import protect from '../middleware/authMiddleware.js';


const userRouter = express.Router();

userRouter.post('/register',registerUser);
userRouter.post('/register/send-otp',sendRegisterOtp);
userRouter.post('/login',loginUser);
userRouter.get('/data',protect, getUserById);
userRouter.get('/resumes',protect,getUserResumes);

export default userRouter;
