const SCRIPT_PROPERTIES = {
  FORWARDING_STATUS_LABEL: 'FORWARDING_STATUS_LABEL',
  RECIPIENT_EMAIL: 'RECIPIENT_EMAIL',
  SUBJECT_PREFIX: 'SUBJECT_PREFIX'
} as const;

/**
 * Retrieves or creates a Gmail label used to track email forwarding status.
 * The label name is retrieved from script properties. If the label does not exist, it is created.
 * Throws an error if the label name is not found in script properties.
 * 
 * @returns {GoogleAppsScript.Gmail.GmailLabel} The Gmail label for tracking email forwarding status.
 * @throws {Error} If the label name is not found in script properties.
 */
function getOrCreateForwardingStatusLabel(): GoogleAppsScript.Gmail.GmailLabel {
  const scriptProperties = PropertiesService.getScriptProperties();
  const labelName = scriptProperties.getProperty(SCRIPT_PROPERTIES.FORWARDING_STATUS_LABEL);
  
  if (!labelName) {
    throw new Error('Label name not found in script properties.');
  }
  
  let label = GmailApp.getUserLabelByName(labelName);
  if (!label) {
    label = GmailApp.createLabel(labelName);
  }
  
  return label;
}

/**
 * Retrieves the recipient email address from script properties.
 *
 * @return {string} The recipient email address.
 */
function getRecipientEmail(): string {
  const recipientEmail = PropertiesService.getScriptProperties().getProperty(SCRIPT_PROPERTIES.RECIPIENT_EMAIL);
  if (!recipientEmail) {
      throw new Error(`RECIPIENT_EMAIL not set`);
  }
  return recipientEmail;
}

/**
 * Retrieves the optional subject prefix for forwarded emails from script properties.
 * 
 * @returns {string|null} The subject prefix if set, otherwise null.
 */
function getSubjectPrefix(): string | null {
  const scriptProperties = PropertiesService.getScriptProperties();
  return scriptProperties.getProperty(SCRIPT_PROPERTIES.SUBJECT_PREFIX) || null;
}

/**
 * Constructs the HTML header for a forwarded email.
 * 
 * @param {GoogleAppsScript.Gmail.GmailMessage} message - The original Gmail message.
 * @returns {string} The HTML string for the forwarded message header.
 */
function constructForwardedHeader(message: GoogleAppsScript.Gmail.GmailMessage): string {
  const from = message.getFrom().replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const to = message.getTo().replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const cc = message.getCc().replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const bcc = message.getBcc().replace(/</g, '&lt;').replace(/>/g, '&gt;');
  
  return "---------- Forwarded message ---------<br>" +
         "From: <strong>" + from + "</strong><br>" +
         "Date: " + message.getDate() + "<br>" +
         "Subject: " + message.getSubject() + "<br>" +
         "To: " + to + "<br><br>" +
         "Cc: " + cc + "<br>" +
         "Bcc: " + bcc + "<br><br>";
}
