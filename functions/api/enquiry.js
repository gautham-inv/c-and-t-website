/**
 * Cloudflare Pages Function backing the "Get in touch" enquiry modal
 * (components/forms/EnquiryModal.tsx). The site is a static export with no
 * Next.js server, so form delivery has to happen here instead of an API route.
 *
 * Sends the submission as an email via Resend (https://resend.com).
 * Required environment (Pages project → Settings → Environment variables):
 *   RESEND_API_KEY    — secret, from the Resend dashboard
 *   CONTACT_TO_EMAIL  — inbox that should receive enquiries
 *   CONTACT_FROM_EMAIL — optional, e.g. "C&T Website <enquiries@yourdomain.com>";
 *                         defaults to Resend's shared sandbox sender, which
 *                         only delivers to the address on the Resend account
 *                         until a sending domain is verified.
 */

const MAX_ATTACHMENT_BYTES = 35 * 1024 * 1024;

export async function onRequestPost(context) {
  const { request, env } = context;

  if (!env.RESEND_API_KEY || !env.CONTACT_TO_EMAIL) {
    console.error("[enquiry] missing RESEND_API_KEY or CONTACT_TO_EMAIL");
    return json({ error: "Form is not configured yet." }, 500);
  }

  let form;
  try {
    form = await request.formData();
  } catch {
    return json({ error: "Invalid form submission." }, 400);
  }

  const get = (key) => String(form.get(key) ?? "").trim();
  const company = get("company");
  const email = get("email");
  const phone = get("phone");
  const projectType = get("projectType");
  const message = get("message");
  const file = form.get("file");

  if (!company || !email || !phone || !projectType || !message) {
    return json({ error: "Missing required fields." }, 400);
  }
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return json({ error: "Invalid email address." }, 400);
  }

  const attachments = [];
  if (file instanceof File && file.size > 0) {
    if (file.size > MAX_ATTACHMENT_BYTES) {
      return json({ error: "Attachment too large." }, 400);
    }
    attachments.push({
      filename: file.name,
      content: arrayBufferToBase64(await file.arrayBuffer()),
    });
  }

  const html = `
    <h2>New project enquiry</h2>
    <p><strong>Company:</strong> ${escapeHtml(company)}</p>
    <p><strong>Email:</strong> ${escapeHtml(email)}</p>
    <p><strong>Phone:</strong> ${escapeHtml(phone)}</p>
    <p><strong>Project type:</strong> ${escapeHtml(projectType)}</p>
    <p><strong>Message:</strong><br>${escapeHtml(message).replace(/\n/g, "<br>")}</p>
  `.trim();

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: env.CONTACT_FROM_EMAIL || "C&T Website <onboarding@resend.dev>",
      to: [env.CONTACT_TO_EMAIL],
      reply_to: email,
      subject: `New enquiry from ${company}`,
      html,
      attachments: attachments.length ? attachments : undefined,
    }),
  });

  if (!res.ok) {
    console.error("[enquiry] Resend error", res.status, await res.text());
    return json({ error: "Failed to send email." }, 502);
  }

  return json({ ok: true });
}

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

function escapeHtml(s) {
  const map = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };
  return s.replace(/[&<>"']/g, (c) => map[c]);
}

function arrayBufferToBase64(buf) {
  let binary = "";
  const bytes = new Uint8Array(buf);
  const chunk = 0x8000;
  for (let i = 0; i < bytes.length; i += chunk) {
    binary += String.fromCharCode(...bytes.subarray(i, i + chunk));
  }
  return btoa(binary);
}
