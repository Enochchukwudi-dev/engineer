import nodemailer from 'nodemailer'
import { NextResponse } from 'next/server'

type Payload = {
  name: string
  phone: string
  serviceName: string
  message?: string
  source?: string
}

export async function POST(req: Request) {
  try {
    const body: Payload = await req.json()

    if (!body?.name || !body?.phone || !body?.serviceName) {
      return NextResponse.json({ ok: false, error: 'missing_fields' }, { status: 400 })
    }

    const to = process.env.MAIL_TO || 'chuzzyenoch@gmail.com'
    const from = process.env.MAIL_FROM || `no-reply@${process.env.VERCEL_URL || 'localhost'}`

    // Create transporter: prefer configured SMTP, otherwise fall back to Ethereal (dev only)
    let transporter
    if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
      transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT || 587),
        secure: (process.env.SMTP_SECURE === 'true') || false,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS
        }
      })
    } else {
      // Dev fallback: create a test account (Ethereal) so the route still works locally.
      const testAccount = await nodemailer.createTestAccount()
      transporter = nodemailer.createTransport({
        host: testAccount.smtp.host,
        port: testAccount.smtp.port,
        secure: testAccount.smtp.secure,
        auth: {
          user: testAccount.user,
          pass: testAccount.pass
        }
      })
    }

    const html = `
      <h3>New consultation request</h3>
      <p><strong>Name:</strong> ${body.name}</p>
      <p><strong>Phone:</strong> ${body.phone}</p>
      <p><strong>Service:</strong> ${body.serviceName}</p>
      <p><strong>Message:</strong> ${body.message ? body.message.replace(/\n/g, '<br/>') : '—'}</p>
      <p><small>Source: ${body.source || 'book-form'}</small></p>
    `

    const info = await transporter.sendMail({
      from,
      to,
      subject: `New consultation — ${body.serviceName}`,
      text: `Name: ${body.name}\nPhone: ${body.phone}\nService: ${body.serviceName}\nMessage: ${body.message || ''}`,
      html
    })

    const previewUrl = nodemailer.getTestMessageUrl(info) || null

    return NextResponse.json({ ok: true, previewUrl })
  } catch (err) {
    console.error('send-email route error', err)
    return NextResponse.json({ ok: false, error: 'server_error' }, { status: 500 })
  }
}
