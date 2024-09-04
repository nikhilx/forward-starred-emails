function forwardStarredEmails() {
  var label = GmailApp.getUserLabelByName("Forwarded");
  var threads = GmailApp.search("is:starred -label:Forwarded");
  let threadCounter = 0;
  let messageCounter = 0;
  threads.forEach(function(thread) {
    var messages = thread.getMessages();
    messages.forEach(function(message) {
      if (message.isStarred() && !message.isInTrash()) {
        // Construct the forwarded message header with HTML line breaks
        Logger.log({ message: message.getFrom()});
        var forwardedHeader = "---------- Forwarded message ---------<br>" +
                              "From: <strong>" + message.getFrom().replace(/</g, '&lt;').replace(/>/g, '&gt;') + "</strong><br>" +
                              "Date: " + message.getDate() + "<br>" +
                              "Subject: " + message.getSubject() + "<br>" +
                              "To: " + message.getTo().replace(/</g, '&lt;').replace(/>/g, '&gt;') + "<br><br>";
                              "Cc: " + message.getCc().replace(/</g, '&lt;').replace(/>/g, '&gt;') + "<br>" +
                              "Bcc: " + message.getBcc().replace(/</g, '&lt;').replace(/>/g, '&gt;') + "<br><br>";

        var emailOptions = {
          attachments: message.getAttachments().map(attachment => attachment.copyBlob()), // Convert attachments to BlobSource[]
          htmlBody: forwardedHeader + message.getBody()  // Include HTML content
        };

        Logger.log({ message: `Sending email with subject ${message.getSubject()}`})
        // Sending email without setting the 'from' field
        const recipientEmail = PropertiesService.getScriptProperties().getProperty('RECIPIENT_EMAIL')
        if(!recipientEmail) {
          throw new Error('RECIPIENT_EMAIL not set');
        }
        GmailApp.sendEmail(recipientEmail, "Fwd: Indexnine - " + message.getSubject(), "", emailOptions);

        // Add the "Forwarded" label to the thread after processing
        thread.addLabel(label);
        messageCounter++;
      }
    });
    threadCounter++;
  });
  Logger.log({ message: `Sent ${messageCounter} messages in ${threadCounter} threads`});
}