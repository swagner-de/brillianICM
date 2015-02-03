function getXml(id) {	
	
	$.get('Event', {id : id, type : 'node'}, function(xml) {
		//Fix XML
		var str1 = '<events>';
		var str2 = '</events>';
		xml = str1 + xml + str2;
		
		//Replace Variables
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
		
		//General PageElement Variables
		var mainLocationButton = $('.mainLocationButton');
		var eventContainer = $('.mainEventContainerLaptop');
		
		// Anzeige der Elemente auf der rechten Seite
		if(level >= 12){
			$('.projektCharterButton').css('background-image', 'url(images/icons/Charter.png)');
			$('.projektCharterButton').show();
		}	
		
		if(level >= 202){
			$('.projektStrukturPlanButton').css('background-image', 'url(images/icons/Projektstrukturplan.png)');
			$('.projektStrukturPlanButton').show();
		}
		
		if(level >= 290){
			$('.ganttButton').css('background-image', 'url(images/icons/Gantt.png)');
			$('.ganttButton').show();
		}
		
		//Wird nur beim ersten Mal zu Beginn des Spiels ausgeführt
		if (firstFlag == false){			
			$('.welcome').text('Welcome ' + gameData.firstName + ' ' + gameData.lastName);
			if(locOld != loc || (eventtypeOld != '2' && eventtype == '2')){
				setTCQImages(gameData.imtime, gameData.imcost, gameData.imqual);
				setLevelImage(level);
			}
			firstFlag = true;
		}else{
			var imtime = $xml.find('event').attr('imtime');
			var imcost = $xml.find('event').attr('imcost');
			var imqual = $xml.find('event').attr('imqual');
			
			//Update der Time Cost Quality Werte
			updateTCQValues(imtime, imcost, imqual);
			
			//Füge die neue Id zum GamePath hinzu
			gameData.gamePath = gameData.gamePath + ';' + id;

			if(locOld != loc || (eventtypeOld != '2' && eventtype == '2')){
				setTCQImages(gameData.imtime, gameData.imcost, gameData.imqual);
				setLevelImage(level);
				saveGame(userid, gameData.gamePath, gameData.imtime, gameData.imcost, gameData.imqual);
			}
		}
		
		//Highlights Mail Button upon arrival of a new mail
		if(eventtype == '1' || eventtype == '2'){
			addHighlightMail();
		}
		if(eventtype == '1'){
			unreadMails.push(id);
		}
				
		//Show the 'New Mail' button only when a MailDraft-Event happens
		newMailDisabled = true;
		if(eventtype == 2){
			addBlinkerMailNew();
			newMailDisabled = false;
		}
		
		//Disable New Button
		try{
			tabsContainer.tabs({
				tools:[{
					text:'New',
					iconCls:'icon-add',
					handler:function(){
						showNewMailTab();
						newMailDisabled = true;
					},
					disabled:newMailDisabled
				}]
			});
		}catch(err){
			
		}
		
		//console.log('getXml > Id: ' + id + '; Time: ' + gameData.imtime + '; Cost: ' + gameData.imcost + '; Quality: ' + gameData.imqual); //For Debugging
		
		//Verstecke alle Location Inhalte
		hideDialog();
		hideSelection();
		hideAllocation();
		
		//Wenn Update Location und kein MailDraft
		if(locOld == loc && eventtype != '2'){		
			removeHighlight(mainLocationButton, loc);			
			//console.log('updateLocation > Id: ' + id + '; Time: ' + gameData.imtime + '; Cost: ' + gameData.imcost + '; Quality: ' + gameData.imqual); //For Debugging
		}
		
		if (eventtype == '3' && locOld == loc){			
			loadDialog();
		}else if ((eventtype == '4' || eventtype == '5') && locOld == loc){
			loadSelection();		
		}else if ((eventtype == '6' || eventtype == '7') && locOld == loc){
			loadAllocation();		
		}else if(eventtype == eventtypeOld && eventtype == '2') {
			loadMailDraft();		
		}else if(eventtype == '13' && locOld == loc){
			showNotification();
		}else{
			//Wenn das neue Event an einer anderen Location stattfindet bzw. das Event kein Dialog, keine Auswahl und keine Zuordnung ist			
			
			if(id != lastEvent){
				$('.mainLocationButton').linkbutton('enable');
			}
			
			if (eventtype == '1'){
				showMailNotification();
				hideLaptop();	
				hideLocation();
			}
			
			if(loc != ''){
				addHighlight(mainLocationButton, loc);
			}
				
			if(eventtype != eventtypeOld && eventtypeOld == '2'){
				try{
					$('.mainLocationButton').linkbutton('enable');
					$('.mainMailButton').linkbutton('enable');
					showMsg('Info', 'Mail Sent'); //For Debugging
					eventContainer.window({modal:false,closable:true});					
					tabsContainer.tabs('close', 'New Mail');
					removeHighlightMailNew();
				}catch(err){
					
				};
			}			
			
			mainLocationButton.linkbutton({
			    onClick: function(){
			    	showLocation ($(this).attr('id'));			
			    }
			});

			$('.mainMailButton').linkbutton({
				onClick: function(){
					showLaptop();
					removeHighlightMail();
				}				
			});				
		}
		
		if(id == firstEvent){
			showLocation('1');	
		}else if(id == lastEvent){
			showResult();
		}
		
		//Setzte die Werte für locOld & eventtypeOld - wichtig für logische Überprüfungen im nächsten Durchlauf
		if(eventtype == '1'){
			locOld = '';
		}else{
			locOld = loc;
		}	
		eventtypeOld = eventtype;
	});	
}

