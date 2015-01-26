package org.dhbw.imbit11.backend;

import java.io.IOException;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.annotation.WebServlet;

@WebServlet({"/SendRegistrationLink"})
 public class SendRegistrationLink extends javax.servlet.http.HttpServlet implements javax.servlet.Servlet {
   static final long serialVersionUID = 1L;
 	
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String url="/backend/sendRegistrationLink.jsp";
		
		request.setAttribute("link", request.getParameter("link"));
		RequestDispatcher dispatcher = getServletContext().getRequestDispatcher(url);
        
        dispatcher.forward(request, response); 
		  
	}  	

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		String url="/backend/sendRegistrationLink.jsp";
		
		//get the registration link and the recipient of the email from the JSP
		String link = request.getParameter("link");
		String toMail = request.getParameter("email");
			
		String content = "Please use the following link to register to your course: " + link + "\n\nGreetings, \n" +
					"your brillianCRM admin \n\n\n This is an automated email. Please do not reply.";
		
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
