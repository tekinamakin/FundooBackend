const userModel = require('../model/userModel')



//registration service
// exports.registration = (data, callback) => {
// console.log("service",data)
// //passing data to registration in model
//   userModel.registration (data, (err, result) => {
//     console.log("service model",data)


//     if (err) {
//       console.log("service error");
//       callback(err);
//     }
//     else {
//       console.log("In service", result);
//       callback(null, result);
//     }



//   })

// }


exports.registration = (userData, callback) => {
    try {
        userModel.registration(userData, (err, result) => {
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



//login service
// exports.login=(data,callback)=>{
// console.log("inside the login-service"+data)

// console.log('login service')
// //passing data to login method in Model
// userModel.login(data,(err,result)=>{
//   console.log("check loginmodel",result)
// if(err){
// console.log(err)
// callback(err)

// }
// else
// callback(null,result)
// //console.log("testing",result)

// })


// }



exports.login = (userData,callback) => {
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

