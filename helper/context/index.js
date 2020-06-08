const jwt = require('jsonwebtoken');

module.exports.verifyUser = async (req) =>{
     try{
        req.email = null;
        //console.log(req.headers);
         const bearerHeader = req.headers.authorization;
         if(bearerHeader){
             const token = bearerHeader.split(' ')[1];
            // console.log('token====',token);
             const payload = jwt.verify(token, process.env.JWT_SECRET_KEY || 'mysecretkey');
             req.email = payload.email;
             
                
        }
     }
     catch(error){
         console.log(error);
         throw error;
    }
}