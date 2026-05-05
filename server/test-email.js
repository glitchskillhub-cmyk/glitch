const dotenv = require('dotenv');
const path = require('path');
dotenv.config({ path: path.join(__dirname, '.env') });

const { sendReceiptEmail } = require('./utils/email');

const testStudent = {
  name: 'Tarun (Test)',
  email: 'tarun.raiseup@gmail.com',
  course: 'Node.js Full Stack Development'
};

const testPayment = {
  amount: 9999,
  razorpayPaymentId: 'pay_TEST_123456789'
};

console.log('Sending test email to:', testStudent.email);
console.log('Using EMAIL_USER:', process.env.EMAIL_USER);

sendReceiptEmail(testStudent, testPayment)
  .then(() => {
    console.log('✅ Test email sent successfully!');
    process.exit(0);
  })
  .catch((err) => {
    console.error('❌ Failed to send test email:', err.message);
    process.exit(1);
  });
