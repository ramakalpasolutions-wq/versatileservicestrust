import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const { firstName, lastName, email, message } = await req.json();

    if (!firstName || !email || !message) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), { status: 400 });
    }

    // ✅ Gmail transporter with TLS fix
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      tls: {
        // <— This allows self-signed certificates (fixes "self-signed" error)
        rejectUnauthorized: false,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: "akrishtej@gmail.com", // your receiving email
      subject: `New Contact Form Submission from ${firstName}`,
      text: `
Name: ${firstName} ${lastName}
Email: ${email}

Message:
${message}
      `,
    });

    console.log("✅ Email sent successfully");
    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  } catch (err) {
    console.error("❌ Email failed:", err);
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
