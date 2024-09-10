import express from 'express';
import { sendEmail } from '../services/emailService'; 

const router = express.Router();

// Route to send emails
router.post('/send-email', async (req, res) => {
  const { to, subject, message } = req.body;

  try {
    const result = await sendEmail(to, subject, message);
    res.status(200).json({ success: true, result });
  } catch (error) {
    res.status(500).json({ success: false, error: (error as Error).message });
  }
});

export default router;
