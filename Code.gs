/*
  THE MUSLIM THINKER — ARTICLE SUBMISSION BACKEND
  1) Create a Google Sheet.
  2) Open Extensions > Apps Script.
  3) Paste this entire file.
  4) Replace SHEET_ID and OWNER_EMAIL.
  5) Deploy as a Web app:
     Execute as: Me
     Who has access: Anyone
*/

const SHEET_ID = "PASTE_YOUR_GOOGLE_SHEET_ID_HERE";
const OWNER_EMAIL = "YOUR_EDITOR_EMAIL_HERE";

const HEADERS = [
  "Timestamp","Author Name","Email","Bio","Title","Category",
  "Article","References","Status","Admin Notes"
];

function doPost(e) {
  try {
    const p = e && e.parameter ? e.parameter : {};

    // Honeypot anti-spam
    if ((p.website || "").trim() !== "") {
      return html_("Thanks.");
    }

    const required = ["name","email","bio","title","category","article","sources","consent"];
    for (const key of required) {
      if (!(p[key] || "").trim()) {
        return html_("Missing required field: " + key);
      }
    }

    const email = String(p.email).trim();
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      return html_("Please provide a valid email address.");
    }

    const article = String(p.article).trim();
    if (article.length < 500) {
      return html_("Your article is too short. Please submit at least 500 characters.");
    }

    const title = String(p.title).trim();
    if (title.length > 180) {
      return html_("The title is too long.");
    }

    const sheet = getSheet_();
    ensureHeaders_(sheet);

    // Basic duplicate/rate control: same email + same title within 10 minutes
    const cache = CacheService.getScriptCache();
    const key = "sub_" + Utilities.base64Encode(
      email.toLowerCase() + "|" + title.toLowerCase()
    ).replace(/[^A-Za-z0-9_-]/g,"").slice(0,90);

    if (cache.get(key)) {
      return html_("A very similar submission was recently received. Please check before submitting again.");
    }
    cache.put(key, "1", 600);

    sheet.appendRow([
      new Date(),
      safe_(p.name, 100),
      safe_(email, 150),
      safe_(p.bio, 1200),
      safe_(title, 180),
      safe_(p.category, 80),
      safe_(article, 30000),
      safe_(p.sources, 12000),
      "Pending Review",
      ""
    ]);

    // Optional email notification
    if (OWNER_EMAIL && OWNER_EMAIL.indexOf("@") > 0) {
      const subject = "New article submission: " + title;
      const body =
        "A new article has been submitted to The Muslim Thinker.\n\n" +
        "Author: " + p.name + "\n" +
        "Email: " + email + "\n" +
        "Category: " + p.category + "\n" +
        "Title: " + title + "\n\n" +
        "Open the Google Sheet to review the full submission.";
      MailApp.sendEmail(OWNER_EMAIL, subject, body);
    }

    return html_("Submission received. Thank you. Your article is now pending editorial review.");
  } catch (err) {
    return html_("Submission error. Please try again later.");
  }
}

function getSheet_() {
  const ss = SpreadsheetApp.openById(SHEET_ID);
  let sheet = ss.getSheetByName("Submissions");
  if (!sheet) sheet = ss.insertSheet("Submissions");
  return sheet;
}

function ensureHeaders_(sheet) {
  const firstRow = sheet.getRange(1,1,1,HEADERS.length).getValues()[0];
  const empty = firstRow.every(v => v === "");
  if (empty) {
    sheet.getRange(1,1,1,HEADERS.length).setValues([HEADERS]);
    sheet.setFrozenRows(1);
  }
}

function safe_(value, max) {
  const s = String(value || "").trim();
  return s.substring(0, max);
}

function html_(message) {
  const safeMessage = String(message)
    .replace(/&/g,"&amp;")
    .replace(/</g,"&lt;")
    .replace(/>/g,"&gt;")
    .replace(/"/g,"&quot;");
  return HtmlService.createHtmlOutput(
    '<div style="font-family:Arial,sans-serif;padding:12px;color:#172033">' +
    safeMessage + '</div>'
  );
}
