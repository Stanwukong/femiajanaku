"use server";

import { Resend } from "resend";
import { SITE } from "@/data/site";

const resend = new Resend(process.env.RESEND_API_KEY);

type ContactFormState = {
  success: boolean;
  error?: string;
};

export async function sendContactEmail(
  _prev: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const subject = formData.get("subject") as string;
  const message = formData.get("message") as string;

  if (!name || !email || !subject || !message) {
    return { success: false, error: "All fields are required." };
  }

  const subjectMap: Record<string, string> = {
    freelance: "Freelance Project",
    collaboration: "Collaboration",
    job: "Job Opportunity",
    other: "Other",
  };

  try {
    await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: SITE.email,
      replyTo: email,
      subject: `[Portfolio] ${subjectMap[subject] || subject} — ${name}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #f59e0b; border-bottom: 2px solid #f59e0b; padding-bottom: 8px;">
            New message from your portfolio
          </h2>
          <table style="width: 100%; border-collapse: collapse; margin: 16px 0;">
            <tr>
              <td style="padding: 8px 0; font-weight: bold; width: 80px; vertical-align: top;">From</td>
              <td style="padding: 8px 0;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; vertical-align: top;">Email</td>
              <td style="padding: 8px 0;"><a href="mailto:${email}">${email}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; vertical-align: top;">Topic</td>
              <td style="padding: 8px 0;">${subjectMap[subject] || subject}</td>
            </tr>
          </table>
          <div style="background: #f9fafb; border-radius: 8px; padding: 16px; margin-top: 8px;">
            <p style="margin: 0; white-space: pre-wrap; line-height: 1.6;">${message}</p>
          </div>
          <p style="color: #9ca3af; font-size: 12px; margin-top: 24px;">
            Sent from femiajanaku.vercel.app
          </p>
        </div>
      `,
    });

    return { success: true };
  } catch {
    return {
      success: false,
      error: "Failed to send message. Please try again or email me directly.",
    };
  }
}
