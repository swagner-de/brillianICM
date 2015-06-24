
function showLocation () {
 	var tag = 'Location';
	var container = $('.mainEventContainer');
	var eventtype = $xml.find('event').attr('eventtype');
//	var backgroundPictureTransition1Url = 'images/locationBackgrounds/loc' + buttonId + 't1.png';
//	var backgroundPictureTransition2Url = 'images/locationBackgrounds/loc' + buttonId + 't2.png';
//	var backgroundPictureUrl = 'images/locationBackgrounds/loc' + buttonId + '.png';
	$('.mainEventContainerLaptop').window('close');
	$('.mainEventContainerPdf').window('close');
	container.window({closed:false,modal:false,noheader:true,draggable:false,resizable:false});
	container.panel({
		href:tag,
		onLoad:function(){

		hideDialog();
		hideSelection();
		hideAllocation();
		hideAllocationTwo();
		hideAllocationThree();
		hideMatrixAllocation();
		hideMatrixAllocationStandard();
		hideConversation();
		hidePictureContainer();
		hideTextBox();
		hideScrollBar();
		hideWorldmap();
		hideMatrixAllocationAlternate();
		
	    			// Musik am Anfang
					/* if(eventtype=="1"){
	    			var audioElement = document.createElement('audio');	
	    			audioElement.setAttribute('src', 'audio/location.mp3');
					//Gotta love that melody!
					var audiosetting="false";
					audiosetting=getCookie("audio");
					if (audiosetting == "true") {
					audioElement.play();	}
					}*/
	    			
	    			/* Loads background images in a row and finally loads Dialog or alike. 
	    			 * @author Laluz
	    			 */
	    		//	fancyImageLoading(backgroundPictureTransition1Url, $('.locationBackgroundContainer'));
	    		//	setTimeout(function(){
	    			//	fancyImageLoading(backgroundPictureTransition2Url, $('.locationBackgroundContainer'));
	    			//	setTimeout(function(){
	    					//fancyImageLoading(backgroundPictureUrl, $('.locationBackgroundContainer'));					
	    					setTimeout(function(){
	    							if(eventtype == '3'){
	    								loadDialog();		
	    							}else if (eventtype == '14' || eventtype == '15'){								
	    								loadSelection();
	    							}else if (eventtype == '16' || eventtype == '17'){
	    								loadAllocation();
									}else if (eventtype == '18'){
										loadAllocationTwo();	
									}else if (eventtype == '19'){
										loadAllocationThree();											
									}else if (eventtype == '20'){
										loadMatrixAllocationStandard();	
									}else if (eventtype == '21'){
										loadMatrixAllocation();											
	    							}else if (eventtype == '22'){
	    								showNotification();	
									}else if (eventtype == '23'){
	    								loadConversation();										
	    							}else if (eventtype == '24'){
	    								loadTextBox();										
	    							}else if (eventtype == '25'){
	    								loadWorldMap();	
	    							}else if (eventtype == '26'){
	    								loadScrollBar();											
	    							}else if (eventtype=='27'){
										loadMatrixAllocationAlternate();
									}else if (eventtype=='2'){
										loadPictureContainer();
									}
									
	    				//	},1500);					
	    			//	},1500);
	    			},0);
		 }
	});				
}


//Browserweiche:
function checkBrowserName(name)
{ 
	var agent = navigator.userAgent.toLowerCase(); 
	if (agent.indexOf(name.toLowerCase())>-1) 
	{ 
		return true; 
	} 
	return false; 
} 

function changeFunc() {
    var selectBox = document.getElementById("contry-list");
    var selectedValue = selectBox.options[selectBox.selectedIndex].value;
	var nextEvent="";
	$countrySelectionXml.find('option').each(function(){
		var country = $(this).text();
		
		if (selectedValue == country){
			nextEvent = $(this).attr('href');
		}
	});
	getXml(nextEvent);
}





function setDescription(container, itemRank, itemDescription){
	var tdId='rank'+itemRank;
	document.getElementById(tdId).innerHTML=itemDescription;
	
}


