package org.dhbw.imbit11.backend;

import java.io.IOException;
import java.sql.SQLException;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.annotation.WebServlet;

@WebServlet({"/ResetPassword"})
 public class PasswordReset extends javax.servlet.http.HttpServlet implements javax.servlet.Servlet {
   static final long serialVersionUID = 1L;
 	
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doPost(request, response);
		  
	}  	

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		String url="/LoginUser";
		if(request.getParameter("updatePassword") != null){
			String role = request.getParameter("role");
			
			url = "/backend/homepage_"+ role +".jsp";
			if(role.equals("professor")){
				url="/Professor";
			}
			if(role.equals("admin")){
				url="/Admin";
			}
			if(role.equals("student")){
				url="/Student";
			}
			
			String email= request.getParameter("username");
			String password = request.getParameter("password");
			String password_repeat = request.getParameter("password_repeat");

			if(password.equals(password_repeat)){
				PasswordEncryptor pe = new PasswordEncryptor();
				String hashedPassword = pe.hashPassword(password);
				UserRealm realm = new UserRealm();
				try{
					realm.updatePassword(email, hashedPassword);
				}catch(SQLException e){
					//System.out.println("password update failed!");
					e.printStackTrace();
				}
			}else{
				request.setAttribute("status", "Repeated password does not match.");
			}
		}else{
		
			String email = request.getParameter("username");
		
		//Create a new temporary password for the user
		String temporaryPassword = ""+ Math.round(Math.random()*100000);
		PasswordEncryptor pe = new PasswordEncryptor();
		String hashedPassword = pe.hashPassword(temporaryPassword);
		
		//Enter the temporary password in the database
		UserRealm realm = new UserRealm();
		try{
			realm.updatePassword(email, hashedPassword);
		}catch(SQLException e){
			//System.out.println("Update of Password in DB failed.");
			e.printStackTrace();
		}
		
		//Send the temporary password to the user
		String content = "Your temporary password is "
				+ temporaryPassword + ". You can change this after you logged in. \n\nGreetings, \n" +
					"your brillianCRM admin \n\n\n This is an automated email. Please do not reply.";
		MailClient mailclient = new MailClient();
		mailclient.sendMail(email, "Password Reset", content);
		}
		request.setAttribute("status", "Email was sent.");
	     // forward the request and response to the view
        RequestDispatcher dispatcher = getServletContext().getRequestDispatcher(url);
        
        dispatcher.forward(request, response);   
	
		
	}   	  	    

}
