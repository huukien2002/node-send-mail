var express = require("express");
var router = express.Router();
const nodemailer = require("nodemailer");
const cron = require("node-cron");

// Cấu hình transporter (có thể move ra file riêng nếu cần)
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "lehuukien270702@gmail.com",
    pass: "gyzyreipdshpopwd", // ⚠️ Không nên commit pass thật, nên dùng biến môi trường
  },
});

// Tách hàm gửi mail
async function sendEmail() {
  const mailOptions = {
    from: "lehuukien270702@gmail.com",
    to: "kienlh@mumesoft.vn",
    subject: "📝 Đừng quên viết nhật ký hôm nay!",
    html: `
    <div style="font-family: Arial, sans-serif; font-size: 16px; color: #333;">
      <p>🕒 Nhắc nhẹ: Hôm nay bạn cần viết nhật ký nhé!</p>
      <p>Ghi lại vài dòng để lưu giữ cảm xúc và suy nghĩ trong ngày.</p>
      <p>--<br/>Trợ lý nhắc nhở 🤖</p>
    </div>
  `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Email sent: ", info.response);
  } catch (error) {
    console.error("❌ Error sending email: ", error);
  }
}

router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/send-mail", async function (req, res) {
  try {
    await sendEmail();
    res.json({ success: true, message: "Email sent!" });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Send failed", error: err });
  }
});

cron.schedule(
  "* * * * *",
  () => {
    console.log("⏰ Running daily email job at 11:00 AM");
    sendEmail();
  },
  {
    timezone: "Asia/Ho_Chi_Minh",
  }
);

module.exports = router;
