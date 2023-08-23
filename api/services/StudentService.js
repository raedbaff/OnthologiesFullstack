const axios = require("axios");
const { v4: uuidv4 } = require("uuid");

const endpoint = "http://localhost:3030/my_dataset/update";
const fetchEndpoint = "http://localhost:3030/my_dataset/query";

module.exports = {
  async createStudent(cin, name, lastname, age, level, classe, createdBy) {
    const id = uuidv4();
    const query = `
        PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
        PREFIX educa: <http://www.semanticweb.org/gueddes/ontologies/2015/e-Saad-Educa#>
        PREFIX student: <http://www.semanticweb.org/gueddes/ontologies/2015/e-Saad-Educa/student/>
        INSERT DATA {
            student:${id} rdf:type educa:student;
                educa:student_id "${id}";
                educa:cin "${cin}";
                educa:name "${name}";
                educa:lastname"${lastname}";
                educa:age "${age}";
                educa:level "${level}";
                educa:classe "${classe}";
                educa:createdBy "${createdBy}".
        }
    `;

    try {
      const response = await axios.post(endpoint, query, {
        headers: {
          "Content-Type": "application/sparql-update",
        },
      });

      return response.data;
    } catch (error) {
      throw new Error("Failed to create student");
    }
  },
  async StudentByClass(classe) {
    const sparqlQuery = `
        PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
        PREFIX educa: <http://www.semanticweb.org/gueddes/ontologies/2015/e-Saad-Educa#>
        PREFIX student: <http://www.semanticweb.org/gueddes/ontologies/2015/e-Saad-Educa/student/>
        SELECT ?student ?cin ?name ?lastname ?age ?level ?classe
        WHERE {
            ?student educa:classe "${classe}";
                educa:cin ?cin;
                educa:name ?name;
                educa:lastname ?lastname;
                educa:age ?age;
                educa:classe ?classe;
                educa:level ?level.
        } 
    `;
    try {
      const response = await axios.get(fetchEndpoint, {
        params: { query: sparqlQuery },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  async cinExists(cin) {
    const sparqlQuery = `
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
    PREFIX educa: <http://www.semanticweb.org/gueddes/ontologies/2015/e-Saad-Educa#>
    PREFIX student: <http://www.semanticweb.org/gueddes/ontologies/2015/e-Saad-Educa/student/>
     ASK {
    ?student rdf:type educa:student;       
    educa:cin "${cin}".
  
               
                
        }
    `;
    try {
      const response = await axios.post(fetchEndpoint, sparqlQuery, {
        headers: {
          "Content-Type": "application/sparql-query",
        },
      });

      return response.data;
    } catch (error) {
      throw new Error("Failed to create student");
    }
  },
  async DeleteStudent(cin) {
    const sparqlQuery = `
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
        PREFIX educa: <http://www.semanticweb.org/gueddes/ontologies/2015/e-Saad-Educa#>
        PREFIX student: <http://www.semanticweb.org/gueddes/ontologies/2015/e-Saad-Educa/student/>
        DELETE
        WHERE {
            ?student rdf:type educa:student;
                educa:student_id ?student_id;
                educa:cin "${cin}";
                educa:name ?name;
                educa:lastname ?lastname;
                educa:age ?age;
                educa:level ?level;
                educa:classe ?classe;
                educa:createdBy ?createdBy.
        }
        
    `;
    const response = await axios.post(endpoint, sparqlQuery, {
      headers: {
        "Content-Type": "application/sparql-update",
      },
    });
    return response.data;
  },
  async GetAllStudents(createdBy) {
    const sparqlQuery = `
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX educa: <http://www.semanticweb.org/gueddes/ontologies/2015/e-Saad-Educa#>
PREFIX student: <http://www.semanticweb.org/gueddes/ontologies/2015/e-Saad-Educa/student/>
PREFIX salle: <http://www.semanticweb.org/gueddes/ontologies/2015/e-Saad-Educa/salle/>

SELECT ?student ?cin ?name ?lastname ?age ?level ?libelle_salle ?classe ?createdBy
WHERE {
    ?student educa:classe ?classe ;
            educa:cin ?cin ;
            educa:name ?name ;
            educa:lastname ?lastname ;
            educa:age ?age ;
            educa:createdBy "${createdBy}";
            educa:level ?level .
    ?salle educa:id_salle ?classe ;
           educa:libelle_salle ?libelle_salle .
}

    `;
    try {
      const response = await axios.get(fetchEndpoint, {
        params: { query: sparqlQuery },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  async GetaSingleStudent(cin) {
    const sparqlQuery = `
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX educa: <http://www.semanticweb.org/gueddes/ontologies/2015/e-Saad-Educa#>
PREFIX student: <http://www.semanticweb.org/gueddes/ontologies/2015/e-Saad-Educa/student/>
PREFIX salle: <http://www.semanticweb.org/gueddes/ontologies/2015/e-Saad-Educa/salle/>

SELECT ?student ?cin ?name ?lastname ?age ?level ?libelle_salle ?classe ?createdBy ?cin
WHERE {
    ?student educa:classe ?classe ;
            educa:cin "${cin}" ;
            educa:cin ?cin;
            educa:name ?name ;
            educa:lastname ?lastname ;
            educa:age ?age ;
            educa:createdBy ?createdBy;
            educa:level ?level .
    ?salle educa:id_salle ?classe ;
           educa:libelle_salle ?libelle_salle .
}

    `;
    try {
      const response = await axios.get(fetchEndpoint, {
        params: { query: sparqlQuery },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  async updateStudent(name, lastname, age, level, classe,cin) {
    try {
      const sparqlQuery = `
      PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
      PREFIX educa: <http://www.semanticweb.org/gueddes/ontologies/2015/e-Saad-Educa#>
PREFIX student: <http://www.semanticweb.org/gueddes/ontologies/2015/e-Saad-Educa/student/>
PREFIX salle: <http://www.semanticweb.org/gueddes/ontologies/2015/e-Saad-Educa/salle/>
DELETE {
?student educa:name ?oldname ;
      educa:lastname ?oldlastname ;
      educa:age ?oldage ;
      educa:level ?oldlevel ;
      educa:classe ?oldclasse .
      
}
INSERT {
?student educa:name "${name}" ;
         educa:lastname "${lastname}" ;
         educa:age "${age}" ;
         educa:level "${level}" ;
         educa:classe "${classe}" .
}
WHERE {
?student educa:cin "${cin}" 
OPTIONAL { ?student educa:name ?oldname . }
OPTIONAL { ?student educa:lastname ?oldlastname . }
OPTIONAL { ?student educa:age ?oldage . }
OPTIONAL { ?student educa:level ?oldlevel . }
OPTIONAL { ?student educa:classe ?oldclasse . }
}`;
      const response = await axios.post(endpoint, null, {
        params: { update: sparqlQuery },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};
