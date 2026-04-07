package com.portfolio.com;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

public class ContactRequest {

	@NotBlank(message = "Name is required")
    private String name;

	@NotBlank(message = "Email is required")
	@Email(message = "Email is invalid")
    private String email;

	@NotBlank(message = "Mobile is required")
	@Pattern(regexp = "^[0-9]{10}$", message = "Mobile must be a valid 10-digit number")
    private String mobile;

	@NotBlank(message = "Message is required")
    private String message;

	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getMobile() {
		return mobile;
	}
	public void setMobile(String mobile) {
		this.mobile = mobile;
	}
	public String getMessage() {
		return message;
	}
	public void setMessage(String message) {
		this.message = message;
	}
}
