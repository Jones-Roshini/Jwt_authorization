import jwt from "jsonwebtoken";    
import ENV from '../config.js';

// Auth middleware
export default async function Auth(req, res, next) {
    try {
        // Access the Authorization header to get the token
        const token = req.headers.authorization.split(" ")[1];
        if (!token) {
            return res.status(401).json({ error: "Authentication Failed" });
        }
        // Verify the token using the JWT secret
        const decodedToken = await jwt.verify(token, ENV.JWT_SECRET);
        // Store the decoded token data in the request object
        req.user = decodedToken;
        // Proceed to the next middleware or route handler
        next();
    } catch (error) {
        return res.status(401).json({ error: "Authentication Failed" });
    }
}


export function localVariables(req,res,next){
    req.app.locals={
        OTP:null,
        resetSession: false
    }
    next()
}
