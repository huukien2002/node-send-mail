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
    subject: "📝 Nhắc viết nhật ký!",
    html: `<p>🍉 Dưa Hấu ơi, nhớ viết nhật ký hôm nay nhé!</p>`,
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
