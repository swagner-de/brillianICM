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
			modifyPathsDependingOnGender($xml);
		}

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
			var imtime = $xml.find('event').attr('imtime');
			var imcost = $xml.find('event').attr('imcost');
			var imqual = $xml.find('event').attr('imqual');
			updateTCQValues(imtime, imcost, imqual);
			gameData.gamePath = gameData.gamePath + ';' + id;
			setTCQImages(gameData.imtime, gameData.imcost, gameData.imqual);
			saveGame(userid, gameData.gamePath, gameData.imtime, gameData.imcost, gameData.imqual);
			//Füge die neue Id zum GamePath hinzu
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

