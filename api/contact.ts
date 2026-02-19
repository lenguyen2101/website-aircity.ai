import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);
const NOTIFICATION_EMAIL = process.env.NOTIFICATION_EMAIL || 'hello@aircity.ai';

// ── Simple in-memory rate limiting ──────────────────────────────────
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX = 5; // max 5 requests per IP per min

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return false;
  }

  entry.count++;
  return entry.count > RATE_LIMIT_MAX;
}

// ── HTML sanitization (prevent XSS in email) ────────────────────────
function sanitize(str: string | undefined): string {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// ── Email validation ────────────────────────────────────────────────
function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// ── Handler ─────────────────────────────────────────────────────────
export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Rate limiting
  const clientIp = (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() || 'unknown';
  if (isRateLimited(clientIp)) {
    return res.status(429).json({ error: 'Too many requests. Please try again later.' });
  }

  try {
    const { name, phone, email, service, message, _honey } = req.body;

    // Honeypot — if this hidden field has a value, it's a bot
    if (_honey) {
      // Silently accept but don't send email (fool the bot)
      return res.status(200).json({ success: true });
    }

    // Validation
    if (!name || !email) {
      return res.status(400).json({ error: 'Name and email are required' });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({ error: 'Invalid email address' });
    }

    // Sanitize all user inputs before embedding in HTML
    const safeName = sanitize(name);
    const safePhone = sanitize(phone);
    const safeEmail = sanitize(email);
    const safeMessage = sanitize(message);

    // Map service values to readable labels
    const serviceLabels: Record<string, string> = {
      'smart-building': 'Quản lý tòa nhà thông minh',
      'face-id': 'Nhận diện khuôn mặt (Face ID)',
      'iot': 'IoT & Thiết bị thông minh',
      'consulting': 'Tư vấn giải pháp',
    };

    const serviceLabel = serviceLabels[service] || sanitize(service) || 'Không chọn';

    // Send notification email
    const { data, error } = await resend.emails.send({
      from: 'AirCity Website <onboarding@resend.dev>',
      to: [NOTIFICATION_EMAIL],
      subject: `[AirCity Contact] Liên hệ mới từ ${safeName}`,
      html: `
        <div style="font-family: system-ui, -apple-system, sans-serif; max-width: 600px; margin: 0 auto; background: #0a0a0f; color: #e2e8f0; padding: 32px; border-radius: 12px;">
          <div style="border-bottom: 1px solid #1e293b; padding-bottom: 16px; margin-bottom: 24px;">
            <h1 style="color: #22d3ee; font-size: 20px; margin: 0;">🏢 Liên hệ mới từ website AirCity</h1>
          </div>
          
          <table style="width: 100%; border-collapse: collapse;">
            <tr style="border-bottom: 1px solid #1e293b;">
              <td style="padding: 12px 0; color: #94a3b8; font-size: 13px; width: 120px;">Họ tên</td>
              <td style="padding: 12px 0; color: #f1f5f9; font-weight: 600;">${safeName}</td>
            </tr>
            <tr style="border-bottom: 1px solid #1e293b;">
              <td style="padding: 12px 0; color: #94a3b8; font-size: 13px;">Số điện thoại</td>
              <td style="padding: 12px 0; color: #f1f5f9;">${safePhone || 'Không cung cấp'}</td>
            </tr>
            <tr style="border-bottom: 1px solid #1e293b;">
              <td style="padding: 12px 0; color: #94a3b8; font-size: 13px;">Email</td>
              <td style="padding: 12px 0;"><a href="mailto:${safeEmail}" style="color: #22d3ee; text-decoration: none;">${safeEmail}</a></td>
            </tr>
            <tr style="border-bottom: 1px solid #1e293b;">
              <td style="padding: 12px 0; color: #94a3b8; font-size: 13px;">Dịch vụ</td>
              <td style="padding: 12px 0; color: #f1f5f9;">${serviceLabel}</td>
            </tr>
            ${safeMessage ? `
            <tr>
              <td style="padding: 12px 0; color: #94a3b8; font-size: 13px; vertical-align: top;">Nội dung</td>
              <td style="padding: 12px 0; color: #f1f5f9; line-height: 1.6;">${safeMessage.replace(/\n/g, '<br>')}</td>
            </tr>
            ` : ''}
          </table>
          
          <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid #1e293b; color: #64748b; font-size: 11px;">
            Gửi từ aircity.ai contact form • ${new Date().toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' })}
          </div>
        </div>
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return res.status(500).json({ error: 'Failed to send email' });
    }

    return res.status(200).json({ success: true, id: data?.id });
  } catch (err) {
    console.error('Server error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
