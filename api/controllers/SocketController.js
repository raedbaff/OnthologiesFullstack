/**
 * SocketController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  broadcastGreeting: async function(req, res) {
    try {
      var user={
        "id":"1",
        "username":"raed",
        "age":15
      }
     
        await sails.io.sockets.emit('hola',{ greeting: "hola" });

      
     
     

    return res.ok();

    }
    catch(error){
      return res.status(500).json({message:"Something went completely wrong"})
    }
    
  },
      // getServerMessage: async function (req, res) {
      //   try {
      //     await sails.sockets.broadcast('artsAndEntertainment',"heloo", { greeting: 'Hola!' });
      //    return res.status(200).json({ message: "Message broadcasted successfully." })

      //   }
      //   catch(error){
      //     return res.status(200).json({message:error})
      //   }
         
        
      // },
      
      sendMessage: async function (req, res) {
        console.log("im trying to work now")
        const message = req.param('message');
        
    
        // Broadcast the message to all connected users
        await sails.io.sockets.emit('hola',{ greeting: message });
    
        return res.ok();
      }
};

