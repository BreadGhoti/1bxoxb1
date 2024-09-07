const SPREADSHEET_URL = "https://docs.google.com/spreadsheets/d/17AWjGkjuUGLqti5jCJccw-govSf7IaC7qUaBezJBnWM/edit?gid=0#gid=0";
const spreadsheet = SpreadsheetApp.openByUrl(SPREADSHEET_URL);
const worksheet = spreadsheet.getSheetByName("Sheet1");

function doGet() {
   let template = HtmlService.createTemplateFromFile('Index.html');
   let html = template.evaluate()
   .setTitle('1bxoxb1')
   .setSandboxMode(HtmlService.SandboxMode.IFRAME)
   .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
   return html;
 }

// To enable iframe use : 
// function doGet() {
//   let template = HtmlService.createTemplateFromFile('Index');
//   let html = template.evaluate()
//   .setTitle('1bxoxb1')
//   .setSandboxMode(HtmlService.SandboxMode.IFRAME)
//   .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
//   return html;
// }

function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename)
    .getContent();
}

function addNewRowToSheet(username, user_input) {
  worksheet.appendRow([new Date().toString(), username, user_input]);
  //date must be in string format so that it can be passed to client
  //https://developers.google.com/apps-script/guides/html/reference/run#myFunction(...)
}

function getSpreadsheetData() {
  //get all messages from spreadsheet
  const AllData = worksheet.getRange("A:C").getValues();

  //remove column heading
  AllData.shift();

  // remove empty arrays from AllData and return result
  return AllData.filter(function (el) {
    return el[0] != "";
  });
}
