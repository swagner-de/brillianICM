<?xml version="1.0" encoding="UTF-8" ?>
<%@ page import="org.dhbw.imbit11.ApplicationConstants"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<!-- <html xmlns="http://www.w3.org/1999/xhtml"  style="width:100%; margin:0; padding:0 ">-->
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
<title><%=ApplicationConstants.PAGETITLE_LOGIN%></title>
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

    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
   
   <!-- Bootstrap Core CSS -->
    <link href="css/bootstrap.min.css" rel="stylesheet">


    <!-- Custom CSS -->
    <link href="css/grayscale.css" rel="stylesheet">
    <link href="css/bootstrap-changes.css" rel="stylesheet"> 
    
       <!-- Overwriting Font -->
     <link href="css/font.css" rel="stylesheet">
    

<!-- <link type="text/css" rel="stylesheet" href="css/jquery.easyui.css" />
<link type="text/css" rel="stylesheet" href="css/jquery.easyui.icon.css" />
<link rel="stylesheet" type="text/css"
	href="css/jquery.fancybox.css?v=2.1.5" media="screen" />
<link type="text/css" rel="stylesheet" href="css/master.css" /> -->

<!-- Imprint function -->
<!--  <script type="text/javascript">
	$(document).ready(function(){
		$('body').show();
		$('#imprint').bind('click', function() {
			showImprint();
		});
	});
</script>-->

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


</head>
<body  id="page-top"  data-spy="scroll" data-target=".navbar-fixed-top">
	<script type="text/javascript" src="js/frameworks/wz_tooltip.js"></script>
    <!-- Navigation -->
       <nav class="navbar navbar-custom navbar-fixed-top" role="navigation" >
        <div class="container">
            <!-- Brand and toggle get grouped for better mobile display -->
            <div class="navbar-header">
                <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-main-collapse">
                    <i class="fa fa-bars"></i>
                </button>
                <a class=" page-scroll" href="#page-top">
                    <div style="width:120px;"> <img src="img/logo_klein.png" alt="" style="width:100%">  </img></div>
                </a>
            </div>

            <!-- Collect the nav links, forms, and other content for toggling -->
            <div class="collapse navbar-collapse navbar-right navbar-main-collapse">
                <ul class="nav navbar-nav">
                    <!-- Hidden li included to remove active class from about link when scrolled up past about section -->
                    <li class="hidden">
                        <a href="#page-top"></a>
                    </li>
                     
                    <li>
                        <a class="page-scroll" href="#about">About</a>
                    </li>
                     <li>
                      <a class="page-scroll" href="#imprint">Imprint</a>
                    </li>
                   
                    <li>
                        <a class="page-scroll" href="#contact">Contact</a>
                    </li>
                </ul>
            </div>
            <!-- /.navbar-collapse -->
        </div>
        <!-- /.container -->
    </nav>

    
   <header class="intro">
        <div class="intro intro-body">
            <div class="container">
            
             <div class="row">
                    <div class="col-md-8">
                        <h1 class="brand-heading" style="text-transform:none; text-align: left;"></h1>
                        <p class="intro-text" style="text-align: center;">The Management Game for Your<br> Intercultural Competencies</p>
                       
                       
                    </div>
                </div>
            
        
       <p style="color: red; text-align: left;">${error}</p>  
             <form action="LoginUser" method="post" >
			<table style="width:30%; bottom:0px; padding:0; text-align:center">
			<tr>
				<td><input class="form-control" type="text" name="username" maxlength="50"  placeholder="Email"/></td>
			</tr>
			
			<tr>
				<td><input class="form-control" type="password" name="password" maxlength="50" placeholder="Password" /></td>
			</tr>
			
			<tr >
				<td><input class="btn btn-default"  type="submit"
					name="submit" value="Login" /></td>
			</tr>
			<tr>
				<td align="right" style="padding-right: 28px;">
					<a class="login" href='resetpw.jsp'>Forgot your password?</a>
				</td>
			</tr>
			<tr>
				<td align="right" style="padding-right: 28px;">
					<a class="login" href='<%out.print(application.getContextPath());%>/Registration?g=000' >Register</a>
				</td>				
			</tr>
		</table>
		</form>
      </div>  
   </div>     
    </header>
        
   <!-- About Section -->
    <section id="about" class="container content-section text-center">
        <div class="row">
            <div class="col-lg-8 col-lg-offset-2">
                <h2>BRILLIANICM PROJECT MANAGEMENT GAME &ndash; HOW BRILLIANT ARE YOU</h2>

