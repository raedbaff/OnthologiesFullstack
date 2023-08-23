const uuidv4 = require("uuid").v4;
const { default: axios } = require("axios");
const sparqlEndpoint = "http://localhost:3030/my_dataset/update";
const FetchsparqlEndpoint = "http://localhost:3030/my_dataset/query";
module.exports = {
    
  async SaveAdresse(Street, City, State, Country, lat, lon, id) {
    
    try {
      const adresseId = uuidv4();

      const sparqlQuery = `
                PREFIX ad: <http://adresse.org/>
          
                INSERT DATA {
                  ad:Adresse${adresseId} ad:Street "${Street}";
                  ad:AdresseId "${adresseId}";
                  ad:City "${City}";
                  ad:State "${State}";
                  ad:Country "${Country}";
                  ad:lat "${lat}";
                  ad:lon "${lon}";
                  ad:user "${id}".
                }
              `;
      await axios.post(sparqlEndpoint, null, {
        params: {
          update: sparqlQuery,
        },
      });
    } catch (error) {
      throw error;
    }
  },
  async getAdressesUser(id){
    try {
        const sparqlQuery=`
        PREFIX ad: <http://adresse.org/>
          
SELECT ?Street ?City ?State ?Country ?lon ?lat ?Adresse ?AdresseId
WHERE {
   ?Adresse ad:user "${id}";
                  ad:Street ?Street;
                  ad:AdresseId ?AdresseId;
                  ad:City ?City;
                  ad:State ?State;
                  ad:Country ?Country;
                  ad:lat ?lon;
                  ad:lon ?lat.
}
              `;
              const res = await axios.get(FetchsparqlEndpoint, {
                params: { query: sparqlQuery },
              });
              return res.data;
        


    }
    catch(error){
        throw error
    }
  },
  async DeleteAdresse(id){
    try {
      const sparqlQuery=`
      PREFIX ad: <http://adresse.org/>
          
                DELETE WHERE {
                  ?Adresse ad:AdresseId "${id}";  
                  ad:AdresseId ?AdresseId;
                  ad:Street ?Street;
                  ad:City ?City;
                  ad:State ?State;
                  ad:Country ?Country;
                  ad:lat ?lat;
                  ad:lon ?lon;
                  ad:user ?user.
                }`;
                await axios.post(sparqlEndpoint, null, {
                  params: {
                    update: sparqlQuery,
                  },
                });
    }
    catch(error){
      throw error
    }
  }
};
