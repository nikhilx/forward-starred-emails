# Gmail Forwarder Script

This Google Apps Script automatically forwards starred emails from your Gmail inbox to a specified email address. The script checks for emails marked as starred that have not yet been forwarded, then forwards them with their attachments and adds the configured label to mark them as processed. The forwarded emails include original metadata such as sender, date, subject, and recipients (To, Cc, Bcc).

## Features

- Automatically forwards all starred emails that do not have the configured label.
- Includes original metadata such as sender, date, subject, and recipients in the forwarded message.
- Forwards any attachments from the original email.
- Adds the configured label to the processed email threads to avoid duplicate forwards.
- Recipient email address via Google Apps Script properties.

## Prerequisites

To use this script, you need:

- A Google account with access to Gmail.
- [Google Apps Script](https://script.google.com/) set up in your Google account.
- Basic understanding of Google Apps Script and GmailApp.

## Setup

1. **Clone or Copy the Script:**
   - Open [Google Apps Script](https://script.google.com/) in your browser.
   - Create a new project.
   - Copy the script provided in this repository into the project editor.

2. **Prerequisites:**
   - You need to set the script properties.
   - Go to `File -> Project Properties -> Script Properties`.
   - Add a new property with the key as `RECIPIENT_EMAIL` and the value as the email address where you want to forward the messages.
   - Add a new property with the key as `FORWARDING_STATUS_LABEL` and the value the label name. This label will be used to track emails which are already forwarded by the script
   - Add a new (optional) property `SUBJECT_PREFIX` to prefix the email subject.

3. **Authorize the Script:**
   - When you first run the script, Google will ask for permission to access your Gmail account. Accept the permissions to allow the script to function.

4. **Run the Script:**
   - Set up a trigger to run the script periodically (e.g., every day) or manually trigger the script.
   - Steps to add a trigger
      - To manually create an installable trigger in the script editor, follow these steps:
      - Open your Apps Script project.
      - At the left, click Triggers alarm.
      - At the bottom right, click Add Trigger.
      - Select and configure the type of trigger you want to create.
      - Click Save.

## Usage

1. **Starring Emails:**
   - Star the emails you want to forward. The script will only process starred emails that have not yet been forwarded.

2. **Check Logs:**
   - The script logs useful information such as the number of threads and messages processed. You can view the logs by going to `View -> Logs` in the Apps Script editor.
  
