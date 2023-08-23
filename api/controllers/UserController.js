const UserService = require("../services/UserService")
const userService=require("../services/UserService")

module.exports={
    
    async register(req,res){
        try {
            const {username,email,password}=req.body
        await userService.register(username,email,password)
        return res.view('register',{successMessage:"Registerd successfully"})

        }
        catch(error){
            return res.serverError(error);
        }
        

    },
    async register2(req,res){
        try {
            const {username,email,password}=req.body
        await userService.register(username,email,password)
        return res.status(200).json({message:"Successfully registered, Check mail for confirmation !!"})

        }
        catch(error){
            return res.status(500).json({message:"Something went wrong !!, please check your credentials and try again"})
        }
        

    },
    async GetAllUsers(req,res){
        try {
            const users=await userService.GetAllUsers()
            return res.status(200).json(users)

        }
        catch(error){
            return res.serverError(error);

        }

    },
    async login(req,res){
        const {email,password}=req.body
        try {
            const result=await userService.login(email,password)
            if (result){
                
                if (result.confirmed==="false"){
                    return res.status(401).json({message:"account not confirmed"})

                }
                else {
                    req.session.result = result;
                
                    return res.redirect('/home');

                }
            }
             else {
               
                return res.status(401).json({ "isAuthenticated": false, message: 'Invalid email or password' });
              }
            


        }
        catch(error){
            return res.status(500).json({ message: 'Login failed', error: error.message });
        }
    },
    async UserProfile(req,res){
        const {id}=req.params
        try {
            const response=await userService.getUserProfile(id)
            if (response.results.bindings[0]){
                return res.status(200).json({User:response.results.bindings[0]})
            }
            else {
                return res.status(404).json({message:"no user found"})
            }
            


        }
        catch(error){
            res.status(500).json("could not find user profile")
        }
    },
    async UserProfileV2(req,res){
        const {id}=req.params
        try {
            const response=await userService.getUserProfileV2(id)
            return res.status(200).json({User:response.results.bindings})

        }
        catch(error){
            return res.status(500).json(error)
        }

    },
    async UpdateUserAdresse(req,res){
        const {Street,City,State,Country}=req.body
        const {id}=req.params
        try {
            await UserService.updateUserAdresse(Street,City,State,Country,id)
            return res.status(200).json({message:"user Adresse Updated Successfully"})

        }
        catch(error){
            return res.status(500).json(error)

        }
    }
}