import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';
import _ from 'lodash';

const sendResetEmail = (user) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.GMAIL_USER,
                pass: process.env.GMAIL_PASSWORD,
            },
        });
    
        jwt.sign(
            {
                user: _.pick(user, 'id'),
            },
            process.env.JWT_SECRET,
            {
              expiresIn: '1d',
            },
            (err, emailToken) => {
              console.log("emailToken") 
              const url = `http://localhost:5000/api/users/resetPassword/${user._id}/${emailToken}`;
    
              transporter.sendMail({
                to: user.email,
                subject: 'Confirm Email',
                html: `Please click this link to reset your password: <a href="${url}">${url}</a>`,
              });
            },
          );
        return user
    }
    catch(e) {
        console.log(e)
    }
}


export default sendResetEmail;
