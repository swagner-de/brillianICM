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
		
		String url="/backend/sendRegistrationLink.jsp";
		
		//get the registration link and the recipient of the email from the JSP
		String link = request.getParameter("link");
		String toMail = request.getParameter("email");
		
		//Test Email mit HTML tags
		String content = "<b>Hello new Project Manager</b></br>Please use the following link to register to your course: " + link + "</b>Greetings, </b>" +
					"your brillianCRM admin \n\n\n <i>This is an automated email</i>. <h2>Please do not reply.</h2>";
		
		//***Folgender String ist die urspruengliche Email ohne Verwendung von HTML
		//String content = "Please use the following link to register to your course: " + link + "\n\nGreetings, \n" +
		//"your brillianCRM admin \n\n\n This is an automated email. Please do not reply.";
		
		//send the mail
		MailClient mailclient = new MailClient();
		mailclient.sendMail(toMail, "Registration Link brillianCRM", content);
			
		request.setAttribute("status", "Your email was sent to the entered address.");
		
		//request.setAttribute("status", "Repeated password does not match.");
			
	     // forward the request and response to the view
        RequestDispatcher dispatcher = getServletContext().getRequestDispatcher(url);
        
        dispatcher.forward(request, response);   

	}   	  	    

}
