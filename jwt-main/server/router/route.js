import {Router } from "express";

const router =Router();

//**import all controller */
import * as controller from '../controllers/appController.js'
import { registerMail } from "../controllers/mailer.js";
import Auth,{localVariables} from "../middleware/auth.js";


/**POST METHOD */
router.route('/register').post(controller.register);
router.route('/registerMail').post(registerMail);
router.route('/autheticate').post(controller.verifyUser,(req,res)=>res.end());
router.route('/login').post(controller.verifyUser,controller.login);


//**GET METHOD */
router.route('/user/:username').get(controller.getUser)
router.route('/generateOTP').get(controller.verifyUser,localVariables,controller.generateOTP)
router.route('/verifyOTP').get(controller.verifyOTP)
router.route('/createResetSession').get(controller.createResetSession)

/**PUT METHOD */
router.route('/updateuser').put(Auth,controller.updateUser);
router.route('/resetPassword').put(controller.verifyUser,controller.resetPassword);

export default router;