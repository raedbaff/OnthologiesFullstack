const adresseService=require("../services/AdresseService")

module.exports={
    async SaveUserAdresse(req,res){
        const {Street,City,State,Country,lat,lon}=req.body
        const {id}=req.params
        try {
            await adresseService.SaveAdresse(Street,City,State,Country,lat,lon,id)
            return res.status(200).json({message:"Adresse Added successfully"})

        }
        catch(error){
            return res.status(500).json(error)
        }
    },
    async UserAdresses(req,res){
        const {id}=req.params
        try {
            const response=await adresseService.getAdressesUser(id)
            return res.status(200).json({adresses:response.results.bindings})

        }
        catch(error){
            res.status(500).json(error)
        }
    },
    async DeleteTheAdresse(req,res){
        const {id}=req.params
        try {
            await adresseService.DeleteAdresse(id)
            return res.status(200).json({message:"Deleted Adresse Successfully"})

        }
        catch(error){
            res.status(500).json(error)
        }
    }

}