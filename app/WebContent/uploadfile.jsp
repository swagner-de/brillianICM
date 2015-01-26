<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>CAKE - File Upload</title>
</head>
<body>
<h2>Hallo Teams,<br /> hier könnt ihr die XML hochladen.</h2>
<hr />
<h4>Mit dem Durchsuchen-Button die XML auswählen und mit dem Upload-Button hochladen.</h4>
<hr />
<form name="uploadform" id="uploadform" action="Upload"  method="post" enctype="multipart/form-data">
    <input type="file" name="file" />
    <input type="submit" value="Upload" />
</form>
</body>
</html>

