import db from '../models/index';
require('dotenv').config();
import _ from 'lodash';

const MAX_NUMBER_SCHEDULE = process.env.MAX_NUMBER_SCHEDULE;

let getTopTeacherHome = (limitInput) => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = await db.User.findAll({
                limit: limitInput,
                where: { roleId: 'R2' },
                order: [['createdAt', 'DESC']],
                attribute: {
                    exclude: ['password']
                },
                include: [
                    { model: db.Allcode, as: 'positionData', attribute: ['valueEn', 'valueVi'] },
                    { model: db.Allcode, as: 'genderData', attribute: ['valueEn', 'valueVi'] }
                ],
                raw: true,
                nest: true
            })

            resolve({
                errCode: 0,
                data: users

            })
        } catch (e) {
            reject(e)
        }
    })
}


let getAllTeachers = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let teachers = await db.User.findAll({
                where: { roleId: 'R2' },
                attributes: {
                    exclude: ['password', 'image']
                }
            })

            resolve({
                errCode: 0,
                data: teachers
            })
        } catch (e) {
            reject(e)
        }
    })
}

let saveDetailInforTeacher = (inputData) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!inputData.teacherId || !inputData.contentHTML || !inputData.contentMarkdown || !inputData.action) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing parameter'
                })
            } else {
                if (inputData.action === 'CREATE') {
                    await db.Markdown.create({
                        contentHTML: inputData.contentHTML,
                        contentMarkdown: inputData.contentMarkdown,
                        description: inputData.description,
                        teacherId: inputData.teacherId

                    })
                } else if (inputData.action === 'EDIT') {
                    let teacherMarkdown = await db.Markdown.findOne({
                        where: { teacherId: inputData.teacherId },
                        raw: false,
                    })
                    if (teacherMarkdown) {
                        teacherMarkdown.contentHTML = inputData.contentHTML;
                        teacherMarkdown.contentMarkdown = inputData.contentMarkdown;
                        teacherMarkdown.description = inputData.description;
                        await teacherMarkdown.save();
                    }
                }


                resolve({
                    errCode: 0,
                    errMessage: 'Save infor teacher succeed!'
                })
            }
        } catch (e) {
            reject(e);
        }
    })
}

let getDetailTeacherById = (inputId) => {
    return new Promise(async (resolve, reject) => {
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
                        exclude: ['password']
                    },
                    include: [
                        {
                            model: db.Markdown,
                            attributes: ['description', 'contentHTML', 'contentMarkdown']
                        },

                        { model: db.Allcode, as: 'positionData', attributes: ['valueEn', 'valueVi'] },
                    ],
                    raw: false,
                    nest: true
                })

                if (data && data.image) {
                    data.image = new Buffer(data.image, 'base64').toString('binary');
                }

                if (!data) data = {}

                resolve({
                    errCode: 0,
                    data: data

                })
            }
        } catch (e) {
            reject(e)
        }
    })
}

let bulkCreateSchedule = (data) => {
    return new Promise( async (resolve, reject) => {
        try {
            if (!data.arrSchedule || !data.teacherId || !data.formatedDate) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameter !'
                })
            } else {
                let schedule = data.arrSchedule
                if(schedule && schedule.length >0) {

                    schedule = schedule.map(item => {
                        item.maxNumber = MAX_NUMBER_SCHEDULE;
                        return item;
                    })
                }

                let existing = await db.Schedule.findAll({
                    where: {teacherId: data.teacherId, date: data.formatedDate},
                    attributes: ['timeType', 'date', 'teacherId', 'maxNumber'],
                    raw: true
                });

                if (existing && existing.length >0 ) {
                    existing = existing.map(item => {
                        item.date = new Date(item.date).getTime();
                        return item;    
                    })
                }

                let toCreate = _.differenceWith(schedule, existing, (a , b) => {
                    return a.timeType === b.timeType && a.date === b.date;
                });

                if (toCreate && toCreate.length > 0) {
                    await db.Schedule.bulkCreate(schedule)
                }
               
                resolve({
                    errCode: 0,
                    errMessage: 'OK'
                });
            }
        } catch(e) {
            reject(e);
        }
    })
}

let getScheduleByDate = (teacherId, date) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!teacherId || !date) {
                resolve({
                    errCode: -1,
                    errMessage: 'Missing required parameters'
                })
            } else {
                let dataSchedule = await db.Schedule.findAll({
                    where: {
                        teacherId : teacherId,
                        date: date
                    }
                })

                if (!dataSchedule) dataSchedule = []

                resolve({
                    errCode: 0,
                    dataSchedule: dataSchedule
                })
            }


        } catch(e) {
            reject(e)
        }
    })
}
module.exports = {
    getTopTeacherHome: getTopTeacherHome,
    getAllTeachers: getAllTeachers,
    saveDetailInforTeacher: saveDetailInforTeacher,
    getDetailTeacherById: getDetailTeacherById,
    bulkCreateSchedule:bulkCreateSchedule,
    getScheduleByDate:getScheduleByDate

}