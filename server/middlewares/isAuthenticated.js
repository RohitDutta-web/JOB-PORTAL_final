import jwt from "jsonwebtoken";


// Define an authentication middleware function
const isAuthenticated = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({
                message: "Invalid user",
                success: false,
            })
        }
       
            // Verify the token using the secret key

        const decode = await jwt.verify(token, process.env.SECRET_KEY);
        
       
        if(!decode){
            return res.status(401).json({
                message:"Invalid token",
                success:false
            })
        };

    
            // If the token is valid, add the user ID to the request object

        req.id = decode.userId;
        next();
    } catch (error) {
        console.log(error);
    }
}
export default isAuthenticated;