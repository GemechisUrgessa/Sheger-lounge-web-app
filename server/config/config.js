
let mongoose = require('mongoose')

let dbConnect = (app) => {
    mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/roombooking');
    const db = mongoose.connection;
    db.on('error', (error) => console.error(error));
    db.once('open', () => {
        console.log('Connected to MongoDB')
        app.listen(process.env.PORT || 3000)
        console.log(`app listening on port ${process.env.PORT}`)

    });

}

module.exports=dbConnect