function loadBackground(){
	var background;
	var backgroundWithPartnerUrl;
	if ($xml.find('bgimg').text() != '') {
		background = $xml.find('bgimg').text();
		backgroundWithPartnerUrl = 'images/' + background;
		setBackground(backgroundWithPartnerUrl, false);
	}
}

function loadVideo(){
	var video;
	var videoWithPartnerUrl;
	var	videoEnabled=getCookie("video");
	if (($xml.find('bgvid').text() != '') && (videoEnabled == "true")){
		video = $xml.find('bgvid').text();
		videoWithPartnerUrl=window.location.href;
		position = videoWithPartnerUrl.lastIndexOf('/');
		videoWithPartnerUrl = videoWithPartnerUrl.slice(0, position+1);
		videoWithPartnerUrl = videoWithPartnerUrl.concat("/videos/" + video);
		setVideo(videoWithPartnerUrl);
	} 
}



	


function setVideo (backgroundUrl) {
	//since it will always be a different dialogue video no comparison with the old video is necessary
	var vid = document.getElementById('background-video');
	$('.dialogContainer video').css('display','block');
	vid.src = backgroundUrl;
	setTimeout(function(){
		vid.play();
	}, 2000);		
}


function setBackground (backgroundUrl) {
		document.getElementById('background-video').src = '';
		backgroundPictureUrlNew = 'url('+backgroundUrl+')';
			var eventtype = $xml.find('event').attr('eventtype');

			backgroundPictureUrlOld = $('.bgimg').css('background');
			if (backgroundPictureUrlOld.split("images/")[1] != backgroundPictureUrlNew.split("images/")[1]) {
				$('.bgimg').css('content', backgroundPictureUrlNew);
						$('.bgimg').css('width', '100%');
						$('.bgimg').css('height', '100%');
						$('.bgimg').css('float', 'left');
						$('.bgimg').css('z-index', '-1');
						$('.bgimg').css('image-size', 'cover');
			}
}


function wrongSelection(){
	showMsg('Info', 'Incorrect Selection.');
}
// function fancyImageLoading(imageUrl, element){
	// var img = new Array();
	// img[0] = new Image();
	// img[0].onload = function() {
		// element.css("background-image", "url('" + imageUrl + "')");
	// };
	// img[0].src = imageUrl;
// }



function showImprint () {
	var tag = 'Imprint';
	var container = $('.mainEventContainerImprint');
	$('.mainEventContainerPdf').window({closed:true});
	container.window({closed:false,modal:false,title:'Imprint',draggable:false,resizable:false,minimizable:false,maximizable:false,collapsible:false});
	container.panel({
		href:tag,
	});
}

function showAbout () {
	var tag = 'About';
	var container = $('.mainEventContainerImprint');
	$('.mainEventContainerPdf').window({closed:true});
	container.window({closed:false,modal:false,title:'About',draggable:false,resizable:false,minimizable:false,maximizable:false,collapsible:false});
	container.panel({
		href:tag,
	});
}

// Function to check if user has mobile device

/** Detect if site is accessed on a mobile device
 * @author Philipp E.
 */
function detectmob() { 
	 if( navigator.userAgent.match(/Android/i)
	 || navigator.userAgent.match(/webOS/i)
	 || navigator.userAgent.match(/iPhone/i)
	 || navigator.userAgent.match(/iPad/i)
	 || navigator.userAgent.match(/iPod/i)
	 || navigator.userAgent.match(/BlackBerry/i)
	 || navigator.userAgent.match(/Windows Phone/i)
	 ){
	    return true;
	  }
	 else {
	    return false;
	  }
	}


