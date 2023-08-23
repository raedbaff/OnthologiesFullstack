// your_project_name/api/services/sparqlService.js

const axios = require('axios');
const uuidv4 = require('uuid').v4;

module.exports = {
  async query(createdBy) {
    const sparqlEndpoint = 'http://localhost:3030/my_dataset/query'; // Update the URL and dataset name accordingly

    try {
      
      // Hard-coded SPARQL query
      const sparqlQuery = `
      PREFIX ex: <http://example.org/>
      SELECT ?PC ?PCModel ?PCPrice ?id ?mouse ?mouseType ?mouseModel
      WHERE {
        ?PC ex:createdBy "${createdBy}";
            ex:model ?PCModel;
            ex:price ?PCPrice;
            ex:id ?id;
            ex:hasMouse ?mouse.
        ?PC ex:model ?PCModel;
            ex:price ?PCPrice.
        ?mouse ex:type ?mouseType;
               ex:model ?mouseModel.
      }
    `;

      const response = await axios.get(sparqlEndpoint, { params: { query: sparqlQuery } },{ headers: { 'Content-Type': 'application/sparql-query' } });
      return response.data;
    } catch (err) {
      throw err;
    }
  },
  async insert(pcModel, pcPrice, mouseType, mouseModel,createdBy) {
  const sparqlEndpoint = 'http://localhost:3030/my_dataset/update'; // Update the URL and dataset name accordingly

  try {
    const pcID = uuidv4();
    const mouseID = uuidv4();
    const id=uuidv4();
    // Generate SPARQL INSERT query with the provided data
    const sparqlQuery = `
      PREFIX ex: <http://example.org/>

      INSERT DATA {
        ex:PC${pcID} ex:model "${pcModel}";
          ex:price "${pcPrice}";
          ex:id "${id}";
          ex:hasMouse ex:mouse${mouseID} ;
          ex:createdBy "${createdBy}" .
        ex:mouse${mouseID} ex:type "${mouseType}";
          ex:model "${mouseModel}";
          ex:belongsTo ex:PC${pcID}.
      }
    `;

    const response = await axios.post(sparqlEndpoint, null, {
      params: {
        update: sparqlQuery,
      },
    });
    return response.data;
  } catch (err) {
    throw err;
  }
},
async getPc(pcModel){
  const sparqlEndpoint = 'http://localhost:3030/my_dataset/query';
  try {
    const sparqlQuery=`PREFIX ex: <http://example.org/>

    SELECT ?PC ?PCModel ?PCPrice ?id ?mouse ?mouseType ?mouseModel
    WHERE {
      ?PC ex:model "${pcModel}";
          ex:model ?PCModel;
          ex:price ?PCPrice;
          ex:id ?id;
          ex:hasMouse ?mouse.
      
      ?mouse ex:type ?mouseType;
             ex:model ?mouseModel.
    }    
    `
    const response=await axios.get(sparqlEndpoint,{params:{query:sparqlQuery}});
    return response.data
    


  }
  catch(error){
    throw error;

  }
},
async DeletePc(id){
  const sparqlEndpoint = 'http://localhost:3030/my_dataset/update';
  try {
    const sparqlQuery=`
    PREFIX ex: <http://example.org/>
    DELETE 
    WHERE{
      ?PC ex:id "${id}";
      ex:model ?PCModel;
      ex:price ?PCPrice;
      ex:createdBy ?createdBy;
      ex:hasMouse ?mouse.
      ?mouse ex:type ?mouseType;
               ex:model ?mouseModel;
               ex:belongsTo ?PC


    }
    `
    const response = await axios.post(
      sparqlEndpoint,
      sparqlQuery,
      {
        headers: {
          'Content-Type': 'application/sparql-update',
        },
      }
    );
    return response.data;

  }
  catch(error){
    throw error;
  }

}
};
