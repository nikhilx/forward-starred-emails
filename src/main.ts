function forwardStarredEmails() {
  // Get the label we're using to track which emails are already forwarded
  const forwardingStatusLabel = getOrCreateForwardingStatusLabel();

  // Search for starred messages that are not in the 'Forwarding Status' label
  // to avoid sending duplicate emails
  let threads = GmailApp.search(`is:starred -label:${forwardingStatusLabel.getName()}`);
  let threadCounter = 0;
  let messageCounter = 0;

  threads.forEach(function(thread) {
    let messages = thread.getMessages();
    messages.forEach(function(message) {
      if (message.isStarred() && !message.isInTrash()) {

        // Construct the forwarded message header with HTML line breaks
        const forwardedHeader = constructForwardedHeader(message);

        const emailOptions = {
          attachments: message.getAttachments().map(attachment => attachment.copyBlob()), // Convert attachments to BlobSource[]
          htmlBody: forwardedHeader + message.getBody()  // Include HTML content
        };

        const recipientEmail = getRecipientEmail();
        const prefix = getSubjectPrefix();
        const originalSubject = message.getSubject();
        const subject = prefix ? `${prefix} ${originalSubject}` : originalSubject;

        Logger.log({ message: `Sending email with from ${message.getFrom()} and subject ${subject}`});
        GmailApp.sendEmail(recipientEmail, subject, "", emailOptions);

        // Add the label to the thread after processing
        thread.addLabel(forwardingStatusLabel);
        messageCounter++;
      }
    });
    threadCounter++;
  });
  Logger.log({ message: `Sent ${messageCounter} messages in ${threadCounter} threads`});
}