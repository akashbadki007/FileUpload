    // create server
const express = require('express');
const app = express();

require('dotenv').config();
const PORT = process.env.PORT || 4000;

   // middleware
app.use(express.json());
const fileUpload = require('express-fileupload');
app.use(fileUpload(
    {
        useTempFiles : true,
        tempFileDir : '/tmp/'
    }
));

// import routes
const routes = require('./Routes/fileRoutes');
app.use('/api/v1/upload',routes);

// import DB & Cloudinary
require('./Config/database').dbConnect();
require('./Config/cloudinary').cloudinaryConnect();

// activate server
app.listen(PORT, () => {
    console.log(`Server Created Successfully At ${PORT}`);
})

// default browser
app.get('/', (req,res) => {
    res.send(`<h1> This is Home Page </h1>`);
})