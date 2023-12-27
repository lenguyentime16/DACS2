import db from '../models/index';
require('dotenv').config();
import emailService from './emailService';

let postBookAppointment = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.email || !data.teacherId || !data.timeType || !data.date ||
                !data.fullName) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing parameter'

                })
            } else {
                await emailService.sendSimpleEmail({
                    receiverEmail: data.email,
                    userName: data.fullName,
                    time: data.timeString,
                    teacherName: data.teacherName,
                    language: data.language,
                    redirectLink:'http://localhost:3000/detail-teacher/20'
                });
                
                //upsert student
                let user = await db.User.findOrCreate({
                    where: { email: data.email },
                    defaults: {
                        email: data.email,
                        roleId: 'R3'
                    },
                });
                //create a booking record
                if (user && user[0]) {

                    await db.Booking.findOrCreate({
                        where: { studentId: user[0].id },
                        defaults: {
                            statusId: 'S1',
                            teacherId: data.teacherId,
                            studentId: user[0].id,
                            date: data.date,
                            timeType: data.timeType,
                        }
                    })
                }
                resolve({
                    errCode: 0,
                    errMessage: 'Save infor student succed!'
                })
            }

        } catch (e) {
            reject(e);
        }
    })
}

module.exports = {
    postBookAppointment: postBookAppointment
}