# Gmeet_Attendance_Reader

<h3> Requirementes </h3>
<ul>
  <li> npm + nodeJs </li>
  <li> puppeteer </li>
  <li> Puppeteer - extra </li>
  <li> puppeteer-extra-plugin-stealth </li>
All the above requirements can be installed with the below code <br><br>
  <b> npm install puppeteer puppeteer-extra puppeteer-extra-plugin-stealth </b> <br><br>
  
  <li> Google Sheets API Credentials </li>
  
  Go to console.developer.google.com -> credentials -> create one credential file by accepting OAuth consent screen -> save the file with the name keys.json
  
  Refer https://developers.onelogin.com/api-docs/1/getting-started/working-with-api-credentials for detailed explanation of creating credentials.
  
  Note : keys.json file and the readAttendance.js file should be in the same directory.
  
</ul>
  
<h3> Before Executing the js file  - IN readAttendance.js File </h3>
<ol>
  <li> Line 22 : provide the google meet url </li>
  <li> Line 23 : provide the mail id that is to be logged in </li>
  <li> Line 24 : provide password for the mail 
  <li> Line 25 : SpreadsheetId - Create a Google Spreadsheet and get the id from the url </li>
  Hint : https://docs.google.com/spreadsheets/d/ <b>the content here is required id</b> /edit#gid=0
</ol>
 
 Run the Program with - <b> node readAttendance.js </b>
