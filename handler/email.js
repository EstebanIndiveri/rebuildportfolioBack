const nodemailer=require('nodemailer');
const pug=require('pug');
const juice=require('juice');
const htmlToText=require('html-to-text');
const emailConfig=require('../config/email');


async function main(opciones={}) {
    try{
  let transport = nodemailer.createTransport({
      host: emailConfig.host,
      port: emailConfig.port,
      secure: false,
      auth: {
        user: emailConfig.user, // generated ethereal user
        pass: emailConfig.pass, // generated ethereal password
      },
      tls: {
        rejectUnauthorized: false
    }
    });
    const generarHtml=(archivo,opciones={})=>{
        const html=pug.renderFile(`${__dirname}/../${archivo}.pug`,opciones)
        // console.log(html);
        console.log(opciones);
        return juice(html);
    }
    // if(!opciones.archivo)return;
    const html=generarHtml(opciones.archivo,opciones);
    const text=htmlToText.fromString(html);
    let info = await transport.sendMail({
      from: opciones.email, // sender address
      to: 'tefaa411@gmail.com', // list of receivers
      subject: opciones.subject, // Subject line
      text,  // plain text body
      html // html body 
  });
    console.log("Message sent: %s", info.messageId);
  //   transport.sendMail(mailOptions);
    }catch(error){
      console.log(error);
    }
  }
  // main().catch(console.error);
  module.exports = main;