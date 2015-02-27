<?xml version="1.0" encoding="UTF-8" ?>
<%@ page import="org.dhbw.imbit11.ApplicationConstants"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<title><%=ApplicationConstants.PAGETITLE_STUDENT%></title>
<link rel="apple-touch-icon" sizes="57x57" href="images/favicons/apple-touch-icon-57x57.png">
<link rel="apple-touch-icon" sizes="114x114" href="images/favicons/apple-touch-icon-114x114.png">
<link rel="apple-touch-icon" sizes="72x72" href="images/favicons/apple-touch-icon-72x72.png">
<link rel="apple-touch-icon" sizes="144x144" href="images/favicons/apple-touch-icon-144x144.png">
<link rel="apple-touch-icon" sizes="60x60" href="images/favicons/apple-touch-icon-60x60.png">
<link rel="apple-touch-icon" sizes="120x120" href="images/favicons/apple-touch-icon-120x120.png">
<link rel="apple-touch-icon" sizes="76x76" href="images/favicons/apple-touch-icon-76x76.png">
<link rel="apple-touch-icon" sizes="152x152" href="images/favicons/apple-touch-icon-152x152.png">
<link rel="icon" type="image/png" href="images/favicons/favicon-196x196.png" sizes="196x196">
<link rel="icon" type="image/png" href="images/favicons/favicon-160x160.png" sizes="160x160">
<link rel="icon" type="image/png" href="images/favicons/favicon-96x96.png" sizes="96x96">
<link rel="icon" type="image/png" href="images/favicons/favicon-16x16.png" sizes="16x16">
<link rel="icon" type="image/png" href="images/favicons/favicon-32x32.png" sizes="32x32">
<meta name="msapplication-TileColor" content="#da532c">
<meta name="msapplication-TileImage" content="images/favicons/mstile-144x144.png">
<link type="text/css" rel="stylesheet" href="css/jquery.easyui.css" />
<link type="text/css" rel="stylesheet" href="css/jquery.easyui.icon.css" />
<link rel="stylesheet" type="text/css"
	href="css/jquery.fancybox.css?v=2.1.5" media="screen" />
<link type="text/css" rel="stylesheet" href="css/master.css" />
<script type="text/javascript" src="js/jquery-2.0.0.min.js"></script>
<script type="text/javascript" src="js/jquery.easyui.min.js"></script>
<script type="text/javascript" src="js/jquery.fancybox.pack.js?v=2.1.5"></script>
<script type="text/javascript" src="js/master.js"></script>


</head>
<body class="easyui-layout">
	<div class="north" data-options="region:'north',border:false">
		<div class="div-header window">
			
			<a id="imprint" class="easyui-linkbutton" data-options="plain:true"><%=ApplicationConstants.IMPRINT_BUTTON_TEXT%></a>
			
		</div>
	</div>


	<div class="center studentHomepage" data-options="region:'center'">
	<div class="studentHomepageContainer">
			<div>
				<h4>Change Password.</h4>
				<form action="ResetPassword" method="post">				
					<input type="text" name="username" maxlength="50" value="${username}" style="display: none"/>
					<input type="text" name="role" maxlength="50" value="student" style="display: none"/>
					<div class="formlabel">Old Password:</div>
					<input type="password" id="oldpassword" name="oldpassword" maxlength="50"/><br /><br />
					<!--  Password check -->
					<div class="formLabel">Password:</div>
					<input type="password" name="password" maxlength="50"/><br /><br />
					<div class="formLabel">Repeat Password:</div>
					<input type="password" name="password_repeat" maxlength="50" /><br /><br />
					<input id="updatePassword" type="submit" name="updatePassword" value="Update password" hidden="hidden"/>
					<a class="easyui-linkbutton studentButton" onclick="$('#updatePassword').trigger('click')">Update Password</a>
				</form>
			</div>
			<!-- For now only intended for development -->
			<div>
				<h4>Jump to Level.</h4>
				<form action="SetUserProgress" method="post">
					<div class="formLabel">Unique Level ID (Format: lxxxexxx):</div>
					<input type="text" name="lvlId" maxlength="8" value=""/>
					<input id="setUserProgress" type="submit" name="setUserProgress" value="Set Progress" hidden="hidden"/>
					<a class="easyui-linkbutton studentButton" onclick="$('#setUserProgress').trigger('click')">Set Progress</a>
				</form>
				<p style="color: blue; padding-left: 32px;">${status}</p>
			</div>
				
		<div class="mainEventContainerImprint easyui-window" data-options="closed:true,width:863,height:576"></div>
		</div>
	</div>
	
			
	

<script type="text/javascript">
	$('body').show();
	$('#imprint').bind('click', function() {
		showImprint();
	});
</script>
</body>
</html>