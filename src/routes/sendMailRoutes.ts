import express, { Request, Response } from 'express';
import { sendEmail } from '../services/emailService';

const router = express.Router();

router.post('/contact-company', async (req: Request, res: Response) => {
  const { applicantEmail, companyEmail, offerTitle, message } = req.body;

  if (!applicantEmail || !companyEmail || !offerTitle || !message) {
    return res.status(400).json({ error: 'Todos los campos son requeridos' });
  }

  try {
    const emailBody = `
      <p>${message}</p>
      <p>Este correo fue enviado por: <strong>${applicantEmail}</strong></p>
      <p>Puedes contactar con el solicitante haciendo clic en el siguiente enlace:</p>
      <a href="mailto:${applicantEmail}?subject=Re: ${offerTitle}">Responder al solicitante</a>
    `;

    const emailResponse = await sendEmail(
      companyEmail,
      `Interesado en la oferta: ${offerTitle}`,
      emailBody,
      applicantEmail
    );

    res.status(200).json({ success: true, result: emailResponse });
  } catch (error) {
    console.error('Error enviando el correo:', error);
    res.status(500).json({ success: false, error: 'Error al enviar el correo' });
  }
});

export { router };
