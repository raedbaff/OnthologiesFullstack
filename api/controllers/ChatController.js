const chatService=require("../services/ChatService")
module.exports={
    async CreateMessage(req,res){
        const {senderId,ReceiverId}=req.params
        const {Content}=req.body
        try {
            await chatService.SendMessage(senderId,ReceiverId,Content)
            return res.status(200).json({message:"Message sent successfully"})

        }
        catch(error){
            return res.status(500).json({error:error})

        }
    },
    async GetMessagesBetweenUsers(req,res){
        const {senderId,ReceiverId}=req.params
        try {
            const response=await chatService.getMessagesBetweenUsers(senderId,ReceiverId)
            return res.status(200).json({messages:response.results.bindings})

        }
        catch(error){
            return res.status(500).json({error:error})

        }
    }
}