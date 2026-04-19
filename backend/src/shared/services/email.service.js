import SibApiV3Sdk from "sib-api-v3-sdk";
import { otpTemplate } from "../utils/emailTemplate.js";
import { config } from "../config/env.js";

const client = SibApiV3Sdk.ApiClient.instance;
const apiKey = client.authentications["api-key"];

apiKey.apiKey = config.BREVO_API_KEY; // ✅ FIXED

const tranEmailApi = new SibApiV3Sdk.TransactionalEmailsApi();

export const sendOTP = async (email, otp) => {
  try {
    await tranEmailApi.sendTransacEmail({
      sender: {
        email: config.BREVO_SENDER,
        name: "Inventory System"
      },
      to: [{ email }],
      subject: "Your OTP Code",
      htmlContent: otpTemplate(otp)
    });

    console.log("✅ OTP email sent via Brevo");
  } catch (error) {
    console.error("❌ Brevo Error:", error.response?.body || error.message);
    throw new Error("Email sending failed");
  }
};