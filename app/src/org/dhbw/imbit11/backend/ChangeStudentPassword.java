package org.dhbw.imbit11.backend;

import java.io.IOException;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.annotation.WebServlet;

@WebServlet({"/ChangeStudentPassword"})

/** This class is responsible to handle a password change request
* The frontend page is homepage_student.jsp where user enteres old and new password to update
* @author Oliver Becher
* @version 0.1
*/

 public class ChangeStudentPassword extends javax.servlet.http.HttpServlet implements javax.servlet.Servlet {
   static final long serialVersionUID = 1L;
 	
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doPost(request, response);
		  
	}  	

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		String url="/backend/homepage_student.jsp";
		
		/** Required parameters
		 * @param String username
		 * @param String oldpassword
		 * @param String password
		 * @param String repeat_password
		 */
		
		// see homepage_student.jsp for these form fields
		
		String username = request.getParameter("username");
		String oldpassword = request.getParameter("oldpassword");
		
		// create a UsernamePasswordToken using the
		// and password provided by the user. Username is provided by form automatically.
				
		UsernamePasswordToken token = new PasswordToken(username, oldpassword);
		
		String password = request.getParameter("password");
		String password_repeat = request.getParameter("password_repeat");
		
		try {

			// get the user (aka subject) associated with
			// this request.

			Subject subject = SecurityUtils.getSubject();

			// The use of IniShiroFilter specified in web.xml
			// caused JSecurity to create the DefaultWebSecurityManager object
			// see:
			// http://jsecurity.org/api/org/jsecurity/web/DefaultWebSecurityManager.html
			// This security manager is the default for web-based applications
			// The SecurityUtils was provided that security manager
			// automatically
			// A login will be performed to check the users credentials.
			// User is of course already logged in

			subject.login(token);

			// clear the information stored in the token

			token.clear();

			// add the username to the request
			request.setAttribute("username", username);

			
			Subject subject = SecurityUtils.getSubject();
		
		
			if (password.equals(password_repeat))
				{
				// encrypt the entered new password
				PasswordEncryptor pe = new PasswordEncryptor();
				String hashedPassword = pe.hashPassword(password);
				
				//Enter the new password in the database
				UserRealm realm = new UserRealm();
				
				try{
					realm.updatePassword(username, hashedPassword);
					// is the request necessary?
					// request 
					request.setAttribute("status", "Email was sent.");
				}
				catch(SQLException e){
					//System.out.println("Update of Password in DB failed.");
					e.printStackTrace();
				}
				
			
			} else {
				
				request.setAttribute("error", "Your two entered Passwords do not match");
			}
		
		} catch (UnknownAccountException ex) {
			// username provided was not found
			// Username should be found though since he is already logged in
			ex.printStackTrace();
			request.setAttribute("error", "Login failed! Please log out and in again.");

		} catch (IncorrectCredentialsException ex) {
		// password provided did not match password found in database
		// for the username which is triing to do the password change
		ex.printStackTrace();
		request.setAttribute("error", "Login failed! Wrong old Password!");
		}

		catch (Exception ex) {
		ex.printStackTrace();
		request.setAttribute("error",
				"Fatal Error! Please try again later.");
	}
	
	// forward the request and response to the view
	RequestDispatcher dispatcher = getServletContext().getRequestDispatcher(url);

	dispatcher.forward(request, response);   	
	}   	  	    

}
