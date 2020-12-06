//const puppeteer = require('puppeteer');
const puppeteer = require('puppeteer-extra');
const fs = require('fs');
const {google} = require('googleapis');
const keys = require('./keys.json');

const StealthPlugin = require('puppeteer-extra-plugin-stealth')
puppeteer.use(StealthPlugin())




puppeteer.launch( {headless:true}). then(async browser => { try{
	const gmeetpage = await browser.newPage();
	const sheetpage = await browser.newPage();
	await gmeetpage.setDefaultNavigationTimeout(0); 
	await sheetpage.setDefaultNavigationTimeout(0); 


	await gmeetpage.setViewport( {height:1020, width:1820} )

	let meeturl = ""
	let email = ""
	let password = ""
	let spreadsheetid = ""

	await gmeetpage.goto("https://accounts.google.com/signin/v2/identifier?flowName=GlifWebSignIn&flowEntry=ServiceLogin");
	await gmeetpage.type('input#identifierId', email);
	await gmeetpage.click('div.VfPpkd-RLmnJb');
	await gmeetpage.waitForTimeout(8000)
	await gmeetpage.type('input[name="password"]', password )
	await gmeetpage.click('div#passwordNext')
	await gmeetpage.waitForTimeout(5000);
	await gmeetpage.goto(meeturl)
	await gmeetpage.waitForTimeout(6000);
	try { await gmeetpage.click('div.IYwVEf.uB7U9e.nAZzG.HotEze') } catch(e) { console.log("Audio is off")}
	try { await gmeetpage.click('div.IYwVEf.nAZzG.HotEze')} catch(e) { console.log("Video is off") }
	await gmeetpage.screenshot( { path:'shotys.png' } );

	await gmeetpage.click('span.NPEfkd.RveJvd.snByac')
	await gmeetpage.waitForTimeout(12000);
	await gmeetpage.click('span.DPvwYc.sm8sCf.azXnTb');
	await gmeetpage.waitForTimeout(5000);
	await gmeetpage.screenshot( { path:'shoty.png' } );
	console.log("Successfully Entered into the meet ! ");

	const client = new google.auth.JWT(
		keys.client_email,
		null,
		keys.private_key,
		['https://www.googleapis.com/auth/spreadsheets']
	);

	client.authorize( function(err,tokens) {
		if(err) { console.log(err); return; }
		else { console.log("Connected...!");
		}   

	});
 
	setInterval( async function () { gsrun(client); }, 2*60*1000);	
	

	async function gsrun(cl){

		var results = await gmeetpage.evaluate( () => {
			var just = document.getElementsByClassName("ZjFb7c");
			var ans = []
			for(var i=0; i<just.length; i++) {
				ans.push(just[i].innerText);
			}
			return ans;
		});


		const gsapi = google.sheets( {version:'v4',auth:cl} );
		var info;
		let valuess;
		
	
	
	
	
		var getopt = {
			spreadsheetId: spreadsheetid,   
			range: 'Sheet1'
		}
	
		var putopt = {
			spreadsheetId: spreadsheetid,
			range: 'Sheet1',
			valueInputOption: 'USER_ENTERED',
			resource: '',
			
	
		}
	
		info = (await gsapi.spreadsheets.values.get(getopt)).data.values;
		sheetmembers = [];
	
	   
		try {       
		for(var i=0; i<info.length; i++) {
			sheetmembers.push(info[i][0]);
		}}
		catch{ }
	
		console.log(sheetmembers);
		console.log(results);
		
	
		for(var i=0; i<sheetmembers.length; i++) {
			if( results.includes(sheetmembers[i]) ) { 
				valuess = [[(Number(info[i][1]) +2) ]];
				putopt.range = 'Sheet1!B' + (i+1) + ':B' + (i+1);
				putopt.resource = { values:valuess};
				await gsapi.spreadsheets.values.update(putopt);
			}
		}
		for(var i=0; i<results.length; i++) {
			if( sheetmembers.includes(results[i]) == false ) {
				valuess = [[results[i],2]];
				putopt.resource = { values:valuess};
				console.log("puts",i);
				
				await gsapi.spreadsheets.values.append(putopt);
			}
		}

		console.log("Updated");
	}
	







} catch(err) { console.log(err); await browser.close(); }
})
