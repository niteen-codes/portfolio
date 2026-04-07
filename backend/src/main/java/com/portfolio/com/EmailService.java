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

    private final JavaMailSender mailSender;

    @Value("${spring.mail.username}")
    private String recipientEmail;

    public EmailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public void sendEmail(ContactRequest request) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, false, "UTF-8");

            helper.setFrom(recipientEmail);
            helper.setTo(recipientEmail);
            helper.setReplyTo(request.getEmail());
            helper.setSubject("New Contact Form Submission");
            helper.setText(
                    "Name: " + request.getName()
                            + "\nEmail: " + request.getEmail()
                            + "\nMobile: " + request.getMobile()
                            + "\nMessage: " + request.getMessage()
            );

            mailSender.send(message);
        } catch (MessagingException | MailException e) {
            logger.error("Failed to send contact email to {}: {}", recipientEmail, e.getMessage(), e);
            throw new IllegalStateException("Unable to deliver message right now.", e);
        }
    }
}
