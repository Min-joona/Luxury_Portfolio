const nodemailer = require('nodemailer');

let transporter = null;

function getTransporter() {
  if (transporter) return transporter;

  if (process.env.GMAIL_USER && process.env.GMAIL_PASS) {
    transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS
      }
    });
  }
  return transporter;
}

async function sendNotification({ subject, text, html }) {
  const t = getTransporter();
  if (!t || !process.env.NOTIFY_EMAIL) return;

  try {
    await t.sendMail({
      from: `"Portfolio" <${process.env.GMAIL_USER}>`,
      to: process.env.NOTIFY_EMAIL,
      subject: `[Portfolio] ${subject}`,
      text,
      html
    });
  } catch (err) {
    console.error('Email send failed:', err.message);
  }
}

function notifyContact({ name, email, message }) {
  return sendNotification({
    subject: `New message from ${name}`,
    text: `From: ${name} (${email})\n\nMessage:\n${message}`,
    html: `<h2>New Contact Message</h2>
<p><strong>Name:</strong> ${name}</p>
<p><strong>Email:</strong> ${email}</p>
<p><strong>Message:</strong></p>
<p>${message}</p>`
  });
}

function notifyBlogLike(blogTitle, slug) {
  return sendNotification({
    subject: `Blog liked: ${blogTitle}`,
    text: `Someone liked your blog "${blogTitle}".\nhttps://amar-shesheno-luxury.vercel.app/blog/${slug}`,
    html: `<h2>Blog Liked ❤️</h2>
<p>Someone liked <strong>${blogTitle}</strong></p>
<p><a href="https://amar-shesheno-luxury.vercel.app/blog/${slug}">View blog</a></p>`
  });
}

function notifyBlogComment(blogTitle, slug, { name, comment }) {
  return sendNotification({
    subject: `New comment on: ${blogTitle}`,
    text: `${name} commented on "${blogTitle}":\n\n${comment}`,
    html: `<h2>New Comment</h2>
<p><strong>${name}</strong> commented on <strong>${blogTitle}</strong>:</p>
<p><em>${comment}</em></p>
<p><a href="https://amar-shesheno-luxury.vercel.app/blog/${slug}">View blog</a></p>`
  });
}

module.exports = { notifyContact, notifyBlogLike, notifyBlogComment, sendNotification };
