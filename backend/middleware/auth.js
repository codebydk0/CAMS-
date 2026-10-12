function requireAuth(req, res, next) {
  if (!req.session || !req.session.user) {
    return res.status(401).json({
      success: false,
      message: "Please login first.",
    });
  }

  // Force first-time users to change their password
  if (req.session.user.firstLogin === true) {
    return res.status(403).json({
      success: false,
      mustChangePassword: true,
      message: "Please change your password before continuing.",
    });
  }

  next();
}

function requireRole(...allowedRoles) {
  return (req, res, next) => {
    if (!req.session || !req.session.user) {
      return res.status(401).json({
        success: false,
        message: "Please login first.",
      });
    }

    // Restrict normal protected routes until password is changed
    if (req.session.user.firstLogin === true) {
      return res.status(403).json({
        success: false,
        mustChangePassword: true,
        message: "Please change your password before continuing.",
      });
    }

    const userRole = req.session.user.role;

    if (!allowedRoles.includes(userRole)) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to access this resource.",
      });
    }

    next();
  };
}

module.exports = { requireAuth, requireRole };
