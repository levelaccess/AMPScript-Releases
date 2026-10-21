# Release notes for AMPScript v7

## New features

- [PDF report accessibility remediation](#pdf-report-accessibility-remediation)
- [Improved All Violation Instances Excel file creation](#improved-all-violation-instances-excel-file-creation)

## PDF report accessibility remediation

When you download either of these PDF reports from an AMP report dashboard, AMPScript intercepts the request, fixes the most common accessibility issues in the browser, and downloads the remediated file:

- `Report Deliverables > Appendices > Module List` (link accessible name: `Module List (PDF)`)
- `Report Deliverables > Appendices > Use Case Results` (link accessible name: `Use Case Results (PDF)`)

This remediation runs locally in the browser. It focuses on the issues that are most reliably repairable in AMP-generated PDFs, including:

- heading and table structure normalization
- removing empty header and footer features
- bookmark creation from tagged headings
- document title, language, producer, and custom metadata updates
- marking the resulting PDF as remediated by AMPScript

This script only fixes issues that are detected by Adobe Acrobat Pro (see [Remediating Use Case PDF for Platform in Confluence](https://levelaccess.atlassian.net/wiki/spaces/CXD/pages/1432650036/Remediating+Use+Case+PDF+for+Platform)); PAC will still report some low-impact accessibility issues that are not fixed (because of issues in how AMP builds the original file, which make it essentially impossible to fix these issues). Users should still check the resulting PDF for accessibility wth Acrobat Pro, and manually fix any remaining issues.

AMPScript shows a status dialog while it processes the file, and the downloaded file uses the report name in the filename, such as `Report Name - Module List.pdf`.

If AMPScript cannot complete the remediation in the current browser environment, it downloads the original, unremediated PDF instead. Users can bypass the automated fix by opening the original AMP link in a new tab (via right-clicking on the link).

## Improved All Violation Instances Excel file creation

Two new links are added under `Report Deliverables > Excel Reports` on AMP report dashboards:

- `(BETA) All Violation Instances`  (link accessible name: `(BETA) All Violation Instances (Excel Report)`)
- `(BETA) All Violation Instances (no thumbnail images)`  (link accessible name: `(BETA) All Violation Instances (no thumbnail images) (Excel Report)`)

These links generate an Excel spreadsheet that expands on the spreadsheet you can download from the All Violation Instances page of the report, including all available columns, as though you had opened the Violations page, enabled all columns, and exported the data to Excel.

The spreadsheet also merges information from the eAP Audit Report JSON export and adds useful fields such as `Platform-Severity`, `Platform-Tractability`, `Platform-Status`, `Platform-Global`, and `BP-ID`. The exported data is formatted as a real Excel table with proper headers, filters, and column names so it is immediately usable in Excel, and is created in the modern XLSX format (instead of the old XLS format). The new spreadsheet also handles columns with only numeric information, such as Instance ID and Severity, correctly. The spreadsheet also adds columns for mapped WCAG Success Criteria, and Section 508 (Revised) and EN 301 549 clauses if the report includes those standards.

By default, the generated spreadsheet includes images when available (note that these are actually full-sized images, not the thumbnails). A no-thumbnails variant is also available, which produces a much smaller file that is easier to work with. The images are inserted correctly into the spreadsheet cells, so they now work properly when you sort or filter the table. The workbook also creates `Link to instance in AMP` values that point to the correct AMP instance even when the report is not hosted on `amp.levelaccess.net`.

The spreadsheet also includes a second sheet, "One row per WCAG SC", which lets you filter by WCAG Success Criteria by duplicating rows where the Best Practice maps to two or more Success Criteria, then keeping only one SC per row.

The export process includes a progress dialog while AMPScript fetches the AMP data, merges the supplemental eAP fields, and downloads the XLSX file through the browser.
