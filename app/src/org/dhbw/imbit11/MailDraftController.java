package org.dhbw.imbit11;

import java.io.IOException;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletConfig;
import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet({ "/MailDraft" })
public class MailDraftController extends HttpServlet {

	private static final long serialVersionUID = 1L;
	private RequestDispatcher jsp;
	
	public void init(ServletConfig config) throws ServletException {
		ServletContext context = config.getServletContext();
		jsp = context.getRequestDispatcher("/frontend/mailDraft.jsp");
	}
	
	public void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		response.setContentType("text/html");
		response.setCharacterEncoding("UTF-8");
		//System.out.println("MailDraft Get...");		
		jsp.include(request, response);
	}

	public void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		response.setContentType("text/html");
		response.setCharacterEncoding("UTF-8");
		//System.out.println("MailDraft Post...");
		jsp.include(request, response);
	}
}