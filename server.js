const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({
    path: './config.env'
});

process.on('uncaughtException', err => {
    console.log('UNCAUGHT EXCEPTION!!! shutting down...');
    console.log(`xxxxxxxxxxxxxxxx Error ..xxxxxxxxxxxx`);
    // console.log("Error Name ===>", err.name);
    console.log("Error Message ===>", err.message);
    console.log(`xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`);
    process.exit(1);
});

const app = require('./app');


 const database = process.env.DATABASE

// Connect the database
mongoose.connect(database, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology:true,
}).then(con => {
    console.log('=====>>DB connection Successfully!');
    // Start the server
    const port = process.env.PORT || 5000;
    app.listen(port, () => {
        console.log(`
      ################################################
    xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
             Server listening on port: ${port}
    xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
      ################################################
    `);
    });

    process.on('unhandledRejection', err => {
        console.log(` UNHANDLED REJECTION!!!  shutting down ..`);
        console.log(`xxxxxxxxxxxxxxxx Error ..xxxxxxxxxxxx`);
        console.log("Error Name ===>",err.name);
        console.log("Error Message ===>", err.message);
        console.log('Error====>',err);
        console.log(`xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`);
        server.close(() => {
            process.exit(1);
        });
    });

});

