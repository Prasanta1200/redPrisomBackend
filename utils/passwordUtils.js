function generateOTP() {
    // Define the length of the OTP code
    const otpLength = 6;
  
    // Generate a random OTP code
    let otp = '';
    const characters = '0123456789';
    const charactersLength = characters.length;
  
    for (let i = 0; i < otpLength; i++) {
      otp += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
  
    // Return the generated OTP code
    return otp;
  }
  
  module.exports = { generateOTP };
  