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

module.exports = {
    createClassroom: createClassroom,
}