package com.portfolio.com;

import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = {"http://localhost:3000", "https://my-app-frontend-two.vercel.app"})  // Allow both local dev and deployed frontend
@RestController
@RequestMapping("/contact")
public class ContactController {

    private final EmailService emailService;

    public ContactController(EmailService emailService) {
        this.emailService = emailService;
    }

    @PostMapping("/send-email")
    public String sendEmail(@RequestBody ContactRequest request) {
        emailService.sendEmail(request);
        return "Email sent successfully!";
    }
}