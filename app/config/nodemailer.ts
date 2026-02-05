import nodemailer from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";

export const transporter = nodemailer.createTransport(<SMTPTransport.Options>{
  host: process.env.HOST_MAIL,
  port: process.env.PORT_MAIL ? parseInt(process.env.PORT_MAIL, 10) : 587,
  secure: process.env.EMAIL_SECURE === "SSL",
  auth: {
    user: process.env.USERNAME_MAIL,
    pass: process.env.PASSWORD_MAIL,
  },
  heloDomain: "mail.cearlatinoamericano.pe",
  headers: {
    "X-Sending-Server": "cearlatinoamericano.pe",
    "X-Server-Identity": "cearlatinoamericano.pe",
  },
});
