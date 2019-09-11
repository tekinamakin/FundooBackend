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
        required: [true,'first nme is requireds'],
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

//creating a registration model
userModel.prototype.registration = (userData, callback) => {
    
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



// userModel.prototype.registration = (req,res) => {
//     try{
//         user.findOne({ 'email' : req.email },(err,data) => {
//             if(err){
//                 console.log('Error in Registration ', err);
//                 return res(err)
//             }
//             else if(data != null){
//                 console.log("Email Already Exists")
//                 return res(err)
//             }
//             else{
//                     console.log(data);

//                    // var pass = req.password;
//                     req.password = bcrypt.hashSync(req.password,saltRound);
//                     var newUser = new user({
//                         "firstName"       : req.firstName,
//                         "lastName"        : req.lastName,
//                         "email"           : req.email,
//                         "password"        : req.password,
//                         "isVerified"      : 'false'
                        
//                     });                  
//                     const payload = {
//                     email    : req.email
                
//                     }
//                 //     var token = tokenPayload.generateToken(payload)
//                 //     localStorage.setItem('token','token');
//                 //   console.log("New User",newUser)
//                 //     newUser.save((err,result) => {
//                 //         if(err){
//                 //             console.log("Error In Save Registration")
//                 //             res(err)
//                 //         }
//                 //         else{
//                 //             console.log("Registration Successfully..!!")
//                 //             var url = 'http://localhost:3000/'+ token ;
//                 //             console.log('Url',url)
//                 //             // mail.sendEmail(url,newUser.email,pass);
//                 //             res(null,result);
//                 //         }
//                 //     }) 
                    
//                     newUser.save()
//                         .then((response) => {
//                             var token = tokenPayload.generateToken(payload)
//                             console.log("token",token)
//                             var url = `${process.env.isVerified}/${token}` ;
//                             console.log('Url',url)
//                             //mail.sendEmail(url,newUser.email,pass);
//                             //localStorage.setItem('token',token)
//                             console.log("Registration Successfully..!!")
//                             return res(null,response);
//                         })
//                         .catch(err => {
//                             console.log("Error In Registration", err);
//                             return res(err);
//                         })
//         }
    
//     })
// }
// catch(err){
//     console.log("Error in registration catch block",err);
//     res(err)
// }
// }





//model login
// userModel.prototype.login = (body, callback) => {
//     console.log("model ", body);

//     //check if email address already exists
//     user.findOne({ "email": body.email }, (err, data) => {
//         if (err) {
//             callback(err);
//         }
//         else if (data !== null) {
//             //comparing currently entered password with encrypted password in db
//             bcrypt.compare(body.password, data.password).then(function (res) {
//                 //if res is true then login successfull else not
                    
//                 if (res) {
                   
                                  
                    
                    
//                      var token = jwt.sign({ email: body.email }, "secretkey", { expiresIn: 43200000 });
//                     console.log("data.firstName" , data.firstName)
//                     console.log("token is printed after login: ", token);
//                     callback(null, {
//                         token: token,
//                         userId: data._id,
//                         firstName: data.firstName
//                     });
//                 }


//                 else {
//                     console.log("Incorrect password");
//                     callback("Incorrect password");



//                 }

//             })


//                 // .catch = (err) => {
//                 //     console.log("invalid user");
//                 //     callback(err + "invalid user");
//                 // }

//         }
//         else{
//             console.log("invalid user");
//                 callback(  "invalid user");
//         }

//     })
// }

//model login
// userModel.prototype.login = (body, callback) => {
//     console.log("model ", body);

//     //check if email address already exists
//     user.findOne({ "email": body.email }, (err, data) => {
//         if (err) {
//             callback(err);
//         }
//         else if (data !== null) {
//             //comparing currently entered password with encrypted password in db
//             bcrypt.compare(body.password, data.password).then(function (res) {
//                 //if res is true then login successfull else not
//                 if (res) {

                    
                    
//                     //var token = jwt.sign({ email: body.email }, "secretkey", { expiresIn: 43200000 });
//                     console.log("data.firstName" , data.firstName)
//                     console.log("token is printed after login: ", token);
//                     callback(null, {
//                         token: token,
//                         userId: data._id,
//                         firstName: data.firstName
//                     });
//                 }


//                 else {
//                     console.log("Incorrect password");
//                     callback("Incorrect password");



//                 }

//             })


//                 // .catch = (err) => {
//                 //     console.log("invalid user");
//                 //     callback(err + "invalid user");
//                 // }

//         }
//         else{
//             console.log("invalid user");
//                 callback(  "invalid user");
//         }

//     })
// }



userModel.prototype.login =(data,callback) =>{
    try{
        user.findOne({email : data.email},(err,result) => {
            //console.log("What is in result",result)
            if(err){
                console.log("Please Enter Valid Email Address..!!")
                callback(err)
            }
            else if(result === null){
                console.log("Invalid User")
                return callback(err)
            }
            // else if(result.isVerified === null || !result.isVerified  ){
            // //  console.log("verify or not ",model.isVerified)
            //     console.log("verify First..!!");
            //     callback(err)
            // }
            else{
                
                bcrypt.compare(data.password,result.password,(err,res)=> {
                    if(!res){
                        console.log("Password Incorrect");
                        return callback(err)
                    }
                    else{
                        console.log("Login Successfully");
                        return callback(null,result)
                    }
                })
                    
            }
        })
    }
    catch(err){
        console.log("Error in login catch block",err);
        res(err)   
    }
}



userModel.prototype.verifyUser = (req,res) => {
    try{
        user.findOne({email : req.email},(err,result) => {
            if(err){
                console.log("No User Found..!!")
                res(err)
            }
            else{
                var payload = {
                    _id : result._id
                }
                var token = tokenPayload.generateToken(payload)
                console.log("token",token)
                var url = `${process.env.resetPassword}/${token}` ;
                console.log('Url',url)
                mail.sendEmail(url,req.email);
                console.log("User Available")
                res(null,result)
            }
        })
    }
    catch(err){
        console.log("Error forget verifcation catch block",err);
        res(err)
    }
}




userModel.prototype.forgetPassword=(res,callback)=>{

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




let registration = new userModel()
module.exports = registration



