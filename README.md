# The Muslim Thinker — Free Starter Website

This starter kit uses:

- GitHub Pages for the public static website.
- Google Sheets + Google Apps Script for the article submission form.
- Manual editorial approval before publication.

## Part A — Create the Google Sheet

1. Go to Google Sheets and create a blank spreadsheet.
2. Name it `The Muslim Thinker — Submissions`.
3. Copy the spreadsheet ID from the URL:
   `https://docs.google.com/spreadsheets/d/THIS_IS_THE_ID/edit`
4. Open `Extensions > Apps Script`.
5. Replace the default code with `Code.gs`.
6. Replace:
   - `PASTE_YOUR_GOOGLE_SHEET_ID_HERE`
   - `YOUR_EDITOR_EMAIL_HERE`
7. Save the project.

## Part B — Deploy the submission backend

In Google Apps Script:

1. Click `Deploy` > `New deployment`.
2. Select `Web app`.
3. Set `Execute as` to `Me`.
4. Set access so the web app can be used by people who are not signed in (the exact label can vary; Google documents this as anonymous/public access for web apps).
5. Deploy.
6. Authorize the script when Google asks.
7. Copy the `/exec` web app URL.

## Part C — Connect the form

Open `submit.html`.

Find:

`action="YOUR_APPS_SCRIPT_WEB_APP_URL"`

Replace it with your real `/exec` URL.

Example:

`action="https://script.google.com/macros/s/XXXXXXXX/exec"`

Do NOT put passwords, API keys or other secrets into the HTML files.

## Part D — Create your GitHub Pages website

1. Create a GitHub account if you do not already have one.
2. Create a new PUBLIC repository.
3. Recommended user-site repository name:
   `YOUR_GITHUB_USERNAME.github.io`
4. Upload all files from this folder.
5. Open repository `Settings` > `Pages`.
6. Under Build and deployment, choose `Deploy from a branch`.
7. Choose your publishing branch (normally `main`) and `/ (root)`.
8. Save.
9. GitHub will publish the site at:
   `https://YOUR_GITHUB_USERNAME.github.io`

GitHub says Pages is available for public repositories on GitHub Free and that a user site uses the `<username>.github.io` repository format.

## Part E — Change these placeholders

Before publishing, replace:

1. `YOUR_APPS_SCRIPT_WEB_APP_URL` in `submit.html`
2. `YOUR_GITHUB_USERNAME.github.io` in `robots.txt`
3. `YOUR_GITHUB_USERNAME.github.io` in `sitemap.xml`
4. `editor@your-domain.example` in `contact.html`
5. Sample author/article content with your real content.

## How article publishing works

Visitor -> Submit an Article -> Google Apps Script -> Google Sheet -> Status = Pending Review -> You review -> You edit/polish -> You create/update an article HTML file -> Publish on GitHub Pages.

Do not give visitors GitHub write access. They should only submit through the form.

## How to publish a new article

1. Copy `article-justice.html`.
2. Rename it, e.g. `article-new-topic.html`.
3. Replace title, category, author, article body and references.
4. Add the new article card/link to `articles.html` and, when useful, `index.html`.
5. Upload/save the changes to GitHub.
6. GitHub Pages updates the live site.

## Editorial workflow recommendation

Use the Google Sheet columns:

Timestamp | Author Name | Email | Bio | Title | Category | Article | References | Status | Admin Notes

Suggested Status values:

- Pending Review
- Needs Revision
- Accepted
- Published
- Rejected

## Important limitation

This starter kit deliberately does NOT let contributors publish directly to the public website. That would create a moderation and spam problem. It gives them a submission form instead. You decide what becomes public.

## Free-domain reality

The site can be free using the GitHub Pages URL. A custom domain such as `themuslimthinker.com` normally requires registering that domain separately.

## Security / privacy

The repository is public because GitHub Free Pages supports public repositories. Never place passwords, API keys or private contributor information in the repository. Contributor submissions remain in your Google Sheet, not in the public GitHub repository.

## Next development step

Once the website gets regular traffic, upgrade the content system so approved articles can be managed from a proper CMS/database instead of creating HTML files manually.
