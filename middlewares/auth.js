import jwt from "jsonwebtoken";

export function authJWT(req, res, next){
    const header = req.header("Authorization");
    //console.log(header); //print token
    if(header != null){
        const token = header.replace("Bearer ", "");
        //console.log("original token:" + token);
        jwt.verify(token ,"random123", (err, decoded)=>{
            if (decoded!=null) {
                req.user = decoded;
            }
            else{
                res.json({
                    message: "token not verified",
                    error: err
                });
            }
        });
    }
 next();
}

