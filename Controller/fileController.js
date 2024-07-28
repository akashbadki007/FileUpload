const File = require('../Models/file');
const cloudinary = require('cloudinary').v2;

exports.localFileUpload = async (req,res) => {

    try{
        // Fetch Data from server
        const {name,email,tags} = req.body;
        console.log("Your Details Here : -->>", name,email,tags)
        const file = req.files.localFile;
        console.log("Your Image Here : -->> " ,file);
        
        // Create Path
        const path = __dirname + '/files/' + Date.now() + `.${file.name.split('.')[1]}`;
        console.log("Path -->>",path);

        // path move in mv() method.
        file.mv(path, (error) => {
            console.log("Error in Path");
            console.error(error);
        })

        res.status(200).json({
            success:true,
            message:"Local File Uploaded Successfully...."
        })
    }

    catch{
        res.status(400).json({
            success:false,
            message: "Error in local file system",
        })
    }
}


function isFileTypeSupported(type,supportedTypes) {
   return supportedTypes.includes(type);
}

async function uploadToCloudinary(file,folder,quality) {
    const options = {folder};
    if(quality) {
        options.quality = quality;
    }
    options.resource_type = "auto";
   return  await cloudinary.uploader.upload(file.tempFilePath,options)
}

// image upload handler
exports.imageUpload = async (req,res) => {

    try{
        const {name,email,tags} = req.body;
        console.log("Your Details Here : -->> ", name,email,tags);

        const file = req.files.imageFile;
        console.log("Your Image Here : -->> " ,file)

        const supportedTypes = ["jpg", "jpeg", "png"];
        const fileType = file.name.split('.')[1].toLowerCase();
        console.log("filesTypes  --->>", fileType);

        if(!isFileTypeSupported(fileType,supportedTypes)) {

            return res.status(400).json({
                success:false,
                message:"File format not supported"
            })
        }


        const response = await uploadToCloudinary(file,"ImageFolder");
        console.log("response --->>> ",response);

        const fileData = await File.create({
            name,
            email,
            tags,
            imageUrl : response.secure_url,

        })
        console.log("Entry in Databases",fileData)

        res.status(200).json({
            success:true,
            message:"File Uploaded Succewssfully..",
            imageUrl: response.secure_url
        })
    }

    catch{
        res.status(400).json({
            success:false,
            message:"Something went wrong Please try again"
        })
    }
}

// video upload handler
exports.videoUpload =  async (req,res) => {

    try{

        // fetch data
        const {name,email,tags} = req.body;
        console.log("Your Details Here -->> " , name,email,tags);
        const file = req.files.videoFile;
        console.log("Your Video Here : -->>",file);

        // check validation
        const supportedTypes = ["mp4", "mov"];
        const fileType = file.name.split('.')[1].toLowerCase();
        console.log("FileType -->>", fileType);

        if(!isFileTypeSupported(fileType , supportedTypes)) {
            return res.status(400).json({
                success:false,
                message:"File format not supported"
            })
        }

        // Video upload in Cloudinary
        const response = await uploadToCloudinary(file,"VideoFolder");
        console.log("response -->> ",response);

        // Entry in Database 
        const fileData = await File.create({
            name,                                               
            email,                                             
            tags,                                              
            imageUrl:response.secure_url
        })
        console.log("Entry in Databases -->> ", fileData);

        // Status of your code
        res.status(200).json({
            success:true,
            message:"File Uploaded Successfully...",
            imageUrl:response.secure_url
        })
    }

    // Error in above code then catch block executed 
    catch{
        res.status(400).json({
            success:false,
            message:"Something went wrong Please try again",
        })   
    }
}

// Reducer upload handler
exports.reducersImgUpload = async (req,res) => {

    try{
        // Fetch Data
        const {name,email,tags} = req.body;
        console.log("Your Details Here -->> ", name,email,tags);
        const file = req.files.redImgFile;
        console.log("Your Reducers Image Here : -->>",file);

        // check validation
        const supportedTypes = ["jpg","jpeg","png"];
        const fileType = file.name.split('.')[1].toLowerCase();
        console.log("FileType -->>",fileType);

        if(!isFileTypeSupported(fileType,supportedTypes)) {
            return res.status(400).json({
                success:false,
                message:"File format not supported.. "
            })
        }

        const response = await uploadToCloudinary(file,"ReducersImg",50);
        console.log("response -->> ",response);

        const fileData = File.create({
            name,
            email,
            tags,
            imageUrl:response.secure_url
        })
        console.log("Entry in Databases --->>", fileData);

        res.status(200).json({
            success:true,
            message:"File Uploaded Successfully...",
            imageUrl:response.secure_url
        })
    }

    catch{
        res.status(400).json(
            {
                success:false,
                message:"Something went wrong please try again"
            }
        )
    }

}


// http://localhost:3000/api/v1/upload/reducersImgUpload