var express = require('express');
var router = express.Router();
const nodemailer = require('nodemailer');
const cron = require('node-cron');

// Cấu hình transporter (có thể move ra file riêng nếu cần)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'lehuukien270702@gmail.com',
    pass: 'gyzyreipdshpopwd' // ⚠️ Không nên commit pass thật, nên dùng biến môi trường
  }
});

// Tách hàm gửi mail
async function sendEmail() {
  const mailOptions = {
    from: 'lehuukien270702@gmail.com',
    to: 'kienlh@mumesoft.vn',
    subject: "Chào bạn!",
    text: "Hihihihi"
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Email sent: ', info.response);
  } catch (error) {
    console.error('❌ Error sending email: ', error);
  }
}

// GET /
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// Gửi thử bằng tay
router.get('/send-mail', async function(req, res) {
  try {
    await sendEmail();
    res.json({ success: true, message: 'Email sent!' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Send failed', error: err });
  }
});

// Gửi tự động lúc 11:00 sáng hàng ngày
cron.schedule('0 11 * * *', () => {
  console.log('⏰ Running daily email job at 11:00 AM');
  sendEmail();
}, {
  timezone: "Asia/Ho_Chi_Minh" // Đảm bảo dùng múi giờ VN
});

module.exports = router;
