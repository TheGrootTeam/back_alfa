import { Resend } from 'resend';

const resendInstance = new Resend(process.env.RESEND_API_KEY as string);

export const sendEmail = async (to: string, subject: string, message: string) => {
  try {
    const data = await resendInstance.emails.send({
      from: 'InternIT <no-reply@internit.tech>',  
      to,
      subject,
      html: `<p>${message}</p>`,
    });
    return data;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};
