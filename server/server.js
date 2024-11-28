import express  from 'express';
import axios from 'axios';
import cors from 'cors'
const app = express();
app.use(express.json());

// Verify reCAPTCHA endpoint
const clientURL =process.env.FRONTEND_URL;
app.use(cors({
  origin: clientURL,
  credentials: true,
}));

const PORT =process.env.PORT || 3000
app.post('/api/verify-recaptcha', async (req, res) => {
  const recaptchaValue = req.body.recaptchaValue;

  if (!recaptchaValue) {
    return res.status(400).json({ success: false, message: 'reCAPTCHA token missing' });
  }

  const recaptchaSecret = process.env.RECAPTCHA_SECRET_KEY; // Your reCAPTCHA secret key
  const recaptchaUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${recaptchaSecret}&response=${recaptchaValue}`;

  try {
    const response = await axios.post(recaptchaUrl,{recaptchaUrl});
    console.log(response)

    if (response.success) {
      return res.json({ success: true });
    } else {
      return res.status(400).json({ success: false, message: 'reCAPTCHA verification failed' });
    }
  } catch (error) {
    console.error('Error verifying reCAPTCHA:', error);
    return res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
