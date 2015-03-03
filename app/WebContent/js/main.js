$(document).ready(function(){	

	if(userid == null){	
		window.location.href = 'LogoutUser';		
	}else{
		
		$('.fancybox').fancybox();
		
		//Globale Variablen
		$xml = '';
		loc = '';
		locOld = '';
		eventtypeOld = '';
		tabsContainer = '';	
		firstFlag = false;
		newMailDisabled = true;
		firstEvent = 'l001e000';
		lastEvent = 'l999e999';
		jobofferEvent = 'l000e000';
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
			showPdf('documents/help.pdf');
		});
	
		$('#logout').bind('click', function(){
			window.location.href = 'LogoutUser';
		});	
		
		$('.projektStrukturPlanButton').bind('click', function(){
			showPdf('documents/PSP.pdf');
		});
		
		$('.projektCharterButton').bind('click', function(){
			showPdf('documents/project_charter.pdf');
		});
		
		$('.ganttButton').bind('click', function(){
			showPdf('documents/project.pdf');
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
					
				}catch(err){
					lastName = 'Max';
					firstName = 'Mustermann';
					gender = '1';
					imcost = '50';
					imqual = '50';
					imtime = '50';				
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
	}		
});