brillianICM was developed by  <a href = "http://www.imbit.dhbw-mannheim.de/" target="_blank">IMBIT</a> students,
 who started to study “International Management for Business and Information Technology” at 
 the Baden-Wuerttemberg Cooperative State University in Mannheim in 2012. As part of our education
  we realized ambitious IT projects: In cooperation with SAP we worked on the new technology SAP HANA. 
  brillianICM is our latest project made feasible by <a href = "http://www.imbit.dhbw-mannheim.de/ansprechpartner/prof-dr-harald-bendl/" target="_blank">Prof. Dr. Harald Bendl</a> and <a href = "http://www.imbit.dhbw-mannheim.de/ansprechpartner/prof-peter-mayr/" target="_blank">Prof. Peter Mayr</a>.<br />

This game is webbased and should run in modern browsers including mobile devices. 
We tested it with Google Chrome and Safari (iPad).
<br><br>
<h3>We, the WIMBIT12A & WIBIT12B classes, are proud to present our game:</h3>

<!-- <img src="images/Gruppenfotos/Gruppenbild_About.png" style="width:100%">
<p>Jubly Anand, Ayleen Bocretsion, Michaela Brandl, Clemens Buchert, Sönke Cramme, Moritz Döring, Benedikt Esser, Hannah Fidora, Kathrin Fitzner, Malte Hake, Marius Kaiser, Mario Wares Khan, Martin Knipf, Dorothea Langer, Philipp Ludwig, Jonas Müller, Katrin Nagel, Dajana Pirke, Saskia Polenske, Benjamin Schäfer, Simon Schlephorst, Kevin Schork, Alexander Schrödinger, Sonja Seidel, Lukas Steigerwald, Max Steimle, Veronika Trübe, Antonia Vetter, Nadine Winkler and our lecturers Prof. Dr. Harald Bendl, Prof. Peter Mayr</p>
-->
</div>
            </div>
        </div>
    </section>
    
    
    <!-- Imprint Section -->
    <section id="imprint" class="container content-section text-center">
        <div class="row">
            <div class="col-lg-8 col-lg-offset-2">
                <h3>Impressum</h3>
	<div>
		Studiengang IMBIT, DHBW Mannheim, Prof. Dr. Harald Bendl<br />
		Coblitzallee 1 &ndash; 9, D-68163 Mannheim<br />
		Tel. +49 621 4105-1719, Fax +49 621 4105-1289, harald.bendl@dhbw-mannheim.de,
		<a href = "http://www.imbit.dhbw-mannheim.de/" target="_blank" >www.IMBIT.dhbw-mannheim.de</a>
	</div>
	
	<h3>Haftungsausschluss</h3>
	<p>Der Autor &uuml;bernimmt keine Gew&auml;hr f&uuml;r die Aktualit&auml;t, Richtigkeit und Vollst&auml;ndigkeit der bereitgestellten Informationen auf der brillianICM Website. Haftungsanspr&uuml;che gegen den Autor, welche sich auf Sch&auml;den materieller oder ideeller Art beziehen, die durch die Nutzung oder Nichtnutzung der dargebotenen Informationen bzw. durch die Nutzung fehlerhafter und unvollst&auml;ndiger Informationen verursacht wurden, sind grunds&auml;tzlich ausgeschlossen, sofern seitens des Autors kein nachweislich vors&auml;tzliches oder grob fahrl&auml;ssiges Verschulden vorliegt.<br>
	Alle Angebote sind freibleibend und unverbindlich. Der Autor beh&auml;lt es sich ausdr&uuml;cklich vor, Teile der Seiten oder das gesamte Angebot ohne gesonderte Ank&uuml;ndigung zu ver&auml;ndern, zu erg&auml;nzen, zu l&ouml;schen oder die Ver&ouml;ffentlichung zeitweise oder endg&uuml;ltig einzustellen.</p>
	<p>Bei direkten oder indirekten Verweisen auf fremde Webseiten (Hyperlinks), die au&szlig;erhalb des Verantwortungsbereiches des Autors liegen, w&uuml;rde eine Haftungsverpflichtung ausschlie&szlig;lich in dem Fall in Kraft treten, in dem der Autor von den Inhalten Kenntnis hat und es ihm technisch m&ouml;glich und zumutbar w&auml;re, die Nutzung im Falle rechtswidriger Inhalte zu verhindern.<br>
	Der Autor erkl&auml;rt hiermit ausdr&uuml;cklich, dass zum Zeitpunkt der Linksetzung keine illegalen Inhalte auf den zu verlinkenden Seiten erkennbar waren. Auf die aktuelle und zuk&uuml;nftige Gestaltung, die Inhalte oder die Urheberschaft der verlinkten/verkn&uuml;pften Seiten hat der Autor keinerlei Einfluss. Deshalb distanziert er sich hiermit ausdr&uuml;cklich von allen Inhalten aller verlinkten/verkn&uuml;pften Seiten, die nach der Linksetzung ver&auml;ndert wurden. F&uuml;r illegale, fehlerhafte oder unvollst&auml;ndige Inhalte und insbesondere f&uuml;r Sch&auml;den, die aus der Nutzung oder Nichtnutzung solcherart dargebotener Informationen entstehen, haftet allein der Anbieter der Seite, auf welche verwiesen wurde, nicht derjenige, der &uuml;ber Links auf die jeweilige Ver&ouml;ffentlichung lediglich verweist.</p>
	
	
	<h3>Informationen über Cookies</h3>


