const userModel = require('../model/userModel')

const bcrypt = require('bcrypt')

exports.register = (userData, callback) => {
    try {
        userModel.create(userData, (err, result) => {
            if (err || result === undefined) {
                console.log("Service Error")
                return callback(err);
            }
            else {
                console.log("Service In ")
                return callback(null, result)
            }
        })
    }
    catch (err) {
        console.log("Catch Error In services ", err)
        return callback(err)
    }
}

// //registration using promises

// function encryptPassword(password, callback) {

//     bcrypt.hash(password, 10, (err, result) => {
//         if (err) {
//             return callback(err)
//         }
//         else {
//             return callback(null, result)
//         }
//     })
// }

// exports.register = (userData) => {
//     var initPromise = userModel.findUser(userData.email)
//     return new Promise((resolve, reject) => {
//         initPromise.then((data) => {
//             encryptPassword(userData.password, (err, encryptedPassword) => {
//                 if (err) {
//                     console.log(err);
//                     reject(err)
//                 }
//                 else {
//                     let userDetails = {
//                         "firstName": userData.firstName,
//                         "lastName": userData.lastName,
//                         "email": userData.email,
//                         "password": userData.password
//                     }
//                     var saveUserPromise = userModel.saveUserModel(userDetails)
//                     saveUserPromise.then((data) => {
//                         resolve({ "data": data })
//                     }).catch((err) => {
//                         reject({ "error": err })
//                     })
//                 }
//             })
//         }).catch((err) => {
//             reject({ "error": err })
//         })
//     })

// }



exports.login = (userData, callback) => {
    try {
        userModel.login(userData, (err, result) => {
            if (err || result === undefined) {
                console.log("Service Error")
                return callback(err)
            }
            else {
                console.log("Service In ", result)
                return callback(null, result)
            }
        })
    }
    catch (err) {
        console.log("Catch Error In services ", err)
        return callback(err)
    }
}



exports.verifyUser = (req, res) => {
    try {
        userModel.verifyUser(req, (err, result) => {
            if (err) {
                console.log("Service Error", err)
                res(err);
            }
            else {
                console.log("Service In ")
                res(null, result)
            }
        })
    }
    catch (err) {
        console.log("Catch Error In services ", err)
        res(err)
    }
}

//forget password service
exports.forgetPassword = (data, callback) => {

    console.log("data in forgetPassword service ", data)
    userModel.forgetPassword(data, (err, result) => {
        if (err) {
            callback(err)
        }
        else callback(null, result)
    })
}



//reset password service

exports.reset = (data, callback) => {

    userModel.reset(data, (err, result) => {
        if (err)
            callback(err)

        else callback(null, result)


    })
}
//--------------------------------------------------------------------------------------------

// /** 
//  * @description : forget purpose
//  */
// exports.forgetPassword=(data,callback)=>
// {
//     userModel.forgetPassword(data,(err,result)=>
//     {
//         try
//         {
//             if(err)
//             {
//                 callback(err);
//             }
//             else 
//             {
//                 callback(null,result)      
//             }
//         }
//         catch(err)
//         {
//             return callback(err);
//         }
//     })
// }

// /**
//  * @description : reset purpose
//  */
// exports.resetPassword=(req,callback)=>
// {
//     userModel.resetPassword(req,(err,result)=>
//     {
//         try
//         {
//             if(err)
//             {
//                 callback(err);
//             }
//             else 
//             {
//                 callback(null,result)
//             }
//         }
//         catch(err)
//         {
//             return callback(err);
//         }
//     })
// } 