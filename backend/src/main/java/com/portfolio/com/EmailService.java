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

@Service
public class EmailService {
    private static final Logger logger = LoggerFactory.getLogger(EmailService.class);
    private static final int MAX_RETRIES = 2;
    private static final long RETRY_DELAY_MS = 2000;

    private final JavaMailSender mailSender;

    @Value("${spring.mail.username}")
    private String recipientEmail;

    public EmailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public void sendEmail(ContactRequest request) {
        Exception lastException = null;

        for (int attempt = 1; attempt <= MAX_RETRIES; attempt++) {
            try {
                logger.info("Sending contact email (attempt {}/{})", attempt, MAX_RETRIES);
                doSendEmail(request);
                logger.info("Contact email sent successfully on attempt {}", attempt);
                return;
            } catch (MessagingException | MailException e) {
                lastException = e;
                logger.warn("Email send attempt {}/{} failed: {}", attempt, MAX_RETRIES, e.getMessage());
                if (attempt < MAX_RETRIES) {
                    try {
                        Thread.sleep(RETRY_DELAY_MS);
                    } catch (InterruptedException ie) {
                        Thread.currentThread().interrupt();
                        break;
                    }
                }
            }
        }

        logger.error("Failed to send contact email after {} attempts to {}: {}",
                MAX_RETRIES, recipientEmail, lastException != null ? lastException.getMessage() : "unknown error", lastException);
        throw new IllegalStateException("Unable to deliver message after " + MAX_RETRIES + " attempts.", lastException);
    }

    private void doSendEmail(ContactRequest request) throws MessagingException {
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
    }
}
