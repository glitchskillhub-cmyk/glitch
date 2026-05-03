const Razorpay = require('razorpay');
const crypto = require('crypto');
const Payment = require('../models/Payment');
const Student = require('../models/Student');
const { sendReceiptEmail } = require('../utils/email');

// Lazy initialization — ensures env vars are loaded before creating the instance
let razorpayInstance = null;
const getRazorpay = () => {
  if (!razorpayInstance) {
    console.log('Initializing Razorpay with key:', process.env.RAZORPAY_KEY_ID ? '✅ Present' : '❌ MISSING');
    razorpayInstance = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });
  }
  return razorpayInstance;
};

// Create Razorpay Order
exports.createOrder = async (req, res, next) => {
  try {
    // Check if Razorpay keys are configured
    if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
      console.error('❌ RAZORPAY_KEY_ID or RAZORPAY_KEY_SECRET is missing from environment variables!');
      return res.status(500).json({ 
        success: false, 
        message: 'Payment gateway is not configured. Please contact support.' 
      });
    }

    const { studentId, course } = req.body;
    console.log('Creating order for student:', studentId, 'course:', course);

    const amountInPaise = 999900; // ₹9,999 = 999,900 paise
    const options = {
      amount: amountInPaise,
      currency: 'INR',
      receipt: `rcpt_${studentId.toString().slice(-14)}_${Date.now().toString().slice(-4)}`,
    };
    
    console.log('Razorpay order options:', options);
    const order = await getRazorpay().orders.create(options);
    console.log('Razorpay order created:', order.id);

    // Create pending payment record
    await Payment.create({
      studentId,
      amount: 9999, // ₹9,999
      razorpayOrderId: order.id,
      status: 'Pending'
    });

    res.json({ success: true, order });
  } catch (error) {
    console.error('❌ Create Order Error:', error.message || error);
    res.status(500).json({ 
      success: false, 
      message: error.message || 'Failed to create payment order. Please try again.' 
    });
  }
};

// Verify Razorpay Payment
exports.verifyPayment = async (req, res, next) => {
  try {
    const { razorpayOrderId, razorpayPaymentId, razorpaySignature, studentId } = req.body;

    const body = razorpayOrderId + '|' + razorpayPaymentId;
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest('hex');

    if (expectedSignature === razorpaySignature) {
      const updatedPayment = await Payment.findOneAndUpdate(
        { razorpayOrderId },
        { razorpayPaymentId, razorpaySignature, status: 'Paid' },
        { new: true }
      );
      
      const student = await Student.findById(studentId);
      if (student) {
        await sendReceiptEmail(student, updatedPayment);
        
        // Find user by email and mark as enrolled
        const User = require('../models/User');
        const Enrollment = require('../models/Enrollment');
        const Course = require('../models/Course');

        const user = await User.findOneAndUpdate(
          { email: student.email.toLowerCase() },
          { isEnrolled: true },
          { new: true }
        );

        if (user) {
          // Find the course object by title
          const courseObj = await Course.findOne({ title: student.course });
          if (courseObj) {
            await Enrollment.create({
              student: user._id,
              course: courseObj._id,
              status: 'ongoing'
            });
          } else {
            // Fallback if course model doesn't match string exactly
            // You might want to seed courses first
          }
        }
      }
      
      res.json({ success: true, message: 'Payment verified successfully.' });
    } else {
      await Payment.findOneAndUpdate(
        { razorpayOrderId },
        { status: 'Failed' }
      );
      res.status(400).json({ success: false, message: 'Payment verification failed.' });
    }
  } catch (error) {
    next(error);
  }
};
