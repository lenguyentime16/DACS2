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

let getDetailTeacherById = async (req,res) => {
    try {
        let infor = await teacherService.getDetailTeacherById(req.query.id);
        return res.status(200).json(
            infor
        )
    } catch(e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}

let bulkCreateSchedule = async (req,res) => {
    try {
        let infor = await teacherService.bulkCreateSchedule(req.body);
        return res.status(200).json({
            infor
        })
    } catch(e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}

let getScheduleByDate = async (req, res) => {
    try {
        let infor = await teacherService.getScheduleByDate(req.query.teacherId, req.query.date)
        return res.status(200).json(
            infor
        )
    } catch(e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}

let getExtraInforTeacherById = async (req, res) => {
    try {
        let infor = await teacherService.getExtraInforTeacherById(req.query.teacherId)
        return res.status(200).json(
            infor
        )
    } catch(e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}

let getProfileTeacherById = async (req, res) => {
    try {
        let infor = await teacherService.getProfileTeacherById(req.query.teacherId)
        return res.status(200).json(
            infor
        )
    } catch(e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}

let getListStudentForTeacher = async (req, res) => {
    try {
        let infor = await teacherService.getListStudentForTeacher(req.query.teacherId, req.query.date)
        return res.status(200).json(
            infor
        )
    } catch(e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}

module.exports = {
    getTopTeacherHome:getTopTeacherHome,
    getAllTeachers:getAllTeachers,
    postInforTeachers:postInforTeachers,
    getDetailTeacherById:getDetailTeacherById,
    bulkCreateSchedule:bulkCreateSchedule,
    getScheduleByDate:getScheduleByDate,
    getExtraInforTeacherById:getExtraInforTeacherById,
    getProfileTeacherById:getProfileTeacherById,
    getListStudentForTeacher:getListStudentForTeacher
}