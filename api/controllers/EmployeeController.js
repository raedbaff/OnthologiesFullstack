const EmployeService=require("../services/EmployeService")
module.exports={
    async insert(req,res){
        try {
            const {Name,Position,Office,Age,StartDate,Salary,createdBy}=req.body
            await EmployeService.insert(Name,Position,Office,Age,StartDate,Salary,createdBy)
            return res.view("addEmployee",{message:"added successfully"})

        }
        catch(error){
            return res.serverError(error);
        }
    },
    async getEmployees(req,res){
        try {
            const {createdBy}=req.params
            const response=await EmployeService.getall(createdBy)
            req.session.employee=response.results.bindings
            return res.redirect("/employeeList")

        }
        catch(error){
            res.serverError(error)
        }
    },
    async updateEmployee(req,res){
        const {Name,Position,Office,Age,StartDate,Salary}=req.body
        const {id}=req.params
        try {
            await EmployeService.updateEmployee(Name,Position,Office,Age,StartDate,Salary,id)
            return res.redirect(`/employee/all/${req.session.result.username}`)

        }
        catch(error){

        }
    },
    async getEmployee(req,res){
        try {
            const {id}=req.params
            const response=await EmployeService.GetEmployee(id)
            req.session.OneEmployee=response.results.bindings
            return res.redirect(`/employee/${id}`)


        }
        catch(error){
            return res.serverError(error)
        }
    }

}