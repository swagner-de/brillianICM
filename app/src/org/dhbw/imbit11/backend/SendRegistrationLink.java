package org.dhbw.imbit11.backend;

import java.io.IOException;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.annotation.WebServlet;

@WebServlet({"/SendRegistrationLink"})

/**
 * Class is invoked when the email with the registration link is send to a client
 * @author Mary
 *
 */
 public class SendRegistrationLink extends javax.servlet.http.HttpServlet implements javax.servlet.Servlet {
   static final long serialVersionUID = 1L;
 	
   /**
    * Saves the registration link to the request object and forwards the request and response to
    * the backend sendRegistrationLink.jsp
    * 
    * @param request - contains the request of a client (registration)
    * @param response - contains the response of a servlet (object that contains registration link)
    * 
    * @exception ServletException - throws exception when servlet encounters difficulties
    * @exception IOException - throws exception when IO error occured
    */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		request.setCharacterEncoding("UTF-8");
		String url="/backend/sendRegistrationLink.jsp";
		
		request.setAttribute("link", request.getParameter("link"));
		RequestDispatcher dispatcher = getServletContext().getRequestDispatcher(url);
        
        dispatcher.forward(request, response); 
		  
	}  	
	
	/**
	 * Gets the registration link and the recipient of the email, sends the mail to the
	 * recipient email address and forwards the request and response to the backend
	 * sendRegistrationLink.jsp
	 * @param request - contains the request for the registration link of a client
	 * @param response - contains the response of the servlet
	 * 
	 * @exception ServletException - throws exception when servlet encounters difficulties
	 * @exception IOException - throws exception when IO error occured
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		request.setCharacterEncoding("UTF-8");
		String url="/backend/sendRegistrationLink.jsp";
		
		//get the registration link and the recipient of the email from the JSP
		String link = request.getParameter("link");
		String toMail = request.getParameter("email");
		String username = (String) request.getAttribute("username");		
		//***Test Email mit HTML tags -> tags would need to be escaped
		//String content="<table cellspacing='0' style='width: 570.0px;'>"
		//+"<tr><td style='padding: 15.0px; background-color: #c1d3f6; font-family: arial; font-size: 14.5px; font-weight: bold;'>brillianCRM registration link</td></tr>"
		//+"<tr><td style='padding: 14.0px; font-family: arial; font-size: 14.0px;'>"
		//+"<div>Dear project manager,<br><br>"
		//+"welcome to brillianCRM, the serious game for project management. This game is designed by students, for students. Please <a href='" + link + "' style='color:#6699ff; text-decoration:none'>click here</a> and register to your course.<br><br>"
		//+"With best regards,<br><br>"
		//+"the brillianCRM team<br><br>"
		//+"<p style='font-size: 12.0px; color:#707a8f; font-family: Arial;'>Please notify that this is a system generated email. Please do not reply.</p><br>"
		//+"<tr><td><hr color='#c1d3f6'></td></tr></table>";
		
		//***Original Email without using HTML
		String content = "Dear project manager, \n\n please use the following link to register to your course: " + link + "\n\n With best regards, \n" +
		"your brillianCRM team \n\n\n Please note that this is a system generated e-mail. Please do not reply.";
		
		//send the mail
		MailClient mailclient = new MailClient();
		mailclient.sendMail(toMail, "Registration Link brillianCRM", content, request);
			
		request.setAttribute("status", "Your e-mail was sent to the entered address.");
		
		//request.setAttribute("status", "Repeated password does not match.");
			
	     // forward the request and response to the view
        RequestDispatcher dispatcher = getServletContext().getRequestDispatcher(url);
        
        dispatcher.forward(request, response);   

	}   	  	    

}
