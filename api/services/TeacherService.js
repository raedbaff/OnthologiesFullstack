const axios = require('axios');
const uuidv4 = require('uuid').v4;
const sparqlEndpoint = 'http://localhost:3030/my_dataset/update';
const sparqlEndpointQuery = 'http://localhost:3030/my_dataset/query';
module.exports={
    async createTeacher(name, photo) {
        const id = uuidv4();
        const query = `
            PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
            PREFIX educa: <http://www.semanticweb.org/gueddes/ontologies/2015/e-Saad-Educa#>
            PREFIX teacher: <http://www.semanticweb.org/gueddes/ontologies/2015/e-Saad-Educa/teacher/>
            INSERT DATA {
                teacher:${id} rdf:type educa:teacher;
                    educa:teacher_id "${id}";
                    educa:name "${name}";
                    educa:photo "${photo}".
            }
        `;
    
        try {
          const response = await axios.post(endpoint, query, {
            headers: {
              'Content-Type': 'application/sparql-update',
            },
          });
    
          return response.data;
        } catch (error) {
          throw new Error('Failed to create teacher');
        }
      },
}