
export const otpTemplate = (otp) => `
<div style="font-family: 'Segoe UI', sans-serif; background:#f9fafb; padding:20px;">
  <div style="max-width:500px; margin:auto; background:white; padding:20px; border-radius:10px;">
    
    <h2 style="text-align:center; color:#111;">🔐 Inventory System</h2>
    
    <p style="font-size:16px;">Use the OTP below to continue:</p>

    <div style="
      text-align:center;
      font-size:28px;
      letter-spacing:5px;
      font-weight:bold;
      margin:20px 0;
      color:#2563eb;
    ">
      ${otp}
    </div>

    <p>This OTP expires in <b>5 minutes</b>.</p>

    <hr />
    <p style="font-size:12px; color:gray;">
      If you didn’t request this, please ignore.
    </p>
  </div>
</div>
`;