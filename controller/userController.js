const service = require('../service/userService')

const s3 = require('../middleware/s3.config');

const tokens = require("../middleware/tokenAccess")
//const redisCache = require('../middleware/redisService')


module.exports.register = (req, res) => {
  try {
    console.log("inside controller of reg", req.body)

    req.checkBody('firstName').isAlpha()
      .withMessage('firstname must have alphabetical characters')
      .isLength({ min: 3 })
      .withMessage("minimum 3 alphabets required in first name")

    req.checkBody("lastName").isAlpha()
      .withMessage("lastname must have alphabetical characters")
      .isLength({ min: 3 })
      .withMessage("minimum 3 alphabets required in last name")

    req.checkBody('email').isEmail()
      .withMessage('Email is not valid')

    req.checkBody('password')
      .isLength({ min: 3 })
      .withMessage('min 3 alphabets required')
      .isLength({ max: 10 })
      .withMessage("max 10 alphabets are allowed in password")

    console.log("data send by user", userData)
    var response = {}
    var errors = req.validationErrors()
    if (errors) {
      response.sucess = false,
        response.result = errors,
        res.status(400).send(response);
    }
    else {
      var userData = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password

      }
      service.register(userData, (err, result) => {
        if (err || result === undefined) {
          response.sucess = false,
            response.error = err,
            res.status(400).send(response)
        }
        else {
          response.sucess = true,
            response.result = result,
            res.status(200).send(response);
        }
      })
    }

  }
  catch (error) {
    console.log("Registration Controller Catch ", error);
    res.status(400).send({
      success: false,
      message: "Registration Controller catch"
    });
  }
}



//Registration with promises

// exports.register = (req, res) => {
//   try {
//     console.log("inside controller of reg", req.body)

//     req.checkBody('firstName').isAlpha()
//       .withMessage('firstname must have alphabetical characters')
//       .isLength({ min: 3 })
//       .withMessage("minimum 3 alphabets required in first name")

//     req.checkBody("lastName").isAlpha()
//       .withMessage("lastname must have alphabetical characters")
//       .isLength({ min: 3 })
//       .withMessage("minimum 3 alphabets required in last name")

//     req.checkBody('email').isEmail()
//       .withMessage('Email is not valid')

//     req.checkBody('password')
//       .isLength({ min: 3 })
//       .withMessage('min 3 alphabets required')
//       .isLength({ max: 10 })
//       .withMessage("max 10 alphabets are allowed in password")

//     console.log("data send by user", userData)
//     var response = {}
//     var errors = req.validationErrors()
//     if (errors) {
//       response.sucess = false,
//         response.result = errors,
//         res.status(400).send(response);
//     }
//     else {
//       var userData = {
//         firstName: req.body.firstName,
//         lastName: req.body.lastName,
//         email: req.body.email,
//         password: req.body.password

//       }
//       let regPromise = service.register(userData)
//       regPromise.then((data) => {
//         response.success = true;
//         response.message = "User registered successfully"
//         response.data = data
//         res.status(200).send(response)

//       },
//         (err) => {
//           response.success = false;
//           response.message = "Problem while registration of user"
//           response.err = err
//           res.status(422).send(response)
//         })
//     }
//   }
//   catch (error) {
//     console.log("Getting error in the catch block of register controller", error);

//   }
// }







exports.login = (req, res) => {
  try {
    var details={}
    req.checkBody('email').isEmail()
      .withMessage('Email is not valid')

    req.checkBody('password')
      .isLength({ min: 3 })
      .withMessage('min 3 alphabets required')
      .isLength({ max: 10 })
      .withMessage("max 10 alphabets are allowed in password")

    var errors = req.validationErrors()
    var response = {}
    if (errors) {
      response.success = false,
        response.errors = errors,
        res.status(400).send(errors)

    }
    else {
      let userLoginData = {
        "email": req.body.email,
        "password": req.body.password
      }
      service.login(userLoginData, (err, result) => {

        if (err || result === undefined) {
          response.sucess = false,
            response.error = err,
            res.status(400).send(response)
        }
        else {
          //  session = result._id; 
          const payload = {
            _id: result._id
          }
          var gentoken = tokens.generateToken(payload)
          //client.set('token',gentoken,redis.print)
          // details.id = result.email
          // details.value = "token" + gentoken
          // redis.setRedis(details,(err,result)=>{
          //   if(result){
          //     console.log("Token is set into rerdis",result);
              
          //   }
          // })
          client.set("token" + gentoken, gentoken, redis.print)
          console.log("printing key in redis", "token" + result._id);

          //  client.keys('*',(err,res) => {
          //    console.log("key is ",res);

          //  })
          console.log(gentoken);


          response.sucess = true,
            response.result = result,
            response.token = gentoken,
            res.status(200).send(response);
        }
      })
    }
  }
  catch (error) {
    console.log(" Login Controller Catch ");
    res.status(400).send({
      success: false,
      message: "Login Controller catch"
    });
  }
}


// exports.login = (req, res) => {
//     try {
//         var responseResult = {};
//         userService.login(req.body, (err, result) => {
//             if (err) {
//                 responseResult.success = false;
//                 responseResult.error = err;
//                 res.status(500).send(responseResult);
//             }
//             else {

//                 responseResult.success = true;
//                 responseResult.result = result;
//                 res.status(200).send(responseResult)
//             }
//         })
//     } catch (err) {
//         res.send(err);
//     }
// }



