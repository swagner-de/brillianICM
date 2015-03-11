package org.dhbw.imbit11.backend;

import java.io.IOException;
import java.sql.SQLException;
import java.util.ArrayList;

import javax.servlet.annotation.WebServlet;
import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.shiro.SecurityUtils;
import org.apache.shiro.subject.Subject;

@WebServlet({"/GetGlobalProgress"})

/**
 * 
 * @author Oliver B.
 *
 */
 public class GetGlobalSettings extends javax.servlet.http.HttpServlet implements javax.servlet.Servlet {
   static final long serialVersionUID = 1L;
   
    /**
     * Invokes the constructor of parent class (superclass) javax.servlet.http.HttpServlet
     */
	public GetGlobalSettings() {
		super();
	}   	
	
	/**
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

		doPost(request, response);
	}  	
	
	/**
	 *
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

	
		
		String url="/backend/homepage_admin.jsp";		
				
			//TODO: Validate and catch Integer to String conversion #403
			Boolean audio;
			Boolean video;
			Boolean tts;
			Boolean subtitles;
			UserRealm realm = new UserRealm();
			
			try{ 
				ArrayList<Boolean> settings = realm.getSettings();

				audio = settings.get(0);
				video = settings.get(1);
				tts = settings.get(2);
				subtitles = settings.get(3);
				}
			catch(SQLException e){
				e.printStackTrace();
			
			}
		
		
	    // forward the request and response to the view
        RequestDispatcher dispatcher =
             getServletContext().getRequestDispatcher(url);
        
        dispatcher.forward(request, response);
		
	}
}