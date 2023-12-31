import classroomService from "../services/classroomService"

let createClassroom = async (req, res) => {
    try {
        let infor = await classroomService.createClassroom(req.body)
        return res.status(200).json(
            infor
        )
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}

let getAllClassroom = async (req, res) => {
    try {
        let infor = await classroomService.getAllClassroom()
        return res.status(200).json(
            infor
        )
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}

let getDetailClassroomById = async (req, res) => {
    try {
        let infor = await classroomService.getDetailClassroomById(req.query.id)
        return res.status(200).json(
            infor
        )
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}

module.exports = {
    createClassroom: createClassroom,
    getAllClassroom: getAllClassroom,
    getDetailClassroomById: getDetailClassroomById,
}