function loadMail (from, to, date, subject, content, attachment, attachmentHref) {
	var tag = 'Mail';
	
	if (tabsContainer.tabs('exists', subject)){
		tabsContainer.tabs('select', subject);
	}else{
		tabsContainer.tabs('add',{
		    title:subject,
		    href:tag,
		    closable:true
		});
		
		tabsContainer.tabs('getSelected').panel({
			href:tag,
			onLoad:function(){
				$(this).find('.from').text(from);
				$(this).find('.to').text(to);
				$(this).find('.date').text(date);
				$(this).find('.subject').text(subject);
				$(this).find('.content').html(content);
				$(this).find('.attachment').text(attachment);
				$(this).find('.attachment').attr('data-href', attachmentHref);
				
				$(this).find('.attachment').bind('click', function(){
					showPdf('documents/' + $(this).attr('data-href'));
				});				
			}
		});	
	}
}

//Herunterladen der neuen MailDraft
function loadMailDraft () {
	var window = $('.mainEventContainerLaptop');
	//MailDraft Event Values from XML
	var from = $xml.find('from').text();
	var to = $xml.find('to').text();
	var date = $xml.find('date').text();
	var subject = $xml.find('subject').text();
	var container = $('.mailDraftContainer');
	
	var optionButton = container.find('.option');
	$('.mainLocationButton').linkbutton('disable');
	window.window({modal:false,closable:false});
	$('.mainMailButton').linkbutton('disable');
	container.find('.from').text(from);
	container.find('.to').text(to);
	container.find('.date').text(date);
	container.find('.subject').text(subject);
	
	$xml.find('content').each(function(index){
		var text = $xml.find('content').eq(index).html();
		container.find('.content').eq(index).html(text);
	});
	
	optionButton.unbind('click');
	
	$xml.find('option').each(function(index){
		var text = $xml.find('option').eq(index).text();
		var href = $xml.find('option').eq(index).attr('href');
		
		optionButton.eq(index).text(text);
		optionButton.eq(index).bind('click', function(){
	        getXml(href);
	    });
	});	
}

