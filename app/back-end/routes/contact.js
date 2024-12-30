import express from 'express';
import { Resend } from 'resend';
const router = express.Router();

router.post('/', async (req, res) => {
    try {
        // Validate required fields
        const { name, email, subject, message } = req.body;
        if (!name || !email || !subject || !message) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required'
            });
        }

        // Initialize Resend
        const token_resend = process.env.TOKEN_RESEND;
        const email_resend = process.env.EMAIL_RESEND;
        const resend = new Resend(token_resend);

        // Send email
        await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: email_resend,
            subject: `[${name}] - ${subject}`,
            html: `
                <b>Mail de :</b> ${email}<br><br>
                <b>Message :</b><br>
                ${message}
            `
        });

        return res.status(200).json({
            success: true,
            message: 'Email sent successfully'
        });

    } catch (error) {
        console.error('Contact form error:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal Server Error',
            error: error.message
        });
    }
});

export default router;