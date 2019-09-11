

 var jwt = require('jsonwebtoken');
 require('dotenv').config()
 function genver() { }
/**
 * @description : Here Generating Token..
 */
 genver.prototype.generateToken=(payload) => {

     console.log("payload",payload)
     console.log("SECRET_KEY",process.env.SECRET_KEY)
    var token = jwt.sign({payload},process.env.SECRET_KEY,{ expiresIn : '1d'})
    // const obj = {
    //     success : true,
    //     message : 'Token Generated',
    //     token   : token
    // }
    return token;
 }
/**
 * @description : Here verify Token
 */
//  genver.prototype.verifyToken = (req,res) => {
//      model.model.findOne({temporaryToken : req.params.token},(err, result) => {
//         if(err){
//             console.log("Link Expire")
//             res(err)
//         }
//         else{
//             var token = req.params.token;
//             jwt.verify(token,process.env.SECRET_KEY,(err,decode) => {
//                 if(err){
//                     console.log("Error in token Verification" ,err)
//                     res(err)
//                 }
//                 else{
//                     model.model.temporaryToken = false;
//                     model.model.isVerified = true;
//                     console.log("Email is Activated ");
//                     res.json({success : true ,message : "Email Successfully Activated"})
//                 }
//             })
//         }       
//      })
//  }

genver.prototype.verification = (req,res,next) => {
    console.log(req['token'])
    //console.log("get",client.get('token'))
    var headerToken = req.headers['token'];
    console.log("token",token1)
    if(token1){
        jwt.verify(headerToken,process.env.SECRET_KEY,(err,decoded) => {
            if(err){
                console.log("Error in Verified Token");
                
                return res.send({
                    success : false,
                    message : "Token is not valid"
                })
            }
            else{
                req.decoded = decoded;
                console.log("All ABout Token",req.decoded)
                console.log("Token Verified successfully");               
                next();
            }
        })
    }
    else{
        return res.send({
            success : false,
            message : "no Token Provided"
        })
    }
}
/**
 * @description : Here verification of token and getting data through redis cache.. 
 */
genver.prototype.auth = (req,res,next) => {
    //console.log((session).toString);
    console.log("checking content inside the body",req.body);
    
    const id = req.headers['token'];
    console.log("token is -->",id);
    
    client.get("token"+id,(err,reply) => {
       // console.log("All ABout Token",getId)     
        if(err){
            console.log(" Error in Reading Token ");
            res(err)
        } 
        else{
            console.log('redis value is -->',reply);
            
            if(reply){
                jwt.verify(reply,process.env.SECRET_KEY,(err,decoded) => {
                    if(err){
                        console.log("Error in Verified Token");
                        
                        return res.send({
                            success : false,
                            message : "Error in Verified Token"
                        })
                    }
                    else{
                        req.decoded = decoded;
                        console.log("All ABout Token",req.decoded)
                        console.log("Token Verified successfully",reply);   
                              
                        next();
                    }
                })
            }
            else{
                return res.send({
                    success : false,
                    message : "no Token Provided"
                })
            }
        } 
    })

}
 module.exports = new genver();

// function getId(){
//     client.get('token',(err,retry) => {
//         if(err){
//             console.log(" Error in Reading Token ");
//             return 
//         } 
//         else{
//             if(retry){
//                 jwt.verify(retry,process.env.SECRET_KEY,(err,decoded) => {
//                     if(err){
//                         console.log("Error in Verified Token");
                        
//                         return ({
//                             success : false,
//                             message : "Token is not valid"
//                         })
//                     }
//                     else{
//                         //req.decoded = decoded;
//                         //console.log("All ABout Token",req.decoded)
//                         console.log("Token Verified successfully");
//                         return send(decoded.payload._id)               
//                     }
//                 })
//             }
//         }
//        // return decoded.payload._id 
//      })
//     }
