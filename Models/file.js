const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
// require('dotenv').config();

const fileSchema = new mongoose.Schema(
    {
        name: {
            type:String,
        },
        email:{
            type:String,
        },
        tags:{
            type: String
        },
        imageUrl: {
            type:String
        }
    }
)

fileSchema.post("save", async function(doc) {

    try{
        console.log("doc -->> ", doc);
        let transporter = nodemailer.createTransport({
            host:process.env.MAIL_HOST,
            auth: {
                user:process.env.MAIL_USER,
                pass:process.env.MAIL_PASS
            },
        })
        console.log("transporter",transporter);

        let info = await transporter.sendMail({
            from:"Akash Badki",
            to:doc.email,
            subject:"New File Uploaded in Cloudinary",
            html:`<h2> File Uploaded Successfully</h2> <p> Check Here : <a href=${doc.imageUrl}> ${doc.imageUrl} </a> </p> `
        })
        console.log("Info -->>", info);
    }

    catch{
        console.log('While error in sending mail..');
    }
})

const File = mongoose.model("File", fileSchema);
module.exports = File;