//Shows PDF in a jquery-easyui window - Example: showPdf('pdf/Bachelorarbeit.pdf');
//Get mobile check value. If User has mobile device, this function provides a link to the pdf document to open it in a new tap
//If User does not use mobile device, PDF will be shown as an iFrame inbound to a PDF Container.
function showPdf(pdfPath){
	
	if(detectmob() == true)
		{	
			this.window.open(pdfPath);	
		}
	else
		{
		var pdf = pdfPath.split("/")[1];
		
		if(pdf == ''){
			pdf ='PDF';
		}
		
		try{
			$('.mainEventContainerPdf').panel('destroy');
		}catch(err){
			
		}
		
		$('.mainWindow').append( '<div class="mainEventContainerPdf easyui-window" data-options="closed:true,width:863,height:576"></div>');
		
		var window = $('.mainEventContainerPdf');
		
		window.append('<iframe class="pdfContainer" width="845" height="531"></iframe>');
		
		var pdfContainer = $('.pdfContainer');
		
		pdfContainer.attr('src', pdfPath);	
		window.window({
			title:pdf,
		    width:863,
		    height:576,
		    closed:false,
		    modal:false,
		    draggable:false,
		    resizable:false,
		    minimizable:false,
		    maximizable:false,
		    collapsible:false,
		    onClose:function(){
		    	window.panel('destroy');
		    }
		});	
		$('.mainEventContainerImprint').window({closed:true});
		}
}

//Hides the worldmap elements
function hideWorldmap(){
	$('.worldmap').hide();
}

//Hides the worldmap elements
function showWorldmap(){
	$('.worldmap').show();
}

function hideMatrixAllocationAlternate(){
	$('.matrixAllocationContainerAlternate').hide();
}

function showMatrixAllocationAlternate(){
	$('.matrixAllocationContainerAlternate').show();
}


//Hides the dialog elements
function hideDialog () {
	// $('.centerContainer').hide();
	// $('.dialogTextContainerFit').hide();
	// $( '.dialogPartner').hide();
	// $( '.dialogButton').hide();
	$('.dialogContainer').hide();
}

//Shows the dialog elements
function showDialog () {
	$('.dialogContainer').show();
	// $('.centerContainer').show();
	// $('.dialogTextContainerFit').show();
	// $('.dialogPartner').delay(500).fadeIn( 'slow', function() {});						    
	// $('.dialogButton').delay(1500).fadeIn( 'slow', function() {});
}

function hideSelection () {
	$('.selectionContainer').hide();
}

function showSelection () {
	$('.selectionContainer').show();
}

function hideAllocation () {
	$('.allocationContainer').hide();
}
function showPictureContainer(){
	$('.pictureContainer').show();
}
function hidePictureContainer () {
	$('.pictureContainer').hide();
}
function showAllocation () {
	$('.allocationContainer').show();
}
function hideAllocationTwo () {
	$('.allocationContainerTwo').hide();
}

function showAllocationTwo () {
	$('.allocationContainerTwo').show();
}
function hideAllocationThree () {
	$('.allocationContainerThree').hide();
}

function showAllocationThree () {
	$('.allocationContainerThree').show();
}

function hideMatrixAllocationStandard(){
	$('.matrixAllocationContainerStandard').hide();
}

function showMatrixAllocationStandard(){
	$('.matrixAllocationContainerStandard').show();
}
function hideMatrixAllocation(){
	$('.matrixAllocationContainer').hide();
}

function showMatrixAllocation(){
	$('.matrixAllocationContainer').show();
}
function hideConversation(){
	$('.conversation').hide();
}

function showConversation(){
	$('.conversation').show();
}

function hideTextBox(){
	$('.textBox').hide();
}

function showTextBox(){
	$('.textBox').show();
}

function hideScrollBar(){
	$('.scrollBar').hide();
}

function showScrollBar(){
	$('.scrollBar').show();
}

function showEventContainer (container) {
	container.window({modal:false,closed:false});
}

function showEventContainerModal (container) {

	container.window({modal:true,closed:false});
}

function hideEventContainer (container){
	container.window({modal:false,closed:true,closable:false});
}

// Zeigt an, dass eine neue Mail gekommen ist
function showMsg (title, msg) {
	$.messager.show({
		title: title,
		timeout:5000,
		msg: msg
	});
}

