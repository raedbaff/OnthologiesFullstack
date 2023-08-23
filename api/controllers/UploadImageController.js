const axios = require('axios'); // Make sure to import the axios library
const { v4: uuidv4 } = require("uuid");
const path=require('path')

const endpoint = "http://localhost:3030/my_dataset/update";
const fetchEndpoint = "http://localhost:3030/my_dataset/query";


module.exports = {
   async uploadImage (req, res) {
    
    try {
        const {user}=req.params
        const id = uuidv4();
      req.file('image').upload({ dirname: require('path').resolve(sails.config.appPath, 'uploads') }, async function (err, uploadedFiles) {
        if (err) {
          return res.serverError(err);
        }
        const tmpFilePath = uploadedFiles[0].fd;
        const parts = tmpFilePath.split('\\');
        const uuidPart = parts.pop();

        console.log("Uploaded Files:", uuidPart);
        

        if (uploadedFiles.length === 0) {
          return res.badRequest('No file uploaded.');
        }

        const filename = `${id}`+uploadedFiles[0].filename;

        // Perform the SPARQL insert
        const sparqlQuery = `
        PREFIX ex: <http://example.org/>

DELETE {
  ?User ex:photo ?oldphoto ;
}
INSERT {
  ?User ex:photo "${uuidPart}" .
}
WHERE {
  ?User ex:id "${user}" ;
        ex:photo ?oldphoto .
}
        
       `;

       
        try {
          const response = await axios.post(endpoint, sparqlQuery, {
            headers: {
              "Content-Type": "application/sparql-update",
            },
          });

          return res.ok(`Image ${filename} uploaded and data inserted successfully.`);
        } catch (error) {
          return res.serverError("Failed to insert data into Fuseki.");
        }
      });
    } catch (error) {
      return res.serverError("Failed to upload image.");
    }
  },
   async getImage (req, res) {
    const { filename,ext} = req.params;
    const thing="raed.jpg"
    const splitted=thing.split(".")[1]
    console.log("here is it "+splitted)
     
    
    console.log("Requested filename:"+ filename+"."+ext);
  // The rest of your code...
    
    try {
        console.log("me trying to work")
      const filename = req.params.filename;
      const imagePath = path.join(__dirname, '../../uploads'+"/"+ filename+"."+ext);
      console.log("the image path is the following : "+imagePath)
      
      
      
        return res.sendFile(imagePath);
      
    } catch (error) {
      return res.serverError('Failed to retrieve image.');
    }
  },
};
