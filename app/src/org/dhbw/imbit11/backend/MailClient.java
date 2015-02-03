package org.dhbw.imbit11.backend;

import java.util.Properties;

import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.AddressException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import javax.servlet.http.HttpServlet;

/**
 * General Class which provides mail sending functionality
 * Usage with sendMail function as documented.
 * 
 * @author benste
 * 
 * @version 2.1
 */
public class MailClient extends HttpServlet
{
	 static final long serialVersionUID = 1L;
	 
	 	/**
	 	 * Function which sends a specified email with the installed mail system.
	 	 *
	 	 * 
	 	 * @param toEmail recipient email address
	 	 * @param subject subject of the email
	 	 * @param content text of the mail
	 	 */
	
		public void sendMail(String toEmail, String subject, String content) {
			 //TODO use context params to read email settings
			final String username = "no-reply@brillianCRM.com";
			final String password = "wibi12c";
	 
			Properties props = new Properties();
			props.put("mail.smtp.auth", "true");
			props.put("mail.smtp.starttls.enable", "true");
			props.put("mail.smtp.host", "smtp.1und1.de");
			props.put("mail.smtp.port", "587");
	 
			Session session = Session.getInstance(props,
			  new javax.mail.Authenticator() {
				protected PasswordAuthentication getPasswordAuthentication() {
					return new PasswordAuthentication(username, password);
				}
			  });
	 
			try {
	 
				Message message = new MimeMessage(session);
				message.setFrom(new InternetAddress(username));
				message.setRecipients(Message.RecipientType.TO,
					InternetAddress.parse(toEmail));
				message.setSubject(subject);
				message.setText(content);
			   // messageBodyPart.setText(html, "UTF-8", "html");
	 
				Transport.send(message);
	 
				//System.out.println("Done");
	 
			} catch (AddressException e) {
	        	e.printStackTrace();
				//System.out.println("Sending email failed, uncorrect address.");
	        } catch (MessagingException e) {
	        	e.printStackTrace();
				//System.out.println("Sending email failed, message could not be sent.");
		}
		}
}