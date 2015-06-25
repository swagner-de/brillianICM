<%@ page import="org.dhbw.imbit11.ApplicationConstants" %>
<!DOCTYPE html>
<html>
<head>
	<title><%=ApplicationConstants.PAGETITLE_MAIN%></title>	
	<meta charset="utf-8">
	  <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="apple-touch-icon" sizes="57x57" href="images/favicons/apple-touch-icon-57x57.png">
<link rel="apple-touch-icon" sizes="114x114" href="images/favicons/apple-touch-icon-114x114.png">
<link rel="apple-touch-icon" sizes="72x72" href="images/favicons/apple-touch-icon-72x72.png">
<link rel="apple-touch-icon" sizes="144x144" href="images/favicons/logo144.png">
<link rel="apple-touch-icon" sizes="60x60" href="images/favicons/logo60.png">
<link rel="apple-touch-icon" sizes="120x120" href="images/favicons/logo120.png">
<link rel="apple-touch-icon" sizes="76x76" href="images/favicons/logo76.png">
<link rel="apple-touch-icon" sizes="152x152" href="images/favicons/logo152.png">
<link rel="icon" type="image/png" href="images/favicons/logo196.png" sizes="196x196">
<link rel="icon" type="image/png" href="images/favicons/logo160.png" sizes="160x160">
<link rel="icon" type="image/png" href="images/favicons/logo96.png" sizes="96x96">
<link rel="icon" type="image/png" href="images/favicons/logo16.png" sizes="16x16">
<link rel="icon" type="image/png" href="images/favicons/logo32.png" sizes="32x32">
<meta name="msapplication-TileColor" content="#da532c">
<meta name="msapplication-TileImage" content="images/favicons/logo144.png">

	

	<script type="text/javascript">	
		userid = '${userid}';
	</script>


   <!-- Framework CSS -->
    <link href="css/bootstrap.min.css" rel="stylesheet">
	<link type="text/css" rel="stylesheet" href="css/jquery.easyui.css" />
	<link type="text/css" rel="stylesheet" href="css/jquery.easyui.icon.css" />
	<link rel="stylesheet" type="text/css" href="css/jquery.fancybox.css?v=2.1.5" media="screen" />


    <!-- Custom CSS -->
    <link href="css/grayscale.css" rel="stylesheet">
	<link type="text/css" rel="stylesheet" href="css/master.css" />	
	
	<!--Framework changes -->
    <link href="css/bootstrap-changes.css" rel="stylesheet">
    <!-- Overwriting Font -->
    <link href="css/font.css" rel="stylesheet">

	<!--Framework JS -->
	<script type="text/javascript" src="js/frameworks/jquery-2.0.0.min.js"></script>
	<script type="text/javascript" src="js/frameworks/jquery.easyui.min.js"></script>
	<script type="text/javascript" src="js/frameworks/jquery.fancybox.pack.js?v=2.1.5"></script>
	<script type="text/javascript" src="js/frameworks/jquery.easing.min.js"></script>
	<script type="text/javascript" src="js/frameworks/bootstrap.min.js"></script>

	
	<!--Custom JS -->	
	<script type="text/javascript" src="js/master.js"></script>
	<script type="text/javascript" src="js/main.js"></script>
	<script type="text/javascript" src="js/events.js"></script>
	<script type="text/javascript" src="js/serverFunctions.js"></script>
	<script type="text/javascript" src="js/grayscale.js"></script>
	
	<script type="text/javascript">
function changeSelect() {
    var selectBox = document.getElementById("selectBox");
    var selectedValue = selectBox.options[selectBox.selectedIndex].value;
   if (selectedValue=='Account'){
	   window.location.assign('<%out.print(application.getContextPath());%>/StudentHomepage','_blank');
	   
   }else if (selectedValue=='<%=ApplicationConstants.LOGOUT_BUTTON_TEXT%>'){
	  
	   $('#logout').trigger('click');
	   
   } else if (selectedValue=='Imprint')
       
	   window.location = "login.jsp#imprint";
    
   }
   </script>	
	
</head>
<body class="easyui-layout" data-options="fit:true">
  <script type="text/javascript" src="js/frameworks/wz_tooltip.js"></script>

    <div id="container header-navbar" class="navbar-custom" data-options="region:'north'" style="height:70px;">
      <nav class="navbar navbar-custom navbar-fixed-top" >
        <div class="container" style="margin: auto auto;">
            <!-- Brand and toggle get grouped for better mobile display -->
            <div class="navbar-header">
				<button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-main-collapse">
					<span class="sr-only">Toggle navigation</span>
					<span class="icon-bar"></span>
					<span class="icon-bar"></span>
					<span class="icon-bar"></span>
					<span class="icon-bar"></span>
				</button>
					
                      <div style="width:120px"> <img src="img/logo_klein.png" alt="" style="width:100%">  </div>
					
			</div>	
    <!-- Collect the nav links, forms, and other content for toggling -->
        <div class="collapse navbar-collapse center container" id="navbarCollapse">
       
            <ul class="nav navbar-nav">
               <li><a style="margin-left: 100px;"><div class="drop">
   <select class="countryselect" id="contry-list" onchange="changeFunc();">
      <option selected="true" style="display:none;">Country</option>
   </select>
