/**
 * Cloudflare Pages Function backing the job-application modal
 * (components/forms/ApplyModal.tsx). The site is a static export with no
 * Next.js server, so form delivery has to happen here instead of an API route.
 *
 * Sends the application as an email via Resend (https://resend.com), same
 * approach as functions/api/enquiry.js but routed to HR instead of sales.
 * Required environment (Pages project → Settings → Environment variables):
 *   RESEND_API_KEY     — secret, shared with enquiry.js
 *   HR_TO_EMAIL         — inbox that should receive applications
 *   CONTACT_FROM_EMAIL — optional, shared sender identity with enquiry.js;
 *                         defaults to Resend's shared sandbox sender, which
 *                         only delivers to the address on the Resend account
 *                         until a sending domain is verified.
 */

const MAX_ATTACHMENT_BYTES = 25 * 1024 * 1024;

export async function onRequestPost(context) {
  const { request, env } = context;

  if (!env.RESEND_API_KEY || !env.HR_TO_EMAIL) {
    console.error("[apply] missing RESEND_API_KEY or HR_TO_EMAIL");
    return json({ error: "Form isn't set up yet." }, 500);
  }

  let form;
  try {
    form = await request.formData();
  } catch {
    return json({ error: "Invalid form submission." }, 400);
  }

  const get = (key) => String(form.get(key) ?? "").trim();
  const role = get("role");
  const name = get("name");
  const email = get("email");
  const phone = get("phone");
  const linkedin = get("linkedin");
  const message = get("message");
  const resume = form.get("resume");

  if (!name || !email || !phone || !(resume instanceof File) || resume.size === 0) {
    return json({ error: "Missing required fields." }, 400);
  }
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return json({ error: "Invalid email address." }, 400);
  }
  if (resume.size > MAX_ATTACHMENT_BYTES) {
    return json({ error: "Attachment too large." }, 400);
  }

  const attachments = [
    {
      filename: resume.name,
      content: arrayBufferToBase64(await resume.arrayBuffer()),
    },
  ];

  const html = `
    <h2>New job application${role ? ` — ${escapeHtml(role)}` : ""}</h2>
    <p><strong>Name:</strong> ${escapeHtml(name)}</p>
    <p><strong>Email:</strong> ${escapeHtml(email)}</p>
    <p><strong>Phone:</strong> ${escapeHtml(phone)}</p>
    ${linkedin ? `<p><strong>LinkedIn / portfolio:</strong> ${escapeHtml(linkedin)}</p>` : ""}
    ${message ? `<p><strong>Cover note:</strong><br>${escapeHtml(message).replace(/\n/g, "<br>")}</p>` : ""}
  `.trim();

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: env.CONTACT_FROM_EMAIL || "C&T Website <onboarding@resend.dev>",
      to: [env.HR_TO_EMAIL],
      reply_to: email,
      subject: role ? `New application: ${role} — ${name}` : `New application from ${name}`,
      html,
      attachments,
    }),
  });

  if (!res.ok) {
    console.error("[apply] Resend error", res.status, await res.text());
    return json({ error: "Couldn't send the email." }, 502);
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
