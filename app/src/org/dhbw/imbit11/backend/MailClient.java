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

public class MailClient extends HttpServlet
{
	 static final long serialVersionUID = 1L;
	 
		public void sendMail(String toEmail, String subject, String content) {
	 
			final String username = "kirby@mknipf.de";
			final String password = "imbit2011B";
	 
			Properties props = new Properties();
			props.put("mail.smtp.auth", "true");
			props.put("mail.smtp.starttls.enable", "true");
			props.put("mail.smtp.host", "mail.mknipf.de");
			props.put("mail.smtp.port", "25");
	 
			Session session = Session.getInstance(props,
			  new javax.mail.Authenticator() {
				protected PasswordAuthentication getPasswordAuthentication() {
					return new PasswordAuthentication(username, password);
				}
			  });
	 
			try {
	 
				Message message = new MimeMessage(session);
				message.setFrom(new InternetAddress("kirby@mknipf.de"));
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

/**
  @Override
  protected void doGet(HttpServletRequest request, 
  HttpServletResponse response) throws ServletException, IOException
  {
       processRequest(request, response);
  } 

  @Override
  protected void doPost(HttpServletRequest request, 
  HttpServletResponse response)  throws ServletException, IOException
  {
       processRequest(request, response);
  }

  @Override
  public String getServletInfo()
  {
       return "Short description";
  }*/

}