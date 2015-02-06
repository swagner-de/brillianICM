package org.dhbw.imbit11;

import java.io.File;
import java.io.IOException;
import java.io.PrintWriter;
import java.io.StringWriter;
import java.net.URL;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;
import javax.xml.transform.OutputKeys;
import javax.xml.transform.Transformer;
import javax.xml.transform.TransformerException;
import javax.xml.transform.TransformerFactory;
import javax.xml.transform.dom.DOMSource;
import javax.xml.transform.stream.StreamResult;
import javax.xml.xpath.XPath;
import javax.xml.xpath.XPathConstants;
import javax.xml.xpath.XPathExpression;
import javax.xml.xpath.XPathExpressionException;
import javax.xml.xpath.XPathFactory;

import org.w3c.dom.Document;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;
import org.xml.sax.SAXException;


@WebServlet("/NodeViewer")
/**
 * Servlet implementation class NodeViewer
 */
public class NodeViewer extends HttpServlet {
	private static final long serialVersionUID = 1L;
	
    /**
     * @see HttpServlet#HttpServlet()
     */
    public NodeViewer() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
    String node = "Node not found.";
	File masterfile = null;
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		
		String name = "uniqueId";
	    String uniqueId = request.getParameter(name);
	    
	    String levelreq = "level";
	    String level = request.getParameter(levelreq);
	    
	    String elementreq = "element";
	    String element = request.getParameter(elementreq);

		try {
			URL urlToFile = this.getClass().getResource("masterfile.xml");
			masterfile = new File(urlToFile.toURI());
		} catch (Exception e) {
			System.err.println("Error loading masterfile.xml");
		}
		response.setContentType("text/html");
		PrintWriter out = response.getWriter();
		if (uniqueId != null) {out.print(getNode(uniqueId));}
		else
		{out.print(getNode(level,element));}
	}

		public String getNode(String level, String element) {
			// search with level and element
			String expression = "/events/event[@level ='" + level
					+ "' and @option ='" + element + "']/*";

			try {
				DocumentBuilderFactory factory = DocumentBuilderFactory
						.newInstance();
				DocumentBuilder builder = factory.newDocumentBuilder();
				Document doc = builder.parse(masterfile);
				XPathFactory xPathfactory = XPathFactory.newInstance();
				XPath xpath = xPathfactory.newXPath();
				XPathExpression expr = xpath.compile(expression);

				node = "<event>";

				NodeList nodes = (NodeList) expr.evaluate(doc,
						XPathConstants.NODESET);
				for (int i = 0; i < nodes.getLength(); i++) {
					node += nodeToString(nodes.item(i));
				}
				node += "</event>";

			} catch (SAXException | IOException e) {
				return "Error while transforming the File! "
						+ masterfile.getAbsolutePath();
			} catch (ParserConfigurationException e) {
				return "Error while parsing the File! "
						+ masterfile.getAbsolutePath();
			} catch (XPathExpressionException e) {
				return "Error while calling XPath the File! "
						+ masterfile.getAbsolutePath() + " with " + expression;
			} catch (TransformerException e) {
				return "Error while transforming XML File! "
						+ masterfile.getAbsolutePath() + " with " + expression;
			}
			return node;
		}

		public String getNode(String uniqueId) {
			// calls node from masterfile according to unique ID
			String expression = "/events/event[@id = '" + uniqueId + "']";

			try {
				DocumentBuilderFactory factory = DocumentBuilderFactory
						.newInstance();
				DocumentBuilder builder = factory.newDocumentBuilder();
				Document doc = builder.parse(masterfile);
				XPathFactory xPathfactory = XPathFactory.newInstance();
				XPath xpath = xPathfactory.newXPath();
				XPathExpression expr = xpath.compile(expression);

				node = "";

				NodeList nodes = (NodeList) expr.evaluate(doc,
						XPathConstants.NODESET);
				for (int i = 0; i < nodes.getLength(); i++) {
					node += nodeToString(nodes.item(i));
				}

			} catch (SAXException | IOException e) {
				return "Error while transforming the File! "
						+ masterfile.getAbsolutePath();
			} catch (ParserConfigurationException e) {
				return "Error while parsing the File! "
						+ masterfile.getAbsolutePath();
			} catch (XPathExpressionException e) {
				return "Error while calling XPath the File! "
						+ masterfile.getAbsolutePath() + " with " + expression;
			} catch (TransformerException e) {
				return "Error while transforming XML File! "
						+ masterfile.getAbsolutePath() + " with " + expression;
			}
			return node;
		}

		private static String nodeToString(Node node) throws TransformerException {
			StringWriter buf = new StringWriter();
			Transformer xform = TransformerFactory.newInstance().newTransformer();
			xform.setOutputProperty(OutputKeys.OMIT_XML_DECLARATION, "yes");
			xform.transform(new DOMSource(node), new StreamResult(buf));
			return (buf.toString());
		}
		

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
	}

}
