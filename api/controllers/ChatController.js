const chatService=require("../services/ChatService")
const path=require('path')
module.exports={
    async CreateMessage(req,res){
        const {senderId,ReceiverId}=req.params
        const {Content,senderUsername,senderPhoto}=req.body
        let PDFFile=""
        let PDFName=""
        
        try {
            req.file('pdf').upload({ dirname: require('path').resolve(sails.config.appPath, 'uploads') }, async function (err, uploadedFiles) {
                if (err) {
                  return res.serverError(err);
                }
                if (uploadedFiles.length !==0){
                    const tmpFilePath = uploadedFiles[0].fd;
                    const parts = tmpFilePath.split('\\');
                    PDFFile = parts.pop();
                    PDFName=uploadedFiles[0].filename
            
                    console.log("Uploaded Files:", PDFFile);
                    await chatService.SendMessage(senderId,ReceiverId,Content,PDFFile,PDFName,senderUsername,senderPhoto)
            return res.status(200).json({message:"Message sent successfully"})

                } else {
                    PDFFile=""
                    PDFName=""
                    console.log("Uploaded Files:", PDFFile);
                    await chatService.SendMessage(senderId,ReceiverId,Content,PDFFile,PDFName,senderUsername,senderPhoto)
            return res.status(200).json({message:"Message sent successfully"})

                }
                // const filename = `${id}`+uploadedFiles[0].filename;
        })}
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