import db from '../models/index'
import bcrypt from 'bcryptjs';


const salt = bcrypt.genSaltSync(10);

let createNewUser = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPasswordFromCrypt = await hashUserPassword(data.password);
            await db.User.create({
            email: data.email,
            password: hashPasswordFromCrypt,
            firstName: data.firstName,
            lastName: data.lastName,
            address: data.address,
            phonenumber: data.phonenumber,
            gender: data.gender === '1' ? true : false,
            roleId: data.roleId,
            })

            resolve('Oke')
        } 
        catch (e) {
            reject(e);
        }
    })
 
}

let hashUserPassword = (password) => {
    return new Promise( async (resolve, reject) => {
        try {
            var hashPassword = await bcrypt.hashSync("B4c0/\/", salt);
            resolve(hashPassword);
        }
        catch (e) {
            reject(e);
        }

    })
}

module.exports = {
    createNewUser: createNewUser
}