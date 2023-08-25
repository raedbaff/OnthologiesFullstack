const { default: axios } = require("axios");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const { google } = require("google-auth-library");
dotenv.config();
const nodemailer = require("nodemailer");

const uuidv4 = require("uuid").v4;

module.exports = {
  // async sendMail(email,confirmationToken) {
  //     console.log("sending mail now ...")
  //       // Replace these with your actual Mailtrap credentials
  //       const SMTP_HOST = "sandbox.smtp.mailtrap.io";
  //       const SMTP_PORT = 587;
  //       const SMTP_USERNAME = "f2bfa53293821e";
  //       const SMTP_PASSWORD = "8f1f274808ed1b";

  //       const transporter = nodemailer.createTransport({
  //         host: SMTP_HOST,
  //         port: SMTP_PORT,
  //         auth: {
  //           user: SMTP_USERNAME,
  //           pass: SMTP_PASSWORD,
  //         },
  //       });
  //       const confirmationLink = `http://localhost:1337/confirm/${confirmationToken}`;
  //       const mailOptions = {
  //         from: "raedbaffoun90@gmail.com",
  //         to: email, //
  //         subject: "Hello World",
  //         html: `Click the following link to confirm your account: <a href="${confirmationLink}">Confirm account</a>`,
  //       };

  //       transporter.sendMail(mailOptions, (error, info) => {
  //         if (error) {
  //           console.log("Error sending email:", error);
  //         } else {
  //           console.log("Email sent:", info.response);
  //         }
  //       });
  //     },

  async register(username, email, password) {
    const sparqlEndpoint = "http://localhost:3030/my_dataset/update";
    try {
      const userId = uuidv4();
      const confirmationToken = uuidv4();
      const sparqlQuery = `
            PREFIX ex: <http://example.org/>
      
            INSERT DATA {
              ex:User${userId} ex:username "${username}";
              ex:email "${email}";
              ex:id "${userId}";
              ex:password "${password}";
              ex:confirmationToken "${confirmationToken}";
              ex:photo "avatarEmpty.jpg";
              ex:isConfirmed "false" .
              
              
            }
          `;
      const response = await axios.post(sparqlEndpoint, null, {
        params: {
          update: sparqlQuery,
        },
      });
      const confirmationLink = `http://localhost:1337/confirm/${confirmationToken}`;
      const transporter = nodemailer.createTransport({
        host: "smtp.elasticemail.com",
        port: 465, // Use the port provided by Elastic Email
        secure: true, // Set this to true if using port 465
        auth: {
          user: "raedbaffoun90@gmail.com",
          pass: "AEF27A90EB6C895A8AFDEA3F023239A57F9A",
        },
      });

      // Define the email data
      const mailOptions = {
        from: "YOUR_EMAIL",
        to: email,
        subject: "Account confirmation",
        html: `Click the following link to confirm your account: <a href="${confirmationLink}">Confirm account</a>`,
      };
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error("Error sending email:", error);
        } else {
          console.log("Email sent:", info.response);
        }
      });
      //   await sendConfirmEmail(email, confirmationToken);
      return true;
    } catch (error) {
      throw error;
    }
  },
  async GetAllUsers() {
    const sparqlEndpoint = "http://localhost:3030/my_dataset/query";
    try {
      const sparqlQuery = `
            PREFIX ex: <http://example.org/>

            SELECT ?user ?username ?email ?id ?photo
            WHERE {
              ?user ex:username ?username;
                    ex:email ?email;
                    ex:id ?id;
                    ex:photo ?photo.
                   
            }
            
            `;
      const res = await axios.get(sparqlEndpoint, {
        params: { query: sparqlQuery },
      });
      return res.data;
    } catch (error) {
      throw error;
    }
  },
  async login(email, password) {
    const sparqlEndpoint = "http://localhost:3030/my_dataset/query";

    try {
      const sparqlQuery = `
            PREFIX ex: <http://example.org/>

            SELECT ?user ?username ?email ?password ?isConfirmed ?id ?photo
            WHERE {
              ?user ex:email "${email}";
                    ex:id ?id;
                    ex:photo ?photo;
                    ex:password ?password;
                    ex:username ?username;
                    ex:email ?email;
                    ex:isConfirmed ?isConfirmed.
            }`;
      const response = await axios.post(
        sparqlEndpoint,
        sparqlQuery, // Just send the SPARQL query as the request body
        { headers: { "Content-Type": "application/sparql-query" } } // Set the correct Content-Type
      );
      const results = response.data.results.bindings;
      if (results.length > 0) {
        const savedpassword = results[0].password.value;
        const savedemail = results[0].email.value;
        const savedusername = results[0].username.value;
        const userId = results[0].id.value;
        const confirmed = results[0].isConfirmed.value;
        const photo=results[0].photo.value;

        if (savedpassword === password) {
          const token = jwt.sign(
            (user = {
              username: savedusername,
              email: savedemail,
            }),
            "BaffSecretKey",
            { expiresIn: "1h" }
          );
          return {
            "is Authenticated": true,
            AccessToken: token,
            username: savedusername,
            userId: userId,
            confirmed: confirmed,
            photo:photo
          };
        } else {
          return false;
        }
      }
    } catch (error) {
      throw error;
    }
  },
  async getUserProfile(id) {
    try {
      const sparqlEndpoint = "http://localhost:3030/my_dataset/query";
      const sparqlQuery2=`
      PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX educa: <http://www.semanticweb.org/gueddes/ontologies/2015/e-Saad-Educa#>
PREFIX ex: <http://example.org/>
PREFIX image: <http://www.semanticweb.org/gueddes/ontologies/2015/e-Saad-Educa/image/>

SELECT ?user ?username ?email ?password ?isConfirmed ?id ?image ?hasImage
WHERE {
    ?user ex:email ?email;
          ex:id "${id}";
          ex:id ?id;
          ex:password ?password;
          ex:username ?username;
          ex:email ?email;
          ex:isConfirmed ?isConfirmed.
    ?image educa:BelongsTo ?id ;
           educa:hasImage ?hasImage .
}`;
const sparqlQuery=`
PREFIX ex: <http://example.org/>

            SELECT ?user ?username ?email ?password ?isConfirmed ?id ?photo 
            WHERE {
              ?user ex:email ?email;
                    ex:id "${id}";
                    ex:photo ?photo;
                    ex:password ?password;
                    ex:username ?username;
                    ex:email ?email;
                    ex:isConfirmed ?isConfirmed.
                   
            }`;
     
      const response = await axios.get(sparqlEndpoint, {
        params: { query: sparqlQuery },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  async getUserProfileV2(id){
    const sparqlEndpoint = "http://localhost:3030/my_dataset/query";
    try {

      const sparqlQuery=`
      PREFIX ex: <http://example.org/>
PREFIX ad: <http://adresse.org/>

            SELECT ?user ?username ?email ?password ?isConfirmed ?id ?photo ?Street ?State ?City ?Country ?lon ?lat
            WHERE {
              ?user ex:email ?email;
                    ex:id "${id}";
                    ex:photo ?photo;
                    ex:password ?password;
                    ex:username ?username;
                    ex:email ?email;
                    ex:isConfirmed ?isConfirmed.
  ?adresse ad:user ?id;
           ad:Street ?Street;
           ad:State ?State;
           ad:City ?City;
           ad:Country ?Country;
           ad:lon ?lon;
           ad:lat ?lat.
  
                   
            }`
            const response = await axios.get(sparqlEndpoint, {
              params: { query: sparqlQuery },
            });
            return response.data;

    }
    catch(error){
      res.serverError(error)
    }
    
  },
  async updateUserAdresse(Street,City,State,Country,id){
    
      const sparqlQuery=`
      PREFIX ex: <http://example.org/>

DELETE {
  ?User ex:Street ?oldStreet ;
   ex:City ?oldCity;
   ex:State ?oldState;
   ex:Country ?oldCountry
}
INSERT {
  ?User ex:Street "${Street}" ;
  ex:City "${City}";
  ex:State "${State}";
  ex:Country "${Country}"
}
WHERE {
  ?User ex:id "${id}" 
  OPTIONAL { ?User ex:Street ?oldStreet . }
  OPTIONAL { ?User ex:City ?oldCity . }
  OPTIONAL { ?User ex:State ?oldState . }
  OPTIONAL { ?User ex:Country ?oldCountry . }    
}`;
try {
  const sparqlEndpoint = "http://localhost:3030/my_dataset/update";
   await axios.post(sparqlEndpoint, sparqlQuery, {
    headers: {
      "Content-Type": "application/sparql-update",
    },
  });

  
} catch (error) {
  return res.serverError("Failed to update adresse data.");
}


   
  }
};