// Final Screen showing result of user
function showResult () {
	var tag = 'Result';
	var container = $('.mainEventContainerResult');
	container.window({closed:false,modal:false,title:tag,draggable:false,resizable:false,minimizable:false,maximizable:false,collapsible:false});
	container.panel({
		href:tag,
		
		onLoad: function(){
			/*var audioElement = document.createElement('audio');	
			audioElement.setAttribute('src', 'audio/location.mp3');
			var audiosetting="false";
			audiosetting=getCookie("audio");
			if (audiosetting == "true") {
			audioElement.play();	}*/
			
			document.getElementById("cost").innerHTML="100%";
			document.getElementById("time").innerHTML="100%";
			document.getElementById("quality").innerHTML="100%";
			
		
			$(this).find('#imprint').bind('click', function(){
				showImprint();
			});

			$(this).find('#help').bind('click', function(){
				showPdf('documents/BA_notizblock.pdf');
			});

			$(this).find('#logout').bind('click', function(){
				sessionStorage.removeItem('userid');
				window.location.href = 'LogoutUser';
			});
		}
	});
}



// Shows that a screen is loading
function showLoading () {	
	var text = '';
	var imageUrl = '';
	var imageUrl2 = '';	
	var duration = 2;
	
	var window = $('.loadingScreen');
	var imageContainer = $('.loadingScreenImageContainer');
	
	// Hier wird die Audio-Datei abgespielt 
	// (Vielleicht kann man hier noch einen Filter einbauen??)
	/*var audioElement = document.createElement('audio');	
	audioElement.setAttribute('src', 'audio/location.mp3');
	var audiosetting="false";
	audiosetting=getCookie("audio");
	if (audiosetting == "true") {
	audioElement.play();	}*/
	
	//Um hässliche Ladeartefakte zu verhindern
	$('body').show();
	$('body').layout({
		fit:true
	});
	
	imageContainer.text(text);
	imageContainer.css('background-image', 'url('+imageUrl+')');
	window.window({closed:false});
	setTimeout(function(){
		imageContainer.css('background-image', 'url('+imageUrl2+')');
		setTimeout(function(){				
			window.fadeOut(duration, function(){
				window.window('close');
				getXml(gameData.id);
			});		
		},duration);	
	},duration);
}

