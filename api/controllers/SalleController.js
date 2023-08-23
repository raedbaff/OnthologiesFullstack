const SalleService = require("../services/SalleService");

module.exports = {
    async create(req, res) {
      const {
        libelle_salle,
        numero_salle,
        etat,
        observation,
        type,
        etablissement,
        createdBy
      } = req.body;
  
      try {
        const result = await SalleService.createSalle(libelle_salle, numero_salle, etat, observation, type, etablissement,createdBy);
        return res.view("addSalle",{message:"added successfully"}) // You can customize the response as needed
      } catch (error) {
        return res.serverError({ message: 'Failed to create salle' }); // Handle error gracefully
      }
    },
    async create2(req, res) {
      const {
        libelle_salle,
        numero_salle,
        etat,
        observation,
        type,
        etablissement,
        createdBy
      } = req.body;
  
      try {
        const SalleCreated = await SalleService.createSalle(libelle_salle, numero_salle, etat, observation, type, etablissement, createdBy);
        
        if (SalleCreated) {
          return res.status(200).json({ message: "added Salle successfully",SalleCreated });
        } else {
          return res.serverError({ message: 'Failed to create salle' });
        }
      } catch (error) {
        return res.serverError({ message: 'Failed to create salle' }); // Handle error gracefully
      }
    },
    async getSalleById(req,res){
        const {id}=req.params;
        try {
            const response=await SalleService.getSalleById(id)
            return res.json("your data exists"+JSON.stringify(response.results.bindings[0]))

        }
        catch(error){
            res.status(500).json(error)
        }
    },
    async sallebyUser(req,res){
      const {createdBy}=req.params;
      try {
        const response=await SalleService.getSalleByUser(createdBy)
        req.session.salles=response.results.bindings
        return res.redirect("/salle/list")

      }
      catch(error){

      }
    },
    async sallebyUser2(req,res){
      const {createdBy}=req.params;
      try {
        const response=await SalleService.getSalleByUser(createdBy)
        return res.status(200).json({mySalles:response.results.bindings})

      }
      catch(error){

      }
    },
    async deleteSalle(req,res){
        const {id}=req.params;

        try {
            const response=await SalleService.DeleteSalle(id)
            res.status(200).json("deleted successfully")

        }
        catch(error){
            res.status(500).json(error)

        }
    },
    async updateSalle(req,res){
        const {id}=req.params;
        const {
            libelle_salle,
            numero_salle,
            etat,
            observation,
            type,
            etablissement,
          } = req.body;
          try {
            const response=await SalleService.UpdateSalle(id,libelle_salle, numero_salle, etat, observation, type, etablissement)
        return res.status(200).json("successfully updated")

          }
          catch(error){
            return res.status(500).json(error)

          }
        
    }
  };
  