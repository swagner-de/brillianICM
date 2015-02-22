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
		String username = (String) request.getAttribute("username");		
		//Test Email mit HTML tags
		String picture1Path = application.getContextPath()+"/images/logo.png";
		String picture2Path = application.getContextPath()+"/images/emailBottomLine.png";
		String content="<table cellspacing='0' style='width: 570.0px;'>"
		+ "<tr><td style='padding: 15.0px 0 15.0px 0;'><img alt='brillianCRM logo' src='" + picture1Path + "'/></td>";
		+"<td align='right' style='padding: 15.0px 0 15.0px 0; font-family: arial; font-size: 12.0px;'><a href='https://brilliancrm.com/' target='_blank' style='color:#000000; text-decoration:none'>brilliancrm.com</a></td></tr>"
		+"<tr><td colspan='2' style='padding: 15.0px; background-color: #c1d3f6; font-family: arial; font-size: 14.5px; font-weight: bold;'>brillianCRM registration link</td></tr>"
		+"<tr><td colspan='2' style='padding: 14.0px; font-family: arial; font-size: 14.0px;'>"
		+"<div><p>Dear Project Manager,</p>"
		+"<p>Welcome to brillianCRM, the serious game for Project Management. This game is designed by students, for students. Please <a href='" + link + "' style='color:#6699ff; text-decoration:none'>click here</a> and register to your course.</p><br>"
		+"<p>With best regards,</p><br>"
		+"<p>the brillianCRM Team</p></div>"
		+"<div style='font-size: 12.0px; color:#707a8f; font-family: Arial;'><br>"
		+"<p>Please notify that this is a system generated email. Please do not reply.</p><br>"
		+"Studiengang IMBIT, DHBW Mannheim, Prof. Dr. Harald Bendl<br>"
		+"Coblitzallee 1 - 9, D-68163 Mannheim<br>"
		+"Tel. +49 621 4105-1719, Fax +49 621 4105-1289, harald-bendl@dhbw-mannheim.de, www.IMBIT.dhbw-mannheim.de<br></div></td></tr>"
		+"<tr><td colspan='2'><img alt='' src='" + picture2Path + "'/></td></tr></table>";
		
		//***Original Email without using HTML
		//String content = "Please use the following link to register to your course: " + link + "\n\nGreetings, \n" +
		//"your brillianCRM admin \n\n\n This is an automated email. Please do not reply.";
		
		//send the mail
		MailClient mailclient = new MailClient();
		mailclient.sendMail(toMail, "Registration Link brillianCRM", content, request);
			
		request.setAttribute("status", "Your email was sent to the entered address.");
		
		//request.setAttribute("status", "Repeated password does not match.");
			
	     // forward the request and response to the view
        RequestDispatcher dispatcher = getServletContext().getRequestDispatcher(url);
        
        dispatcher.forward(request, response);   

	}   	  	    

}
