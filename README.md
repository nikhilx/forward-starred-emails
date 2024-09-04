# Gmail Forwarder Script

This Google Apps Script automatically forwards starred emails from your Gmail inbox to a specified email address. The script checks for emails marked as starred that have not yet been forwarded, then forwards them with their attachments and adds a "Forwarded" label to mark them as processed. The forwarded emails include original metadata such as sender, date, subject, and recipients (To, Cc, Bcc).

## Features

- Automatically forwards all starred emails that do not have the "Forwarded" label.
- Includes original metadata such as sender, date, subject, and recipients in the forwarded message.
- Forwards any attachments from the original email.
- Adds a "Forwarded" label to processed threads to avoid duplicate forwards.
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

2. **Set the Recipient Email:**
   - You need to set the recipient email to which the starred emails will be forwarded.
   - Go to `File -> Project Properties -> Script Properties`.
   - Add a new property with the key as `RECIPIENT_EMAIL` and the value as the email address where you want to forward the messages.

3. **Label Setup:**
   - The script will automatically add a "Forwarded" label to threads that have been forwarded. You do not need to create this label manually; the script will handle it.

4. **Authorize the Script:**
   - When you first run the script, Google will ask for permission to access your Gmail account. Accept the permissions to allow the script to function.

5. **Run the Script:**
   - Manually trigger the `forwardStarredEmails` function from the Google Apps Script editor, or set up a trigger to run the script periodically (e.g., every day).

## Usage

1. **Starring Emails:**
   - Star the emails you want to forward. The script will only process starred emails that have not yet been forwarded.

2. **Check Logs:**
   - The script logs useful information such as the number of threads and messages processed. You can view the logs by going to `View -> Logs` in the Apps Script editor.
  
