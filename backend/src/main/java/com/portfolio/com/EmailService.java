package com.portfolio.com;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.MailException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * Email service with dual delivery paths:
 * 1. SMTP (works locally with Gmail App Password)
 * 2. Resend HTTP API fallback (works on cloud platforms like Render)
 *
 * If RESEND_API_KEY is configured, it is used as the PRIMARY sender
 * (since SMTP is blocked on most free-tier cloud hosts).
 * SMTP is used as fallback or when no Resend key is present (local dev).
 */
@Service
public class EmailService {
    private static final Logger logger = LoggerFactory.getLogger(EmailService.class);

    private final JavaMailSender mailSender;
    private final ResendEmailSender resendSender;
    private final boolean resendConfigured;

    private final String recipientEmail;

    public EmailService(
            JavaMailSender mailSender,
            @Value("${spring.mail.username}") String recipientEmail,
            @Value("${resend.api.key:}") String resendApiKey,
            @Value("${resend.from.email:Portfolio Contact <onboarding@resend.dev>}") String resendFromEmail
    ) {
        this.mailSender = mailSender;
        this.recipientEmail = recipientEmail;
        this.resendConfigured = resendApiKey != null && !resendApiKey.isBlank();
        this.resendSender = resendConfigured ? new ResendEmailSender(resendApiKey, resendFromEmail, recipientEmail) : null;

        if (resendConfigured) {
            logger.info("Resend API configured — will use HTTP API as primary email sender");
        } else {
            logger.info("No Resend API key — will use SMTP for email delivery");
        }
    }

    public void sendEmail(ContactRequest request) {
        if (resendConfigured) {
            sendViaResend(request);
        } else {
            sendViaSmtp(request);
        }
    }

    private void sendViaResend(ContactRequest request) {
        try {
            resendSender.sendEmail(request);
            logger.info("Contact email sent via Resend API for sender {}", request.getEmail());
        } catch (Exception e) {
            logger.error("Resend API failed, attempting SMTP fallback: {}", e.getMessage());
            // Try SMTP as fallback
            try {
                sendViaSmtp(request);
            } catch (Exception smtpException) {
                logger.error("Both Resend and SMTP failed for sender {}", request.getEmail());
                throw new IllegalStateException("Unable to deliver email via any available method.", e);
            }
        }
    }

    private void sendViaSmtp(ContactRequest request) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, false, "UTF-8");

            helper.setFrom(recipientEmail);
            helper.setTo(recipientEmail);
            helper.setReplyTo(request.getEmail());
            helper.setSubject("Portfolio Contact: " + request.getName());
            helper.setText(
                    "Name: " + request.getName()
                            + "\nEmail: " + request.getEmail()
                            + "\nMobile: " + request.getMobile()
                            + "\nMessage: " + request.getMessage()
            );

            mailSender.send(message);
            logger.info("Contact email sent via SMTP for sender {}", request.getEmail());
        } catch (MessagingException | MailException e) {
            logger.error("SMTP email failed for {}: {}", recipientEmail, e.getMessage(), e);
            throw new IllegalStateException("SMTP delivery failed.", e);
        }
    }
}
