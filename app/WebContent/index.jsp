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
	<div style="margin-top: 25%">
		<table style="width: 90%; margin: auto;">
			<tr>
				<td align="center"><a href="contentquery.jsp"><img
						width="50%" alt="Content Browser" src="logo/contentexplorer.jpg"></a></td>
				<td align="center"><a href="uploadfile.jsp"><img
						width="50%" alt="Upload New File" src="logo/uploadfile.jpg"></a></td>
				<td align="center"><a href="viewfile.jsp"><img width="50%"
						alt="View File" src="logo/viewfile.jpg"></a></td>
				<td align="center"><a
					href="https://docs.google.com/document/d/1e9zMqsaerdk26taTKsft6BxsyIVO0tt6iD7KXexxSn4"><img
						width="50%" alt="Schnittstellendokument - Content und Architektur"
						src="logo/ssd1.jpg"></a></td>
				<td align="center"><a
					href="https://docs.google.com/document/d/1U-dPRV6nBrmuaFX9zYMw9gX3-0U_m394a2ZLuS7UmYw/"><img
						width="50%" alt="XML Spielbaum"
						src="logo/ssd1.jpg"></a></td>
				<td align="center"><a
					href="https://docs.google.com/spreadsheets/d/15J_ipuj7S48JJGJxGKKoVITFQXRU3YRlqtOehsLiBF4/"><img
						width="50%" alt="Bug Report" src="logo/bugreport.jpg"></a></td>
				<td align="center"><a
					href="<%out.print(application.getContextPath());%>/Main"><img
						width="50%" alt="Start Application" src="logo/logo.jpg"></a></td>

			</tr>
			<tr>
				<td valign="top" align="center"><a href="contentquery.jsp">Content
							Explorer</a></td>
				<td valign="top" align="center"><a href="uploadfile.jsp">Upload
							File</a></td>
				<td valign="top" align="center"><a href="viewfile.jsp">File
							Viewer</a></td>
				<td valign="top" align="center"><a
					href="https://docs.google.com/document/d/1e9zMqsaerdk26taTKsft6BxsyIVO0tt6iD7KXexxSn4">
							Schnittstellendokument<br />Content - Architektur
						</a></td>
				<td valign="top" align="center"><a
					href="https://docs.google.com/document/d/1U-dPRV6nBrmuaFX9zYMw9gX3-0U_m394a2ZLuS7UmYw/">
							XML Spielbaum</a></td>
				<td valign="top" align="center"><a
					href="https://docs.google.com/spreadsheets/d/15J_ipuj7S48JJGJxGKKoVITFQXRU3YRlqtOehsLiBF4/">Bug
							Report</a></td>
				<td valign="top" align="center"><a
					href="<%out.print(application.getContextPath());%>/Main">Start
							Application</a></td>
			</tr>
		</table>
	</div>
	<div align="right" style="margin-top: 35%">
		<h3>IT Projekt CAKE 2014 - Development Konsole</h3>
	</div>
</body>
</html>