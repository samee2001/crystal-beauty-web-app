import bcrypt from 'bcrypt';
import User from '../models/userModel.js';
import jwt from 'jsonwebtoken';

export function saveUser(req, res) {
    const hashPassword = bcrypt.hashSync(req.body.password, 10);
    console.log(hashPassword);
    const user = new User({
        email: req.body.email,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        password: hashPassword,
    });

    user.save().then(() => {
        return res.json({  // Added return here to prevent further code execution
            message: "user saved",
            data: user
        });
    }).catch((err) => {
        return res.json({  // Added return here as well
            message: err.message
        });
    });
}

export function userDetail(req, res) {
    User.find({}).then((data) => {
        return res.json(data);  // Return here to prevent further execution
    }).catch((err) => {
        return res.json({  // Return here as well
            message: err.message
        });
    });
}

export function searchDetailByName(req, res) {
    const name = req.params.name;
    User.find({ firstname: name }).then((data) => {
        return res.json(data);  // Added return here to prevent further code execution
    }).catch((err) => {
        return res.json({  // Added return here
            message: err.message
        });
    });
}

// Login user by checking password and email
export function loginUser(req, res) {
    const email = req.body.email;
    const password = req.body.password;

    User.findOne(
        { email: email }
    ).then((user) => {
        if (!user) {
            return res.json({  // Using return to stop execution after the response is sent
                message: "User not found, invalid email"
            });
        }

        const isPasswordCorrect = bcrypt.compareSync(password, user.password);
        if (isPasswordCorrect) {
            const userDetails = {
                email: user.email,
                firstname: user.firstname,
                lastname: user.lastname,
                role: user.role,
                phoneNumber: user.phoneNumber,
                isDisabled: user.isDisabled,
                isEmailVerified: user.isEmailVerified,
            };

            const token = jwt.sign(userDetails, "random123");

            return res.json({  // Using return to stop execution after the response is sent
                message: "Login successful",
                token: token
            });
        } else {
            return res.json({  // Using return to stop execution after the response is sent
                message: "Invalid password"
            });
        }
    }).catch((err) => {
        return res.json({  // Using return here as well
            message: err.message
        });
    });
}
