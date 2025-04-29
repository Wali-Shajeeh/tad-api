const checkRole = (roles) => async (req, res, next) => {
    try {
        // Ensure user is attached from previous token verification middleware
        if (!req.user) {
            return res.status(401).json({ message: 'User not authenticated', success: false });
        }

        // Check if user has one of the required roles
        const hasRequiredRole = Array.isArray(roles)
            ? roles.includes(req.user.role)
            : req.user.role === roles;

        if (!hasRequiredRole) {
            return res.status(403).json({
                message: `Access restricted to ${Array.isArray(roles) ? roles.join(' or ') : roles} role${Array.isArray(roles) && roles.length > 1 ? 's' : ''}`,
                success: false,
            });
        }

        next();
    } catch (error) {
        console.error('Error in role verification:', error);
        return res.status(500).json({ message: 'Internal server error', success: false });
    }
};

module.exports = checkRole;