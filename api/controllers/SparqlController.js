// your_project_name/api/controllers/SparqlController.js

const sparqlService = require('../services/SparqlService');
// const multer = require('multer');
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, './uploads'); // Define the destination folder where photos will be stored
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + '-' + file.originalname); // Use a unique filename to prevent overwriting
//   },
// });

// const upload = multer({ storage: storage }).single('photo');

module.exports = {
  async query(req, res) {
    try {
      const {createdBy}=req.params
      const response = await sparqlService.query(createdBy);
      req.session.pcList=response.results.bindings
      return res.redirect('/cards');
    } catch (err) {
      console.error(err);
      return res.serverError(err);
    }
  },
  async insert(req, res) {
    try {
      // Call the `upload` middleware to handle the photo upload
      
        
  
        const { pcModel, pcPrice, mouseType, mouseModel, createdBy } = req.body;
  
        // Get the photo filename from the uploaded file
        
  
        // Call the sparqlService.insert() function with the extracted data and photo filename
        await sparqlService.insert(pcModel, pcPrice, mouseType, mouseModel, createdBy);
  
        // Send a success response
        return res.view("addPc",{message:"added successfully"})
      ;
    } catch (err) {
      console.error(err);
      return res.serverError(err);
    }
  },
  async getOneProduct(req,res){
    try {
      const {pcModel}=req.params;
      const result=await sparqlService.getPc(pcModel);
      const bindings = result.results.bindings;
      if (bindings.length === 0) {
        // If no PC with the provided model was found, return a response indicating that the PC was not found.
        return res.status(404).json({ message: 'PC not found' });
      }
      console.log("the pc details"+JSON.stringify(bindings))
      return res.view('pcDetails', { pc: bindings });

    }
    catch(error){
      console.log(error)
      
    }
  },
  async deleteOne(req,res){
    const {id}=req.params
    try {
      await sparqlService.DeletePc(id)
      const username=req.session.result.username
      return res.redirect(`/sparql/query/${username}`)

    }
    catch(error){
      return res.serverError(error)
      
    }
  }
};
