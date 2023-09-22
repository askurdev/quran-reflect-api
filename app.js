require('dotenv').config();
const express = require("express");
const applyMiddleware = require('./src/middleware');
const { connectDB } = require('./src/db')



// express app
const app = express();
applyMiddleware(app);


app.get("/health", (req, res) => {
  res.status(200).json({
    health: "ok",
    user: req.user,
  });
});

app.use('*', (req,res,next) => {
  const error = new Error(' Requested Resource not found')
  error.error = '404'
  error.error = 'Not Found'

  next(error)
})

app.use ((err, req, res, next) => {

  console.log('Generated 404 error');
  console.log({ message: err.message, code: err.code, error: err.error});
  //format error
  res.status(err.status || 500).json({
    message: err.message,
    errors: err.errors,
  });
});

const port = process.env.PORT || 4000

const main = async () => {
  try {
    await connectDB()
    app.listen(port, async () => {
      console.log("server is listening on port 4000");
  });

  } catch (e) {
    console.log('Database Error');
    console.log(e);

  }
}

main()


 module.exports = app;

