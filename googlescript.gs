// if you want to store your email server-side (hidden), uncomment the next line
var TO_ADDRESS = "xxxyyyzzz@dummyxyz.com";

// spit out all the keys/values from the form in HTML for email
// uses an array of keys if provided or the object to determine field order
function formatMailBody(obj, order) {
  var result = "";
  if (!order) {
    order = Object.keys(obj);
  }
  
  // loop over all keys in the ordered form data
  for (var idx in order) {
    var key = order[idx];
    result += "<h4 style='text-transform: capitalize; margin-bottom: 0'>" + key + "</h4><div>" + sanitizeInput(obj[key]) + "</div>";
  }
  return result;
}

// sanitize content from the user - trust no one 
// ref: https://developers.google.com/apps-script/reference/html/html-output#appendUntrusted(String)
function sanitizeInput(rawInput) {
   var placeholder = HtmlService.createHtmlOutput(" ");
   placeholder.appendUntrusted(rawInput);
  
   return placeholder.getContent();
}

function doPost(e) {

  try {
    Logger.log(e); // the Google Script version of console.log see: Class Logger
    
    // shorter name for form data
    var mailData = e.parameters;

    // names and order of form elements (if set)
    var orderParameter = e.parameters.formDataNameOrder;
    var dataOrder;
    if (orderParameter) {
      dataOrder = JSON.parse(orderParameter);
    }
    
    // if you have your email uncommented above, it uses that `TO_ADDRESS`; otherwise, it defaults to the email provided by the form's data attribute
    var sendEmailTo = (typeof TO_ADDRESS !== "undefined") ? TO_ADDRESS : mailData.formGoogleSendEmail;
    
    // send email if to address is set
    if (sendEmailTo) {
      MailApp.sendEmail({
        to: String(sendEmailTo),
        subject: "Contact Form Submitted on the Fisher's Portofolio Hosted on Github Page",
        replyTo: String(mailData.email), // This is optional and reliant on your form actually collecting a field named `email`
        htmlBody: formatMailBody(mailData, dataOrder)
      });
    }

    return ContentService    // return json success results
          .createTextOutput(
            JSON.stringify({"result":"success",
                            "data": JSON.stringify(e.parameters) }))
          .setMimeType(ContentService.MimeType.JSON);
  } catch(error) { // if error return this
    Logger.log(error);
    return ContentService
          .createTextOutput(JSON.stringify({"result":"error", "error": error}))
          .setMimeType(ContentService.MimeType.JSON);
  }
}