import teacherService from "../services/teacherService"

let getTopTeacherHome = async (req,res) => {
    let limit = req.query.limit;
    if(!limit) limit = 10;
    try {
        let response = await teacherService.getTopTeacherHome(+limit);
        return res.status(200).json(response);  
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            message: 'Error from server...'
        })
    }
}

let getAllTeachers =async (req,res) => {
    try {
        let teachers =await teacherService.getAllTeachers();
        return res.status(200).json(teachers)
    } catch(e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }
}

let postInforTeachers = async (req,res) => {
    try {
        console.log("res body: ",req.body)
        let response = await teacherService.saveDetailInforTeacher(req.body)
        return res.status(200).json(response);
    } catch(e) {
        console.log(e) 
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }
}

module.exports = {
    getTopTeacherHome:getTopTeacherHome,
    getAllTeachers:getAllTeachers,
    postInforTeachers:postInforTeachers
}