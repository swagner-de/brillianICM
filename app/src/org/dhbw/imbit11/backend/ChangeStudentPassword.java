package org.dhbw.imbit11.backend;

import java.io.IOException;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.annotation.WebServlet;

@WebServlet({"/ChangeStudentPassword"})
 public class ChangeStudentPassword extends javax.servlet.http.HttpServlet implements javax.servlet.Servlet {
   static final long serialVersionUID = 1L;
 	
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doPost(request, response);
		  
	}  	

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		String url="/backend/homepage_student.jsp";
		
		request.setAttribute("status", "Email was sent.");
	     // forward the request and response to the view
        RequestDispatcher dispatcher = getServletContext().getRequestDispatcher(url);
        
        dispatcher.forward(request, response);   
	
		
	}   	  	    

}
