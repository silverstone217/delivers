"use server";

import { RESEND_API_KEY, SITE_NAME } from "@/lib/env";
import { Resend } from "resend";

const resend = new Resend(RESEND_API_KEY);

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function sendContactEmail(formData: {
  name: string;
  email: string;
  message: string;
}) {
  try {
    const replyToEmail = isValidEmail(formData.email);

    if (!replyToEmail) {
      return {
        error: true,
        message: "Email incorrect",
      };
    }

    await resend.emails.send({
      from: "Otekis <contact@otekis.com>",
      to: "servigroup.social@gmail.com",
      subject: `📩 Nouveau message de ${formData.name}, service de : ${SITE_NAME}`,
      replyTo: formData.email,
      html: `
      <div style="font-family: Arial, Helvetica, sans-serif; background-color: #f4f6f8; padding: 40px 0; color: #333;">
        <div style="max-width: 600px; margin: auto; background: #fff; border-radius: 10px; box-shadow: 0 4px 12px rgba(0,0,0,0.05); overflow: hidden;">
          
          <div style="background-color: #007BFF; color: #fff; padding: 20px 30px; text-align: center;">
            <h1 style="margin: 0; font-size: 22px;">Nouveau message reçu 💬</h1>
          </div>

          <div style="padding: 30px;">
            <p style="margin-bottom: 20px;">Bonjour,</p>
            <p style="margin-bottom: 20px;">Vous avez reçu un nouveau message depuis le formulaire de contact de <strong>Delivers.com</strong> :</p>

            <table style="width: 100%; border-collapse: collapse; margin-bottom: 25px;">
              <tr>
                <td style="padding: 8px 0; font-weight: bold; width: 150px;">👤 Nom :</td>
                <td style="padding: 8px 0;">${formData.name}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold;">📧 Email :</td>
                <td style="padding: 8px 0;">
                  ${
                    isValidEmail(formData.email)
                      ? `<a href="mailto:${formData.email}" style="color: #007BFF;">${formData.email}</a>`
                      : `<span style="color:#999;">(Email invalide)</span>`
                  }
                </td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; vertical-align: top;">💬 Message :</td>
                <td style="padding: 8px 0; white-space: pre-line; line-height: 1.5;">${
                  formData.message
                }</td>
              </tr>
            </table>

            <p style="font-size: 14px; color: #666;">
              Vous pouvez répondre directement à cet e-mail pour contacter <strong>${
                formData.name
              }</strong>.
            </p>
          </div>

          <div style="background: #f8f9fa; padding: 20px; text-align: center; font-size: 13px; color: #777;">
            <p style="margin: 0;">📍 Delivers par <strong>SERVI Group</strong></p>
            <p style="margin: 4px 0;">Kinshasa, République Démocratique du Congo</p>
            <p style="margin: 4px 0;">📞 +243 831 718 338 • 🌐 <a href="https://delivers.vercel.app" style="color: #007BFF; text-decoration: none;">delivers.com</a></p>
          </div>

        </div>
      </div>
      `,
    });

    return {
      error: false,
      message: '"Une erreur est survenue. Réessayez plus tard."',
    };
  } catch (error) {
    console.error("Erreur lors de l’envoi de l’email:", error);
    return {
      error: true,
      message: "Une erreur est survenue. Réessayez plus tard.",
    };
  }
}
