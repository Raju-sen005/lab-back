import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());



app.get("/", (req, res) => {
  res.send("Lab Backend Running...");
});

app.post("/api/book-test", async (req, res) => {
  try {
    const { name, mobile, city, test, collectionType } = req.body;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL,

      to: process.env.EMAIL,

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

          <!-- HEADER -->

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

          <!-- BODY -->

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

          <!-- FOOTER -->

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

    await transporter.sendMail(mailOptions);

    res.status(200).json({
      success: true,
      message: "Booking submitted successfully",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server Running On Port ${PORT}`);
});
