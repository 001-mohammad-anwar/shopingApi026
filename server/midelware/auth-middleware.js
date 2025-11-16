const jwt = require('jsonwebtoken');
const User = require('../model/user-model'); // Ensure the path is correct

const authMiddleware = async (req, res, next) => {
    try {
        // Extract token from cookies or Authorization header
        const token = req.cookies?.accessToken || req.header('Authorization')?.replace(/^Bearer\s+/i, "").trim();

        if (!token) {
            return res.status(401).json({ message: 'Access denied. No token provided.' });
        }
         
        // Verify the token
        const isVerified = jwt.verify(token, process.env.JWT_SECRET_KEY); 

        // Ensure the token contains the required data (email or user ID)
        if (!isVerified.email && !isVerified.id) {
            return res.status(401).json({ message: 'Invalid token. No user data found.' });
        }

        // Find the user in the database
        const userData = await User.findOne({ email: isVerified.email }).select('-password');

        if (!userData) {
            return res.status(404).json({ message: 'User not found.' });
        }

        // Attach user data and token to the request object
        req.user = userData;
        req.token = token;
        req.userID = userData._id;

        // Proceed to the next middleware or route handler
        next();
    } catch (error) { 
        console.error('Error in authMiddleware:', error.message);
        return res.status(401).json({
            message: 'Invalid or expired token.',
            error: true,
            success: false,
        });
    }
};

module.exports = authMiddleware;
