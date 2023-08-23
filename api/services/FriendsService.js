const axios = require('axios');
const uuidv4 = require('uuid').v4;

module.exports = {
  
  async insert(name, email, photo) {
  const sparqlEndpoint = 'http://localhost:3030/my_dataset/update'; // Update the URL and dataset name accordingly

  try {
    const friendId = uuidv4();
    // Generate SPARQL INSERT query with the provided data
    const sparqlQuery = `
      PREFIX ex: <http://example.org/>

      INSERT DATA {
        ex:Friend${friendId} ex:name "${name}";
          ex:email "${email}";
          ex:photo "${photo}".
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


};