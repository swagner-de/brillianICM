<?xml version="1.0" encoding="ISO-8859-1" ?>
<%@ page import="org.dhbw.imbit11.ApplicationConstants"%>
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%@ page import="java.util.ArrayList"%>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1" />
<title><%=ApplicationConstants.PAGETITLE_PROFESSOR%></title>
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
			<a id="logout" class="easyui-linkbutton" data-options="plain:true"
				onclick="window.location.href='LogoutUser'"><%=ApplicationConstants.LOGOUT_BUTTON_TEXT%></a>
			<a id="imprint" class="easyui-linkbutton" data-options="plain:true"><%=ApplicationConstants.IMPRINT_BUTTON_TEXT%></a>
		</div>
	</div>
	<div class="center" data-options="region:'center'">
		<div id="studentsOfProfessor">
			<div id="groupsOfProfessor">
				<h1>Groups</h1>
				Below each group you can see a list of the students that are part of the respective group.<br /><br /><br /><br />
				<%
					if(request.getAttribute("groups")!=null)
					{						
						//students = new String[((String [][]) request.getAttribute("students")).length][request.getAttribute("students")[0].length];
						@SuppressWarnings("unchecked")
						ArrayList<ArrayList<String>> groups = (ArrayList<ArrayList<String>>)request.getAttribute("groups");
						if(groups.isEmpty())
						{
							out.println("<p style='color: red'>You have currently no groups. Create a group by entering a groupname below and click on 'create group'.</p>");	
						}
						//out.println("<table><tr><td>Group</td><td>Registration Link</td></tr>");
						for(int i=0; i<groups.size(); i++)
						{//ArrayList<String> row : groups	
							out.println("<div class=\"group\"><table><tr><td><big>");
							out.println(groups.get(i).get(1));
							out.println("</big></td><td>");
							out.println("<form action=\""+ application.getContextPath()+"/SendRegistrationLink\" method=\"get\"><input style=\"display:none\" id=\"invitationbutton"+i+"\" type=\"submit\" "+
								"value=\"Send email invitation\"/><a class= \"easyui-linkbutton\" onclick=\"$('#invitationbutton"+i+"').trigger('click')\">Send email invitation</a>");
							
							out.println("<input type=\"text\" name=\"link\" value=\""+ groups.get(i).get(2) +"\" style=\"display:none\"/></form></td>");
							out.println("<td><form action=\""+ application.getContextPath()+"/DeleteGroup\" method=\"post\"><input style=\"display:none\" id=\"deleteGroupButton"+i+"\" type=\"submit\" "+
									"value=\"Delete group\"/> <a class= \"easyui-linkbutton\" onclick=checker("+i+",\""+groups.get(i).get(1)+"\")>Delete</a>");
							out.println("<input type=\"text\" name=\"group_id\" value=\""+ groups.get(i).get(0) +"\" style=\"display:none\"/></form>");
							out.println("</td></tr></table> ");
							
							//add students table beneath group header
							
							if(request.getAttribute("students")!=null)
							{
								//students = new String[((String [][]) request.getAttribute("students")).length][request.getAttribute("students")[0].length];
								@SuppressWarnings("unchecked")
								ArrayList<ArrayList<String>> students = (ArrayList<ArrayList<String>>)request.getAttribute("students");
								ArrayList<ArrayList<String>> studentsFiltered = new ArrayList<ArrayList<String>>();
								for (ArrayList<String> singleStudent : students)
								{
									if(singleStudent.get(7).equals(groups.get(i).get(0)))
									{
										studentsFiltered.add(singleStudent);
									}
								}
								
								if(studentsFiltered.isEmpty())
								{
									out.println("<p style='color: red'>There are currently no students in this group. Invite students by sending a registration email.</p>");
								}
								else
								{
									out.println("<table id=\"students\" class=\"easyui-datagrid\" style=\"width: 800px\" data-options=\"fitColumns:true,singleSelect:true\">"
											+"<thead><tr><th data-options=\"field:'delete',width:47,resizable:false\"></th>"
											+"<th data-options=\"field:'reset',width:47,resizable:false\"></th>"
											+"<th data-options=\"field:'lastname',width:100,resizable:false\">Last name</th>"
											+"<th data-options=\"field:'firstname',width:100,resizable:false\">First name</th>"
											+"<th data-options=\"field:'cost',width:40,resizable:false,styler:cellStyler\">Cost</th>"
											+"<th data-options=\"field:'time',width:40,resizable:false,styler:cellStyler\">Time</th>"
											+"<th data-options=\"field:'quality',width:40,resizable:false,styler:cellStyler\">Quality</th>"
											+"<th data-options=\"field:'finished',width:60,resizable:false\">Finished</th>"
											+"<th data-options=\"field:'email',width:200,resizable:false\">Email</th>"
											+"</tr></thead><tbody>");
								}
								int a = 0;
								for(ArrayList<String> row : students)
								{
									a++;
									if (groups.get(i).get(1).equals(row.get(5)))
									{
										out.println("<tr><td>");
										out.println("<form action=\""+ application.getContextPath()+"/DeleteUser\" method=\"post\"><input style=\"display:none\" id=\"deleteUserButton"+a+"\" type=\"submit\" "+
												"value=\"Delete User\"/><a class= \"easyui-linkbutton\" onclick=\"$('#deleteUserButton"+a+"').trigger('click')\">Delete</a>");
										out.println("<input type=\"text\" name=\"delete_email\" value=\""+ row.get(6) +"\" style=\"display:none\"/></form>");
										out.println("</td><td>");
										out.println("<form action=\""+ application.getContextPath()+"/ResetUserProgress\" method=\"post\"><input style=\"display:none\" id=\"resetUserProgressButton"+a+"\" type=\"submit\" "+
												"value=\"Reset User\"/><a class= \"easyui-linkbutton\" onclick=\"$('#resetUserProgressButton"+a+"').trigger('click')\">Reset</a>");
										out.println("<input type=\"text\" name=\"reset_email\" value=\""+ row.get(6) +"\" style=\"display:none\"/></form>");
										out.println("</td><td>");
										out.println(row.get(1));
										out.println("</td><td>");
										out.println(row.get(0));
										out.println("</td><td>");
										out.println(row.get(2));
										out.println("</td><td>");
										out.println(row.get(3));
										out.println("</td><td>");
										out.println(row.get(4));
										out.println("</td><td>");
										out.println(row.get(8));
										out.println("</td><td>");
										//Check whether student has confirmed registration by clicking on Link:
										//if true, print email in table, if false, print error message
											String mailToTest = row.get(6);
											Boolean found;
											String wordToFind  = "@";
											found = mailToTest.contains(wordToFind);
											if (found)
											{
												out.println(row.get(6));
											}
											else
											{
												out.println("<font color=\"red\">Registration not yet confirmed.</font>");
											}
										out.println("</td></tr>");		
									}
								}
								out.println("</tbody></table></div>");
							}		
						}
							//out.println("</table> ");
					}
					else
					{
						out.println("<tr>You have not created any courses yet.</tr>");
					}
				%>
			</div>
			
			<div style="clear: both;"></div>
			<div>
				<h1>New Group</h1>
				<form action="NewUsergroup" method="post">
					<div class="formLabel">Name:</div><input type="text" name="groupname" maxlength="50" required/>
					<input type="submit" style="display: none" id="createGroup" value="Create group"/><br /><br />
					<a class="easyui-linkbutton" onclick="$('#createGroup').trigger('click')">Create group</a>
					<p style="color: green">${success}</p>
					<p style="color: red">${error}</p>
				</form>
			</div>
			<div style="clear: both;"></div>
			<div>
				<h1>Change Password</h1>
				<form action="ResetPassword" method="post">
					<input type="text" name="username" maxlength="50" value="${username}" style="display: none"/> 
					<input type="text" name="role" maxlength="50" value="professor" style="display: none"/>
					<div class="formLabel">Password:</div>
					<input type="password" name="password" maxlength="50"/><br /><br />
					<div class="formLabel">Repeat Password:</div>
					<input type="password" name="password_repeat" maxlength="50"/><br /><br />
					<input id="updatePassword" type="submit" name="updatePassword" value="Update password" hidden="hidden"/>
					<a class="easyui-linkbutton" onclick="$('#updatePassword').trigger('click')">Update password</a>
				</form>
			</div>
			<div class="mainEventContainerImprint easyui-window" data-options="closed:true,width:863,height:576"></div>
		</div>
	</div>
</body>
<script type="text/javascript">
	$('body').show();
	$('#imprint').bind('click', function() {
		showImprint();
	});
	
	function cellStyler(value,row,index){
        if (value <= 30){
            return 'background:#ffa8a8;';
        }else if (value >= 70){
        	return 'background:lightgreen;';
        }else{
        	return 'background:khaki';
        }
    }
	
	function checker(i, groupname)
	{
		var box = window.confirm("Click OK if you want to delete group: " + groupname);
		if(box)
		{
			$('#deleteGroupButton'+i).trigger('click');
		}
	}
</script>
</html>