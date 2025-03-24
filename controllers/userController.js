import bcrypt from 'bcrypt';
import User from '../models/userModel.js';
import jwt from 'jsonwebtoken';

export function saveUser(req,res){
    const hashPassword = bcrypt.hashSync(req.body.password, 10);
    console.log(hashPassword);
    const user = new User({
        email: req.body.email,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        password: hashPassword,
    });
    user.save().then(() => {
        res.json({
            message: "user saved",
            data: user
        });
    }).catch((err) => {
        res.json(err.message);
    });
}

export function userDetail(req,res){
    User.find( {} 
    ).then((data) => {
        res.json(data);
    }).catch((err) => {
        res.json(err);
    });
}

export function searchDetailByName(req,res){
    const name = req.params.name;
    User.find(
        {firstname: name}
    ).then((data) => {
        res.json(data);
    }).catch((err) => {
        res.json(err.message);
    });
}

//login user by checking password and email
export function loginUser(req,res){
    const email = req.body.email;
    const password = req.body.password;

    User.findOne({
        email:email //find from the email 
    }).then((user) => {
        if(!user){ //check the email first 
            res.json({
                message: "user not found invalid email"
            });
        }
        else{
            //if email correct then check the password
            const isPasswordCorrrect = bcrypt.compareSync(password, user.password);
            if(isPasswordCorrrect){

                //jwt token
                const userDetails ={
                    email: user.email,
                    firstname: user.firstname,
                    lastname: user.lastname,
                    role: user.role,
                    phoneNumber: user.phoneNumber,
                    isDisabled: user.isDisabled,
                    isEmailVerified: user.isEmailVerified,
                }

                const token = jwt.sign(userDetails, "random456");

                res.json({
                    message: "login successful",
                    token: token
                });
            }
            else{
                res.json({
                    message: "invalid password"
                });
            }
        }
}).catch((err) => {
    res.json(err.message);
});
}