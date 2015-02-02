package org.dhbw.imbit11.backend;

import java.io.IOException;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.annotation.WebServlet;

@WebServlet({"/ChangeLvl"})

/** This class will change the lvl of the current logged in user.
* Frontend is main.jsp with an additional input text field and submit button.
* @author sceiler
* @version 0.1
*/

 public class ChangeLvl extends javax.servlet.http.HttpServlet implements javax.servlet.Servlet {
   static final long serialVersionUID = 1L;
   
   	public ChangeLvl()
   	{
   		super();
   	}
 	
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doPost(request, response);
		  
	}  	

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// WIP
		String url="/main.jsp";
		
		String lvl = request.getParameter("lvl");
		String username = request.getParameter("username");
		
		try
		{
			
		}
		catch
		{
			
		}

 	
	}   	  	    

}