<p>Zur Optimierung unseres Internetauftritts setzen wir Cookies ein. Es handelt sich dabei um Textdateien, die im Speicher Ihres Computers gespeichert werden. Diese Cookies werden nach dem Schließen des Browsers gelöscht. Andere Cookies bleiben auf Ihrem Rechner (Langzeit Cookies) und erkennen Sie bei ihrem nächsten Besuch wieder. Dadurch können wir Ihnen einen besseren Zugang auf unsere Seite ermöglichen.

Das Speichern von Cookies können Sie verhindern, indem Sie in den Einstellungen ihres Browsers "Cookies blockieren" wählen. Dies kann aber eine Funktionseinschränkung unserer Website zur Folge haben.</p>

	
<h3>Auskunft</h3>
<p>Nach dem Bundesdatenschutzgesetz haben Sie das Recht auf eine unentgeltliche Auskunft über Ihre gespeicherten Daten. Zudem haben Sie ggf. ein Recht auf Berichtigung, Sperrung oder Löschung dieser Daten. Fragen hierzu können über die im Impressum angegebenen Kontaktdaten stellen.</p>

	
	
	<h3>Urheberrecht</h3>
	<p>Der Autor ist bestrebt, in allen Publikationen die Urheberrechte der verwendeten Bilder, Grafiken, Tondokumente, Videosequenzen und Texte zu beachten, von ihm selbst erstellte Bilder, Grafiken, Tondokumente, Videosequenzen und Texte zu nutzen oder auf lizenzfreie Grafiken, Tondokumente, Videosequenzen und Texte zur&uuml;ckzugreifen.<br>
	Alle innerhalb des Internetangebotes genannten und ggf. durch Dritte gesch&uuml;tzten Marken- und Warenzeichen unterliegen uneingeschr&auml;nkt den Bestimmungen des jeweils g&uuml;ltigen Kennzeichenrechts und den Besitzrechten der jeweiligen eingetragenen Eigent&uuml;mer. Allein aufgrund der blo&szlig;en Nennung ist nicht der Schluss zu ziehen, dass Markenzeichen nicht durch Rechte Dritter gesch&uuml;tzt sind!<br>
	Das Copyright f&uuml;r ver&ouml;ffentlichte, vom Autor selbst erstellte Objekte bleibt allein beim Autor der Seiten. Eine Vervielf&auml;ltigung oder Verwendung solcher Grafiken, Tondokumente, Videosequenzen und Texte in anderen elektronischen oder gedruckten Publikationen ist ohne ausdr&uuml;ckliche Zustimmung des Autors nicht gestattet.</p>
	
	<h3>Datenschutz</h3>
	<p>Sofern innerhalb des Internetangebotes die M&ouml;glichkeit zur Eingabe pers&ouml;nlicher oder gesch&auml;ftlicher Daten (Emailadressen, Namen, Anschriften) besteht, so erfolgt die Preisgabe dieser Daten seitens des Nutzers auf ausdr&uuml;cklich freiwilliger Basis. Die Nutzung der im Rahmen des Impressums oder vergleichbarer Angaben ver&ouml;ffentlichten Kontaktdaten wie Postanschriften, Telefon- und Faxnummern sowie Emailadressen durch Dritte zur &uuml;bersendung von nicht ausdr&uuml;cklich angeforderten Informationen ist nicht gestattet. Rechtliche Schritte gegen die Versender von sogenannten Spam-Mails bei Verst&ouml;&szlig;en gegen dieses Verbot sind ausdr&uuml;cklich vorbehalten.</p>
	
	<h3>Anwendbares Recht </h3>
	<p> Es gilt ausschlie&szlig;lich das ma&szlig;gebliche Recht der Bundesrepublik Deutschland. Diese Nutzungshinweise sind als Teil des Internetangebotes zu betrachten, von dem aus auf diese Seite verwiesen wurde. </p>
	<hr />
	
	<h3>Verwendete Frameworks und Icons</h3>
	<a href = "http://tomcat.apache.org/" target="_blank" >Apache Tomcat</a>, <a href = "http://shiro.apache.org/" target="_blank" >Apache Shiro</a>, <a href = "http://www.mysql.com/" target="_blank" >mySQL</a> <a href = "http://dev.mysql.com/downloads/connector/j/5.0.html" target="_blank" >inkl. JDBC Adapter</a>,
	<a href = "http://commons.apache.org/proper/commons-io/" target="_blank" >Apache Commons IO</a>, <a href = "http://jquery.com/" target="_blank" >jQuery</a>, <a href = "http://www.jeasyui.com/" target="_blank" >jQuery EasyUI</a> und <a href = "http://fancybox.net/" target="_blank" >fancybox</a> <a href= "https://www.yworks.com/de/products_ydoc.html" target= "_blank">yWorks UML Doclet</a>.
	Die verwendeten Icons wurden von <a href="http://www.freepik.com" title="Freepik" target="_blank" >Freepik</a> entworfen und k&ouml;nnen von <a href="http://www.flaticon.com" title="Flaticon" target="_blank" >Flaticon</a> kostenlos heruntergeladen werden. In dem Spiel wurden folgende Icons verwendet: <br />
	<a href="http://www.flaticon.com/free-icon/chart-gantt_31970" target="_blank" title="Flaticon">Chart Gantt</a>, 
	<a href="http://www.flaticon.com/free-icon/e-mail-envelope-ios-7-interface-symbol_20520" title="Flaticon" target="_blank" >E-mail envelope, IOS7 interface symbol</a>,
	<a href="http://www.flaticon.com/free-icon/stats-document_36170" title="Flaticon" target="_blank" >Statsdocument</a>,
	<a href="http://www.flaticon.com/free-icon/taxi-cab_34869" title="Flaticon" target="_blank" >Taxi cab</a>,
	<a href="http://www.flaticon.com/free-icon/black-plane_3634" title="Flaticon" target="_blank" >Black plane</a>,
	<a href="http://www.flaticon.com/free-icon/businessmen-having-a-group-conference_31171" title="Flaticon" target="_blank" >Businessmen having a group conference</a>,
	<a href="http://www.flaticon.com/free-icon/man-in-office-desk-with-computer_11296" title="Flaticon" target="_blank" >Man in office desk with computer</a> und 
	<a href="http://www.flaticon.com/free-icon/cocktail-cup_8066" title="Flaticon" target="_blank" >Cocktail cup</a>.
	
	<hr />
	
	<%
	/* Read brillianCRM version from path of servlet.*/ 
	ServletContext sc = getServletContext();
	String scRealPath = sc.getRealPath("/");
	String[] scRealPathSplit = scRealPath.split("#");
	String versionID = scRealPathSplit[scRealPathSplit.length-1];
	versionID = versionID.substring(0, versionID.length()-1);
	 %> 
	<!--<p id="versionID" align="right" onClick="hero()"> <%= versionID %> </p>-->
              
            </div>
        </div>
    </section>
    
  

    <!-- Contact Section -->
    <section id="contact" class="container content-section text-center">
        <div class="row">
            <div class="col-lg-8 col-lg-offset-2">
                <h2>Contact BrillianICM Team</h2>
                <p>Feel free to email us to provide some feedback on our game, or to just to say hello!</p>
                <p><a href="mailto:HowBrillianAreYou">HowBrillianAreYou@brillianICM.com</a>
                </p>
              <!--  <ul class="list-inline banner-social-buttons">
                    <li>
                        <a href="https://twitter.com/SBootstrap" class="btn btn-default btn-lg"><i class="fa fa-twitter fa-fw"></i> <span class="network-name">Twitter</span></a>
                    </li>
                     <li>
                        <a href="https://github.com/IronSummitMedia/startbootstrap" class="btn btn-default btn-lg"><i class="fa fa-github fa-fw"></i> <span class="network-name">Github</span></a>
                    </li>
                    <li>
                        <a href="https://plus.google.com/+Startbootstrap/posts" class="btn btn-default btn-lg"><i class="fa fa-google-plus fa-fw"></i> <span class="network-name">Google+</span></a>
                    </li>
                </ul> -->
            </div>
        </div>
    </section>

    <!-- Map Section -->
 <!--<div id="map"></div>  -->  

    

    

</body>




  
</html>