exports.verifyUser = (req, res) => {
  try {
    var response = {}
    service.verifyUser(req.body, (err, result) => {

      if (err) {
        response.sucess = false,
          response.error = err,
          res.status(400).send(response)
      }
      else {
        response.sucess = true,
          response.result = result,
          res.status(200).send(response);
      }
    })
  }
  catch (error) {
    console.log(" verify user Controller Catch for forget password ");
    res.status(400).send({
      success: false,
      message: "verify user Controller catch"
    });
  }
}



exports.forgetPassword = (req, res) => {
  req.checkBody("email", "not valid ").isEmail();
  var err = req.validationErrors();
  try {
    service.forgetPassword(req, (err, result) => {


      var response = {};
      console.log("forget paswd")
      if (err) {
        //send status as false to show error
        response.success = false;
        response.err = err;
        res.status(400).send(response);

      }
      else {
        //send status as true for successful result
        response.success = true;
        response.result = result;
        //res.status(200).send(response);
        // console.log("resr", response)
        // const payload = {
        //   _id: response.result._id
        // }
        // console.log("payload id", payload._id)
        // console.log("payload", payload)
        //call the function to create a token
        // const resObj = Token.generateNewToken(payload);

        // client.set(resObj,resObj,redis.print)
        console.log("Obj", resObj);
        //url for reset password with the generated token
        const url = `http://localhost:3000/reset/${resObj.token}`;
        console.log("url", url)
        //call sendMail function
        Email.mail(url);
        res.status(200).send(url);
      }

    })
  }
  catch (err) {
    //handle exception
    console.log(req)
    req.send(err);
  }
}

exports.reset = (req, res) => {
  try {
    var responseResult = {};
    console.log('ctrl reset');
    service.reset(req, (err, result) => {
      if (err) {
        //send status as false to show error
        console.log("ctrl if reset ")
        responseResult.success = false;
        responseResult.error = err;
        res.status(500).send(responseResult)
      }
      else {
        //send status as true for successful result
        console.log('in user ctrl else');
        responseResult.success = true;
        responseResult.result = result;
        res.status(200).send(responseResult);
      }
    })
  } catch (err) {
    //handle exception
    console.log("err in ctrl reset catch", err);

    req.send(err);
  }


}


exports.doUpload = (req, res) => {
  const s3Client = s3.s3Client;
  const params = s3.uploadParams;

  params.Key = req.file.originalname;
  params.Body = req.file.buffer;

  s3Client.upload(params, (err, data) => {
    if (err) {
      res.status(500).json({ error: "Error -> " + err });
    }
    // res.json({message: 'File uploaded successfully! -> keyname = ' + req.file.originalname});
    return res.status(200).send(data)
  });
}

//demo api for social login, if not working delete this api  




// //return a promise with user informations
// module.exports.getGoogleUser = ( code ) => {
//     //verify the token using google client
//     return client.verifyIdToken( { idToken: code, audience: process.env.GOOGLE_CLIENT_ID } )
//         .then( login => {
//             //if verification is ok, google returns a jwt
//             var payload = login.getPayload();
//             var userid = payload['sub'];

//             //check if the jwt is issued for our client
//             var audience = payload.aud;
//             if ( audience !== process.env.GOOGLE_CLIENT_ID ) {
//                 throw new Error( "error while authenticating google user: audience mismatch: wanted [" + process.env.GOOGLE_CLIENT_ID + "] but was [" + audience + "]" )
//             }
//             //promise the creation of a user
//             return {
//                 name: payload['name'], //profile name
//                 pic: payload['picture'], //profile pic
//                 id: payload['sub'], //google id
//                 email_verified: payload['email_verified'], 
//                 email: payload['email']
//             }
//         } )
//         .then( user => { return user; } )
//         .catch( err => {
//         //throw an error if something gos wrong
//             throw new Error( "error while authenticating google user: " + JSON.stringify( err ) );
//         } )
// }


// var passport = require('passport');
// var LinkedInStrategy = require('passport-linkedin');

// var User = require('../models/user');
// var config = require('../_config');
// var init = require('./init');



//===================================================================
// /**
//  * @description : controller to forget the password
//  */
// exports.forgetPassword = (req, res) => {
//   var responseResult = {
//       success : false,
//       message : "Please enter registered email id..",
//       data : {}
//   };
//       service.forgetPassword(req.body, (err, result) => {
//       try {
//           if (err) {
//               responseResult.message = err;
//               res.status(404).send(responseResult)
//           }
//           else 
//           {
//               responseResult.success = true;
//               responseResult.message = "Reset password link has been sent to your registered mail id."
//               responseResult.result = result;
//               const payload = {
//                   user_id: responseResult.result._id
//               }
//               /**
//                * @description : Generate token
//                */
//               const obj = gentoken.GenerateToken(payload);

//               const url = `http://localhost:4200/user/resetPassword/${obj.token}`;

//               /**
//                * @description : Send Mail
//                */
//               sendmail.sendEmailFunction(url, req.body.email);

//               /**
//                * @description : Send email using this token generated
//                */
//               res.status(200).send(responseResult);
//           }
//       }
//       catch (err) {
//           return err;
//       }
//   })
// }

// /**
// * @description : controller to reset the password of the user
// */
// exports.resetPassword = (req, res) => {
//   var responseResult = {
//       success : false,
//       message : "Unable to reset your password..",
//       data : {}
//   };
//   userService.resetPassword(req, (err, result) => {
//       try {
//           if (err) {

//               responseResult.message = err;
//               res.status(404).send(responseResult)
//           }
//           else {
//               responseResult.success = true;
//               responseResult.message = "Password reset successfully.."
//               responseResult.result = result;
//               res.status(200).send(responseResult);
//           }
//       }
//       catch (err) {
//           return err;
//       }
//   })
// }