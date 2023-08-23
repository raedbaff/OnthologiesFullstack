const axios = require('axios');
const uuidv4 = require('uuid').v4;
const sparqlEndpoint = 'http://localhost:3030/my_dataset/update';
const sparqlEndpointQuery = 'http://localhost:3030/my_dataset/query';
module.exports={
    async insert(Name,Position,Office,Age,StartDate,Salary,createdBy){
        try {
            const id=uuidv4()
            const employeeId=uuidv4();
            const sparqlQuery = `
      PREFIX ex: <http://example.org/>

      INSERT DATA {
        ex:Employee${employeeId} ex:Name "${Name}";
          ex:id "${id}";
          ex:Position "${Position}";
          ex:Office "${Office}";
          ex:Age "${Age}";
          ex:StartDate "${StartDate}";
          ex:Salary "${Salary}";
          ex:createdBy "${createdBy}".
      }
    `;
    const response=await axios.post(sparqlEndpoint,null,
        {params:
            {update:sparqlQuery}
        })
        return response.data

        }
        catch(error){
            throw error;

        }

    },
    async getall(createdBy){
        try {
            const sparqlQuery=`
            PREFIX ex: <http://example.org/>
      SELECT ?Employee ?Name ?Position ?Office ?Age ?StartDate ?Salary ?id
      WHERE {
        ?Employee ex:createdBy "${createdBy}";
            ex:Name ?Name;
            ex:id ?id;
            ex:Position ?Position;
            ex:Office ?Office;
            ex:Age ?Age;
            ex:StartDate ?StartDate;
            ex:Salary ?Salary.
      }
            `;
            const response=await axios.get(sparqlEndpointQuery,{params:{query:sparqlQuery}},{headers:{ 'Content-Type': 'application/sparql-query' }})
            return response.data

        }
        catch(error){
            throw error;
        }

    },
    async updateEmployee(Name,Position,Office,Age,StartDate,Salary,id){
        try {
            const sparqlQuery=`
            PREFIX ex: <http://example.org/>
DELETE {
  ?Employee ex:Name ?oldName ;
            ex:Position ?oldPosition ;
            ex:Office ?oldOffice ;
            ex:Age ?oldAge ;
            ex:StartDate ?oldStartDate ;
            ex:Salary ?oldSalary .
}
INSERT {
  ?Employee ex:name "${Name}" ;
            ex:Position "${Position}" ;
            ex:Office "${Office}" ;
            ex:Age "${Age}" ; 
            ex:StartDate "${StartDate}" ; 
            ex:Salary "${Salary}" .
}
WHERE {
  ?Employee ex:id "${id}" 
  OPTIONAL { ?Employee ex:Name ?oldName . }
  OPTIONAL { ?Employee ex:Position ?oldPosition . }
  OPTIONAL { ?Employee ex:Office ?oldOffice . }
  OPTIONAL { ?Employee ex:Age ?oldAge . }
  OPTIONAL { ?Employee ex:StartDate ?oldStartDate . }
  OPTIONAL { ?Employee ex:Salary ?oldSalary . }
}`;
           const response=await axios.post(sparqlEndpoint,null,{params:
            {update:sparqlQuery}
        })
        return response.data

        }
        catch(error){
            throw error;
        }

    },
    async GetEmployee(id){
        try {
            const sparqlQuery=`
        PREFIX ex: <http://example.org/>
      SELECT ?Employee ?Name ?Position ?Office ?Age ?StartDate ?Salary ?id
      WHERE {
        ?Employee ex:id "${id}";
        ex:id ?id;
            ex:Name ?Name;
            ex:Position ?Position;
            ex:Office ?Office;
            ex:Age ?Age;
            ex:StartDate ?StartDate;
            ex:Salary ?Salary.
      }`
      const response=await axios.get(sparqlEndpointQuery,{params:{query:sparqlQuery}});
      return response.data

        }
        catch(error){
            throw error;
        }
        
    }
    

}