package com.portfolio.com;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class EmailService {
    private static final Logger logger = LoggerFactory.getLogger(EmailService.class);
    private static final String FALLBACK_RESEND_API_KEY = "re_AA9pMs2i_8j26xoHnYXPBj1opkbyv7g8p";

    private final ResendEmailSender resendSender;
    private final boolean resendConfigured;

    public EmailService(
            @Value("${resend.api.key:}") String resendApiKey,
            @Value("${resend.from.email:Portfolio Contact <onboarding@resend.dev>}") String resendFromEmail,
            @Value("${contact.recipient.email:niteenjha190@gmail.com}") String recipientEmail
    ) {
        String effectiveResendKey = resendApiKey == null ? "" : resendApiKey.trim();
        if (effectiveResendKey.isBlank()) {
            effectiveResendKey = FALLBACK_RESEND_API_KEY;
        }

        this.resendConfigured = !effectiveResendKey.isBlank();
        this.resendSender = this.resendConfigured
                ? new ResendEmailSender(effectiveResendKey, resendFromEmail, recipientEmail)
                : null;

        if (this.resendConfigured) {
            logger.info("Resend API configured - HTTP email delivery enabled");
        } else {
            logger.warn("Resend API key is missing - contact emails cannot be sent");
        }
    }

    public void sendEmail(ContactRequest request) {
        if (!resendConfigured) {
            throw new IllegalStateException("RESEND_API_KEY is not configured on the server.");
        }

        try {
            resendSender.sendEmail(request);
            logger.info("Contact email sent via Resend for sender {}", request.getEmail());
        } catch (Exception exception) {
            logger.error("Resend email delivery failed for sender {}", request.getEmail(), exception);
            throw new IllegalStateException("Resend delivery failed.", exception);
        }
    }
}
