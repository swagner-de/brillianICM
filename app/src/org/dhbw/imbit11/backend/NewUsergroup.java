package org.dhbw.imbit11.backend;

import java.io.IOException;

import javax.servlet.annotation.WebServlet;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.shiro.SecurityUtils;

@WebServlet({"/NewUsergroup"})
 public class NewUsergroup extends javax.servlet.http.HttpServlet implements javax.servlet.Servlet {
   static final long serialVersionUID = 1L;
   
    /* (non-Java-doc)
	 * @see javax.servlet.http.HttpServlet#HttpServlet()
	 */
	public NewUsergroup() {
		super();
	}   	
	
	/* (non-Java-doc)
	 * @see javax.servlet.http.HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

		doPost(request, response);
	}  	
	
	/* (non-Java-doc)
	 * @see javax.servlet.http.HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

		String url = "/Professor";
		
		//see /login.jsp for these form fields
		String groupname = request.getParameter("groupname");
		
		try {
			
			//get the user (aka subject) associated with 
			//this request.
			
			String subjectPrincipal = SecurityUtils.getSubject().getPrincipal().toString();

			//System.out.println("Der derzeitige Dozent ist " + subjectPrincipal);
			
			UserRealm userRealm = new UserRealm();
			userRealm.createNewGroup(groupname, subjectPrincipal);
			request.setAttribute("success", "The new User Group was created!");
		}
		
		catch (Exception ex) {
			
			ex.printStackTrace();
			
			request.setAttribute("error", "NOT SUCCESSFUL - cause not known!");
			
		}
		
		
	     // forward the request and response to the view
        RequestDispatcher dispatcher =
             getServletContext().getRequestDispatcher(url);
        
        dispatcher.forward(request, response);   
	
		
	}   	  	    
}