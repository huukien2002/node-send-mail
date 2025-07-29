const nodemailer = require("nodemailer");

async function sendEmail() {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.SMTP_USER, // Lấy từ GitHub Secrets
      pass: process.env.SMTP_PASS, // Lấy từ GitHub Secrets
    },
  });

  const mailOptions = {
    from: process.env.SMTP_USER,
    to: "huongthuy0814@gmail.com", // Email người nhận
    subject: "📝  Dưa Hấu ơi, đừng quên viết nhật ký hôm nay nhé! 🍉",
    html: `
     <div style="font-family: Arial, sans-serif; font-size: 16px; color: #333;">
      <p>🍉 <strong>Dưa Hấu ơi</strong>, nhắc nhẹ là hôm nay bạn cần viết nhật ký nha!</p>
      <p>Ghi lại vài dòng để lưu giữ cảm xúc và suy nghĩ trong ngày ✍️</p>
      <p>--<br/>Trợ lý nhắc nhở 🤖</p>
    </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("✅ Email sent");
  } catch (error) {
    console.error("❌ Error:", error);
    process.exit(1); // báo lỗi cho GitHub Actions biết job fail
  }
}

sendEmail();
