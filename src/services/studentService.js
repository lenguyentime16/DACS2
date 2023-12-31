import db from '../models/index';
require('dotenv').config();
import emailService from './emailService';
import { v4 as uuidv4 } from 'uuid';

let buildUrlEmail = (teacherId, token) => {
    let result = `${process.env.URL_REACT}/verify-booking?token=${token}&teacherId=${teacherId}`
    return result;
}

let postBookAppointment = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.email || !data.teacherId || !data.timeType || !data.date ||
                !data.fullName || !data.selectedGender || !data.address) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing parameter'

                })
            } else {
                let token = uuidv4();

                await emailService.sendSimpleEmail({
                    receiverEmail: data.email,
                    userName: data.fullName,
                    time: data.timeString,
                    teacherName: data.teacherName,
                    language: data.language,
                    redirectLink: buildUrlEmail(data.teacherId, token)
                });

                //upsert student
                let user = await db.User.findOrCreate({
                    where: { email: data.email },
                    defaults: {
                        email: data.email,
                        roleId: 'R3',
                        gender: data.selectedGender,
                        address: data.address,
                        firstName: data.fullName
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
                            token: token
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

let postVerifyBookAppointment = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.token || !data.teacherId) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing parameter'

                })
            } else {
                let appointment = await db.Booking.findOne({
                    where: {
                        teacherId: data.teacherId,
                        token: data.token,
                        statusId: 'S1'
                    },
                    raw: false
                })
                if (appointment) {
                    appointment.statusId = 'S2';
                    await appointment.save()
                    resolve({
                        errCode: 0,
                        errMessage: 'Update the appointment succeed!'
                    })
                } else {
                    resolve({
                        errCode: 2,
                        errMessage: 'Appointment has been activated or does not exist'
                    })
                }

            }
        } catch (e) {
            reject(e);
        }
    })
}

module.exports = {
    postBookAppointment: postBookAppointment,
    postVerifyBookAppointment: postVerifyBookAppointment
}