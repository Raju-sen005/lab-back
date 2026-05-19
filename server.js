import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: "*",
  }),
);

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Lab Backend Running...");
});

app.post("/api/book-test", async (req, res) => {
  try {
    console.log("BODY =>", req.body);

    const { name, mobile, city } = req.body;

    const transporter = nodemailer.createTransport({
      host: "smtp-relay.brevo.com",
      port: 2525,
      secure: false,

      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },

      tls: {
        rejectUnauthorized: false,
      },

      connectionTimeout: 20000,
      greetingTimeout: 20000,
      socketTimeout: 20000,
    });

    const mailOptions = {
      from: "sensaab0005@gmail.com",

      to: "sensaab0005@gmail.com",

      subject: `New Lab Test Booking - ${name}`,

      html: `
        <div style="
          max-width:700px;
          margin:auto;
          font-family:Arial,sans-serif;
          border:1px solid #e5e7eb;
          border-radius:16px;
          overflow:hidden;
        ">

          <div style="
            background:linear-gradient(to right,#14b8a6,#06b6d4);
            padding:25px;
            text-align:center;
            color:white;
          ">
            <h1 style="margin:0;font-size:28px;">
              New Test Booking
            </h1>

            <p style="margin-top:10px;font-size:16px;">
              LabCare Appointment Notification
            </p>
          </div>

          <div style="padding:30px;background:#ffffff;">

            <table style="
              width:100%;
              border-collapse:collapse;
            ">

              <tr>
                <td style="
                  padding:14px;
                  font-weight:bold;
                  border-bottom:1px solid #f1f5f9;
                ">
                  Patient Name
                </td>

                <td style="
                  padding:14px;
                  border-bottom:1px solid #f1f5f9;
                ">
                  ${name}
                </td>
              </tr>

              <tr>
                <td style="
                  padding:14px;
                  font-weight:bold;
                  border-bottom:1px solid #f1f5f9;
                ">
                  Mobile Number
                </td>

                <td style="
                  padding:14px;
                  border-bottom:1px solid #f1f5f9;
                ">
                  ${mobile}
                </td>
              </tr>

              <tr>
                <td style="
                  padding:14px;
                  font-weight:bold;
                  border-bottom:1px solid #f1f5f9;
                ">
                  City
                </td>

                <td style="
                  padding:14px;
                  border-bottom:1px solid #f1f5f9;
                ">
                  ${city}
                </td>
              </tr>

            </table>
          </div>

          <div style="
            background:#0f172a;
            color:#cbd5e1;
            text-align:center;
            padding:20px;
            font-size:14px;
          ">
            © 2026 LabCare Diagnostic Services
          </div>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);

    console.log("MAIL SENT =>", info);

    res.status(200).json({
      success: true,
      message: "Booking submitted successfully",
    });
  } catch (error) {
    console.log("MAIL ERROR =>", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server Running On Port ${PORT}`);
});
