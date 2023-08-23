const axios = require('axios');

module.exports = {
  confirm: async function (req, res) {
    const confirmationToken = req.param('token');
    const sparqlEndpoint = 'http://localhost:3030/my_dataset/update';

    try {
      const sparqlQuery = `
        PREFIX ex: <http://example.org/>
        DELETE {
          ?user ex:confirmationToken "${confirmationToken}" ;
          ex:isConfirmed "false".
        }
        INSERT {
          ?user ex:isConfirmed "true" .
        }
        WHERE {
          ?user ex:confirmationToken "${confirmationToken}" .
        }
      `;

      
      await axios.post(sparqlEndpoint, null, {
        params: {
          update: sparqlQuery,
        },
      });

      
      return res.send('<h1>Account Confirmed! You can now log in.</h1>');
    } catch (error) {
      console.error(error);
      return res.serverError('<h1>Confirmation failed. Please try again later.</h1>');
    }
  },
};
