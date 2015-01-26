package org.dhbw.imbit11.backend;

import java.io.IOException;

import javax.servlet.annotation.WebServlet;

import java.sql.SQLException;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet({"/ConfirmRegistration"})
 public class ConfirmRegistration extends javax.servlet.http.HttpServlet implements javax.servlet.Servlet {
   static final long serialVersionUID = 1L;
     	
	
	/* (non-Java-doc)
	 * @see javax.servlet.http.HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String url="/backend/registration_complete.jsp";

		String email = request.getParameter("email");
		String unverifiedEmail = request.getParameter("ue");

		UserRealm realm = new UserRealm();
		try{
			realm.updateEmail(email, unverifiedEmail);
		}catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			//System.out.println("confirming user failed");
			}

		// forward the request and response to the view
		RequestDispatcher dispatcher =
		     getServletContext().getRequestDispatcher(url);

		dispatcher.forward(request, response); 

		  
	}  	 	  	    
}
