import db from '../models/index';

let getTopTeacherHome = (limitInput) => {
    return new Promise( async (resolve,reject) => {
        try {
            let users = await db.User.findAll({
                limit: limitInput,
                where: {roleId :'R2'},
                order: [['createdAt','DESC']], 
                attribute: {
                    exclude: ['password']
                },
                include: [
                    {model: db.Allcode, as: 'positionData', attribute: ['valueEn','valueVi']},
                    {model: db.Allcode, as: 'genderData', attribute: ['valueEn','valueVi']}
                ],
                raw: true,
                nest: true
            })

            resolve({
                errCode: 0,
                data: users

            })
        } catch(e) {
            reject(e)
        }
    })
}


let getAllTeachers = () => {
    return new Promise( async (resolve,reject) => {
        try {
            let teachers = await db.User.findAll({
                where: {roleId: 'R2'},
                attributes: {
                    exclude: ['password','image']
                }
            })

            resolve({
                errCode:0,
                data: teachers
            })
        } catch(e) {
            reject(e)
        }
    })
}

let saveDetailInforTeacher = (inputData) => {
    return new Promise(async (resolve,reject) => {
        try {
            if(!inputData.teacherId || !inputData.contentHTML || !inputData.contentMarkdown) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing parameter'
                })
            } else {
                await db.Markdown.create({
                    contentHTML: inputData.contentHTML,
                    contentMarkdown:inputData.contentMarkdown,
                    description: inputData.description,
                    teacherId:inputData.teacherId

                })

                resolve({
                    errCode: 0,
                    errMessage: 'Save infor teacher succeed!'
                })
            }
        } catch(e) {
            reject(e);
        }
    })
}

let getDetailTeacherById = (inputId) => {
    return new Promise( async (resolve,reject) => {
            try {
                if (!inputId) {
                    resolve({
                        errCode: 1,
                        errMessage: 'Missing required parameter!'
                    })
                } else {

                    let data = await db.User.findOne({
                        where: {
                            id: inputId
                        },
                        attributes: {
                            exclude: ['password', 'image']
                        },
                        include: [
                            {
                                model: db.Markdown,
                                attributes: ['description', 'contentHTML', 'contentMarkdown']
                            },

                            {model: db.Allcode, as: 'positionData', attributes: ['valueEn', 'valueVi']},
                        ],
                        raw: true,
                        nest: true
                    })

                    resolve ({
                        errCode: 0,
                        data: data

                    })
                }
            } catch(e) {
                reject(e)
            }
    })
}
module.exports = {
    getTopTeacherHome: getTopTeacherHome,
    getAllTeachers:getAllTeachers,
    saveDetailInforTeacher:saveDetailInforTeacher,
    getDetailTeacherById:getDetailTeacherById

}