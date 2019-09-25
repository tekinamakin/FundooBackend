const mongoose = require('mongoose')
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema
var tokenPayload = require('../middleware/tokenAccess');
//var tokens=require("../middleware/tokenAccess")
//var jwt = require('jsonwebtoken')
//var saltRound = 10;
//creating  a schema
const userSchema = new Schema({
    firstName: {
        type: String,
        required: [true, 'first nme is requireds'],
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
},
    {
        timestamps: true
    }
)

var user = mongoose.model('User', userSchema)
function userModel() { }//class function


// userModel.prototype.findUser = (email) => {
//     return new Promise((resolve, reject) => {
//         user.find({ "email": email }, ['_id', "firstName", "lastName", "password"]).then((data) => {
//             if (data.length > 0) {
//                 reject({ "message": "email already exist", "data": data })
//             }
//             else {
//                 resolve({ "data": data })
//             }
//         }).catch((err) => {
//             reject({ "message": "error in finding email" })
//         })

//     })
// }


// userModel.prototype.saveUserModel = (userData) => {
//     return new Promise((resolve, reject) => {
//         let userDetails = new user({
//             "firstName": userData.firstName,
//             "lastName": userData.lastName,
//             "email": userData.email,
//             "password": userData.password
//         })
//         userDetails.save().then((data) => {
//             resolve({ "message": "registration succesful" })
//         }).catch((err) => {
//             reject({ "message": "registration failed" })
//         })
//     })
// }


//creating a registration model
userModel.prototype.create = (userData, callback) => {

    //checking if email address already exists
    user.findOne({ "email": userData.email }, (err, data) => {
        console.log("content in data" + data)
        if (err) {
            console.log('error in registration', err)
            callback(err)
        }
        else {
            if (data > 0) {
                //checks if user is already present 
                console.log("user already exists", data)
                callback('user already has an account')
            }

            else {
                //creates a new user 

                var newUser = new user({
                    "firstName": userData.firstName,
                    "lastName": userData.lastName,
                    "email": userData.email,
                    "password": userData.password



                });
                //using bcrypt to hash the password
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err;
                        newUser.password = hash;
                        //     // Save the user in the database
                        newUser.save((err, result) => {
                            if (err) {

                                callback(err)
                            }
                            else {

                                console.log('user registered successfully')

                                callback(null, result)
                            }

                        })
                    });
                });






            }
        }
    })

    // 
}





userModel.prototype.login = (data, callback) => {
    try {
        user.findOne({ email: data.email }, (err, result) => {
            //console.log("What is in result",result)
            if (err) {
                console.log("Please Enter Valid Email Address..!!")
                callback(err)
            }
            else if (result === null) {
                console.log("Invalid User")
                return callback(err)
            }
            // else if(result.isVerified === null || !result.isVerified  ){
            // //  console.log("verify or not ",model.isVerified)
            //     console.log("verify First..!!");
            //     callback(err)
            // }
            else {

                bcrypt.compare(data.password, result.password, (err, res) => {

                    if (!res) {
                        console.log("Password Incorrect");
                        return callback(err)
                    }
                    else {
                        console.log("Login Successfully");
                        return callback(null, result)
                    }
                })

            }
        })
    }
    catch (err) {
        console.log("Error in login catch block", err);
        res(err)
    }
}



userModel.prototype.verifyUser = (req, res) => {
    try {
        user.findOne({ email: req.email }, (err, result) => {
            if (err) {
                console.log("No User Found..!!")
                res(err)
            }
            else {
                var payload = {
                    _id: result._id
                }
                var token = tokenPayload.generateToken(payload)
                console.log("token", token)
                var url = `${process.env.resetPassword}/${token}`;
                console.log('Url', url)
                mail.sendEmail(url, req.email);
                console.log("User Available")
                res(null, result)
            }
        })
    }
    catch (err) {
        console.log("Error forget verifcation catch block", err);
        res(err)
    }
}




userModel.prototype.forgetPassword = (res, callback) => {

    //check the email address 
    user.findOne({ "email": res.body.email }, function (err, result) {
        console.log(" result in find", result);

        if (err) {
            console.log(err);
        }
        else {
            //check the registered email address with the email address entered while forget password
            if (result !== null && res.body.email == result.email) {
                //console.log("ur name"+res.name);
                callback(null, result)

            }
            else {
                callback("incorrect Email");
            }

        }
    })



}



//===========================================================================================================================>
// /**
//  * @description : API for the forget password
//  */
// usermodel.prototype.forgetPassword = (data, callback) => {
//     user.findOne({ "email": data.email }, (err, result) => {
//         try {
//             if (err)
//                 throw err;
//             else {
//                 if (result !== null && data.email == result.email) {
//                     callback(null, result);
//                 }
//                 else {
//                     callback("inncorrect mail")
//                 }
//             }
//         }
//         catch (err) {
//             return callback(err);
//         }
//     })
// }

// /**
//  * @description : API for reset password
//  */
// usermodel.prototype.resetPassword = (data, callback) => {
//     let newpassword = bcrypt.hashSync(data.body.password, salt);
//     user.updateOne({ _id: data.decoded.payload.user_id }, { $set: { password: newpassword } }, (err, result) => {
//         try {
//             if (err)
//                 throw err;
//             else {
//                 callback(null, result);
//             }
//         }
//         catch (err) {
//             return callback(err);
//         }
//     })
// }



let registration = new userModel()
module.exports = registration



