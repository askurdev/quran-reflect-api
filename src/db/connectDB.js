const mongoose = require('mongoose');




let connectionURL = process.env.DB_CONNECTED_URL;
connectionURL = connectionURL.replace("<username>", process.env.DB_USERNAME);
connectionURL = connectionURL.replace("<password>", process.env.DB_PASSWORD);


connectionURL = `${connectionURL}/${process.env.DB_NAME}?${process.env.DB_URL_QUERY}`;

// mongoose.connect(connectionURL,{ dbName: process.env.DB_NAME}).then(() => {
//   console.log("Database connected");
//   app.listen(4000, async () => {
//     console.log("server is listening on port 4000");
//   });
// })
//    .catch((e) => {
//     console.log('Database Connection Failed');
//     console.log('Message:', e.message);
//    });

   const connectDB = async() => {
    await mongoose.connect(connectionURL, { dbName: process.env.DB_NAME});
    console.log('Database Connected');
    
   }

module.exports = connectDB