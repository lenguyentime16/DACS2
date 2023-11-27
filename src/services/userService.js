import { promiseImpl } from 'ejs';
import db from '../models/index';
import bcrypt from "bcrypt";

const salt = bcrypt.genSaltSync(10);

let hashUserPassword = (password) => {
    return new Promise ( async(resolve,reject)=>{
        try {
            let hashPassWord = await bcrypt.hashSync(password, salt); 
            resolve(hashPassWord);
        } catch(e) {
            reject(e);
        }
    })
}
let handleUserLogin = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {};
            let isExist = await checkUserEmail(email);
            if (isExist) {
                //user already exist
                let user = await db.User.findOne({
                    attributes: ['email', 'roleId', 'password','firstName','lastName'],
                    where: { email: email },
                    raw: true,

                });
                console.log(user)
                if (user) {
                    // Cách 1: dùng asynchronous (bất đồng bộ)
                    let check = await bcrypt.compare(password, user.password);

                    console.log(check)
                    console.log( user.password)
                    console.log( password)
                    // Cách 2: dùng synchronous  (đồng bộ)
                    // let check = bcrypt.compareSync(password, user.password);

                    if (check) {
                        userData.errCode = 0;
                        userData.errMessage = 'OK';

                        delete user.password;
                        userData.user = user;
                    }
                    else {
                        userData.errCode = 3;
                        userData.errMessage = 'Wrong password';
                    }
                } else {
                    userData.errCode = 2;
                    userData.errMessage = `User not found`;
                }

            } else {
                //return error
                userData.errCode = 1;
                userData.errMessage = `Your's Email isn't exist in our system, plz try other email`
            }
            resolve(userData)
        } catch (e) {
            reject(e);
        }
    })
}

let checkUserEmail = (userEmail) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { email: userEmail }
            })
            if (user) {
                resolve(true)
            } else {
                resolve(false)
            }

        } catch (e) {
            reject(e)
        }
    })
}

let getAllUsers = (userId) => {
    return new Promise( async (resolve, reject) => {
        try {
            let users = '';
            if (userId === 'ALL' ) {
                users = await db.User.findAll({
                    attributes: {
                        exclude: ['password']
                    }
                })
            } if(userId && userId !== 'ALL') {
                users = await db.User.findOne({
                    where: {id: userId},
                    attributes: {
                        exclude: ['password']
                    }
                })
                
            }
            
            resolve(users);
        } catch (e) {
            reject(e)
        }
    })
}

let createNewUser = (data) => {
    return new Promise( async (resolve, reject) => {
      try {
        //check email is exist
        let check = await checkUserEmail(data.email)
        if(check === true){
            resolve({
                errCode: 1,
                errMessage:'You email is already in used, pls try another email'
            })
        }
       else {
        let hashPassWordFromBcrypt = await hashUserPassword(data.password)
        await db.User.create({
            email: data.email,
            password: hashPassWordFromBcrypt,
            firstName: data.firstName,
            lastName: data.lastName,
            address: data.address,
            phonenumber: data.phoneNumber,
            gender: data.gender,
            roleId: data.roleId,
            positionId: data.positionId,

        })
        resolve({
            errCode: 0,
            message: 'OK'
        })
       }

        
      } catch(e) {
        reject(e)
      } 
    })
}

let deleteUser = (userId) => {
    return new Promise (async (resolve, reject) => {
            let foundUser = await db.User.findOne({
                where: {id: userId}
            })
            if (!foundUser) {
                resolve({
                    errCode: 2,
                    errMessage: `The user isn't exist`                
                })
            }
            await db.User.destroy({
                where: {id: userId}
            })

            resolve({
                errCode: 0,
                errMessage: `The user is deleted`
            })
    })
}

let updateUserData = (data) => {
    return new Promise (async (resolve, reject) => {
        try {
            if(!data.id) {
                resolve({
                    errCode: 2,
                    errMessage: 'Missing required parameters'
                })
            }
            let user = await db.User.findOne({
                where: { id: data.id },
                raw: false
            })
          
            if(user) {
                user.firstName= data.firstName;
                user.lastName= data.lastName;
                user.address= data.address;
            
                await user.save();
                resolve({
                    errCode: 0,
                    errMessage: 'Update user success'
                }); 
            } 
            else {
                resolve({
                    errCode: 1,
                    errMessage: `User's not found!`
                })
            }
            
        } catch (e) {
            reject(e)
        }
    })
}

let getAllCodeService = (typeInput) =>{
    return new Promise( async (resolve, reject) => {
        try {  
            if(!typeInput){
                resolve({
                    errCode : 1,
                    errMessage: 'Missing required parameters !'
                })
            }else{
                let res = {};
                let allcode = await db.Allcode.findAll({
                    where: { type: typeInput}
                });
                res.errCode =0;
                res.data = allcode;
                resolve(res);  
            }
            
        } catch (e) {
            reject(e);
        }
    })
}
module.exports = {
    handleUserLogin: handleUserLogin,
    getAllUsers: getAllUsers,
    createNewUser: createNewUser,
    deleteUser:deleteUser,
    updateUserData:updateUserData,
    getAllCodeService:getAllCodeService,
}