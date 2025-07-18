const rolePermissions = require('../utils/permissions');

const accessControl = (resource, action) => {
  return (req, res, next) => {
    const userRole = req.user?.role;

    if (!userRole) {
      return res.status(401).json({ message: 'Unauthorized: Role not found' });
    }

    const allowedRoles = rolePermissions[resource]?.[action];

    if (!Array.isArray(allowedRoles)) {
      return res.status(403).json({ message: `Forbidden: No roles configured for ${resource} - ${action}` });
    }

    if (!allowedRoles.includes(userRole)) {
      return res.status(403).json({ message: 'Forbidden: Access denied' });
    }

    next();
  };
};

module.exports = accessControl;
