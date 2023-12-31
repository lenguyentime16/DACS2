const db = require("../models")

let createClassroom = (data) => {
    return new Promise(async (resolve, reject) => {

        try {
            if (!data.name || !data.address ||
                !data.imageBase64 ||
                !data.descriptionHTML ||
                !data.descriptionMarkdown
            ) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing Parameter'
                })
            } else {
                await db.Classroom.create({
                    name: data.name,
                    address: data.address,
                    image: data.imageBase64,
                    descriptionHTML: data.descriptionHTML,
                    descriptionMarkdown: data.descriptionMarkdown
                })

                resolve({
                    errCode: 0,
                    errMessage: 'OK'
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}

let getAllClassroom = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.Classroom.findAll({


            });
            if (data && data.length > 0) {
                data.map(item => {
                    item.image = new Buffer(item.image, 'base64').toString('binary');
                    return item;
                })
            }
            resolve({
                errMessage: 'ok',
                errCode: 0,
                data
            })
        } catch (e) {
            reject(e);
        }
    })
}

let getDetailClassroomById = (inputId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!inputId) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing Parameter'
                })
            } else {
                let data = await db.Classroom.findOne({
                    where: {
                        id: inputId
                    },
                    raw: true,
                    attributes: ['name','address','descriptionHTML', 'descriptionMarkdown'],
                })

                if (data) {
                    let teacherClassroom = {};
                    teacherClassroom = await db.Teacher_Infor.findAll({
                        where: { classroomId: inputId },
                        attributes: ['teacherId', 'provinceId'],
                    })

                    data.teacherClassroom = teacherClassroom;


                } else data = {};

                resolve({
                    errMessage: 'OK',
                    errCode: 0,
                    data: data
                })
            }
        } catch (e) {

            reject(e);
        }
    })
}

module.exports = {
    createClassroom: createClassroom,
    getAllClassroom: getAllClassroom,
    getDetailClassroomById: getDetailClassroomById,
}