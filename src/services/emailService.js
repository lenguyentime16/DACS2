require('dotenv').config();
import nodemailer from 'nodemailer';

let sendSimpleEmail = async (dataSend) => {
    console.log('send mail')
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            // TODO: replace `user` and `pass` values from <https://forwardemail.net>
            user: process.env.EMAIL_APP,
            pass: process.env.EMAIL_APP_PASSWORD,
        },
        
    });

        // send mail with defined transport object
        let info = await transporter.sendMail({
            from: '"Tutoring Center"', // sender address
            to: dataSend.receiverEmail, // list of receivers
            subject: "Thông tin đăng kí lớp học", // Subject line
            text: "Hello world?", // plain text body
            html: getBodyHTMLEmail(dataSend),
            
        });
      
    
}


let getBodyHTMLEmail = (dataSend) => {
    let result = ''
    if(dataSend.language === 'vi') {
        result = 
        `
        <h3>Xin chào ${dataSend.userName}!</h3>
        <p>Chúng tôi đã ghi nhận rằng bạn đã đăng kí lịch học trên website của chúng tôi</p>
        <p>Thông tin lịch hẹn:</p>
        <div><b>Thời gian: ${dataSend.time}</b></div>
        <div><b>Giáo viên: ${dataSend.teacherName}</b></div>

        <p>Nếu như bạn là người đã đặt lịch hẹn, hãy click vào đường link bên dưới để xác nhận và hoàn tất thủ tục đặt lịch.</p>
        <div><a href='${dataSend.redirectLink}' target="_blank">Click here</a></div>
        <div>Xin chân thành cảm ơn</div>

        `
    }
    if(dataSend.language === 'en') {
        result = 
        `
        <h3>Hi ${dataSend.userName}!</h3>
        <p>We have recorded that you have registered for a class schedule on our website</p>
        <p>Schedule information:</p>
        <div><b>Time: ${dataSend.time}</b></div>
        <div><b>Teacher: ${dataSend.teacherName}</b></div>

        <p>If you are the one who has made an appointment, click on the link below to confirm and complete the booking procedure.</p>
        <div><a href='${dataSend.redirectLink}' target="_blank">Click here</a></div>
        <div>Thank you!</div>

        `
    }

    return result;
}


module.exports = {
    sendSimpleEmail: sendSimpleEmail
}