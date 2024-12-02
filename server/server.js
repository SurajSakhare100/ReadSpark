import express  from 'express';
import axios from 'axios';
import cors from 'cors'
import DownloadStats from './model/download.js';
import mongoose from 'mongoose';
const app = express();
app.use(express.json());
import dotenv from 'dotenv'
dotenv.config()
// Verify reCAPTCHA endpoint
const clientURL =process.env.FRONTEND_URL;
app.use(cors({
  origin: clientURL,
  credentials: true,
}));

const PORT =process.env.PORT || 3000
const MONGO_URI =process.env.MONGO_URI;
await mongoose.connect(MONGO_URI)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.error('MongoDB connection error:', err);
    });

app.post('/api/verify-recaptcha', async (req, res) => {
  const recaptchaValue = req.body.recaptchaValue;

  if (!recaptchaValue) {
    return res.status(400).json({ success: false, message: 'reCAPTCHA token missing' });
  }

  const recaptchaSecret = process.env.RECAPTCHA_SECRET_KEY; // Your reCAPTCHA secret key
  const recaptchaUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${recaptchaSecret}&response=${recaptchaValue}`;

  try {
    const response = await axios.post(recaptchaUrl,{recaptchaUrl});

    if (response.status==200) {
      return res.json({ success: true ,message: 'reCAPTCHA verification successful' });
    } else {
      return res.status(400).json({ success: false, message: 'reCAPTCHA verification failed' });
    }
  } catch (error) {
    console.error('Error verifying reCAPTCHA:', error);
    return res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

app.post('/api/increase-download-count', async (req, res) => {
  const { fileName } = req.body;

  if (!fileName) {
      return res.status(400).json({ error: 'File name is required' });
  }

  try {
      let stats = await DownloadStats.findOne();
      if (!stats) {
          stats = new DownloadStats({ totalDownloadCount: 0, files: [] });
      }

      stats.totalDownloadCount += 1;

      const file = stats.files.find(f => f.fileName === fileName);
      if (file) {
          file.downloadCount += 1;
      } else {
          stats.files.push({ fileName, downloadCount: 1 });
      }

      await stats.save();

      res.status(200).json({ message: 'Download count updated', stats });
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});
app.get('/api/download-stats', async (req, res) => {
  try {
      const stats = await DownloadStats.findOne();
      if (!stats) {
          return res.status(404).json({ message: 'No stats found' });
      }
      res.status(200).json(stats);
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});
app.get('/api/download-stats/count', async (req, res) => {
  try {
      const stats = await DownloadStats.findOne();
      if (!stats) {
          return res.status(404).json({ message: 'No stats found' });
      }
      res.status(200).json(stats.totalDownloadCount);
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