</div></a></li>
                <li><a href="#" id="help"  data-options="plain:true"><%=ApplicationConstants.LAPTOP_NAME%></a></li>
                <!--<li><a href="#" id="imprint" data-options="plain:true"><%=ApplicationConstants.IMPRINT_BUTTON_TEXT%></a></li>-->
				<li style="display: none;"><a href="#" id="logout"  data-options="plain:true"><%=ApplicationConstants.LOGOUT_BUTTON_TEXT%></a></li>

            
            
            
            
                 <li><a style=""><div class="drop">
   <select class="countryselect" id="selectBox" style="width:200px" onchange="changeSelect();">
      <option id="account" selected="true" style="display:none;"></option>
      <option ><%=ApplicationConstants.LOGOUT_BUTTON_TEXT%></option>
      <option > Imprint</option>
       <option>Account</option>
      
   </select>
</div></a></li> 
             </ul> 
          
            <!-- </ul> 
            <ul class="nav navbar-nav second-button">            
                 <li><a href="#" id="account" onclick="window.location.assign('<%out.print(application.getContextPath());%>/StudentHomepage','_blank')"  data-options="plain:true"></a></li>   
			</ul> -->
		
			<ul class="nav navbar-nav second-button" style="margin-left: 100px">
				<svg id= "iconsBox"height="50" width="200" >
					<circle id="icon_competence" cx="25" cy="25" r="13" stroke="black" stroke-width="0.5" fill="red" onmouseover="Tip('Competence:&lt;&#47;br&gt;  WHY &lt;&#47;br&gt; This KPI is all about knowing WHY something is done &lt;&#47;br&gt; in a particular way respectively knowing according reasons why the answer was the right one. &lt;&#47;br&gt; This is based especially on knowledge that comes from the 9 cultural dimensions.')" onmouseout="UnTip()" />
						<text x="25" y="32" font-family="sans-serif"  font-size="20px"  text-anchor="middle"  fill="black" onmouseover="Tip('Competence: &lt;&#47;br&gt;  WHY &lt;&#47;br&gt; This KPI is all about knowing WHY something is done &lt;&#47;br&gt; in a particular way respectively knowing according reasons why the answer was the right one. &lt;&#47;br&gt; This is based especially on knowledge that comes from the 9 cultural dimensions.')" onmouseout="UnTip()">C</text>
				<circle id="icon_communication" cx="75" cy="25" r="13" stroke="black" stroke-width="0.5" fill="green" onmouseover="Tip('Communications: &lt;&#47;br&gt; HOW &lt;&#47;br&gt; It’s about how individuals communicate &lt;&#47;br&gt; with each other based on known models, such as „iceberg model“ or „4-ears model“')" onmouseout="UnTip()" />
						<text x="75" y="32" font-family="sans-serif"  font-size="20px"  text-anchor="middle"  fill="black"onmouseover="Tip('Communications: &lt;&#47;br&gt; HOW &lt;&#47;br&gt; It’s about how individuals communicate &lt;&#47;br&gt; with each other based on known models, such as „iceberg model“ or „4-ears model“')"onmouseout="UnTip()">C</text>
				<circle id="icon_behaviour" cx="125" cy="25" r="13" stroke="black" stroke-width="0.5" fill="orange" onmouseover="Tip('Behavior: &lt;&#47;br&gt;  WHAT &lt;&#47;br&gt; Behavior (Verhalten) is about WHAT was/is going on. &lt;&#47;br&gt; This is about what to do or how to behave in a certain situation. It includes Do’s & Dont’s. ')" onmouseout="UnTip()"/>
						<text x="125" y="32" font-family="sans-serif"  font-size="20px"  text-anchor="middle"  fill="black"onmouseover="Tip('Behavior: &lt;&#47;br&gt;  WHAT &lt;&#47;br&gt; Behavior (Verhalten) is about WHAT was/is going on. &lt;&#47;br&gt; This is about what to do or how to behave in a certain situation. It includes Do’s & Dont’s. ')"onmouseout="UnTip()">B</text>
			</svg>

				</ul>
			
        </div>
        </div>
        <!-- /.container --> 
	   </nav>
	</div>
	<div  class="center mainWindow clearfix" data-options="region:'center'">
	
	
	<!--	<p class="bubble left" style="margin: 70px auto;">BrillianICM Rocks!</p>
		<p class="bubble right" style="margin: 30px auto;">BrillianICM Rocks!</p> -->
			
			<!--		<div class="mainLocationButton easyui-linkbutton" id="4" >START</div>	 -->
		<div class="mainEventContainer" data-options="inline:true, center:true, fit:true" ></div>
		<!--<div class="mainEventContainerLaptop easyui-window" data-options="closed:true,width:863,height:576"></div> -->
		<div class="mainEventContainerImprint easyui-window" data-options="closed:true,width:800,height:500"></div>
		<div class="mainEventContainerResult easyui-window" data-options="closed:true,maximized:true,noheader:true"></div>
		<div class="loadingScreen easyui-window" data-options="closed:true,maximized:true,noheader:true">
		<div class="loadingScreenImageContainer easyui-panel" data-options="fit:true,border:false"></div>
		</div>
		<div class="transitionScreen easyui-window" data-options="closed:true,noheader:true,width:800,height:500">
			<div class="transitionScreenImageContainer">
				<div class="transitionScreenTextContainer"></div>
				<div class="buttonContainer">
					<div id="continueButton" class="easyui-linkbutton transitionContinueButton">Next</div>
				</div>
			</div>			
		
		</div>
	</div>

</body>
</html>
