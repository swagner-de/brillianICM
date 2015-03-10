package org.dhbw.imbit11.util;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;

import javax.xml.transform.Result;
import javax.xml.transform.Source;
import javax.xml.transform.Transformer;
import javax.xml.transform.TransformerException;
import javax.xml.transform.TransformerFactory;
import javax.xml.transform.stream.StreamResult;
import javax.xml.transform.stream.StreamSource;

public class Instantiator {
	File masterfile = null;
	File graph = null;
	File xsl = null;

	public Instantiator() throws Exception {
		masterfile = new File("C:/hana/cakeutils/src/masterfile.xml");
		graph = new File("C:/hana/cakeutils/src/graph.xml");
		xsl = new File("C:/hana/cakeutils/src/tograph.xsl");
//		applyXsl();
		transform(masterfile, xsl, graph);
	}

	private void transform(File masterfile2, File xsl2, File graph2) {
		Source xmlInput = new StreamSource(masterfile2);
		Source xsl = new StreamSource(xsl2);
		Result xmlOutput = new StreamResult(graph2);

		try {
		    Transformer transformer = TransformerFactory.newInstance().newTransformer(xsl);
		    transformer.transform(xmlInput, xmlOutput);
		} catch (TransformerException e) {
			e.printStackTrace();
		}		
	}

	public void applyXsl() throws IOException {
		XSLTransformer king = new XSLTransformer();
		OutputStream os = null;
		try {
			os = new FileOutputStream(graph);
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		}
		try {
			king.process(masterfile, xsl, os);
		} catch (TransformerException e) {
			e.printStackTrace();
		} finally {
			os.close();
		}
	}

}
