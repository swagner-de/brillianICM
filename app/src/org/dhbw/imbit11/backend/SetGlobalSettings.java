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

@WebServlet({"/SetGlobalSettings"})

/**
 * This class is opened, when admin wants to change global settings. 
 * @author Oliver B.
 * @param boolean audio
 * @param boolean video
 * @param boolean tts
 * @param boolean subtitles
 */
 public class SetGlobalSettings extends javax.servlet.http.HttpServlet implements javax.servlet.Servlet {
   static final long serialVersionUID = 1L;
   
    /**
     * Invokes the constructor of parent class (superclass) javax.servlet.http.HttpServlet
     */
	public SetGlobalSettings() {
		super();
	}   	
	
	/**
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

		doPost(request, response);
	}  	
	
	/**
	 *function asks for parameters from admin homepage
	 *creates a new userrealm, and writes to database
	 *database owns a table for settings only
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

	
		
		String url="/backend/homepage_admin.jsp";		
				
			//TODO: Validate and catch Integer to String conversion #403
		String a = request.getParameter("audio");
		String b = request.getParameter("video");
		String c = request.getParameter("tts");
		String d = request.getParameter("subtitles");
		Boolean audio; 
		Boolean video; 
		Boolean tts; 			
		Boolean subtitles;

		if (a=="true"){
			audio = true;
		} else { audio = false;}
		
		if (b=="true"){
			video = true;
		} else { video = false;}
		
		if (c=="true"){
			tts = true;
		} else { tts = false;}
		
		if (d=="true"){
			subtitles = true;
		} else { subtitles = false;}
			  
			UserRealm realm = new UserRealm();
			
			try{ 
				// ArrayList<Boolean> settings = realm.getSettings();
				
				realm.setSettings(audio, video, tts, subtitles);	
				
				request.setAttribute("status", "Progress set.");
				}
			catch(SQLException e){
				e.printStackTrace();
			
			}
		
		
	    // forward the request and response to the view
        RequestDispatcher dispatcher =
             getServletContext().getRequestDispatcher(url);
        
        dispatcher.forward(request, response);
		
	}
	
	protected boolean getSettings(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

			
				
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
			return audio, video, tts, subtitles;
	}
}