import express from "express";
import {
  registerController,
  loginController,
  testController,
  updateProfileController,
} from "../controllers/authController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";

//router
const router = express.Router();

//routing
//REGISTER
router.post("/register", registerController);
router.post("/login", loginController);

//test route
router.get('/test' , requireSignIn , isAdmin,testController);

//protected route
router.get('/resident-auth', requireSignIn , (req,res) => {
  res.status(200).send({
    ok:true,
  })
})

//protected route for admin
router.get('/admin-auth', requireSignIn , isAdmin, (req,res) => {
  res.status(200).send({
    ok:true,
  })
})

// update profile
router.put('/update-profile', requireSignIn, updateProfileController)

export default router;
