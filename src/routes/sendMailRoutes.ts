import express, { Request, Response } from 'express';
import { sendEmail } from '../services/emailService';  // Asegúrate de que esté en la ruta correcta

const router = express.Router();

// Route to send emails from Applicant to the company
router.post('/contact-company', async (req: Request, res: Response) => {
  const { applicantEmail, companyEmail, offerTitle, message } = req.body;

  if (!applicantEmail || !companyEmail || !offerTitle || !message) {
    return res.status(400).json({ error: 'Todos los campos son requeridos' });
  }

  try {
    // Send the email using the mail service that we have created with Resend
    const emailResponse = await sendEmail(
      companyEmail,
      `Interesado en la oferta: ${offerTitle}`,
      `<p>${message}</p><p>Este correo fue enviado por: ${applicantEmail}</p>`
    );
    res.status(200).json({ success: true, result: emailResponse });
  } catch (error) {
    console.error('Error enviando el correo:', error);
    res.status(500).json({ success: false, error: 'Error al enviar el correo' });
  }
});

export default router;
