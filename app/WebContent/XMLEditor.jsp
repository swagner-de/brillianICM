<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>XML Editor aller</title>
<script src="js/xmlJavascriptFunc.js"></script>
</head>
<body>
<script>
var xmlDoc = loadXMLDoc("WEB-INF/classes/org/dhbw/imbit11/masterfile.xml");
x=xmlDoc.getElementsByTagName("title");
for (i=0;i<x.length;i++)
  { 
  document.write(x[i].childNodes[0].nodeValue);
  document.write("<br>");
  }

</script>
</body>test test
</html>