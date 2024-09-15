import express, { Request, Response } from 'express';
import { sendEmail } from '../services/emailService';
import { getHost } from '../lib/utils'; 

const router = express.Router();

router.post('/contact-company', async (req: Request, res: Response) => {
  const { applicantEmail, companyEmail, offerTitle, message, applicantId, applicantName, applicantLastName } = req.body;

  if (!applicantEmail || !companyEmail || !offerTitle || !message || !applicantId || !applicantName || !applicantLastName) {
    return res.status(400).json({ error: 'Todos los campos son requeridos' });
  }

  try {
    // Construir la URL del perfil del solicitante
    const applicantUrl = `${getHost(req.hostname)}/view/applicant/${applicantId}`;

    // Cuerpo del correo con botón y fallback
    const emailBody = `
    <p>${message}</p>
  
    <p>
      <!-- Botón con enlace al perfil del solicitante -->
      <a href="${applicantUrl}" style="
        display: inline-block;
        padding: 12px 25px;
        font-size: 16px;
        font-weight: bold;
        color: #fff;
        background-color: rgb(1, 100, 130);
        border-radius: 5px;
        text-decoration: none;
        text-align: center;
        margin: 20px 0;
        ">Ver perfil completo del solicitante</a>
    </p>
  
    <p>
      <!-- Persuasión para revisar el perfil -->
      El perfil de <strong>${applicantName} ${applicantLastName}</strong> está disponible para que puedas revisar su experiencia y habilidades. Si te interesa conocer más detalles o ver cómo podría encajar en tu equipo, te recomendamos visitar su perfil completo.
    </p>
  
    <p>
      <!-- Fallback: Mostrar nombre completo del solicitante con enlace -->
      Si no puedes ver el botón, puedes acceder directamente al perfil del solicitante aquí: 
      <a href="${applicantUrl}">${applicantName} ${applicantLastName}</a>.
    </p>
  
    <p>
      <!-- Contacto directo por correo -->
      ¿Prefieres comunicarte directamente con la persona solicitante? Puedes responderle fácilmente haciendo clic en el siguiente enlace:
    </p>
    
    <p style="text-align: center;">
      <a href="mailto:${applicantEmail}?subject=Re: ${offerTitle}" style="
        display: inline-block;
        padding: 10px 20px;
        font-size: 16px;
        font-weight: bold;
        color: #fff;
        background-color: rgb(52, 160, 164);
        border-radius: 5px;
        text-decoration: none;
        text-align: center;
        margin: 10px 0;
        ">Contactar al solicitante por correo</a>
    </p>
  
    <p>
      Revisar su perfil o ponerte en contacto puede ser una excelente oportunidad para encontrar al talento que estás buscando. ¡No lo dejes pasar!
    </p>
  `;
  

    // Enviar el correo
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
