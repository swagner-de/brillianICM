package org.dhbw.imbit11.util;
import java.io.File;
import java.io.OutputStream;
import java.io.Reader;
import java.io.Writer;

import javax.xml.transform.Result;
import javax.xml.transform.Source;
import javax.xml.transform.Templates;
import javax.xml.transform.Transformer;
import javax.xml.transform.TransformerConfigurationException;
import javax.xml.transform.TransformerException;
import javax.xml.transform.TransformerFactory;
import javax.xml.transform.stream.StreamResult;
import javax.xml.transform.stream.StreamSource;

/**
 * Creates an XSLT transformer for processing an XML document. A new
 * transformer, along with a style template are created for each document
 * transformation. The XSLT, DOM, and SAX processors are based on system default
 * parameters.
 */

public class XSLTransformer {
	private TransformerFactory factory;

	public XSLTransformer() {
		factory = TransformerFactory.newInstance();
	}

	/**
	 * Transform an XML and XSL document as Readers, placing the
	 * resulting transformed document in a Writer. Convenient for
	 * handling an XML document as a String (StringReader) residing
	 * in memory, not on disk. The output document could easily be handled as a
	 * String (StringWriter) or as a JSPWriter in a
	 * JavaServer page.
	 * 
	 * @param xmlFile
	 * 			- contains XML File
	 * @param xslFile
	 * 			- contains XSL File
	 * @param output
	 * 			- contains transformed document
	 * 
	 * @throws TransformerException - exceptional condition that occured during the transformation process
	 */

	public void process(Reader xmlFile, Reader xslFile, Writer output)
			throws TransformerException {
		process(new StreamSource(xmlFile), new StreamSource(xslFile),
				new StreamResult(output));
	}

	/**
	 * Transform an XML and XSL document as Files, placing the
	 * resulting transformed document in a Writer. The output
	 * document could easily be handled as a String (StringWriter)
	 * or as a JSPWriter in a JavaServer page.
	 * 
	 * @param xmlFile
	 * 			- contains xmlFile
	 * @param xslFile
	 * 			- contains xslFile
	 * @param output
	 * 			- contains transformed document
	 * 
	 * @throws TransformerException - exceptional condition that occured during the transformation process
	 */
	public void process(File xmlFile, File xslFile, Writer output)
			throws TransformerException {
		process(new StreamSource(xmlFile), new StreamSource(xslFile),
				new StreamResult(output));
	}

	/**
	 * Transform an XML File based on an XSL File,
	 * placing the resulting transformed document in a OutputStream
	 * Convenient for handling the result as a FileOutputStream
	 * or ByteArrayOutputStream
	 * 
	 * @param xmlFile
	 * 			- contains xmlFile
	 * @param xslFile
	 * 			- contains xslFile
	 * @param out
	 * 			- contains transformed document
	 * 
	 * @throws TransformerException - exceptional condition that occured during the transformation process
	 */

	public void process(File xmlFile, File xslFile, OutputStream out)
			throws TransformerException {
		process(new StreamSource(xmlFile), new StreamSource(xslFile),
				new StreamResult(out));
	}

	/**
	 * Transform an XML source using XSLT based on a new template for the source
	 * XSL document. The resulting transformed document is placed in the passed
	 * in Result object.
	 * 
	 * @param xml - contains xml source
	 * 
	 * @param xsl - contains XSL source
	 * 
	 * @param result - object that contains the transformed document
	 * 
	 * @throws TransformerException - exceptional condition that occured during the transformation process
	 */

	public void process(Source xml, Source xsl, Result result)
			throws TransformerException {
		try {
			Templates template = factory.newTemplates(xsl);
			Transformer transformer = template.newTransformer();
			transformer.transform(xml, result);
		} catch (TransformerConfigurationException tce) {
			throw new TransformerException(tce.getMessageAndLocation());
		} catch (TransformerException te) {
			throw new TransformerException(te.getMessageAndLocation());
		}
	}
}