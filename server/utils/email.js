const { Resend } = require('resend');

// Initialize Resend with the provided API key
const resend = new Resend(process.env.RESEND_API_KEY);

const sendReceiptEmail = async (studentDetails, paymentDetails) => {
  const amount = paymentDetails?.amount || 9999;
  const paymentId = paymentDetails?.razorpayPaymentId || 'N/A';
  const paymentDate = new Date().toLocaleDateString('en-IN', {
    day: '2-digit', month: 'long', year: 'numeric'
  });
  const paymentTime = new Date().toLocaleTimeString('en-IN', {
    hour: '2-digit', minute: '2-digit', hour12: true
  });

  const mailOptions = {
    from: 'Glitch Skill Hub <info@glitchedu.online>',
    to: studentDetails.email,
    subject: `✅ Payment Confirmed — Welcome to ${studentDetails.course} | Glitch Skill Hub`,
    html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; background-color: #f4f4f5; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
  <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">
    
    <!-- Header -->
    <div style="background: linear-gradient(135deg, #18181b 0%, #27272a 100%); border-radius: 20px 20px 0 0; padding: 40px 40px 30px; text-align: center;">
      <div style="display: inline-block; background-color: #facc15; width: 56px; height: 56px; border-radius: 14px; line-height: 56px; text-align: center; margin-bottom: 16px;">
        <span style="font-size: 24px; font-weight: 900; color: #18181b; font-style: italic;">G</span>
      </div>
      <h1 style="margin: 0; color: #ffffff; font-size: 22px; font-weight: 800; letter-spacing: -0.5px;">
        GLITCH <span style="color: #facc15;">SKILL HUB</span>
      </h1>
      <p style="color: #a1a1aa; font-size: 11px; text-transform: uppercase; letter-spacing: 3px; margin-top: 6px;">
        Build. Code. Conquer.
      </p>
    </div>

    <!-- Success Banner -->
    <div style="background-color: #ffffff; padding: 0 40px;">
      <div style="background: linear-gradient(135deg, #dcfce7 0%, #f0fdf4 100%); border-radius: 16px; padding: 28px; text-align: center; margin-top: 30px; border: 1px solid #bbf7d0;">
        <div style="font-size: 42px; margin-bottom: 8px;">✅</div>
        <h2 style="margin: 0; color: #15803d; font-size: 20px; font-weight: 800;">Payment Successful!</h2>
        <p style="margin: 8px 0 0; color: #166534; font-size: 13px;">
          Your enrollment has been confirmed
        </p>
      </div>
    </div>

    <!-- Main Content -->
    <div style="background-color: #ffffff; padding: 30px 40px;">
      <p style="color: #3f3f46; font-size: 15px; line-height: 1.7; margin: 0 0 24px;">
        Hi <strong style="color: #18181b;">${studentDetails.name}</strong>,
      </p>
      <p style="color: #3f3f46; font-size: 15px; line-height: 1.7; margin: 0 0 30px;">
        Thank you for choosing <strong style="color: #18181b;">Glitch Skill Hub</strong>! Your payment of 
        <strong style="color: #15803d; font-size: 17px;">₹${amount.toLocaleString('en-IN')}</strong> 
        has been successfully processed. You are now officially enrolled in the program.
      </p>

      <!-- Payment Details Card -->
      <div style="background-color: #fafafa; border: 1px solid #e4e4e7; border-radius: 16px; padding: 28px; margin-bottom: 28px;">
        <h3 style="margin: 0 0 20px; color: #18181b; font-size: 13px; text-transform: uppercase; letter-spacing: 2px; font-weight: 800; border-bottom: 2px solid #facc15; padding-bottom: 12px; display: inline-block;">
          Payment Receipt
        </h3>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 10px 0; color: #71717a; font-size: 13px; border-bottom: 1px solid #f4f4f5;">Student Name</td>
            <td style="padding: 10px 0; color: #18181b; font-size: 13px; font-weight: 600; text-align: right; border-bottom: 1px solid #f4f4f5;">${studentDetails.name}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; color: #71717a; font-size: 13px; border-bottom: 1px solid #f4f4f5;">Email</td>
            <td style="padding: 10px 0; color: #18181b; font-size: 13px; font-weight: 600; text-align: right; border-bottom: 1px solid #f4f4f5;">${studentDetails.email}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; color: #71717a; font-size: 13px; border-bottom: 1px solid #f4f4f5;">Program</td>
            <td style="padding: 10px 0; color: #18181b; font-size: 13px; font-weight: 600; text-align: right; border-bottom: 1px solid #f4f4f5;">${studentDetails.course}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; color: #71717a; font-size: 13px; border-bottom: 1px solid #f4f4f5;">Amount Paid</td>
            <td style="padding: 10px 0; color: #15803d; font-size: 15px; font-weight: 800; text-align: right; border-bottom: 1px solid #f4f4f5;">₹${amount.toLocaleString('en-IN')}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; color: #71717a; font-size: 13px; border-bottom: 1px solid #f4f4f5;">Payment ID</td>
            <td style="padding: 10px 0; color: #18181b; font-size: 12px; font-weight: 600; text-align: right; font-family: monospace; border-bottom: 1px solid #f4f4f5;">${paymentId}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; color: #71717a; font-size: 13px; border-bottom: 1px solid #f4f4f5;">Date & Time</td>
            <td style="padding: 10px 0; color: #18181b; font-size: 13px; font-weight: 600; text-align: right; border-bottom: 1px solid #f4f4f5;">${paymentDate}, ${paymentTime}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; color: #71717a; font-size: 13px;">Status</td>
            <td style="padding: 10px 0; text-align: right;">
              <span style="background-color: #dcfce7; color: #15803d; font-size: 11px; font-weight: 800; padding: 4px 12px; border-radius: 20px; text-transform: uppercase; letter-spacing: 1px;">
                ✓ Confirmed
              </span>
            </td>
          </tr>
        </table>
      </div>

      <!-- What's Next -->
      <div style="background: linear-gradient(135deg, #fefce8 0%, #fffbeb 100%); border: 1px solid #fde68a; border-radius: 16px; padding: 24px; margin-bottom: 28px;">
        <h3 style="margin: 0 0 14px; color: #92400e; font-size: 14px; font-weight: 800;">
          🚀 What Happens Next?
        </h3>
        <ol style="margin: 0; padding-left: 18px; color: #78350f; font-size: 13px; line-height: 2;">
          <li>Our team will verify your enrollment within <strong>24 hours</strong></li>
          <li>You'll receive your <strong>class schedule & access credentials</strong> via WhatsApp/Email</li>
          <li>Join the batch and start your coding journey!</li>
        </ol>
      </div>

      <!-- Divider -->
      <hr style="border: none; border-top: 1px solid #e4e4e7; margin: 28px 0;">

      <!-- Contact Section -->
      <div style="text-align: center; margin-bottom: 10px;">
        <p style="color: #71717a; font-size: 13px; margin: 0 0 16px;">
          Have questions? We're here to help!
        </p>
        <table style="margin: 0 auto; border-collapse: collapse;">
          <tr>
            <td style="padding: 8px 20px; text-align: center;">
              <div style="font-size: 20px; margin-bottom: 4px;">📞</div>
              <a href="tel:+916300127932" style="color: #18181b; font-size: 14px; font-weight: 700; text-decoration: none;">
                +91 6300127932
              </a>
            </td>
            <td style="padding: 8px 20px; text-align: center; border-left: 1px solid #e4e4e7;">
              <div style="font-size: 20px; margin-bottom: 4px;">✉️</div>
              <a href="mailto:info@glitchedu.online" style="color: #18181b; font-size: 14px; font-weight: 700; text-decoration: none;">
                info@glitchedu.online
              </a>
            </td>
          </tr>
        </table>
      </div>
    </div>

    <!-- Footer -->
    <div style="background: linear-gradient(135deg, #18181b 0%, #27272a 100%); border-radius: 0 0 20px 20px; padding: 30px 40px; text-align: center;">
      <p style="color: #facc15; font-size: 12px; font-weight: 800; text-transform: uppercase; letter-spacing: 3px; margin: 0 0 8px;">
        Glitch Skill Hub
      </p>
      <p style="color: #71717a; font-size: 11px; margin: 0 0 4px;">
        Your Future Starts Here — Build. Code. Conquer.
      </p>
      <p style="color: #52525b; font-size: 10px; margin: 12px 0 0;">
        © ${new Date().getFullYear()} Glitch Skill Hub. All rights reserved.
      </p>
      <p style="color: #3f3f46; font-size: 10px; margin: 8px 0 0;">
        This is an automated payment confirmation. Please do not reply to this email.
      </p>
    </div>

  </div>
</body>
</html>
    `,
  };

  try {
    const { data, error } = await resend.emails.send(mailOptions);

    if (error) {
      console.error('❌ Resend API Error:', error.message);
      throw new Error(error.message);
    }

    console.log('✅ Payment receipt email sent to:', studentDetails.email, 'Data:', data);
  } catch (error) {
    console.error('❌ Error sending email:', error.message);
    throw error;
  }
};

module.exports = { sendReceiptEmail };

