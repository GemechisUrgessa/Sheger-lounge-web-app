// Description: This file is used to connect to the database
const mongoose = require("mongoose");
// const connect = async(app)=>{
//     try {
//         mongoose.connect(process.env.DB_CONNECTION_STRING)
//         app.listen(process.env.PORT,console.log(`Server is listing on port ${process.env.PORT}`))
//     } catch (error) {
//         console.log(error)
//     }
// }
// export default connect

// mongoose.connect(process.env.DB_CONNECTION_STRING, {
//     useNewUrlParser: true,
//     useCreateIndex: true
// });

// const db = mongoose.connection;

// db.on('connected', () => {
//     console.log(`Connected to MongoDB on + ${db.host} + ':' + ${db.port}`);
// });

// module.exports = mongoose;
// connect to mongoose database with process.env.DB_CONNECTION_STRING
// display connection status
module.exports = connect = async () => {
  mongoose.set('strictQuery', true);
  mongoose
    .connect(process.env.DB_CONNECTION_STRING)
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((err) => {
      console.log("Error connecting to MongoDB", err);
    });
};
