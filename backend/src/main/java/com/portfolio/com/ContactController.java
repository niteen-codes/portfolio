package com.portfolio.com;

import org.springframework.web.bind.annotation.*;

@CrossOrigin(originPatterns = {
        "http://localhost:*",
        "http://127.0.0.1:*",
        "https://portfolio-orcin-xi-44.vercel.app"
})
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
