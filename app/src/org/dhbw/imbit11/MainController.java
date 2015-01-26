package org.dhbw.imbit11;

import java.io.IOException;
import java.sql.SQLException;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletConfig;
import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.dhbw.imbit11.backend.UserRealm;

@WebServlet({ "/Main" })
public class MainController extends HttpServlet {
	

	private static final long serialVersionUID = 1L;
	private RequestDispatcher jsp;
	
	public void init(ServletConfig config) throws ServletException {
		ServletContext context = config.getServletContext();
		jsp = context.getRequestDispatcher("/frontend/main.jsp");
	}
	
	public void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		response.setContentType("text/html");
		response.setCharacterEncoding("UTF-8");
		//System.out.println("Main Get...");		
		jsp.include(request, response);
	}

	public void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		response.setContentType("text/html");
		response.setCharacterEncoding("UTF-8");
		//System.out.println("Main Post...");
		
		String userid="";
		String username = request.getParameter("username");
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
		
		jsp.include(request, response);
	}
}