import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

// Send feedback email
export const sendFeedback = async (req, res) => {
  try {
    const { name, email, rating, testimonial, improvements, additionalFeedback } = req.body;

    // Validate required fields
    if (!rating) {
      return res.status(400).json({
        success: false,
        message: 'Rating is required'
      });
    }

    console.log('📧 Sending feedback email...');

    // Create transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Format email content
    const emailContent = `
🎯 NEW FEEDBACK RECEIVED - PLACIFY PLATFORM
═══════════════════════════════════════════

👤 USER INFORMATION:
   Name: ${name || 'Anonymous'}
   Email: ${email || 'Not provided'}

⭐ OVERALL RATING: ${rating}/5 stars

📝 TESTIMONIAL:
${testimonial || 'No testimonial provided'}

🚀 SUGGESTED IMPROVEMENTS:
${improvements && improvements.length > 0 
  ? improvements.map(improvement => `   • ${improvement}`).join('\n')
  : '   • No specific improvements mentioned'
}

💬 ADDITIONAL FEEDBACK:
${additionalFeedback || 'No additional feedback provided'}

═══════════════════════════════════════════
📧 This feedback was submitted through the Placify feedback form.
🕒 Timestamp: ${new Date().toLocaleString()}
    `;

    // Email options
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.FEEDBACK_EMAIL,
      subject: `🎯 New Feedback - ${rating}⭐ Rating from ${name || 'Anonymous User'}`,
      text: emailContent,
      html: emailContent.replace(/\n/g, '<br>')
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);
    
    console.log('✅ Feedback email sent successfully!');

    res.status(200).json({
      success: true,
      message: 'Feedback sent successfully! Thank you for your input.'
    });

  } catch (error) {
    console.error('❌ Error sending feedback email:', error.message);
    res.status(500).json({
      success: false,
      message: 'Failed to send feedback. Please try again later.',
      error: error.message
    });
  }
};

// Test email configuration
export const testEmailConfig = async (req, res) => {
  try {
    console.log('🧪 Testing email configuration...');
    
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
    
    const testMailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.FEEDBACK_EMAIL,
      subject: '✅ Placify Email Test',
      text: 'Email configuration working correctly!',
      html: '<p>✅ <strong>Success!</strong> Email working!</p>'
    };

    await transporter.sendMail(testMailOptions);
    
    console.log('✅ Test email sent successfully!');
    
    res.status(200).json({
      success: true,
      message: 'Email test successful!'
    });

  } catch (error) {
    console.error('❌ Email test failed:', error.message);
    res.status(500).json({
      success: false,
      message: 'Email test failed',
      error: error.message
    });
  }
};
