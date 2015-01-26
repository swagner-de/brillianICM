package org.dhbw.imbit11.backend;

import java.io.IOException;
import java.sql.SQLException;

import javax.servlet.annotation.WebServlet;
import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.shiro.SecurityUtils;

@WebServlet({"/Student"})
 public class StudentMain extends javax.servlet.http.HttpServlet implements javax.servlet.Servlet {
   static final long serialVersionUID = 1L;
   
    /* (non-Java-doc)
	 * @see javax.servlet.http.HttpServlet#HttpServlet()
	 */
	public StudentMain() {
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

//		String url = "/backend/homepage_student.jsp";
		String url = "/Main";
		
		
		// get the userid of the current user
		String userid="";
		String username = SecurityUtils.getSubject().getPrincipal().toString();
//		String username = request.getParameter("username");
		//System.out.println("Username ist " + username);		
		UserRealm realm = new UserRealm();
		try{
			userid = realm.getUserByEmail(username);
		}
		catch(SQLException e){
			e.printStackTrace();
		}
		//System.out.println("User id ist: " + userid);
		request.setAttribute("userid", userid);
		
	     // forward the request and response to the view
        RequestDispatcher dispatcher =
             getServletContext().getRequestDispatcher(url);
        
        dispatcher.forward(request, response);   
		
	}   	  	    
}