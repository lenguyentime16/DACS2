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

module.exports = {
    getTopTeacherHome: getTopTeacherHome
}