// Function to set a cookie
function setCookie(cName, cValue, cExpire)
{
    var d = new Date();
    // number of days until cookie expires
    d.setTime(d.getTime() + (cExpire*24*60*60*1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cName + "=" + cValue + "; " + cExpire;
}

// Function to get a cookie
function getCookie(cName)
{
    var name = cName + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++)
    {
        var c = ca[i];
        while (c.charAt(0)==' ')
        {
        	c = c.substring(1);
        }
        if (c.indexOf(name) == 0)
    	{
        	// if found, return cookie name
        	return c.substring(name.length,c.length);
    	}
    }
    // return "" if cookie could not be found
    return "";
}

// Check if cookie exists
function checkCookie()
{
    var user=getCookie("Rick");
    // Cookie found and saved on user client (browser)
    if (user != "")
    {
        return true;
    }
    // Cookie not found on user client (browser): user = ""
    else
    {
    	return false;
    }
}

//Automatically executed when Browser-Window is resized
$(window).resize(function() {
	$('.mainEventContainer').window('center');
	$('.mainEventContainerLaptop').window('center');
	$('.mainEventContainerPdf').window('center');
	$('.mainEventContainerImprint').window('center');
	$('.transitionScreen').window('center');
	$('.mainEventContainerResult').window('resize');
	$('.loadingScreen').window('resize');	
});

// TODO CHECK CODE AFTER MERGE -#442

//Get Url Parameters - Example: $.getUrlVar('name');
$.extend({
	getUrlVars: function(){
		var vars = [], hash;
		try{
			var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
			for(var i = 0; i < hashes.length; i++)
			{
				hash = hashes[i].split('=');
				vars.push(hash[0]);
				vars[hash[0]] = hash[1].replace('%20', ' ');
			}
		}catch(err){
			//console.log('no parameters found');
		}
		return vars;
	},
	getUrlVar: function(name){
		return $.getUrlVars()[name];
	}
});

$.extend({	  
	// Arguments are image paths relative to the current page.
	preLoadImages: function() {
		var cache = [];
		var args_len = arguments.length;
		for (var i = args_len; i--;) {
			var cacheImage = document.createElement('img');
			cacheImage.src = arguments[i];
			cache.push(cacheImage);
		};
	}
});

//Get Url Parameters - Example: $.getUrlVar('name');
$.extend({
	getUrlVars: function(){
		var vars = [], hash;
		try{
			var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
			for(var i = 0; i < hashes.length; i++)
			{
				hash = hashes[i].split('=');
				vars.push(hash[0]);
				vars[hash[0]] = hash[1].replace('%20', ' ');
			}
		}catch(err){
			//console.log('no parameters found');
		}
		return vars;
	},
	getUrlVar: function(name){
		return $.getUrlVars()[name];
	}
});

$.extend({
	// Arguments are image paths relative to the current page.
	preLoadImages: function() {
		var cache = [];
		var args_len = arguments.length;
		for (var i = args_len; i--;) {
			var cacheImage = document.createElement('img');
			cacheImage.src = arguments[i];
			cache.push(cacheImage);
		};
	}
});




// Veränderung der TCQ IMAGES auf der Seite
function setTCQImages (imtime, imcost, imqual) {
	//Grenzen Rot:0-49 Grenzen Gelb 50-85 Grenzen Grün:86-100
	var kpi_competence = imtime;
	var kpi_behaviour = imcost;
	var kpi_communication = imqual;
	var svg_competence= document.getElementById("icon_competence");
	var svg_communication= document.getElementById("icon_communication");
	var svg_behaviour= document.getElementById("icon_behaviour");
	//grün: 49D26D
	//orange: FFAB58
	//rot: FF6C58


	var color_green="#49D26D";
	var color_orange="#FFAB58";
	var color_red="#FF6C58";
if(kpi_competence >85){
	svg_competence.setAttribute("fill",color_green);

}else if(kpi_competence<=85 && kpi_competence>49){
	svg_competence.setAttribute("fill",color_orange);

}else{
	svg_competence.setAttribute("fill",color_red);

}

	if(kpi_communication >85){
		svg_communication.setAttribute("fill",color_green);


	}else if(kpi_communication<=85 && kpi_communication>49){
		svg_communication.setAttribute("fill",color_orange);

	}else{
		svg_communication.setAttribute("fill",color_red);

	}

	if(kpi_behaviour >85){
		svg_behaviour.setAttribute("fill",color_green);


	}else if(kpi_behaviour<=85 && kpi_behaviour>49){
		svg_behaviour.setAttribute("fill",color_orange);

	}else{
		svg_behaviour.setAttribute("fill",color_red);

	}
}

// Veränderung der TCQ WERTE
function updateTCQValues (imtime, imcost, imqual) {
	try {
		if(imtime.charAt(0) == '+'){
			gameData.imtime = parseInt(gameData.imtime, 10) + parseInt(imtime.substring(1), 10);
		}else if (imtime.charAt(0) == '-'){
			gameData.imtime = gameData.imtime - imtime.substring(1);
		}
	}catch(err){

	}
	try {
		if(imcost.charAt(0) == '+'){
			gameData.imcost = parseInt(gameData.imcost, 10) + parseInt(imcost.substring(1), 10);
		}else if (imcost.charAt(0) == '-'){
			gameData.imcost = gameData.imcost - imcost.substring(1);
		}
	}catch(err){

	}
	try {
		if(imqual.charAt(0) == '+'){
			gameData.imqual = parseInt(gameData.imqual, 10) + parseInt(imqual.substring(1), 10);
		}else if (imqual.charAt(0) == '-'){
			gameData.imqual = gameData.imqual - imqual.substring(1);
		}
	}catch(err){

	}
	if(gameData.imtime>100){gameData.imtime=100;}
	else if(gameData.imtime<0){gameData.imtime=0;}
	if(gameData.imcost>100){gameData.imcost=100;}
	else if(gameData.imcost<0){gameData.imcost=0;}
	if(gameData.imqual>100){gameData.imqual=100;}
	else if(gameData.imqual<0){gameData.imqual=0;}
}
