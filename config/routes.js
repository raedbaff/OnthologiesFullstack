/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` your home page.            *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  '/': { view: 'register' },
  'GET /sparql/query/:createdBy': 'SparqlController.query',
  'POST /sparql/update': 'SparqlController.insert',
  'GET /sparql/query/one/:pcModel': 'SparqlController.getOneProduct',
  //USER
  'POST /sparql/user/register' : 'UserController.register',
  'GET /sparql/users/all': 'UserController.GetAllUsers',
  'POST /sparql/user/login': 'UserController.login',
  'GET /UserProfile/:id': 'UserController.UserProfile',
  'GET /UserProfile2/:id': 'UserController.UserProfileV2',
  'POST /updateUserAdresse/:id':'UserController.UpdateUserAdresse',
  'GET /myProfile':{view:'UserProfile'},
  
  //END USER
  'POST /sparql/delete/:id': 'SparqlController.deleteOne',
  'POST /employee/add': 'EmployeeController.insert',
  'GET /employee/all/:createdBy': 'EmployeeController.getEmployees',
  'post /register': 'UserController.register',
  'post /register2':'UserController.register2',
  'post /login' : 'UserController.login',
  'post /save':'SparqlController.insert',
  'post /saveEmployee':'EmployeeController.insert',
  'post /updatedEmployee/:id':'EmployeeController.updateEmployee',
  'post /saveSalle':'SalleController.create',
  'post /saveSalle2':'SalleController.create2',
  'GET /salle/:id':'SalleController.getSalleById',
  'POST /salle/delete/:id': 'SalleController.deleteSalle',
  'GET /salle/user/:createdBy':'SalleController.sallebyUser',
  'POST /salle/edit/:id':"SalleController.updateSalle",
  'GET /employee/one/:id':'EmployeeController.getEmployee',
  'GET /register': { view: 'register' },
  'GET /login':{view: 'login'},
  'GET /home':{view:'home'},
  'GET /pc': {view: 'pc'},
  'GET /addPc': {view: 'addPc'},
  'GET /pcDetails': {view: 'pcDetails'},
  'GET /cards':{view:'cards'},
  'GET /addEmployee':{view:'addEmployee'},
  'GET /employeeList':{view:'EmployeeList'},
  'GET /employee/:id':{view:'updateEmployee'},
  'GET /salle/list':{view: 'SalleList'},
  'GET /sallee/add':{view:'addSalle'},
  // STUDENT ROUTES
  'POST /saveStudent': 'StudentController.CreateStudent',
  'POST /saveStudent2': 'StudentController.CreateStudent2',
  'GET /students/:classe':'StudentController.getstudentsClasse',
  'GET /students2/:classe':'StudentController.getstudentsClasse2',
  'POST /checkcin': 'StudentController.CheckCin',
  'POST /deleteStudent/:cin':'StudentController.DeleteaStudent',
  'GET /getAllStudents/:createdBy':'StudentController.GetAllStudents',
  'GET /getAllStudents2/:createdBy':'StudentController.GetAllStudents2',
  'GET /getsinglestudent/:cin':'StudentController.GetAStudent',
  'POST /updateStudent/:cin':'StudentController.updateStudent',
  'GET /studentList': {view:'StudentList'},
  'GET /studentList2': {view:'StudentList2'},
  //PDF CONVERT
  '/generate-pdf': 'PdfController.generatePdf',

  'GET /addStudent':{view:'addStudent'},
  'GET /allStudents':{view:'AllStudentList'},
  //TEACHER ROUTES
  'POST /teacher/create': 'TeacherController.createTeacher',
  //Salle Routes
  'GET /salle/user2/:createdBy':'SalleController.sallebyUser2',

  //CONFIRM ACCOUNT
  'GET /confirm/:token': 'ConfirmationController.confirm',
  //send mail
  'POST /send':'TestController.sendMail',
  //CALENDAR
  'GET /myCalendar': {view:'Calendar'},
  'GET /testCalendar':{view:'TestCalendar'},
  'GET /iso':{view:'isolated'},
  //COURSES
  'POST /SaveCourse':'CoursesController.CreateCourse',
  'GET /courses/:classe':'CoursesController.GetCoursesByClasse',
  //upload image
  'POST /uploadImage/:user': 'UploadImageController.uploadImage',
  'POST /uploadpdf':'UploadImageController.uploadPDF',
  'GET /images/:filename/:ext': 'UploadImageController.getImage',

  //badge
  'GET /badge':{view:"Badge"},

  //ADRESSE ROUTES
  'POST /addAdresse/:id':'AdresseController.SaveUserAdresse',
  'GET /userAdresses/:id':'AdresseController.UserAdresses',
  'POST /deleteAdresse/:id':'AdresseController.DeleteTheAdresse',

  //GOOGLE MAP
  'GET /googlemap':{view:"googleMap"},
  //CHATS
  'GET /chat':{view:"Chats"},
  'POST /sendMessage/:senderId/:ReceiverId':"ChatController.CreateMessage",
  'Get /messages/:senderId/:ReceiverId':"ChatController.GetMessagesBetweenUsers",
  //socket
  'GET /serverMessage': 'SocketController.getServerMessage',
  'GET /broadcast-greeting': 'SocketController.broadcastGreeting',
  'POST /sendMessage': 'SocketController.sendMessage',
  'GET /socketTest':{view :"SocketTest"}

  




  /***************************************************************************
  *                                                                          *
  * More custom routes here...                                               *
  * (See https://sailsjs.com/config/routes for examples.)                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the routes in this file, it   *
  * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
  * not match any of those, it is matched against static assets.             *
  *                                                                          *
  ***************************************************************************/


};
