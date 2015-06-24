function getXml(id) {	
	//print name to into the "account" button
	$("#account").html(gameData.firstName+' '+ gameData.lastName);
	$.get('Event', {id : id, userid: userid, type : 'node'}, function(xml) {
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
		if (id=="l000e000") {
			$countrySelectionXml = $xml
			modifyPathsDependingOnGender($xml);
			loadDropDown($xml);
		}

		//General XML Event Variables
		var id = $xml.find('event').attr('id');
		var eventtype = $xml.find('event').attr('eventtype');
		var loc = $xml.find('event').attr('loc');
		var level = $xml.find('event').attr('level');
	
		// Display background-image
			$('.mainWindow').css('background-image', 'url(images/background/'+level+'.png)');
			$('.mainWindow').show();
		
		//Wird nur beim ersten Mal zu Beginn des Spiels ausgef�hrt (Get Name and set Level etc.)
		if (firstFlag == false){			
		$('.welcome').text('Welcome ' + gameData.firstName + ' ' + gameData.lastName);
			firstFlag = true;
		}else{
			var imtime = $xml.find('event').attr('imtime');
			var imcost = $xml.find('event').attr('imcost');
			var imqual = $xml.find('event').attr('imqual');
			updateTCQValues(imtime, imcost, imqual);
			gameData.gamePath = gameData.gamePath + ';' + id;
			setTCQImages(gameData.imtime, gameData.imcost, gameData.imqual);
			saveGame(userid, gameData.gamePath, gameData.imtime, gameData.imcost, gameData.imqual);
			//F�ge die neue Id zum GamePath hinzu
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
		hideScrollBar();
		hideMatrixAllocationAlternate();
		
		showLocation();
if(id == lastEvent){
			showResult();
			}
	});	
};



function modifyPathsDependingOnGender(xml){
	if (gameData.gender == 1){
		var countryStartingPointRegex = new RegExp('l[1-7]{1}0{2}e0{3}');
		$(xml).find("option").each(function(){
			var href = $(this).attr('href');
			if (href.match(countryStartingPointRegex)){
				$(this).attr('href', href.replace("e000", "e001"));
			}
		});
	}
}
function loadDropDown(xml){
	$('#contry-list').empty();
	var selectBox = document.getElementById("contry-list");
	opt = document.createElement("option");
	opt.innerHTML = "Select"
	selectBox.appendChild(opt);
	opt = null;

	$countrySelectionXml.find("option").each(function(){
		var country = $(this).text();
		//console.log(country);
		var opt = document.createElement("option");
		opt.innerHTML = country;
		selectBox.appendChild(opt);
		var completed = $(this).attr('completed');
		if(completed == "true"){
			 opt.style.backgroundColor = 'green' ;	
		}else { }

		
	});
}
$(document).ready(function(){

	if(userid == null){	
		window.location.href = 'LogoutUser';		
	}else{
		
		$('.fancybox').fancybox();
		
		//Globale Variablen
		$xml = '';
		loc = '';
		locOld = '';
		buttonIdOld = '';
		eventtypeOld = '';
		tabsContainer = '';	
		firstFlag = false;
		newMailDisabled = true;
		firstEvent = 'l000e000';
		lastEvent = 'l999e999';
		//jobofferEvent = 'l000e000';
		unreadMails = [];
		
		//Lokale Variablen
		var lastName;
		var firstName;	
		var gender;
		var address = '';
		var imtime;
		var imcost;
		var imqual;
		var gamePath;
		var id;
		var idArray;
		
		$('#imprint').bind('click', function(){
			showImprint();
		});
	
		$('#help').bind('click', function(){
			showPdf('documents/BA_notizblock.pdf');
		});
	
		$('#logout').bind('click', function(){
			window.location.href = 'LogoutUser';
		});	
		
		$('.projektStrukturPlanButton').bind('click', function(){
			showPdf('documents/WBS.pdf');
		});
		
		$('.projektCharterButton').bind('click', function(){
			showPdf('documents/Project_Charter.pdf');
		});
		
		$('.ganttButton').bind('click', function(){
			showPdf('documents/Project.pdf');
		});

		$('.mainLogo').bind('click', function(){
			showAbout();
		});
		
		$('.projektStrukturPlanButton').hide();
		$('.projektCharterButton').hide();
		$('.ganttButton').hide();
		
		//Get Game Data
		$.ajax({
			url: 'Event',
			type: 'get',
			dataType: 'html',
			data: {userid : userid, type : 'loadGame'},
			async: true,
			success: function(data) {
				
				try{
					var list = data.split("[")[1].split(']')[0].split(', ');
									
					lastName = list[0];
					firstName = list[1];
					gender = list[2];
					imcost = list[3];
					imqual = list[4];
					imtime = list[5];	
					gamePath = list[6];
					idArray = gamePath.split(';');
					id = idArray[idArray.length-1];
					setTCQImages(imtime, imcost, imqual);

				}catch(err){
					lastName = 'Mustermann';
					firstName = 'Max';
					gender = '1';
					imcost = '100';
					imqual = '100';
					imtime = '100';				
					gamePath = $.getUrlVar('gamePath');
					if(typeof gamePath == 'undefined'){
						gamePath = 'l000e000';
					}
					idArray = gamePath.split(';');
					id = idArray[idArray.length-1];
				}				
				
				if(gender == '0'){
					address = 'Mrs.';
				}else if (gender == '1'){
					address = 'Mr.';
				}

				gameData = { firstName : firstName, 
							 lastName : lastName, 
							 gender : gender,
							 address : address,
							 gamePath : gamePath, 
							 id : id, 
							 imtime : imtime, 
							 imcost : imcost, 
							 imqual : imqual
				};
				
				//console.log('LoadGame> ' + JSON.stringify(gameData));
				//Der Ladebildschirm
				showLoading();				
			} 
		});
		$.ajax({
			url: 'Event',
			type: 'get',
			dataType: 'html',
			data: {userid : userid, type : 'node', id :  "l000e000"},
			async: true,
			success: function(data) {
				$countrySelectionXml = $(data);
				modifyPathsDependingOnGender($countrySelectionXml);
				loadDropDown();
			}
		});
	}		
});
