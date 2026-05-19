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

    const { studentId, course, paymentType } = req.body;
    console.log('Creating order for student:', studentId, 'course:', course, 'type:', paymentType);

    // Look up course price dynamically from the DB
    const Course = require('../models/Course');
    const courseObj = await Course.findOne({ title: course });
    
    let price = courseObj && courseObj.price ? Number(courseObj.price) : 9999;
    const slotPrice = courseObj && courseObj.slotPrice ? Number(courseObj.slotPrice) : 3000;
    
    if (paymentType === 'slot') {
      price = slotPrice;
    } else if (paymentType === 'due') {
      const Student = require('../models/Student');
      const student = await Student.findById(studentId);
      if (student) {
        const payments = await Payment.find({ studentId: student._id, status: 'Paid' });
        const totalPaid = payments.reduce((sum, p) => sum + (p.amount || 0), 0);
        price = price - totalPaid;
        if (price < 0) price = 0;
      }
    }
    
    console.log(`- Course: ${course} | Type: ${paymentType} | Price detected: ${price}`);

    const amountInPaise = Math.round(price * 100); // Charge in paise (using Math.round to avoid float errors)
    const options = {
      amount: amountInPaise,
      currency: 'INR',
      receipt: `rcpt_${studentId.toString().slice(-14)}_${Date.now().toString().slice(-4)}`,
    };
    
    console.log('Razorpay order options:', options);
    const order = await getRazorpay().orders.create(options);
    console.log('Razorpay order created:', order.id);

    // Create pending payment record with dynamic price
    await Payment.create({
      studentId,
      amount: price,
      razorpayOrderId: order.id,
      status: 'Pending'
    });

    res.json({ success: true, order });
  } catch (error) {
    console.error('❌ Create Order Error:', error);
    // Capture specific Razorpay error details if available
    const errorMessage = error.error?.description || error.message || 'Failed to create payment order.';
    res.status(500).json({ 
      success: false, 
      message: errorMessage,
      details: error.error || error
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
      
      const student = await Student.findByIdAndUpdate(
        studentId,
        { status: 'Active' },
        { new: true }
      );

      if (student) {
        // Send payment confirmation email
        console.log('⏳ Attempting to send receipt email to:', student.email);
        sendReceiptEmail(student, updatedPayment).catch(err => 
          console.error('❌ Email sending failed:', err.message)
        );
        
        // Find user by email and mark as enrolled
        const User = require('../models/User');
        const Enrollment = require('../models/Enrollment');
        const Course = require('../models/Course');

        let user = await User.findOne({ email: student.email.toLowerCase() });

        if (!user) {
          // Automatically create the student User account if it doesn't exist yet
          console.log(`🌱 Auto-creating User account for paid student: ${student.email}`);
          user = await User.create({
            name: student.name,
            email: student.email.toLowerCase(),
            password: 'student@123', // Standard default student password
            phone: student.phone,
            role: 'student',
            isVerified: true,
            isEnrolled: true
          });
        } else {
          user.isEnrolled = true;
          await user.save();
        }

        if (user) {
          const courseObj = await Course.findOne({ title: student.course });
          if (courseObj) {
            // Check if enrollment already exists to avoid duplicates
            const existingEnrollment = await Enrollment.findOne({ student: user._id, course: courseObj._id });
            if (!existingEnrollment) {
              await Enrollment.create({
                student: user._id,
                course: courseObj._id,
                status: 'ongoing'
              });
            }
          }
        }
      }
      
      return res.json({ success: true, message: 'Payment verified successfully.' });
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
