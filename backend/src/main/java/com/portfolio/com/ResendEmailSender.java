package com.portfolio.com;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.Duration;

/**
 * Sends email via Resend's HTTP API (https://resend.com).
 * This bypasses SMTP entirely and works on all cloud platforms including
 * Render's free tier which blocks outbound SMTP.
 */
public class ResendEmailSender {
    private static final Logger logger = LoggerFactory.getLogger(ResendEmailSender.class);
    private static final String RESEND_API_URL = "https://api.resend.com/emails";

    private final String apiKey;
    private final String fromEmail;
    private final String recipientEmail;
    private final HttpClient httpClient;

    public ResendEmailSender(String apiKey, String fromEmail, String recipientEmail) {
        this.apiKey = apiKey;
        this.fromEmail = fromEmail;
        this.recipientEmail = recipientEmail;
        this.httpClient = HttpClient.newBuilder()
                .connectTimeout(Duration.ofSeconds(15))
                .build();
    }

    public void sendEmail(ContactRequest request) {
        String jsonBody = buildJsonPayload(request);

        HttpRequest httpRequest = HttpRequest.newBuilder()
                .uri(URI.create(RESEND_API_URL))
                .header("Authorization", "Bearer " + apiKey)
                .header("Content-Type", "application/json")
                .POST(HttpRequest.BodyPublishers.ofString(jsonBody))
                .timeout(Duration.ofSeconds(30))
                .build();

        try {
            HttpResponse<String> response = httpClient.send(httpRequest, HttpResponse.BodyHandlers.ofString());
            if (response.statusCode() >= 200 && response.statusCode() < 300) {
                logger.info("Email sent successfully via Resend API (status {})", response.statusCode());
            } else {
                logger.error("Resend API error (status {}): {}", response.statusCode(), response.body());
                throw new RuntimeException("Resend API returned status " + response.statusCode() + ": " + response.body());
            }
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
            throw new RuntimeException("Email send interrupted", e);
        } catch (Exception e) {
            logger.error("Failed to send email via Resend API: {}", e.getMessage(), e);
            throw new RuntimeException("Failed to send email via Resend: " + e.getMessage(), e);
        }
    }

    private String buildJsonPayload(ContactRequest request) {
        String subject = escapeJson("Portfolio Contact: " + request.getName());
        String text = escapeJson(
                "Name: " + request.getName()
                        + "\nEmail: " + request.getEmail()
                        + "\nMobile: " + request.getMobile()
                        + "\nMessage: " + request.getMessage()
        );
        String from = escapeJson(fromEmail);
        String to = escapeJson(recipientEmail);
        String replyTo = escapeJson(request.getEmail());

        return "{\"from\":\"" + from + "\","
                + "\"to\":[\"" + to + "\"],"
                + "\"reply_to\":\"" + replyTo + "\","
                + "\"subject\":\"" + subject + "\","
                + "\"text\":\"" + text + "\"}";
    }

    private String escapeJson(String value) {
        if (value == null) return "";
        return value
                .replace("\\", "\\\\")
                .replace("\"", "\\\"")
                .replace("\n", "\\n")
                .replace("\r", "\\r")
                .replace("\t", "\\t");
    }
}
