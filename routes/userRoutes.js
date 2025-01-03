import express from "express";
import { login, registerUser } from "../Controller/user.js";
const userRoutes = express.Router();
userRoutes.post('/signIn',registerUser);
userRoutes.post('/logIn',login);
export default userRoutes;
