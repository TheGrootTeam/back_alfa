import { Resend } from 'resend';

const resendInstance = new Resend(process.env.RESEND_API_KEY as string);

export const sendEmail = async (to: string, subject: string, message: string, replyTo: string) => {
  try {
    const data = await resendInstance.emails.send({
      from: 'InternIT <no-reply@internit.tech>',
      to,
      subject,
      html: message,
      replyTo: replyTo,  // Reply-To field for emails
    });
    return data;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};
