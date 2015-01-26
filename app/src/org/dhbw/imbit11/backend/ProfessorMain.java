package org.dhbw.imbit11.backend;

import java.io.IOException;

import javax.servlet.annotation.WebServlet;

import java.util.ArrayList;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.shiro.SecurityUtils;

@WebServlet({"/Professor"})
 public class ProfessorMain extends javax.servlet.http.HttpServlet implements javax.servlet.Servlet {
   static final long serialVersionUID = 1L;
   
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doPost(request, response);
	}  	

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

		String url = "/backend/homepage_professor.jsp";
		
		try {
			//get the user (aka subject) associated with this request.
			String subjectPrincipal = SecurityUtils.getSubject().getPrincipal().toString();
			//System.out.println("Der derzeitige Dozent ist " + subjectPrincipal);
			
			//get students associated with the professor
			UserRealm userRealm = new UserRealm();
			ArrayList<ArrayList<String>> students = userRealm.getUsersForProfessor(subjectPrincipal);		
			request.setAttribute("students", students);
			
			//get groups associated with the professor
			
			ArrayList<ArrayList<String>> groups = userRealm.getGroupsForProfessor(subjectPrincipal);
			
 			for (int i=0; i<groups.size(); i++){
 				groups.get(i).add(calculateRegistrationlink(groups.get(i).get(0), request));
 			}
			
			request.setAttribute("groups", groups);
		}catch (Exception ex) {
			ex.printStackTrace();
			request.setAttribute("error", "NOT SUCCESSFUL - cause not known!");
		}
	     // forward the request and response to the view
        RequestDispatcher dispatcher = getServletContext().getRequestDispatcher(url);
        dispatcher.forward(request, response);   
	}
	
	protected String calculateRegistrationlink(String groupidstring, HttpServletRequest request){
		//works up to 4.3*10^9 groups
		String registrationlink = request.getServletContext().getInitParameter("domain")+ request.getContextPath()+"/Registration?g=";
		
		int groupid = Integer.parseInt(groupidstring);
		int multiplicator = 23;
		int checksum = calculateChecksum(groupid * multiplicator);
		String checksumString = checksum+"";
		if(checksum < 10){
			checksumString = "0"+checksum;
		}
		
		registrationlink = registrationlink + checksumString +  groupid * multiplicator; 
		
		return registrationlink;
	}
	
	protected int calculateChecksum (int groupid){
		if (groupid <= 9) return groupid;
		return groupid%10 + calculateChecksum(groupid/10);
	}
	
}