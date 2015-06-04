function getXml(id) {	
	//print name to into the "account" button
	$("#account").html(gameData.firstName+' '+ gameData.lastName);
	
	$.get('Event', {id : id, type : 'node'}, function(xml) {
		//Fix XML
		var str1 = '<events>';
		var str2 = '</events>';
		xml = str1 + xml + str2;
	//alert(xml);
		
		/* Replaces Prename, Surname and Gender of the User */
		xml = xml.replace(/%prename%/g, gameData.firstName);
		xml = xml.replace(/%surname%/g, gameData.lastName);
		xml = xml.replace(/%gender%/g, gameData.address);
		
		//Create Jquery XML Element
		$xml = $(xml);
		
		//General XML Event Variables
		var id = $xml.find('event').attr('id');
		var eventtype = $xml.find('event').attr('eventtype');
		var loc = $xml.find('event').attr('loc');
		var level = $xml.find('event').attr('level');
	
		// Display background-image
			$('.mainWindow').css('background-image', 'url(images/background/'+level+'.png)');
			$('.mainWindow').show();
		
		//Wird nur beim ersten Mal zu Beginn des Spiels ausgeführt (Get Name and set Level etc.)
		if (firstFlag == false){			
		$('.welcome').text('Welcome ' + gameData.firstName + ' ' + gameData.lastName);
			firstFlag = true;
		}else{
			//Füge die neue Id zum GamePath hinzu
			gameData.gamePath = gameData.gamePath + ';' + id;
		}
		
		//Verstecke alle Location Inhalte
		hideDialog();
		hideSelection();
		hideAllocation();
		hideAllocationTwo();
		hideAllocationThree();
		hideMatrixAllocationStandard();
		hideMatrixAllocation();
		hideConversation();
		hideTextBox();
		hideWorldmap();
		
		showLocation();
if(id == lastEvent){
			showResult();
			}
	});	
}

function showLocation () {
 	var tag = 'Location';
	var container = $('.mainEventContainer');
	var eventtype =$xml.find('event').attr('eventtype');
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
		hideTextBox();
		hideWorldmap();
		
	    			// Musik am Anfang
					 if(eventtype=="1"){
	    			var audioElement = document.createElement('audio');	
	    			audioElement.setAttribute('src', 'audio/location.mp3');
					//Gotta love that melody!
					var audiosetting="false";
					audiosetting=getCookie("audio");
					if (audiosetting == "true") {
					audioElement.play();	}
					}
	    			
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
	    							}
	    				//	},1500);					
	    			//	},1500);
	    			},0);
		 }
	});				
}

