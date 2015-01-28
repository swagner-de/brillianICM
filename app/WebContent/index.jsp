<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>CAKE - Development Konsole</title>
<style type="text/css">
a,p {
	color: blue;
	font-size: 1.25rem;
	text-decoration: none;
	font-family: Baskerville, "Baskerville Old Face", "Goudy Old Style",
		Garamond, "Times New Roman", serif;
}

h3 {
	color: grey;
	font-family: Baskerville, "Baskerville Old Face", "Goudy Old Style",
		Garamond, "Times New Roman", serif;
}

table {
	table-layout: fixed;
}

th,td {
	width: 150px;
}
</style>
</head>
<body>
	<div style="margin-top: 0">
		<table style="width: 90%; margin: auto;">
			<tr>
				<td valign="top" align="center"><a href="contentquery.jsp">
						<img width="50%" alt="Content Browser"
						src="logo/contentexplorer.jpg"> <br>Content Explorer
				</a></td>
				<td valign="top" align="center"><a href="uploadfile.jsp"> <img
						width="50%" alt="Upload New File" src="logo/uploadfile.jpg">
						<br>Upload File
				</a></td>
				<td valign="top" align="center"><a href="viewfile.jsp"> <img
						width="50%" alt="View File" src="logo/viewfile.jpg"> <br>File
						Viewer
				</a></td>
				<td valign="top" align="center"><a
					href="https://github.com/Illuminae/brillianCRM/blob/devAngela/doku/Schnittstellendokument_Cake_v2_0.docx">
						<img width="50%"
						alt="Schnittstellendokument - Content und Architektur"
						src="logo/ssd1.jpg"> <br>Schnittstellendokument Content
						- Architektur
				</a></td>
			</tr>
			<tr>
				<td valign="top" align="center"><a
					href="https://github.com/Illuminae/brillianCRM/blob/master/app/src/org/dhbw/imbit11/masterfile.xml">
						<br>XML Spielbaum
				</a></td>
				<td valign="top" align="center"><a
					href="https://github.com/Illuminae/brillianCRM/issues"> <img
						width="50%" alt="Bug Report" src="logo/bugreport.jpg"> <br>Bug
						Report
				</a></td>
				<td valign="top" align="center"><a
					href="https://github.com/Illuminae/brillianCRM/blob/devAngela/doku/Dokumentation_Cake_v2_0.docx">
						<br>Dokumentation
				</a></td>
				<td valign="top" align="center"><a
					href="<%out.print(application.getContextPath());%>/Main"> <img
						width="50%" alt="Start Application" src="logo/logo.jpg"> <br>Start
						Application
				</a></td>
			</tr>
			<tr style="color: #aaa;">
				<td><a href="http://sceiler.de/phpmyadmin/"><br>PHPmyAdmin
				</a></td>
				<td><a href="https://sceiler.de/manager"><br>Tomcat
						Manager<br> </a></td>
				<td></td>
				<td></td>
			<tr>
		</table>
	</div>
	<div align="right" style="margin-top: 35%">
		<h3>brillianCRMrebirth 2015 - Development Konsole</h3>
	</div>
</body>
</html>