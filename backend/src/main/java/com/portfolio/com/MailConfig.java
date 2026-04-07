package com.portfolio.com;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;

import java.util.Properties;

@Configuration
public class MailConfig {

    @Bean
    public JavaMailSender javaMailSender(
            @Value("${spring.mail.host:smtp.gmail.com}") String host,
            @Value("${spring.mail.port:465}") int port,
            @Value("${spring.mail.username}") String username,
            @Value("${spring.mail.password}") String password,
            @Value("${spring.mail.protocol:smtps}") String protocol,
            @Value("${spring.mail.properties.mail.smtp.auth:true}") String auth,
            @Value("${spring.mail.properties.mail.smtp.ssl.enable:true}") String sslEnable,
            @Value("${spring.mail.properties.mail.smtp.ssl.trust:smtp.gmail.com}") String sslTrust,
            @Value("${spring.mail.properties.mail.smtp.connectiontimeout:15000}") String connectionTimeout,
            @Value("${spring.mail.properties.mail.smtp.timeout:15000}") String timeout,
            @Value("${spring.mail.properties.mail.smtp.writetimeout:15000}") String writeTimeout
    ) {
        JavaMailSenderImpl sender = new JavaMailSenderImpl();
        sender.setHost(host);
        sender.setPort(port);
        sender.setUsername(username);
        sender.setProtocol(protocol);

        // Gmail app passwords are often copied with spaces; normalize to 16-char token form.
        String normalizedPassword = password == null ? "" : password.replaceAll("\\s+", "");
        sender.setPassword(normalizedPassword);

        Properties props = sender.getJavaMailProperties();
        props.put("mail.transport.protocol", protocol);
        props.put("mail.smtp.auth", auth);
        props.put("mail.smtp.ssl.enable", sslEnable);
        props.put("mail.smtp.ssl.trust", sslTrust);
        props.put("mail.smtp.connectiontimeout", connectionTimeout);
        props.put("mail.smtp.timeout", timeout);
        props.put("mail.smtp.writetimeout", writeTimeout);
        props.put("mail.smtps.auth", auth);
        props.put("mail.smtps.ssl.enable", sslEnable);
        props.put("mail.smtps.ssl.trust", sslTrust);
        props.put("mail.smtps.connectiontimeout", connectionTimeout);
        props.put("mail.smtps.timeout", timeout);
        props.put("mail.smtps.writetimeout", writeTimeout);

        return sender;
    }
}
