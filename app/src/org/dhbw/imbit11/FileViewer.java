package org.dhbw.imbit11;

import java.io.File;
import java.io.IOException;
import java.io.PrintWriter;
import java.io.StringReader;
import java.io.StringWriter;
import java.net.URL;
import java.nio.file.Files;
import java.nio.file.Paths;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.xml.transform.OutputKeys;
import javax.xml.transform.Source;
import javax.xml.transform.Transformer;
import javax.xml.transform.TransformerFactory;
import javax.xml.transform.stream.StreamResult;
import javax.xml.transform.stream.StreamSource;

/**
 * Servlet implementation class FileViewer
 */
@WebServlet("/FileViewer")
public class FileViewer extends HttpServlet {
	private static final long serialVersionUID = 1L;
	private static File masterfile;

	/**
	 * @see HttpServlet#HttpServlet()
	 */
	public FileViewer() {
		super();
		// TODO Auto-generated constructor stub
	}

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doGet(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {

		try {
			URL urlToFile = this.getClass().getResource("masterfile.xml");
			masterfile = new File(urlToFile.toURI());
		} catch (Exception e) {
			System.err.println("Error loading masterfile.xml");
		}

		response.setContentType("text/html");
		PrintWriter out = response.getWriter();
		out.print(prettyFormat());
		
	}

	public static String prettyFormat(String input, int indent) {
		try {
			Source xmlInput = new StreamSource(new StringReader(input));
			StringWriter stringWriter = new StringWriter();
			StreamResult xmlOutput = new StreamResult(stringWriter);
			TransformerFactory transformerFactory = TransformerFactory
					.newInstance();
			transformerFactory.setAttribute("indent-number", indent);
			Transformer transformer = transformerFactory.newTransformer();
			transformer.setOutputProperty(OutputKeys.INDENT, "yes");
			transformer.setOutputProperty(OutputKeys.OMIT_XML_DECLARATION, "no");

			transformer.transform(xmlInput, xmlOutput);
			return xmlOutput.getWriter().toString();
		} catch (Exception e) {
			throw new RuntimeException(e);
			// simple exception handling, please review it
		}
	}

	public  static String prettyFormat() throws IOException {
		return prettyFormat(readFileToString(), 2);
	}

	private static String readFileToString() throws IOException {
		return new String(Files.readAllBytes(Paths.get(masterfile.toURI())));
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doPost(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
	}

}