//Loading the Worldmapmatrix 4x4
function loadWorldMap()
{
	// liest XML aus
	var href = $xml.find('nextevent').attr('href');
	var description = $xml.find('description').text();	
	loadWorldMapAsBackground();
	var positions = $xml.find('position');
	var xPos = positions.attr('x');
	var yPos = positions.attr('y');
	var indexId='b'+xPos+yPos;
	var targetQuadrant = document.getElementById(indexId);
	targetQuadrant.innerHtml="";
	targetQuadrant.setAttribute("onclick", "getXml('"+href+"')");
	
	
}
// Loading a dialog style event from the XML to perpare its content for display
function loadDialog () {
	var partner = $xml.find('partner').text();
	var content = $xml.find('content').text();
	var dialogPartnerNameContainer = $('.dialogPartnerName');
	var dialogPartnerTextContainer = $('.dialogPartnerText');
	
		loadBackground();
		loadVideo();

	$('.dialogButton').remove();
	dialogPartnerNameContainer.text(partner);
	dialogPartnerTextContainer.text(content);
	
		$xml.find('option').each(function(index){
		var text = $xml.find('option').eq(index).text();
		var href = $xml.find('option').eq(index).attr('href');
		var dialogTextContainer = $('.dialogTextContainer');
		
		dialogTextContainer.append('<div class="dialogButton"></div>');
		var dialogButton = $('.dialogButton').eq(index);

		dialogButton.linkbutton({
			text:text
		});
		dialogButton.bind('click', function(){				
	        getXml(href);
	    });		
	}); 	
	
	// //Cancels loaded TTS-Dialogues and resets the queue:
	// speechSynthesis.cancel();
		
	// // Generates TTS object and fill it with the content of the dialog partner:
	// // @param tts Text-to-Speech object and content loaded
	// // @param voices loads available voices and stores them
	// var tts = new SpeechSynthesisUtterance(content);
		
	// //Get all available voices for the browser and safe in an array:
	// var voices = window.speechSynthesis.getVoices();
	
	// //Checks if Cookie has TTS-settings on "true":
	// var ttsSettings="false";
	// ttsSettings=getCookie("tts");
	// if (ttsSettings == "true") {
		 
	 
	// //Setting speechSynthesis parameters for Male Voice:
	// tts.native = false;
	// tts.lang = 'en-GB';
	// tts.voice = speechSynthesis.getVoices().filter(function(voice) { return voice.name == 'Google UK English Male'; });
	
	// // Checks if the partner female and setting female parameters:
	// if(partner.indexOf('Thomas') == -1 && partner.indexOf('Pria') == -1 && partner.indexOf('Martin') == -1 && partner.indexOf('Avinash') == -1 && partner.indexOf('Rajesh') == -1 && partner.indexOf('Vance') == -1 && partner.indexOf('Stylus') == -1 && partner.indexOf('Jeremy') == -1)
		// {
		// //alert("Female detected!");
		// tts.native = false;
		// tts.lang = 'en-IE';
		// tts.voice = speechSynthesis.getVoices().filter(function(voice) { return voice.name == 'Moira'; });
		
		// if(checkBrowserName('chrome'))
			// {
			// //alert("Chrome detected");
			// tts.native = false;
			// tts.lang = 'en-US';
			// tts.voice = speechSynthesis.getVoices().filter(function(voice) { return voice.name == 'Google US English'; });
			// }
		// }
	// //Starts TTS:
	// speechSynthesis.speak(tts);
	 // }
	 
	//Opens the dialog:
	showDialog();
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

function loadSelection () {
	var eventtype = $xml.find('event').attr('eventtype');
	var description = $xml.find('description').text();
	var container = $('.selectionContainer');	
	var descriptionContainer =  container.find('.selectionTitleText');
	var imgContainer = container.find('.selectionPicture');
	var textContainer = container.find('.selectionText');
	var button = container.find('.selectionButton');


	descriptionContainer.text(description);
	
	$xml.find('option').each(function(index){
		var text = $xml.find('option').eq(index).text();
		var href = $xml.find('option').eq(index).attr('href');
		
		textContainer.eq(index).text(text);
		button.eq(index).bind('click', function(){
			$('.selectionContainer').hide();
			getXml(href);								        
	    });		
		
		if (eventtype == 15){
			var img = 'images/' + $xml.find('option').eq(index).attr('img');
			imgContainer.eq(index).attr('src', img);
			$('.selectionContainer').find('.fancybox').eq(index).attr('href', img);
			$('.selectionContainer').find('.fancybox').fancybox();
		}
	});
	if (eventtype == 15){
		imgContainer.show();
	}								
	showSelection();
}

function loadAllocation () {
	var href = $xml.find('nextevent').attr('href');
	var description = $xml.find('description').text();	
	var container = $('.allocationContainer');
	var descriptionContainer = container.find('.description');
	var phaseTitleContainer = container.find('.phaseTitle');
	var phaseContainer = container.find('.phase');
	var continueButton = $('#continueButton');
	var draggableContainer = $('.draggableContainer');
		loadBackground();
	$('.drag').remove();
	
	$xml.find('option').each(function(index){
		var itemText = $(this).text();
		var itemColumn = $(this).attr('column');
		var itemInfo = $(this).attr('finfo');
		var itemDescription = $(this).attr('fdesc');
		var itemRank = $(this).attr('rank');	
		//***code needed for tooltip function
		var itemTitle = $(this).attr('title');
		var itemHoverTitle = '';
		if ((itemTitle !== '') && (itemTitle !== undefined)) {
			var itemHoverTitle = ' title="' + itemTitle + '"';
		}
		//***
		draggableContainer.append('<div class="drag bc bph" data-column="' + itemColumn + '" data-finfo="' + itemInfo + '" data-fdesc="' + itemDescription + '" data-rank="' + itemRank + '"' + itemHoverTitle + '>' + itemText + '</div>');
	});
	
	// 
	
	var draggableItem = container.find('.drag');
	
	descriptionContainer.text(description);
	
	$xml.find('column').each(function(index){
		phaseTitleContainer.eq(index).text($(this).html());
	});
	
	continueButton.unbind('click');
	continueButton.bind('click', function(){
		$('.phase').css('background-color', '');
		var correct = true;
		var allDragged = true;
		
		//Check if Items are allocated in the right column
		$('.phase').each (function(index) {
			$(this).find('.drag').each(function(i) {
				if ($(this).attr('data-column')-1 != index){
					correct = false;
					$(this).addClass('dragIncorrect');
				}
			});
		});
		//Check if all items have been dragged
		$('.draggableContainer').find('.drag').each(function() {
				allDragged = false;
		});
		if (correct == true  && allDragged == true){
			getXml(href);
			container.window('close');
		} else {	
			if (allDragged == false){
				showMsg('Info', 'You have not allocated all elements'); //For Debugging
			}
			if (correct == false){
			showMsg('Info', 'Incorrect Allocation'); //For Debugging
			}					
		}
	});	
	showAllocation();
	
	//Drag Funktionalität
	draggableItem.draggable({
        proxy:'clone',
        revert:true,
        cursor:'auto',
        onStartDrag:function(){
            $(this).draggable('options').cursor='not-allowed';
            $(this).draggable('proxy').addClass('dp');
            
        	$('.dragInfoContainer').html('');
        	$('.dragInfoContainer').append('<div class="fbutton"><span class="fdescription"></span></div>');
        	
        	var infoButton = $('.fbutton');        	
        	var info = $(this).attr('data-finfo');
        	var description = $(this).attr('data-fdesc');
        	
        	infoButton.linkbutton({
        		text: description,
        		onClick: function(){
        			showPdf('documents/' + info);
        		}
        	});
            
            $(this).removeClass('dragIncorrect');
        },
        onStopDrag:function(){
            $(this).draggable('options').cursor='auto';
        }
    });
	
	//Drop Funktionalität
	phaseContainer.droppable({
        accept:'.drag',
        onDragEnter:function(e,source){
            $(source).draggable('options').cursor='auto';
            $(source).draggable('proxy').css('border','1px solid red');
            $(this).addClass('elementHighlight');
        },
        onDragLeave:function(e,source){
            $(source).draggable('options').cursor='not-allowed';
            $(source).draggable('proxy').css('border','1px solid #ccc');
            // elementHighlight can be found in master.css
            $(this).removeClass('elementHighlight');
        },
        onDrop:function(e,source){
            $(this).append(source);
            $(this).removeClass('elementHighlight');
        }
    });
}

function loadAllocationTwo () {
	var href = $xml.find('nextevent').attr('href');
	var description = $xml.find('description').text();	
	var container = $('.allocationContainerTwo');
	var descriptionContainer = container.find('.description');
	var phaseTitleContainerTwo = container.find('.phaseTitleTwo');
	var phaseContainerTwo = container.find('.phaseTwo');
	var continueButtonTwo = $('#continueButtonTwo');
	var draggableContainerTwo = $('.draggableContainerTwo');
		loadBackground();
	$('.drag').remove();
	
	$xml.find('option').each(function(index){
		var itemText = $(this).text();
		var itemColumn = $(this).attr('column');

		var itemInfo = $(this).attr('finfo');
		var itemDescription = $(this).attr('fdesc');
		var itemRank = $(this).attr('rank');	

		//***code needed for tooltip function
		var itemTitle = $(this).attr('title');
		var itemHoverTitle = '';
		if ((itemTitle !== '') && (itemTitle !== undefined)) {
			var itemHoverTitle = ' title="' + itemTitle + '"';
		}
		//***
		draggableContainerTwo.append('<div class="drag bc bph" data-column="' + itemColumn + '" data-finfo="' + itemInfo + '" data-fdesc="' + itemDescription + '" data-rank="' + itemRank + '"' + itemHoverTitle + '>' + itemText + '</div>');
	});
	
	
	
	var draggableItem = container.find('.drag');
	
	descriptionContainer.text(description);
	
	$xml.find('column').each(function(index){
		phaseTitleContainerTwo.eq(index).text($(this).html());
	});
	
	continueButtonTwo.unbind('click');
	continueButtonTwo.bind('click', function(){

		$('.phaseTwo').css('background-color', '');
		var correct = true;
		var allDragged = true;
		
		//Check if Items are allocated in the right column
		$('.phaseTwo').each (function(index) {
			$(this).find('.drag').each(function(i) {
				if ($(this).attr('data-column')-1 != index){
					correct = false;
					$(this).addClass('dragIncorrect');
				}
			});
		});
		//Check if all items have been dragged
		$('.draggableContainerTwo').find('.drag').each(function() {
				allDragged = false;
		});
		if (correct == true  && allDragged == true){
			getXml(href);
			container.window('close');
		} else {	
			if (allDragged == false){
				showMsg('Info', 'You have not allocated all elements'); //For Debugging
			}
			if (correct == false){
			showMsg('Info', 'Incorrect Allocation'); //For Debugging
			}					
		}
	});	
	showAllocationTwo();
	
	//Drag Funktionalität
	draggableItem.draggable({
        proxy:'clone',
        revert:true,
        cursor:'auto',
        onStartDrag:function(){
            $(this).draggable('options').cursor='not-allowed';
            $(this).draggable('proxy').addClass('dp');
            
        	$('.dragInfoContainerTwo').html('');
        	$('.dragInfoContainerTwo').append('<div class="fbutton"><span class="fdescription"></span></div>');
        	
        	var infoButton = $('.fbutton');        	
        	var info = $(this).attr('data-finfo');
        	var description = $(this).attr('data-fdesc');
        	
        	infoButton.linkbutton({
        		text: description,
        		onClick: function(){
        			showPdf('documents/' + info);
        		}
        	});
            
            $(this).removeClass('dragIncorrect');
        },
        onStopDrag:function(){
            $(this).draggable('options').cursor='auto';
        }
    });
	
	//Drop Funktionalität
	phaseContainerTwo.droppable({
        accept:'.drag',
        onDragEnter:function(e,source){
            $(source).draggable('options').cursor='auto';
            $(source).draggable('proxy').css('border','1px solid red');
            $(this).addClass('elementHighlight');
        },
        onDragLeave:function(e,source){
            $(source).draggable('options').cursor='not-allowed';
            $(source).draggable('proxy').css('border','1px solid #ccc');
            // elementHighlight can be found in master.css
            $(this).removeClass('elementHighlight');
        },
        onDrop:function(e,source){
            $(this).append(source);
            $(this).removeClass('elementHighlight');
        }
    });
}

function loadAllocationThree () {

	var href = $xml.find('nextevent').attr('href');
	var description = $xml.find('description').text();	
	var container = $('.allocationContainerThree');
	var descriptionContainer = container.find('.description');
	var phaseTitleContainerThree = container.find('.phaseTitleThree');
	var phaseContainerThree = container.find('.phaseThree');
	var continueButtonThree = $('#continueButtonThree');
	var draggableContainerThree = $('.draggableContainerThree');
	

		
	//Lade den Dialog Hintergrund
	loadBackground();


	$('.drag').remove();
	
	$xml.find('option').each(function(index){
		var itemText = $(this).text();
		var itemColumn = $(this).attr('column');

		var itemInfo = $(this).attr('finfo');
		var itemDescription = $(this).attr('fdesc');
		var itemRank = $(this).attr('rank');	

		//***code needed for tooltip function
		var itemTitle = $(this).attr('title');
		var itemHoverTitle = '';
		if ((itemTitle !== '') && (itemTitle !== undefined)) {
			var itemHoverTitle = ' title="' + itemTitle + '"';
		}
		//***
		draggableContainerThree.append('<div class="drag bc bph" data-column="' + itemColumn + '" data-finfo="' + itemInfo + '" data-fdesc="' + itemDescription + '" data-rank="' + itemRank + '"' + itemHoverTitle + '>' + itemText + '</div>');
	});
	
	
	
	var draggableItem = container.find('.drag');
	
	descriptionContainer.text(description);
	
	$xml.find('column').each(function(index){
		phaseTitleContainerThree.eq(index).text($(this).html());
	});
	
	continueButtonThree.unbind('click');
	continueButtonThree.bind('click', function(){

		$('.phaseThree').css('background-color', '');
		var correct = true;
		var allDragged = true;
		
		//Check if Items are allocated in the right column
		$('.phaseThree').each (function(index) {
			$(this).find('.drag').each(function(i) {
				if ($(this).attr('data-column')-1 != index){
					correct = false;
					$(this).addClass('dragIncorrect');
				}
			});
		});
		//Check if all items have been dragged
		$('.draggableContainerThree').find('.drag').each(function() {
				allDragged = false;
		});
		if (correct == true  && allDragged == true){
			getXml(href);
			container.window('close');
		} else {	
			if (allDragged == false){
				showMsg('Info', 'You have not allocated all elements'); //For Debugging
			}
			if (correct == false){
			showMsg('Info', 'Incorrect Allocation'); //For Debugging
			}					
		}
	});	
	showAllocationThree();
	
	//Drag Funktionalität
	draggableItem.draggable({
        proxy:'clone',
        revert:true,
        cursor:'auto',
        onStartDrag:function(){
            $(this).draggable('options').cursor='not-allowed';
            $(this).draggable('proxy').addClass('dp');
            
        	$('.dragInfoContainerThree').html('');
        	$('.dragInfoContainerThree').append('<div class="fbutton"><span class="fdescription"></span></div>');
        	
        	var infoButton = $('.fbutton');        	
        	var info = $(this).attr('data-finfo');
        	var description = $(this).attr('data-fdesc');
        	
        	infoButton.linkbutton({
        		text: description,
        		onClick: function(){
        			showPdf('documents/' + info);
        		}
        	});
            
            $(this).removeClass('dragIncorrect');
        },
        onStopDrag:function(){
            $(this).draggable('options').cursor='auto';
        }
    });
	
	//Drop Funktionalität
	phaseContainerThree.droppable({
        accept:'.drag',
        onDragEnter:function(e,source){
            $(source).draggable('options').cursor='auto';
            $(source).draggable('proxy').css('border','1px solid red');
            $(this).addClass('elementHighlight');
        },
        onDragLeave:function(e,source){
            $(source).draggable('options').cursor='not-allowed';
            $(source).draggable('proxy').css('border','1px solid #ccc');
            // elementHighlight can be found in master.css
            $(this).removeClass('elementHighlight');
        },
        onDrop:function(e,source){
            $(this).append(source);
            $(this).removeClass('elementHighlight');
        }
    });
}

function loadConversation(){
	// liest XML aus
	var href = $xml.find('nextevent').attr('href');
	var description = $xml.find('description').text();
	var containerConversation = $('.conversation');
	var descriptionContainerConversation = containerConversation.find('.description');
	descriptionContainerConversation.text(description);
	//Lade den Dialog Hintergrund	
		 loadBackground();
//globale Variablen
	var indexAB =0;
	
//dynamischer Ansatz
		$xml.find('messageBoxA, messageBoxB').each(function(index){	
		indexAB = index;
		  conversationElementAIndex = $xml.find('messageBoxA').eq(index).index();
		  conversationElementBIndex = $xml.find('messageBoxB').eq(index).index();
	
	if(conversationElementAIndex != "-1"){
		messageBoxA();
		}
		if(conversationElementBIndex != "-1"){
		messageBoxB();
		}
		});
				 function messageBoxA(){ 
					var text = $xml.find('messageBoxA').eq(indexAB).text();
					// NEW LINE 657
						var href = $xml.find('messageBoxA').eq(indexAB).attr('href');
						
						//text to speech			
	var tts = new SpeechSynthesisUtterance(text);
	speechSynthesis.speak(tts);
			
				// google voice
			/*		var audio = new Audio();
				audio.src ="http://www.translate.google.com/translate_tts?tl=en&q=" + text;
				audio.play(); */
					var messageBoxContainer = $('.dialogBox');
					messageBoxContainer.append('<div class="bc messageBoxAContainer"><div class="bc messageBoxA"></div><div class="bc messageBoxATriangle"></div><div class="bc messageBoxATriangle2"></div></div>');
					var messageBoxA = $('.messageBoxA').eq(indexAB).text(text);
					
					// NEW LINE 672 - 681
					var dialogButton = $('.messageBoxA').eq(indexAB);
					
					dialogButton.linkbutton({
						text:text
					});
					dialogButton.bind('click', function(){				
					getXml(href);
						speechSynthesis.cancel();
					});	
					
				 }
				 
				 
			 	 function messageBoxB(){
			var text = $xml.find('messageBoxB').eq(indexAB).text();
			// NEW LINE 688
			var href = $xml.find('messageBoxB').eq(indexAB).attr('href');
			
	var tts = new SpeechSynthesisUtterance(text);
	tts.native = false;
	tts.lang = 'en-GB';
	tts.voice = speechSynthesis.getVoices().filter(function(voice) { return voice.name == 'Google UK English Male'; });
	speechSynthesis.speak(tts);
			var messageBoxContainer = $('.dialogBox');
			messageBoxContainer.append('<div class="bc messageBoxBContainer"><div class="bc messageBoxB"></div><div class="bc messageBoxBTriangle"></div><div class="bc messageBoxBTriangle2"></div></div>');
			var messageBoxB = $('.messageBoxB').eq(indexAB);
			messageBoxB.text(text);
			
					// NEW LINE 700 - 709
					var dialogButton = $('.messageBoxB').eq(indexAB);
					
					dialogButton.linkbutton({
						text:text
					});
					dialogButton.bind('click', function(){				
					getXml(href);
						speechSynthesis.cancel();
					});	
				 } 
				 
				 	showConversation();
	var continueButtonMatrixConversation = $('#continueButtonMatrixConversation');

	
		
	continueButtonMatrixConversation.unbind('click');
	continueButtonMatrixConversation.bind('click', function(){
		getXml(href);
			speechSynthesis.cancel();
			containerConversation.window('close');
	});
}  

function loadTextBox(){
	// liest XML aus
	 var href = $xml.find('nextevent').attr('href');
	 var description = $xml.find('description').text();
	// alert("description");
	 var containerTextBox = $('.textBox');
	 var descriptioncontainerTextBox = containerTextBox.find('.description');
	 descriptioncontainerTextBox.text(description);
	//Lade den Dialog Hintergrund	
	 loadBackground();
	
	 var messageBox = $xml.find('message').text();
	 var messageContainerTest = containerTextBox.find('.messageBox');
	 messageContainerTest.text(messageBox);
 	 
	 var continueButtonTextBox = $('#continueButtonTextBox');

		showTextBox();
		
	 continueButtonTextBox.unbind('click');
	 continueButtonTextBox.bind('click', function(){
		 getXml(href);
			 speechSynthesis.cancel();
			 containerTextBox.window('close');
	 });
} 


function loadMatrixAllocation () {

	var href = $xml.find('nextevent').attr('href');
	var description = $xml.find('description').text();
	var container = $('.matrixAllocationContainer');
	var descriptionContainer = container.find('.description');

	
	//Auswahl des Divs welches die "Zielflächen" des Matrixspiels enthält um ihn droppable zu machen (akzeptieren von divs erlauben)
	var tileAcceptor = container.find('.tileAcceptor');
	var continueButtonMatrix = $('#continueButtonMatrix');
	//Enthält zuzuordnende tiles
	var draggableTilesContainer = $('.draggableTilesContainer');

	$('.dragTile').remove();
		loadBackground();
	$xml.find('option').each(function(index){
		var itemText = $(this).text();
		var itemRank = $(this).attr('rank');
		var itemDescription = $(this).attr('fdesc');
		//***code needed for tooltip function
		var itemTitle = $(this).attr('title');
		var itemHoverTitle = '';
		if ((itemTitle !== '') && (itemTitle !== undefined)) {
			var itemHoverTitle = ' title="' + itemTitle + '"';
		}
		//***
		draggableTilesContainer.append('<div class="dragTile bc bph" data-fdesc="' + itemDescription + '" rank="' + itemRank + '"' + itemHoverTitle +'>' + itemText + '</div>');
	});
	
	
	
	
	//Auswahl aller Tiles die beweglich sind
	var draggableItems = container.find('.dragTile');
	descriptionContainer.text(description);
	
	//Might be reused to name axes --> Low to High Impact/Priority
	//$xml.find('column').each(function(index){
	//	phaseTitleContainer.eq(index).text($(this).html());
	//});
	
	continueButtonMatrix.unbind('click');
	continueButtonMatrix.bind('click', function(){
		$('.tileAcceptor').css('background-color', '');
		var correct = true;
		var allDragged = true;
		
		//Iteriere durch TileAcceptors, für jeden TitleAcceptor prüfe, ob der Rank des sich in ihm befindlichen
		//dragTiles dem Iterator index entspricht. Im Idealfall befindet sich im ersten TileAcceptor das dragTile
		//mit dem rank "1"
		$('.tileAcceptor').each(function(index) {
			var correctTileRank = index+1;
			if ($(this).find('.dragTile').attr('rank') != null){
				var actualTileRank = $(this).find('.dragTile').attr('rank');
				if (actualTileRank != correctTileRank){
					correct = false;
					$(this).find('.dragTile').addClass('dragIncorrect');
				}
				
				} else {
					// Wird angezeigt wenn "rank" nicht als Attribut der dragTiles gefunden werden konnte
					//--> XML überprüfen
					showMsg("There has a been a problem with the validation!");
				}
			});
		
		


		//Check if all items have been dragged
		$('.draggableTilesContainer').find('.dragTile').each(function() {
				allDragged = false;
		});
		if (correct == true  && allDragged == true){
			getXml(href);
			container.window('close');
		} else {	
			if (allDragged == false){
				showMsg('Info', 'You have not allocated all elements.'); //For Debugging
			}
			if (correct == false){
				showMsg('Info', 'You have allocated one or more items incorrectly.'); //For Debugging
			}					
		}
	});	
	showMatrixAllocation();
	
	//Drag Funktionalität
	draggableItems.draggable({
        proxy:'clone',
        revert:true,
        cursor:'auto',
        onStartDrag:function(){
            $(this).draggable('options').cursor='not-allowed';
            $(this).draggable('proxy').addClass('dp');            
            $(this).removeClass('dragIncorrect');
        },
        onStopDrag:function(){
            $(this).draggable('options').cursor='auto';
        }
    });
	
	//Drop Funktionalität für Platzhalter in Matrix und Ursprungscontainer, sodass teile wieder zurückgelegt werden können
	tileAcceptor.droppable({
        accept:'.dragTile',
        onDragEnter:function(e,source){
            $(source).draggable('options').cursor='auto';
            $(source).draggable('proxy').css('border','1px solid red');
            $(this).addClass('elementHighlight');
        },
        onDragLeave:function(e,source){
            $(source).draggable('options').cursor='not-allowed';
            $(source).draggable('proxy').css('border','1px solid #ccc');
            // elementHighlight can be found in master.css
            $(this).removeClass('elementHighlight');
        },
        onDrop:function(e,source){
            $(this).removeClass('elementHighlight');
            // Wurde dem Zielfeld bereits eine Kachel zugeordnet, wird die Funktion abgebrochen, die Kachel bleibt wo sie ist. 
    		if (e.target.hasChildNodes()) { 
    			return;
    		}
            $(this).append(source);
        }
    });
	
	draggableTilesContainer.droppable({
        accept:'.dragTile',
        onDragEnter:function(e,source){
            $(source).draggable('options').cursor='auto';
            $(source).draggable('proxy').css('border','1px solid red');
            $(this).addClass('elementHighlight');
        },
        onDragLeave:function(e,source){
            $(source).draggable('options').cursor='not-allowed';
            $(source).draggable('proxy').css('border','1px solid #ccc');
            // elementHighlight can be found in master.css
            $(this).removeClass('elementHighlight');
        },
        onDrop:function(e,source){
            $(this).append(source);
            $(this).removeClass('elementHighlight');
        }
    });
}

function loadMatrixAllocationStandard () {

	var href = $xml.find('nextevent').attr('href');
	var description = $xml.find('description').text();

	var xAxisXML = $xml.find('xaxisdescription').text().toUpperCase();
	var yAxisXML = $xml.find('yaxisdescription').text().toUpperCase();
	var containerStandard = $('.matrixAllocationContainerStandard');
	var descriptionContainer = containerStandard.find('.description');
	var xAxisDescriptionContainer = $('.xAxisDescription');
	var yAxisDescriptionContainer = $('.yAxisDescription');
		loadBackground();
	//Auswahl des Divs welches die "Zielflächen" des Matrixspiels enthält um ihn droppable zu machen (akzeptieren von divs erlauben)
	var tileAcceptorStandard = containerStandard.find('.tileAcceptorStandard');
	var continueButtonMatrixStandard = $('#continueButtonMatrixStandard');
	//Enthält zuzuordnende tiles
	var draggableTilesContainerStandard = $('.draggableTilesContainerStandard');

	$('.dragTile').remove();
	
	$xml.find('option').each(function(index){
		var itemText = $(this).text();
		var itemRank = $(this).attr('rank');
		var itemDescription = $(this).attr('fdesc');
		//***code needed for tooltip function
		var itemTitle = $(this).attr('title');
		var itemHoverTitle = '';
		if ((itemTitle !== '') && (itemTitle !== undefined)) {
			var itemHoverTitle = ' title="' + itemTitle + '"';
		}
		//***
		draggableTilesContainerStandard.append('<div class="dragTile bc bph" data-fdesc="' + itemDescription + '" rank="' + itemRank + '"' + itemHoverTitle +'>' + itemText + '</div>');
	});
	
	
	
	
	//Auswahl aller Tiles die beweglich sind
	var draggableItems = containerStandard.find('.dragTile');
	descriptionContainer.text(description);
	xAxisDescriptionContainer.text(xAxisXML);
	yAxisDescriptionContainer.text(yAxisXML);
	
	//Might be reused to name axes --> Low to High Impact/Priority
	//$xml.find('column').each(function(index){
	//	phaseTitleContainer.eq(index).text($(this).html());
	//});
	
	continueButtonMatrixStandard.unbind('click');
	continueButtonMatrixStandard.bind('click', function(){
		$('.tileAcceptorStandard').css('background-color', '');
		var correct = true;
		var allDragged = true;
		
		//Iteriere durch TileAcceptors, für jeden TitleAcceptor prüfe, ob der Rank des sich in ihm befindlichen
		//dragTiles dem Iterator index entspricht. Im Idealfall befindet sich im ersten TileAcceptor das dragTile
		//mit dem rank "1"
		$('.tileAcceptorStandard').each(function(index) {
			var correctTileRank = index+1;
			if ($(this).find('.dragTile').attr('rank') != null){
				var actualTileRank = $(this).find('.dragTile').attr('rank');
				if (actualTileRank != correctTileRank){
					correct = false;
					$(this).find('.dragTile').addClass('dragIncorrect');
				}
				
				} else {
					// Wird angezeigt wenn "rank" nicht als Attribut der dragTiles gefunden werden konnte
					//--> XML überprüfen
					showMsg("There has a been a problem with the validation!");
				}
			});
		
		//Check if all items have been dragged
		$('.draggableTilesContainerStandard').find('.dragTile').each(function() {
				allDragged = false;
		});
		if (correct == true  && allDragged == true){
			getXml(href);
			containerStandard.window('close');
		} else {	
			if (allDragged == false){
				showMsg('Info', 'You have not allocated all elements.'); //For Debugging
			}
			if (correct == false){
				showMsg('Info', 'You have allocated one or more items incorrectly.'); //For Debugging
			}					
		}
	});	
	showMatrixAllocationStandard();
	
	//Drag Funktionalität
	draggableItems.draggable({
        proxy:'clone',
        revert:true,
        cursor:'auto',
        onStartDrag:function(){
            $(this).draggable('options').cursor='not-allowed';
            $(this).draggable('proxy').addClass('dp');            
            $(this).removeClass('dragIncorrect');
        },
        onStopDrag:function(){
            $(this).draggable('options').cursor='auto';
        }
    });
	
	//Drop Funktionalität für Platzhalter in Matrix und Ursprungscontainer, sodass teile wieder zurückgelegt werden können
	tileAcceptorStandard.droppable({
        accept:'.dragTile',
        onDragEnter:function(e,source){
            $(source).draggable('options').cursor='auto';
            $(source).draggable('proxy').css('border','1px solid red');
            $(this).addClass('elementHighlight');
        },
        onDragLeave:function(e,source){
            $(source).draggable('options').cursor='not-allowed';
            $(source).draggable('proxy').css('border','1px solid #ccc');
            // elementHighlight can be found in master.css
            $(this).removeClass('elementHighlight');
        },
        onDrop:function(e,source){
            $(this).removeClass('elementHighlight');
            // Wurde dem Zielfeld bereits eine Kachel zugeordnet, wird die Funktion abgebrochen, die Kachel bleibt wo sie ist. 
    		if (e.target.hasChildNodes()) { 
    			return;
    		}
            $(this).append(source);
        }
    });
	
	draggableTilesContainerStandard.droppable({
        accept:'.dragTile',
        onDragEnter:function(e,source){
            $(source).draggable('options').cursor='auto';
            $(source).draggable('proxy').css('border','1px solid red');
            $(this).addClass('elementHighlight');
        },
        onDragLeave:function(e,source){
            $(source).draggable('options').cursor='not-allowed';
            $(source).draggable('proxy').css('border','1px solid #ccc');
            // elementHighlight can be found in master.css
            $(this).removeClass('elementHighlight');
        },
        onDrop:function(e,source){
            $(this).append(source);
            $(this).removeClass('elementHighlight');
        }
    });
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

function loadWorldMapAsBackground(){
	var background;
	var backgroundWithPartnerUrl;
	if ($xml.find('worldmapImg').text() != '') {
		background = $xml.find('worldmapImg').text();
		backgroundWithPartnerUrl = 'images/' + background;
		setWorldMapBackground(backgroundWithPartnerUrl);
	}
	showWorldmap();
}

function setWorldMapBackground(backgroundUrl){
		document.getElementById('background-video').src = '';
		backgroundPictureUrlNew = 'url('+backgroundUrl+')';
			var eventtype = $xml.find('event').attr('eventtype');

			backgroundPictureUrlOld = $('.worldmapImg').css('background-image');
			if (backgroundPictureUrlOld.split("images/")[1] != backgroundPictureUrlNew.split("images/")[1]) {
				$('.worldmapImg').css('background-image', backgroundPictureUrlNew);
						$('.worldmapImg').css('background-repeat', 'no-repeat');
						$('.worldmapImg').css('margin', '0 auto');
			}
	}


	


function setVideo (backgroundUrl) {
	//since it will always be a different dialogue video no comparison with the old video is necessary
	var vid = document.getElementById('background-video');
	vid.src = backgroundUrl;
	setTimeout(function(){
		vid.play();
	}, 2000);		
}


function setBackground (backgroundUrl) {
		document.getElementById('background-video').src = '';
		backgroundPictureUrlNew = 'url('+backgroundUrl+')';
			var eventtype = $xml.find('event').attr('eventtype');

			backgroundPictureUrlOld = $('.bgimg').css('content');
			if (backgroundPictureUrlOld.split("images/")[1] != backgroundPictureUrlNew.split("images/")[1]) {
				$('.bgimg').css('content', backgroundPictureUrlNew);
						$('.bgimg').css('width', '100%');
						$('.bgimg').css('float', 'left');
						$('.bgimg').css('z-index', '-1');
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
			var audioElement = document.createElement('audio');	
			audioElement.setAttribute('src', 'audio/location.mp3');
			var audiosetting="false";
			audiosetting=getCookie("audio");
			if (audiosetting == "true") {
			audioElement.play();	}
			
			document.getElementById("cost").innerHTML="100%";
			document.getElementById("time").innerHTML="100%";
			document.getElementById("quality").innerHTML="100%";
			
		
			$(this).find('#imprint').bind('click', function(){
				showImprint();
			});

			$(this).find('#help').bind('click', function(){
				showPdf('documents/help.pdf');
			});

			$(this).find('#logout').bind('click', function(){
				sessionStorage.removeItem('userid');
				window.location.href = 'LogoutUser';
			});
		}
	});
}

//Saves the game data
function saveGame (userid, gamePath, imtime, imcost, imqual) {	
	$.get('Event', {userid : userid, gamePath : gamePath, imtime : imtime, imcost : imcost, imqual : imqual, type : 'saveGame'}, function(data){
		//console.log('SaveGame> userid: ' + userid + '; gamePath: ' + gamePath + '; Time: ' + imtime + '; Cost: ' + imcost + '; Quality: ' + imqual);
	});	
}

// Shows that a screen is loading
function showLoading () {	
	var text = '';
	var imageUrl = 'images/Gruppenfotos/Gruppenfoto_FINAL.png';
	var imageUrl2 = 'images/Gruppenfotos/Logo_Ladescreen.png';	
	var duration = 1000;
	
	var window = $('.loadingScreen');
	var imageContainer = $('.loadingScreenImageContainer');
	
	// Hier wird die Audio-Datei abgespielt 
	// (Vielleicht kann man hier noch einen Filter einbauen??)
	var audioElement = document.createElement('audio');	
	audioElement.setAttribute('src', 'audio/location.mp3');
	var audiosetting="false";
	audiosetting=getCookie("audio");
	if (audiosetting == "true") {
	audioElement.play();	}
	
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
