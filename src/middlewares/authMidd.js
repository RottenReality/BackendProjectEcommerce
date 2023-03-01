const checkUserLogged = (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    } else {
      res.redirect('/api/auth/signin');
    }
  };

  export {checkUserLogged};