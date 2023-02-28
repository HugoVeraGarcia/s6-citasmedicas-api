const nodemailer = require('nodemailer');

// utils
const { catchAsync } = require('../utils/catchAsync');


//Modificar rutas

const mailConfirmacion = catchAsync(async (req, res, next) => {
  const { user, email, especialidad, profesional, sanatorio, diaTurno, horaTurno } = req.body;
  
  async function mailConfirmacion() {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.USEREMAIL,
        pass: process.env.PASSMAIL
      }
    });
    const envio = await transporter.sendMail({
      from: process.env.USEREMAIL,
      to: `${email}`,
      subject: "Reserva de turno",
      html: `Hola ${user}. Te confirmamos la reserva de tu turno para la especialidad ${especialidad},
      con el/la dr./dra. ${profesional} en el sanatorio ${sanatorio} el dia ${diaTurno} a las ${horaTurno}.
      `
    })
    console.log('helloooooooo')
    res.status(200).json({
      'message': 'success',
    });
  }
  mailConfirmacion()

});

  module.exports = {
    // nodemailer,
    mailConfirmacion
  }