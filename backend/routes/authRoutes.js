import { Router } from "express";
import {registerUser, loginUser, getUserInfo} from "../controllers/authController.js";
import authorize from '../middlewares/authMiddleware.js';
import upload from '../middlewares/uploadMiddleware.js';

const authRouter = Router();

authRouter.post("/register", registerUser);

authRouter.post("/login", loginUser);

authRouter.get("/getUser", authorize, getUserInfo);

authRouter.post("/upload-image", upload.single("images"), (req, res) => {
    if (!req.file){
        return res.status(400).json({message: "No file uploaded"});
    }

    const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${
        req.file.filename
    }`;
    res.status(200).json({imageUrl});
})

export default authRouter;