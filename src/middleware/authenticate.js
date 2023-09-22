const authenticate = (req, _res, next) => {
      req.user = {
        id: 101,
        name: "askur",
      };
      next();
    };

    module.exports = authenticate;
    
