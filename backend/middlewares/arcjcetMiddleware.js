import aj from "../config/arcjet.js";

const arcjetMiddleware = async(req, res, next) => {
    
    // Default to development mode if NODE_ENV is not set
    const isDevelopment = (process.env.NODE_ENV || 'development') === 'development';
    
    // Skip Arcjet protection in development mode for localhost requests
    if (isDevelopment && 
        (req.ip === "127.0.0.1" || req.ip === "::1" || req.ip === "localhost" || 
         req.connection?.remoteAddress === "127.0.0.1" || 
         req.connection?.remoteAddress === "::1")) {
        console.log(`Skipping Arcjet protection for development request from ${req.ip || req.connection?.remoteAddress}`);
        return next();
    }
    
    try {
        const decision = await aj.protect(req);

        if(decision.isDenied()) {
            console.log(`Arcjet denied request: ${decision.reason}`);
            
            if(decision.reason.isRateLimit()) {
                return res.status(429).json({ error: 'Rate limit exceeded'});
            }

            if(decision.reason.isBot()) {
                return res.status(403).json({ error: 'Bot detected'});
            }

            return res.status(403).json({error: 'Access denied'});
        }

        next();
    } catch (error) {
        console.log(`Arcjet Middleware Error: ${error}`);
        // In development, continue even if Arcjet fails
        if (isDevelopment) {
            console.log("Continuing request in development mode despite Arcjet error");
            return next();
        }
        next(error);
    }
};

export default arcjetMiddleware;