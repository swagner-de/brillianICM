package org.dhbw.imbit11.backend;

import java.io.IOException;
import java.sql.SQLException;

import javax.servlet.annotation.WebServlet;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.PrintWriter;


@WebServlet({"/CreateUser"})
 public class CreateUser extends javax.servlet.http.HttpServlet implements javax.servlet.Servlet {
   static final long serialVersionUID = 1L;
   private static final String CONTENT_TYPE = "text/html; charset=windows-1252";


	public CreateUser() {
		super();
	}   	
	

	  /**
	   * Process the HTTP doGet request.
	   */
	  public void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException
	  {
	    String var0show = "";
	    try
	    {
	      var0show = request.getParameter("showthis");
	    }
	    catch(Exception e)
	    {
	      e.printStackTrace();
	    }

	    response.setContentType(CONTENT_TYPE);
	    PrintWriter out = response.getWriter();
	    out.println("<html>");
	    out.println("<head><title>demolet</title></head>");
	    out.println("<body>");
	    out.println("<p>The servlet has received a GET. This is the reply.</p>");
	    out.println("</body></html>");
	    out.close();
	  }

	  /**
	   * Process the HTTP doPost request.
	   */
	  public void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException
	  {
	    String var0show = "";
	    try
	    {
	      var0show = request.getParameter("showthis");
	    }
	    catch(Exception e)
	    {
	      e.printStackTrace();
	    }

	    response.setContentType(CONTENT_TYPE);
	    PrintWriter out = response.getWriter();
	    out.println("<html>");
	    out.println("<head><title>demolet</title></head>");
	    out.println("<body>");
	    out.println("<p>The servlet has received a POST. This is the reply.</p>");
	    out.println("</body></html>");
	    out.close();
	  }
}