const SalleService = require("../services/SalleService")
const StudentService=require("../services/StudentService")
const http = require('http');
const socketIO = require('socket.io');
module.exports={
    async CreateStudent(req,res){
        const {name,lastname,age,level,classe,createdBy}=req.body
        try {
            await StudentService.createStudent(name,lastname,age,level,classe,createdBy)
            return res.view('addStudent', {message:"added student successfully"})
        }
        catch(error){
            res.status(500).json(error)
        }
    },
    async CreateStudent2(req, res) {
        const { cin, name, lastname, age, level, classe, createdBy } = req.body;
        try {
          const exists = await StudentService.cinExists(cin);
          if (exists.boolean) {
            return res.status(200).json({ message: "this cin already exists" });
          } else {
            await StudentService.createStudent(cin, name, lastname, age, level, classe, createdBy);
            const createdStudent={
                cin,
                name,
                lastname,
                age,
                level,
                classe,
                createdBy
            }
            
            // req.io.emit('studentAdded', createdStudent);
            return res.status(200).json({ message: "added student successfully",createdStudent });
          }
        } catch (error) {
          return res.status(500).json({ error: "Failed to create student" });
        }
      },
      
    async getstudentsClasse(req,res){
        const {classe}=req.params
        try {
            const response=await StudentService.StudentByClass(classe)
            return res.view('StudentList',{students:response.results.bindings})

        }
        catch(error){
            res.status(500).json(error)
        }

    },
    async getstudentsClasse2(req,res){
        const {classe}=req.params
        try {
            const response=await StudentService.StudentByClass(classe)
            return res.status(200).json({students:response.results.bindings})

        }
        catch(error){
            res.status(500).json(error)
        }

    },
    async GetAllStudents(req,res){
        const {createdBy}=req.params
        const response2=await SalleService.getSalleByUser(createdBy)
        req.session.salles=response2.results.bindings
        const response=await StudentService.GetAllStudents(createdBy)
        return res.view('AllStudentList',{students:response.results.bindings})


    },
    async GetAllStudents2(req,res){
        const {createdBy}=req.params
        const response2=await SalleService.getSalleByUser(createdBy)
        req.session.salles=response2.results.bindings
        const response=await StudentService.GetAllStudents(createdBy)
        return res.status(200).json({students:response.results.bindings});


    },
    async CheckCin(req,res){
        const {cin}=req.body;
        try {
            const response= await StudentService.cinExists(cin)
            res.status(200).json(response.boolean)

        }
        catch(error){
            res.status(500).json(error)

        }
    },
    async DeleteaStudent(req,res){
        const {cin}=req.params
        const {classe}=req.params
        try {
            await StudentService.DeleteStudent(cin)
            return res.status(200).json({ message: 'Student deleted successfully' });

        }
        catch(error){
            res.status(500).json({error:error.message})
        }
    },
    async GetAStudent(req,res){
        const {cin}=req.params
        try {
            const student=await StudentService.GetaSingleStudent(cin)
            return res.status(200).json({Student:student.results.bindings})

        }
        catch(error) {
            res.status(500).json({message:"something went wrong while fetching student"})
        }
    },
    async updateStudent(req,res){
        const {name, lastname, age, level, classe}=req.body
        const {cin}=req.params
        try {
            await StudentService.updateStudent(name,lastname,age,level,classe,cin)
            return res.status(200).json({message:"successfully updated student"})

        }
        catch(error){
            return res.status(500).json({message:"something went wrong while updating the student, please try again later"})

        }
    }
}