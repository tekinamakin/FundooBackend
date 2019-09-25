var jwt = require('jsonwebtoken');
require('dotenv').config()

function tokenVerificationAuth() {}
/**
 * @description : Here Generating Token..
 */
tokenVerificationAuth.prototype.generateToken = (payload) => {

    console.log("payload", payload)
    console.log("SECRET_KEY", process.env.SECRET_KEY)
    var token = jwt.sign({
        payload
    }, process.env.SECRET_KEY, {
        expiresIn: '1d'
    })
    // const obj = {
    //     success : true,
    //     message : 'Token Generated',
    //     token   : token
    // }
    return token;
}


tokenVerificationAuth.prototype.verification = (req, res, next) => {
    console.log(req['token'])
    //console.log("get",client.get('token'))
    var headerToken = req.headers['token'];
    console.log("token", token1)
    if (token1) {
        jwt.verify(headerToken, process.env.SECRET_KEY, (err, decoded) => {
            if (err) {
                console.log("Error in Verified Token");

                return res.send({
                    success: false,
                    message: "Token is not valid"
                })
            } else {
                req.decoded = decoded;
                console.log("All ABout Token", req.decoded)
                console.log("Token Verified successfully");
                next();
            }
        })
    } else {
        return res.send({
            success: false,
            message: "no Token Provided"
        })
    }
}
/**
 * @description : Here verification of token and getting data through redis cache.. 
 */
tokenVerificationAuth.prototype.auth = (req, res, next) => {
    //console.log((session).toString);
    console.log("checking content inside the body", req.body);

    const id = req.headers['token'];
    console.log("token is -->", id);

    client.get("token" + id, (err, reply) => {
        // console.log("All ABout Token",getId)     
        if (err) {
            console.log(" Error in Reading Token ");
            res(err)
        } else {
            console.log('redis value is -->', reply);

            if (reply) {
                jwt.verify(reply, process.env.SECRET_KEY, (err, decoded) => {
                    if (err) {
                        console.log("Error in Verified Token");

                        return res.send({
                            success: false,
                            message: "Error in Verified Token"
                        })
                    } else {
                        req.decoded = decoded;
                        console.log("Inside auth of tokenAccess middleware", req.decoded)
                        console.log("Token Verified successfully", reply);

                        next();
                    }
                })
            } else {
                return res.send({
                    success: false,
                    message: "no Token Provided"
                })
            }
        }
    })

}
module.exports = new tokenVerificationAuth();
