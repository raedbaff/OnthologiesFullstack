const uuidv4 = require("uuid").v4;
const { default: axios } = require("axios");
const sparqlEndpoint = "http://localhost:3030/my_dataset/update";
const FetchsparqlEndpoint = "http://localhost:3030/my_dataset/query";
module.exports = {
  async SendMessage(senderId, ReceiverId, Content,PDFFile,PDFName) {
    try {
      const messageId = uuidv4();
      var timestamp = new Date().toISOString();
      console.log("here is the date timestamp : " + timestamp);

      const sparqlQuery = `
                PREFIX msg: <http://message.org/>
          
                INSERT DATA {
                  msg:Message${messageId} msg:senderId "${senderId}";
                  msg:ReceiverId "${ReceiverId}";
                  msg:Content "${Content}";
                  msg:PDFFile "${PDFFile}";
                  msg:PDFName "${PDFName}";
                  msg:timestamp "${timestamp}".
                }
              `;
      var message = {
        senderId,
        ReceiverId,
        Content,
        PDFFile,
        PDFName,
        timestamp,
        notification:"You have received a new message "
      };
      await sails.io.sockets.emit(`Message${ReceiverId}`, { message: message });
      await sails.io.sockets.emit(`Message${senderId}`, { message: message });
      await axios.post(sparqlEndpoint, null, {
        params: {
          update: sparqlQuery,
        },
      });
    } catch (error) {
      throw error;
    }
  },
  async getMessagesBetweenUsers(senderId, ReceiverId) {
    try {
      const sparqlQuery = `
        PREFIX msg: <http://message.org/>
PREFIX ex: <http://example.org/>
          
                Select ?Message ?PDFFile ?PDFName ?Content ?timestamp ?user ?photo ?username ?senderId 
WHERE{
  {
                  ?Message msg:senderId "${senderId}";
                  msg:senderId ?senderId;
                  msg:ReceiverId "${ReceiverId}";
                  msg:PDFFile ?PDFFile;
                  msg:PDFName ?PDFName;
                  msg:Content ?Content;
                  msg:timestamp ?timestamp.
                  ?user ex:id "${senderId}";
                        ex:photo ?photo;
                        ex:username ?username.
                }
UNION {
?Message msg:senderId "${ReceiverId}";
msg:senderId ?senderId;
                  msg:ReceiverId "${senderId}";
                  msg:PDFFile ?PDFFile;
                  msg:PDFName ?PDFName;
                  msg:Content ?Content;
                  msg:timestamp ?timestamp.
    ?user ex:id "${ReceiverId}";
                        ex:photo ?photo;
                        ex:username ?username.
}
}
ORDER BY ?timestamp
              `;
      const res = await axios.get(FetchsparqlEndpoint, {
        params: { query: sparqlQuery },
      });
      return res.data;
    } catch (error) {
      throw error;
    }
  },
  
  //   async DeleteAdresse(id){
  //     try {
  //       const sparqlQuery=`
  //       PREFIX ad: <http://adresse.org/>

  //                 DELETE WHERE {
  //                   ?Adresse ad:AdresseId "${id}";
  //                   ad:AdresseId ?AdresseId;
  //                   ad:Street ?Street;
  //                   ad:City ?City;
  //                   ad:State ?State;
  //                   ad:Country ?Country;
  //                   ad:lat ?lat;
  //                   ad:lon ?lon;
  //                   ad:user ?user.
  //                 }`;
  //                 await axios.post(sparqlEndpoint, null, {
  //                   params: {
  //                     update: sparqlQuery,
  //                   },
  //                 });
  //     }
  //     catch(error){
  //       throw error
  //     }
  //   }
};
