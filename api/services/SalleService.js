const axios = require('axios');
const { v4: uuidv4 } = require('uuid');

const endpoint = "http://localhost:3030/my_dataset/update";
const fetchEndpoint="http://localhost:3030/my_dataset/query"

module.exports = {
  async createSalle(libelle_salle, numero_salle, etat, observation, type, etablissement,createdBy) {
    const id = uuidv4();
    const query = `
        PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
        PREFIX educa: <http://www.semanticweb.org/gueddes/ontologies/2015/e-Saad-Educa#>
        PREFIX salle: <http://www.semanticweb.org/gueddes/ontologies/2015/e-Saad-Educa/salle/>
        INSERT DATA {
            salle:${id} rdf:type educa:salle;
                educa:id_salle "${id}";
                educa:libelle_salle "${libelle_salle}";
                educa:numero_salle "${numero_salle}";
                educa:etat "${etat}";
                educa:observation "${observation}";
                educa:type "${type}";
                educa:etablissement "${etablissement}";
                educa:createdBy "${createdBy}".
        }
    `;

    try {
      const response = await axios.post(endpoint, query, {
        headers: {
          'Content-Type': 'application/sparql-update',
        },
      });
      const createdSalle={
        id,
        libelle_salle,
        numero_salle,
        etat,
        observation,
        type,
        etablissement,
        createdBy
      }
      return createdSalle;
    } catch (error) {
      throw new Error('Failed to create salle');
    }
  },
  async getSalleById(id){
    const sparqlQuery=`
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
        PREFIX educa: <http://www.semanticweb.org/gueddes/ontologies/2015/e-Saad-Educa#>
        PREFIX salle: <http://www.semanticweb.org/gueddes/ontologies/2015/e-Saad-Educa/salle/>
        SELECT ?libelle_salle ?numero_salle ?etat ?observation ?type ?etablissement ?id_salle
        WHERE {
            ?salle rdf:type educa:salle;
                educa:id_salle "${id}";
                educa:id_salle ?id_salle;
                educa:libelle_salle ?libelle_salle;
                educa:numero_salle ?numero_salle;
                educa:etat ?etat;
                educa:observation ?observation;
                educa:type ?type;
                educa:etablissement ?etablissement.
                
        }
    `
    try {
        const response=await axios.get(fetchEndpoint,{params:{query:sparqlQuery}});
      return response.data

    }
    catch(error){
        throw error;

    }
  },
  async getSalleByUser(createdBy){
    const sparqlQuery=`
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
        PREFIX educa: <http://www.semanticweb.org/gueddes/ontologies/2015/e-Saad-Educa#>
        PREFIX salle: <http://www.semanticweb.org/gueddes/ontologies/2015/e-Saad-Educa/salle/>
        SELECT ?createdBy ?libelle_salle ?numero_salle ?etat ?observation ?type ?etablissement ?id_salle
        WHERE {
            ?salle rdf:type educa:salle;
                educa:createdBy "${createdBy}";
                educa:createdBy ?createdBy;
                educa:id_salle ?id_salle;
                educa:libelle_salle ?libelle_salle;
                educa:numero_salle ?numero_salle;
                educa:etat ?etat;
                educa:observation ?observation;
                educa:type ?type;
                educa:etablissement ?etablissement.
                
        }
    `
    try {
        const response=await axios.get(fetchEndpoint,{params:{query:sparqlQuery}});
      return response.data

    }
    catch(error){
        throw error;

    }

  },
  async DeleteSalle(id){
    const sparqlQuery=`
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX educa: <http://www.semanticweb.org/gueddes/ontologies/2015/e-Saad-Educa#>
PREFIX salle: <http://www.semanticweb.org/gueddes/ontologies/2015/e-Saad-Educa/salle/>
DELETE 
WHERE {
      ?salle rdf:type educa:salle;
    educa:id_salle "${id}";
                educa:libelle_salle ?libelle_salle;
                educa:numero_salle ?numero_salle;
                educa:etat ?etat;
                educa:observation ?observation;
                educa:type ?type;
                educa:etablissement ?etablissement;
                educa:createdBy ?createdBy.
    }
           
    `
    const response = await axios.post(
        endpoint,
        sparqlQuery,
        {
          headers: {
            'Content-Type': 'application/sparql-update',
          },
        }
      );
      return response.data;
  },
  async UpdateSalle(id,libelle_salle, numero_salle, etat, observation, type, etablissement){
    const sparqlQuery=`
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX educa: <http://www.semanticweb.org/gueddes/ontologies/2015/e-Saad-Educa#>
PREFIX salle: <http://www.semanticweb.org/gueddes/ontologies/2015/e-Saad-Educa/salle/>

DELETE {
  ?salle educa:libelle_salle ?oldlibelle_salle.
  ?salle educa:numero_salle ?oldnumero_salle.
  ?salle educa:etat ?oldetat.
  ?salle educa:observation ?oldobservation.
  ?salle educa:type ?oldtype.
  ?salle educa:etablissement ?oldetablissement.
}
INSERT {
  ?salle educa:libelle_salle "${libelle_salle}".
  ?salle educa:numero_salle "${numero_salle}".
  ?salle educa:etat "${etat}".
  ?salle educa:observation "${observation}".
  ?salle educa:type "${type}".
  ?salle educa:etablissement "${etablissement}".
}
WHERE {
  ?salle rdf:type educa:salle;
         educa:id_salle "${id}".
  OPTIONAL {
    ?salle educa:libelle_salle ?oldlibelle_salle.
  }
  OPTIONAL {
    ?salle educa:numero_salle ?oldnumero_salle.
  }
  OPTIONAL {
    ?salle educa:etat ?oldetat.
  }
  OPTIONAL {
    ?salle educa:observation ?oldobservation.
  }
  OPTIONAL {
    ?salle educa:type ?oldtype.
  }
  OPTIONAL {
    ?salle educa:etablissement ?oldetablissement.
  }
}

    `
    const response=await axios.post(endpoint,null,{params:
        {update:sparqlQuery}
    })
    return response.data
  }
};