//Herunterladen des neuen Dialogs
function loadDialog () {
	var partner = $xml.find('partner').text();
	var content = $xml.find('content').text();
	var background = $xml.find('bgimg').text();
	var dialogPartnerNameContainer = $('.dialogPartnerName');
	var dialogPartnerTextContainer = $('.dialogPartnerText');
	//Lade den Dialog Hintergrund
	var backgroundPictureWithPartnerUrl = 'images/' + background;
	setDialogBackground(backgroundPictureWithPartnerUrl);
		
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
	showDialog();
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
		if (eventtype == 5){
			var img = 'images/' + $xml.find('option').eq(index).attr('img');
			imgContainer.eq(index).attr('src', img);
			$('.selectionContainer').find('.fancybox').eq(index).attr('href', img);
			$('.selectionContainer').find('.fancybox').fancybox();
		}
	});
	if (eventtype == 5){
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

	$('.drag').remove();
	
	$xml.find('option').each(function(index){
		var itemText = $(this).text();
		var itemColumn = $(this).attr('column');
		var itemInfo = $(this).attr('finfo');
		var itemDescription = $(this).attr('fdesc');
		var itemRank = $(this).attr('rank');	
		draggableContainer.append('<div class="drag bc bph" data-column="' + itemColumn + '" data-finfo="' + itemInfo + '" data-fdesc="' + itemDescription + '" data-rank="' + itemRank + '">' + itemText + '</div>');
	});
	
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

function fancyImageLoading(imageUrl, element){
	var img = new Array();
	img[0] = new Image();
	img[0].onload = function() {
		element.css("background-image", "url('" + imageUrl + "')");
	};
	img[0].src = imageUrl;
}

function showLocation (buttonId) {			
	var tag = 'Location';
	var container = $('.mainEventContainer');
	var mainLocationButton = $('.mainLocationButton');	
	var eventtype =$xml.find('event').attr('eventtype');
	var loc = $xml.find('event').attr('loc');
	var backgroundPictureTransition1Url = 'images/locationBackgrounds/loc' + buttonId + 't1.png';
	var backgroundPictureTransition2Url = 'images/locationBackgrounds/loc' + buttonId + 't2.png';
	var backgroundPictureUrl = 'images/locationBackgrounds/loc' + buttonId + '.png';
	
	$('.mainEventContainerLaptop').window('close');
	$('.mainEventContainerPdf').window('close');
	
	$('.mainLocationButton').linkbutton('disable');
	container.window({closed:false,modal:false,noheader:true,draggable:false,resizable:false});
	container.panel({
		href:tag,
		onLoad:function(){

			hideDialog();
			hideSelection();
			hideAllocation();

			if(buttonId == loc){
				removeHighlight(mainLocationButton, loc);
			}
			var audioElement = document.createElement('audio');	
			audioElement.setAttribute('src', 'audio/location.mp3');
			audioElement.play();	
			
			fancyImageLoading(backgroundPictureTransition1Url, $('.locationBackgroundContainer'));
			setTimeout(function(){
				fancyImageLoading(backgroundPictureTransition2Url, $('.locationBackgroundContainer'));
				setTimeout(function(){
					fancyImageLoading(backgroundPictureUrl, $('.locationBackgroundContainer'));					
					setTimeout(function(){
						if(buttonId == loc){
							if(eventtype == '3'){
								loadDialog();		
							}else if (eventtype == '4' || eventtype == '5'){								
								loadSelection();
							}else if (eventtype == '6' || eventtype == '7'){
								loadAllocation();							
							}else if (eventtype == '13'){
								showNotification();							
							}
						}else{
							$('.mainLocationButton').linkbutton('enable');
							container.window({modal:false});
						}						
					},2500);					
				},2500);
			},2500);			
		}
	});
}

function showLaptop () {
	var tag = 'Laptop';
	var container = $('.mainEventContainerLaptop');
	var eventtype = $xml.find('event').attr('eventtype');
		
	container.window({closed:false,modal:false,title:'Laptop',draggable:false,resizable:false,minimizable:false,maximizable:false,collapsible:false});
	container.panel({
		href:tag,
		onLoad:function(){				
			tabsContainer = $('.laptopMailClient');
			var inbox = $('.laptopMailClientInbox');
			var inboxData = {'mails': []};

			$('.laptopMailClient div.tabs-panels').addClass('bc');

			tabsContainer.tabs({
				tools:[{
					text:'New',
					iconCls:'icon-add',
					handler:function(){
						showNewMailTab();
						newMailDisabled = true;
					},
					disabled:newMailDisabled
				}]
			});
			
			if(eventtype == '2'){
				addBlinkerMailNew();
			}
			
			$.get('Event', {gamePath : gameData.gamePath, type : 'inbox'}, function(inboxXml){
				var str1 = '<events>';
				var str2 = '</events>';
				inboxXml = str1 + inboxXml + str2;
				inboxXml = inboxXml.replace(/%prename%/g, gameData.firstName);
				inboxXml = inboxXml.replace(/%surname%/g, gameData.lastName);
				inboxXml = inboxXml.replace(/%gender%/g, gameData.address);	
				
				var $inboxXml = $(inboxXml);

				//General Event Values from XML
				$inboxXml.find('event').each(function(index){
					var id = $(this).attr('id');
					var from = $(this).find('from').text();
					var to = $(this).find('to').text();
					var subject = $(this).find('subject').text();
					var date = $(this).find('date').text();
					var content = $(this).find('content').html();
					var attachment = $(this).find('attachment').text();
					var attachmentHref = $(this).find('attachment').attr('href');

					inboxData.mails.unshift({'id' : id, 'from' : from, 'to' : to, 'subject' : subject, 'date' : date, 'content' : content, 'attachment' : attachment, 'attachmentHref' : attachmentHref});
				});					
				
				inbox.datagrid({
					data: inboxData.mails,
					onClickRow: function(rowIndex, rowData){

						var	person1 = rowData.from;
						var	person2 = rowData.to;												
						var date = rowData.date;
						var subject = rowData.subject;
						var content = rowData.content;
						var attachment = rowData.attachment;
						var attachmentHref = rowData.attachmentHref;
													
						if($.inArray(rowData.id, unreadMails) != -1){
							$('#'+ $('.datagrid-row-selected').attr('id')).css('font-weight', 'normal');
	            		}

						loadMail(person1, person2, date, subject, content, attachment, attachmentHref);
						
						unreadMails = $.grep(unreadMails, function(value) {
							return value != rowData.id;
						});
					},
					rowStyler: function(rowIndex,rowData){
	                    if($.inArray(rowData.id, unreadMails) != -1){
	                    	return 'font-weight:bold;';
	            		}
	                }
				});
			});
		}			
	});
}

//Zeigt den Tab NewMail zum Verfassen eines MailDraft an
function showNewMailTab () {
	var tag = 'MailDraft';
	if (tabsContainer.tabs('exists', 'New Mail')){
		tabsContainer.tabs('select', 'New Mail');
	}else{
		tabsContainer.tabs('add',{
		    title:'New Mail',
		    href:tag,
		    closable:false
		});
		
		var firstTabLoad = 0;
		tabsContainer.tabs('getTab', 'New Mail').panel({
			href:tag,
			onLoad:function(){
				if(firstTabLoad == 1){
					loadMailDraft();
				}
				firstTabLoad = 1;
			}
		});	
	}
}

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

//Shows PDF in a jquery-easyui window - Example: showPdf('pdf/Bachelorarbeit.pdf');
function showPdf(pdfPath){
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

//Do we need this? How is a MailDraft saved?
//I guess it is not saved!
function showMailNotification (){
	var from = $xml.find('from').text();
	var href = $xml.find('nextevent').attr('href');
	showMsg('Info', 'New mail from ' + from);
	$('.mainLocationButton').removeClass('menu-active');
	getXml(href);
}

function showNotification () {
	var text = $xml.find('content').text();
	var imageUrl = $xml.find('bgimg').text();	
	var duration = 3000;
	var href = $xml.find('nextevent').attr('href');
	showTransition(text, imageUrl, duration, href);
	$('.mainLocationButton').removeClass('menu-active');
}

// Veränderung der TCQ IMAGES auf der Seite
function setTCQImages (imtime, imcost, imqual) {
	
	var id = $xml.find('event').attr('id');
	var imgUrl = '';
	var tcqElement = $('.mainTCQ');
	
	if (imtime > 70) {
		if(imcost > 70){
			if(imqual > 70){
				imgUrl = '111';
			}else if(imqual >= 30 && imqual <= 70){
				imgUrl = '112';
			}else if (imqual < 30) {
				imgUrl = '113';
			}
		}else if(imcost >= 30 && imcost <= 70){
			if(imqual > 70){			
				imgUrl = '121';
			}else if(imqual >= 30 && imqual <= 70){
				imgUrl = '122';
			}else if (imqual < 30) {			
				imgUrl = '123';
			}
		}else if (imcost < 30) {
			if(imqual > 70){				
				imgUrl = '131';
			}else if(imqual >= 30 && imqual <= 70){				
				imgUrl = '132';
			}else if (imqual < 30) {				
				imgUrl = '133';
			}
		}
	}else if (imtime >= 30 && imtime <= 70) {
		if(imcost > 70){
			if(imqual > 70){
				imgUrl = '211';
			}else if(imqual >= 30 && imqual <= 70){
				imgUrl = '212';
			}else if (imqual < 30) {
				imgUrl = '213';
			}
		}else if(imcost >= 30 && imcost <= 70){
			if(imqual > 70){
				imgUrl = '221';
			}else if(imqual >= 30 && imqual <= 70){
				imgUrl = '222';
			}else if (imqual < 30) {
				imgUrl = '223';
			}
		}else if (imcost < 30) {
			if(imqual > 70){
				imgUrl = '231';
			}else if(imqual >= 30 && imqual <= 70){
				imgUrl = '232';
			}else if (imqual < 30) {
				imgUrl = '233';
			}
		}
	}else if (imtime < 30) {
		if(imcost > 70){
			if(imqual > 70){
				imgUrl = '311';
			}else if(imqual >= 30 && imqual <= 70){
				imgUrl = '312';
			}else if (imqual < 30) {
				imgUrl = '313';
			}
		}else if(imcost >= 30 && imcost <= 70){
			if(imqual > 70){
				imgUrl = '321';
			}else if(imqual >= 30 && imqual <= 70){
				imgUrl = '322';
			}else if (imqual < 30) {
				imgUrl = '323';
			}
		}else if (imcost < 30) {
			if(imqual > 70){
				imgUrl = '331';
			}else if(imqual >= 30 && imqual <= 70){
				imgUrl = '332';
			}else if (imqual < 30) {
				imgUrl = '333';
			}
		}
	}
	if(firstFlag == false || id == lastEvent){
		tcqElement.css('background-image', 'url(images/tcq/' + imgUrl + '.PNG)');
	}else{
		tcqElement.css('height', '0px');	
		setTimeout(function(){	
			tcqElement.css('height', '140px');
			tcqElement.css('background-image', 'url(images/tcq/' + imgUrl + '.PNG)');
		},1000);
	}	
}

// Lädt jeweils die aktuelle Zeitleiste der Projektphasen
function setLevelImage (level) {
	var imgUrlkl = '';
	var imgUrlgr = '';
		
	if (level >= 0 && level <= 20) {
		imgUrlkl = 'zeitleiste/phase1kl';
		imgUrlgr = 'zeitleiste/phase1gr';
	} else if (level >= 21 && level <= 65) {
		imgUrlkl = 'zeitleiste/phase2kl';
		imgUrlgr = 'zeitleiste/phase2gr';
	} else if (level >= 66 && level <= 90) {
		imgUrlkl = 'zeitleiste/phase3kl';
		imgUrlgr = 'zeitleiste/phase3gr';
	} else if (level >= 91 && level <= 202) {
		imgUrlkl = 'zeitleiste/phase4kl';
		imgUrlgr = 'zeitleiste/phase4gr';
	} else if (level >= 203 && level <= 293) {
		imgUrlkl = 'zeitleiste/phase5kl';
		imgUrlgr = 'zeitleiste/phase5gr';
	}  else if (level == 500 || level == 294) {
		imgUrlkl = 'zeitleiste/phase6kl';
		imgUrlgr = 'zeitleiste/phase6gr';
	} else if (level == 600) {
		imgUrlkl = 'zeitleiste/phase7kl';
		imgUrlgr = 'zeitleiste/phase7gr';
	} else if (level == 700) {
		imgUrlkl = 'zeitleiste/phase8kl';
		imgUrlgr = 'zeitleiste/phase8gr';
	} else if (level == 800) {
		imgUrlkl = 'zeitleiste/phase9kl';
		imgUrlgr = 'zeitleiste/phase9gr';
	}	
	$('.ProjectTimeline').find('.fancybox').attr( "href", "images/" + imgUrlgr + ".png");
	$('.ProjectTimeline').find('.fancybox').find('img').attr("src", "images/" + imgUrlkl + ".png");
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

//Sets the background picture for the dialog
function setLocation (backgroundPictureUrl) {
	$('.locationBackgroundContainer').css('background-image', 'url('+backgroundPictureUrl+')');
}

function setDialogBackground (backgroundPictureUrl) {
	backgroundPictureUrlNew = 'url('+backgroundPictureUrl+')';
	backgroundPictureUrlOld = $('.dialogContainer').css('background-image');
	if (backgroundPictureUrlOld.split("images/")[1] != backgroundPictureUrlNew.split("images/")[1]) {
		$('.dialogContainer').css('background-image', backgroundPictureUrlNew);
	}	
}

//Hides the dialog elements
function hideDialog () {
	$('.dialogContainer').hide();
	$('.dialogTextContainerFit').hide();
	$( '.dialogPartner').hide();
	$( '.dialogButton').hide();
}

//Shows the dialog elements
function showDialog () {
	$('.dialogContainer').show();
	$('.dialogTextContainerFit').show();
	$('.dialogPartner').delay(500).fadeIn( 'slow', function() {});						    
	$('.dialogButton').delay(1500).fadeIn( 'slow', function() {});
}

function hideLocation(){
	var container = $('.mainEventContainer');
	container.window({closed:true});
}

function hideLaptop(){
	var container = $('.mainEventContainerLaptop');
	container.window({closed:true});
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

function showEventContainer (container) {
	container.window({modal:false,closed:false});
}

function showEventContainerModal (container) {
	$('.mainLocationButton').linkbutton('disable');
	container.window({modal:true,closed:false});
}

function hideEventContainer (container){
	container.window({modal:false,closed:true,closable:false});
}

// Zeigt an, dass eine neue Mail gekommen ist
function showMsg (title, msg) {
	$.messager.show({
		title: title,
		timeout:3000,
		msg: msg
	});
}

// Adds Highlight to button (Location Button) referred to with current Id
function addHighlight (button, id) {
	$.each(button, function(){
		if($(this).attr('id') == id){
			$(this).addClass('elementHighlight');
		}
	});	
}

//Removes Highlight from the button (Location Button) referred to with current Id
function removeHighlight (button, id) {	
	$.each(button, function(){
		if($(this).attr('id') == id){
			$(this).removeClass('elementHighlight');
		}
	});
}

// Adds Highlight to Mail Button
function addHighlightMail () {
	$('.mainMailButton').addClass('elementHighlight');
}

// Removes Highlight from Mail Button
function removeHighlightMail () {	
	$('.mainMailButton').removeClass('elementHighlight');
}

// Adds Blinker to NewMail (MailDraft) Button
function addBlinkerMailNew(selector){
    $('.tabs-tool').find('.l-btn').('.elementBlinker').animate({opacity:0}, 50, "linear", function(){
    	$(this).delay(800);
    	$(this).animate({opacity:1}, 50, function(){
        addBlinkerMailNew(this);
        });
        $(this).delay(800);
    });
}

/*
function addBlinkerMailNew() {
	for(var times=0; times <=5; times++) {
    $('.tabs-tool').find('.l-btn').('.elementBlinker').fadeOut(500);
    $('.tabs-tool').find('.l-btn').('.elementBlinker').fadeIn(500);
	}
	addHighlightMailNew();
}
*/

// Adds Highlight to NewMail (MailDraft) Button
function addHighlightMailNew () {
	$('.tabs-tool').find('.l-btn').addClass('elementHighlight');
}

//Removes Highlight from NewMail (MailDraft) Button
function removeHighlightMailNew () {	
	$('.tabs-tool').find('.l-btn').removeClass('elementHighlight');
}

//Shows the fullscreen transition window
function showTransition (text, imageUrl, duration, href) {	
	var window = $('.transitionScreen');
	var imageContainer = $('.transitionScreenImageContainer');
	var textContainer = $('.transitionScreenTextContainer');
	textContainer.text(text);
	if(imageUrl != ''){
		imageContainer.css('background-image', 'url(images/'+imageUrl+')');
	}else{
		imageContainer.css('background-image', 'url(css/icons/blank.gif)');
	}
	window.window({closed:false});
	
	$('.transitionScreenImageContainer').unbind('click');
	$('.transitionScreenImageContainer').bind('click', function(){
		window.window('close');
		getXml(href);
	});
	
	var height1 = 520;
	var height2 = $('.transitionScreenTextContainer').height();

	height = height1 - height2;
	$('.transitionContinueButton').css('margin-top', height + 'px');
	$('.transitionContinueButton').linkbutton({
	    onClick: function(){
	    	window.window('close');
			getXml(href);
	    }
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
			audioElement.play();
			
			document.getElementById("cost").innerHTML=gameData.imcost+"%";
			document.getElementById("time").innerHTML=gameData.imtime+"%";
			document.getElementById("quality").innerHTML=gameData.imqual+"%";
			
			setTCQImages(gameData.imtime, gameData.imcost, gameData.imqual);
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
	audioElement.play();
	
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