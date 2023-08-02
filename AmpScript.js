// ==UserScript==
// @name         The ACE AMP Script (formerly 'AMP - Insert Add Instances')
// @namespace    http://tampermonkey.net/
// @version      6.2.0
// @description  The ACE AMP Script - Adds some much needed functionality to AMP.
// @author       Kevin Murphy
// @match        *.levelaccess.net/index.php*
// @match        *.levelaccess.net/public/reporting/*
// @match        *.levelaccess.net/public/audit/*
// @match        *.levelaccess.io/index.php*
// @match        *.levelaccess.io/public/reporting/*
// @match        *.levelaccess.io/public/audit/*
// @match        *.levelaccess.us/index.php*
// @match        *.levelaccess.us/public/reporting/*
// @match        *.levelaccess.us/public/audit/*
// @grant        none
// @updateURL    https://raw.githubusercontent.com/levelaccess/AMPScript-Releases/main/AmpScript.js
// @downloadURL  https://raw.githubusercontent.com/levelaccess/AMPScript-Releases/main/AmpScript.js
// @supportURL   https://level-access.slack.com/messages/CK79W4PPU/
// @icon         https://labs.levelaccess.com/level_logo.png
// ==/UserScript==

// temp/BaseScript.js
// TODO List
/*
   Drag and Drop Images to ADD Instance
   Add Instance Modal: Make the alert dynamic. Should appear when code is pasted in.
   Write generic listener event to look for dynamic lists, such as modules
   [x] Make the "Mark Complete" checkbox actually mark it complete
*/

// GLOBAL VARIABLE: Start by setting jquery as the $ variable as a global to this page (Not sure why I have to do this).
var $ = window.jQuery;
function dataCustom() {
  const custom = [
    {
      id: "custom-adobe",
      name: "Adobe",
    },
    {
      id: "custom-pdf",
      name: "Software/PDF (No code)",
    },
    {
      id: "custom-wf",
      name: "Wells Fargo",
    },
    {
      id: "custom-progressive-apq",
      name: "Progressive APQ (Agency Portfolio Quoting)",
    },
    {
      id: "custom-progressive-dq-inc-mobile",
      name: "Progressive DQ (Direct Quoting), inc. mobile browsers",
    },
    {
      id: "custom-salesforce",
      name: "Salesforce",
    },
  ];
  return custom;
}
function dataReviews() {
  const reviews = [
    {
      id: "reviews-inQA",
      div: "Reviews",
      text: "Under Review",
      date: "name",
      var1: "in_qa",
    },
    {
      id: "reviews-clearQA",
      text: "Updated",
      var1: "in_qa",
    },
    {
      id: "reviews-completeQA",
      text: "Complete",
      var1: "new",
    },
    {
      id: "reviews-missingQA",
      text: "Missing or Unidentified Violation",
      date: "name",
      var1: "in_qa",
    },
    {
      id: "reviews-snippetQA",
      text: "Code snippet length too long",
      date: "name",
      var1: "in_qa",
    },
    {
      id: "reviews-cceMissingQA",
      text: "Compliant Code Example or Recommendation Missing (Web Only)",
      date: "name",
      var1: "in_qa",
    },
    {
      id: "reviews-cceNotRequiredQA",
      text: "Compliant Code Example Not Required (Mobile Only)",
      date: "name",
      var1: "in_qa",
    },
    {
      id: "reviews-meaningQA",
      text: "Issue does not make sense",
      date: "name",
      var1: "in_qa",
    },
    {
      id: "reviews-misalignmentQA",
      text: "Issue Misalignment - Success Criteria or Best Practice",
      date: "name",
      var1: "in_qa",
    },
    {
      id: "reviews-notIssueQA",
      text: "Not an Issue, removal required",
      date: "name",
      var1: "in_qa",
    },
    {
      id: "reviews-patternWrongQA",
      text: "Pattern incorrectly used",
      date: "name",
      var1: "in_qa",
    },
    {
      id: "reviews-recommendationBadQA",
      text: "Recommendation does not make sense",
      date: "name",
      var1: "in_qa",
    },
    {
      id: "reviews-sillyQA",
      text: "Silly Mistake",
      date: "name",
      var1: "in_qa",
    },
    {
      id: "reviews-typosQA",
      text: "Typo or Grammar Issue",
      date: "name",
      var1: "in_qa",
    },
    {
      id: "reviews-ucResultQA",
      text: "Use case result issue missing",
      date: "name",
      var1: "in_qa",
    },
    {
      id: "reviews-questionForPT",
      text: "Question for PT",
      date: "name",
      var1: "in_qa",
    },
  ];
  return reviews;
}
function dataStatus() {
  const status = [
    {
      id: "code-pattern",
      div: "Pattern",
      text: "Pattern",
    },
    {
      id: "extras-Occurrences",
      text: "Occurrences",
      var1: "Occurrences",
    },

    {
      id: "status-advisory",
      div: "Status",
      text: "Advisory",
      date: "no",
    },
    {
      id: "status-fixed",
      text: "Fixed",
      var1: "fixed",
    },
    {
      id: "status-notfixed",
      text: "Not Fixed",
      var1: "failed_retesting",
    },
    {
      id: "status-new",
      text: "New",
      var1: "new",
    },
    {
      id: "status-not",
      text: "Not Retested",
      var1: "needs_retesting",
    },
    {
      id: "status-wip",
      div: "Work In Progress",
      text: "WIP",
      date: "no",
    },
    {
      id: "status-wipName",
      text: "WIP - Name",
      date: "name",
    },
    {
      id: "current-date",
      text: "[DATE]",
      var1: "[DATE]",
      loc: "1",
      div: "Special",
    },
    {
      id: "code-modIns",
      text: "Module/Instance",
    },
    {
      id: "special-typeDev",
      text: "Type: DEV",
      var1: "Type: DEV",
      loc: "1",
    },
    {
      id: "special-typeDes",
      text: "Type: DESIGN",
      var1: "Type: DESIGN",
      loc: "1",
    },
    {
      id: "status-wcag-a",
      text: "WCAG: A",
    },
    {
      id: "status-wcag-aa",
      text: "WCAG: AA",
    },
    {
      id: "status-wcag-aaa",
      text: "WCAG: AAA",
    },
  ];
  return status;
}
function dataReading() {
  const reading = [
    {
      id: "reading-blank",
      text: "Blank",
      value: "",
    },
    {
      id: "reading-accordions",
      text: "Accordions",
      value:
        "For more information about creating accessible accordions, please see the W3C Web Accessibility Initiative's ARIA Authoring Practices Guide: https://www.w3.org/WAI/ARIA/apg/patterns/accordion/",
    },
    {
      id: "reading-audio-description",
      text: "Audio description",
      value:
        "For more information about audio description for videos, please see the W3C Web Accessibility Initiative website: https://www.w3.org/WAI/media/av/description/",
    },
    {
      id: "reading-breadcrumbs",
      text: "Breadcrumbs",
      value:
        "For more information about creating accessible breadcrumb navigation, please see the W3C Web Accessibility Initiative's ARIA Authoring Practices Guide: https://www.w3.org/WAI/ARIA/apg/patterns/breadcrumb/",
    },
    {
      id: "reading-captcha",
      text: "CAPTCHAs",
      value:
        "For more information about creating accessible CAPTCHAs and possible alternatives, please see the W3C website: https://www.w3.org/TR/turingtest/",
    },
    {
      id: "reading-captions",
      text: "Captions",
      value:
        "For more information about video captions, please see the W3C Web Accessibility Initiative website: https://www.w3.org/WAI/media/av/captions/",
    },
    {
      id: "reading-carousels",
      text: "Carousels",
      value:
        "For more information about creating accessible carousels, please see the W3C Web Accessibility Initiative website: https://www.w3.org/WAI/tutorials/carousels/",
    },
    {
      id: "reading-checkboxes",
      text: "Checkboxes",
      value:
        "For more information about creating accessible custom checkboxes, please see the W3C Web Accessibility Initiative's ARIA Authoring Practices Guide: https://www.w3.org/WAI/ARIA/apg/patterns/checkbox/",
    },
    {
      id: "reading-comboboxes",
      text: "Comboboxes",
      value:
        "For more information about creating accessible comboboxes, please see the W3C Web Accessibility Initiative's ARIA Authoring Practices Guide: https://www.w3.org/WAI/ARIA/apg/patterns/combobox/",
    },
    {
      id: "reading-complex-images",
      text: "Complex images",
      value:
        "For more information about describing complex images, please see the W3C Web Accessibility Initiative website: https://www.w3.org/WAI/tutorials/images/complex/",
    },
    {
      id: "reading-date-picker",
      text: "Date pickers",
      value:
        "For more information about creating accessible custom date pickers, please see the W3C Web Accessibility Initiative's ARIA Authoring Practices Guide: https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/examples/datepicker-dialog/",
    },
    {
      id: "reading-dialogs",
      text: "Dialogs",
      value:
        "For more information about creating accessible modal dialogs, please see the W3C Web Accessibility Initiative's ARIA Authoring Practices Guide: https://www.w3.org/WAI/ARIA/apg/patterns/dialogmodal/",
    },
    {
      id: "reading-errors",
      text: "Errors",
      value:
        "For more information on creating accessible error messages, please see the W3C Web Accessibility Initiative website: https://www.w3.org/WAI/tutorials/forms/notifications/",
    },
    {
      id: "reading-expandable-navigation",
      text: "Expandable navigation",
      value:
        "For more information on creating accessible expandable navigation controls, please see the W3C Web Accessibility Initiative website: https://www.w3.org/WAI/tutorials/menus/flyout/",
    },
    {
      id: "reading-fieldsets",
      text: "Fieldsets",
      value:
        "For more information about using <fieldset> elements to group related form controls, please see the W3C Web Accessibility Initiative website: https://www.w3.org/WAI/tutorials/forms/grouping/",
    },
    {
      id: "reading-headings",
      text: "Headings",
      value:
        "For more information about creating accessible heading structures, please see the W3C Web Accessibility Initiative website: https://www.w3.org/WAI/tutorials/page-structure/headings/",
    },
    {
      id: "reading-invalid-aria",
      text: "Invalid ARIA",
      value:
        "For more information about using ARIA attributes according to specification, please see our website: https://www.levelaccess.com/how-not-to-misuse-aria-states-properties-and-roles/",
    },
    {
      id: "reading-labeling-form-fields",
      text: "Labeling form fields",
      value:
        "For more information about labeling form fields, please see the W3C Web Accessibility Initiative website: https://www.w3.org/WAI/tutorials/forms/labels/",
    },
    {
      id: "reading-labeling-regions",
      text: "Labeling regions",
      value:
        "For more information about labeling page regions, please see the W3C Web Accessibility Initiative website: https://www.w3.org/WAI/tutorials/page-structure/labels/",
    },
    {
      id: "reading-multi-thumb-sliders",
      text: "Multi-thumb sliders",
      value:
        "For more information about creating accessible multi-thumb sliders, please see the W3C Web Accessibility Initiative's ARIA Authoring Practices Guide: https://www.w3.org/WAI/ARIA/apg/patterns/slidertwothumb/",
    },
    {
      id: "reading-navigation-bar",
      text: "Navigation",
      value:
        "For more information about creating accessible navigation controls, please see the W3C Web Accessibility Initiative's ARIA Authoring Practices Guide: https://www.w3.org/WAI/ARIA/apg/example-index/disclosure/disclosure-navigation.html",
    },
    {
      id: "reading-radio-buttons",
      text: "Radio buttons",
      value:
        "For more information about creating accessible custom radio buttons, please see the W3C Web Accessibility Initiative's ARIA Authoring Practices Guide: https://www.w3.org/WAI/ARIA/apg/patterns/radiobutton/",
    },
    {
      id: "reading-selects",
      text: "Selects",
      value:
        "For more information about creating accessible custom <select> controls, please see the W3C Web Accessibility Initiative's ARIA Authoring Practices Guide: https://www.w3.org/WAI/ARIA/apg/example-index/combobox/combobox-select-only.html",
    },
    {
      id: "reading-show-hide",
      text: "Show/hide controls",
      value:
        "For more information about creating accessible show/hide controls, please see the W3C Web Accessibility Initiative's ARIA Authoring Practices Guide: https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/",
    },
    {
      id: "reading-tables",
      text: "Tables",
      value:
        "For more information about creating accessible data tables, please see the W3C Web Accessibility Initiative website: https://www.w3.org/WAI/tutorials/tables/",
    },
    {
      id: "reading-tabs",
      text: "Tabs",
      value:
        "For more information about creating accessible tab controls, please see the W3C Web Accessibility Initiative's ARIA Authoring Practices Guide: https://www.w3.org/WAI/ARIA/apg/patterns/tabpanel/",
    },
    {
      id: "reading-tree-views",
      text: "Tree views",
      value:
        "For more information about creating accessible tree views, please see the W3C Web Accessibility Initiative's ARIA Authoring Practices Guide: https://www.w3.org/WAI/ARIA/apg/patterns/treeview/",
    },
  ];
  return reading;
}
function dataSuccessCriteria() {
  // TODO: Perla- If these get used somewhere other than Salesforce, eventually we want to sort the list depending on level and version. Commenting out Level AAA for now.
  const sc = [
    {
      id: "select-sc",
      div: "Success Criteria",
      text: "Success Criteria",
    },
    {
      id: "sc_1-1-1",
      version: "2.0",
      level: "A",
      text: "SC 1.1.1 Non-text Content",
    },
    {
      id: "sc_1-2-1",
      version: "2.0",
      level: "A",
      text: "SC 1.2.1 Audio-only and Video-only (Pre-recorded)",
    },
    {
      id: "sc_1-2-2",
      version: "2.0",
      level: "A",
      text: "SC 1.2.2 Captions (Pre-recorded)",
    },
    {
      id: "sc_1-2-3",
      version: "2.0",
      level: "A",
      text: "SC 1.2.3 Audio Description or Media Alternative (Pre-recorded)",
    },
    {
      id: "sc_1-2-4",
      version: "2.0",
      level: "AA",
      text: "SC 1.2.4 Captions (Live)",
    },
    {
      id: "sc_1-2-5",
      version: "2.0",
      level: "AA",
      text: "SC 1.2.5 Audio Description (Pre-recorded)",
    },
    /* {"id": "sc_1-2-6",  "version": "2.0", "level": "AAA", "text": "SC 1.2.6 Sign Language (Pre-recorded)"},
       {"id": "sc_1-2-7",  "version": "2.0", "level": "AAA", "text": "SC 1.2.7 Extended Audio description (Pre-recorded)"},
       {"id": "sc_1-2-8",  "version": "2.0", "level": "AAA", "text": "SC 1.2.8 Media Alternative (Pre-recorded)"},
       {"id": "sc_1-2-9",  "version": "2.0", "level": "AAA", "text": "SC 1.2.9 Audio Only (Live)"}, */
    {
      id: "sc_1-3-1",
      version: "2.0",
      level: "A",
      text: "SC 1.3.1 Info and Relationships",
    },
    {
      id: "sc_1-3-2",
      version: "2.0",
      level: "A",
      text: "SC 1.3.2 Meaningful Sequence",
    },
    {
      id: "sc_1-3-3",
      version: "2.0",
      level: "A",
      text: "SC 1.3.3 Sensory Characteristics",
    },
    {
      id: "sc_1-3-4",
      version: "2.1",
      level: "AA",
      text: "SC 1.3.4 Orientation",
    },
    {
      id: "sc_1-3-5",
      version: "2.1",
      level: "AA",
      text: "SC 1.3.5 Identify Input Purpose",
    },
    // {"id": "sc_1-3-6",  "version": "2.1", "level": "AAA", "text": "SC 1.3.6 Identify Purpose"},
    {
      id: "sc_1-4-1",
      version: "2.0",
      level: "A",
      text: "SC 1.4.1 Use of Colour",
    },
    {
      id: "sc_1-4-2",
      version: "2.0",
      level: "A",
      text: "SC 1.4.2 Audio Control",
    },
    {
      id: "sc_1-4-3",
      version: "2.0",
      level: "AA",
      text: "SC 1.4.3 Contrast (Minimum)",
    },
    {
      id: "sc_1-4-4",
      version: "2.0",
      level: "AA",
      text: "SC 1.4.4 Resize Text",
    },
    {
      id: "sc_1-4-5",
      version: "2.0",
      level: "AA",
      text: "SC 1.4.5 Images of Text",
    },
    /* {"id": "sc_1-4-6",  "version": "2.0", "level": "AAA", "text": "SC 1.4.6 Contrast (Enhanced)"},
       {"id": "sc_1-4-7",  "version": "2.0", "level": "AAA", "text": "SC 1.4.7 Low or No Background Audio"},
       {"id": "sc_1-4-8",  "version": "2.0", "level": "AAA", "text": "SC 1.4.8 Visual Presentation"},
       {"id": "sc_1-4-9",  "version": "2.0", "level": "AAA", "text": "SC 1.4.9 Images of Text (No Exception)"}, */
    { id: "sc_1-4-10", version: "2.1", level: "AA", text: "SC 1.4.10 Reflow" },
    {
      id: "sc_1-4-11",
      version: "2.1",
      level: "AA",
      text: "SC 1.4.11 Non-Text Contrast",
    },
    {
      id: "sc_1-4-12",
      version: "2.1",
      level: "AA",
      text: "SC 1.4.12 Text Spacing",
    },
    {
      id: "sc_1-4-13",
      version: "2.1",
      level: "AA",
      text: "SC 1.4.13 Content on Hover or Focus",
    },
    { id: "sc_2-1-1", version: "2.0", level: "A", text: "SC 2.1.1 Keyboard" },
    {
      id: "sc_2-1-2",
      version: "2.0",
      level: "A",
      text: "SC 2.1.2 No Keyboard Trap",
    },
    // {"id": "sc_2-1-3",  "version": "2.0", "level": "AAA", "text": "SC 2.1.3 Keyboard (No Exception)"},
    {
      id: "sc_2-1-4",
      version: "2.1",
      level: "A",
      text: "SC 2.1.4 Character Key Shortcuts",
    },
    {
      id: "sc_2-2-1",
      version: "2.0",
      level: "A",
      text: "SC 2.2.1 Timing Adjustable",
    },
    {
      id: "sc_2-2-2",
      version: "2.0",
      level: "A",
      text: "SC 2.2.2 Pause, Stop, Hide",
    },
    /* {"id": "sc_2-2-3",  "version": "2.0", "level": "AAA", "text": "SC 2.2.3 No Timing"},
       {"id": "sc_2-2-4",  "version": "2.0", "level": "AAA", "text": "SC 2.2.4 Interruptions"},
       {"id": "sc_2-2-5",  "version": "2.0", "level": "AAA", "text": "SC 2.2.5 Re-authenticating"},
       {"id": "sc_2-2-6",  "version": "2.1", "level": "AAA", "text": "SC 2.2.6 Timeouts "}, */
    {
      id: "sc_2-3-1",
      version: "2.0",
      level: "A",
      text: "SC 2.3.1 Three Flashes or Below",
    },
    /* {"id": "sc_2-3-2",  "version": "2.0", "level": "AAA", "text": "SC 2.3.2 Three Flashes"},
       {"id": "sc_2-3-3",  "version": "2.1", "level": "AAA", "text": "SC 2.3.3 Animation from Interactions "}, */
    {
      id: "sc_2-4-1",
      version: "2.0",
      level: "A",
      text: "SC 2.4.1 Bypass Blocks",
    },
    // {"id": "sc_2-4-10", "version": "2.0", "level": "AAA", "text": "SC 2.4.10 Section Headings"},
    {
      id: "sc_2-4-2",
      version: "2.0",
      level: "A",
      text: "SC 2.4.2 Page Titled",
    },
    {
      id: "sc_2-4-3",
      version: "2.0",
      level: "A",
      text: "SC 2.4.3 Focus Order",
    },
    {
      id: "sc_2-4-4",
      version: "2.0",
      level: "A",
      text: "SC 2.4.4 Link Purpose (In Context)",
    },
    {
      id: "sc_2-4-5",
      version: "2.0",
      level: "AA",
      text: "SC 2.4.5 Multiple Ways",
    },
    {
      id: "sc_2-4-6",
      version: "2.0",
      level: "AA",
      text: "SC 2.4.6 Headings and Labels",
    },
    {
      id: "sc_2-4-7",
      version: "2.0",
      level: "AA",
      text: "SC 2.4.7 Focus Visible",
    },
    /* {"id": "sc_2-4-8",  "version": "2.0", "level": "AAA", "text": "SC 2.4.8 Location"},
       {"id": "sc_2-4-9",  "version": "2.0", "level": "AAA", "text": "SC 2.4.9 Link Purpose (Link Only)"}, */
    {
      id: "sc_2-5-1",
      version: "2.1",
      level: "A",
      text: "SC 2.5.1 Pointer Gestures",
    },
    {
      id: "sc_2-5-2",
      version: "2.1",
      level: "A",
      text: "SC 2.5.2 Pointer Cancellation",
    },
    {
      id: "sc_2-5-3",
      version: "2.1",
      level: "A",
      text: "SC 2.5.3 Label in Name",
    },
    {
      id: "sc_2-5-4",
      version: "2.1",
      level: "A",
      text: "SC 2.5.4 Motion Actuation",
    },
    /* {"id": "sc_2-5-5",  "version": "2.1", "level": "AAA", "text": "SC 2.5.5 Target Size"},
       {"id": "sc_2-5-6",  "version": "2.1", "level": "AAA", "text": "SC 2.5.6 Concurrent Input Mechanisms"}, */
    {
      id: "sc_3-1-1",
      version: "2.0",
      level: "A",
      text: "SC 3.1.1 Language of Page",
    },
    {
      id: "sc_3-1-2",
      version: "2.0",
      level: "AA",
      text: "SC 3.1.2 Language of Parts",
    },
    /* {"id": "sc_3-1-3",  "version": "2.0", "level": "AAA", "text": "SC 3.1.3 Unusual words"},
       {"id": "sc_3-1-4",  "version": "2.0", "level": "AAA", "text": "SC 3.1.4 Abbreviations"},
       {"id": "sc_3-1-5",  "version": "2.0", "level": "AAA", "text": "SC 3.1.5 Reading Level"},
       {"id": "sc_3-1-6",  "version": "2.0", "level": "AAA", "text": "SC 3.1.6 Pronunciation"}, */
    { id: "sc_3-2-1", version: "2.0", level: "A", text: "SC 3.2.1 On Focus" },
    { id: "sc_3-2-2", version: "2.0", level: "A", text: "SC 3.2.2 On Input" },
    {
      id: "sc_3-2-3",
      version: "2.0",
      level: "AA",
      text: "SC 3.2.3 Consistent Navigation",
    },
    {
      id: "sc_3-2-4",
      version: "2.0",
      level: "AA",
      text: "SC 3.2.4 Consistent Identification",
    },
    // {"id": "sc_3-2-5",  "version": "2.0", "level": "AAA", "text": "SC 3.2.5 Change on Request"},
    {
      id: "sc_3-3-1",
      version: "2.0",
      level: "A",
      text: "SC 3.3.1 Error Identification",
    },
    {
      id: "sc_3-3-2",
      version: "2.0",
      level: "A",
      text: "SC 3.3.2 Labels or Instructions",
    },
    {
      id: "sc_3-3-3",
      version: "2.0",
      level: "AA",
      text: "SC 3.3.3 Error Suggestion",
    },
    {
      id: "sc_3-3-4",
      version: "2.0",
      level: "AA",
      text: "SC 3.3.4 Error Prevention (Legal, Financial, Data)",
    },
    /* {"id": "sc_3-3-5",  "version": "2.0", "level": "AAA", "text": "SC 3.3.5 Help"},
       {"id": "sc_3-3-6",  "version": "2.0", "level": "AAA", "text": "SC 3.3.6 Error Prevention (All)"}, */
    { id: "sc_4-1-1", version: "2.0", level: "A", text: "SC 4.1.1 Parsing" },
    {
      id: "sc_4-1-2",
      version: "2.0",
      level: "A",
      text: "SC 4.1.2 Name, Role, Value",
    },
    {
      id: "sc_4-1-3",
      version: "2.1",
      level: "AA",
      text: "SC 4.1.3 Status Messages",
    },
  ];

  return sc;
}
function dataCode() {
  const code = [
    {
      id: "css-visually-hidden",
      text: "Visually hidden class",
      value:
        ".visually-hidden {\n  position: absolute;\n  top: auto;\n  overflow: hidden;\n  clip: rect(1px, 1px, 1px, 1px);\n  width: 1px;\n  height: 1px;\n  white-space: nowrap;\n}",
    },
  ];
  return code;
}
function dataResponse2() {
  const response = [
    {
      name: "ARIA",
      children: [
        {
          id: "response-aria",
          text: "General",
          impact:
            "When ARIA attributes (state, roles, and properties) are inappropriately used or not used correctly, assistive technology may not correctly function as expected. Role and properties are covenants between assistive technology and the application and must be accurate for the intended purpose. Valid markup should always be used.",
          recommendation:
            "Developers must use valid markup and follow the rules of the ARIA specification as well as correctly setting ARIA properties, including roles based on the intended purpose.",
          reading:
            "More information about using ARIA roles can be found on the Level Access Website:\n\nhttps://www.levelaccess.com/how-not-to-misuse-aria-states-properties-and-roles/",
          keepElement: true,
          keepAttribute: true,
        },
        {
          id: "response-ariaimplicit",
          text: "Implicit Role",
          issue:
            "There are elements on the page that have assigned roles but already have implicit ARIA roles. These are redundant and should be removed. Structural implicit roles include (but are not limited to[ELEMENT/role]):\n- MAIN = main\n- HEADER = banner \n- FOOTER = contentinfo\n- ASIDE = complementary\n- FORM = form\n- NAV = navigation\n\nInline implicit roles include A = link, BUTTON = button, and many others.",
          impact:
            "When ARIA attributes (state, roles, and properties) are inappropriately used, assistive technology may not correctly function as expected. Role and properties are covenants between assistive technology and the application and must be accurate for the intended purpose.",
          recommendation:
            "Remove the redundant role from all of the elements.\n\nMore information can be found about implicit ARIA roles here:\nhttps://a11yproject.com/posts/aria-landmark-roles/",
          reading:
            "More information can be found about implicit ARIA roles here:\nhttps://a11yproject.com/posts/aria-landmark-roles/",
          keepElement: true,
          keepAttribute: true,
        },
        {
          id: "response-ariaregion",
          text: "Region",
          impact:
            "When ARIA regions, landmarks or HTML5 section elements are provided, users must be able to distinguish them from other regions, landmarks or sections in the page, particularly when two or more instances of the same type are used. When such an element does not provide a descriptive label to clearly identify itself, users of screen readers may have trouble locating the correct section or understanding its purpose.",
          recommendation:
            "Common methods of providing accessible labels are the aria-labelledby attribute (best used when a visual label already exists in the page) and the aria-label attribute (when no visual label exists).",
          keepElement: true,
          keepAttribute: true,
        },
      ],
    },
    {
      name: "Color",
      children: [
        {
          id: "response-color",
          text: "Color Contrast",
          impact:
            "Ensure there is sufficient contrast between foreground and background colors. This requirement applies to text over solid and image backgrounds as well as images that contain text. Proper foreground and background contrast is necessary for users with low vision and some users with color blindness to accurately read content.",
          recommendation:
            "Developers must ensure that the color contrast for all text (and images of text) meets the WCAG 2.0 Level AA requirements unless specifically excluded.\n\nDesigners or developers should modify the foreground color, background color, and/or font size so that sufficient contrast is attained.\n\nStandard text less than 18 point (or less than 14 point if bold) must have a luminosity contrast ratio of 4.5:1 or more.\n\nText 18 point or larger (14 point or larger if bold) must have a luminosity contrast ratio of 3:1 or more.\n\nUse the Level Access contrast checking tool or plugin (https://accessibility.dev/) to determine if the contrast is sufficient.",
          keepElement: true,
          keepAttribute: true,
        },
      ],
    },
    {
      name: "Custom",
      children: [
        {
          id: "response-customControl",
          text: "Role/State",
          impact:
            "At a basic level, all custom controls within a web application should provide identifying information about the component. This includes a name, type (role) and may contain state, value, and description information. When custom elements do not expose identifying information, users of assistive technology may not be able to identify and interact with the element. For example, without knowing the role or state of an element, the user of a screen reader may not know what actions can be performed on an element even if the element exposes a textual name. Without a proper role, assistive technology interactions that rely on roles being identified may not become available to the user.",
          recommendation:
            "Ensure that proper identifying information is provided for custom components. Generally, Accessible Rich Internet Application (ARIA) specification roles, properties, and states should be used to indicate the control's name and role and may be needed for state, value, description, or other properties. Appropriate states need to be provided when applicable -- e.g. aria-expanded on buttons to indicate the expanded or collapsed state of an accordion.",
          keepElement: true,
          keepAttribute: true,
        },
      ],
    },
    {
      name: "Forms",
      children: [
        {
          id: "response-fieldset",
          text: "Fieldset",
          div: "Forms",
          impact:
            'Forms should utilize the fieldset and legend elements to group related form controls. For example, on an order form, authors should separate categories such as "Billing Information", "Shipping Address", and "Order Summary" using fieldset elements. By grouping all of the elements in one category users of assistive technologies can understand the relationship of the elements. For example, without proper grouping a person using a screen reader might not be able to differentiate the address field for shipping from the address field for billing. Another example is when radio buttons are used as answers and a question appears above or to the left of the radio buttons. When the question text and radio buttons are not properly constructed in a fieldset users of screen readers may only be aware of the answers and not the question.',
          recommendation:
            "Utilize the fieldset element to group together related groups. For each fieldset element, ensure that a legend has been defined and contains an appropriate value. All of the radio buttons and checkboxes in a group should be included within a fieldset with the group name as its legend.",
          keepElement: true,
          keepAttribute: true,
        },
        {
          id: "response-formlabel",
          text: "Label",
          impact:
            "When form fields do not explicitly include a label, assistive technologies may incorrectly render the label or provide no label at all to users. When labels are not present or are incorrect, users of assistive technologies may not be able to complete a form.",
          recommendation:
            "While there are several techniques for making an accessible label for the form fields, the easiest and most reliable is to have a valid HTML LABEL element that is explicitly associated with the input using the FOR/ID attributes.",
          keepElement: true,
          keepAttribute: true,
        },
      ],
    },
    {
      name: "Headings",
      children: [
        {
          id: "response-headingsimplicit",
          text: "Implicit",
          impact:
            "Explicit heading markup must be used for page headings. Since some users skim through a document by navigating its headings, it is important to use headings appropriately to convey document structure. This best practice does not require adding structural headings to content that does not appear as an implicit heading. Its intent is to ensure that implicit headings are structured as explicit headings. Implicit headings are those that use font size, boldface, color, background color, extra spacing (not blank lines) or any of a wide variety of purely visual methods to imply meaning. When heading content is not created with proper markup the meaning conveyed by presentation will be lost when style sheets are turned off.",
          recommendation:
            "Developers must ensure that headers with proper markup are employed for any elements that solely use a visual effect to convey a content/section heading. HTML heading elements such as h1,h2,h3,h4,h5, and h6 must be used to specifically mark up page content that visually appears as a heading.",
          keepElement: true,
          keepAttribute: true,
        },
        {
          id: "response-headings",
          text: "Order",
          impact:
            'Developers should order heading elements properly. The heading element level must match the level communicated visually by the headings on the page. Headings can be used to communicate structure as well as important content although their purpose should generally be to communicate the structure of content. For example, in HTML, h2 elements should generally follow h1 elements, h3 elements should follow h2 elements, etc. Content developers should generally not "skip" levels (e.g., h1 directly to h3). When levels are skipped, users of assistive technology may not understand the relationship of the content.',
          recommendation:
            'Ensure that all heading elements are used in the proper order. Headings should be used to create a structured "Table of Contents" for the user that follows a logical order. Skipping heading ranks can be confusing and should be avoided where possible: Make sure that an h2 is not followed directly by an h4, for example. It is OK to skip ranks when closing subsections, for instance, a <h2> beginning a new section, can follow an <h4> as it closes the previous section.',
          keepElement: true,
          keepAttribute: true,
        },
        {
          id: "response-headingsunnessary",
          text: "Unnessary",
          impact:
            "Heading elements should be utilized only when necessary and primarily to mark the beginning of related sections of content. Making an effective use of headings can provide an excellent benefit to users of assistive technology, which may provide the user with a way to navigate section-by-section through content. By applying headings incorrectly, or for passages of text which do not delineate a section, users of assistive technology may be stripped of this useful navigation technique.",
          recommendation:
            "Remove the heading structure from heading elements that do not contain any sub-information. If headings are meant to mark up sub-information ensure that information properly follows the headings.",
          keepElement: true,
          keepAttribute: true,
        },
      ],
    },
    {
      name: "HTML",
      children: [
        {
          id: "response-html",
          text: "Bad",
          impact:
            'Documents that use markup languages must be well-formed. When documents are not well-formed user agents and/or assistive technology may not correctly parse and render the content to users. Many major user-agents are able to cope well with "bad" markup, however, to be consistent across all platforms and browsers well-formed markup must be used. This is especially important for assistive technology which may or may not be programmed to perform the same level of "coping" that can be found in browsers.',
          recommendation:
            "Ensure that all page elements have complete start and end tags, elements are nested according to specification, elements do not contain duplicate attributes, and any IDs are unique (except where allowed by the document specification). Mismatched opening and closing quotes, malformed attributes, attributes not space separated, mismatched opening and closing tags, and in some cases, unquoted attributes are also violations.\n\nThe best way to know that a document meets these requirements is to run the document through the W3C's HTML validator and then review the errors/warnings.\n\nhttps://validator.w3.org/",
          keepElement: true,
        },
        {
          id: "response-duplicateid",
          text: "Duplicate ID",
          issue:
            "There are duplicate values for ID attributes on the page. Each ID value must be unique per page. This is especially important since assistive technology will use the ID attribute to correctly identify different sections of the page.",
          impact:
            'Documents that use markup languages must be well-formed. When documents are not well-formed user agents and/or assistive technology may not correctly parse and render the content to users. Many major user-agents are able to cope well with "bad" markup, however, to be consistent across all platforms and browsers well-formed markup must be used. This is especially important for assistive technology which may or may not be programmed to perform the same level of "coping" that can be found in browsers.',
          recommendation:
            "Ensure that all page elements have complete start and end tags, elements are nested according to specification, elements do not contain duplicate attributes, and any IDs are unique (except where allowed by the document specification). Mismatched opening and closing quotes, malformed attributes, attributes not space separated, mismatched opening and closing tags, and in some cases, unquoted attributes are also violations.\n\nThe best way to know that a document meets these requirements is to run the document through the W3C's HTML validator and then review the errors/warnings.",
          keepElement: true,
        },
        {
          id: "response-obsolete",
          text: "Obsolete",
          issue:
            "Throughout the pages, there are depreciated HTML elements and attributes. Elements such as CENTER and FONT, and attributes such as NAME, ALIGN, VALIGN, CELLPADDING, CELLSPACING, WIDTH, HEIGHT, and BORDER should be removed from the pages.",
          impact:
            "Screen readers and other assistive technology may not support deprecated HTML. Also, many of the deprecated attributes are related to styling the content on the page, which to increase compatibility with the most significant number of devices, should be moved to CSS.",
          recommendation:
            "Replace all depreciated/obsolete HTML elements with elements in the current standard. The best way to know that a document does not have any depreciated elements is to run the document through the W3C's HTML validator and then review the errors/warnings.\n\nhttps://validator.w3.org/",
          reading:
            "For more information on depreciated items, please refer to the W3C specification for HTML5:\n\nDepreciated Elements\nhttps://www.w3.org/TR/html5-diff/#obsolete-elements\n\nDepreciated Attributes\nhttps://www.w3.org/TR/html5-diff/#obsolete-attributes",
          keepElement: true,
        },
      ],
    },
    {
      name: "Images",
      children: [
        {
          id: "response-meaingfulalt",
          text: "Meaningful ALT",
          impact:
            "Images that convey meaning must provide informative alternative text. Alternative text that is default, non-meaningful, or otherwise incorrect, can negatively impact the accessibility of a page. The goal of alt text should be to present text which will provide the same level of understanding to those who cannot see the image as it does to those who can. Whenever possible, page developers should ensure alternative text for images is as terse, yet informative, as possible.",
          recommendation:
            "Alternative text should be replaced with a more informative or correct alternative text. Page developers should ensure that alt text is a concise and meaningful replacement for the image.",
          keepElement: true,
          keepAttribute: true,
        },
        {
          id: "response-missingalt",
          text: "Missing ALT",
          impact:
            "All images within a page must be given an alternate text equivalent. Text equivalents for non-text elements communicate the meaning of images to users who cannot perceive the image such as users of screen readers. Proper equivalents provide text which contributes the same level of understanding to the content of the page as the image itself. In instances where the image does not contribute to the understanding of the content and is purely decorative, it needs to be marked in a way to indicate its purely decorative purpose.",
          recommendation:
            'Add an appropriate alt attribute for images that do not contain alt attributes. An alt attribute should be a concise and meaningful replacement for the image. For example, when describing a picture of a red balloon, entering alt="red balloon" will be more helpful than alt="This is a picture of a red balloon". The alt text of the image should be in the language of the page or if the page contains multiple languages the language of the surrounding or any referring content.\n\nIf the image does not convey any meaning (such as a spacer image, separation line, border, etc.), or if the image is redundant to adjacent text, enter a null alt attribute (alt=""). Alternatively, the image could be turned into a CSS background image.',
          keepElement: true,
          keepAttribute: true,
        },
      ],
    },
    {
      name: "Keyboard",
      children: [
        {
          id: "response-dismiss",
          text: "Dismiss Dialogue",
          impact:
            "Dialogs must provide a mechanism for users to close the dialog using the keyboard. This includes the ability to navigate to the close link via the keyboard such as by tabbing or shift+tabbing. The user must also be able to activate the link or button via the keyboard.",
          recommendation:
            'Developers should ensure that the element used to close the dialog is reachable via the keyboard. Typically this would be through use of the tab or shift+tab key. Additionally, access keys such as the letter "c" with a modifier can be used to close the link. In general the access key should be in addition to ensuring the close method is in the tab order. Developers should ensure that the close link/button can be activated via the keyboard via the ENTER key. It is recommended but not required to provide an additional close link at the bottom of the dialog to allow users of assistive technology to more effectively close the dialog. This additional redundant close link can be on or off-screen and should be in the tab order.',
          keepElement: true,
          keepAttribute: true,
        },
        {
          id: "response-keyboardfunction",
          text: "Function",
          impact:
            "All functionality must be actionable regardless of the input method used. Navigation and functionality that is dependent on specific devices such as a mouse may not be available to users with dexterity impairments as well as people without vision or low vision. These users may not be able to use a mouse so content providers should ensure that all functionality can be used from the keyboard.",
          keepElement: true,
          keepAttribute: true,
        },
        {
          id: "response-visiblefocus",
          text: "Visible Focus",
          impact:
            'Elements on the page do not have a visual indication focus.\n\n[User Impact]\nKeyboard only users will have difficulties understanding which interactive element is currently selected. A well-defined (highly visible) visual indication of keyboard focus needs to be provided for each active element. This position on a screen where an action or keyboard input will take place is referred to as the "focus". Providing a visual indication of the focus allows someone who is viewing the screen to determine what action to take based on what element has focus. This is particularly necessary for keyboard-only users who do not use the mouse and cannot simply click to place focus where they think it should be. The user must rely on the visual indication of focus to determine where an action will occur or determine what keystrokes to perform to move focus to the desired field. If this focus is not indicated the user will be unclear as to where the current execution focus is located and may enter incorrect information, accidentally submit a form without knowledge of what occurred, or spend extra time trying to determine where the keyboard input focus is.',
          recommendation:
            "Developers should ensure that visible keyboard focus is provided to all elements. Typically the browser will provide keyboard focus using a dotted rectangle for all standard HTML elements such as input, select, textarea, anchor, and area. When scripting is used to set focus to other elements coupled with the tabindex attribute or when the CSS outline property is set to none developers must ensure that visual focus is added by using color with border or other visual attributes.",
          compliantExample:
            "<style>\na:hover, a:active, a:focus, button:hover, button:active, button:focus { \n    outline: 1px dotted #ff0000; \n}</style>",
          keepElement: true,
          keepAttribute: true,
        },
      ],
    },
    {
      name: "Links",
      children: [
        {
          id: "response-linkcolor",
          text: "Color Only",
          impact:
            "Color must not be the sole method of indicating a link within non-linked text.",
          recommendation:
            "The link must possess other visual attributes upon keyboard focus such as becoming underlined. Additionally, the color of the link text and non-linked text must meet color contrast requirements for the WCAG conformance level sought.",
          compliantExample:
            "a:visited, a:hover, a:active { color: #ff0000 text-decoration: underline; }",
          keepElement: true,
          keepAttribute: true,
        },
        {
          id: "response-linkmean",
          text: "Meaning/Dup",
          impact:
            'It is important for users to be able to discern the purpose of all links. Meaningful link text should not be overly general and should clearly describe the content to be found or action to be performed by the link. For example, do not use generic text such as "click here", "read more", etc. unless the purpose of the link can be determined by meaning in the surrounding content. When a link\'s purpose can not be determined users may be required to follow the link to determine its purpose. Returning to a previous location can often be more difficult for users with disabilities using assistive technology.\n\nLink text should also be unique to the target of a given link. When links with different destinations are given identical link text, this can produce confusion for users of assistive technologies, some of which provide users the ability to view a list of all links on the document.',
          recommendation:
            "Ensure the accessible name of each link accurately reflects the target and purpose of the link. Ideally, this can be done by changing text that is used to calculate a link's accessible name. Other methods of changing the link text include using the aria-labelledby/aria-label attributes, or by using hidden text within the link.",
          keepElement: true,
          keepAttribute: true,
        },
      ],
    },
    {
      name: "Page",
      children: [
        {
          id: "response-pagelang",
          text: "Language",
          issue:
            "The language of the page is not set. Developers should define the natural language of a document to ensure that screen readers and other user agents understand the language the document is to be interpreted in.",
          impact:
            "Specifically, when a document contains multiple inline language choices, screen readers and other assistive technology types must know what the default language type is to ensure they can appropriately switch between languages. Per the HTML 4.01 recommendation, language declarations should be made in accordance with IETF RFC 1766.",
          example: "<!doctype html>\n<html>\n<head>",
          recommendation:
            "Ensure that the lang attribute is set within the HTML element. Always use a language attribute on the HTML element. This is inherited by all other elements, and so will set a default language for the text in the document head element.\n\nIf you have any content on the page that is in a different language from that declared in the HTML element, use language attributes on elements surrounding that content. This allows you to style or process it differently.",
          compliantExample: '<!doctype html>\n<html lang="en">\n<head>',
        },
        {
          id: "response-viewport",
          text: "META Viewport",
          issue: "There is a fixed size viewport.",
          impact:
            "Users, especially those with limited vision or using mobile devices, need to be able to increase the size of the textual elements on the pages. By disabling this with the viewport, users will not be able to zoom in.",
          recommendation:
            "Remove the maximum scale and user-scalable attributes from the viewport META element.",
          compliantExample:
            "<meta content='width=device-width; initial-scale=1.0;' name='viewport' />",
          keepElement: true,
        },
        {
          id: "response-skipnav",
          text: "Skip Nav",
          issue: "There is no way to skip past the navigation elements.",
          impact:
            "Repetitive content found on a set of pages requires a method to allow a user to skip past it, so the user can get to the page's main/unique content as efficiently as possible. For example, consider a user who is blind using a screen reader or a keyboard-only user. Each time the user accesses a new page in a site with a top navigation bar, the user would be forced to navigate past e.g. tab through all of these navigation links (and other content) before getting to the main content area of the page. This makes it difficult to access the page's main/unique information efficiently.",
          recommendation:
            "Provide a valid skip link that directs users to the unique content of each page. This can be hidden, but needs to become visual when focused upon.",
          compliantExample:
            '<style>\n\n   #skip a { position:absolute; left:-10000px; top:auto; width:1px; height:1px; overflow:hidden; }\n\n   #skip a:focus { position:static; width:auto; height:auto; }\n\n</style>\n\n<div id="skip">\n   <a href="#main">Skip to Main Content</a>\n</div>',
        },
        {
          id: "response-pagetitle",
          text: "Title",
          impact:
            "The title of a page must provide information specific to the currently viewed page. Assistive technologies utilize the page title to indicate the current page location to users without the user having to navigate within the page. Because assistive technology often reads the page title first, this content should inform the user of the content to be found (topic) or action to be performed on (purpose of) that page.",
          recommendation:
            "Ensure that the value for the title element is updated as the page content changes. The title element should be terse yet informative and contain information which discloses the content to be found or action to be performed on that page and should avoid containing extra information that does not aid in this understanding. The title of the page should be in the primary language of the page.",
          keepElement: true,
          keepAttribute: true,
        },
      ],
    },
    {
      name: "Tables",
      children: [
        {
          id: "response-tablerow",
          text: "Row TH",
          impact:
            "Table row cells that act as header cells for a row of data need to communicate this programmatically. Row header cells are often identified visually by boldface or other differences in color/font compared to data cells (though this is less common than for column header cells). When table row headers do not communicate their status as headers, assistive technology such as screen readers may not announce the correct row header cells when users navigate up/down columns of data.",
          recommendation:
            "Make sure th elements are used for cells that represent row headers. In addition, add the scope attribute with a value of row. This requirement is particularly critical if the row header cells are not in the first column.",
          keepElement: true,
          keepAttribute: true,
        },
      ],
    },
  ];

  return response;
}
function dataPreferred() {
  const preferred = [
    {
      id: "response-radiogroup-no-name",
      text: 'role="radiogroup" with no accessible name',
      issue:
        'There are elements with role="radiogroup" that have no accessible name. Examples include:\n- ',
      impact:
        "Screen reader users will have difficulty understanding the purpose of this control group.",
      recommendation:
        'Ensure fieldsets are labelled appropriately. If role="radiogroup" is used, the element with this role must have an accessible name. This can be set with an aria-label or aria-labelledby attribute.',
      compliantExample: "",
      keepElement: true,
      keepAttribute: true,
      bps: [332],
    },
    {
      id: "response-missing-label",
      text: "Missing label",
      issue:
        "There are form controls without a programmatically associated label describing their purpose. Examples include:\n- ",
      impact:
        "Screen reader users and users with cognitive disabilities may be unable to determine what these controls are for. Speech input users will have difficulty navigating to them.",
      recommendation:
        "Provide a valid label for form fields.\n\nLabels must meet the following requirements:\n- The label must be visible.\n- The label must be persistent. That is, a label must remain visible when text is entered into the field or an option is selected.\n- The label must be programmatically associated with the form field. The most common way to do this is with a <label> element with a for attribute set to the ID of the field.\n- The label must provide the accessible name of the field, or the label's exact text must be included in the accessible name.",
      compliantExample: "",
      keepElement: true,
      keepAttribute: true,
      bps: [338],
    },
    {
      id: "response-field-with-unassociated-label",
      text: "Field with unassociated label",
      issue:
        "There are form controls with visual labels that are not programmatically associated with the control. Examples include:\n- ",
      impact:
        "Screen reader users will have difficulty determining the purpose of these controls. Speech input users will have difficulty navigating to them.",
      recommendation:
        "Provide a valid label for form fields. The best way to do this is to use a <label> element with a for attribute set to the ID of the field it labels. For custom controls, use aria-labelledby on the control set to the ID of the labelling text.",
      compliantExample: "",
      keepElement: true,
      keepAttribute: true,
      bps: [338],
    },
    {
      id: "response-form-groups-lack-fieldset",
      text: "Form groups lack fieldset",
      issue:
        "There are visually grouped form controls that are not programmatically grouped. Examples include:\n- ",
      impact:
        "Screen reader users will have difficulty understanding the relationship between these form controls.",
      recommendation:
        "Provide fieldsets for groups of form controls. Common groups of form controls include related radio buttons, checkboxes, and shipping/billing address groupings. The <fieldset> element must have a descriptive <legend> element as its first child. The form controls must appear as descendants of the fieldset.",
      compliantExample: "",
      keepElement: true,
      keepAttribute: true,
      bps: [341],
    },
    {
      id: "response-area-without-equivalent",
      text: "area element with no alt text",
      issue:
        "There are <area> elements with no textual equivalents. Examples include:\n- ",
      impact:
        "Screen reader users will be unable to determine what these images represent.",
      recommendation:
        "Ensure area alternative text is meaningful and concise. Add an alt attribute to the <area>, then set its value to a proper textual equivalent.",
      compliantExample: "",
      keepElement: true,
      keepAttribute: true,
      bps: [343],
    },
    {
      id: "response-skip-link-missing",
      text: "Skip link - General",
      issue:
        "There is repetitive content without a mechanism to skip past it. Examples include:\n- ",
      impact:
        "Keyboard users will have to execute numerous keypresses in order to get to the following content.",
      recommendation:
        "Provide a mechanism for skipping past repetitive content. There must be a keyboard-only means of skipping past repeated blocks of content that occur on multiple pages, such as a link. This control must be the first focusable element before the repeated content and must visually appear on keyboard focus. When the control is activated, keyboard focus must be moved beyond the repeated content.",
      compliantExample: "",
      keepElement: true,
      keepAttribute: true,
      bps: [345],
    },
    {
      id: "response-skip-link-broken",
      text: "Skip link broken",
      issue: "The skip link does not target the main content.",
      impact:
        "Keyboard users will have to execute numerous keypresses in order to get to the following content.",
      recommendation:
        "Provide a mechanism for skipping past repetitive content. There must be a keyboard-only means of skipping past repeated blocks of content that occur on multiple pages, such as a link. This control must be the first focusable element before the repeated content and must visually appear on keyboard focus. When the control is activated, keyboard focus must be moved beyond the repeated content.",
      compliantExample: "",
      keepElement: true,
      keepAttribute: true,
      bps: [345],
    },
    {
      id: "response-skip-link-not-far-enough",
      text: "Skip link does not skip all repetitive content",
      issue:
        "A skip link exists, but it does not skip past all repetitive content.",
      impact:
        "Keyboard users will have to execute numerous keypresses in order to get to the main content in the page.",
      recommendation:
        "Provide a mechanism for skipping past repetitive content. There must be a keyboard-only means of skipping past repeated blocks of content that occur on multiple pages, such as a link. This control must be the first focusable element before the repeated content and must visually appear on keyboard focus. When the control is activated, keyboard focus must be moved beyond the repeated content.",
      compliantExample: "",
      keepElement: true,
      keepAttribute: true,
      bps: [345],
    },
    {
      id: "response-page-refreshes-automatically",
      text: "Page refreshes automatically",
      issue:
        'There is a <meta> element that has an "http-equiv" attribute set to the value of "refresh" and a "content" attribute set to greater than zero seconds.',
      impact:
        "Screen reader users and users with cognitive disabilities may be disoriented by this refresh. They may also not have sufficient time to access page content.",
      recommendation:
        "Ensure pages do not automatically refresh. Users must be able to turn off, adjust, or extend the refresh, unless it happens after 20 hours, involves a real-time data transaction, or if it is essential to the purpose of the page.",
      compliantExample: "",
      keepElement: true,
      keepAttribute: true,
      bps: [347],
    },
    {
      id: "response-server-side-image-map",
      text: "Server-side image map",
      issue:
        "There are <img> elements with an ismap attribute. Examples include:\n- ",
      impact:
        "Keyboard users and screen reader users will be prevented from accessing the link in server-side image maps. Without alternative routes, these users will not be able to access the image map regions.",
      recommendation:
        "Provide alternatives for server-side image maps. Convert server-side image maps to client-side image maps or remove them altogether. If conversion or removal of the image maps is not possible, alternative links must be provided for each server-side image map.",
      compliantExample: "",
      keepElement: true,
      keepAttribute: true,
      bps: [358],
    },
    {
      id: "response-device-dependent-event-handlers",
      text: "Device-dependent event handlers",
      issue:
        "There are elements that use only mouse-related event handlers. Examples include:\n- ",
      impact:
        "Keyboard users will be prevented from accessing the functionality provided by these controls.",
      recommendation:
        'Avoid the sole use of device-dependent event handlers. The best way to accomplish this is by using appropriate native controls, which come with keyboard functionality built in.\n\nIf using a native control is not possible, the control must have tabindex="0" and appropriate key-based JavaScript event handlers.',
      compliantExample: "",
      keepElement: true,
      keepAttribute: true,
      bps: [359],
    },
    {
      id: "response-invalid-headers-id",
      text: "Headers attribute with invalid id",
      issue:
        "There are table data cells with a headers attribute set to an invalid ID or IDs. Examples include:\n- ",
      impact:
        "Screen reader users will not be able to determine which headers name these cells.",
      recommendation:
        "Ensure headers and cells are properly associated. All headers attributes must refer to existing IDs of elements that are descendants of the parent <table> element.",
      compliantExample: "",
      keepElement: true,
      keepAttribute: true,
      bps: [361],
    },
    {
      id: "response-missing-rowgroup-colgroup",
      text: "Missing rowgroup or colgroup",
      issue:
        'There are table headers that span multiple rows or columns but do not have scope="rowgroup" or "colgroup". Examples include:\n-',
      impact:
        "Screen reader users will not be able to determine which cells correspond to these headers.",
      recommendation:
        'Ensure headers and cells are properly associated. If a table header has a colspan or rowspan attribute set to a value other than "1", that header\'s scope attribute must be set to "colgroup" or "rowgroup" respectively.',
      compliantExample: "",
      keepElement: true,
      keepAttribute: true,
      bps: [361],
    },
    {
      id: "response-missing-scope",
      text: "Missing scope",
      issue:
        "There are table headers with no scope attributes. Examples include:\n- ",
      impact:
        "Screen reader users will not be able to determine which cells correspond to these headers.",
      recommendation:
        'Ensure headers and cells are properly associated. All <th> elements must have a scope attribute set to "row" or "col" depending on whether the cell is a row header or a column header.',
      compliantExample: "",
      keepElement: true,
      keepAttribute: true,
      bps: [361],
    },
    {
      id: "response-missing-id",
      text: "Header missing ID",
      issue:
        "There are table headers missing an id attribute, which is required when the headers attribute is used to associate cells with their headers. Examples include:\n- ",
      impact:
        "Screen reader users will not be able to determine which cells correspond to these headers.",
      recommendation:
        "Ensure headers and cells are properly associated. When the headers attribute is used on data cells to associate headers, every <th> element must have an id attribute.",
      compliantExample: "",
      keepElement: true,
      keepAttribute: true,
      bps: [361],
    },
    {
      id: "response-missing-headers",
      text: "Cell missing headers attribute",
      issue:
        "There are table data cells missing a headers attribute, which is required if any other data cell in the table uses this attribute. Examples include:\n- ",
      impact:
        "Screen reader users will not be able to determine which headers name these cells.",
      recommendation:
        "Ensure headers and cells are properly associated. If the headers attribute is used to associate headers with a data cell, every data cell in the table must have the headers attribute.",
      compliantExample: "",
      keepElement: true,
      keepAttribute: true,
      bps: [361],
    },
    {
      id: "response-meaningful-img-has-no-alternative-text",
      text: "Meaningful image with no textual equivalent",
      issue:
        "There are meaningful images without a textual equivalent. Examples include:\n- ",
      impact:
        "Screen reader users will be unable to determine what these images represent.",
      recommendation:
        "Provide alternative text for images. Meaningful images must have a concise but descriptive textual equivalent. To add a textual equivalent to an <img> element, set its alt attribute to a descriptive value. To add a textual equivalent to a <svg> element, add an aria-label attribute set to the desired equivalent.",
      compliantExample: "",
      keepElement: true,
      keepAttribute: true,
      bps: [362],
    },
    {
      id: "response-img-is-not-marked-as-decorative",
      text: "Decorative image not marked decorative",
      issue:
        "There are images that serve a decorative purpose but are exposed to screen readers. Examples include:\n- ",
      impact:
        'Screen readers may announce <img> elements with no alt attribute by their filename and SVGs with no accessible name as "group." This gives screen reader users irrelevant and confusing information.',
      recommendation:
        'Provide alternative text for images. Non-meaningful images must be marked as decorative, which causes screen readers to ignore them. To mark an <img> element as decorative, set its alt attribute to "" (that is, alt="" exactly as written, with no space between the quotation marks). To mark an <svg> element as decorative, add aria-hidden="true" to the element.',
      compliantExample: "",
      keepElement: true,
      keepAttribute: true,
      bps: [362],
    },
    {
      id: "response-object-element-accessible-name-missing",
      text: "Object with no accessible name",
      issue:
        "There are <object> elements with no accessible name. Examples include:\n- ",
      impact: "Screen reader users will not know the purpose of this object.",
      recommendation:
        "Provide text equivalents for object, audio, and video elements. Add an aria-labelledby, aria-label, or title attribute set to an appropriate accessible name.",
      compliantExample: "",
      keepElement: true,
      keepAttribute: true,
      bps: [363],
    },
    {
      id: "response-decorative video",
      text: "Decorative video",
      issue:
        "There are videos that serve a decorative purpose but are exposed to screen readers. Examples include:\n- ",
      impact:
        "Screen reader users will be unable to determine whether the contents of this video are meaningful or decorative.",
      recommendation:
        'Provide text equivalents for object, audio, and video elements. If a video serves a purely decorative purpose, such as a background, hide it from assistive technologies by setting aria-hidden="true" on the element.',
      compliantExample: "",
      keepElement: true,
      keepAttribute: true,
      bps: [363],
    },
    {
      id: "response-title-element-missing",
      text: "Title element missing",
      issue: "The page has no title.",
      impact:
        "Screen reader users and some users with cognitive disabilities will have difficulty determining the purpose of the page.",
      recommendation:
        "Ensure pages use the title element. The title must contain both the name of the page and the name of the site.",
      compliantExample: "",
      keepElement: true,
      keepAttribute: true,
      bps: [364],
    },
    {
      id: "response-text-contrast-insufficient",
      text: "Text contrast insufficient",
      issue:
        "There is text that does not meet the required minimum color contrast ratio with its background.\n\nForeground color: \nBackground color: \nContrast ratio: \nRequired contrast ratio for this content: \n\nExamples of text with this contrast ratio include:\n- ",
      impact:
        "Users with low vision will have difficulty reading this content.",
      recommendation:
        "Ensure text and images of text provide sufficient contrast. The following contrast ratios are required:\n\n- Text smaller than 18 pt (24 px), or smaller than 14 pt (19 px) if bold, must have a color contrast ratio of 4.50:1 or more with adjacent colors.\n\n- Text 18 pt (24 px) or larger, or 14 pt (19 px) or larger if bold, must have a color contrast ratio of 3.00:1 or more with adjacent colors.\n\nDisabled controls that do not accept user interaction are exempt from this requirement.\n\nRefer to the Accessible Color Picker extension or Color Contrast Checker site for assistance: https://www.accessibility.dev/",
      compliantExample: "N/A",
      keepElement: true,
      keepAttribute: true,
      convertColorContrastText: true,
      bps: [368],
    },
    {
      id: "response-web-text-on-image-contrast",
      text: "Text on image contrast",
      issue:
        "There is text on an image background that does not meet the required minimum color contrast ratio.\n\nForeground color: \nBackground color: \nContrast ratio: \nRequired contrast ratio for this content: \n\nExamples of insufficiently contrasting text in front of images include:\n- ",
      impact:
        "Users with low vision will have difficulty reading this content.",
      recommendation:
        "Ensure text and images of text provide sufficient contrast.\n\nFor text in front of images, the best way to meet contrast requirements is to use a solid, opaque background behind the text. Alternatively, provide a transparent colored background that ensures all parts of the background image provide sufficient contrast with the text.\n\nThe following contrast ratios are required:\n\n- Text smaller than 18 pt (24 px), or smaller than 14 pt (19 px) if bold, must have a color contrast ratio of 4.50:1 or more with adjacent colors.\n\n- Text 18 pt (24 px) or larger, or 14 pt (19 px) or larger if bold, must have a color contrast ratio of 3.00:1 or more with adjacent colors.\n\nDisabled controls that do not accept user interaction are exempt from this requirement.\n\nRefer to the Accessible Color Picker extension or Color Contrast Checker site for assistance: https://www.accessibility.dev/",
      compliantExample: "N/A",
      keepElement: true,
      keepAttribute: true,
      bps: [368],
    },
    {
      id: "response-color-only-identification",
      text: "Color only - General",
      issue:
        "There is content that uses color alone to visually indicate information. Examples include:\n- ",
      impact:
        "Users with color blindness will have difficulty identifying the colors used to convey this information.",
      recommendation:
        "Ensure color is not the sole means of communicating information. Color can be used as long as other visual indicators of the information are also present. Common additional visual indicators include underlining, bolding, additional on-screen text conveying the information, or change in shape or size.",
      compliantExample: "N/A",
      keepElement: true,
      keepAttribute: true,
      bps: [369],
    },
    {
      id: "response-color-only-links",
      text: "Color only - Links",
      issue:
        "There are inline links that use color alone to visually indicate that they are links. Examples include:\n- ",
      impact:
        "Users with color blindness will have difficulty distinguishing which text is a link.",
      recommendation:
        "Ensure color is not the sole means of communicating information. Color can be used as long as other visual indicators of the information are also present. Common additional visual indicators for links include underlining or bolding.",
      compliantExample: "N/A",
      keepElement: true,
      keepAttribute: true,
      bps: [369],
    },
    {
      id: "response-alt-text-not-meaningful",
      text: "Meaningful image with improper text equivalent",
      issue:
        "There are images with insufficiently descriptive textual equivalents. Examples include:\n- ",
      impact:
        "Screen reader users will not receive an accurate impression of the contents of these images.",
      recommendation:
        "Ensure images provide informative alternative text. Textual equivalents must be both concise and descriptive.",
      compliantExample: "",
      keepElement: true,
      keepAttribute: true,
      bps: [370],
    },
    {
      id: "response-decorative-with-descriptive-alt",
      text: "Decorative image with textual equivalent",
      issue:
        "There are decorative images with textual equivalents. Examples include:\n- ",
      impact:
        "Screen reader users will receive unnecessary and potentially confusing information.",
      recommendation:
        'Ensure images provide informative alternative text. Non-meaningful images must be marked as decorative, which causes screen readers to ignore them. To mark an <img> element as decorative, set its alt attribute to "" (that is, alt="" exactly as written, with no space between the quotation marks). To mark an <svg> element as decorative, add aria-hidden="true" to the element.',
      compliantExample: "",
      keepElement: true,
      keepAttribute: true,
      bps: [370],
    },
    {
      id: "response-button-short-name",
      text: "Button with non-descriptive name",
      issue:
        "There are buttons with insufficiently descriptive accessible names. Examples include:\n- ",
      impact:
        "Screen reader users will be unable to determine the purpose of these buttons.",
      recommendation:
        'Ensure headings and labels are descriptive and unique. This includes the accessible names of buttons. The accessible name of a button can be set with internal text, an aria-label attribute, or an aria-labelledby attribute. Good accessible names are both concise and descriptive. Avoid including the word "button" in the accessible name, as this information is already supplied by the button\'s role.',
      compliantExample: "",
      keepElement: true,
      keepAttribute: true,
      bps: [373],
    },
    {
      id: "response-missing-table-headers",
      text: "Unassociated table headers",
      issue:
        "There are table headers that are not associated with their corresponding data cells. Examples include:\n- ",
      impact:
        "Screen reader users will not be able to determine the relationships between cells in these tables.",
      recommendation:
        'Ensure data table headers are properly identified. Ensure all cells that function as row or column headers use <th> elements. Additionally, ensure all <th> elements have a scope attribute set to "row" or "col" depending on whether the particular cell is a row header or a column header. Finally, if a header cell spans multiple rows or columns, set its rowspan or colspan attributes to the number of rows or cells it spans.\n\nIf a table is sufficiently complex that these methods cannot associate a header with its cell, each cell must have a headers attribute set to a space-separated list of the IDs of the headers associated with the cell. This is often time-consuming and prone to error. Splitting complex tables into separate, simpler tables is strongly recommended.',
      compliantExample: "",
      keepElement: true,
      keepAttribute: true,
      bps: [375],
    },
    {
      id: "response-implicit-table",
      text: "Implicit table",
      issue:
        "There are data tables that do not use table markup. Examples include:\n- ",
      impact:
        "Screen reader users will not be able to determine the relationships between cells in these tables.",
      recommendation:
        'Ensure data tables are formatted using table elements. Table elements include <table>, <tr>, <th>, and <td>. <th> elements must have a scope attribute set to "col" or "row" according to whether it functions as a column header or a row header.',
      compliantExample: "",
      keepElement: true,
      keepAttribute: true,
      bps: [376],
    },
    {
      id: "response-timing-general",
      text: "Timing - General",
      issue:
        "There are time-based sessions or responses that cannot be turned off, extended, or accessibly adjusted. Examples include:\n- ",
      impact:
        "Users who require additional time to fill out forms will lose the information they've entered when a session times out.",
      recommendation:
        "Ensure accessible usage of time based sessions and timed responses. Users must be able to extend, set, or remove any timeout unless the timeout is longer than 20 hours or the timeout is essential to the page's purpose (such as an auction).",
      compliantExample: "",
      keepElement: true,
      keepAttribute: true,
      bps: [380],
    },
    {
      id: "response-time-based-session-insufficient",
      text: "Timing - Log out",
      issue:
        "There are time-based sessions or responses that cannot be turned off, extended, or accessibly adjusted. Examples include:\n- ",
      impact:
        "Users who require additional time to fill out forms will lose the information they've entered when a session times out.",
      recommendation:
        "Ensure accessible usage of time based sessions and timed responses. Users must be able to extend, set, or remove any timeout unless the timeout is longer than 20 hours or the timeout is essential to the page's purpose (such as an auction).",
      compliantExample: "",
      keepElement: true,
      keepAttribute: true,
      bps: [380],
    },
    {
      id: "response-heading-levels-match-visual-heading-hierarchy.",
      text: "Heading levels don't match visual heading hierarchy.",
      issue:
        "There are headings with levels that do not match their visual level on the page. Examples include:\n- ",
      impact:
        "Screen reader users will have difficulty efficiently navigating and gaining an accurate overview of the page.",
      recommendation:
        "Ensure heading level matches the heading's visual importance/level. The level of heading element used (<h1>, <h2>, etc.) must reflect its visual appearance in the hierarchy of the page.",
      compliantExample: "",
      keepElement: true,
      keepAttribute: true,
      bps: [387],
    },
    {
      id: "response-inline-lang-missing",
      text: "Inline language missing or incorrect",
      issue:
        "There is text in a different language from the rest of the page, but the language of this text is unspecified or incorrect. Examples include:\n- ",
      impact:
        "Screen readers will use inappropriate pronunciation when announcing this text.",
      recommendation:
        "Ensure changes in natural language are identified inline. Elements containing text in a different language from the overall document must have a lang attribute set to a valid BCP 47 primary language subtag: https://r12a.github.io/app-subtags/",
      compliantExample: "",
      keepElement: true,
      keepAttribute: true,
      bps: [389],
    },
    {
      id: "response-list-items-without-list-parent",
      text: "List items without list parent",
      issue: "There are improperly structured lists. Examples include:\n- ",
      impact: "Assistive technologies may be unable to parse this content.",
      recommendation:
        'Ensure sub-lists are marked up properly. <ul> and <ol> elements must only contain <li>, <script>, and <template> elements (without role attributes), and elements with role="listitem", as direct children. <li> elements must be direct children of an <ul> or an <ol> element.',
      compliantExample: "",
      keepElement: true,
      keepAttribute: true,
      bps: [393],
    },
    {
      id: "response-layout-table-structural",
      text: "Layout table marked for presentation",
      issue:
        "There are <table> elements used for layout purposes, but they are not marked as presentational. Examples include:\n- ",
      impact:
        "Screen readers will treat this content as a data table, causing confusion about its layout and impeding navigation.",
      recommendation:
        'Ensure layout tables indicate their use for presentation purposes. This can be done by adding role="presentation" to <table> elements used for a layout purpose. Additionally, convert any <th> cells to <td> cells. It is strongly recommended to use CSS instead of HTML table elements for layout purposes.',
      compliantExample: "",
      keepElement: true,
      keepAttribute: true,
      bps: [395],
    },
    {
      id: "response-directly-linked-image",
      text: "Directly linked image",
      issue:
        "There are links that directly target image files. Examples include:\n- ",
      impact:
        "It is not possible to add a textual equivalent to an image file, so screen reader users will be prevented from accessing the contents of these images.",
      recommendation:
        "Ensure links do not directly target images. Instead, include the image inside a page. Add a proper textual equivalent or mark the image as decorative.",
      compliantExample: "",
      keepElement: true,
      keepAttribute: true,
      bps: [401],
    },
    {
      id: "response-text-cannot-be-resized-to-200",
      text: "Text cannot be resized to 200%",
      issue:
        "There is content that disappears, overlaps, or is cut off when viewing the page at 200% browser zoom and a 1280-pixel viewport width. Examples include:\n- ",
      impact:
        "Users with low vision who need to resize text will be prevented from accessing this content.",
      recommendation:
        "Ensure text can be resized. Users must be able to resize text up to 200% zoom at a 1280-pixel viewport width without loss of content or functionality.\n\nMoving content to an accessible show/hide control, such as a hamburger menu, is acceptable.",
      compliantExample: "",
      keepElement: true,
      keepAttribute: true,
      bps: [409],
    },
    {
      id: "response-meta-viewport",
      text: "Meta viewport maximum-scale/user-scalable",
      issue:
        'The page has a <meta name="viewport"> element with a maximum-scale property set to less than 2 or a user-scalable property set to no.',
      impact:
        "Some browsers prevent users from resizing a page if these properties are set, so users with low vision who rely on resizing text will be prevented from reading content on the page.",
      recommendation:
        "Ensure containing elements allow text resize without loss of functionality. Users must be able to resize text up to 200% zoom at a 1280-pixel viewport width without loss of content or functionality.",
      compliantExample: "",
      keepElement: true,
      keepAttribute: true,
      bps: [410],
    },
    {
      id: "response-multiple-row-headers",
      text: "Multiple row headers",
      issue:
        "There are table rows with multiple row headers. Examples include:\n- ",
      impact:
        "Screen reader users will not understand the relationships between cells in these tables.",
      recommendation:
        'Ensure implicit row header cells use th elements with row scope. Only one descendant of a table row may be a row header. Ensure that only one element in the row is a <th scope="row"> element.',
      compliantExample: "",
      keepElement: true,
      keepAttribute: true,
      bps: [414],
    },
    {
      id: "response-suspicious-object-name",
      text: "Insufficiently descriptive object name",
      issue:
        "There are <object> elements with insufficiently descriptive accessible names. Examples include:\n- ",
      impact: "Screen reader users will not know what these objects represent.",
      recommendation:
        "Ensure applets provide valid text equivalents. This includes <object> elements. Alter the accessible name to a more descriptive value with an aria-label, aria-labelledby, or title attribute.",
      compliantExample: "",
      keepElement: true,
      keepAttribute: true,
      bps: [423],
    },
    {
      id: "response-page-lang-missing",
      text: "Page language missing or incorrect",
      issue: "The language of the page is unspecified or incorrect.",
      impact:
        "Screen readers will use inappropriate pronunciation when announcing the text of the page.",
      recommendation:
        "Ensure the language of a document is set. <html> elements must have a lang attribute set to a valid BCP 47 primary language subtag: https://r12a.github.io/app-subtags/\n\nFor pages in multiple languages, choose whichever language is used most frequently on the page. If two languages are used equally, choose the language which occurs first on the page.",
      compliantExample: "",
      keepElement: true,
      keepAttribute: true,
      bps: [429],
    },
    {
      id: "response-marquee",
      text: "Marquee present in page",
      issue: "There are <marquee> elements on the page. Examples include:\n- ",
      impact:
        "Users with cognitive disabilities may be prevented from reading important content before it appears, or it may be too distracting for them to remain on the page. Users with vestibular disorders or migraine may experience symptoms caused by this movement.",
      recommendation:
        "Ensure the marquee element is avoided. Replace this element with another element. If movement is required, provide an accessible mechanism to pause, stop, or hide the movement, such as a pause button.",
      compliantExample: "",
      keepElement: true,
      keepAttribute: true,
      bps: [441],
    },
    {
      id: "response-video-no-name",
      text: "Video accessible name missing",
      issue:
        "There are <video> elements without accessible names. Examples include:\n- ",
      impact:
        "Screen reader users will be unable to determine what these videos represent.",
      recommendation:
        "Ensure embedded objects are directly accessible. The best way to do this is to set an aria-labelledby attribute on the video element to the ID of any visually present label for the video. Alternatively, add an aria-label attribute to the video with the video's name.",
      compliantExample: "",
      keepElement: true,
      keepAttribute: true,
      bps: [444],
    },
    {
      id: "response-iframe-image",
      text: "I",
      issue: "There are iframes with image sources. Examples include:\n- ",
      impact:
        "Screen reader users will be unable to determine what these images represent.",
      recommendation:
        "Ensure frames utilize markup files as their source. Place the image into the main document or change the iframe to target an HTML document or other accessible document type.",
      compliantExample: "",
      keepElement: true,
      keepAttribute: true,
      bps: [456],
    },
    {
      id: "response-headings-are-implicit",
      text: "Headings are implicit",
      issue:
        "There is content that functions as a heading but does not use heading markup. Examples include:\n- ",
      impact:
        "Screen reader users will have difficulty efficiently navigating and gaining an accurate overview of the page.",
      recommendation:
        "Avoid the use of implicit headings. Text that visually appears as a heading for a section of content must use <h1>, <h2>, etc. elements. Additionally, ensure the level of the heading accurately reflects the element's position in the visual hierarchy.",
      compliantExample: "",
      keepElement: true,
      keepAttribute: true,
      bps: [457],
    },
    {
      id: "response-list-items-not-children-of-list",
      text: "List items not children of list",
      issue: "There are improperly structured lists. Examples include:\n- ",
      impact: "Assistive technologies may be unable to parse this content.",
      recommendation:
        'Ensure list items are found in a list container. <ul> and <ol> elements must only contain <li>, <script>, and <template> elements (without role attributes), and elements with role="listitem", as direct children. <li> elements must be direct children of an <ul> or an <ol> element.',
      compliantExample: "",
      keepElement: true,
      keepAttribute: true,
      bps: [464],
    },
    {
      id: "response-description-list",
      text: "Terms or details not children of description list",
      issue:
        "There are description terms or details that are not appropriately nested in a description list element. Examples include:\n- ",
      impact: "Assistive technologies may be unable to parse this content.",
      recommendation:
        "Ensure list items are found in a list container. For description lists, ensure that any <dt> and <dd> elements are children of the <dl> element or that they are children of a <div> element that is a child of the <dl>.",
      compliantExample: "",
      keepElement: true,
      keepAttribute: true,
      bps: [464],
    },
    {
      id: "response-navigation-inconsistent",
      text: "Navigation inconsistent",
      issue:
        "There are pages that do not use a consistent navigation structure.",
      impact:
        "Screen reader users, people with low vision, and people with cognitive disabilities may have difficulty locating repeated content and navigation structures.",
      recommendation:
        "Ensure pages use a consistent navigation structure. Navigational mechanisms that are repeated on multiple pages must occur in the same relative order each time they are used.",
      compliantExample: "",
      keepElement: true,
      keepAttribute: true,
      bps: [466],
    },
    {
      id: "response-canvas-text-equivalent-missing",
      text: "Canvas text equivalent missing",
      issue:
        "There are meaningful <canvas> elements with no textual equivalents. Examples include:\n- ",
      impact:
        "Screen reader users will be unable to determine what this canvas represents.",
      recommendation:
        "Ensure embedded elements and canvas elements provide a meaningful text equivalent.\nFor <canvas> elements, the best way to provide a textual equivalent is to add child HTML elements to the <canvas> element. Assistive technologies will access this content instead of the <canvas>.",
      compliantExample: "",
      keepElement: true,
      keepAttribute: true,
      bps: [476],
    },
    {
      id: "response-hr-width",
      text: "hr element with width",
      issue:
        "There are <hr> elements with a width set in absolute units. Examples include:\n- ",
      impact:
        "Users with low vision who use browser zoom may need to scroll excessively to access content.",
      recommendation:
        "Ensure hr elements utilize relative sizing. Specify the width of the <hr> element using relative units.",
      compliantExample: "",
      keepElement: true,
      keepAttribute: true,
      bps: [480],
    },
    {
      id: "response-unfocusable-links",
      text: "Unfocusable links",
      issue:
        "There are links that cannot receive keyboard focus. Examples include:\n- ",
      impact:
        "Keyboard users will be prevented from accessing the functionality provided by these controls.",
      recommendation:
        'Ensure all active elements receive keyboard focus or can be activated with the keyboard. In order for an <a> element to be focusable with the keyboard, it must have an href attribute set to a non-null value, or it must have tabindex="0".',
      compliantExample: "",
      keepElement: true,
      keepAttribute: true,
      bps: [490],
    },
    {
      id: "response-frame-with-no-title",
      text: "Frame with no title",
      issue:
        "There are <iframe> elements without an accessible name. Examples include:\n- ",
      impact:
        "Screen reader users will have difficulty determining the purpose of these iframes.",
      recommendation:
        "Ensure frame titles are meaningful. All meaningful iframes must have a title attribute set to a short description of the iframe.",
      compliantExample: "",
      keepElement: true,
      keepAttribute: true,
      bps: [523],
    },
    {
      id: "response-decorative-iframe",
      text: "Decorative iframe",
      issue:
        "There are visually hidden or decorative iframes that are exposed to assistive technologies. Examples include:\n- ",
      impact:
        "Screen readers may generate irrelevant or confusing announcements for this content.",
      recommendation:
        'Ensure frame titles are meaningful. If an <iframe> is decorative or meant to be hidden, hide it with display: none. Alternatively, set aria-hidden="true", tabindex="-1", and title="empty" on the iframe.',
      compliantExample: "",
      keepElement: true,
      keepAttribute: true,
      bps: [523],
    },
    {
      id: "response-focusable-aria-hidden-true",
      text: 'Focusable aria-hidden="true" element',
      issue:
        'There are keyboard-focusable controls with aria-hidden="true". Examples include:\n- ',
      impact:
        "Keyboard users will be able to navigate to this element even if it is off screen. Screen reader users will be able to focus this element if they press Tab, but they will be unable to determine its purpose.",
      recommendation:
        "Avoid placing inactive elements in the focus order. If content is meant to be hidden from all users, hide it with display: none or visibility: hidden. If content is meant to be accessed by all users, remove any aria-hidden attributes.",
      compliantExample: "",
      keepElement: true,
      keepAttribute: true,
      bps: [524],
    },
    {
      id: "response-page-title-repetitive",
      text: "Page title repetitive",
      issue: "The page title insufficiently describes the page's purpose.",
      impact:
        "Screen reader users and users with cognitive disabilities will have difficulty determining the purpose of the page.",
      recommendation:
        "Provide an informative, context-sensitive page title. The title must contain both the name of the page and the name of the site.",
      compliantExample: "",
      keepElement: true,
      keepAttribute: true,
      bps: [542],
    },
    {
      id: "response-multiple-labels",
      text: "Fields with multiple labels",
      issue:
        "There are form controls with multiple associated <label> elements. Examples include:\n- ",
      impact:
        "Assistive technologies may not associate all of the labels with the control. Different assistive technologies and browser combinations may use different labels as the accessible name.",
      recommendation:
        "Ensure elements with multiple labels are rendered appropriately. Only one <label> element can be associated with a control at a time.",
      compliantExample: "",
      keepElement: true,
      keepAttribute: true,
      bps: [551],
    },
    {
      id: "response-implicit-lists",
      text: "Implicit lists",
      issue:
        "There is content that appears as a list but does not use list markup. Examples include:\n- ",
      impact:
        "Screen reader users will have difficulty understanding that this content is a list.",
      recommendation:
        "Ensure implicit list markup is avoided. Lists must use <ul>, <ol>, <li>, <dl>, <dt>, and <dd> elements as appropriate.",
      compliantExample: "",
      keepElement: true,
      keepAttribute: true,
      bps: [566],
    },
    {
      id: "response-avoid-unnecessary-use-headings",
      text: "Unnecessary headings are used",
      issue:
        "There is content that uses heading markup but does not function as a heading. Examples include:\n- ",
      impact:
        "Screen reader users will have difficulty efficiently navigating and gaining an accurate overview of the page.",
      recommendation:
        "Avoid unnecessary use of heading elements. Only text that functions as a heading can use heading markup. Convert this content to a <div> or <span> element.",
      compliantExample: "",
      keepElement: true,
      keepAttribute: true,
      bps: [588],
    },
    {
      id: "response-nested-tables",
      text: "Nested tables",
      issue:
        "There are table cells with children that are <table> elements. Examples include:\n- ",
      impact:
        "Screen readers may be unable to parse this content. This may cause incorrect header announcements and break table navigation shortcuts for users.",
      recommendation:
        "Avoid using sub-tables in header elements. Do not nest <table> elements within <th> or <td> elements. Instead, use CSS to lay out content inside table cells.",
      compliantExample: "",
      keepElement: true,
      keepAttribute: true,
      bps: [590],
    },
    {
      id: "response-page-tabs-lack-state-or-role",
      text: "Page tabs lack state or role",
      issue:
        "There are tabs without appropriate name, role, and/or state information. Examples include:\n- ",
      impact:
        "Screen reader users will be unable to determine that these controls reveal panels of content and which panel is currently revealed.",
      recommendation:
        'Ensure page tabs provide state and role.\n\nFor tabs, the following information is expected:\n- The container for the set of tabs must have role="tablist".\n- Each tab must have role="tab" and must be a descendant of the tablist element.\n- Each panel container must have role="tabpanel".\n- If the tablist has a visible label, the tablist element must have aria-labelledby set to the ID of the labelling element. Otherwise, the tablist element must have aria-label set to the accessible name.\n- Each tab must have aria-controls set to the ID of its corresponding tabpanel.\n- The selected tab must have aria-selected="true". All other tabs must have aria-selected="false".\n- Tabpanel elements must have aria-labelledby set to the ID of their corresponding tab.\n- If the tablist is vertically oriented, it must have aria-orientation="vertical".',
      compliantExample: "",
      keepElement: true,
      keepAttribute: true,
      bps: [592],
    },
    {
      id: "response-custom-controls-lack-name-role-state",
      text: "Custom controls - General",
      issue:
        "There are controls without appropriate name, role, and/or state information. Examples include:\n- ",
      impact:
        "Screen reader users will have difficulty determining the purpose and state of these controls.",
      recommendation:
        "Ensure custom controls provide proper textual name, role, and state information. Properly structured native controls provide this information automatically. For custom controls, developers must explicitly add this information by using ARIA attributes.\n\nMost modern browsers have an Accessibility section in the developer tools panel that will display an element's calculated name, role, and state information.\n\nA control's name must represent the general purpose of the control and include any visible labeling text. It can be set through a variety of methods. Custom controls typically use the aria-label attribute or the aria-labelledby attribute to supply the name.\n\nA control's role indicates the type of control, such as \"checkbox\" or \"button\". For custom controls, the role must be set with the role attribute. The ARIA specification only permits certain values for this attribute. Additionally, the ARIA in HTML specification prevents the use of certain roles on some elements. For a list of HTML elements and their permitted roles, see the ARIA in HTML specification: https://www.w3.org/TR/html-aria/#docconformance\n\nA control's state indicates several possible pieces of information. Common states include expanded, current, selected, checked, and disabled. Most are indicated with similarly named ARIA attributes. Certain states can only be used with certain roles. For a list of roles and their allowed states, see the ARIA specification: https://www.w3.org/TR/wai-aria/#role_definitions\n\nThe Web Accessibility Initiative (WAI) of the W3C publishes suggested patterns for custom controls in the WAI-ARIA Authoring Practices: https://www.w3.org/WAI/ARIA/apg/ These patterns are not tested or endorsed by the W3C, but they often serve as good starting points for developing custom controls.",
      compliantExample: "",
      keepElement: true,
      keepAttribute: true,
      bps: [602],
    },
    {
      id: "response-custom-controls-accordion",
      text: "Custom controls - Accordion",
      issue:
        "There are accordions without appropriate role and/or state information. Examples include:\n- ",
      impact:
        "Screen reader users will be unable to determine that these controls expand and collapse content. They will also have difficulty determining whether the controls are currently expanded or collapsed.",
      recommendation:
        'Ensure custom controls provide proper textual name, role, and state information.\n\nFor accordions, the following information is expected:\n- Each accordion header must be enclosed in a <button> element.\n- Each of these buttons must be enclosed in a heading element of an appropriate level. The <button> element must be the only child of this heading element.\n- When the panel is visible, the header button must have aria-expanded="true". When it is hidden, the header button must have aria-expanded="false".\n- The button must have aria-controls set to the ID of the panel container.\n- If a panel is visible and locked in the expanded state, its header button must have aria-disabled="true".',
      compliantExample: "",
      keepElement: true,
      keepAttribute: true,
      bps: [602],
    },
    {
      id: "response-custom-controls-breadcrumbs",
      text: "Custom controls - Breadcrumbs",
      issue:
        "There are breadcrumb navigation controls without appropriate name, role, and/or state information. Examples include:\n- ",
      impact:
        "Screen reader users will have difficulty determining that this is a breadcrumb navigation and their current position within the breadcrumb.",
      recommendation:
        'Ensure custom controls provide proper textual name, role, and state information.\n\nFor breadcrumbs, the following information is expected:\n- The breadcrumb links must be contained in a <nav> element.\n- The <nav> element must have an accessible name provided by an aria-label or aria-labelledby attribute.\n- The link to the current page, if any, must have aria-current="true".',
      compliantExample: "",
      keepElement: true,
      keepAttribute: true,
      bps: [602],
    },
    {
      id: "response-custom-controls-buttons",
      text: "Custom controls - Buttons",
      issue:
        "There are buttons without appropriate role information. Examples include:\n- ",
      impact:
        "Screen reader users will be unable to determine that this content is interactive.",
      recommendation:
        'Ensure custom controls provide proper textual name, role, and state information.\n\nThe best way to do this is to use native controls, as they come with this information built in. In this case, <button> elements would be most appropriate.\n\nIf conversion to native buttons is not possible, developers must add role="button" to these controls. If the buttons have insufficient internal text, developers must add an aria-label attribute or an aria-labelledby attribute to provide a name.',
      compliantExample: "",
      keepElement: true,
      keepAttribute: true,
      bps: [602],
    },
    {
      id: "response-custom-controls-checkboxes",
      text: "Custom controls - Checkboxes",
      issue:
        "There are checkboxes without appropriate name, role, and/or state information. Examples include:\n- ",
      impact:
        "Screen reader users will be unable to determine that these controls can be checked or unchecked. They will also be unable to review which options they have chosen.",
      recommendation:
        'Ensure custom controls provide proper textual name, role, and state information.\n\nThe best way to do this is to use native controls, as they come with this information built in. In this case, <input type="checkbox"> elements would be most appropriate.\n\nDevelopers can often achieve the same visual appearance using progressively enhanced CSS. Alternatively, they can visually hide the checkboxes with opacity: 0 and use SVGs to fake their appearance.\n\nIf conversion to native checkboxes is not possible, the following information is expected:\n- The element functioning as the checkbox must have role="checkbox".\n- This checkbox element must have a label provided by internal text, aria-label, or aria-labelledby.\n- When checked, the checkbox element must have aria-checked="true", and when not checked, it must have aria-checked="false". If partially checked, it must have aria-checked="mixed".\n- Checkboxes in a logical group must be children of an element with role="group". That element must have aria-labelledby set to the ID of text labelling the group.',
      compliantExample: "",
      keepElement: true,
      keepAttribute: true,
      bps: [602],
    },
    {
      id: "response-custom-controls-comboboxes",
      text: "Custom controls - Comboboxes",
      issue:
        "There are comboboxes without appropriate name, role, and/or state information. Examples include:\n- ",
      impact:
        "Screen reader users will be unable to determine that a list of options are present. They will also be prevented from reviewing any options they have chosen.",
      recommendation:
        'Ensure custom controls provide proper textual name, role, and state information.\n\nFor comboboxes, the following information is expected:\n- The element that receives input and displays the value must have role="combobox".\n- The combobox must have aria-controls set to the ID of its suggestion popup.\n- The popup container must have role="listbox", "tree", "grid", or "dialog" depending on its function and include all other necessary ARIA properties for its role.\n- For tree, grid, and dialog popups, the combobox element must have aria-haspopup="grid", "tree", or "dialog" as appropriate.\n- When the popup is shown, the combobox element must have aria-expanded="true". Otherwise, it must be set to "false".\n- For listbox, grid, or tree popups, when a descendant element is visually focused, the actual keyboard focus must remain on the combobox and the combobox must have aria-activedescendant set to the ID of the visually focused element.\n- For listbox, grid, or tree popups, when a suggested value is visually selected, that value\'s element must have aria-selected="true".\n- The combobox element must have a label provided by a <label> with its for attribute set to the combobox ID, aria-label, or aria-labelledby.\n- The combobox must have aria-autocomplete set to an appropriate value. Use "none" if the suggestions are always the same, regardless of text entered. Use "list" if the suggestions change based on what is typed. Use "both" if the suggestions change based on what is typed and a suggested completion string is shown after the input text.',
      compliantExample: "",
      keepElement: true,
      keepAttribute: true,
      bps: [602],
    },
    {
      id: "response-custom-controls-links",
      text: "Custom controls - Links",
      issue:
        "There are links without appropriate role information. Examples include:\n- ",
      impact:
        "Screen reader users will be unable to determine that these controls navigate to new pages.",
      recommendation:
        'Ensure custom controls provide proper textual name, role, and state information.\n\nThe best way to do this is to use native controls, as they come with this information built in. In this case, an <a> element with a non-null href would be most appropriate for these controls. An href is required because <a> elements without href attributes are not always considered links by assistive technology. If necessary, developers can set the href to "#" or "javascript:void(0);".\n\nIf using <a> elements is not possible, the links must be given role="link". If the links have insufficient internal text, developers must add an aria-label attribute or an aria-labelledby attribute to provide a name.',
      compliantExample: "",
      keepElement: true,
      keepAttribute: true,
      bps: [602],
    },
    {
      id: "response-custom-controls-selects",
      text: "Custom controls - Selects",
      issue:
        "There are custom select controls without appropriate name, role, and/or state information. Examples include:\n- ",
      impact:
        "Screen reader users will have difficulty determining that a list of options is available for selection and which options they have selected.",
      recommendation:
        'Ensure custom controls provide proper textual name, role, and state information.\n\nThe best way to do this is to use native controls, as they come with this information built in. In this case, <select> elements would be most appropriate for these controls.\n\nIf conversion to native selects is not possible, the following information is expected:\n- The element that receives input and displays the value must have role="combobox".\n- The combobox element must have aria-controls set to the ID of its listbox.\n- The listbox container must have role="listbox". This element and its descendants must include all other ARIA attributes necessary for its role.\n- When the popup is shown, the combobox element must have aria-expanded="true". Otherwise, it must be set to "false".\n- When a descendant element is visually focused, the actual keyboard focus must remain on the combobox element, and it must have aria-activedescendant set to the ID of the visually focused element.\n- When an option is visually selected, that option element must have aria-selected="true".\n- The combobox element must have a label provided by a <label> with its for attribute set to the combobox ID, aria-label, or aria-labelledby.',
      compliantExample: "",
      keepElement: true,
      keepAttribute: true,
      bps: [602],
    },
    {
      id: "response-custom-controls-radio",
      text: "Custom controls - Radio buttons",
      issue:
        "There are radio buttons without appropriate name, role, and/or state information. Examples include:\n- ",
      impact:
        "Screen reader users will be unable to determine that only one of these controls can be checked or unchecked. They will also be prevented from reviewing which option they have chosen.",
      recommendation:
        'Ensure custom controls provide proper textual name, role, and state information.\n\nThe best way to do this is to use native controls, as they come with this information built in. In this case, <input type="radio"> elements would be most appropriate.\n\nDevelopers can often achieve the same visual appearance using progressively enhanced CSS. Alternatively, they can visually hide the radio buttons with opacity: 0 and use SVGs to fake their appearance.\n\nIf conversion to native radio buttons is not possible, the following information is expected:\n- Radio buttons in the same logical group are children of an element with role="radiogroup".\n- Each radio button element has role="radio".\n- When a radio button is checked, it must have aria-checked="true". Otherwise, it must have aria-checked="false".\n- The radio button must have an accessible name provided by internal text, aria-label, or aria-labelledby.\n- The radiogroup element must have an accessible name set with aria-labelledby or aria-label.',
      compliantExample: "",
      keepElement: true,
      keepAttribute: true,
      bps: [602],
    },
    {
      id: "response-custom-controls-show-hide",
      text: "Custom controls - Show/hide controls",
      issue:
        "There are show/hide controls without appropriate name, role, and/or state information. Examples include:\n- ",
      impact:
        "Screen reader users will be unable to determine that these controls expand and collapse content. They will also have difficulty determining whether a control is currently expanded or collapsed.",
      recommendation:
        'Ensure custom controls provide proper textual name, role, and state information.\n\nFor show/hide controls, the following information is expected:\n- The element that shows and hides a content area must be a <button>.\n- When the content area is visible, the button must have aria-expanded="true". Otherwise, the button must have aria-expanded="false".\n- The button must have an accessible name set with internal text, aria-label, or aria-labelledby.',
      compliantExample: "",
      keepElement: true,
      keepAttribute: true,
      bps: [602],
    },
    {
      id: "response-custom-controls-tooltips",
      text: "Custom controls - Tooltips",
      issue:
        "There are tooltips without corresponding name and/or role information. Examples include:\n- ",
      impact:
        "Screen reader users will be unable to determine that these tooltips are present.",
      recommendation:
        'Ensure custom controls provide proper textual name, role, and state information.\n\nFor tooltips, the following information is expected:\n- The control that opens the tooltip must have aria-describedby set to the ID of the tooltip element.\n- The tooltip element must have role="tooltip".',
      compliantExample: "",
      keepElement: true,
      keepAttribute: true,
      bps: [602],
    },
    {
      id: "response-custom-controls-toggletips",
      text: "Custom controls - Toggletips",
      issue:
        "There are toggletips without corresponding name and role information. Examples include:\n- ",
      impact:
        "Screen reader users will be prevented from accessing the tooltip's text and will have difficulty determining the purpose of the control.",
      recommendation:
        'Ensure custom controls provide proper textual name, role, and state information.\n\nIn this case, these elements function as "toggletips". A toggletip is any button that only exists to show a tooltip. Common examples include question mark buttons and information buttons. Although toggletips are similar to tooltips, they require different accessibility information.\n\nThe expected structure is as follows:\n- The control that opens the tooltip must be a <button>.\n- The button must have an accessible name set through internal text, aria-label, or aria-labelledby.\n- The tooltip container element must be available on page load, but it can be visually hidden with a .visually-hidden or .sr-only CSS class.\n- This tooltip container must have role="status".\n- To display the tooltip visually, inject text into this <div role="status"> element. If properly implemented, this will cause screen readers to announce the contents of the tooltip after the next pause in speech.',
      compliantExample: "",
      keepElement: true,
      keepAttribute: true,
      bps: [602],
    },
    {
      id: "response-button-no-name",
      text: "Buttons - No accessible names",
      issue:
        "There are buttons without accessible names. Examples include:\n- ",
      impact:
        "Screen reader users will be unable to determine the purpose of these buttons. Speech input users will have difficulty activating them.",
      recommendation:
        "Ensure custom controls provide proper textual name, role, and state information. The accessible name of a button can be set with internal text, an aria-label attribute, or an aria-labelledby attribute. Good accessible names are both concise and descriptive.",
      compliantExample: "",
      keepElement: true,
      keepAttribute: true,
      bps: [602],
    },
    {
      id: "response-focus-not-moved-to-dialog",
      text: "Focus not moved to dialog",
      issue:
        "There are dialogs that do not receive focus when they appear. Examples include:\n- ",
      impact:
        "Screen reader users and screen magnification users will be unable to determine that these dialogs have appeared unless they review the entire page. Keyboard users will have difficulty navigating into the dialog.",
      recommendation:
        "Ensure content updates define focus updates appropriately. When modal dialogs appear, focus must move to the first focusable element in the dialog. Use the JavaScript focus() method to move keyboard focus to this element.",
      compliantExample: "N/A",
      keepElement: true,
      keepAttribute: true,
      bps: [605],
    },
    {
      id: "response-focus-not-moved-to-top-of-form-error",
      text: "Focus not moved to top-of-form error",
      issue:
        "There are top-of-form errors that do not receive focus when they appear. Examples include:\n- ",
      impact:
        "Screen reader users and screen magnification users will be unable to determine that these errors have appeared unless they review the entire page.",
      recommendation:
        'Ensure content updates define focus updates appropriately. When top-of-form errors appear, focus must move to the container of the error. Set tabindex="-1" on the element, then use the JavaScript focus() method to move keyboard focus to this element.\n\nAlternatively, a properly structured ARIA live region may be used to announce the error when it appears.',
      compliantExample: "N/A",
      keepElement: true,
      keepAttribute: true,
      bps: [605],
    },
    {
      id: "response-focus-not-moved-to-first-error-field",
      text: "Focus not moved to first field in error",
      issue:
        "After submitting a form when inline errors are present, focus does not move to the first field in error.",
      impact:
        "Screen reader users and screen magnification users will be unable to determine that these errors have appeared unless they review the entire page.",
      recommendation:
        "Ensure content updates define focus updates appropriately. When inline errors appear, focus must move to the first field in error and the form field must have aria-describedby set to the ID of the error so that the error is announced when the field is focused.",
      compliantExample: "N/A",
      keepElement: true,
      keepAttribute: true,
      bps: [605],
    },
    {
      id: "response-focus-not-returned-to-trigger",
      text: "Focus not returned to triggering element",
      issue:
        "After closing a dialog, focus does not return to the element that opened the dialog.",
      impact:
        "Screen reader users and screen magnification users may become disoriented. Keyboard users will have to navigate through the contents of the page in order to return to the opening control.",
      recommendation:
        "Ensure content updates define focus updates appropriately. When a dialog is closed, return focus to the control that opened the dialog. Use the JavaScript focus() method to move keyboard focus to this element.",
      compliantExample: "N/A",
      keepElement: true,
      keepAttribute: true,
      bps: [605],
    },
    {
      id: "response-focus-load-more",
      text: "Focus not updated with load more controls",
      issue:
        "After activating a load more control, focus does not move to the newly revealed content.",
      impact:
        "Screen reader users and screen magnification users may become disoriented. Keyboard users will have to navigate backwards through the page to locate the newly revealed content.",
      recommendation:
        "Ensure content updates define focus updates appropriately. When new content appears after activating a load more control, keyboard focus must move to the newly revealed content. Use the JavaScript focus() method to move keyboard focus to the first focusable element in the newly revealed content.",
      compliantExample: "N/A",
      keepElement: true,
      keepAttribute: true,
      bps: [605],
    },
    {
      id: "response-inline-unassociated-errors",
      text: "Unassociated inline errors",
      issue:
        "There are inline errors that are not programmatically associated with their corresponding fields. Examples include:\n- ",
      impact:
        "Screen reader users will have difficulty determining which fields are in error and which errors correspond with which field.",
      recommendation:
        "Ensure form field constraints and errors are associated with their corresponding field.\n\nFor most form controls, the best way to associate the error is to use an aria-describedby attribute on the field set to the ID of the corresponding error.\n\nFor groups of form controls like radio buttons and checkboxes, it is best to include the error text inside the element that labels the group (such as a <legend>).",
      compliantExample: "",
      keepElement: true,
      keepAttribute: true,
      bps: [609],
    },
    {
      id: "response-inline-unassociated-constraints",
      text: "Unassociated constraints",
      issue:
        "There are constraints that are not programmatically associated with their corresponding fields. Examples include:\n- ",
      impact:
        "Screen reader users will have difficulty determining which constraints correspond with which field.",
      recommendation:
        "Ensure form field constraints and errors are associated with their corresponding field.\n\nFor most form controls, the best way to associate the constraint is to use an aria-describedby attribute on the field set to the ID of the corresponding constraint.\n\nFor groups of form controls like radio buttons and checkboxes, it is best to include the constraint text inside the element that labels the group (such as a <legend>).",
      compliantExample: "",
      keepElement: true,
      keepAttribute: true,
      bps: [609],
    },
    {
      id: "response-pdf-implicit-table-header",
      text: "Implicit table header",
      issue:
        "There are table headers that do not use TH tags. Examples include:\n- ",
      impact:
        "Screen reader users will not understand the relationships between cells in these tables.",
      recommendation:
        'Ensure table headers are properly tagged. Table headers must use a TH tag with a Scope attribute set to Row or Column as appropriate.\n\nTo set table headers and scope in Acrobat Pro:\n1. Go to the Accessibility tools pane.\n2. Go to Reading Order.\n3. Open the context menu (right-click) on the table with the header and select Table Editor.\n4. Open the context menu on the header and select Table Cell Properties. (You can set this information for multiple cells at once by holding down Shift while selecting a table cell, then selecting Table Cell Properties.)\n5. Check the Header Cell radio button.\n6. Select an appropriate value in the Scope field. Use "Column" if this cell names a column or "Row" if this cell names a row.\n7. Select OK and save the document.',
      compliantExample: "",
      keepElement: true,
      keepAttribute: true,
      bps: [624],
    },
    {
      id: "response-pdf-table-span",
      text: "Merged row and column headers",
      issue:
        "There are table headers that span multiple rows/columns do not have values set for the Row Span/Column Span attributes",
      impact:
        "Screen reader users will not be able to determine the relationships between cells in these tables.",
      recommendation:
        'Ensure merged row and column header cells define ColSpan or RowSpan attributes. These attributes should be set to the number of columns or rows the cell covers, respectively.\n\nTo set row span and column span in Acrobat Pro:\n1. Open the Order panel from the left-hand navigation pane.\n2. Open the Options menu and select "Show reading order panel".\n3. Open the context menu (right-click) on the target table tag and select "Table Editor".\n4. Open the context menu on the target cell and select "Table Cell Properties".\n5. Enter the correct numbers in the Row Span and Column Span fields.\n6. Press OK and save the document.\n7. Repeat for all headers that span multiple rows/columns.\n',
      compliantExample: "",
      keepElement: true,
      keepAttribute: true,
      bps: [626],
    },
    {
      id: "response-pdf-document-lang",
      text: "Missing or incorrect document language",
      issue: "The language of the document is unspecified or incorrect.",
      impact:
        "Screen readers will use inappropriate pronunciation when announcing the text of the document.",
      recommendation:
        "Ensure the document specifies a language. \nAll documents must have a language set to a valid BCP 47 language subtag: https://r12a.github.io/app-subtags/\n\nTo alter the language of a document in Acrobat Pro:\n1. Navigate to the File menu.\n2. Choose Properties.\n3. Navigate to the Advanced tab.\n4. In the Language field, enter the appropriate code in the Language field. Some languages may be selected from the field without needing to enter a code.",
      compliantExample: "",
      keepElement: true,
      keepAttribute: true,
      bps: [631],
    },
    {
      id: "response-pdf-heading-level",
      text: "Headings with improper levels",
      issue:
        "There are headings with levels that do not match their visual level on the document. Examples include:\n- ",
      impact:
        "Screen reader users will have difficulty efficiently navigating and gaining an accurate overview of the document.",
      recommendation:
        'Ensure heading elements are properly ordered. The level of heading tag used (H1, H2, etc.) must reflect its visual appearance in the hierarchy of the document.\n\nTo change the level of a heading tag in Acrobat Pro:\n1. Open the Tags panel.\n2. Select the tag of the text.\n3. Open the context menu (right-click) on the tag and choose "Properties…"\n4. In the "Type" field, choose an option from "Heading Level 1" through "Heading Level 6" as appropriate. (Do not choose just "Heading".)',
      compliantExample: "",
      keepElement: true,
      keepAttribute: true,
      bps: [633],
    },
    {
      id: "response-pdf-implicit-headings",
      text: "Implicit headings",
      issue:
        "There is content that functions as a heading but does not use heading tags. Examples include:\n- ",
      impact:
        "Screen reader users will have difficulty efficiently navigating and gaining an accurate overview of the document.",
      recommendation:
        'Ensure headings are denoted through structure and not implicitly. Text that visually appears as a heading for a section of content must use H1, H2, etc. tags. Additionally, ensure the level of the heading accurately reflects the tag\'s position in the visual hierarchy.\n\nTo change a tag to a heading tag in Acrobat Pro:\n1. Open the Tags panel.\n2. Select the tag of the text.\n3. Open the context menu (right-click) on the tag and choose "Properties…"\n4. In the "Type" field, choose an option from "Heading Level 1" through "Heading Level 6" as appropriate. (Do not choose just "Heading".)',
      compliantExample: "",
      keepElement: true,
      keepAttribute: true,
      bps: [634],
    },
    {
      id: "response-pdf-decorative-with-alt",
      text: "Decorative image with text equivalent",
      issue:
        "There are decorative images with textual equivalents. Examples include:\n- ",
      impact:
        "Screen reader users will receive unnecessary and potentially confusing information.",
      recommendation:
        'Ensure alternative text for images is meaningful. Non-meaningful images must be marked as decorative, which causes screen readers to ignore them.\n\nTo mark an image as decorative in Acrobat Pro:\n1. Open the Tags panel.\n2. Navigate to the Figure tag that contains the Image container of the image you want to mark as decorative.\n3. Open the context menu on the image container (not the Figure tag) and choose "Change Tag to Artifact...".\n4. In the dialog that appears, press OK.\n5. Delete the now-empty Figure tag with the Delete key or by opening the context menu and choosing Delete Tag.',
      compliantExample: "",
      keepElement: true,
      keepAttribute: true,
      bps: [638],
    },
    {
      id: "response-pdf-meaningful-with-bad-alt",
      text: "Meaningful image with non-descriptive text equivalent",
      issue:
        "There are images with insufficiently descriptive textual equivalents. Examples include:\n- ",
      impact:
        "Screen reader users will not receive an accurate impression of the contents of these images.",
      recommendation:
        'Ensure alternative text for images is meaningful. Textual equivalents must be both concise and descriptive.\n\nTo alter alternative text in Acrobat Pro:\n1. Open the Tags panel.\n2. Open the context menu (right-click) on the tag containing the image and select Properties.\n3. If the tag is not already a Figure tag, choose "Figure" from the Type field.\n4. Enter a value in the Alternate Text field.\n5. Activate Close and save the document.',
      compliantExample: "",
      keepElement: true,
      keepAttribute: true,
      bps: [638],
    },
    {
      id: "response-pdf-list-structure",
      text: "List structure",
      issue:
        "There is content that appears as a list but does not use list tags. Examples include:\n- ",
      impact:
        "Screen reader users will have difficulty understanding that this content is a list.",
      recommendation:
        "Ensure list items are structured properly. Lists must use L, LI, Lbl, and LBody tags as appropriate. The L tag must enclose all elements in the visual list, even if they are on different pages. Each separate list item should be an LI child of this L tag. All text of the list item must be included in an LBody child of the LI tag. Optionally, bullets and numbers can be separated into an Lbl tag as a sibling of the LBody. Nested child lists should be a child of the parent LI tag.",
      compliantExample: "",
      keepElement: true,
      keepAttribute: true,
      bps: [649],
    },
    {
      id: "response-pdf-toc-missing",
      text: "Missing TOC",
      issue:
        "The document is 20 pages or longer but does not provide a linked table of contents.",
      impact:
        "Keyboard users will have difficulty efficiently navigating the document.",
      recommendation:
        "Provide a linked table of contents in lengthy documents. A document is considered lengthy if it is greater than 20 pages.",
      compliantExample: "",
      keepElement: true,
      keepAttribute: true,
      bps: [650],
    },
    {
      id: "response-pdf-missing-bookmarks",
      text: "Missing bookmarks",
      issue:
        "The document is 20 pages or longer but does not provide bookmarks.",
      impact:
        "Keyboard users will have difficulty efficiently navigating the document.",
      recommendation:
        'Ensure that lengthy documents provide bookmarks. A document is considered lengthy if it is greater than 20 pages. Each bookmark should be named after a heading and should closely mirror the structure of the table of contents.\n\nTo add bookmarks automatically based on heading structure in Acrobat Pro:\n1. Open the Bookmarks panel.\n2. From the Options menu, select "New Bookmarks from Structure."\n3. Select the tags you would like to create bookmarks from. In most cases, H1-H3 tags are appropriate.\n4. In the Bookmarks panel, edit the bookmarks as desired.',
      compliantExample: "",
      keepElement: true,
      keepAttribute: true,
      bps: [651],
    },
    {
      id: "response-pdf-reading-order",
      text: "Reading order",
      issue: "The following reading order is illogical:\n1.",
      impact: "Screen reader users will be unable to understand this content.",
      recommendation:
        "Ensure that document content is rendered in the proper order. Rearrange the tags of the document to reflect the visual reading order.",
      compliantExample: "",
      keepElement: true,
      keepAttribute: true,
      bps: [652],
    },
    {
      id: "response-pdf-text-contrast-insufficient",
      text: "Text contrast insufficient",
      issue:
        "There is text that does not meet the required minimum color contrast ratio with its background.\n\nForeground color: \nBackground color: \nContrast ratio: \nRequired contrast ratio for this content: \n\nExamples of text with this contrast ratio include:\n- ",
      impact:
        "Users with low vision will have difficulty reading this content.",
      recommendation:
        "Ensure text and images of text provide sufficient contrast. The following contrast ratios are required:\n\n- Text smaller than 18 pt (24 px), or smaller than 14 pt (19 px) if bold, must have a color contrast ratio of 4.50:1 or more with adjacent colors.\n\n- Text 18 pt (24 px) or larger, or 14 pt (19 px) or larger if bold, must have a color contrast ratio of 3.00:1 or more with adjacent colors.\n\nDisabled controls that do not accept user interaction are exempt from this requirement.\n\nRefer to the Accessible Color Picker extension or Color Contrast Checker site for assistance: https://www.accessibility.dev/",
      compliantExample: "N/A",
      keepElement: true,
      keepAttribute: true,
      bps: [653],
    },
    {
      id: "response-pdf-text-on-image-contrast",
      text: "Text on image contrast",
      issue:
        "There is text on an image background that does not meet the required minimum color contrast ratio.\n\nForeground color: \nBackground color: \nContrast ratio: \nRequired contrast ratio for this content: \n\nExamples of insufficiently contrasting text in front of images include:\n- ",
      impact:
        "Users with low vision will have difficulty reading this content.",
      recommendation:
        "Ensure text and images of text provide sufficient contrast.\n\nFor text in front of images, the best way to meet contrast requirements is to use a solid, opaque background behind the text. Alternatively, provide a transparent colored background that ensures all parts of the background image provide sufficient contrast with the text.\n\nThe following contrast ratios are required:\n\n- Text smaller than 18 pt (24 px), or smaller than 14 pt (19 px) if bold, must have a color contrast ratio of 4.50:1 or more with adjacent colors.\n\n- Text 18 pt (24 px) or larger, or 14 pt (19 px) or larger if bold, must have a color contrast ratio of 3.00:1 or more with adjacent colors.\n\nDisabled controls that do not accept user interaction are exempt from this requirement.\n\nRefer to the Accessible Color Picker extension or Color Contrast Checker site for assistance: https://www.accessibility.dev/",
      compliantExample: "N/A",
      keepElement: true,
      keepAttribute: true,
      bps: [653],
    },
    {
      id: "response-pdf-header-footer",
      text: "Header/footer content",
      issue:
        "There is repeated header/footer content that is not marked as an artifact. Examples include:\n- ",
      impact:
        "Screen readers will read this header/footer text in the middle of a paragraph, causing confusion for users.",
      recommendation:
        "Ensure non-distinct header and footer content are labeled as artifacts. Header content should be marked as an artifact on all but the first page it appears, and footer content should be marked as an artifact on all but the last page it appears.\n\nTo mark content as an artifact in Acrobat Pro:\n1. Open the Order Panel.\n2. Open the Options menu and select Show reading order panel.\n3. Select the tag to be marked as an artifact.\n4. Activate Background/Artifact.\n5. Activate Close and save the document.",
      compliantExample: "",
      keepElement: true,
      keepAttribute: true,
      bps: [655],
    },
    {
      id: "response-pdf-unnecessary-headings",
      text: "Unnecessary headings",
      issue:
        "There is content that uses heading tags but does not function as a heading. Examples include:\n- ",
      impact:
        "Screen reader users will have difficulty efficiently navigating and gaining an accurate overview of the document.",
      recommendation:
        'Avoid unnecessary use of heading elements. Only text that functions as a heading can use heading tags. Convert this content to a Div or Span tag.\n\nTo change the tag in Acrobat Pro:\n1. Open the Tags panel.\n2. Select the tag of the text.\n3. Open the context menu (right-click) on the tag and choose "Properties…"\n4. In the "Type" field, choose "Division" or "Span."\n',
      compliantExample: "",
      keepElement: true,
      keepAttribute: true,
      bps: [663],
    },
    {
      id: "response-pdf-untagged",
      text: "Untagged PDF",
      issue: "The document has no tags.",
      impact:
        "Screen reader users will not have reliable access to content within the document.",
      recommendation:
        'Ensure all content is tagged. The best way to provide tags is to enable settings in the source document that export the PDF with tags. If this is not possible, the document must be autotagged. In both cases, tags must be reviewed and edited to ensure they are in the right order and are semantically accurate.\n\nTo autotag a document in Acrobat Pro:\n1. Go to View > Tools > Accessibility.\n2. Activate "Autotag Document."',
      compliantExample: "",
      keepElement: true,
      keepAttribute: true,
      bps: [665],
    },
    {
      id: "response-pdf-untagged-annotations",
      text: "Untagged PDF annotations",
      issue: "There are annotations that are not tagged. Examples include:\n- ",
      impact: "Screen reader users will not have access to this content.",
      recommendation:
        'Ensure all content is tagged, including annotations like forms and links.\n\nTo tag Annotations in Acrobat Pro:\n1. Open the Tags panel and select "Tags".\n2. In the Options menu, select "Find...".\n3. In the dialog that appears, choose "Unmarked Annotations".\n4. Ensure that "Search Document" is checked.\n5. Press "Find".\n6. Press "Tag Element".\n7. In the Type field, choose "Form" if the target item is a form field, "Annotation" if it is a comment, and "Link" if it is a link. Then press OK.\n8. Repeat for all unmarked annotations.',
      compliantExample: "",
      keepElement: true,
      keepAttribute: true,
      bps: [665],
    },
    {
      id: "response-pdf-unassociated-header",
      text: "Unassociated table header",
      issue:
        "There are table headers that are not associated with their corresponding data cells. Examples include:\n- ",
      impact:
        "Screen reader users will not be able to determine the relationships between cells in these tables.",
      recommendation:
        'Ensure data table headers are associated with data cells. All TH tags must have a Scope attribute set to Row or Column depending on whether the particular cell is a row header or a column header.\n\nIf a table is sufficiently complex that this method cannot associate a header with its cell, each cell must have a Headers attribute set to a list of the IDs of the headers associated with the cell. This is often time-consuming and prone to error. Splitting complex tables into separate, simpler tables is strongly recommended.\n\nTo set header scope Acrobat Pro:\n1. Go to the Accessibility tools pane.\n2. Go to Reading Order.\n3. Open the context menu (right-click) on the table with the header and select Table Editor.\n4. Open the context menu on the header and select Table Cell Properties. (You can set this information for multiple cells at once by holding down Shift while selecting a table cell, then selecting Table Cell Properties.)\n5. Check the Header Cell radio button.\n6. Select an appropriate value in the Scope field. Use "Column" if this cell names a column or "Row" if this cell names a row.\n7. Select OK and save the document.',
      compliantExample: "",
      keepElement: true,
      keepAttribute: true,
      bps: [722],
    },
    {
      id: "response-visually-hidden-content-exposed-to-at",
      text: "Visually hidden content exposed to AT",
      issue:
        "There is visually hidden content meant to be hidden from all users, but it can still be accessed by keyboard or screen reader users. Examples include:\n- ",
      impact:
        "Screen reader and keyboard users will be able to access hidden content, such as form fields, text, or links.",
      recommendation:
        'Ensure content that is intended to be hidden from all users is not rendered by assistive technology. The best way to do this is by setting the display CSS property of the element to "none".',
      compliantExample: "N/A",
      keepElement: true,
      keepAttribute: true,
      bps: [733],
    },
    {
      id: "response-dialog-focus-behind",
      text: "Dialogs that allow focus behind them",
      issue:
        "There are modal dialogs that allow keyboard and/or screen reader access to elements behind the dialog. Examples include:\n- ",
      impact:
        "Keyboard and/or screen reader users will have difficulty determining their position in the page. They could also have unintended access to controls behind the dialog.",
      recommendation:
        'Ensure content that is intended to be hidden from all users is not rendered by assistive technology. This includes content behind modal dialogs.\n\nThe best way to prevent access to content behind dialogs is with the "inert" attribute and associated polyfill.\n- Move the dialog element to be a sibling of the element containing the rest of the page content. This makes it easier to control keyboard access to underlying content.\n- Add the following polyfill script to the page: https://github.com/WICG/inert\n- When the dialog is present, add the "inert" attribute to the container of the rest of the site content. When the dialog is absent, remove the inert attribute.',
      compliantExample: "N/A",
      keepElement: true,
      keepAttribute: true,
      bps: [733],
    },
    {
      id: "response-focus-change-on-radio-button-input",
      text: "Focus change on radio button input",
      issue:
        "There are radio buttons that trigger focus or context changes upon selection. Examples include:\n- ",
      impact:
        "Screen reader and keyboard users will be unable to select the option they want after focus or context updates occur.",
      recommendation:
        "Avoid using event handlers that trigger focus or context changes on user input. Instead of moving focus or changing context when a radio button is selected, add a submission button for the change. Other alternatives include applying the change when the entire group of radio buttons loses focus or warning the user of this behavior in visible text before the controls.",
      compliantExample: "",
      keepElement: true,
      keepAttribute: true,
      bps: [794],
    },
    {
      id: "response-focus-change-on-select-input",
      text: "Focus change on select input",
      issue:
        "There are select controls that trigger focus or context changes upon selection. Examples include:\n- ",
      impact:
        "Screen reader and keyboard users will be unable to select the option they want after focus or context updates occur.",
      recommendation:
        "Avoid using event handlers that trigger focus or context changes on user input. Instead of moving focus or changing context when a select's option is selected, add a submission button for the change. Other alternatives include applying the change when the select loses focus or warning the user of this behavior in visible text before the control.",
      compliantExample: "",
      keepElement: true,
      keepAttribute: true,
      bps: [794],
    },
    {
      id: "response-focus-change-on-input",
      text: "Focus change on text field input",
      issue:
        "There are text fields that trigger focus or context changes after text is entered. Examples include:\n- ",
      impact:
        "Screen reader users and keyboard users will have difficulty reviewing the contents of these fields",
      recommendation:
        "Avoid using event handlers that trigger focus or context changes on user input. Instead of moving focus or changing context when text is entered, add a submission button for the change. Other alternatives include applying the change when the field loses focus or warning the user of this behavior in visible text before the field.",
      compliantExample: "",
      keepElement: true,
      keepAttribute: true,
      bps: [794],
    },
    {
      id: "response-focus-order-not-meaningful",
      text: "Focus order not meaningful",
      issue: "The following focus order is illogical:\n1. ",
      impact:
        "Screen reader users and keyboard users will have difficulty efficiently navigating the site.",
      recommendation:
        "Ensure the focus order of interactive elements on the page is logical. The best way to set the focus order is to reorder the elements in the DOM.",
      compliantExample: "",
      keepElement: true,
      keepAttribute: true,
      bps: [796],
    },
    {
      id: "response-focus-is-shifted-on-focus",
      text: "Focus is shifted on focus",
      issue:
        "There are elements that trigger a focus or context change as soon as they receive focus. Examples include:\n- ",
      impact:
        "Screen reader users and keyboard users will lose their spot on the page and may be prevented from accessing the information they intended.",
      recommendation:
        "Avoid forced focus changes that are not user-initiated. Do not shift focus after a control receives focus except when immediate user interaction is needed (such as time-based alerts).",
      compliantExample: "",
      keepElement: true,
      keepAttribute: true,
      bps: [801],
    },
    {
      id: "response-radio-buttons-not-grouped",
      text: "Radio buttons with different name attributes",
      issue:
        "There are grouped radio buttons that do not have their name attributes set to the same value. Examples include:\n- ",
      impact:
        "Screen reader users will have difficulty understanding the relationship between these form controls.",
      recommendation:
        "Ensure radio button groups are properly formed. Radio buttons in a logical group must all have their name attribute set to the same value.",
      compliantExample: "",
      keepElement: true,
      keepAttribute: true,
      bps: [802],
    },
    {
      id: "response-pdf-link-objr",
      text: "Link structure",
      issue:
        "There are links that are not structured as <Link> tags with a Link - OBJR child. Examples include:\n- ",
      impact:
        "Keyboard users will be prevented from accessing this link. Screen reader users will be unable to determine that it is a link.",
      recommendation:
        'Ensure links are tagged structurally as links with a Link OBJR tag. The Link - OBJR tag should open the link URL.\n\nTo add a link in Acrobat Pro:\n1. Open the Order panel and select Show reading order panel from the Options menu. \n2. Draw a rectangle around the text you intend to turn into a link and select Text/Paragraph.\n3. Locate the newly created object with the text of the URL in the Tags panel. \n4. Create a new Link tag as a sibling to this text and relocate the text inside of the Link tag. \n5.  Finally, go to Tools > Edit PDF > Link > Add/Edit Web or Document Link.\n6. Draw a rectangle that encompasses all lines of content that contain the target link, even if those lines contain content unrelated to the link. \n7. Choose "Invisible Rectangle" in the Link Type field, select Open a web page from the Link Action radio button list, then select Next. \n8. In the Enter a URL for this link field, enter the URL of the link as it is written. \n9. Next, open the Tags panel and select Find... from the Options menu. \n10. Choose Unmarked Links from the Find field, and select the Search Document radio button, then press Find until the newly created link is highlighted. \n11. Choose "Tag Element". Open the Tags panel and locate the Link tag that contains the text of the link and ensure that the Link - OBJR tag has been moved there; if not, relocate the newly created Link - OBJR tag into that Link tag.',
      compliantExample: "",
      keepElement: true,
      keepAttribute: true,
      bps: [807],
    },
    {
      id: "response-css-images-missing-text-equivalent",
      text: "CSS images missing text equivalent",
      issue:
        "There are meaningful CSS background images with no textual equivalents. Examples include:\n- ",
      impact:
        "Screen reader users will be unable to determine what these images represent.",
      recommendation:
        'Ensure CSS background images that convey meaning have textual and visible equivalents.\n\nThe best way to do this is to use a real <img> or SVG element. To provide a textual equivalent for an <img> element, add an alt attribute set to the desired text. To provide a textual equivalent for an SVG, add role="img" to the <svg> element and add an aria-label attribute set to the desired text.',
      compliantExample: "",
      keepElement: true,
      keepAttribute: true,
      bps: [808],
    },
    {
      id: "response-reading-order-not-meaningful",
      text: "Reading order not meaningful",
      issue: "The following reading order is illogical:\n1. ",
      impact: "Screen reader users will be unable to understand this content.",
      recommendation:
        "Ensure that the reading order of content is logical. The best way to set the reading order is to reorder the elements in the DOM.",
      compliantExample: "",
      keepElement: true,
      keepAttribute: true,
      bps: [809],
    },
    {
      id: "response-dialog-lacks-boundaries",
      text: "Dialog without proper role and state",
      issue:
        "There are dialogs without appropriate name and/or role information. Examples include:\n- ",
      impact:
        "Screen reader users will be unable to determine where the dialog ends and begins. They will also have difficulty determining the purpose of the dialog.",
      recommendation:
        'Ensure dialogs use proper structure. Dialog containers must have role="dialog". If the dialog has a visible title, set aria-labelledby on the dialog container to the ID of the visible title. For dialogs without a visible title, set a descriptive aria-label on the dialog element.',
      compliantExample: "",
      keepElement: true,
      keepAttribute: true,
      bps: [886],
    },
    {
      id: "response-pdf-decorative-not-hidden",
      text: "Decorative image not hidden from screen readers",
      issue:
        "There are images that serve a decorative purpose but are exposed to screen readers. Examples include:\n- ",
      impact:
        'Screen readers may announce images with no accessible name by number or as simply "graphic." This gives screen reader users irrelevant and confusing information.',
      recommendation:
        'Provide alternative text for images. Non-meaningful images must be marked as decorative, which causes screen readers to ignore them.\n\nTo mark an image as decorative in Acrobat Pro:\n1. Open the Tags panel.\n2. Navigate to the Figure tag that contains the Image container of the image you want to mark as decorative.\n3. Open the context menu on the image container (not the Figure tag) and choose "Change Tag to Artifact...".\n4. In the dialog that appears, press OK.\n5. Delete the now-empty Figure tag with the Delete key or by opening the context menu and choosing Delete Tag.',
      compliantExample: "",
      keepElement: true,
      keepAttribute: true,
      bps: [897],
    },
    {
      id: "response-pdf-meaningful-image-without-alt",
      text: "Meaningful image without textual equivalent",
      issue:
        "There are meaningful images without a textual equivalent. Examples include:\n- ",
      impact:
        "Screen reader users will be unable to determine what these images represent.",
      recommendation:
        'Provide alternative text for images. Meaningful images must have a concise but descriptive textual equivalent.\n\nTo add alternative text in Acrobat Pro:\n1. Open the Tags panel.\n2. Open the context menu (right-click) on the tag containing the image and select Properties.\n3. If the tag is not already a Figure tag, choose "Figure" from the Type field.\n4. Enter a value in the Alternate Text field.\n5. Activate Close and save the document.',
      compliantExample: "",
      keepElement: true,
      keepAttribute: true,
      bps: [897],
    },
    {
      id: "response-pdf-implicit-data-table",
      text: "Implicit data table",
      issue:
        "There are data tables that do not use table tags. Examples include:\n- ",
      impact:
        "Screen reader users will not be able to determine the relationships between cells in these tables.",
      recommendation:
        "Ensure data tables are formatted using table elements. Table tags include Table, TR, TH, and TD. The tag structure should match the semantic structure that is conveyed visually.\n- The entire table should be wrapped in a Table tag. The only children that a Table tag may have are TR tags and one Caption tag.\n- Each row of the table should be contained in a TR tag. This tag should be a child of the Table tag. The only children that a TR tag can have are TH and/or TD cells.\n- Each header of the table should be contained in a TH tag with a Scope attribute set to Row or Column as appropriate. These tags should be children of the appropriate TR tag.\n- Each data cell of the table should be contained in a TD tag. These tags should be children of the appropriate <TR> Tag.",
      compliantExample: "",
      keepElement: true,
      keepAttribute: true,
      bps: [899],
    },
    {
      id: "response-pdf-toc-structure",
      text: "Improper TOC structure",
      issue: "The table of contents is not appropriately tagged.",
      impact:
        "Screen reader users will have difficulty efficiently navigating the document.",
      recommendation:
        "Ensure table of contents lists are structured properly. Tables of contents must be enclosed in one <TOC> tag. Each line of the TOC is must enclosed in a <TOCI> tag within the parent <TOC> tag.",
      compliantExample: "",
      keepElement: true,
      keepAttribute: true,
      bps: [930],
    },
    {
      id: "response-pdf-inline-lang",
      text: "Missing or incorrect inline language",
      issue:
        "There is text in a different language from the rest of the document, but the language of this text is unspecified. Examples include:\n- ",
      impact:
        "Screen readers will use inappropriate pronunciation when announcing this text.",
      recommendation:
        "Ensure changes in natural language are identified in-line. Tags containing text in a different language from the overall document must have a Lang attribute set to a valid BCP 47 primary language subtag: https://r12a.github.io/app-subtags/\n\nTo alter a tag's language in Acrobat Pro:\n1. Open the Tags panel.\n2. Open the context menu on the tag that contains the content and select Properties.\n3. In the Language field, enter the appropriate code in the Language field. Some languages may be selected from the field without needing to enter a code.",
      compliantExample: "",
      keepElement: true,
      keepAttribute: true,
      bps: [931],
    },
    {
      id: "response-pdf-font-attributes",
      text: "Font attributes",
      issue:
        "There is underlined, overlined, or stricken text content that does not have an appropriate value for the TextDecorationType attribute. Examples include:\n- ",
      impact:
        "Screen reader users will be unaware of the presence of this styling.",
      recommendation:
        'Ensure font attributes are properly indicated through attributes objects. When text decoration lines are used to convey meaning, ensure that the tag enclosing the content has a TextDecorationType attribute set to "Underline," "Overline," or "LineThrough" as appropriate.\n\nTo add a font attribute in Acrobat Pro:\n1. Open the Tags panel.\n2. Open the context menu on tag containing the target text and select "Properties."\n3. Activate "Edit Attribute Objects…"\n4. Activate "New Item."\n5. Focus the /Attribute Object that was created and activate "New Item" again.\n6. In the Key field, enter "TextDecorationType."\n7. In the Value field, enter the appropriate value mentioned above.\n8. Select "String" from the "Value Type" field.\n9. Activate "OK," close all dialogs, and save the document.',
      compliantExample: "",
      keepElement: true,
      keepAttribute: true,
      bps: [931],
    },
    {
      id: "response-table-headers-empty",
      text: "Table headers empty",
      issue: "There are empty table headers. Examples include:\n- ",
      impact:
        "Screen reader users will be unable to understand the purpose of their associated columns or rows.",
      recommendation:
        "Ensure data table headers cells are not blank. The best way to resolve this issue is to add visual text to the table header. Alternatively, this text can be hidden with a .visually-hidden or .sr-only CSS class.",
      compliantExample: "",
      keepElement: true,
      keepAttribute: true,
      bps: [941],
    },
    {
      id: "response-controls-screen-reader-keyboard",
      text: "Controls cannot be used with keyboard while screen reader running",
      issue:
        "There are interactive controls that cannot be navigated to and/or operated with the keyboard alone while a screen reader is running. Examples include:\n- ",
      impact:
        "Screen reader users will be prevented from accessing the functionality provided by these controls.",
      recommendation:
        "Ensure custom controls are keyboard accessible. Users must be able to navigate to and operate controls while a screen reader is running.",
      compliantExample: "",
      keepElement: true,
      keepAttribute: true,
      bps: [954],
    },
    {
      id: "response-captcha-no-visual-challenge",
      text: "CAPTCHA with no visual challenge",
      issue: "The CAPTCHA only provides an audio challenge.",
      impact:
        "Deaf and hard of hearing users will be prevented from completing the CAPTCHA.",
      recommendation:
        "Ensure CAPTCHAs are accessible both visually and audibly. Add an alternative visual challenge to the CAPTCHA.",
      compliantExample: "",
      keepElement: true,
      keepAttribute: true,
      bps: [963],
    },
    {
      id: "response-captcha-no-audio-challenge",
      text: "CAPTCHA with no audio challenge",
      issue: "The CAPTCHA only provides a visual challenge.",
      impact:
        "Users who are blind or have low vision will be prevented from completing the CAPTCHA.",
      recommendation:
        "Ensure CAPTCHAs are accessible both visually and audibly. Add an alternative audio challenge to the CAPTCHA.",
      compliantExample: "",
      keepElement: true,
      keepAttribute: true,
      bps: [963],
    },
    {
      id: "response-form-and-link-improperly-nested",
      text: "Form and link improperly nested",
      issue:
        "There are link and form elements that are improperly nested within one another. Examples include:\n- ",
      impact: "Assistive technologies may be unable to parse this content.",
      recommendation:
        "Avoid improper nesting of form elements and links. For example, <button> elements must not be nested in <a> elements. To detect many of these errors automatically, use the Nu Html Checker: https://validator.w3.org/nu/",
      compliantExample: "",
      keepElement: true,
      keepAttribute: true,
      bps: [967],
    },
    {
      id: "response-live-region-needed",
      text: "Live region needed",
      issue:
        "There are dynamically changing content areas that do not indicate live regions. Examples include:\n- ",
      impact:
        "Screen reader users will be unaware of important updates to this content when they occur.",
      recommendation:
        'Indicate live regions for dynamically changing content. Live regions can be created by adding a role attribute set to "log", "status", "alert", "progressbar", "marquee", or "timer" as appropriate. Alternatively, custom behavior can be created by using the aria-live, aria-atomic, and aria-relevant attributes. Text injected into this live region element will be announced by screen readers.\n\nImportantly, the element with the ARIA live attributes must be available when the page loads. Otherwise, many screen readers will not detect updates to the element. Additionally, the element must be empty on page load unless an immediate screen reader announcement is desired.',
      compliantExample: "",
      keepElement: true,
      keepAttribute: true,
      bps: [971],
    },
    {
      id: "response-transcript-missing-for-audio",
      text: "Transcript missing for audio",
      issue:
        "There is audio-only content without a transcript. Examples include:\n- ",
      impact:
        "Users who are deaf or hard of hearing will not have access to this content.",
      recommendation:
        'Provide a text transcript for audio only presentations. This transcript should be present on the same page as the audio. It should be in the same language as the spoken language. If the audio is provided by a <video> element, developers may provide a caption track instead using <track kind="captions">.',
      compliantExample: "",
      keepElement: true,
      keepAttribute: true,
      bps: [1143],
    },
    {
      id: "response-alternative-missing-for-video-only",
      text: "Alternative missing for video only",
      issue:
        "There is video-only content without a transcript, audio file, or non-animated textual representation. Examples include:\n- ",
      impact:
        "Users who are blind or have low vision will not have access to this content.",
      recommendation:
        "Provide text transcript or audio track of video only presentations.",
      compliantExample: "",
      keepElement: true,
      keepAttribute: true,
      bps: [1144],
    },
    {
      id: "response-images-of-text",
      text: "Images of text",
      issue:
        "There is text created with images of text rather than actual text elements styled with CSS. Examples include:\n- ",
      impact:
        "Users with low vision and users with cognitive disabilities will be prevented from modifying or enlarging this text.",
      recommendation:
        "Ensure text is used instead of images of text when technology allows unless it is essential. Common exceptions include logotypes or images of single letters.",
      compliantExample: "",
      keepElement: true,
      keepAttribute: true,
      bps: [1233],
    },
    {
      id: "response-sensory-dependent-instructions",
      text: "Sensory dependent instructions",
      issue:
        "There are instructions that rely solely on sensory characteristics. Examples include:\n- ",
      impact:
        "Users who are blind, have low vision, are deaf, or are hard of hearing may have difficulty following these instructions.",
      recommendation:
        "Ensure instructions do not rely solely on sensory characteristics. Examples include instructions that refer solely to shape, location, size, orientation, or sound, like 'Click the red button'. Rewrite the instructions to avoid using sensory descriptions.",
      compliantExample: "",
      keepElement: true,
      keepAttribute: true,
      bps: [1237],
    },
    {
      id: "response-web-text-level-semantics",
      text: "Strikethrough text",
      issue:
        "There is strikethrough text without proper markup. Examples include:\n-",
      impact:
        "Screen reader users will not be aware of the presence of this formatting.",
      recommendation:
        'Ensure proper markup is used to mark emphasized or special text formatting. For strikethrough text, such as old prices replaced with a sale price, use the <s> element to wrap the strikethrough text. Additionally, add visually hidden text before and after the strikethrough text that describes the meaning of the strikethrough, such as "Old price" and "New price."',
      compliantExample: "",
      keepElement: true,
      keepAttribute: true,
      bps: [1238],
    },
    {
      id: "response-keyboard-trap",
      text: "Keyboard trap",
      issue:
        "There are controls that trap keyboard focus. Examples include:\n- ",
      impact:
        "Keyboard users will have difficulty accessing controls of the page beyond this point.",
      recommendation:
        "Ensure keyboard focus is not trapped. Users must be able to use the keyboard alone to move away from controls. When moving away from the component requires more than arrow keys, Tab, Shift+Tab, or Esc, the user must be advised of the method for moving focus away.",
      compliantExample: "",
      keepElement: true,
      keepAttribute: true,
      bps: [1243],
    },
    {
      id: "response-dynamic-auto-updating-without-pause-stop-hide",
      text: "Auto-updating content that cannot be paused",
      issue:
        "There is content that plays or moves automatically without a clear mechanism to pause, stop, or hide it. Examples include:\n- ",
      impact:
        "Users with cognitive disabilities may be prevented from reading important content before it appears, or it may be too distracting for them to remain on the page. Users with vestibular disorders or migraine may experience symptoms caused by this movement.",
      recommendation:
        "Ensure auto-updating dynamic content can be paused, stopped, or hidden. Common examples include autoplaying videos (with or without audio) and GIFs. The best way to do this is to add an accessible pause <button> element near to the element that allows the movement to be stopped.",
      compliantExample: "N/A",
      keepElement: true,
      keepAttribute: true,
      bps: [1244],
    },
    {
      id: "response-one-way-page-location",
      text: "One way page location",
      issue:
        "There are pages that can only be located by one method. Examples include:\n- ",
      impact:
        "Users with cognitive disabilities may be prevented from locating these pages.",
      recommendation:
        "Ensure there is more than one way to locate a web page in a set of pages. Common methods include:\n- A site map\n- Links to other pages on the page, such as a navigation bar or menu\n- Site search\n- Table of contents\n\nPages that represent steps in a process (such as shipping and payment pages in a checkout flow) are exempt from this requirement.",
      compliantExample: "",
      keepElement: true,
      keepAttribute: true,
      bps: [1247],
    },
    {
      id: "response-button-bad-name",
      text: "Button with non-descriptive name",
      issue:
        "There are buttons with insufficiently descriptive accessible names. Examples include:\n- ",
      impact:
        "Screen reader users will be unable to determine the purpose of these buttons.",
      recommendation:
        'Ensure headings and labels are descriptive and unique. This includes the accessible names of buttons. The accessible name of a button can be set with internal text, an aria-label attribute, or an aria-labelledby attribute. Good accessible names are both concise and descriptive. Avoid including the word "button" in the accessible name, as this information is already supplied by the button\'s role.',
      compliantExample: "",
      keepElement: true,
      keepAttribute: true,
      bps: [1248],
    },
    {
      id: "response-button-labels-not-unique",
      text: "Buttons with same name",
      issue:
        "There are buttons that perform different actions but have the same accessible name. Examples include:\n- ",
      impact:
        "Screen reader users will have difficulty distinguishing between these buttons.",
      recommendation:
        'Ensure headings and labels are descriptive and unique. This includes the accessible names of buttons. Buttons that perform different actions must have different accessible names. The accessible name of a button can be set with internal text, an aria-label attribute, or an aria-labelledby attribute.\n\nTo resolve the issue, add information to the buttons\' accessible names. For example, two "Add to Cart" buttons might become "Add to Cart, Apples" and "Add to Cart, Bananas." When altering the accessible name, be sure to include all of the button\'s visual text in the accessible name.',
      compliantExample: "",
      keepElement: true,
      keepAttribute: true,
      bps: [1248],
    },
    {
      id: "response-headings-not-unique",
      text: "Headings not unique",
      issue: "There are headings that are not unique. Examples include:\n- ",
      impact:
        "Screen reader users and users with cognitive disabilities may have difficulty distinguishing between these sections.",
      recommendation:
        "Ensure headings and labels are descriptive and unique. Headings and labels must be unique unless there is sufficient context to allow users to differentiate between duplicated headings or labels.",
      compliantExample: "",
      keepElement: true,
      keepAttribute: true,
      bps: [1248],
    },
    {
      id: "response-labels-not-unique",
      text: "Labels not unique",
      issue:
        "There are form field labels that are not unique. Examples include:\n-",
      impact:
        "Screen reader users and users with cognitive disabilities may have difficulty distinguishing between these fields.",
      recommendation:
        "Ensure headings and labels are descriptive and unique. Headings and labels must be unique unless there is sufficient context to allow users to differentiate between duplicated headings or labels.",
      compliantExample: "",
      keepElement: true,
      keepAttribute: true,
      bps: [1248],
    },
    {
      id: "response-visual-keyboard-focus-missing",
      text: "Visual keyboard focus missing",
      issue:
        "There are interactive elements without a visible keyboard focus indicator. Examples include:\n- ",
      impact:
        "Keyboard users will have difficulty determining their position on the page.",
      recommendation:
        "Ensure keyboard focus is indicated visually. When interactive elements receive focus, the element must appear on screen and a visible focus indicator must be present.\n\nFocus can be indicated in a variety of ways. Most commonly, the browser default outline is used. To use the browser default, remove any outline: none or outline: 0 CSS declarations. Alternatives to the browser default outline include underlines, a change of background, and borders. As of WCAG 2.1, a custom focus indicator must have a minimum contrast ratio of 3.00:1 against the background.",
      compliantExample: "",
      keepElement: true,
      keepAttribute: true,
      bps: [1249],
    },
    {
      id: "response-inconsistent-identification-for-same-functionality",
      text: "Inconsistent identification for same functionality",
      issue:
        "There are elements with the same functionality that are inconsistently identified across pages. Examples include:\n- ",
      impact:
        "Screen reader users and users with cognitive disabilities will have difficulty locating and identifying controls and content.",
      recommendation:
        "Ensure that elements with the same functionality are consistently identified across pages. Use labels, names, and text alternatives to consistently identify elements with the same functionality across multiple pages.",
      compliantExample: "",
      keepElement: true,
      keepAttribute: true,
      bps: [1253],
    },
    {
      id: "response-fields-without-visual-labels-or-instructions",
      text: "Fields without visual labels or instructions",
      issue:
        "There are form fields without persistent visual labels. Examples include:\n- ",
      impact:
        "Users with cognitive disabilities may be unable to determine the purpose of these fields.",
      recommendation:
        "Provide visual labels or instructions for user input. Labels for form controls must remain visible when content is entered or options are selected. Additionally, individual form controls in a group must each have their own labels.",
      compliantExample: "",
      keepElement: true,
      keepAttribute: true,
      bps: [1254],
    },
    {
      id: "response-unexplained-asterisks",
      text: "Asterisks without instructions",
      issue:
        "There is no text explaining that asterisks indicate required fields.",
      impact:
        "Users with cognitive disabilities may be unable to understand what asterisks are meant to represent.",
      recommendation:
        'Provide visual labels or instructions for user input. When asterisks are used to denote required fields, add text to the top of the form that explains their purpose, such as "Asterisks (*) indicate required fields."',
      compliantExample: "",
      keepElement: true,
      keepAttribute: true,
      bps: [1254],
    },
    {
      id: "response-form-errors-without-suggestions",
      text: "Form errors without suggestions",
      issue:
        "There are error messages that provide no suggestions on how to fix the issue. Examples include:\n- ",
      impact:
        "Users with cognitive disabilities and screen reader users will have difficulty determining how to resolve the error.",
      recommendation:
        "Provide suggestions for error messages when known. This can include specific examples of valid input or format examples.\n\nIf providing a suggestion would jeopardize the security of a page, the error message is exempt from this requirement. For example, a password field error is not required to suggest the correct password to the user.",
      compliantExample: "",
      keepElement: true,
      keepAttribute: true,
      bps: [1255],
    },
    {
      id: "response-form-errors-without-prevention-financial",
      text: "Form errors without prevention (financial)",
      issue:
        "There are forms that do not provide error prevention for user actions that result in a financial transaction.",
      impact:
        "Users with disabilities may submit the form with errors by mistake.",
      recommendation:
        "Provide error prevention for legal commitments, financial transactions, test responses, and data changes. Examples of unprevented errors for financial transactions include credit card fields with no validation. Provide one or more of the following methods to prevent errors:\n\n- If the user has entered data, automatically check the user's data entry for input errors and give the user an opportunity to correct them before committing.\n- Provide a review step and allow the user to make corrections before committing.\n- Allow the user to reverse the commitment.",
      compliantExample: "",
      keepElement: true,
      keepAttribute: true,
      bps: [1256],
    },
    {
      id: "response-form-errors-without-prevention-legal",
      text: "Form errors without prevention (legal)",
      issue:
        "There are forms that do not provide error prevention for user actions that result in a legal commitment.",
      impact:
        "Users with disabilities may submit the form with errors by mistake.",
      recommendation:
        "Provide error prevention for legal commitments, financial transactions, test responses, and data changes. Provide one or more of the following methods to prevent errors:\n\n- If the user has entered data, automatically check the user's data entry for input errors and give the user an opportunity to correct them before committing.\n- Provide a review step and allow the user to make corrections before committing.\n- Allow the user to reverse the commitment.",
      compliantExample: "",
      keepElement: true,
      keepAttribute: true,
      bps: [1256],
    },
    {
      id: "response-form-errors-without-prevention-user-data",
      text: "Form errors without prevention (user data)",
      issue:
        "There are forms that do not provide error prevention for user actions that change or delete any user-controllable data.",
      impact:
        "Users with disabilities may submit the form with errors by mistake.",
      recommendation:
        "Provide error prevention for legal commitments, financial transactions, test responses, and data changes. Examples of unprevented errors for data changes include editing a personal profile, posting to social media, or deleting an incoming email message. Provide one or more of the following methods to prevent errors:\n\n- If the user has entered data, automatically check the user's data entry for input errors and give the user an opportunity to correct them before committing.\n- Provide a review step and allow the user to make corrections before committing.\n- Allow the user to reverse the commitment.",
      compliantExample: "",
      keepElement: true,
      keepAttribute: true,
      bps: [1256],
    },
    {
      id: "response-form-errors-without-prevention-test-responses",
      text: "Form errors without prevention (test responses)",
      issue:
        "There are tests that do not prevent a user from submitting an empty or incomplete response.",
      impact:
        "Users with disabilities may submit the form with incomplete or empty responses by mistake",
      recommendation:
        "Provide error prevention for legal commitments, financial transactions, test responses, and data changes. Provide one or more of the following methods to prevent errors:\n\n- If the user has entered data, automatically check the user's data entry for input errors and give the user an opportunity to correct them before committing.\n- Provide a review step and allow the user to make corrections before committing.\n- Allow the user to reverse the commitment.",
      compliantExample: "",
      keepElement: true,
      keepAttribute: true,
      bps: [1256],
    },
    {
      id: "response-pdf-title",
      text: "Missing or incorrect title",
      issue: "The document has no title.",
      impact:
        "Screen reader users and some users with cognitive disabilities will have difficulty determining the purpose of the document.",
      recommendation:
        "Provide a clear identifying title property for the document. This title should be concise, descriptive, and customer-facing.\n\nTo alter the document title in Acrobat Pro:\n1. Navigate to the File > Properties.\n2. Navigate to the Description tab.\n3. Enter a title in the Title field.",
      compliantExample: "",
      keepElement: true,
      keepAttribute: true,
      bps: [1270],
    },
    {
      id: "response-pdf-title-not-shown",
      text: "Title not shown",
      issue:
        "Acrobat does not display the title of the document in its tabs. Instead, it displays the filename.",
      impact:
        "Screen reader users and users with cognitive disabilities will have difficulty determining the purpose of the document.",
      recommendation:
        "Provide a clear identifying title property for the document. This title must be displayed in the window and tab when the file is open in Acrobat.\n\nTo display the title in Acrobat Pro:\n1. Go to File > Properties.\n2. Go to the Initial View tab.\n3. In the Show field under Window Options, ensure that Document Title is selected.",
      compliantExample: "",
      keepElement: true,
      keepAttribute: true,
      bps: [1270],
    },
    {
      id: "response-pdf-images-of-text",
      text: "Images of text",
      issue:
        "There is text created with images of text rather than actual text. Examples include:\n- ",
      impact:
        "Users with low vision and users with cognitive disabilities will be prevented from modifying or enlarging this text.",
      recommendation:
        "Ensure text is used instead of images of text when technology allows unless it is essential. Common exceptions include logotypes or images of single letters.",
      compliantExample: "",
      keepElement: true,
      keepAttribute: true,
      bps: [1275],
    },
    {
      id: "response-links-without-meaningful-text",
      text: "Links without meaningful text",
      issue: "There are links without accessible names. Examples include:\n- ",
      impact:
        "Screen reader users will be unable to determine the purpose of these links. Speech input users will have difficulty activating them.",
      recommendation:
        "Ensure link text is meaningful within context. The accessible name of a link can be set with internal text, an aria-label attribute, or an aria-labelledby attribute. Good accessible names are both concise and descriptive.",
      compliantExample: "",
      keepElement: true,
      keepAttribute: true,
      bps: [1301],
    },
    {
      id: "response-links-with-non-descriptive-names",
      text: "Links with non-descriptive accessible names",
      issue:
        "There are links with insufficiently descriptive accessible names. Examples include:\n- ",
      impact:
        "Screen reader users will have difficulty determining where these links go.",
      recommendation:
        "Ensure link text is meaningful within context. A link's purpose must be determinable from the link's accessible name alone or in combination with the immediately surrounding paragraph, table cell, or associated table header. Good accessible names are both concise and descriptive.",
      compliantExample: "",
      keepElement: true,
      keepAttribute: true,
      bps: [1301],
    },
    {
      id: "response-links-with-identical-names",
      text: "Links with identical names",
      issue:
        "There are links with identical accessible names that navigate to different locations. Examples include:\n- ",
      impact:
        "Screen reader users who navigate the page using a list of links provided by the screen reader will be unable to differentiate between these links.",
      recommendation:
        'Ensure link text is meaningful within context. Links that go to different locations must have different accessible names.\n\nTo resolve the issue, add information to the links\' accessible names. For example, two "Learn more" links might become "Learn more about products" and "Learn more about services." When altering the accessible name, be sure to include all of the link\'s visual text in the accessible name.',
      compliantExample: "",
      keepElement: true,
      keepAttribute: true,
      bps: [1301],
    },
    {
      id: "response-blinking-or-flashing",
      text: "Blinking or flashing",
      issue:
        "There are elements that blink or flash more than three times per second. Examples include:",
      impact:
        "Users with photosensitive epilepsy may experience a seizure from excessive flashing. Users with cognitive disabilities may be distracted by the movement.",
      recommendation:
        "Ensure elements blink or flash in a safe threshold. Avoid flashing more than three times per second unless the content falls within the  safe threshold for dimness and size.\n\nFor size, the safe threshold can be calculated as 25% of 10 degrees. When calculated at a typical viewing distance of 11 to 26 inches for a 15-17 inch screen at a resolution of 1024x768, the area of flashing must be less than 21,824 pixels.\n\nIf a flashing element is larger than the threshold and flashes more than three times per second and cannot be changed, the flash must then be evaluated by a tool. The Trace Center Photosensitive Epilepsy Analysis Tool (PEAT) can be used for this purpose: http://trace.wisc.edu/peat/",
      compliantExample: "",
      keepElement: true,
      keepAttribute: true,
      bps: [1342],
    },
    {
      id: "response-duplicated-attribute",
      text: "Duplicated attribute",
      issue:
        "There are elements with duplicated attributes. Examples include:\n- ",
      impact: "Assistive technologies may be unable to parse this content.",
      recommendation:
        "Ensure markup documents contain well-formed elements. Elements must have only one instance of an attribute assigned to them. This can be tested by running the document through an HTML validator such as W3C's Nu Html Checker: https://validator.w3.org/nu/",
      compliantExample: "",
      keepElement: true,
      keepAttribute: true,
      bps: [1352],
    },
    {
      id: "response-duplicated-id",
      text: "Duplicated ID",
      issue:
        "There are IDs used on more than one element. Examples include:\n- ",
      impact: "Assistive technologies may be unable to parse this content.",
      recommendation:
        "Ensure markup documents contain well-formed elements. Each ID in the page must be unique. This can be tested by running the document through an HTML validator such as W3C's Nu Html Checker: https://validator.w3.org/nu/",
      compliantExample: "N/A",
      keepElement: true,
      keepAttribute: true,
      bps: [1352],
    },
    {
      id: "response-improper-element-nesting",
      text: "Improper element nesting",
      issue:
        "There are elements nested in a way that is not permitted by the HTML specification. Examples include:\n- ",
      impact: "Assistive technologies may be unable to parse this content.",
      recommendation:
        "Ensure markup documents contain well-formed elements. Elements must be nested according to specification. This can be tested by running the document through an HTML validator such as W3C's Nu Html Checker: https://validator.w3.org/nu/",
      compliantExample: "N/A",
      keepElement: true,
      keepAttribute: true,
      bps: [1352],
    },
    {
      id: "response-incomplete-start-end-tag",
      text: "Incomplete starting/ending tags",
      issue:
        "There are elements with incomplete start or end tags. Examples include:\n- ",
      impact: "Assistive technologies may be unable to parse this content.",
      recommendation:
        "Ensure markup documents contain well-formed elements. All elements must have complete start and end tags where required by the HTML specification. This can be tested by running the document through an HTML validator such as W3C's Nu Html Checker: https://validator.w3.org/nu/",
      compliantExample: "N/A",
      keepElement: true,
      keepAttribute: true,
      bps: [1352],
    },
    {
      id: "response-form-errors-without-clear-indication",
      text: "Form errors without clear indication",
      issue:
        "There are errors that do not mention the name of the field in error. Examples include:\n- ",
      impact:
        "Screen reader users and users with cognitive disabilities will have difficulty determining that these messages are errors instead of general instructions on how to fill the fields. They will also have difficulty determining which error corresponds to which field.",
      recommendation:
        "Provide a clear indication of fields in error for information that is submitted. Include the name of the field in the error message.",
      compliantExample: "",
      keepElement: true,
      keepAttribute: true,
      bps: [1471],
    },
    {
      id: "response-ios-dialog-focus",
      text: "Focus not moving to dialogs",
      issue:
        "There are dialogs that do not receive focus when they appear. Examples include:\n- ",
      impact:
        "Screen reader users will be unable to determine that these dialogs have appeared unless they review the entire screen. Keyboard users will have difficulty navigating into the dialog.",
      recommendation:
        "Ensure focus is logically set when a module opens and when pop-up alerts close. When modal dialogs appear, focus must move to the first focusable element in the dialog. Post a UIAccessibilityScreenChangedNotification to move focus to this element.",
      compliantExample: "",
      keepElement: true,
      keepAttribute: true,
      bps: [1564],
    },
    {
      id: "response-ios-text-contrast-insufficient",
      text: "Text contrast insufficient",
      issue:
        "There is text that does not meet the required minimum color contrast ratio with its background.\n\nForeground color: \nBackground color: \nContrast ratio: \nRequired contrast ratio for this content: \n\nExamples of text with this contrast ratio include:\n- ",
      impact:
        "Users with low vision will have difficulty reading this content.",
      recommendation:
        "Ensure text and images of text provide sufficient contrast. The following contrast ratios are required:\n\n- Text smaller than 18 pt (24 px), or smaller than 14 pt (19 px) if bold, must have a color contrast ratio of 4.50:1 or more with adjacent colors.\n\n- Text 18 pt (24 px) or larger, or 14 pt (19 px) or larger if bold, must have a color contrast ratio of 3.00:1 or more with adjacent colors.\n\nDisabled controls that do not accept user interaction are exempt from this requirement.\n\nRefer to the Accessible Color Picker extension or Color Contrast Checker site for assistance: https://www.accessibility.dev/",
      compliantExample: "N/A",
      keepElement: true,
      keepAttribute: true,
      bps: [1581],
    },
    {
      id: "response-ios-text-on-image-contrast",
      text: "Text on image contrast",
      issue:
        "There is text on an image background that does not meet the required minimum color contrast ratio.\n\nForeground color: \nBackground color: \nContrast ratio: \nRequired contrast ratio for this content: \n\nExamples of insufficiently contrasting text in front of images include:\n- ",
      impact:
        "Users with low vision will have difficulty reading this content.",
      recommendation:
        "Ensure text and images of text provide sufficient contrast.\n\nFor text in front of images, the best way to meet contrast requirements is to use a solid, opaque background behind the text. Alternatively, provide a transparent colored background that ensures all parts of the background image provide sufficient contrast with the text.\n\nThe following contrast ratios are required:\n\n- Text smaller than 18 pt (24 px), or smaller than 14 pt (19 px) if bold, must have a color contrast ratio of 4.50:1 or more with adjacent colors.\n\n- Text 18 pt (24 px) or larger, or 14 pt (19 px) or larger if bold, must have a color contrast ratio of 3.00:1 or more with adjacent colors.\n\nDisabled controls that do not accept user interaction are exempt from this requirement.\n\nRefer to the Accessible Color Picker extension or Color Contrast Checker site for assistance: https://www.accessibility.dev/",
      compliantExample: "N/A",
      keepElement: true,
      keepAttribute: true,
      bps: [1581],
    },
    {
      id: "response-ios-elements-no-name",
      text: "Elements without accessible names",
      issue:
        "There are interactive controls with no accessible names. Examples include:\n- ",
      impact:
        "Screen reader users will not be able to determine the purpose of these controls.",
      recommendation:
        "Ensure elements are sufficiently described. Add an accessibilityLabel property to the control with an appropriate description.",
      compliantExample: "",
      keepElement: true,
      keepAttribute: true,
      bps: [1584],
    },
    {
      id: "response-ios-top-of-form-errors",
      text: "Focus not moving to top-of-form errors",
      issue:
        "There are top-of-form errors that do not receive focus when they appear. Examples include:\n- ",
      impact:
        "Screen reader users will be unable to determine that these errors have appeared unless they review the entire screen.",
      recommendation:
        "Ensure error messages are in a platform specific alert or focus is moved to the error message after submit. When top-of-form errors appear, focus must move to the container of the error by posting a UIAccessibilityScreenChangedNotification.",
      compliantExample: "",
      keepElement: true,
      keepAttribute: true,
      bps: [1585],
    },
    {
      id: "response-ios-inline-errors",
      text: "Focus not moving to first field in error",
      issue:
        "After submitting a form when inline errors are present, focus does not move to the first field in error.",
      impact:
        "Screen reader users will be unable to determine that these errors have appeared unless they review the entire screen.",
      recommendation:
        "Ensure error messages are in a platform specific alert or focus is moved to the error message after submit. When inline errors appear, move focus to the first field in error by posting a UIAccessibilityScreenChangedNotification. Additionally, the form field's accessibilityLabel property must have the text of the error appended to the end.",
      compliantExample: "",
      keepElement: true,
      keepAttribute: true,
      bps: [1585],
    },
    {
      id: "response-ios-unassociated label",
      text: "Unassociated label",
      issue:
        "There are form controls with visual labels that are not programmatically associated with the control. Examples include:\n- ",
      impact:
        "Screen reader users will have difficulty determining the purpose of these controls. Speech input users will have difficulty navigating to them.",
      recommendation:
        "Provide valid labels for all form elements. Set the accessibilityLabel property of the field to the exact visual text.",
      compliantExample: "",
      keepElement: true,
      keepAttribute: true,
      bps: [1598],
    },
    {
      id: "response-aria-invalid",
      text: "ARIA invalid",
      issue:
        "There are elements with invalid ARIA attributes or values. Examples include:\n- ",
      impact: "Assistive technologies may be unable to parse this content.",
      recommendation:
        "Ensure ARIA roles, states, and properties are valid. Many ARIA attributes can only be used on certain elements. Some can only be used in combination with other attributes. Additionally, if an attribute references an ID, that ID must be present in the page.\n\nTo detect many of these errors automatically, use the Nu Html Checker: https://validator.w3.org/nu/",
      compliantExample: "",
      keepElement: true,
      keepAttribute: true,
      bps: [1626],
    },
    {
      id: "response-ios-sr-focus",
      text: "Content that cannot receive VoiceOver focus",
      issue:
        "There is meaningful content that cannot receive VoiceOver focus. Examples include:\n- ",
      impact:
        "Screen reader users will be prevented from accessing this content.",
      recommendation:
        "Ensure all controls and non-decorative content enable accessibility. Set the isAccessibilityElement property of these elements to YES.",
      compliantExample: "",
      keepElement: true,
      keepAttribute: true,
      bps: [1646],
    },
    {
      id: "response-layout-table-marked-for-presentation",
      text: "Layout table marked for presentation",
      issue:
        "There are <table> elements used for layout purposes, but they are not marked as presentational. Examples include:\n- ",
      impact:
        "Screen readers will treat this content as a data table, causing confusion about its layout and impeding navigation.",
      recommendation:
        'Ensure layout tables indicate their use for presentation purposes. This can be done by adding role="presentation" to <table> elements used for a layout purpose. Additionally, convert any <th> cells to <td> cells. It is strongly recommended to use CSS instead of HTML table elements for layout purposes.',
      compliantExample: "",
      keepElement: true,
      keepAttribute: true,
      bps: [1775],
    },
    {
      id: "response-aria-properties-focusable-aria-hidden",
      text: 'Focusable aria-hidden="true" element',
      issue:
        'There are keyboard-focusable controls with aria-hidden="true". Examples include:\n- ',
      impact:
        "Keyboard users will be able to navigate to this element even if it is off screen. Screen reader users will be able to focus this element if they press Tab, but they will be unable to determine its purpose.",
      recommendation:
        "Avoid inappropriate use of ARIA roles, states, and properties. If content is meant to be hidden from all users, hide it with display: none or visibility: hidden. If content is meant to be accessed by all users, remove any aria-hidden attributes.",
      compliantExample: "",
      keepElement: true,
      keepAttribute: true,
      bps: [1871],
    },
    {
      id: "response-no-dialog-title",
      text: "No dialog title",
      issue:
        "There are dialogs that lack an accessible name. Examples include:\n- ",
      impact:
        "Screen reader users will have difficulty determining the purpose of these dialogs.",
      recommendation:
        "Provide a descriptive dialog title. If the dialog has a visible title, set aria-labelledby on the dialog container to the ID of the visible title. For dialogs without a visible title, set a descriptive aria-label on the dialog element.",
      compliantExample: "",
      keepElement: true,
      keepAttribute: true,
      bps: [1893],
    },
    {
      id: "response-ios-decorative-with-alt",
      text: "Decorative images with textual equivalents",
      issue:
        "There are decorative images with textual equivalents. Examples include:\n- ",
      impact:
        "Screen reader users will receive unnecessary and potentially confusing information.",
      recommendation:
        "Ensure hidden, decorative and duplicate content and artifact elements are not exposed to assistive technologies. Non-meaningful images must be marked as decorative, which causes screen readers to ignore them. To mark an image as decorative, remove any accessibilityLabel property and set its isAccessibilityElement property to NO.",
      compliantExample: "",
      keepElement: true,
      keepAttribute: true,
      bps: [1907],
    },
    {
      id: "response-ios-hidden-content",
      text: "Hidden content exposed to ATs",
      issue:
        "There is visually hidden content meant to be hidden from all users, but it can still be accessed by keyboard or screen reader users. Examples include:\n- ",
      impact:
        "Screen reader and keyboard users will be able to access hidden content, such as form fields, text, or links.",
      recommendation:
        "Ensure hidden, decorative and duplicate content and artifact elements are not exposed to assistive technologies. Set the isAccessibilityElement properties of these elements to NO.",
      compliantExample: "",
      keepElement: true,
      keepAttribute: true,
      bps: [1907],
    },
    {
      id: "response-ios-content-focusable-behind-dialog",
      text: "Content focusable behind dialog",
      issue:
        "There are modal dialogs that allow keyboard and/or screen reader access to elements behind the dialog. Examples include:\n- ",
      impact:
        "Keyboard and/or screen reader users will have difficulty determining their position in the screen. They could also have unintended access to controls behind the dialog.",
      recommendation:
        "Ensure hidden, decorative and duplicate content and artifact elements are not exposed to assistive technologies. This includes content behind modal dialogs.\n\nThe best way to prevent access to content behind dialogs is to:\n- Ensure that the dialog container is separate from the container that holds the rest of the screen's content.\n- For the container that holds the rest of the screen's content, set the accessibilityElementsHidden property to YES.\n- When the dialog is closed, remove the accessibilityElementsHidden property.",
      compliantExample: "",
      keepElement: true,
      keepAttribute: true,
      bps: [1907],
    },
    {
      id: "response-ios-decorative-with-bad-alt",
      text: "Meaningful images with improper equivalents",
      issue:
        "There are images with insufficiently descriptive textual equivalents. Examples include:\n- ",
      impact:
        "Screen reader users will not receive an accurate impression of the contents of these images.",
      recommendation:
        "Ensure non-decorative images provide informative alternative text. Textual equivalents must be both concise and descriptive. Alter the accessibilityLabel property of the image.",
      compliantExample: "",
      keepElement: true,
      keepAttribute: true,
      bps: [1908],
    },
    {
      id: "response-ios-meaningful-without-alt",
      text: "Meaningful images without textual equivalents",
      issue:
        "There are meaningful images without a textual equivalent. Examples include:\n- ",
      impact:
        "Screen reader users will be unable to determine what these images represent.",
      recommendation:
        "Provide textual equivalents for all non-text elements including sounds and images. Meaningful images must have a concise but descriptive textual equivalent. To add a textual equivalent to an image, set its accessibilityLabel property to a meaningful equivalent.",
      compliantExample: "",
      keepElement: true,
      keepAttribute: true,
      bps: [1909],
    },
    {
      id: "response-ios-role-state",
      text: "Elements with improper roles and states",
      issue:
        "There are elements with improper role and/or state information. Examples include:\n- ",
      impact:
        "Screen reader users will have difficulty understanding the purpose and current state of these controls.",
      recommendation:
        "Ensure element traits (role and state) are correct. The best way to do this is to use native views and states, which come with this information built in.\n\nIf using native views is not possible, this information must be set manually through the use of UIAccessibilityTraits. A list of these traits can be found on the Apple website: https://developer.apple.com/documentation/uikit/uiaccessibility/uiaccessibilitytraits",
      compliantExample: "",
      keepElement: true,
      keepAttribute: true,
      bps: [1911],
    },
    {
      id: "response-ios-reading-order",
      text: "Reading order",
      issue: "The following reading order is illogical:\n1.",
      impact: "Screen reader users will be unable to understand this content.",
      recommendation:
        "Ensure that the reading order of content is logical. Ensure the elements follow the screen layout order. Alternatively, use the accessibilityElementAtIndex, accessibilityElementCount and indexOfAccessibilityElement properties to set the order.",
      compliantExample: "",
      keepElement: true,
      keepAttribute: true,
      bps: [1922],
    },
    {
      id: "response-ios-text-resizing",
      text: "Text cannot be resized up to 200%",
      issue:
        "There is content that disappears, overlaps, or is cut off when the font size is increased by 200%. Examples include:\n- ",
      impact:
        "Users with low vision who need to resize text will be prevented from accessing this content.",
      recommendation:
        'Provide for user control of font size. Users must be able to resize text up to 200%. \n\nThe best way to do this is to allow the app to respond to changes in the OS font size through the use of Dynamic Type. When using Dynamic Type, apps should allow their text to be resized up to the AX2 font size, which is twice the default. This font size can be activated by going to Accessibility > Display & Text Size > Larger Text and toggling on Larger Accessibility Sizes. Then, select the 4th notch from the right (announced as "73%" by VoiceOver).\n',
      compliantExample: "",
      keepElement: true,
      keepAttribute: true,
      bps: [1928],
    },
    {
      id: "response-android-text-contrast-insufficient",
      text: "Text contrast insufficient",
      issue:
        "There is text that does not meet the required minimum color contrast ratio with its background.\n\nForeground color: \nBackground color: \nContrast ratio: \nRequired contrast ratio for this content: \n\nExamples of text with this contrast ratio include:\n- ",
      impact:
        "Users with low vision will have difficulty reading this content.",
      recommendation:
        "Ensure text and images of text provide sufficient contrast. The following contrast ratios are required:\n\n- Text smaller than 18 pt (24 px), or smaller than 14 pt (19 px) if bold, must have a color contrast ratio of 4.50:1 or more with adjacent colors.\n\n- Text 18 pt (24 px) or larger, or 14 pt (19 px) or larger if bold, must have a color contrast ratio of 3.00:1 or more with adjacent colors.\n\nDisabled controls that do not accept user interaction are exempt from this requirement.\n\nRefer to the Accessible Color Picker extension or Color Contrast Checker site for assistance: https://www.accessibility.dev/",
      compliantExample: "N/A",
      keepElement: true,
      keepAttribute: true,
      bps: [1943],
    },
    {
      id: "response-android-text-on-image-contrast",
      text: "Text on image contrast",
      issue:
        "There is text on an image background that does not meet the required minimum color contrast ratio.\n\nForeground color: \nBackground color: \nContrast ratio: \nRequired contrast ratio for this content: \n\nExamples of insufficiently contrasting text in front of images include:\n- ",
      impact:
        "Users with low vision will have difficulty reading this content.",
      recommendation:
        "Ensure text and images of text provide sufficient contrast.\n\nFor text in front of images, the best way to meet contrast requirements is to use a solid, opaque background behind the text. Alternatively, provide a transparent colored background that ensures all parts of the background image provide sufficient contrast with the text.\n\nThe following contrast ratios are required:\n\n- Text smaller than 18 pt (24 px), or smaller than 14 pt (19 px) if bold, must have a color contrast ratio of 4.50:1 or more with adjacent colors.\n\n- Text 18 pt (24 px) or larger, or 14 pt (19 px) or larger if bold, must have a color contrast ratio of 3.00:1 or more with adjacent colors.\n\nDisabled controls that do not accept user interaction are exempt from this requirement.\n\nRefer to the Accessible Color Picker extension or Color Contrast Checker site for assistance: https://www.accessibility.dev/",
      compliantExample: "N/A",
      keepElement: true,
      keepAttribute: true,
      bps: [1943],
    },
    {
      id: "response-android-top-of-form-error",
      text: "Focus not moved to top-of-form error",
      issue:
        "There are top-of-form errors that do not receive focus when they appear. Examples include:\n- ",
      impact:
        "Screen reader users will be unable to determine that these errors have appeared unless they review the entire screen.",
      recommendation:
        'Ensure error messages are in a platform specific alert or focus is moved to the error message after submit. When top-of-form errors appear, focus must move to the container of the error through the use of sendAccessibilityEvent(AccessibilityEvent.TYPE_VIEW_FOCUSED).\n\nAlternatively, the error may be placed in an element with an accessibilityLiveRegion attribute set to "polite" or moved to an AlertDialog.',
      compliantExample: "",
      keepElement: true,
      keepAttribute: true,
      bps: [1952],
    },
    {
      id: "response-android-inline-error",
      text: "Focus not moved to first field in error",
      issue:
        "After submitting a form when inline errors are present, focus does not move to the first field in error.",
      impact:
        "Screen reader users will be unable to determine that these errors have appeared unless they review the entire screen.",
      recommendation:
        "Ensure error messages are in a platform specific alert or focus is moved to the error message after submit. When inline errors appear, move focus to the first field in error through the use of sendAccessibilityEvent(AccessibilityEvent.TYPE_VIEW_FOCUSED). Additionally, the form field's contentDescription attribute must have the text of the error appended to the end.",
      compliantExample: "",
      keepElement: true,
      keepAttribute: true,
      bps: [1952],
    },
    {
      id: "response-android-dialog-focus",
      text: "Focus not moved to dialog",
      issue:
        "There are dialogs that do not receive focus when they appear. Examples include:\n- ",
      impact:
        "Screen reader users will be unable to determine that these dialogs have appeared unless they review the entire screen. Keyboard users will have difficulty navigating into the dialog.",
      recommendation:
        "Ensure focus is logically set when a module opens and when pop-up alerts close. When modal dialogs appear, focus must move to the first focusable element in the dialog. Use the sendAccessibilityEvent(AccessibilityEvent.TYPE_VIEW_FOCUSED) method to move keyboard focus to this element.",
      compliantExample: "",
      keepElement: true,
      keepAttribute: true,
      bps: [1960],
    },
    {
      id: "response-android-not-keyboard-focusable",
      text: "Controls not keyboard focusable",
      issue:
        "There are controls that cannot be navigated to with the keyboard. Examples include:\n- ",
      impact: "Keyboard users will be prevented from accessing these controls.",
      recommendation:
        'Ensure all elements and controls can receive focus. Set the android:focusable attribute of interactive elements to "true".',
      compliantExample: "",
      keepElement: true,
      keepAttribute: true,
      bps: [1962],
    },
    {
      id: "response-android-control-no-name",
      text: "Controls with no name",
      issue:
        "There are interactive controls with no accessible names. Examples include:\n- ",
      impact:
        "Screen reader users will not be able to determine the purpose of these controls.",
      recommendation:
        "Ensure elements are sufficiently described. Add an android:contentDescription attribute to the control with an appropriate description.",
      compliantExample: "",
      keepElement: true,
      keepAttribute: true,
      bps: [1963],
    },
    {
      id: "response-android-unassociated-label",
      text: "Unassociated label",
      issue:
        "There are form controls with visual labels that are not programmatically associated with the control. Examples include:\n- ",
      impact:
        "Screen reader users will have difficulty determining the purpose of these controls. Speech input users will have difficulty navigating to them.",
      recommendation:
        "Provide valid labels for all form elements. Add an android:labelFor attribute to the label, then set it to the ID of the corresponding form field.",
      compliantExample: "",
      keepElement: true,
      keepAttribute: true,
      bps: [1968],
    },
    {
      id: "response-android-sr-focus",
      text: "Content that cannot be focused with TalkBack",
      issue:
        "There is meaningful content that cannot receive TalkBack focus. Examples include:\n- ",
      impact:
        "Screen reader users will be prevented from accessing this content.",
      recommendation:
        'Ensure all controls and non-decorative content support accessibility. Set the android:importantForAccessibility attribute of meaningful content to "yes". If it is non-text content, also set the element\'s android:contentDescription attribute to a meaningful equivalent.',
      compliantExample: "",
      keepElement: true,
      keepAttribute: true,
      bps: [1970],
    },
    {
      id: "response-android-role-state",
      text: "Controls with improper role and state",
      issue:
        "There are controls with improper role and/or state information. Examples include:\n- ",
      impact:
        "Screen reader users will have difficulty understanding the purpose and current state of these controls.",
      recommendation:
        "Ensure element role and state are correct. The best way to do this is to use native views and states, which come with this information built in.\n\nIf using native views is not possible, this information must be set manually. To set an element's role manually, use the setClassName() method with an argument to the getter of the desired Android native control class name, such as Button.class.getName().",
      compliantExample: "",
      keepElement: true,
      keepAttribute: true,
      bps: [1973],
    },
    {
      id: "response-android-meaningful-with-bad-alt",
      text: "Meaningful images with improper textual equivalents",
      issue:
        "There are images with insufficiently descriptive textual equivalents. Examples include:\n- ",
      impact:
        "Screen reader users will not receive an accurate impression of the contents of these images.",
      recommendation:
        "Ensure non-decorative images provide informative alternative text. Textual equivalents must be both concise and descriptive. Alter the contentDescription attribute of the image.",
      compliantExample: "",
      keepElement: true,
      keepAttribute: true,
      bps: [1975],
    },
    {
      id: "response-android-meaningful-without-alt",
      text: "Meaningful images without textual equivalents",
      issue:
        "There are meaningful images without a textual equivalent. Examples include:\n- ",
      impact:
        "Screen reader users will be unable to determine what these images represent.",
      recommendation:
        "Provide textual equivalents for all non-text elements including sounds and images. Meaningful images must have a concise but descriptive textual equivalent. To add a textual equivalent to an image, set its android:contentDescription attribute to a meaningful equivalent.",
      compliantExample: "",
      keepElement: true,
      keepAttribute: true,
      bps: [1976],
    },
    {
      id: "response-android-decorative-with-alt",
      text: "Decorative image with textual equivalent",
      issue:
        "There are decorative images with textual equivalents. Examples include:\n- ",
      impact:
        "Screen reader users will receive unnecessary and potentially confusing information.",
      recommendation:
        'Ensure hidden, decorative and duplicate content and artifact elements are not exposed to assistive technologies. Non-meaningful images must be marked as decorative, which causes screen readers to ignore them. To mark an image as decorative, remove any contentDescription attribute and set its importantForAccessibility attribute to "no".',
      compliantExample: "",
      keepElement: true,
      keepAttribute: true,
      bps: [1978],
    },
    {
      id: "response-android-duplicated-elements",
      text: "Duplicated elements",
      issue:
        "There are non-meaningful, duplicated elements exposed to screen readers. Examples include:\n- ",
      impact:
        "Screen reader users will receive redundant information and will be prevented from navigating efficiently.",
      recommendation:
        'Ensure hidden, decorative and duplicate content and artifact elements are not exposed to assistive technologies.  Mark non-meaningful, duplicated content as decorative by setting its android:importantForAccessibility attribute to "no".',
      compliantExample: "",
      keepElement: true,
      keepAttribute: true,
      bps: [1978],
    },
    {
      id: "response-android-hidden-content",
      text: "Hidden content exposed to ATs",
      issue:
        "There is visually hidden content meant to be hidden from all users, but it can still be accessed by keyboard or screen reader users. Examples include:\n- ",
      impact:
        "Screen reader and keyboard users will be able to access hidden content, such as form fields, text, or links.",
      recommendation:
        'Ensure hidden, decorative and duplicate content and artifact elements are not exposed to assistive technologies. Set the android:importantForAccessibility attribute of this content to "no".',
      compliantExample: "",
      keepElement: true,
      keepAttribute: true,
      bps: [1978],
    },
    {
      id: "response-android-content-behind-dialog",
      text: "Dialogs allow focus behind them",
      issue:
        "There are modal dialogs that allow keyboard and/or screen reader access to elements behind the dialog. Examples include:\n- ",
      impact:
        "Keyboard and/or screen reader users will have difficulty determining their position in the screen. They could also have unintended access to controls behind the dialog.",
      recommendation:
        "Ensure hidden, decorative and duplicate content and artifact elements are not exposed to assistive technologies. This includes content behind modal dialogs.\n\nThe best way to prevent access to content behind dialogs is to:\n- Ensure that the dialog container is separate from the container that holds the rest of the screen's content.\n- For the container that holds the rest of the screen's content, set the android:importantForAccessibility attribute to \"noHideDescendants\".\n- When the dialog is closed, remove the importantForAccessibility attribute from the container holding the rest of the screen's contents.",
      compliantExample: "",
      keepElement: true,
      keepAttribute: true,
      bps: [1978],
    },
    {
      id: "response-android-not-keyboard-operable",
      text: "Controls not keyboard operable",
      issue:
        "There are controls that cannot be operated with the keyboard. Examples include:\n- ",
      impact: "Keyboard users will be prevented from accessing these controls.",
      recommendation:
        "Ensure access to alternative input methods. This includes external keyboards, which may be used directly by people with dexterity disabilities or as an interface for switch controls and Braille displays. Generally, controls should be activatable with the Enter key or allow selection with the arrow keys. To respond to keyboard events, implement methods from the KeyEvent.Callback interface,such as onKeyUp().",
      compliantExample: "",
      keepElement: true,
      keepAttribute: true,
      bps: [1983],
    },
    {
      id: "response-android-reading-order",
      text: "Reading order",
      issue: "The following reading order is illogical:\n1.",
      impact: "Screen reader users will be unable to understand this content.",
      recommendation:
        "Ensure that the reading order of content is logical. Ensure the elements follow the screen layout order. Alternatively, use the accessibilityTraversalBefore or accessibilityTraversalAfter attributes to manually set the focus order.",
      compliantExample: "",
      keepElement: true,
      keepAttribute: true,
      bps: [1993],
    },
    {
      id: "response-android-text-resizing",
      text: "Text cannot be resized to 200%",
      issue:
        "There is content that disappears, overlaps, or is cut off when the font size is increased by 200%. Examples include:\n- ",
      impact:
        "Users with low vision who need to resize text will be prevented from accessing this content.",
      recommendation:
        "Provide for user control of font size. Users must be able to resize text up to 200%. Allow the app's text to resize according to the font size set in the OS settings.",
      compliantExample: "",
      keepElement: true,
      keepAttribute: true,
      bps: [1995],
    },
    {
      id: "response-audio-plays-automatically",
      text: "Audio plays automatically",
      issue:
        "There is audio that is played automatically when the page loads. Examples include:\n- ",
      impact:
        "Screen reader users may have difficulty hearing speech output over autoplaying audio. Users with cognitive disabilities may be distracted by the audio.",
      recommendation:
        "Ensure audio is not played automatically on load. If audio content must load automatically, ensure the audio output plays for a maximum of three seconds or that there is a mechanism near the top of the page to stop or pause the audio.",
      compliantExample: "",
      keepElement: true,
      keepAttribute: true,
      bps: [2042],
    },
    {
      id: "response-captions-missing",
      text: "Captions missing",
      issue:
        "There are videos with audio that have no captions. Examples include:\n- ",
      impact:
        "Users who are deaf or hard of hearing will be prevented from accessing this content.",
      recommendation:
        "Provide synchronized captions for video (which includes audio) or other multimedia. This includes all spoken language as well as music and sounds pertinent to the content of the video.",
      compliantExample: "N/A",
      keepElement: true,
      keepAttribute: true,
      bps: [2049],
    },
    {
      id: "response-inaccurate-captions",
      text: "Inaccurate captions",
      issue:
        "There are captions that inaccurately reflect the contents of the video. Examples include:\n- ",
      impact:
        "Users who are deaf or hard of hearing will be unable to receive an accurate impression of the contents of the video.",
      recommendation:
        "Provide synchronized captions for video (which includes audio) or other multimedia. Captions must accurately represent the audio content in the video.",
      compliantExample: "N/A",
      keepElement: true,
      keepAttribute: true,
      bps: [2049],
    },
    {
      id: "response-android-images-of-text",
      text: "Images of text",
      issue:
        "There is text created with images of text rather than actual text elements. Examples include:\n- ",
      impact:
        "Users with low vision and users with cognitive disabilities will be unable to modify or enlarge this text.",
      recommendation:
        "Ensure text is used instead of images of text when technology allows. Common exceptions include logotypes or images of single letters.",
      compliantExample: "",
      keepElement: true,
      keepAttribute: true,
      bps: [2264],
    },
    {
      id: "response-ios-images-of-text",
      text: "Images of text",
      issue:
        "There is text created with images of text rather than actual text elements. Examples include:\n- ",
      impact:
        "Users with low vision and users with cognitive disabilities will be unable to modify or enlarge this text.",
      recommendation:
        "Ensure text is used instead of images of text when technology allows. Common exceptions include logotypes or images of single letters.",
      compliantExample: "",
      keepElement: true,
      keepAttribute: true,
      bps: [2265],
    },
    {
      id: "response-avoid-placeholder-to-label-input",
      text: "Placeholder text is used to label or explain input",
      issue:
        "There are form fields that rely on the placeholder attribute to supply their accessible name. Examples include:\n- ",
      impact:
        "Users with cognitive disabilities may be unable to determine the purpose of the field after the placeholder disappears. Some assistive technologies will not use the placeholder attribute as a field's accessible name, so screen reader users will have difficulty determining what fields are for and speech input users will have difficulty navigating to them.",
      recommendation:
        "Avoid use of placeholder values to label or explain input.\n\nLabels must meet the following requirements:\n- The label must be visible.\n- The label must be persistent. That is, a label must not disappear when text is entered into the field or an option is selected.\n- The label must be programmatically associated with the form field. The most common way to do this is with a <label> element with a for attribute set to the ID of the field.\n- The label must provide the accessible name of the field, or the label's exact text must be included in the accessible name.",
      compliantExample: "",
      keepElement: true,
      keepAttribute: true,
      bps: [2440],
    },
    {
      id: "response-ios-implicit-headings",
      text: "Implicit headings",
      issue:
        "There is content that functions as a heading but is not marked as a heading. Examples include:\n- ",
      impact:
        "Screen reader users will have difficulty efficiently navigating the screen.",
      recommendation:
        "Ensure headings are denoted through structure and not implicitly. Set a UIAccessibilityTraitHeader trait on elements that function as headings.",
      compliantExample: "",
      keepElement: true,
      keepAttribute: true,
      bps: [2493],
    },
    {
      id: "response-non-unique-nav-name",
      text: "Navigation without unique name",
      issue:
        "Multiple <nav> elements are present in the page, but they do not each have accessible names. Examples include:\n- ",
      impact:
        "Screen reader users will have difficulty distinguishing between these regions.",
      recommendation:
        "Ensure ARIA regions, landmarks and HTML sections are identifiable. When multiple <nav> elements appear on the same page, ensure that they each have an accessible name. This can be set with aria-labelledby (if there is visible text naming the region) or aria-label (if no visual label is present).",
      compliantExample: "",
      keepElement: true,
      keepAttribute: true,
      bps: [2519],
    },
    {
      id: "response-non-unique-aside-name",
      text: "Aside without unique name",
      issue:
        "Multiple <aside> elements are present in the page, but they do not each have accessible names. Examples include:\n- ",
      impact:
        "Screen reader users will have difficulty distinguishing between these regions.",
      recommendation:
        "Ensure ARIA regions, landmarks and HTML sections are identifiable. When multiple <aside> elements appear on the same page, ensure that they each have an accessible name. This can be set with aria-labelledby (if there is visible text naming the region) or aria-label (if no visual label is present).",
      compliantExample: "",
      keepElement: true,
      keepAttribute: true,
      bps: [2519],
    },
    {
      id: "response-non-unique-region-name",
      text: "Region without name",
      issue:
        'There are role="region" elements with no accessible names. Examples include:\n- ',
      impact:
        "Screen reader users will be unable to determine the purpose of these regions.",
      recommendation:
        'Ensure ARIA regions, landmarks and HTML sections are identifiable. Elements with role="region" must have an accessible name set with aria-label or aria-labelledby.',
      compliantExample: "",
      keepElement: true,
      keepAttribute: true,
      bps: [2519],
    },
    {
      id: "response-ios-keyboard-inaccessible",
      text: "Content that cannot receive keyboard focus",
      issue:
        "There are controls that cannot be navigated to with the keyboard. Examples include:\n- ",
      impact: "Keyboard users will be prevented from accessing these controls.",
      recommendation:
        "Ensure all input elements and controls can receive focus. This can generally be accomplished by using standard input controls or supporting becoming a first responder on custom input fields.",
      compliantExample: "",
      keepElement: true,
      keepAttribute: true,
      bps: [2520],
    },
    {
      id: "response-progress-accessible-name-missing",
      text: "Progress accessible name missing",
      issue:
        "There are <progress> elements without accessible names. Examples include:\n- ",
      impact:
        "Screen reader users will not know the purpose of these progress bars.",
      recommendation:
        "Provide accessible names for progress bars and meters. Use an aria-label, aria-labelledby, or title attribute on the element to provide the accessible name.",
      compliantExample: "",
      keepElement: true,
      keepAttribute: true,
      bps: [2554],
    },
    {
      id: "response-ios-loading",
      text: "Loading indicator",
      issue:
        "There are loading indicators that are not announced for screen reader users. Examples include:\n- ",
      impact:
        "Screen reader users will be unaware when the screen is in a loading state.",
      recommendation:
        "Provide an accessible alert method for content changes that occur without explicit user knowledge. Post a UIAccessibilityLayoutChangedNotification when this indicator appears.",
      compliantExample: "",
      keepElement: true,
      keepAttribute: true,
      bps: [2561],
    },
    {
      id: "response-android-loading",
      text: "Loading indicator",
      issue:
        "There are loading indicators that are not announced for screen reader users. Examples include:\n- ",
      impact:
        "Screen reader users will be unaware when the screen is in a loading state.",
      recommendation:
        'Provide an accessible alert method for content changes that occur without explicit user knowledge.\n\nSet an accessibilityLiveRegion attribute on the loading element to "polite" or use the announceForAccessibility() method.',
      compliantExample: "",
      keepElement: true,
      keepAttribute: true,
      bps: [2562],
    },
    {
      id: "response-icon-fonts-without-text-equivalent",
      text: "Font icons without textual equivalents",
      issue:
        "There are meaningful font icons with no textual equivalents. Examples include:\n- ",
      impact:
        "Screen reader users will be unable to determine what these images represent.",
      recommendation:
        'Provide text equivalents for icon fonts. Font icon pseudo-elements must be set apart in their own real element, such as a <span>. To add a textual equivalent, add role="img" to the element and an aria-label attribute set to an appropriate textual description.',
      compliantExample: "",
      keepElement: true,
      keepAttribute: true,
      bps: [2607],
    },
    {
      id: "response-decorative-font-icons",
      text: "Decorative font icons",
      issue:
        "There are decorative font icons that are exposed to screen readers. Examples include:\n- ",
      impact:
        "Screen readers may announce this content by its Unicode name. This gives screen reader users confusing and irrelevant information.",
      recommendation:
        'Provide text equivalents for icon fonts. Font icon pseudo-elements must be set apart in their own real element, such as a <span>. To mark the icon as decorative, set aria-hidden="true" on this element.',
      compliantExample: "",
      keepElement: true,
      keepAttribute: true,
      bps: [2607],
    },
    {
      id: "response-android-focusable-containers",
      text: "Focusable containers",
      issue: "There are focusable containers. Examples include:\n- ",
      impact:
        "Static content within focusable containers cannot be focused, so screen reader users will not be able to access this content.",
      recommendation:
        "Avoid making containers focusable. This can usually be achieved by removing any android:focusable or android:contentDescription properties that are set on the container.",
      compliantExample: "",
      keepElement: true,
      keepAttribute: true,
      bps: [2617],
    },
    {
      id: "response-ios-focusable-containers",
      text: "Focusable containers",
      issue: "There are focusable containers. Examples include:\n- ",
      impact:
        "Some content within focusable containers cannot be focused, so screen reader users will not be able to access it.",
      recommendation:
        "Ensure container views themselves are not accessible. Set isAccessibilityElement to NO on the container.",
      compliantExample: "",
      keepElement: true,
      keepAttribute: true,
      bps: [2619],
    },
    {
      id: "response-pdf-layout-tables",
      text: "Layout tables",
      issue:
        "There are Table tags used for layout purposes. Examples include:\n- ",
      impact:
        "Screen readers will treat this content as a data table, causing confusion about its layout and impeding navigation.",
      recommendation:
        "Avoid using tables for non-tabular data. Convert this content into other semantically appropriate tags.",
      compliantExample: "",
      keepElement: true,
      keepAttribute: true,
      bps: [2621],
    },
    {
      id: "response-form-fields-missing-autocomplete",
      text: "Form fields missing autocomplete",
      issue:
        "There are common form controls that lack a programmatic way to communicate purpose, such as an autocomplete attribute. Examples include:\n- ",
      impact:
        "Users with cognitive and motor disabilities will be unable to use autofill form features to quickly prefill common form fields. Additionally, some users with cognitive disabilities use assistive technologies that add icons next to common form fields. This allows them to identify the field's purpose more easily. When the input purpose is not programmatically indicated, these icons will not be displayed, so these users will have difficulty determining the fields' purpose.",
      recommendation:
        "Ensure that common input fields allow autocomplete and use standard autocomplete values.\n\nCommon inputs include names, emails, passwords, and addresses, among others. For a full list of values, see the WCAG 2.1 standard: https://www.w3.org/TR/WCAG21/#input-purposes. ",
      compliantExample: "",
      keepElement: true,
      keepAttribute: true,
      bps: [2891],
    },
    {
      id: "response-reflow-content-loss",
      text: "Reflow content loss",
      issue:
        "There is content that disappears, overlaps, is cut off, or requires horizontal scrolling to view when the page has a viewport width of 320 CSS pixels. Examples include:\n- ",
      impact:
        "Users with low vision who need to resize text will be prevented from accessing this content.",
      recommendation:
        "Ensure pages reflow without requiring two-dimensional scrolling without loss of content or functionality. When the page has a viewport width of 320 CSS pixels, all content and functionality must still be available without requiring horizontal scrolling.\n\nMoving content to an accessible show/hide control, such as a hamburger menu, is acceptable.\n\nContent that requires two dimensions to be understood, such as a map or data table, is exempt from this requirement.",
      compliantExample: "",
      keepElement: true,
      keepAttribute: true,
      bps: [2892],
    },
    {
      id: "response-reflow-tiny",
      text: "Text unreadably small",
      issue:
        "Content is unreadably small when the viewport width is set to 320 pixels.",
      impact:
        "Users with low vision who need to resize text will be prevented from accessing this content.",
      recommendation:
        "Ensure pages reflow without requiring two-dimensional scrolling without loss of content or functionality. When the page has a viewport width of 320 CSS pixels, all content and functionality must still be available without requiring horizontal scrolling.\n\nMoving content to an accessible show/hide control, such as a hamburger menu, is acceptable.\n\nContent that requires two dimensions to be understood, such as a map or data table, is exempt from this requirement.",
      compliantExample: "",
      keepElement: true,
      keepAttribute: true,
      bps: [2892],
    },
    {
      id: "response-multipoint-path-based-gestures-required",
      text: "Multipoint path-based gestures required",
      issue:
        "There is functionality that requires multipoint and/or path-based gestures. Examples include:\n- ",
      impact:
        "Users with dexterity or mobility disabilities may be unable to perform these gestures.",
      recommendation:
        "Ensure that functionality can be operated through a single pointer except when a multi-point or path-based gesture is essential. Multipoint gestures include any action conducted with multiple fingers, such as multi-finger taps and pinching to zoom. Path-based gestures include specifically drawn shapes or patterns. Essential applications for path-based gestures include signatures and artistic drawing. Instead of relying on multipoint or path-based gestures, use single-point activation instead. Single-point activation includes tapping, double-tapping, and long-presses.",
      compliantExample: "",
      keepElement: true,
      keepAttribute: true,
      bps: [2893],
    },
    {
      id: "response-single-point-activation-cannot-be-cancelled",
      text: "Single-point activation cannot be cancelled",
      issue:
        "There are controls that are triggered by the mousedown or touchdown JavaScript events. Examples include:\n- ",
      impact:
        "Users with disabilities may accidentally trigger touch or mouse events with unwanted results.",
      recommendation:
        "Ensure events triggered by single-point activation can be cancelled. Use the up event is used to reverse the down event effects if the user has moved off of the target area of the control, or do not rely on the down event for activation unless other up event functionality is essential. When completion of the event is on the up event, such as a drag, make sure users can abort or undo the action.",
      compliantExample: "",
      keepElement: true,
      keepAttribute: true,
      bps: [2894],
    },
    {
      id: "response-audio-descriptions-for-visual-only-content-missing",
      text: "Audio descriptions missing",
      issue:
        "There are prerecorded videos with audio that do not have audio descriptions. Examples include:\n- ",
      impact:
        "Users who are blind will be prevented from accessing important visual information provided in the video.",
      recommendation:
        "Provide synchronized audio description for video (which includes audio) or other multimedia. Audio description must accurately convey all important visual information, such as actions or unspoken text.",
      compliantExample: "N/A",
      keepElement: true,
      keepAttribute: true,
      bps: [2895],
    },
    {
      id: "response-text-spacing-content-loss",
      text: "Text spacing content loss",
      issue:
        "There is content that disappears, overlaps, or is cut off when viewing the page with custom text spacing. Examples include:\n- ",
      impact:
        "Users with low vision and users with dyslexia will have difficulty reading this content.",
      recommendation:
        "Ensure that content and functionality is available when the user overrides text spacing properties.\n\nContent must adapt up to the following specific spacing requirements identified in WCAG 2.1:\n- Line height must be able to adapt to 1.5 times the font size.\n- Letter spacing must be able to adapt to 0.12 times the font size.\n- Word spacing must be able to adapt to 0.16 times the font size.\n- Spacing underneath paragraphs must be able to adapt to 2 times the font size.\n\nFor assistance testing content against this standard, use a text spacing bookmarklet: https://labs.levelaccess.com/index.php/Text_Spacing_Favlet",
      compliantExample: "",
      keepElement: true,
      keepAttribute: true,
      bps: [2896],
    },
    {
      id: "response-motion-required-to-use-function",
      text: "Motion required to use function",
      issue:
        "There is functionality that is operable through device motion alone. Examples include:\n- ",
      impact:
        "Users with dexterity and mobility disabilities may be unable to perform these actions, or they may inadvertently activate it.",
      recommendation:
        "Ensure that motion is not the only method to activate user interface components. Provide a means to activate the functionality by other means, like a user interface control. If motion is essential, then it is exempt. For example, functions that require sensor input, such as pedometer or geolocation sensors, are exempt. Additionally, allow users to turn off motion actuation to prevent accidental activation.",
      compliantExample: "",
      keepElement: true,
      keepAttribute: true,
      bps: [2899],
    },
    {
      id: "response-orientation-locked",
      text: "Orientation locked",
      issue:
        "The application does not allow both portrait and landscape orientation views.",
      impact:
        "Users with a mounted device in a different orientation, such as some wheelchair users, will have difficulty viewing and interacting with the app.",
      recommendation:
        "Avoid restricting the operation or viewing of content in different display orientations.",
      compliantExample: "",
      keepElement: true,
      keepAttribute: true,
      bps: [2900],
    },
    {
      id: "response-status-message-not-communicated",
      text: "Status message not communicated",
      issue:
        "There are dynamically changing content areas that do not indicate live regions. Examples include:\n- ",
      impact:
        "Screen reader users will be unaware of important updates to this content when they occur.",
      recommendation:
        'Ensure that status messages can be determined programmatically without receiving focus. This can be done with ARIA live regions. Live regions can be created by adding a role attribute set to "log", "status", "alert", "progressbar", "marquee", or "timer" as appropriate. Alternatively, custom behavior can be created by using the aria-live, aria-atomic, and aria-relevant attributes. Text injected into this live region element will be announced by screen readers.\n\nImportantly, the element with the ARIA live attributes must be available when the page loads. Otherwise, many screen readers will be unable to detect updates to the element. Additionally, the element must be empty on page load unless an immediate screen reader announcement is desired.',
      compliantExample: "",
      keepElement: true,
      keepAttribute: true,
      bps: [2901],
    },
    {
      id: "response-status-message-loading",
      text: "Loading status message",
      issue:
        "There are loading indicators that are not announced for screen reader users. Examples include:\n- ",
      impact:
        "Screen reader users will be unaware when the page is in a loading state.",
      recommendation:
        'Ensure that status messages can be determined programmatically without receiving focus.\n\nFor a loading indicator, the best way to do this is to use a "status" ARIA live region. To create such a region:\n- Ensure that a visually hidden container <div> is present when the page loads. The <div> must be empty unless a visual loading indicator is visible.\n- Add a role="status" attribute to this <div>.\n- When the page is in a loading state, use JavaScript to inject text into this <div role="status"> that describes the loading behavior (e.g. "Loading more posts", "Processing email", etc.). If properly configured, this text will be announced to screen readers.',
      compliantExample: "",
      keepElement: true,
      keepAttribute: true,
      bps: [2901],
    },
    {
      id: "response-status-message-search-results",
      text: "Search results status message",
      issue:
        "There are search results that appear but are not announced to screen reader users. Examples include:\n- ",
      impact:
        "Screen reader users will be unaware that these search suggestions have appeared.",
      recommendation:
        'Ensure that status messages can be determined programmatically without receiving focus.\n\nFor dynamically updated search results, the best way to do this is to use a "status" ARIA live region. To create such a region:\n- Ensure that a visually hidden container <div> is present when the page loads. The <div> must be empty until results are returned.\n- Add a role="status" attribute to this <div>.\n- When the page is in a loading state, use JavaScript to inject text into this <div role="status"> that describes the results available (e.g., "83 results available" or "Results available"). If properly configured, this text will be announced to screen readers.',
      compliantExample: "",
      keepElement: true,
      keepAttribute: true,
      bps: [2901],
    },
    {
      id: "response-shortcuts-cannot-reconfigure-or-deactivated",
      text: "Character key shortcuts",
      issue:
        "There are character-only key shortcuts that can't be altered or turned off. Examples include:\n- ",
      impact:
        "Speech input users will inadvertently activate the character shortcut whenever they dictate text or speak a command that contains the characters in the shortcut.",
      recommendation:
        "Ensure that character key shortcuts without modifiers can be reconfigured or deactivated. Unmodified character key shortcuts are shortcuts that use only letter, punctuation, number, or symbol characters. They do not include shortcuts that use Ctrl, Alt, and other non-printable characters. They also do not include shortcuts that are only available when a control has keyboard focus.\n\nTo resolve the issue, provide users a way to turn off or change the shortcut.",
      compliantExample: "",
      keepElement: true,
      keepAttribute: true,
      bps: [2902],
    },
    {
      id: "response-form-label-in-name-missing",
      text: "Form label in name missing",
      issue:
        "There are controls with accessible names that do not include the text of their visual labels. Examples include:\n- ",
      impact:
        "Speech input users will have difficulty navigating to these controls.",
      recommendation:
        "Ensure the visible text label for a control is included in the control's accessible name.",
      compliantExample: "",
      keepElement: true,
      keepAttribute: true,
      bps: [2903],
    },
    {
      id: "response-hover-or-focus-content-cannot-be-dismissed",
      text: "Hover or focus content cannot be dismissed",
      issue:
        "There is content that appears on hover and/or focus, obscures other content, and cannot be dismissed without moving focus or the cursor. Examples include:\n- ",
      impact:
        "Screen magnification users will have difficulty moving the cursor or focus off the trigger while still keeping the content behind the revealed content in view. Keyboard users will be unable to review the content behind the revealed content.",
      recommendation:
        "Ensure that content that appears on hover or focus may be dismissed by the user. The best way to do this is to allow the hover/focus content to be hidden with the Esc key.",
      compliantExample: "",
      keepElement: true,
      keepAttribute: true,
      bps: [2904],
    },
    {
      id: "response-hover-or-focus-content-disappears-when-pointer-moves-over",
      text: "Hover or focus content disappears when pointer moves over",
      issue:
        "There is content that appears on hover but cannot be moved over with a pointer without disappearing. Examples include:\n- ",
      impact:
        "Screen magnification users will be unable to review the revealed content.",
      recommendation:
        "Ensure that content that appears on hover may be moved over with a pointer without disappearing. For example, users must be able to hover over tooltips without the tooltip disappearing.",
      compliantExample: "",
      keepElement: true,
      keepAttribute: true,
      bps: [2905],
    },
    {
      id: "response-active-interface-contrast-insufficient",
      text: "Active interface contrast insufficient",
      issue:
        "There are user interface components with a contrast ratio below 3.00:1.\n\nForeground color: \nBackground color: \nContrast ratio: \n\nExamples of this user interface component include:\n- ",
      impact:
        "Users with low vision will have difficulty identifying this content.",
      recommendation:
        'Ensure active user interface components have sufficient contrast. The required minimum contrast ratio is 3.00:1.\n\nCommon examples of qualifying components include text field borders, check marks for checkboxes, fillings for radio buttons, focus indicators, and icon-only controls.\n\nFor borders, the "adjacent color" can be the color that touches the outside of the border or the color that touches the inside of the border. Contrast with both is not required.\n\nDisabled controls that cannot be navigated to with the keyboard are exempt from this requirement.\n\nRefer to the Accessible Color Picker extension or Color Contrast Checker site for assistance: https://www.accessibility.dev/',
      compliantExample: "N/A",
      keepElement: true,
      keepAttribute: true,
      bps: [2909],
    },
    {
      id: "response-pdf-active-interface-contrast-insufficient",
      text: "Active interface contrast insufficient",
      issue:
        "There are user interface components with a contrast ratio below 3.00:1.\n\nForeground color: \nBackground color: \nContrast ratio: \n\nExamples of this user interface component include:\n- ",
      impact:
        "Users with low vision will have difficulty identifying this content.",
      recommendation:
        'Ensure active user interface components have sufficient contrast. The required minimum contrast ratio is 3.00:1.\n\nCommon examples of qualifying components include text field borders, check marks for checkboxes, fillings for radio buttons, focus indicators, and icon-only controls.\n\nFor borders, the "adjacent color" can be the color that touches the outside of the border or the color that touches the inside of the border. Contrast with both is not required.\n\nDisabled controls that cannot be navigated to with the keyboard are exempt from this requirement.\n\nRefer to the Accessible Color Picker extension or Color Contrast Checker site for assistance: https://www.accessibility.dev/',
      compliantExample: "N/A",
      keepElement: true,
      keepAttribute: true,
      bps: [2927],
    },
    {
      id: "response-android-active-interface-contrast-insufficient",
      text: "Active interface contrast insufficient",
      issue:
        "There are user interface components with a contrast ratio below 3.00:1.\n\nForeground color: \nBackground color: \nContrast ratio: \n\nExamples of this user interface component include:\n- ",
      impact:
        "Users with low vision will have difficulty identifying this content.",
      recommendation:
        'Ensure active user interface components have sufficient contrast. The required minimum contrast ratio is 3.00:1.\n\nCommon examples of qualifying components include text field borders, check marks for checkboxes, fillings for radio buttons, focus indicators, and icon-only controls.\n\nFor borders, the "adjacent color" can be the color that touches the outside of the border or the color that touches the inside of the border. Contrast with both is not required.\n\nDisabled controls that cannot be navigated to with the keyboard are exempt from this requirement.\n\nRefer to the Accessible Color Picker extension or Color Contrast Checker site for assistance: https://www.accessibility.dev/',
      compliantExample: "N/A",
      keepElement: true,
      keepAttribute: true,
      bps: [2930],
    },
    {
      id: "response-ios-active-interface-contrast-insufficient",
      text: "Active interface contrast insufficient",
      issue:
        "There are user interface components with a contrast ratio below 3.00:1.\n\nForeground color: \nBackground color: \nContrast ratio: \n\nExamples of this user interface component include:\n- ",
      impact:
        "Users with low vision will have difficulty identifying this content.",
      recommendation:
        'Ensure active user interface components have sufficient contrast. The required minimum contrast ratio is 3.00:1.\n\nCommon examples of qualifying components include text field borders, check marks for checkboxes, fillings for radio buttons, focus indicators, and icon-only controls.\n\nFor borders, the "adjacent color" can be the color that touches the outside of the border or the color that touches the inside of the border. Contrast with both is not required.\n\nDisabled controls that cannot be navigated to with the keyboard are exempt from this requirement.\n\nRefer to the Accessible Color Picker extension or Color Contrast Checker site for assistance: https://www.accessibility.dev/',
      compliantExample: "N/A",
      keepElement: true,
      keepAttribute: true,
      bps: [2933],
    },
    {
      id: "response-graphical-object-contrast-insufficient",
      text: "Graphical object contrast insufficient",
      issue:
        "There are graphical objects with a color contrast ratio below 3.00:1.\n\nForeground color: \nBackground color: \nContrast ratio: \n\nExamples include:\n- ",
      impact:
        "Users with low vision will have difficulty identifying this content.",
      recommendation:
        "Ensure parts of graphical objects essential for understanding content have sufficient contrast. The required minimum contrast ratio is 3.00:1.\n\nCommon examples of qualifying objects include lines in a chart, meaningful icons, and annotations within an image.\n\nGraphics that require particular presentation to preserve their meaning are exempt from this requirement.\n\nTo evaluate color contrast, see the Accessible Color Picker extension: https://www.accessibility.dev/",
      compliantExample: "N/A",
      keepElement: true,
      keepAttribute: true,
      bps: [2910],
    },
    {
      id: "response-pdf-graphical-object-contrast-insufficient",
      text: "Graphical object contrast insufficient",
      issue:
        "There are graphical objects with a color contrast ratio below 3.00:1.\n\nForeground color: \nBackground color: \nContrast ratio: \n\nExamples include:\n- ",
      impact:
        "Users with low vision will have difficulty identifying this content.",
      recommendation:
        "Ensure parts of graphical objects essential for understanding content have sufficient contrast. The required minimum contrast ratio is 3.00:1.\n\nCommon examples of qualifying objects include lines in a chart, meaningful icons, and annotations within an image.\n\nGraphics that require particular presentation to preserve their meaning are exempt from this requirement.\n\nTo evaluate color contrast, see the Accessible Color Picker extension: https://www.accessibility.dev/",
      compliantExample: "N/A",
      keepElement: true,
      keepAttribute: true,
      bps: [2941],
    },
    {
      id: "response-ios-graphical-object-contrast-insufficient",
      text: "Graphical object contrast insufficient",
      issue:
        "There are graphical objects with a color contrast ratio below 3.00:1.\n\nForeground color: \nBackground color: \nContrast ratio: \n\nExamples include:\n- ",
      impact:
        "Users with low vision will have difficulty identifying this content.",
      recommendation:
        "Ensure parts of graphical objects essential for understanding content have sufficient contrast. The required minimum contrast ratio is 3.00:1.\n\nCommon examples of qualifying objects include lines in a chart, meaningful icons, and annotations within an image.\n\nGraphics that require particular presentation to preserve their meaning are exempt from this requirement.\n\nTo evaluate color contrast, see the Accessible Color Picker extension: https://www.accessibility.dev/",
      compliantExample: "N/A",
      keepElement: true,
      keepAttribute: true,
      bps: [2944],
    },
    {
      id: "response-android-graphical-object-contrast-insufficient",
      text: "Graphical object contrast insufficient",
      issue:
        "There are graphical objects with a color contrast ratio below 3.00:1.\n\nForeground color: \nBackground color: \nContrast ratio: \n\nExamples include:\n- ",
      impact:
        "Users with low vision will have difficulty identifying this content.",
      recommendation:
        "Ensure parts of graphical objects essential for understanding content have sufficient contrast. The required minimum contrast ratio is 3.00:1.\n\nCommon examples of qualifying objects include lines in a chart, meaningful icons, and annotations within an image.\n\nGraphics that require particular presentation to preserve their meaning are exempt from this requirement.\n\nTo evaluate color contrast, see the Accessible Color Picker extension: https://www.accessibility.dev/",
      compliantExample: "N/A",
      keepElement: true,
      keepAttribute: true,
      bps: [2947],
    },
    {
      id: "response-hover-or-focus-content-disappears-without-user-action",
      text: "Hover or focus content disappears without user action",
      issue:
        "There is content that appears on hover and/or focus that disappears without user initiation (e.g. focusing away, moving pointer away or hitting the ESC key). Examples include:",
      impact:
        "When content that is triggered by focus or hover and is not persistent with one of the conditions listed above, users with low vision may not have sufficient time to read the content before it disappears.",
      recommendation:
        "Ensure that the new content that appears on hover and/or focus remains visible until the pointer or keyboard focus is moved away from the triggering control, the new content is dismissed, or the new content is no longer relevant.",
      compliantExample: "",
      keepElement: true,
      keepAttribute: true,
      bps: [2912],
    },
    {
      id: "response-pdf-label-in-name",
      text: "Accessible name does not include visible text",
      issue:
        "There are controls with accessible names that do not include the text of their visual labels. Examples include:\n- ",
      impact:
        "Speech input users will have difficulty navigating to these controls.",
      recommendation:
        'Ensure the visible text label for a control is included in the control\'s accessible name.\n\nTo check the accessible name of form controls:\n1. Open the "Prepare Form" tools pane.\n2. Locate the field you want to add an accessible name to in the "FIELDS" section of the right-hand pane.\n3. Open the context menu (right-click) on the form field and choose "Properties."\n4. In the dialog that appears, review the "Tooltip" field. For text, dropdown, signature, and date fields, this field must contain the exact visible text of the field and any instructional text for that specific field, as well as any additional text needed to distinguish the field from other fields with the same name. For radio buttons, this field must contain the exact text of the grouping question for the radio buttons and not the text of the radio buttons themselves. For checkboxes, this must contain both the grouping question AND the visible text for the individual checkbox.\n5. If the form field is a radio button, go to the "Options" tab in the dialog. Review the contents of the "Radio Button Choice" field.\n\nTo check the accessible names of links:\n1. Locate the Link tag in the Tags panel.\n2. Open the context menu for the Link tag and select "Properties".\n3. Review the "Actual Text" and "Alternate Text" fields.',
      compliantExample: "",
      keepElement: true,
      keepAttribute: true,
      bps: [2983],
    },
    {
      id: "response-android-label-in-name",
      text: "Accessible name does not include visible text",
      issue:
        "There are controls with accessible names that do not include the text of their visual labels. Examples include:\n- ",
      impact:
        "Speech input users will have difficulty navigating to these controls.",
      recommendation:
        "Ensure the visible text label for a control is included in the control's accessible name. Alter the android:contentDescription attribute to include all of the visual text of the control.",
      compliantExample: "",
      keepElement: true,
      keepAttribute: true,
      bps: [2986],
    },
    {
      id: "response-ios-label-in-name",
      text: "Accessible name does not include visible text",
      issue:
        "There are controls with accessible names that do not include the text of their visual labels. Examples include:\n- ",
      impact:
        "Speech input users will have difficulty navigating to these controls.",
      recommendation:
        "Ensure the visible text label for a control is included in the control's accessible name. Alter the accessibilityLabel property to include all of the visual text of the control.",
      compliantExample: "",
      keepElement: true,
      keepAttribute: true,
      bps: [2989],
    },
    {
      id: "response-android-orientation",
      text: "Content restricted to one orientation",
      issue: "The screen is restricted to portrait orientation.",
      impact:
        "Users with a mounted device in a different orientation, such as some wheelchair users, will have difficulty viewing and interacting with the app.",
      recommendation:
        "Avoid restricting the operation or viewing of content in different display orientations. Reflow the content of the screen according to the orientation communicated by the OS.",
      compliantExample: "",
      keepElement: true,
      keepAttribute: true,
      bps: [3112],
    },
    {
      id: "response-ios-orientation",
      text: "Content restricted to one orientation",
      issue: "The screen is restricted to portrait orientation.",
      impact:
        "Users with a mounted device in a different orientation, such as some wheelchair users, will have difficulty viewing and interacting with the app.",
      recommendation:
        "Avoid restricting the operation or viewing of content in different display orientations. Reflow the content of the screen according to the orientation communicated by the OS.",
      compliantExample: "",
      keepElement: true,
      keepAttribute: true,
      bps: [3115],
    },
    {
      id: "response-no-keyboard-interactivity",
      text: "Keyboard interactive functionality",
      issue:
        "There are interactive controls that cannot be navigated to and/or operated with the keyboard alone. Examples include:\n- ",
      impact:
        "Keyboard users will be prevented from accessing the functionality provided by these controls.",
      recommendation:
        'Ensure all interactive functionality is operable with the keyboard. The best way to accomplish this is by using appropriate native controls, which come with keyboard functionality built in.\n\nIf using a native control is not possible, the control must have tabindex="0" and have JavaScript event listeners that allow the control to be activated when Enter is pressed.',
      compliantExample: "",
      keepElement: true,
      keepAttribute: true,
      bps: [3159],
    },
    {
      id: "response-android-implicit-heading",
      text: "Implicit headings",
      issue:
        "There is content that functions as a heading but is not marked as a heading. Examples include:\n- ",
      impact:
        "Screen reader users will have difficulty efficiently navigating the screen.",
      recommendation:
        'Ensure headings are denoted through structure and not implicitly. Set the android:accessibilityHeading attribute to "true" on elements meant to serve as headings.',
      compliantExample: "",
      keepElement: true,
      keepAttribute: true,
      bps: [3196],
    },
    {
      id: "response-web-dragging-movements",
      text: "Dragging movements",
      issue:
        "There is functionality that uses a dragging movement with no other single-pointer trigger. Examples include:\n- ",
      impact:
        "Users with dexterity and mobility disabilities may be unable to perform dragging movements to use this functionality.",
      recommendation:
        "Ensure all functionality that uses a dragging movement can be operated by a single pointer without dragging. One way to meet this requirement is to require users to perform a series of single-pointer, non-path-based interactions instead of dragging. Keyboard alternatives are not sufficient to meet this requirement. Exceptions include freeform drawing or games that require dragging.",
      compliantExample: "",
      keepElement: true,
      keepAttribute: true,
      bps: [3206],
    },
    {
      id: "response-web-target-minimum",
      text: "Minimum target size",
      issue:
        "There are pointer targets that are too small. Examples include:\n- ",
      impact:
        "Users with dexterity disabilities may be unable to activate these controls.",
      recommendation:
        "Provide a sufficient minimum area for pointer targets. Pointer targets must have an area with a width and height of at least 24 CSS pixels. Exemptions include targets whose farthest point is at least 24 pixels away from the nearest point of all other adjacent targets, targets that are in line with text, targets that are controlled by the user agent and not modified by the author, targets whose presentation is essential to convey accurate information, or targets whose presentation is legally required.",
      compliantExample: "",
      keepElement: true,
      keepAttribute: true,
      bps: [3207],
    },
    {
      id: "response-web-consistent-help",
      text: "Inconsistently located help",
      issue: "Help is not consistently located across pages.",
      impact:
        "Users with cognitive disabilities may be unable to find help with tasks on the website.",
      recommendation:
        "Ensure that access to help is provided in the same relative order within a set of web pages. This applies to human contact details, such as an email, phone number, or hours of operation; human contact mechanisms, such as chat, contact forms, or social media; self-help options, such as FAQs or support pages; and fully automated contact mechanisms, such as chatbots. Common ways to meet this requirement include consistently putting links to help mechanisms in a footer, header, or navigation menu. Exceptions to this requirement include websites with no help, archival content, academic or certification testing applications, and non-web documents such as PDFs.",
      compliantExample: "",
      keepElement: true,
      keepAttribute: true,
      bps: [3209],
    },
    {
      id: "response-web-cognitive-authentication",
      text: "Sign-in requires cognitive test",
      issue: "The sign-in process requires a cognitive function test.",
      impact:
        "Users with cognitive disabilities may be unable to successfully complete a cognitive function test to sign in.",
      recommendation:
        "Ensure that each step of an authentication process has one method that does not require a cognitive function test. If authentication involves a cognitive function test, authors must offer at least one alternative method that does not rely on a cognitive function test. This applies to all steps in an authentication process, including multi-factor authentication (MFA). It also applies to email and password recovery processes.\n\nCommon examples of cognitive function tests include memorization, text transcription, use of correct spelling, calculations, puzzles, and username and password fields that disable copy-pasting. Additionally, many CAPTCHAs fall into this category, even if the site only requires them in certain situations. However, tests that require object recognition are exempt from this requirement.\n\nCommon ways to meet this requirement include enabling copy-paste or autofill on username/password fields; authentication via emailed links; WebAuthn or other methods that allow users to authenticate with a device instead of a username and password; third-party logins such as OAuth; connected hardware token MFA; and push notification MFA.",
      compliantExample: "",
      keepElement: true,
      keepAttribute: true,
      bps: [3210],
    },
    {
      id: "response-web-redundant-entry",
      text: "Redundant entry required",
      issue:
        "There are processes that require redundant entry of information. Examples include:\n- ",
      impact:
        "Users with cognitive disabilities may be unable to remember information that they previously entered into the form, so they may be prevented from completing the form.",
      recommendation:
        "Provide support for redundant entry of information within a process unless re-entry is essential. Common ways to meet this requirement include automatically populating information based on earlier answers or presenting information from an earlier step so that users can copy-paste it. Browser autofill functionality is not sufficient to meet this requirement.\n\nExceptions include information entered in an earlier user session, password re-entry when creating a new password or for security purposes, and memory games. It is also acceptable to require redundant entry if the redundant information is in a different format, such as an uploaded document.",
      compliantExample: "",
      keepElement: true,
      keepAttribute: true,
      bps: [3211],
    },
    {
      id: "response-web-obscured-focused-element",
      text: "Obscured focused element",
      issue:
        "There are focused elements that are fully obscured by other content. Examples include:\n- ",
      impact:
        "Keyboard users will have difficulty finding their position on the page.",
      recommendation:
        "Ensure keyboard-operable elements which have focus are not fully obscured. Examples include focusable content behind sticky headers/footers and non-modal dialogs. This requirement applies to each page variation, such as responsive breakpoints.\n\nIf the interface allows the user to move elements, only the first positions of the movable content must meet this requirement. However, authors must ensure that the first positions do not fully obscure focused elements even if users can move or resize the obscuring element.",
      compliantExample: "",
      keepElement: true,
      keepAttribute: true,
      bps: [3224],
    },
    {
      id: "response-web-focus-appearance",
      text: "Focus appearance",
      issue:
        "There are keyboard focus indicators that are too small or have insufficient contrast. Examples include:\n- ",
      impact:
        "Keyboard users, especially those with low vision, will have difficulty finding their position on the page.",
      recommendation:
        "Ensure keyboard focus indicators have sufficient size and contrast with focused and unfocused states and with adjacent component colors. The indicator must meet one or both of the following requirements:\n\n- The indicator must enclose the component. That is, the indicator must be a solid outline around the component with no dashes or dots. It must have a contrast ratio of at least 3:1 between the same pixels in the focused and unfocused states. It must also have a contrast ratio of at least 3:1 against adjacent non-focus-indicator colors.\n\n- Alternatively, an area of the focus indicator must be of a certain size. It must either be at least as large as the area of a 1 CSS-pixel-thick perimeter of the unfocused component, or at least as large as a 4-CSS-pixel-thick line along the shortest side of the minimum bounding box of the unfocused component. It must also have a contrast ratio of at least 3:1 between the same pixels in the focused and unfocused states. Finally, it must have a contrast ratio of at least 3:1 against adjacent non-focus-indicator colors, or it must have a width or height of at least 2 CSS pixels.\n\nFocus indicators do not have to meet these requirements if the author has not changed the focus indicator styles and the color behind the indicator.",
      compliantExample: "",
      keepElement: true,
      keepAttribute: true,
      bps: [3225],
    },
  ];
  return preferred;
}

// Related to the data, this filters the preferred list
function dataPreferredFiltered(bp) {
  const preferred = dataPreferred();
  const output = [];

  if (bp) {
    for (let i = 0; i < preferred.length; i++) {
      if (preferred[i].bps[0] === bp) {
        output.push(preferred[i]);
      }
    }
  }
  return output;
}
function dataCSS() {
  const cssArray = {
    // General CSS
    ".kpmAlt": "font-size: 0.8em;",
    ".kpmSmall": "font-size: 0.9em; line-height: 0.8em;",
    ".kpmButton": "margin: 0 0 0 0.25em !important;",
    ".kpmP":
      "margin: 0.25em 0 0.1em 0 !important; font-weight: bold !important",
    ".flex-center": "display: flex; align-items:center",
    ".right-margin": "margin-right: 3px !important;",
    'select[id^="violation_"]': "z-index: 1;",
    "#cancel":
      "background-color: #ff0000 !important; background-image: none !important;",
    "#cancel:hover":
      "background-color: #ddd !important; background-image: none !important;",

    // Change Level styles
    "td.actions": "text-align: right !important",
    "td.actions a": "padding: 0; margin: 0.25em 0 0 0;",
    ".large td, .ssb-datatable td, tbody th": "vertical-align: top !important;",
    "#menu_table_toolbar_actions a:hover": "text-decoration: none;",
    ".infopop": "display: none;",

    // New truncate on patterns
    "#view_violations_container .truncate":
      "text-overflow: ellipsis; overflow: visible !important; white-space: pre-wrap !important;",
    "#view_violations_container .wrap":
      "text-overflow: ellipsis; overflow: visible !important; white-space: pre-wrap !important;",

    // Inserted Header Links
    "a.kpmHeaderAnchor":
      "color: #fff; margin-right: 1em; font-size: 1.25em; font-weight: bold;",
    "a.kpmHeaderAnchor:hover": "color: #82E51C; text-decoration: none;",
    "a.kpmAnchor:hover": "background-color: #82E51C;",

    // Best Practice Buttons - Header Cells
    "th .modalButtons":
      "color: #fff; float: right; background-color: #552c9f; padding: 2px 2px; border-radius: 4px; margin: 0; font-size: 1.2em;",
    "th .modalButtons a":
      "min-height: 1em; min-width: 1em; color: #fff; margin: 0.5em;",
    "th .modalButtons a:hover": "color: #552c9f; outline: 1px solid #552c9f;",

    // View Module Best Practice rows
    "table tbody th:not(.table-cell-header)": "background: #D6DAF7;",
    "table tbody tr:nth-child(even) th:not(.table-cell-header)":
      "background: #D6DAF7;",

    // View All Instances Description column styling reset
    "table#instances": "border-collapse: collapse",
    "table#instances th[scope='row']":
      "font-weight: normal; border: 1px solid #ddd !important; background: inherit;",

    // Best Practice Buttons - Data Cells
    "td .modalButtons":
      "display: inline-block; color: #666; padding: 0; margin: 0; font-size: 1.2em;",
    "td .modalButtons a":
      "min-height: 1em; min-width: 1em; color: #666; margin: 0 0.25em;",
    "td .modalButtons a:hover": "color: #552c9f;",

    // Preferences Box
    ".kpmPrefsDiv":
      "clear: both; width: 100% !important; height: auto !important; min-height: auto !important; margin-top: 0.5em;",
    ".kpmPrefsDiv table, .kpmPrefsDiv table tr, .kpmPrefsDiv table td":
      "border: none !important; background: none !important;",
    ".kpmPrefsDiv table": "margin: 0; padding: 0; font-size: 0.9em;",
    ".kpmPrefsDiv td":
      "vertical-align: top; width: 33%; padding: 0.5em; height: auto !important;",
    ".kpmPrefsDiv td label": "font-weight: normal !important",
    "#kpmPrefs ul": "list-style-type: disc !important; margin: 0 0 0 1.4em;",
    "#kpmPrefs ul li ul":
      "list-style-type: circle !important; margin: 0 0 0 1em;",
    "#kpmPrefs .heading_container a:hover":
      "color: #82E51C; text-decoration: none;",
    "#kpmPrefs p": "margin: 0 !important; padding: 0 !important;",

    // Errors about content
    ".kpmAlert":
      "display: flex; gap: 0.3em; margin: 0 0 0.2em 0 !important; padding: 0.25em !important; font-weight: bold; font-size: 0.9em; color: #FFFFFF !important; background-color: #B60000;",
    ".kpmAlert > svg": "margin: 0.2em 0 0 0.1em;",

    // Warnings about content
    ".kpmWarning":
      "max-width: 120ch; text-wrap: wrap; margin: 0.3em 0 0.2em 0 !important; padding: 0.25em 0.5em !important; font-weight: bold; font-size: 0.9em; color: #000000 !important; background-color: #FFFFAF;",
    ".kpmWarning > svg": "margin: 0.2em 0 0 0.1em;",

    // Buttons
    "button:focus, a:focus, input:focus, select:focus, select > option:focus":
      "text-decoration: underline; outline: 3px solid #000;",
    ".kpmFirstButton": "margin: 0 !important; padding: 0.25em !important;",

    // Dropdown Navigation on add modal
    "#kpmNav, #kpmNav nav, #kpmNav ul, #kpmNav li": "z-index: 1000 !important;",
    "#kpmNav": "margin-top: 1em; margin-bottom: 1em;",
    "#kpmNav a": "text-decoration:none;",
    "#kpmNav ul": "background:#d7d7d7;list-style:none;margin:0;padding:0;",
    "#kpmNav li":
      "font-weight:bold; color:#000; background:#d7d7d7; display:block; float:left; padding:0.2rem 0.5rem; position:relative; text-decoration:none; transition-duration:0.5s; border:1px solid #000; border-right:none; text-align:center;",
    "#kpmNav li:last-child": "border-right: 1px solid #000;",
    "#kpmNav li a": "color:#000;",
    "#kpmNav li:hover, #kpmNav li:focus-within":
      "background:#5cd344; cursor:pointer;",
    "#kpmNav li:focus-within a": "outline:none;",
    "#kpmNav ul li ul":
      "background:#3359ec; visibility:hidden; opacity:0; position:absolute; transition:all 0.5s ease; margin-top:0.1rem; left:0; display:none;",
    "#kpmNav ul li:hover > ul, #kpmNav ul li:focus-within > ul, #kpmNav ul li ul:hover, #kpmNav ul li ul:focus":
      "visibility:visible; opacity:1; display:block;",
    "#kpmNav ul li ul li":
      "border:1px solid #000; border-bottom: none; line-height:1em; clear:both; width:100%; padding:0.3em; margin:0; text-align:left; font-weight:normal;",
    "#kpmNav ul li ul li:last-child": "border-bottom: 1px solid #000;",
    "#kpmNav ul li ul li.divider":
      "color:#fff; font-weight:bold; margin:0; padding:0.2em; background:#552c9f; text-align:center;",
    "#ampOptsInpt": "margin-bottom: 0.3em; width: 100%;",

    // Show Instances by BP Name
    ".bpHide": "display: none!important;",
    ".kpmFilterWraper":
      "margin: 1.5em 0 0 .25em; padding: 0.1em; float: right; width: 20%; text-align: center; border: 1px solid #d3d7dd; border-radius: 3px;",
    ".kpmFilterWraper input": "margin: 0.1em 0 .25em 0;",

    // Baseline Checklist
    "#kpmBaseline":
      "float: right !important; width: 30% !important; background-color: #fff !important;",
    "#kpmBaseline legend": "display: inline !important;",
    "#kpmBaseline legend a": "margin-left: 1em !important;",
    "#kpmBaseline legend a:hover":
      "text-decoration: none !important; background-color: #eee;",
    "#kpmBaseline #kpmBaselineBox":
      "overflow: auto !important; height: 10em !important;",
    "#kpmBaseline #kpmBaselineBox ul":
      "list-style-type: square !important; font-size: 0.7em !important; margin: 0 0 0 1em !important;",
    "#kpmBaseline #kpmBaselineBox ul li": "margin-left: 1em !important;",
    "#kpmBaseline #kpmBaselineFooter":
      "text-align: center !important; border-top: 1px solid #eee !important;",

    // Description Area Checkbox
    "#kpmDescPref": "float: right !important;",
    "#kpmDescPref label":
      "font-size: 0.6em !important; font-weight: normal !important;",

    // Page for all responses
    "#kpmAllResponsesPage": "padding: 2em;",
    "#kpmAllResponsesPage h2":
      "margin: 2em 0 0 0; border-bottom: 1px solid #000;",
    "#kpmAllResponsesPage h3": "margin: 0.5em 0 0 0;",

    /* Fix visually hidden blank lines that appear when copy-pasting near
         checkboxes */
    "table td:not(.actions)":
      "white-space: unset !important; word-wrap: unset !important",
  };
  // Description box on dashboard.
  if (!getCookieValue("kpmPref-fullDescription")) {
    cssArray[".content_container"] =
      "grid-template-rows: auto auto !important;";
    cssArray[".description"] = "height: auto !important;";
  }
  return cssArray;
}
function dataBaseline() {
  const blArray = [
    {
      key: "keyboardAccess",
      title: "Keyboard Access and interaction",
      subs: [
        "Ensure all interactive functionality is operable with the keyboard",
      ],
    },
    {
      key: "keyboardTrap",
      title: "Keyboard Trap",
      subs: ["Ensure keyboard focus is not trapped"],
    },
    {
      key: "focusOrder",
      title: "Focus Order",
      subs: [
        "Ensure the focus order of interactive elements on the page is logical",
      ],
    },
    {
      key: "focusVisible",
      title: "Focus Visible",
      subs: ["Ensure keyboard focus is indicated visually"],
    },
    {
      key: "focusIssues",
      title: "Focus Issues/movement on interaction",
      subs: [
        "Ensure content updates define focus updates appropriately",
        "Avoid using event handlers that trigger focus or context changes on user input",
        "Avoid forced focus changes that are not user-initiated",
      ],
    },
    {
      key: "content",
      title: "Repetitive Content, link purpose, consistency, and multiple ways",
      subs: [
        "Ensure link text is meaningful within context",
        "Provide a mechanism for skipping past repetitive content",
        "Ensure there is more than one way to locate a web page in a set of pages",
        "Ensure that elements with the same functionality are consistently identified across pages",
        "Ensure pages use a consistent navigation structure",
      ],
    },
    {
      key: "interactiveElements",
      title:
        "Information for all interactive elements including forms and frames",
      subs: [
        "Provide fieldsets for groups of form controls",
        "Ensure page tabs provide state and role",
        "Ensure custom controls provide proper textual name, role, and state information",
        "Ensure form field constraints and errors are associated with their corresponding field",
        "Ensure radio button groups are properly formed",
        "Provide visual labels or instructions for user input",
        "Ensure dialogs use proper structure",
        "Ensure ARIA roles, states, and properties are valid",
      ],
    },
    {
      key: "errorConditions",
      title: "Error conditions and Instructions",
      subs: [
        "Provide suggestions for error messages when known",
        "Provide error prevention for legal commitments, financial transactions, test responses, and data changes",
        "Provide a clear indication of fields in error for information that is submitted",
        "Ensure instructions do not rely solely on sensory characteristic",
      ],
    },
    {
      key: "imageEquivalent",
      title:
        "Image equivalents, including background images, pseudo elements, and icon fonts",
      subs: [
        "Ensure images provide informative alternative text",
        "Ensure CSS background images that convey meaning have textual and visible equivalents",
        "Provide text equivalents for icon fonts",
      ],
    },
    {
      key: "imagesText",
      title: "Images of text",
      subs: [
        "Ensure text is used instead of images of text when technology allows unless it is essential",
      ],
    },
    {
      key: "videoAudio",
      title: "Video-only/Audio-only",
      subs: [
        "Provide a text transcript for audio only presentations",
        "Provide text transcript or audio track of video only presentation",
      ],
    },
    {
      key: "captions",
      title: "Captions and audio descriptions",
      subs: [
        "Provide synchronized audio description for video (which includes audio) or other multimedia",
        "Provide synchronized captions for video (which includes audio) or other multimedia",
      ],
    },
    {
      key: "colorDependence",
      title: "Color Dependence",
      subs: ["Ensure color is not the sole means of communicating information"],
    },
    {
      key: "contrast",
      title: "Contrast",
      subs: ["Ensure text and images of text provide sufficient contrast"],
    },
    {
      key: "pageTitles",
      title: "Page Titles",
      subs: ["Provide an informative context-sensitive page title"],
    },
    {
      key: "headings",
      title: "Heading Presence and Order",
      subs: [
        "Avoid the use of implicit headings",
        "Ensure heading level matches the heading's visual importance/level",
      ],
    },
    {
      key: "listItems",
      title: "List Items",
      subs: ["Ensure implicit list markup is avoided"],
    },
    {
      key: "readingOrder",
      title: "Reading Order and off-screen hidden content",
      subs: [
        "Ensure content that is intended to be hidden from all users is not rendered by assistive technology",
        "Ensure that the reading order of content is logical",
      ],
    },
    {
      key: "languageParts",
      title: "Language of Parts",
      subs: ["Ensure changes in natural language are identified inline"],
    },
    {
      key: "tableStructure",
      title: "Table structure and association of headers",
      subs: [
        "Ensure data table headers are properly identified",
        "Ensure data tables are formatted using table elements",
        "Ensure layout tables do not contain structural markup",
      ],
    },
    {
      key: "liveRegions",
      title: "Live Regions",
      subs: ["Indicate live regions for dynamically changing content"],
    },
    {
      key: "animatedContent",
      title:
        "Pause , stop, or hide of animated or moving content including media",
      subs: [
        "Ensure auto-updating dynamic content can be paused, stopped, or hidden",
      ],
    },
    {
      key: "flashing",
      title: "Flashing",
      subs: ["Ensure elements blink or flash in a safe threshold"],
    },
    {
      key: "timeOuts",
      title: "Time Outs",
      subs: [
        "Ensure accessible usage of time based sessions and timed responses",
      ],
    },
    {
      key: "resizeText",
      title: "Resize Text (zoom)",
      subs: ["Ensure text can be resized"],
    },
    {
      key: "parsing",
      title: "Parsing",
      subs: ["Ensure markup documents contain well-formed elements"],
    },
    {
      key: "conformanceRequirements",
      title: "Conformance Requirements",
      subs: [
        "Ensure pages that provide alternatives for non-accessible pages provide equivalent functionality",
        "Ensure non-interference of non-conforming or non-accessibility supported technology",
      ],
    },
  ];
  return blArray;
}
function dataErrors() {
  const array = [
    {
      cause: "Access Assistant",
      css: "data-la-",
    },
    {
      cause: "Access Engine (report this to Level product support)",
      css: "data-ae_",
    },
    {
      cause: "Accessibility Insights for Web",
      css: "insights-",
    },
    {
      cause: "ANDI",
      css: "data-aria508-",
    },
    {
      cause: "ANDI",
      css: "data-andi508-",
    },
    {
      cause: "ARC Toolkit",
      css: "arc__toolkit-",
    },
    {
      cause: "ARC Toolkit",
      css: "arc_toolkit_",
    },
    {
      cause: "axe DevTools",
      css: "axe-",
    },
    {
      cause: "Continuum Explorer",
      css: "continuum-explorer-",
    },
    {
      cause: "HeadingsMap",
      css: "data-headings-map-",
    },
    {
      cause: "HeadingsMap",
      css: "data-headingsmap-",
    },
    {
      cause: "HeadingsMap",
      css: "HeadingsMap",
    },
    {
      cause: "JAWS Inspect",
      css: "wiid",
    },
    {
      cause: "LastPass",
      css: "_lpchecked",
    },
    {
      cause: "LastPass",
      css: "lpform",
    },
    {
      cause: "Microsoft Editor",
      css: "data-ms-editor",
    },
    {
      cause: "Visual ARIA",
      css: "data-ws-bm-",
    },
    {
      cause: "WAVE",
      css: "wave5",
    },
    {
      cause: "WAVE",
      css: "wave_",
    },
  ];
  return array;
}
function dataBadSites() {
  // `reason` should be an adjective
  const sites = [
    {
      reason: "unofficial",
      url: "a11y-guidelines.orange.com",
    },
    {
      reason: "unofficial",
      url: "abilitynet.org.uk",
    },
    {
      reason: "unofficial",
      url: "accessibility-developer-guide.com",
    },
    {
      reason: "unofficial",
      url: "accessibilityinsights.io",
    },
    {
      reason: "unofficial",
      url: "allyjs.io",
    },
    {
      reason: "unofficial",
      url: "bitsofco.de",
    },
    {
      reason: "unofficial",
      url: "codepen.io",
    },
    {
      reason: "unofficial",
      url: "css-tricks.com",
    },
    {
      reason: "unofficial",
      url: "deque.com",
    },
    {
      reason: "unofficial",
      url: "dequeuniversity.com",
    },
    {
      reason: "unofficial",
      url: "dev.to",
    },
    {
      reason: "unofficial",
      url: "digitala11y.com",
    },
    {
      reason: "unofficial",
      url: "equalentry.com",
    },
    {
      reason: "unofficial",
      url: "geeksforgeeks.org",
    },
    {
      reason: "unofficial",
      url: "gitbook.io",
    },
    {
      reason: "unofficial",
      url: "html5accessibility.com",
    },
    {
      reason: "unofficial",
      url: "inclusive-components.design",
    },
    {
      reason: "unofficial",
      url: "jsfiddle.net",
    },
    {
      reason: "unofficial",
      url: "knowbility.com",
    },
    {
      reason: "unofficial",
      url: "medium.com",
    },
    {
      reason: "unofficial",
      url: "nomensa.com",
    },
    {
      reason: "unofficial",
      url: "powermapper.com",
    },
    {
      reason: "unofficial",
      url: "smashingmagazine.com",
    },
    {
      reason: "unofficial",
      url: "stackexchange.com",
    },
    {
      reason: "unofficial",
      url: "stackoverflow.com",
    },
    {
      reason: "unofficial",
      url: "tetralogical.com",
    },
    {
      reason: "unofficial",
      url: "tpgi.com",
    },
    {
      reason: "unofficial",
      url: "tutorialspoint.com",
    },
    {
      reason: "unofficial",
      url: "uxdesign.cc",
    },
    {
      reason: "outdated",
      url: "w3.org/TR/20",
    },
    {
      reason: "outdated",
      url: "w3.org/TR/html4",
    },
    {
      reason: "outdated",
      url: "w3.org/TR/UNDERSTANDING-WCAG20",
    },
    {
      reason: "outdated",
      url: "w3.org/TR/wai-aria-practices",
    },
    {
      reason: "outdated",
      url: "w3.org/TR/WCAG20-TECHS",
    },
    {
      reason: "outdated",
      url: "w3.org/WAI/GL/",
    },
    {
      reason: "unpublished draft",
      url: "w3c.github.io",
    },
    {
      reason: "unofficial",
      url: "w3schools.com",
    },
    {
      reason: "unofficial",
      url: "webaim.org",
    },
  ];
  return sites;
}
function dataSchemas() {
  const adobeSchema = {
    description: {
      requiredToExist: [
        "SUMMARY - Bug title for Jira.",
        "CONTEXT - Keep one or customize. Enter your actual versions numbers.",
        "STEPS TO REPRODUCE - Keep one or customize. Enter your actual versions numbers.",
        "ACTUAL BEHAVIOR - Required. Examples or non-compliant code is optional.",
        "AFFECTED POPULATIONS - Optional. Only if different from default FPC.",
        "WCAG PRIMARY SC - Required. Use the SC the issue should be identified under in an ACR.",
        "SCREENSHOT(S) - Optional. Use when it's the easiest way to explain.",
      ],
      requiredToHaveContent: [
        "SUMMARY - Bug title for Jira",
        "CONTEXT - Keep one or customize. Enter your actual versions numbers.",
        "STEPS TO REPRODUCE - Keep one or customize. Enter your actual versions numbers.",
        "ACTUAL BEHAVIOR - Required. Examples or non-compliant code is optional.",
        "WCAG PRIMARY SC - Required. Use the SC the issue should be identified under in an ACR.",
      ],
      requiredToHaveCode: [],
    },
    note: {
      requiredToExist: [
        "EXPECTED BEHAVIOR - Description is required. Compliant code is optional.",
        "ADDITIONAL INFORMATION - Optional link to a resource. Use sparingly.",
      ],
      requiredToHaveContent: [
        "EXPECTED BEHAVIOR - Description is required. Compliant code is optional.",
      ],
      requiredToHaveCode: [],
    },
  };

  const wellsFargoSchema = {
    description: {
      requiredToExist: ["Summary", "Issue Description", "Devices"],
      requiredToHaveContent: ["Summary", "Issue Description", "Devices"],
      requiredToHaveCode: ["Non-Compliant Example"],
    },
    note: {
      requiredToExist: ["Recommendation"],
      requiredToHaveContent: ["Recommendation"],
      requiredToHaveCode: ["Compliant Example"],
    },
  };

  const progressiveAPQSchema = {
    description: {
      requiredToExist: ["Issue", "User Impact", "Steps to Reproduce", "Type"],
      requiredToHaveContent: [
        "Issue",
        "User Impact",
        "Occurrences",
        "Steps to Reproduce",
        "Type",
        "Code Reference",
      ],
      requiredToHaveCode: ["Code Reference"],
    },
    note: {
      requiredToExist: ["Recommendation"],
      requiredToHaveContent: [
        "Recommendation",
        "Compliant Code Example",
        "Recommended Reading",
      ],
      requiredToHaveCode: ["Compliant Code Example"],
    },
  };

  const progressiveDQSchema = {
    description: {
      requiredToExist: ["Issue", "User Impact", "Steps to Reproduce", "Type"],
      requiredToHaveContent: [
        "Issue",
        "User Impact",
        "Steps to Reproduce",
        "Type",
        "Platform",
        "Code Reference",
      ],
      requiredToHaveCode: ["Code Reference"],
    },
    note: {
      requiredToExist: ["Recommendation"],
      requiredToHaveContent: [
        "Recommendation",
        "Compliant Code Example",
        "Recommended Reading",
      ],
      requiredToHaveCode: ["Compliant Code Example"],
    },
  };

  const salesforceSchema = {
    description: {
      requiredToExist: [
        "Issue",
        "User Impact",
        "Salesforce Prioritization",
        "Screen Reader",
        "Include in ACR",
        "Image File - Optional. Use when it's the easiest way to explain.",
      ],
      requiredToHaveContent: [
        "Issue",
        "User Impact",
        "Salesforce Prioritization",
        "Code Reference",
      ],
      requiredToHaveCode: ["Code Reference"],
    },
    note: {
      requiredToExist: ["Recommendation"],
      requiredToHaveContent: [
        "Recommendation",
        "Compliant Code Example",
        "Recommended Reading",
      ],
      requiredToHaveCode: ["Compliant Code Example"],
    },
  };

  const defaultSchema = {
    description: {
      requiredToExist: ["Issue", "User Impact"],
      requiredToHaveContent: [
        "Issue",
        "User Impact",
        "Occurrences",
        "Code Reference",
      ],
      requiredToHaveCode: ["Code Reference"],
    },
    note: {
      requiredToExist: ["Recommendation"],
      requiredToHaveContent: [
        "Recommendation",
        "Compliant Code Example",
        "Recommended Reading",
      ],
      requiredToHaveCode: ["Compliant Code Example"],
    },
  };

  const schemaMap = new Map();
  schemaMap.set("adobe", adobeSchema);
  schemaMap.set("wellsFargo", wellsFargoSchema);
  schemaMap.set("progressiveAPQ", progressiveAPQSchema);
  schemaMap.set("progressiveDQ", progressiveDQSchema);
  schemaMap.set("salesforce", salesforceSchema);
  schemaMap.set("default", defaultSchema);

  return schemaMap;
}
function dataNonBaselineBPs() {
  const nonBaselineBPs = [
    {
      id: "615",
      note: "Consider marking this issue as [ADVISORY] or removing it.",
    },
    {
      id: "378",
      note: 'Consider using "Ensure images provide informative alternative text" instead.',
    },
    {
      id: "1872",
      note: 'Consider using "Provide text equivalents for icon fonts" or "Ensure CSS background images that convey meaning have textual and visible equivalents" instead.',
    },
    {
      id: "942",
      note: 'Consider using "Ensure data tables are formatted using table elements", "Ensure data table headers are properly identified", or "Ensure layout tables do not contain structural markup" instead.',
    },
    {
      id: "543",
      note: 'Consider using "Provide a mechanism for skipping past repetitive content" instead.',
    },
    {
      id: "489",
      note: 'Consider using "Ensure text can be resized" or "Ensure pages reflow without requiring two-dimensional scrolling without loss of content or functionality" instead.',
    },
    {
      id: "2911",
      note: 'Consider using "Ensure parts of graphical objects essential for understanding content have sufficient contrast" instead.',
    },
    {
      id: "943",
      note: "Consider marking this issue as [ADVISORY] or removing it.",
    },
    {
      id: "372",
      note: 'Consider using "Ensure images provide informative alternative text" instead.',
    },
    {
      id: "825",
      note: 'Consider using "Ensure images provide informative alternative text" instead.',
    },
    {
      id: "2511",
      note: 'Consider using "Provide synchronized captions for video (which includes audio) or other multimedia" instead.',
    },
    {
      id: "503",
      note: 'Consider using "Ensure frame titles are meaningful" instead.',
    },
    {
      id: "479",
      note: 'Consider using "Ensure proper markup is used to mark emphasized or special text formatting" instead.',
    },
    {
      id: "660",
      note: 'Consider using "Ensure all interactive functionality is operable with the keyboard" instead.',
    },
    {
      id: "1052",
      note: 'Consider using "Ensure color is not the sole means of communicating information" instead.',
    },
    {
      id: "1053",
      note: 'Consider using "Ensure data tables are formatted using table elements" instead.',
    },
    {
      id: "948",
      note: 'Consider using "Ensure images provide informative alternative text" instead.',
    },
    {
      id: "1222",
      note: "Consider marking this issue as [ADVISORY] or removing it.",
    },
    {
      id: "525",
      note: 'Consider using "Ensure color is not the sole means of communicating information" instead.',
    },
    {
      id: "381",
      note: 'Consider using "Ensure color is not the sole means of communicating information" instead.',
    },
    {
      id: "956",
      note: 'If you want to flag an issue for 1.4.12 Text Spacing, consider using "Ensure that content and functionality is available when the user overrides text spacing properties" instead. Otherwise, consider marking this issue as [ADVISORY] or removing it.',
    },
    {
      id: "2441",
      note: 'Consider using "Ensure data table headers are properly identified" instead.',
    },
    {
      id: "2443",
      note: 'Consider using "Ensure data table headers are properly identified" instead.',
    },
    {
      id: "2442",
      note: 'Consider using "Ensure data table headers are properly identified" instead.',
    },
    {
      id: "352",
      note: 'Consider using "Ensure images provide informative alternative text" instead.',
    },
    {
      id: "1456",
      note: "Consider using only if developers have hidden meaningful content from assistive technology users.",
    },
    {
      id: "949",
      note: 'Consider using "Ensure color is not the sole means of communicating information" instead.',
    },
    {
      id: "601",
      note: 'Consider using "Ensure data table headers are properly identified" instead.',
    },
    {
      id: "616",
      note: 'Consider using "Ensure auto-updating dynamic content can be paused, stopped, or hidden" instead.',
    },
    {
      id: "2247",
      note: "Consider marking this issue as [ADVISORY] or removing it.",
    },
    {
      id: "443",
      note: 'Consider using "Ensure all interactive functionality is operable with the keyboard" instead.',
    },
    {
      id: "561",
      note: "Consider marking this issue as [ADVISORY] or removing it.",
    },
    {
      id: "379",
      note: 'Consider using "Avoid using event handlers that trigger focus or context changes on user input" instead.',
    },
    {
      id: "594",
      note: 'Consider using "Ensure custom controls provide proper textual name, role, and state information" instead.',
    },
    {
      id: "881",
      note: 'Consider using "Ensure headings and labels are descriptive and unique" instead.',
    },
    {
      id: "610",
      note: 'Consider using "Ensure headings and labels are descriptive and unique" instead.',
    },
    {
      id: "507",
      note: 'Consider using "Ensure the focus order of interactive elements on the page is logical" instead.',
    },
    {
      id: "403",
      note: 'Consider using "Ensure text can be resized" or "Ensure pages reflow without requiring two-dimensional scrolling without loss of content or functionality"',
    },
    {
      id: "734",
      note: "Consider marking this issue as [ADVISORY] or removing it.",
    },
    {
      id: "502",
      note: 'Consider using "Ensure all interactive functionality is operable with the keyboard" instead.',
    },
    {
      id: "595",
      note: 'Consider using "Ensure content updates define focus updates appropriately" instead.',
    },
    {
      id: "952",
      note: 'Consider using "Ensure content updates define focus updates appropriately" instead. ',
    },
    {
      id: "596",
      note: 'Consider using "Ensure content updates define focus updates appropriately" instead.',
    },
    {
      id: "356",
      note: 'Consider using "Ensure that the reading order of content is logical" instead.',
    },
    {
      id: "2445",
      note: 'Consider using "Ensure text and images of text provide sufficient contrast" instead.',
    },
    {
      id: "887",
      note: "Consider marking this issue as [ADVISORY] or removing it.",
    },
    {
      id: "394",
      note: "Consider using this only if the presence of list markup is very confusing for users.",
    },
    {
      id: "973",
      note: 'Consider using "Indicate live regions for dynamically changing content" or "Ensure that status messages can be determined programmatically without receiving focus" instead.',
    },
    {
      id: "976",
      note: "Consider marking this issue as [ADVISORY] or removing it.",
    },
    {
      id: "597",
      note: 'Consider using "Ensure all interactive functionality is operable with the keyboard" instead.',
    },
    {
      id: "430",
      note: 'Consider using "Ensure accessible usage of time based sessions and timed responses" instead.',
    },
    {
      id: "2043",
      note: 'Consider using "Ensure auto-updating dynamic content can be paused, stopped, or hidden" instead.',
    },
    {
      id: "1300",
      note: 'Consider using "Avoid forced focus changes that are not user-initiated" instead.',
    },
    {
      id: "890",
      note: 'Consider using "Ensure content updates define focus updates appropriately" instead.',
    },
    {
      id: "1627",
      note: 'Consider using "Indicate live regions for dynamically changing content" or "Ensure that status messages can be determined programmatically without receiving focus" instead.',
    },
    {
      id: "366",
      note: "Consider marking this issue as [ADVISORY] or removing it.",
    },
    {
      id: "880",
      note: 'Consider using "Ensure the focus order of interactive elements on the page is logical" instead.',
    },
    {
      id: "1891",
      note: "Consider marking this issue as [ADVISORY] or removing it.",
    },
    {
      id: "974",
      note: 'Consider using "Indicate live regions for dynamically changing content" or "Ensure that status messages can be determined programmatically without receiving focus" instead.',
    },
    {
      id: "1347",
      note: 'Consider using "Ensure custom controls provide proper textual name, role, and state information" instead.',
    },
    {
      id: "1350",
      note: 'Consider using "Ensure content is visible to assistive technologies" instead.',
    },
    {
      id: "817",
      note: 'Consider using "Ensure auto-updating dynamic content can be paused, stopped, or hidden" instead.',
    },
    {
      id: "406",
      note: 'Consider using "Ensure auto-updating dynamic content can be paused, stopped, or hidden" instead.',
    },
    {
      id: "600",
      note: 'Consider using "Ensure all interactive functionality is operable with the keyboard" instead.',
    },
    {
      id: "612",
      note: "Consider marking this issue as [ADVISORY] or removing it.",
    },
    {
      id: "436",
      note: 'Consider using "Ensure proper markup is used to mark emphasized or special text formatting" instead.',
    },
    {
      id: "959",
      note: 'Consider using "Ensure all interactive functionality is operable with the keyboard" instead.',
    },
    {
      id: "599",
      note: 'Consider using "Ensure custom controls provide proper textual name, role, and state information" instead.',
    },
    {
      id: "1226",
      note: 'Consider using "Ensure all interactive functionality is operable with the keyboard" instead.',
    },
    {
      id: "598",
      note: 'Consider using "Ensure all interactive functionality is operable with the keyboard" and/or "Ensure custom controls provide proper textual name, role, and state information" instead.',
    },
    {
      id: "2426",
      note: "Consider marking this issue as [ADVISORY] or removing it.",
    },
    {
      id: "415",
      note: "Consider marking this issue as [ADVISORY] or removing it.",
    },
    {
      id: "908",
      note: 'Consider using "Ensure data tables are formatted using table elements" instead.',
    },
    {
      id: "354",
      note: 'Consider using "Ensure data table headers are properly identified" instead.',
    },
    {
      id: "2518",
      note: "Consider marking this issue as [ADVISORY] or removing it.",
    },
    {
      id: "2633",
      note: 'Consider using "Ensure changes in natural language are identified inline" instead.',
    },
    {
      id: "888",
      note: 'Consider using "Ensure all interactive functionality is operable with the keyboard" instead.',
    },
    {
      id: "970",
      note: 'Consider using "Ensure that the reading order of content is logical" instead.',
    },
    {
      id: "591",
      note: "Consider marking this issue as [ADVISORY] or removing it.",
    },
    {
      id: "2051",
      note: 'Consider using "Ensure content that is intended to be hidden from all users is not rendered by assistive technology" instead.',
    },
    {
      id: "953",
      note: 'Consider using "Ensure that the reading order of content is logical" instead.',
    },
    {
      id: "1055",
      note: 'Consider using "Ensure content updates define focus updates appropriately" instead.',
    },
    {
      id: "391",
      note: 'Consider using "Ensure proper markup is used to mark emphasized or special text formatting" instead.',
    },
    {
      id: "891",
      note: 'Consider using "Ensure custom controls provide proper textual name, role, and state information" instead.',
    },
    {
      id: "1054",
      note: 'Consider using "Ensure content updates define focus updates appropriately" instead.',
    },
    {
      id: "889",
      note: 'Consider using "Ensure content updates define focus updates appropriately" instead.',
    },
    {
      id: "1120",
      note: 'Consider using "Ensure all interactive functionality is operable with the keyboard" or "Ensure keyboard focus is not trapped" instead.',
    },
    {
      id: "894",
      note: "Consider marking this issue as [ADVISORY] or removing it.",
    },
    {
      id: "425",
      note: "Consider marking this issue as [ADVISORY] or removing it.",
    },
    {
      id: "883",
      note: 'Consider using "Ensure custom controls provide proper textual name, role, and state information" instead.',
    },
    {
      id: "884",
      note: 'Consider using "Ensure custom controls provide proper textual name, role, and state information" instead.',
    },
    {
      id: "882",
      note: 'Consider using "Ensure custom controls provide proper textual name, role, and state information" instead.',
    },
    {
      id: "537",
      note: 'Consider using "Ensure custom controls provide proper textual name, role, and state information" instead.',
    },
    {
      id: "950",
      note: 'Consider using "Ensure all interactive functionality is operable with the keyboard" instead.',
    },
    {
      id: "526",
      note: "Consider marking this issue as [ADVISORY] or removing it.",
    },
    {
      id: "559",
      note: "Consider marking this issue as [ADVISORY] or removing it.",
    },
    {
      id: "937",
      note: 'Consider using "Ensure auto-updating dynamic content can be paused, stopped, or hidden" instead.',
    },
    {
      id: "2046",
      note: 'Consider using "Provide synchronized audio description for video (which includes audio) or other multimedia" instead.',
    },
    {
      id: "968",
      note: 'Consider using "Indicate live regions for dynamically changing content" or "Ensure that status messages can be determined programmatically without receiving focus" instead.',
    },
    {
      id: "541",
      note: "Consider marking this issue as [ADVISORY] or removing it.",
    },
    {
      id: "2435",
      note: 'Consider using "Provide a mechanism for skipping past repetitive content" instead.',
    },
    {
      id: "509",
      note: 'Consider using "Ensure auto-updating dynamic content can be paused, stopped, or hidden" instead.',
    },
    {
      id: "486",
      note: "Consider marking this issue as [ADVISORY] or removing it.",
    },
    {
      id: "969",
      note: 'Consider using "Ensure content updates define focus updates appropriately," "Indicate live regions for dynamically changing content," or "Ensure that status messages can be determined programmatically without receiving focus" instead.',
    },
    {
      id: "608",
      note: "Consider marking this issue as [ADVISORY] or removing it.",
    },
    {
      id: "2512",
      note: "Consider marking this issue as [ADVISORY] or removing it.",
    },
    {
      id: "833",
      note: 'Consider using "Ensure all interactive functionality is operable with the keyboard" instead.',
    },
    {
      id: "392",
      note: 'Consider using "Ensure custom controls provide proper textual name, role, and state information" instead.',
    },
  ];
  return nonBaselineBPs;
}
function dataSpecialCharacters() {
  const specialCharacters = [
    {
      id: "–",
      replacement: "-",
    },
    { id: "&ndash;", replacement: "-" },
    {
      id: "‘",
      replacement: "'",
    },
    {
      id: "&lsquo;",
      replacement: "'",
    },
    {
      id: "’",
      replacement: "'",
    },
    {
      id: "&rsquo;",
      replacement: "'",
    },
    {
      id: "“",
      replacement: '"',
    },
    {
      id: "&ldquo;",
      replacement: '"',
    },
    {
      id: "”",
      replacement: '"',
    },
    {
      id: "&rdquo;",
      replacement: '"',
    },
    {
      id: "&quot;",
      replacement: '"',
    },
    {
      id: "&#039;",
      replacement: "'",
    },
    {
      id: "é",
      replacement: "e",
    },
    { id: "&eacute;", replacement: "e" },
    {
      id: "&amp;",
      replacement: "and",
    },
  ];
  return specialCharacters;
}
/* Experimental stuff I am working on */

// EXPERIMENTAL: use Ajax to grab something from another page
function ajaxCall(url, css) {
  let output;
  $.ajax({
    type: "POST",
    url,
    async: false,
    success(result) {
      output = $(result).find(css).html();
    },
  });
  return output;
}

/* General Tools and utilities for the scripts */

// TOOL: Finds the report ID either in the URL or searches the page
function getID(sPageURL, sKey) {
  let thisID;
  if (sPageURL.search(sKey) < 0 && $(`a[href*='${sKey}']`)) {
    sPageURL = $(`a[href*='${sKey}']:last`).attr("href");
  }
  const urlParam = function (name) {
    const results = new RegExp(`[?&]${name}=([^&#]*)`).exec(sPageURL);
    if (results) {
      return results[1] || 0;
    }
  };
  if (urlParam(sKey)) {
    thisID = urlParam(sKey);
  }
  return thisID;
}

// TOOL: Simple function for building a link that gets injected in the header
function buildLink(text, url) {
  const Anchor = document.createElement("a");
  const Text = document.createTextNode(text);
  Anchor.appendChild(Text);
  Anchor.href = url;
  Anchor.className = "kpmHeaderAnchor";
  return Anchor;
}

// TOOL: Function for getting a cookie value based on the cookie ID.
function getCookieValue(a) {
  const b = document.cookie.match(`(^|[^;]+)\\s*${a}\\s*=\\s*([^;]+)`);
  return b ? b.pop() : "";
}

// TOOL: Simple function for hiding elements based on CSS decloration.
function hideElement(css, closest) {
  if (closest) {
    $(css).closest(closest).hide();
  } else {
    $(css).closest(closest).hide();
  }
}

// TOOL: Build CSS
function buildCSS(array) {
  let CSS = "";
  $.each(array, (key, value) => {
    CSS += `${key} {${value}} `;
  });
  return `<style>${CSS}</style>`;
}

// TOOL: Convert "unsafe" HTML characters into their "escaped" entities
function escapeHtml(unsafe) {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

/* GLoabls: Things that appear on every page */

// GLOBAL: Adds links to the main nav
function mainNav(reportID, moduleID) {
  const linksDIV = document.createElement("span");
  linksDIV.id = "kpmScriptRunning";
  linksDIV.style = "margin-left: 2em;";
  linksDIV.appendChild(
    buildLink(
      "Dashboard",
      `/public/reporting/view_report.php?report_id=${reportID}`
    )
  );
  linksDIV.appendChild(
    buildLink(
      "Modules",
      `/public/reporting/view_modules.php?report_id=${reportID}`
    )
  );
  linksDIV.appendChild(
    buildLink(
      "Patterns",
      `/public/reporting/view_globals_and_patterns.php?report_id=${reportID}`
    )
  );
  linksDIV.appendChild(
    buildLink(
      "Violations",
      `/public/reporting/view_instances.php?report_id=${reportID}`
    )
  );
  linksDIV.appendChild(
    buildLink(
      "Use Cases",
      `/public/reporting/view_use_cases.php?report_id=${reportID}`
    )
  );

  // If a module ID is present, then add two links to the module. Also adds a link to "mark complete"
  if (
    location.href.search("module_id") >= 0 &&
    location.href.search("view_module.php") < 0
  ) {
    linksDIV.appendChild(
      buildLink(
        "* Edit Module/Instances *",
        `/public/reporting/view_module.php?module_id=${moduleID}`
      )
    );
  }
  return linksDIV;
}

/* Multi Page: Things that are used in multiple places */

// Error generation
function getIssueColumn(element) {
  const rawString = element.innerText;
  const tokens = rawString.split(/(^\[[ -Z\\^-~]*\]\s*$)(?!\{)/gmu);
  const sectionMap = new Map();
  const sectionHeaderRegex = /^\[[ -Z\\^-~]*\]\s*$/mu;
  tokens.forEach((token, index) => {
    const nextToken = tokens[index + 1] ?? "";
    if (token.match(sectionHeaderRegex)) {
      const cleanedSectionHeader = token.replace(/[[\]]/gmu, "").trim();
      if (!nextToken.match(sectionHeaderRegex)) {
        const cleanedSectionContents = nextToken.trim();
        sectionMap.set(cleanedSectionHeader, cleanedSectionContents);
      }
    }
  });
  return sectionMap;
}

function getSchema() {
  const schemaMap = dataSchemas();
  let currentSchema = {};
  if (getCookieValue("kpmCustom-custom-adobe")) {
    currentSchema = schemaMap.get("adobe");
  } else if (getCookieValue("kpmCustom-custom-wf")) {
    currentSchema = schemaMap.get("wellsFargo");
  } else if (getCookieValue("kpmCustom-custom-progressive-apq")) {
    currentSchema = schemaMap.get("progressiveAPQ");
  } else if (getCookieValue("kpmCustom-custom-progressive-dq-inc-mobile")) {
    currentSchema = schemaMap.get("progressiveDQ");
  } else if (getCookieValue("kpmCustom-custom-salesforce")) {
    currentSchema = schemaMap.get("salesforce");
  } else {
    currentSchema = schemaMap.get("default");
  }
  return currentSchema;
}

function determineErrors(sectionType, sectionMap) {
  const currentSchema = getSchema();
  const badCodeStrings = dataErrors();
  const badSiteStrings = dataBadSites();
  const errorArray = [];
  let sections = {};
  if (sectionType === "description") {
    sections = currentSchema.description;
  } else if (sectionType === "note") {
    sections = currentSchema.note;
  }

  // Check for existence of all required sections
  sections.requiredToExist.forEach((section) => {
    if (!sectionMap.has(section)) {
      errorArray.push(
        `Error: Required section [${section}] was not found. Please add this section or double-check its spelling.`
      );
    }
  });

  sectionMap.forEach((sectionContents, sectionName) => {
    if (sections.requiredToHaveContent.includes(sectionName)) {
      if (sectionContents === "") {
        errorArray.push(
          `Error: [${sectionName}] appears to be empty. Please add content in this section.`
        );
      }
    }

    if (sections.requiredToHaveCode.includes(sectionName)) {
      if (!sectionContents.match(/[<>{}]|(\/\*)|(\*\/)|^N\/A|^None|^$/gmu)) {
        errorArray.push(
          `Error: [${sectionName}] does not appear to contain code. Please ensure HTML or CSS code is present.`
        );
      }

      badCodeStrings.forEach((badString) => {
        if (sectionContents.includes(badString.css)) {
          errorArray.push(
            `Error: [${sectionName}] contains ${badString.css} attribute injected by ${badString.cause}. Please remove this attribute.`
          );
        }
      });
    }

    badSiteStrings.forEach((badString) => {
      if (sectionContents.includes(badString.url)) {
        errorArray.push(
          `Error: [${sectionName}] contains ${badString.reason} site ${badString.url}. Please change or remove this link.`
        );
      }
    });

    if (sectionContents.at(-1) === ":" || sectionContents.match(/^-\s*$/gmu)) {
      errorArray.push(
        `Error: Content appears to be missing in [${sectionName}].`
      );
    }
  });
  return errorArray;
}

function displayErrors(element, errorObject) {
  const errorContainer = document.createElement("div");
  errorObject.forEach((error) => {
    const errorElement = document.createElement("p");
    errorElement.className = "kpmAlert";
    const errorContent = document.createTextNode(error);
    errorElement.appendChild(errorContent);
    errorContainer.appendChild(errorElement);
  });
  element.prepend(errorContainer);
}

function generateIssueErrors(issueRow, descEl, noteEl) {
  // Description section
  const descriptionMap = getIssueColumn(descEl);
  const descriptionErrorObject = determineErrors("description", descriptionMap);
  displayErrors(descEl, descriptionErrorObject);

  // Note section
  const noteObject = getIssueColumn(noteEl);
  const noteErrorObject = determineErrors("note", noteObject);
  displayErrors(noteEl, noteErrorObject);
}

function generateBPErrors(bpRow, bpID) {
  const nonBaselineBPs = dataNonBaselineBPs();
  let warning = "";
  nonBaselineBPs.forEach((nonBaselineBP) => {
    if (bpID === nonBaselineBP.id) {
      warning = nonBaselineBP.note;
    }
  });
  if (warning) {
    const warningContainer = document.createElement("div");
    const warningElement = document.createElement("p");
    warningElement.className = "kpmWarning";
    const initialContent =
      "Warning: This is not a <a href='https://academy.levelaccess.com/learn/learning-path/baseline-testing-methodology'>Baseline best practice</a>. ";
    warningElement.innerHTML = initialContent + warning;
    warningContainer.appendChild(warningElement);
    bpRow.append(warningContainer);
  }
}

// MUTLI PAGE: Function for building the best practice buttons
function buildIcon(thisTitle, thisClass, thisURL, thisID) {
  const anchor = document.createElement("a");
  const span = document.createElement("span");
  span.className = thisClass;
  anchor.appendChild(span);
  anchor.href = thisURL;
  anchor.title = thisTitle;
  anchor.className = "kpmAnchor";
  anchor.id = thisID;
  return anchor;
}

// MULTI PAGE: Build a checkbox with set cookie capabilities for the preferences.
function buildCheckbox(id, text, tooltip, spanID) {
  const cb = document.createElement("input");
  const cbLabel = document.createElement("label");
  const cbText = document.createTextNode(` ${text}`);
  const br = document.createElement("br");
  const thisID = `kpmPref-${id}`;
  const cbCookie = getCookieValue(thisID);
  if (tooltip) {
    cbLabel.title = tooltip;
  }
  cb.type = "checkbox";
  cb.id = thisID;
  cb.value = "no";
  if (!cbCookie) {
    cb.setAttribute("checked", "checked");
  }
  cbLabel.appendChild(cb);
  cbLabel.appendChild(cbText);

  if (spanID) {
    const cbSpan = document.createElement("span");
    cbSpan.id = spanID;
    cbSpan.appendChild(cbLabel);
    return cbSpan;
  }
  cbLabel.append(br);
  return cbLabel;
}

// MULTI PAGE: Builds the script preferences box for the bottom of the page.
function preferencesBox() {
  const prefDiv = document.createElement("div");
  const prefHeadingDiv = document.createElement("div");
  prefHeadingDiv.className = "heading_container";
  prefHeadingDiv.innerHTML =
    '<a href="https://level-access.slack.com/messages/CK79W4PPU/" style="float: right;" target="_blank">Release Notes and Discussion <span class="sr-only">Opens in New Window</span></a><h3 style="width: 100%">AMP Script Preferences</h3>';
  prefHeadingDiv.id = "kpmPrefHeading";
  prefDiv.id = "kpmPrefs";

  const customOptions = dataCustom();

  let selectCustom =
    "<h3>Custom Formatting</h3><ul><li><a href='#' id='kpmCustom-default'>Default</a></li>";
  let i;
  for (i = 0; i < customOptions.length; i++) {
    const currentID = `kpmCustom-${customOptions[i].id}`;
    const cbCookie = getCookieValue(currentID);
    selectCustom += `<li><a href='#' id='kpmCustom-${customOptions[i].id}'>${customOptions[i].name}`;
    if (cbCookie) {
      selectCustom += " [Custom Selected]";
    }
    selectCustom += "</a></li>";
  }
  selectCustom +=
    '</ul><p>Post in <a href=\'https://level-access.slack.com/messages/CK79W4PPU/\'>the Level Access #as-access-companion Slack channel</a> if you have any other custom formatting needs.</p><br /><p><strong>New</strong>: <a href="#" id="kpmViewAll">View all preferred responses.</a></p>';

  const prefTable = document.createElement("table");
  prefTable.setAttribute("role", "presentation");
  const prefTR = document.createElement("tr");
  const prefTD1 = document.createElement("td");
  const prefTD3 = document.createElement("td");
  const prefTD4 = document.createElement("td");
  prefTD4.setAttribute("rowspan", "2");
  prefTD4.innerHTML = selectCustom;

  // PrefTD4.innerHTML = '<p>The following are also injected but have no on/off preference (* or the preference is set on the element):</p><ul><li>Add Responses (Instance and Pattern Modal)</li><li>Test Module Page opens to Review by default (instead of blank)</li><li>CSS Fixes (vertical align on tables, etc.)</li><li>Additional choices in "Show XXX Entries" (5,10,500,1000)</li><li>Access Keys (View Module/View Pattern)</li><li>Links<ul><li>Main header (5 +1 on test module)</li><li>Mark Complete (View Module/Test Module)</li><li>Edit Module (2x on Test Module)</li><li>Add Instance (View Module/View Pattern)</li><li>Add Pattern (View Module)</li></ul></li><li>Client View *</li><li>Baseline Checklist *</li><li>Colorize row based on status *</li><li>Expand Description Box on Dashboard *</li></ul>';

  const secondTR = document.createElement("tr");
  const secondTD = document.createElement("td");
  secondTD.setAttribute("colspan", "3");
  secondTD.innerHTML =
    "<p>Do you need to run this on a client system that doesn't allow the use of TamperMonkey? Bookmark this link <a href=\"javascript:void((function(){ampScript=document.createElement('script');ampScript.setAttribute('src','https://raw.githubusercontent.com/levelaccess/AMPScript-Releases/main/AmpScript.js');document.body.appendChild(ampScript)})());\">AmpScript</a> and you should be able to run it from anywhere. Note: You have to run it again after each page change in AMP and (for now) you have to run it <em>after</em> you activate the Add Instance modal.</p>";
  secondTR.appendChild(secondTD);

  prefDiv.appendChild(prefHeadingDiv);
  prefDiv.className = "kpmPrefsDiv SSBWidget_Container box_shadow";
  prefTD1
    .appendChild(document.createElement("h3"))
    .appendChild(document.createTextNode("Add/Edit Instance Modal"));
  prefTD1.appendChild(
    buildCheckbox(
      "hideNew",
      "Hide unused fields",
      "Hides the fields added Febuary 2019 such as 'Content Identifier' and 'User Impact'"
    )
  );
  prefTD1.appendChild(
    buildCheckbox(
      "showOne",
      "Hide instances 2-6 on add",
      "Add instance will only show a single item rather than a list of 6"
    )
  );
  prefTD1.appendChild(
    buildCheckbox(
      "addWarning",
      "Add content warnings (add/edit)",
      "Adds warnings to the modal for injected classes and missing information"
    )
  );

  prefTD1.appendChild(
    buildCheckbox(
      "bpListCompact",
      "Use compact BP List",
      "Compact best practices list in the add modal"
    )
  );

  prefTD1
    .appendChild(document.createElement("h3"))
    .appendChild(document.createTextNode("Instance Tables"));
  prefTD1.appendChild(
    buildCheckbox(
      "addPatternLink",
      "Add link to pattern edit",
      "Adds a button to each pattern in the table that takes you to the edit pattern page"
    )
  );
  prefTD1.appendChild(
    buildCheckbox(
      "thumbALT",
      "Add thumbnail ALT",
      "Exposes the ALT text of screen shots"
    )
  );
  prefTD1.appendChild(
    buildCheckbox(
      "tableWarning",
      "Add content warnings (tables)",
      "Adds warnings to the table for injected classes and missing information"
    )
  );
  prefTD1.appendChild(
    buildCheckbox(
      "addPatterns",
      "Add Patterns",
      "Adds the table of patterns to the bottom of the view module page"
    )
  );
  prefTD1.appendChild(
    buildCheckbox(
      "moveInstanceLink",
      "Move the instance link",
      'Moves the "Open view instance page: " link to the Actions column'
    )
  );
  prefTD1.appendChild(
    buildCheckbox(
      "bpWarnings",
      "Add warnings for non-Baseline BPs",
      "Adds warnings below BPs that are not part of Baseline. Web only."
    )
  );

  prefTD3
    .appendChild(document.createElement("h3"))
    .appendChild(document.createTextNode("General"));
  prefTD3.appendChild(
    buildCheckbox(
      "globals",
      "Hide globals (patterns)",
      "In the paterns edit, globals are hidden"
    )
  );
  prefTD3.appendChild(
    buildCheckbox(
      "instanceFilter",
      "Add filter instances by name",
      "On the edit modal page, adds a search by best practice"
    )
  );
  prefTD3.appendChild(
    buildCheckbox(
      "addBPLink",
      "Add best practice links",
      "Adds links everywhere there is a best practice modal to the best practice page"
    )
  );
  if (getCookieValue("kpmPref-showBaseline")) {
    prefTD3.appendChild(
      buildCheckbox(
        "showBaseline",
        "Add baseline checklist",
        "Shows/Hides the baseline checklist"
      )
    );
  }
  prefTD3.appendChild(
    buildCheckbox(
      "nonBookmarkedOrgs",
      "Default to non-bookmarked Orgs",
      "Don't check the 'Bookmarks only' checkbox in the 'Change Organization' modal"
    )
  );
  prefTD3
    .appendChild(document.createElement("h3"))
    .appendChild(document.createTextNode("Script Elements"));
  prefTD3.appendChild(
    buildCheckbox(
      "hidePrefs",
      "Hide AMP script preferences",
      "Hides the ACE AMP Script preferences box"
    )
  );
  if (getCookieValue("kpmPref-hideAlertBox")) {
    prefTD3.appendChild(
      buildCheckbox(
        "hideAlertBox",
        "Show the alert box",
        "Shows/Hides the alert box when present"
      )
    );
  }

  prefTR.appendChild(prefTD1);
  prefTR.appendChild(prefTD3);
  prefTR.appendChild(prefTD4);
  prefTable.appendChild(prefTR);
  prefTable.appendChild(secondTR);
  prefDiv.appendChild(prefTable);
  return prefDiv;
}

// MULTI PAGE: Show ALT Text on thumbnails
function viewAltText() {
  $("td img").each(function () {
    const thisImage = $(this);
    const altText = thisImage.attr("alt");
    const imgP = document.createElement("p");
    const imgTxt = document.createTextNode(`ALT: ${escapeHtml(altText)}`);
    imgP.className = "kpmAlt";
    imgP.appendChild(imgTxt);
    thisImage.after(imgP);
  });
}

// MULTI PAGE: Show TITLE on DIVS that are background images (Like viewAltText function above)
function viewDivAltText() {
  $("div [class='thumbnail']").each(function () {
    const thisTD = $(this);
    const thisTitle = $(this).attr("title");
    thisTD.after(`<p class="kpmAlt">ALT: ${escapeHtml(thisTitle)}</p>`);
  });
}

// MULTI PAGE: Add links for Best Practices
function bestPracticeLinks() {
  $("a[onclick^='modal_best_practice']").each(function () {
    const EditPattern = $(this);
    const PatternOnClick = EditPattern.attr("onclick");
    const BPID = PatternOnClick.split(", ")[1];
    let reportID2 = PatternOnClick.split(", ")[2];
    reportID2 = reportID2.split(")")[0];
    const div = document.createElement("div");

    const thisURL = `/public/standards/view_best_practice.php?violation_id=${BPID}&report_id=${reportID2}`;
    const completeURL = `${location.protocol}//${location.host}${thisURL}`;

    const goAnchor = buildIcon(
      `Go to BP ${BPID}`,
      "fas fa-external-link-alt fa-w-16 medium",
      thisURL,
      `goto${BPID}`
    );
    const copyAnchor = buildIcon(
      `Copy BP ${BPID}`,
      "far fa-copy fa-w-16 medium",
      thisURL,
      `copy${BPID}`
    );

    div.appendChild(goAnchor);
    div.appendChild(copyAnchor);
    div.className = "modalButtons";
    EditPattern.after(div);

    // Copy alert window if copyID was passed
    $(`#copy${BPID}`).click((e) => {
      e.preventDefault();
      alert(`Copied Best Practice URL\n\n${completeURL}`);
      const temp = $("<input>").val(completeURL).appendTo("body").select();
      document.execCommand("copy");
      temp.remove();
    });
  });
}

/* Client View specific functions */

// CLIENT VIEW: The whole list of hidden elements for client view.
function clientHide() {
  /* TODO: Turn this into a multidemensional array
     Items with a closest LI that needs to be hidden */
  const li = [
    '#container nav ul li a[title="Guidance"]',
    '#container nav ul li a[title="Toolbox"]',
    '#container nav ul li a[title="University"]',
    '#container nav ul li a[title="Administration"]',
    "#subnav_icon_container a:not(#BookmarkPage_Button)",
  ];

  // Items with a closest TD that needs to be hidden
  const td = [
    'table[id*="view_module"] div[class="checkbox-wrapper"]',
    '#view_patterns_container div[class="checkbox-wrapper"]',
  ];

  // Items with a closest TH that needs to be hidden
  const th = [
    'table[id*="view_module"] div[class="checkbox-wrapper"]',
    '#view_patterns_container div[class="checkbox-wrapper"]',
  ];

  // Items without a closest element that needs to be hidden
  const none = [
    "#secondary-header div",
    'table[id*="view_module"] td[class*="actions"]',
    'table[id*="view_module"] th[class="actions"]',
    "#MODULE_TAB_CONFIRMED-content div.bulk_actions_container",
    '#modules_wrapper a[class="dt-button"]',
    '#instances_wrapper a[class="dt-button left"]',
    "#view_use_cases_container div.linear_table_header",
    "#view_use_cases_container div.bulk_actions_container",
    "#edit-instances",
    "#delete-instances",
    ".bulk_actions_container",
    "#toggle-report-view-wrapper",
    'label[for="toggle-report-view"',
  ];
  let i = "0";
  for (i = 0; i < li.length; i++) {
    hideElement(li[i], "li");
  }
  for (i = 0; i < td.length; i++) {
    hideElement(td[i], "td");
  }
  for (i = 0; i < th.length; i++) {
    hideElement(th[i], "th");
  }
  for (i = 0; i < none.length; i++) {
    hideElement(none[i]);
  }
}

/* Test Module Specific Functions */

// TEST MODULE: Adds links to the Test Moudle Table Top
function testModuleLinks(moduleID) {
  let editLink = `<li><a href="/public/reporting/view_module.php?module_id=${moduleID}">Edit Module/Instances</a></li>`;
  editLink +=
    '<li><a href="#" onclick="window.location.search=window.location.search+\'&mark_complete=true\'; instHandler.showModule(); return false;">Mark Complete<span class="accessibleAltText">Opens separate pane</span></a></li>';
  return editLink;
}

/* View Module Specific Functions */

// VIEW MODULE: Baseline Checklist
function baseLine(id) {
  const blArray = dataBaseline();
  const showDetailsKey = `kpmChecklist-details-${id}`;
  const showCompletedKey = `kpmChecklist-show-${id}`;

  let i = 0;
  let output = "";
  output += '<fieldset id="kpmBaseline">';
  output +=
    '<legend>Baseline Checklist <a href="#" id="kpmPref-showBaseline">[ Hide ]</a></legend>';
  output += '<div id="kpmBaselineBox">';

  for (i = 0; i < blArray.length; i++) {
    const thisKey = `kpmChecklist-${id}-${blArray[i].key}`;

    if (!getCookieValue(thisKey) || getCookieValue(showCompletedKey)) {
      output += `<label><input id="${thisKey}" type="checkbox"`;
      if (getCookieValue(thisKey)) {
        output += ' checked="checked"';
      }
      output += ">";
      output += blArray[i].title;
      output += "</label><ul>";
      if (getCookieValue(showDetailsKey)) {
        $.each(blArray[i].subs, (k, m) => {
          output += `<li>${m}</li>`;
        });
      }
      output += "</ul>";
    }
  }
  output += '</div><div id="kpmBaselineFooter">';
  if (getCookieValue(showDetailsKey)) {
    output += `<a href="#" id="${showDetailsKey}">Hide Details</a>`;
  } else {
    output += `<a href="#" id="${showDetailsKey}">Show Details</a>`;
  }
  output += "&nbsp;|&nbsp;";
  if (getCookieValue(showCompletedKey)) {
    output += `<a href="#" id="${showCompletedKey}">Hide Completed</a>`;
  } else {
    output += `<a href="#" id="${showCompletedKey}">Show Completed</a>`;
  }
  output += "&nbsp;|&nbsp;";
  output +=
    '<a href="https://level-access.slack.com/messages/CK79W4PPU/" target="_blank">Checklist Notes</a>';
  output += "</div></fieldset>";
  return output;
}

// VIEW MODULE: Create filters by BP [ALEX]
function filterBP() {
  const wrapperDiv = document.createElement("div");
  wrapperDiv.className = "kpmFilterWraper";
  const searchField = document.createElement("input");
  const searchText = "Filter BPs by Name";
  searchField.type = "search";
  searchField.id = "violationDynamicFilter";
  const searchLbl = document.createElement("label");
  searchLbl.setAttribute("for", "violationDynamicFilter");
  searchLbl.innerText = searchText;
  searchLbl.className = "sr-only";
  searchField.placeholder = searchText;

  const filterBtn = document.createElement("button");
  filterBtn.id = "quickBPFilter";
  filterBtn.innerText = "Apply";
  filterBtn.className = "kpmFirstButton";

  const clearBtn = document.createElement("button");
  clearBtn.id = "clearBPFilter";
  clearBtn.innerText = "Clear";
  clearBtn.className = "kpmFirstButton";

  wrapperDiv.appendChild(searchLbl);
  // WrapperDiv.appendChild(document.createElement("br"));
  wrapperDiv.appendChild(searchField);
  wrapperDiv.appendChild(document.createElement("br"));
  wrapperDiv.appendChild(filterBtn);
  wrapperDiv.appendChild(clearBtn);

  // WrapperDiv += searchLbl + searchField + filterBtn + clearBtn;
  filterBtn.addEventListener("click", (evt) => {
    filterClearBPs(searchField.value);
  });

  clearBtn.addEventListener("click", (evt) => {
    filterClearBPs();
    searchField.value = "";
  });
  return wrapperDiv;
}

// VIEW MODULE: Filter modules list by BP [ALEX]
function filterClearBPs(ipt) {
  const temp = ipt;
  console.log("ipt is ", ipt);
  if (ipt !== null && typeof ipt !== "undefined") {
    console.log("ipt is ", ipt);
    const reg = new RegExp(temp, "ig");
    /* Uncheck and disable the main header checkbox for all violations to prevent mass deletion*/
    document.querySelector(
      "table[id*='view_module'] input[type='checkbox']"
    ).checked = false;
    document.querySelector(
      "table[id*='view_module'] input[type='checkbox']"
    ).disabled = true;

    [].slice
      .call(
        document
          .querySelector("table[id*='view_module']")
          .querySelectorAll("tr.odd, tr.even")
      )
      .forEach((elem) => {
        /* Hide all rows and then unhide the ones that have matches*/
        elem.classList.add("bpHide");
        /* Uncheck all checkboxes so that we can't accidentally bulk-delete visually hidden violations */
        [].slice
          .call(elem.querySelectorAll("td:first-child input[type='checkbox']"))
          .forEach((chx) => {
            console.log("checked???", chx.checked);
            chx.checked = false;
          });
        console.log("elem is ", elem);

        if (
          elem.querySelector("th") &&
          String(elem.querySelector("th").innerText).match(reg) !== null
        ) {
          console.log("match! ", elem.innerText);
          elem.classList.remove("bpHide");
        } else {
          console.log("no match. moving on");
        }
      });

    [].slice
      .call(
        document
          .querySelector("table[id*='view_module']")
          .querySelectorAll("tr.odd:not(.bpHide), tr.even:not(.bpHide)")
      )
      .forEach((elem) => {
        if (elem.nextElementSibling !== null && elem.querySelector("th")) {
          let dataRow = elem.nextElementSibling;
          dataRow.classList.remove("bpHide");
          while (
            dataRow.querySelector("td") &&
            dataRow.nextElementSibling !== null &&
            dataRow.nextElementSibling.querySelector("td")
          ) {
            if (dataRow.nextElementSibling !== null) {
              dataRow = dataRow.nextElementSibling;
            }
            console.log("dataRow is", dataRow);
            dataRow.classList.remove("bpHide");
          }
        }
      });
  } else {
    console.log("unhiding");
    [].slice.call(document.querySelectorAll(".bpHide")).forEach((el) => {
      el.classList.remove("bpHide");
    });
  }
}

// VIEW MODULE: Retest color: Colorize rows based on status message that was inserted
function retestColor() {
  $("td:has(pre) pre")
    .add("td:has(span) span")
    .each(function () {
      const thisTD = $(this);
      let thisHTML = thisTD.text();
      thisHTML = thisHTML.split("]")[0];
      if (thisHTML.indexOf("WIP") >= 0) {
        thisHTML = thisTD.text().split("]")[1];
      }
      let color = "";

      if (thisHTML.indexOf("NOT FIXED") >= 0) {
        color = "rgba(255, 249, 222, 1)";
      } else if (thisHTML.indexOf("PARTIALLY FIXED") >= 0) {
        color = "rgba(255, 249, 222, 1)";
      } else if (thisHTML.indexOf("FIXED") >= 0) {
        color = "rgba(0, 255, 0, 0.1)";
      } else if (thisHTML.indexOf("NOT RETESTED") >= 0) {
        color = "rgba(255,0,0,0.1)";
      } else if (thisHTML.indexOf("NEW") >= 0) {
        color = "#eee";
      }

      if (color) {
        thisTD
          .closest("tr")
          .attr(
            "style",
            `background-color: ${color} !important; border-bottom: 1px solid #ccc;`
          );
      }

      if (thisTD.text().split("]")[0].indexOf("WIP") >= 0) {
        const number = thisTD.closest("tr").children("td").length;
        thisTD
          .closest("tr")
          .before(
            `<tr><td colspan="${number}" style="background-color: #800000; color: #ffffff; text-align: center; font-weight: bold;">Work In Progress</td></th>`
          );
      }

      if (thisTD.text().split("]")[0].indexOf("UNDER REVIEW") >= 0) {
        const number0 = thisTD.closest("tr").children("td").length;
        thisTD
          .closest("tr")
          .before(
            `<tr><td colspan="${number0}" style="background-color: #BF590F; color: #ffffff; text-align: center; font-weight: bold;">Under Review</td></th>`
          );
      }

      if (
        thisTD.text().split("]")[0].indexOf("CODE SNIPPET LENGTH TOO LONG") >= 0
      ) {
        var number00 = thisTD.closest("tr").children("td").length;
        thisTD
          .closest("tr")
          .before(
            `<tr><td colspan="${number00}" style="background-color: #BF590F; color: #ffffff; text-align: center; font-weight: bold;">Code Snippet Error</td></th>`
          );
      }

      if (thisTD.text().split("]")[0].indexOf("MOBILE ONLY") >= 0) {
        var number00 = thisTD.closest("tr").children("td").length;
        thisTD
          .closest("tr")
          .before(
            `<tr><td colspan="${number00}" style="background-color: #BF590F; color: #ffffff; text-align: center; font-weight: bold;">Compliant Code Example Not Required (Mobile Only)</td></th>`
          );
      }

      if (thisTD.text().split("]")[0].indexOf("WEB ONLY") >= 0) {
        var number00 = thisTD.closest("tr").children("td").length;
        thisTD
          .closest("tr")
          .before(
            `<tr><td colspan="${number00}" style="background-color: #BF590F; color: #ffffff; text-align: center; font-weight: bold;">Compliant Code Example or Recommendation Missing (Web Only)</td></th>`
          );
      }

      if (
        thisTD
          .text()
          .split("]")[0]
          .indexOf("MISSING OR UNIDENTIFIED VIOLATION") >= 0
      ) {
        var number00 = thisTD.closest("tr").children("td").length;
        thisTD
          .closest("tr")
          .before(
            `<tr><td colspan="${number00}" style="background-color: #BF590F; color: #ffffff; text-align: center; font-weight: bold;">Missing or Unidentified Violation</td></th>`
          );
      }

      if (
        thisTD.text().split("]")[0].indexOf("ISSUE DOES NOT MAKE SENSE") >= 0
      ) {
        var number00 = thisTD.closest("tr").children("td").length;
        thisTD
          .closest("tr")
          .before(
            `<tr><td colspan="${number00}" style="background-color: #BF590F; color: #ffffff; text-align: center; font-weight: bold;">Issue does not make sense</td></th>`
          );
      }
      if (thisTD.text().split("]")[0].indexOf("ISSUE MISALIGNMENT") >= 0) {
        var number00 = thisTD.closest("tr").children("td").length;
        thisTD
          .closest("tr")
          .before(
            `<tr><td colspan="${number00}" style="background-color: #BF590F; color: #ffffff; text-align: center; font-weight: bold;">Issue Misalignment</td></th>`
          );
      }

      if (
        thisTD.text().split("]")[0].indexOf("NOT AN ISSUE, REMOVAL REQUIRED") >=
        0
      ) {
        var number00 = thisTD.closest("tr").children("td").length;
        thisTD
          .closest("tr")
          .before(
            `<tr><td colspan="${number00}" style="background-color: #BF590F; color: #ffffff; text-align: center; font-weight: bold;">Not an Issue</td></th>`
          );
      }

      if (
        thisTD.text().split("]")[0].indexOf("PATTERN INCORRECTLY USED") >= 0
      ) {
        var number00 = thisTD.closest("tr").children("td").length;
        thisTD
          .closest("tr")
          .before(
            `<tr><td colspan="${number00}" style="background-color: #BF590F; color: #ffffff; text-align: center; font-weight: bold;">Pattern incorrectly used</td></th>`
          );
      }

      if (
        thisTD
          .text()
          .split("]")[0]
          .indexOf("RECOMMENDATION DOES NOT MAKE SENSE") >= 0
      ) {
        var number00 = thisTD.closest("tr").children("td").length;
        thisTD
          .closest("tr")
          .before(
            `<tr><td colspan="${number00}" style="background-color: #BF590F; color: #ffffff; text-align: center; font-weight: bold;">Recommendation does not make sense</td></th>`
          );
      }

      if (thisTD.text().split("]")[0].indexOf("SILLY MISTAKE") >= 0) {
        var number00 = thisTD.closest("tr").children("td").length;
        thisTD
          .closest("tr")
          .before(
            `<tr><td colspan="${number00}" style="background-color: #BF590F; color: #ffffff; text-align: center; font-weight: bold;">Silly Mistake</td></th>`
          );
      }

      if (thisTD.text().split("]")[0].indexOf("TYPO OR GRAMMAR ISSUE") >= 0) {
        var number00 = thisTD.closest("tr").children("td").length;
        thisTD
          .closest("tr")
          .before(
            `<tr><td colspan="${number00}" style="background-color: #BF590F; color: #ffffff; text-align: center; font-weight: bold;">Typo or Grammar Issue</td></th>`
          );
      }

      if (
        thisTD.text().split("]")[0].indexOf("USE CASE RESULT ISSUE MISSING") >=
        0
      ) {
        var number00 = thisTD.closest("tr").children("td").length;
        thisTD
          .closest("tr")
          .before(
            `<tr><td colspan="${number00}" style="background-color: #BF590F; color: #ffffff; text-align: center; font-weight: bold;">Missing Use Case Issue</td></th>`
          );
      }

      if (thisTD.text().split("]")[0].indexOf("UPDATED") >= 0) {
        const number2 = thisTD.closest("tr").children("td").length;
        thisTD
          .closest("tr")
          .before(
            `<tr><td colspan="${number2}" style="background-color: #1F730D; color: #ffffff; text-align: center; font-weight: bold;">Updated</td></th>`
          );
      }
    });
}

// VIEW MODULE: Edit Pattern button
function editPattern() {
  $("a[onclick^='modal_edit_pattern']").each(function () {
    const EditPattern = $(this);
    const PatternOnClick = EditPattern.attr("onclick");
    const PatternID = PatternOnClick.split(", ")[1];
    const anchor = document.createElement("a");
    const iconSpan = document.createElement("span");
    const iconTitle = `Go to Pattern ${PatternID}`;

    iconSpan.className = "fas fa-external-link-alt fa-w-16 medium";
    anchor.appendChild(iconSpan);
    anchor.href = `/public/reporting/view_pattern.php?pattern_id=${PatternID}`;
    anchor.className = "button right-margin";
    anchor.setAttribute("aria-label", iconTitle);
    anchor.title = iconTitle;
    EditPattern.before(anchor);
  });
}

// VIEW MODULE: Add links to the "Vew Module" page above the table
function viewModuleAddInstance() {
  const li = document.createElement("li");
  const anchor =
    '<a href="#" class="bulk_actions" onclick="modal_create_instances(this); return false;" title="Add Instances, Opens Dialog" accesskey="a"><i class="fas fa-plus-square"></i> Add Instance</a>';
  li.innerHTML = anchor;
  return li;
}

// VIEW MODULE: Add link to Add Pattern on the modules page
function viewModuleAddPattern() {
  const li = document.createElement("li");
  const anchor =
    '<a href="#" class="bulk_actions" onclick="modal_create_pattern(this); return false;" title="Add Pattern, Opens Dialog" accesskey="p"><i class="far fa-copy"></i> Add Pattern</a>';
  li.innerHTML = anchor;
  return li;
}

// VIEW MODULE: Add a preference checkbox to the top of the module page to add the colors or not
function addRetestChekbox() {
  const addCheckboxDIV = document.createElement("li");
  addCheckboxDIV.setAttribute(
    "style",
    "display: inline; float: right; margin-right: 1em;"
  );
  addCheckboxDIV.appendChild(
    buildCheckbox(
      "retestColor",
      "Colorize Rows for Retests",
      "Colorizes the cells that have a retest [DATE: FIXED] in them"
    )
  );
  return addCheckboxDIV;
}

// VIEW MOUDLE: Add Mark Complete button to "View Module" tabs
function viewModuleMark(moduleID) {
  const newTab = document.createElement("li");
  const newLink = document.createElement("a");
  const newLinkText = document.createTextNode("Mark Complete");

  newTab.setAttribute("role", "presentation");
  newLink.appendChild(newLinkText);
  newLink.title = "Mark Complete - Link to Test Module";
  newLink.href = `/public/audit/test_module_alternate.php?module_id=${moduleID}&mark_complete=true`;

  newTab.appendChild(newLink);
  return newTab;
}

/* VIEW MODULE: Move the "Open view instance page" to an icon link in the
Actions column. Based on code by Joe Watkins, modified slightly. */
function moveViewInstanceToActions() {
  if ($("td.wrap.topvalign:nth-child(2)").length !== 0) {
    const details = $("td.wrap.topvalign:nth-child(2)").not(".actions");
    details.each((_idx, item) => {
      const actionsCol = $(item).parent().find(".actions");
      const linkItem = $(item).find("a");
      const itemURL = linkItem.attr("href");
      const instanceID = itemURL.split("=")[1].toString();
      actionsCol.append(
        `<a href="${itemURL}" style="margin-left: 3px;" aria-label="View details, ${instanceID}"><svg class="svg-inline--fa fa-external-link-alt fa-w-16 medium" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="external-link-alt" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M432,320H400a16,16,0,0,0-16,16V448H64V128H208a16,16,0,0,0,16-16V80a16,16,0,0,0-16-16H48A48,48,0,0,0,0,112V464a48,48,0,0,0,48,48H400a48,48,0,0,0,48-48V336A16,16,0,0,0,432,320ZM488,0h-128c-21.37,0-32.05,25.91-17,41l35.73,35.73L135,320.37a24,24,0,0,0,0,34L157.67,377a24,24,0,0,0,34,0L435.28,133.32,471,169c15,15,41,4.5,41-17V24A24,24,0,0,0,488,0Z"></path></svg></a>`
      );
      // Must be removed rather than hidden for raw HTML warnings to work.
      linkItem.remove();
    });
  }
}

/* Add Instance (Modal) Specific Functions */

// ADD INSTANCE: Function for creating the dropdowns.
function createList2(array, name, id) {
  let output = "";
  if (array.length > 0) {
    output += `<li id="${id}"><a href="#" aria-haspopup="true">${name} <span class="fas fa-angle-down" title="${array.length}"></span></a>`;
    output += '<ul class="dropdown">';
    let i;

    for (i = 0; i < array.length; i++) {
      const li = "<li>";
      if (array[i].div) {
        output += `<li class='divider'>${array[i].div}</li>`;
      }
      output += `${li}<a href="#" id='${array[i].id}'>${array[i].text}</a></li>`;
    }
    output += "</ul></li>";
  }
  return output;
}

function createListResponse(array, name, id) {
  let output = `<li><a href="#" aria-haspopup="true">${name} <span class="fas fa-angle-down"></span></a><ul class="dropdown">`;
  let i = 0;

  for (i = 0; i < array.length; i++) {
    output += `<li class='divider'>${array[i].name}</li>`;
    var c;
    for (c = 0; c < array[i].children.length; c++) {
      output += `<li><a href='#' id='${array[i].children[c].id}'>${array[i].children[c].text}</a></li>`;
    }
  }
  output += "</ul></li>";
  return output;
}

// ADD INSTANCE: Function for building the rename fields
function renameFields(value) {
  const desc = document.createElement("p");
  const descText = document.createTextNode(value);
  desc.className = "kpmSmall";
  desc.appendChild(descText);
  return desc;
}

// ADD INSTANCE: NEW Function for creating the data list on the Add Instance Modal
function bestPracticeList2(element) {
  // Get all the currently displayed best practices and turn them into an array
  const bpList = new Array();
  let category;
  $(element).each(function () {
    const myOpt = $(this);
    const myOptValue = myOpt.attr("value");
    const myOptText = myOpt.text().trim();
    if (myOptValue != "" && myOptValue > "0") {
      bpList.push({
        Value: myOptValue,
        Text: myOptText,
        Category: category,
      });
    } else {
      category = myOptText;
    }
  });

  // Create the option list based on the different versions: Compact or regular.
  const newList = new Array();
  let newCategory;
  $.each(bpList, function () {
    let myText;
    if (!getCookieValue("kpmPref-bpListCompact")) {
      if (this.Category && newCategory != this.Category) {
        const catOption = document.createElement("option");
        const catText = document.createTextNode(this.Category);
        catOption.appendChild(catText);
        newList.push(catOption);
        newCategory = this.Category;
      }
      // MyText = document.createTextNode("* " + this.Text);
      myText = `* ${this.Text}`;
    } else {
      // MyText = document.createTextNode();
      myText = `${this.Category}: ${this.Text}`;
    }
    const newOption = document.createElement("option");
    // NewOption.appendChild(myText);
    newOption.value = myText;
    newOption.setAttribute("data-value", this.Value);
    newOption.setAttribute("data-text", this.Text.trim());
    newOption.title = this.Category;
    newList.push(newOption);
  });
  return newList;
}

// ADD Success Criteria dropdown for SalesForce
function addSuccessCriteria() {
  const customSCOptions = dataSuccessCriteria();
  let sc_option = "";
  let i = 0;
  for (i = 1; i < customSCOptions.length; i++) {
    sc_option += `<option id='${customSCOptions[i].id}'>${customSCOptions[i].text} (Level ${customSCOptions[i].level}) [WCAG ${customSCOptions[i].version}]</option>`;
  }

  let sc_select = `<div class='kpmP flex-center'><label class='right-margin' for='${customSCOptions[0].id}'>${customSCOptions[0].text}</label><select id='${customSCOptions[0].id}'>${sc_option}</select></div>`;
  // Add update button
  sc_select +=
    "<input type='button' id='update-sc' value='Update' class='kpmFirstButton' aria-label='Update Success Criterion'>";
  return sc_select;
}

// ADD INSTANCE: Hides the instances 2-6 on the add instance modal
function hideAdditionalInstances() {
  $("textarea[id*='2_']")
    .add("input[id*='2_']")
    .add("select[id*='2_']")
    .add("select[id*='severity_override_']:not(:first)")
    .closest("tr")
    .hide();
  $("textarea[id*='3_']")
    .add("input[id*='3_']")
    .add("select[id*='3_']")
    .closest("tr")
    .hide();
  $("textarea[id*='4_']")
    .add("input[id*='4_']")
    .add("select[id*='4_']")
    .closest("tr")
    .hide();
  $("textarea[id*='5_']")
    .add("input[id*='5_']")
    .add("select[id*='5_']")
    .closest("tr")
    .hide();
  $("textarea[id*='6_']")
    .add("input[id*='6_']")
    .add("select[id*='6_']")
    .closest("tr")
    .hide();
  $("textarea[id*='6_']")
    .add("input[id*='6_']")
    .add("select[id*='6_']")
    .closest("tr")
    .hide();
  $("legend:contains('Upload Image'):not(:first)")
    .parent()
    .closest("tr")
    .hide();
  $("select[id*='severity_override_']:not(:first)").closest("tr").hide();
}

// Add Instance - Creates the dropdown buttons
function createAddInstanceButtons(
  preferred,
  response,
  status,
  reading,
  code,
  reviews
) {
  const currentID = $("[id*='violation_']")
    .children("option:selected")
    .attr("value");
  const customFormat = dataCustom();
  let createButtons = "";
  createButtons += "<br>";
  createButtons +=
    "<input type='button' id='ChgBPNow' value='Change Best Practice' class='kpmFirstButton'>&nbsp;";

  createButtons +=
    "<input type='button' id='GoToBP' value='Open BP (New Window)' class='kpmFirstButton'>&nbsp;";
  createButtons +=
    "<input type='button' id='addLangBlank' value='Blank Response' class='kpmFirstButton'>&nbsp;";
  createButtons +=
    "<input type='button' id='clearFields' value='Clear Fields' class='kpmFirstButton'><br>";
  createButtons += '<nav id="kpmNav"><ul>';
  if (preferred.length > 0) {
    createButtons += createList2(preferred, "Preferred", "kpmPreferred");
  } else {
    createButtons += '<li id="kpmPreferred">Preferred (none)</li>';
  }
  createButtons +=
    '<li><a href="#" id="kpmPrefSearch"><span class="fas fa-search"></span></a>';
  createButtons += createListResponse(response, "Responses");
  createButtons += createList2(reading, "Reading", "kpmReading");
  createButtons += createList2(code, "Code", "kpmCode");
  createButtons += createList2(status, "Specials", "kpmSpecials");
  createButtons += createList2(reviews, "Reviews", "kpmReviews");
  createButtons += "</ul></nav><br />";

  let i;
  for (i = 0; i < customFormat.length; i++) {
    if (getCookieValue(`kpmCustom-${customFormat[i].id}`)) {
      createButtons += `<p style='clear:both;margin:0; padding:0;'><strong>Note</strong>: Custom formatting applied - ${customFormat[i].name}</p>`;
    }
  }
  return createButtons;
}

function generateModuleError(moduleDetail) {
  const errorText =
    "Error: This text appears to contain special or escaped characters. Please edit the module and remove them.";
  const errorContainer = document.createElement("div");
  const errorElement = document.createElement("p");
  errorElement.className = "kpmAlert";
  const errorContent = document.createTextNode(errorText);
  errorElement.appendChild(errorContent);
  errorContainer.appendChild(errorElement);
  moduleDetail.appendChild(errorContainer);
}

/* Adds a button to the View Modules page that copies a plain text list of the modules to the clipboard.
   This list can be pasted into the delivery deck instead of having to copying and pasting the modules one by one. */
function copyModuleListToClipboard() {
  let moduleList = "";
  const moduleHeaderElements = document
    .querySelectorAll('th[scope="row"]')
    .forEach((moduleHeaderElement) => {
      moduleList = moduleList.concat(moduleHeaderElement.innerText, "\n");
    });

  const successfulCopy = () => {
    alert("Success: Copied plain text list of modules to clipboard!");
  };

  const failedCopy = (err) => {
    console.error("Async: Could not copy modules", err);
  };

  navigator.clipboard.writeText(moduleList).then(successfulCopy, failedCopy);
}

/* These are the containers of functions that are called below dynamically using mutation observers or delays */

// This looks at the view modules page.
function viewModules() {
  $("td:contains('http')").each(function () {
    const thisTD = $(this);
    const thisURL = thisTD.html();
    thisTD.html(
      `<a href="${thisURL}" target="_blank">${thisURL}<span class="accessibleAltText"> (Opens in New Window)</span></a>`
    );
  });

  // Adds button for copying/pasting module list.
  const copyModulesElement = document.createElement("button");
  copyModulesElement.classList.add("dt-button");
  copyModulesElement.setAttribute("aria-label", "Copy Modules");
  const copyModulesIconElement = document.createElement("i");
  copyModulesIconElement.classList.add("fas", "fa-copy");
  const copyModulesTextNode = document.createTextNode("Modules");
  copyModulesElement.appendChild(copyModulesIconElement);
  copyModulesElement.appendChild(copyModulesTextNode);
  copyModulesElement.addEventListener("click", copyModuleListToClipboard);
  document
    .querySelector("div.dt-button.disabled.spacer")
    .after(copyModulesElement);

  // TODO: Make this a function since I also do this for the instance page
  if (!getCookieValue("kpmPref-thumbALT")) {
    viewDivAltText();
  }

  // Add warnings for garbage characters
  const moduleDetails = document.querySelectorAll(
    "#modules th[scope='row'], #modules td:nth-child(4), #modules td:nth-child(6)"
  );

  const specialCharacters = dataSpecialCharacters();
  moduleDetails.forEach((moduleDetail) => {
    let hasSpecialCharacters = false;
    specialCharacters.forEach((specialCharacter) => {
      if (moduleDetail.innerText.includes(specialCharacter.id)) {
        hasSpecialCharacters = true;
      }
    });
    if (hasSpecialCharacters) {
      generateModuleError(moduleDetail);
    }
  });
}

// This looks at the View All Instances list page.
function viewInstance() {
  if (!getCookieValue("kpmPref-retestColor")) {
    retestColor();
  }
  if (!getCookieValue("kpmPref-thumbALT")) {
    viewDivAltText();
  }
}

/* Format the element
   Note that custom template *instructions* that need to be removed by the tester
     must have "**" at the start of a line (i.e. "\n**"), and then finish
     with "**" (the "**" at the end can either be on the same line as the start,
     or on a different line). */
function formatElement(issue, impact, codeReference) {
  let output = "";

  if (getCookieValue("kpmCustom-custom-wf")) {
    output += "[Summary]\n**ADA_ One line, reasonably specific**";
    output += "\n\n[Issue Description]\n";
    if ((issue && issue.length > 0) || (impact && impact.length > 0)) {
      if (issue && issue.length > 0) {
        output += issue.trim();
      }
      if (issue && issue.length > 0 && impact && impact.length > 0) {
        output += "\n\n";
      }
      if (impact && impact.length > 0) {
        output += impact.trim();
      }
    } else {
      output +=
        "**Describe the problem or symptom, the User Impact, and sufficient info about how to reproduce.**";
    }
    output += "\n\n[Devices]\n****";
    output +=
      '\n\n[Non-Compliant Example]\n**Optional or type "None". Avoid lengthy blocks. Newlines and indentation spaces will be stripped.**';
    output +=
      '\n\n[Defect Grade]\n**Agile Only: If BP is in Web Grade Checklist (any level), enter "Grade 1" or "Grade 2" or "Grade 3". If testing Mobile First and BP is in Native Checklist, enter "ADA_Grade_Native". Else remove tag or make this line blank.**';
    output +=
      "\n\n[Defect Impact Role]\n**Agile Only: If BP is in Grade Checklist (any level), keep the designated value(s) from: FED,XD,QA (no spaces between values). Else remove tag or make this line blank.**";
  } else if (getCookieValue("kpmCustom-custom-adobe")) {
    output += "[SUMMARY - Bug title for Jira.]";
    output +=
      "\n\n[CONTEXT - Keep one or customize. Enter your actual versions numbers.]";
    output +=
      "\n\n[STEPS TO REPRODUCE - Keep one or customize. Enter your actual versions numbers.]\n1. Run an automated accessibility checker, such as Access Assistant.\n1. Use a color contrast checker to compare foreground and background colors.\n1. Press Tab to move through the content.\n2. When keyboard focus is on {}, press Enter or Space to activate it.";
    output +=
      "\n\n[ACTUAL BEHAVIOR - Required. Examples or non-compliant code is optional.]\n";
    if ((issue && issue.length > 0) || (impact && impact.length > 0)) {
      if (issue && issue.length > 0) {
        output += issue.trim();
      }
      if (issue && issue.length > 0 && impact && impact.length > 0) {
        output += "\n\n";
      }
      if (impact && impact.length > 0) {
        output += impact.trim();
      }
    }
    // Else { output += "**Required. Examples or non-compliant code is optional.**"}
    output +=
      "\n\n[AFFECTED POPULATIONS - Optional. Only if different from default FPC.]\n";
    output +=
      "\n\n[WCAG PRIMARY SC - Required. Use the SC the issue should be identified under in an ACR.]\n";
    output += "\n\n[WCAG RELATED - Optional. Use sparingly.]\n";
    output +=
      "\n\n[SCREENSHOT(S) - Optional. Use when it's the easiest way to explain.]\n";
  } else if (
    getCookieValue("kpmCustom-custom-progressive-apq") ||
    getCookieValue("kpmCustom-custom-progressive-dq-inc-mobile")
  ) {
    output += "[Issue]\n";
    if (issue && issue.length > 0) {
      output +=
        "** When using AMPScript template text, be sure to make the issue description specific, and include ALL instances that you observe on the page **\n\n";
      output += issue
        .trim()
        .replaceAll("Examples include:", "Specific instances are:");
    }

    output += "\n\n[User Impact]\n";
    if (impact && impact.length > 0) {
      output += impact.trim();
    }

    output +=
      "\n\n[Steps to Reproduce]\n** Describe how a developer can reproduce the issue, including whether to use ANDI, JAWS, or some other tool. **";

    output +=
      "\n\n[Type]\n** Pick only one:\nManually detected violation\nGuided Automatic (with Manual Review) violation\nAutomatically detected violation\n**";

    if (getCookieValue("kpmCustom-custom-progressive-dq-inc-mobile")) {
      output +=
        "\n\n[Platform]\n** Pick one or more (but this whole section can be omitted for desktop-only issues):\niOS with Safari browser\nAndroid with Chrome browser\nWindows with Chrome browser\n**";
    }

    output += "\n\n[Code Reference]\n";
    if (codeReference && codeReference.length > 0) {
      output += codeReference.trim();
    }
  } else if (getCookieValue("kpmCustom-custom-salesforce")) {
    output += "[Issue]\n";
    if (issue && issue.length > 0) {
      output += issue.trim();
    }

    output += "\n\n[User Impact]\n";
    if (impact && impact.length > 0) {
      output += impact.trim();
    }

    output += "\n\n[Salesforce Prioritization]\n";
    output +=
      "\n\n[Screen Reader]\n** Provide 'X' if issue affects screen reader. Otherwise, leave empty. **";
    output +=
      "\n\n[Include in ACR]\n** Provide 'X' if issue is not Advisory. Otherwise, leave empty. **";
    output +=
      "\n\n[Image File - Optional. Use when it's the easiest way to explain.]\n";
    output += "\n\n[Code Reference]\n";
    if (codeReference && codeReference.length > 0) {
      output += codeReference.trim();
    }
  } else {
    output += "[Issue]\n";
    if (issue && issue.length > 0) {
      output += issue.trim();
    }

    output += "\n\n[User Impact]\n";
    if (impact && impact.length > 0) {
      output += impact.trim();
    }

    if (!getCookieValue("kpmCustom-custom-pdf")) {
      output += "\n\n[Code Reference]\n";
      if (codeReference && codeReference.length > 0) {
        output += codeReference.trim();
      }
    }
  }

  return output;
}

// Format the attribute
function formatAttribute(recommendation, reading, codeExample) {
  let output = "";

  if (getCookieValue("kpmCustom-custom-wf")) {
    output += "[Recommendation]\n";
    if (recommendation && recommendation.length > 0) {
      output += recommendation.trim();
    }

    if ($("#1_page").length <= 0) {
      output += "\n\n[Compliant Example]\n";
      if (codeExample && codeExample.length > 0) {
        output += codeExample.trim();
      } else {
        output +=
          '**Optional or type "None". Avoid lengthy blocks. Newlines and indentation spaces will be stripped.**';
      }
      output += "\n\n[Recommended Reading]\n";
      if (reading && reading.length > 0) {
        output += reading.trim();
      } else {
        output += '**Optional or type "None"**';
      }
    }
  } else if (getCookieValue("kpmCustom-custom-adobe")) {
    output +=
      "[EXPECTED BEHAVIOR - Description is required. Compliant code is optional.]\n";
    if (recommendation && recommendation.length > 0) {
      output += recommendation.trim();
    }
    output +=
      "\n\n[ADDITIONAL INFORMATION - Optional link to a resource. Use sparingly.]\n";
    if (reading && reading.length > 0) {
      output += reading.trim();
    }
  } else if (
    getCookieValue("kpmCustom-custom-progressive-apq") ||
    getCookieValue("kpmCustom-custom-progressive-dq-inc-mobile")
  ) {
    output += "[Recommendation]\n";
    if (recommendation && recommendation.length > 0) {
      output += recommendation.trim();
      output +=
        "\n\n** When using AMPScript template text here, be sure that the recommendation is specific, usually by editing the following line: **\n\nIn this case, {designers OR developers} must ...";
    }

    if (reading && reading.length > 0) {
      output += "\n\n[Recommended Reading]\n";
      output += reading.trim();
    }

    output += "\n\n[Compliant Code Example]\n";
    if (codeExample && codeExample.length > 0) {
      output += codeExample.trim();
    }
  } else {
    output += "[Recommendation]\n";
    if (recommendation && recommendation.length > 0) {
      output += recommendation.trim();
    }

    if (reading && reading.length > 0) {
      output += "\n\n[Recommended Reading]\n";
      output += reading.trim();
    }

    if (!getCookieValue("kpmCustom-custom-pdf")) {
      output += "\n\n[Compliant Code Example]\n";
      if (codeExample && codeExample.length > 0) {
        output += codeExample.trim();
      }
    }
  }

  return output;
}

// Take a multi-level array and flatten it. Used for the responses (not preferred)
function multiArrayFlatten(array) {
  let i;
  const newArray = [];
  for (i = 0; i < array.length; i++) {
    var j;
    for (j = 0; j < array[i].children.length; j++) {
      newArray.push(array[i].children[j]);
    }
  }
  return newArray;
}

function listAllResponses(array) {
  let output = '<div id="kpmAllResponsesPage"><h1>All Responses</h1>';

  array.sort((o1, o2) => o1.text.localeCompare(o2.text));

  let i;
  for (i = 0; i < array.length; i++) {
    const tempElement = escapeHtml(
      formatElement(array[i].issue, array[i].impact, array[i].codeReference)
    );
    const tempAttribute = escapeHtml(
      formatAttribute(
        array[i].recommendation,
        array[i].reading,
        array[i].compliantExample
      )
    );

    output += `<h2>${array[i].text}: `;
    var j;
    const bpsLength = array[i].bps.length;
    for (j = 0; j < bpsLength; j++) {
      output += array[i].bps[j];
      if (j + 1 != bpsLength) {
        output += ", ";
      }
    }
    output +=
      '<span style="float: right;">[ <a href="#" onclick="window.location.reload();">Close</a> ]</span></h2>';
    output += "<h3>Element</h3>";
    output += `<code>${tempElement}</code>`;
    output += "<h3>Attribute</h3>";
    output += `<code>${tempAttribute}</code>`;
  }

  output += "</div>";
  return output;
}

function convertColorContrastTextFromAE(noteTextFromAE) {
  // Var colorContrastRE = /This (\w+) contains text with a background color of (#[0-9a-fA-F]+) (rgb\(\d+, \d+, d+\)) and foreground color of (#[0-9a-fA-F]+) (rgb\(\d+, \d+, d+\)) that is (less than 18 point in size; or bold text less than 14 point in size) that has a luminosity contrast ratio of ([0-9\.]+), which is below (0-9\.]+:1)/
  const bgColorRE = /background color of (#[0-9a-fA-F]+)/;
  const fgColorRE = /foreground color of (#[0-9a-fA-F]+)/;
  const contrastRatioRE = /contrast ratio of ([0-9\.]{1,4})/;
  const requiredRatioRE = /([0-9\.])+:1/;
  let colorContrastTextAll = "";

  if (noteTextFromAE && typeof noteTextFromAE === "string") {
    const colorContrastTextFg = noteTextFromAE
      .match(fgColorRE)[1]
      .toUpperCase();
    const colorContrastTextBg = noteTextFromAE
      .match(bgColorRE)[1]
      .toUpperCase();
    const colorContrastTextContrastRatio =
      noteTextFromAE.match(contrastRatioRE)[1];
    const colorContrastTextRequiredRatio = parseFloat(
      noteTextFromAE.match(requiredRatioRE)[0]
    ).toFixed(2);

    if (
      colorContrastTextFg &&
      colorContrastTextBg &&
      colorContrastTextContrastRatio &&
      colorContrastTextRequiredRatio
    ) {
      colorContrastTextAll =
        `\n\n` +
        `Foreground color: ${colorContrastTextFg}\n` +
        `Background color: ${colorContrastTextBg}\n` +
        `Contrast ratio: ${colorContrastTextContrastRatio}:1` +
        `\n` +
        `Required contrast ratio for this content: ${colorContrastTextRequiredRatio}:1`;
    }
  }
  return colorContrastTextAll;
}

function stripAngularFeatures(codeText) {
  if (codeText) {
    codeText = codeText.replaceAll(/ _ngcontent\-\w+\-\w+\=\"\"/g, "");
    codeText = codeText.replaceAll(/ _nghost\-\w+\-\w+\=\"\"/g, "");
    codeText = codeText.replaceAll(/\<\!\-\-\-\-\>/g, "");
  }

  return codeText;
}

var organizationFilterFormFirstOpen = true;

// TODO: make this handle when the user un-selects the checkbox and filters orgs
function handleOrganizationFilterForm(reportID) {
  if (
    $("#organization-filter-form").length !== 0 &&
    !$("#org-bookmarks-only").prop("checked")
  ) {
    if (organizationFilterFormFirstOpen) {
      if (getCookieValue("kpmPref-nonBookmarkedOrgs")) {
        $("#org-bookmarks-only").prop("checked", true);
      }
      organizationFilterFormFirstOpen = false;
    }
  }
}
/* For the test_module_alternate.php page; if the URL includes a search term "mark_complete=true",
   then check the "Module testing is complete" checkbox so that the user only has to click "Submit" */
function handleTestingCompleteCheckbox(reportID) {
  if (
    $("#testing_complete").length !== 0 &&
    !$("#testing_complete").prop("checked")
  ) {
    if (window.location.search.indexOf("mark_complete=true") >= 0) {
      $("#testing_complete").prop("checked", true);
    }
  }
}

function removeSpecialCharacters(event) {
  const textFields = document.querySelectorAll(
    "#modal_form input[type='text'], #modal_form textarea"
  );
  const specialCharacters = dataSpecialCharacters();
  textFields.forEach((textField) => {
    specialCharacters.forEach((specialCharacter) => {
      textField.value = textField.value.replaceAll(
        specialCharacter.id,
        specialCharacter.replacement
      );
    });
  });
}

function handleEditMultipleModuleForm() {
  const fixDiv = document.createElement("div");
  const fixButton = document.createElement("button");
  const injectionPoint = document.querySelector("#modal_form #modules");
  fixButton.setAttribute("type", "button");
  fixButton.textContent = "Remove special characters";
  fixButton.addEventListener("click", removeSpecialCharacters);
  fixDiv.append(fixButton);
  injectionPoint.after(fixDiv);
}

// Add buttons to the Edit Module Form to fix any escaped HTML entities in the module name and thumbnail alt text.
function handleEditModuleForm() {
  const fixRow = document.createElement("tr");
  const fixCell = document.createElement("td");
  fixCell.setAttribute("colspan", 2);
  const fixButton = document.createElement("button");
  const injectionPoint = document.querySelector("#update_me");
  fixButton.setAttribute("type", "button");
  fixButton.textContent = "Remove special characters";
  fixButton.addEventListener("click", removeSpecialCharacters);
  fixCell.append(fixButton);
  fixRow.append(fixCell);
  injectionPoint.after(fixRow);
}

// This is the function for the Add Instance module.
function addEditor(reportID) {
  if (
    $("#amp_modal_reportModal").length !== 0 &&
    $("#AmpOpts").length === 0 &&
    window.location.href.indexOf("view_use_cases.php") <= -1
  ) {
    // Create the new best practice lists
    $("select[id*='violation_']:first").before(
      "<label for='ampOptsInpt'>Find a Best Practice: </label><br><input id='ampOptsInpt' list='AmpOpts' autocomplete='off'><datalist id='AmpOpts'></datalist><br>"
    );
    $("#AmpOpts").append(
      bestPracticeList2("select[id*='violation_']:first option")
    );

    const instanceID = $("#instance_id-").attr("value");
    if (instanceID) {
      $("#modal_dialog_message_reportModal_title").append(`: ID#${instanceID}`);
      $("#ajax_submit").click(() => {
        setTimeOut($(`#${instanceID}`).focus(), 1000);
      });
    }

    const currentID = parseInt(
      $("[id*='violation_']").children("option:selected").attr("value")
    );

    // Place the buttons
    $("#AmpOpts").after(
      createAddInstanceButtons(
        dataPreferredFiltered(currentID),
        dataResponse2(),
        dataStatus(),
        dataReading(),
        dataCode(),
        dataReviews()
      )
    );

    // Changes the best practice
    $("#ChgBPNow").on("click", () => {
      const inputValue = $("#ampOptsInpt").val().trim();
      const newBP = parseInt(
        $(`#AmpOpts option[value="${inputValue}"]`).attr("data-value")
      );
      // Console.log(inputValue + " * " + newBP);
      $("select[id*='violation_']:first").val(newBP);
      const BPValue = 0;
      $("select[id*='severity_']:first").val(BPValue).val();

      const newPreferredListList = dataPreferredFiltered(newBP);
      if (newPreferredListList.length > 0) {
        $("#kpmPreferred").replaceWith(
          createList2(newPreferredListList, "Preferred", "kpmPreferred")
        );
      }
    });

    // Button to add "Go to best practice"
    $("#GoToBP").on("click", () => {
      const inputValue = $("#ampOptsInpt").val().trim();
      let newBP = $(`#AmpOpts option[value="${inputValue}"]`).attr(
        "data-value"
      );
      if (!newBP) {
        newBP = $("select[id*='violation_']:first").val();
      }
      if (newBP && newBP > 0) {
        const newBPURL = `/public/standards/view_best_practice.php?violation_id=${newBP}&report_id=${reportID}`;
        window.open(newBPURL, "_blank");
      } else {
        alert("No Best Practice Selected");
      }
    });

    // Two single use statuses - Blank and clear everything
    $("#addLangBlank").on("click", () => {
      let origVal = $("textarea[id*='element']:first").val();
      let newText = formatElement();
      if (
        getCookieValue("kpmCustom-custom-progressive-apq") ||
        getCookieValue("kpmCustom-custom-progressive-dq-inc-mobile")
      ) {
        origVal = stripAngularFeatures(origVal);
      }
      newText += origVal;
      reportID;
      const origVal2 = $("textarea[id*='attribute']:first")
        .add("textarea[id*='note']:first")
        .val();
      let newText2 = formatAttribute();
      newText2 += origVal2;

      $("textarea[id*='element']:first").val(newText);
      $("textarea[id*='attribute']:first")
        .add("textarea[id*='note']:first")
        .val(newText2);
    });

    $("#clearFields").on("click", () => {
      $("textarea[id*='element']:first").val("");
      $("textarea[id*='attribute']:first")
        .add("textarea[id*='note']:first")
        .val("");
    });

    // When a response is given, this fills in the fields.
    $("body").delegate("[id*='response-']", "click", function () {
      const clickID = $(this).attr("id");
      const response = dataResponse2();
      const newArray = multiArrayFlatten(response);

      const combinedArray = $.merge(dataPreferred(), newArray);

      const entry = combinedArray.find((e) => e.id === clickID);

      // Inject color contrast data
      if (entry.convertColorContrastText) {
        var oldVar2 = $("textarea[id*='attribute']:first")
          .add("textarea[id*='note']:first")
          .val();

        const colorContrastStats = convertColorContrastTextFromAE(oldVar2);

        if (colorContrastStats) {
          const issueLines = entry.issue.split("\n\n");
          entry.issue = `${issueLines[0] + colorContrastStats}\n\n${
            issueLines[2]
          }`;
        }
      }

      const newVar1 = formatElement(entry.issue, entry.impact);
      const newVar2 = formatAttribute(
        entry.recommendation,
        entry.codeReference
      );

      if (newVar1) {
        let oldVar1 = $("textarea[id*='element']:first").val();
        if (
          getCookieValue("kpmCustom-custom-progressive-apq") ||
          getCookieValue("kpmCustom-custom-progressive-dq-inc-mobile")
        ) {
          oldVar1 = stripAngularFeatures(oldVar1);
        }
        $("textarea[id*='element']:first").val(newVar1 + oldVar1);
      }

      if (newVar2) {
        var oldVar2 = $("textarea[id*='attribute']:first")
          .add("textarea[id*='note']:first")
          .val();
        $("textarea[id*='attribute']:first")
          .add("textarea[id*='note']:first")
          .val(newVar2 + oldVar2);
      }
    });
    // Chad added button handler
    $("[id*='reviews-']").click(function () {
      const clickID = $(this).attr("id");
      const reviews = dataReviews();
      let text1 = "";
      const str1 = $("textarea[id*='element']:first").val();
      const index1 = str1.indexOf("Fixed]");
      const index2 = str1.indexOf("Not Fixed]");
      const index3 = str1.indexOf("[Type");
      const index4 = str1.indexOf("[WCAG");
      const index5 = str1.indexOf("Partially Fixed]");
      const index6 = str1.indexOf("[Pattern");
      const index7 = str1.indexOf("[Issue]");
      let thisIndex1 = 0;
      if (index1 != -1) thisIndex1 = index1;
      else if (index2 != -1) thisIndex1 = index2;
      else if (index3 != -1) thisIndex1 = index3;
      else if (index4 != -1) thisIndex1 = index4;
      else if (index5 != -1) thisIndex1 = index5;
      else if (index6 != -1) thisIndex1 = index6;
      else thisIndex1 = index7;
      console.log(thisIndex1);

      //         Var thisIndex1 = str1.indexOf("[Issue]");
      const formatted1 = str1.substr(thisIndex1);

      const entry1 = reviews.find((e) => e.id === clickID);
      // For Under Review or Missing
      if (entry1.date == "name") {
        const name1 = $("#userinfo ul li:first").text();
        const newText1 = entry1.text.split("-")[0].trim();
        text1 = `[${newText1.toUpperCase()} -${name1}]\nPlease review the 'Defect Comments' area for more details\n\n--------------------------\n\n${$(
          "textarea[id*='element']:first"
        ).val()}`;
      } else {
        // For Clear Review
        let $today1 = new Date();
        const dd1 = $today1.getDate();
        const mm1 = $today1.getMonth() + 1;
        const yyyy1 = $today1.getFullYear();
        $today1 = `${mm1}/${dd1}/${yyyy1}`;
        if (entry1.text == "Complete") {
          text1 = formatted1;
        } else if (entry1.text == "Updated") {
          text1 = `[${$today1}: ${entry1.text.toUpperCase()}]\n\n--------------------------\n\n${formatted1}`;
        } else {
          text1 = `[${$today1}: ${entry1.text.toUpperCase()}]\n\n--------------------------\n\n${$(
            "textarea[id*='element']:first"
          ).val()}`;
        }
      }
      // For Clear Review
      if (entry1.var1) {
        $("select[id*='defect_status_']:first").val(entry1.var1);
        if (entry1.var1 == "new") {
          if (entry1.text == "Complete") {
            $("textarea[id*='defect_comments_']:first").val("");
          } else {
            $("textarea[id*='defect_comments_']:first").val(
              "Please go into the baseline list and locate the test for this missing violation."
            );
          }
        }
      }
      if (entry1.text) {
        $("textarea[id*='element']:first").val(text1);
      }
    });
    // When a status is given, this prepends the first field
    $("[id*='status-']").click(function () {
      const clickID = $(this).attr("id");
      const status = dataStatus();
      const entry = status.find((e) => e.id === clickID);
      let text = "";
      if (clickID.indexOf("status-wcag") >= 0) {
        const level = clickID.split("-")[2].toUpperCase();
        text = `[WCAG Level: ${level}]\n\n${$(
          "textarea[id*='element']:first"
        ).val()}`;
      } else if (entry.date == "name") {
        const name = $("#userinfo ul li:first").text();
        const newText = entry.text.split("-")[0].trim();
        text = `[${newText.toUpperCase()} -${name}]\n\n${$(
          "textarea[id*='element']:first"
        ).val()}`;
      } else if (entry.date == "no") {
        text = `[${entry.text.toUpperCase()}]\n\n${$(
          "textarea[id*='element']:first"
        ).val()}`;
      } else {
        let $today = new Date();
        const dd = $today.getDate();
        const mm = $today.getMonth() + 1;
        const yyyy = $today.getFullYear();
        $today = `${mm}/${dd}/${yyyy}`;
        text = `[${$today}: ${entry.text.toUpperCase()}]\n\n--------------------------\n\n${$(
          "textarea[id*='element']:first"
        ).val()}`;
      }
      if (entry.text) {
        $("textarea[id*='element']:first").val(text);
      }
      if (entry.var1) {
        $("select[id*='defect_status_']:first").val(entry.var1);
      }
    });

    // When code is given, this appends the second field
    $("[id*='css-']").click(function () {
      const clickID = $(this).attr("id");
      const cssCode = dataCode();
      const entry = cssCode.find((e) => e.id === clickID);

      const prefix = "\n\n";
      const text =
        $("textarea[id*='attribute']:first")
          .add("textarea[id*='note']:first")
          .val() +
        prefix +
        entry.value;
      if (entry.value) {
        $("textarea[id*='attribute']:first")
          .add("textarea[id*='note']:first")
          .val(text);
      }
    });

    // When a reading is given, this appends the second field
    $("[id*='reading-']").click(function () {
      const clickID = $(this).attr("id");
      const reading = dataReading();
      const entry = reading.find((e) => e.id === clickID);

      const prefix = "\n\n[Recommended Reading]\n";
      const text =
        $("textarea[id*='attribute']:first")
          .add("textarea[id*='note']:first")
          .val() +
        prefix +
        entry.value;

      if (entry.value) {
        $("textarea[id*='attribute']:first")
          .add("textarea[id*='note']:first")
          .val(text);
      }
    });

    // When a special is given, this appends the second field
    $("[id*='special-']").click(function () {
      const clickID = $(this).attr("id");
      const status = dataStatus();
      const entry = status.find((e) => e.id === clickID);

      if (entry.var1 && entry.loc == "1") {
        const text = `[${entry.var1}]\n\n${$(
          "textarea[id*='element']:first"
        ).val()}`;
        $("textarea[id*='element']:first").val(text);
      } else if (entry.var1) {
        const text2 = `[${entry.var1}]\n\n${"textarea[id*='attribute']:first"
          .add("textarea[id*='note']:first")
          .val()}`;
        $("textarea[id*='attribute']:first")
          .add("textarea[id*='note']:first")
          .val(text2);
      }
    });

    // Extras: Bottom of first field
    $("[id*='extras-']").click(function () {
      const clickID = $(this).attr("id");
      const status = dataStatus();
      const entry = status.find((e) => e.id === clickID);
      let text = $("textarea[id*='element']:first").val();
      text += `\n\n[${entry.var1}]\n`;
      $("textarea[id*='element']:first").val(text);
    });

    // Pattern: Add Pattern and Name if Available to the top of the First field.
    $("#code-pattern").click(() => {
      let pattern = "";
      const patternID = `name_${$("#pattern_id-").attr("value")}`;
      let patternName = $(`#${patternID}`).val();
      if (!patternName) {
        patternName = $("h3:contains(Pattern Members)")
          .text()
          .split("-")
          .slice(1)
          .join("-");
      }
      if (patternName) {
        pattern = patternName;
      }
      let text = `[Pattern: ${pattern}]\n\n`;
      text += $("textarea[id*='element']:first").val();
      // If (!getCookieValue("kpmPref-addOccurances")) { text += "\n\n[Occurrences]\n"; }
      $("textarea[id*='element']:first").val(text);
    });

    // Special Use Case: Add Module Number and Instance ID to the Second Field
    $("#code-modIns").click(() => {
      let FirstDigit = "XX";
      let SecondDigit = "XXX";
      let ModID = $(document).attr("title");
      ModID = ModID.substr(0, ModID.indexOf(" ")).replace(/\D/g, "");
      if (ModID) {
        FirstDigit = ModID;
      }
      let InstID = "";
      InstID = $("#instance_id-").attr("value");
      if (InstID) {
        SecondDigit = InstID.slice(-3);
      }
      let text = `[${FirstDigit} / ${SecondDigit}]\n\n`;
      text += $("textarea[id*='attribute']:first")
        .add("textarea[id*='note']:first")
        .val();
      $("textarea[id*='attribute']:first")
        .add("textarea[id*='note']:first")
        .val(text);
    });

    // Special Use Case: Add Current Date to the 1st field
    $("#current-date").click(() => {
      const $today = new Date();
      const dd = $today.getDate();
      const mm = $today.getMonth() + 1;
      const yy = $today.getFullYear();

      let text = `[${mm}/${dd}/${yy}]\n\n`;
      text += $("textarea[id*='element']:first").val();
      $("textarea[id*='element']:first").val(text);
    });

    /* Miscellanious items for the add instance modal
       Resize the text areas */
    $("textarea[id*='element']:first").attr("rows", "12");
    $("textarea[id*='attribute']:first").attr("rows", "12");
    $("textarea[id*='note']:first").attr("rows", "12");

    $("textarea[id*='element']:first").attr("cols", "75");
    $("textarea[id*='attribute']:first").attr("cols", "75");
    $("textarea[id*='note']:first").attr("cols", "75");

    // This section is to hide input fields 2-6 on ADD only.
    if (!getCookieValue("kpmPref-showOne")) {
      hideAdditionalInstances();
    }

    /* For Salesforce Custom Success Criteria
       TODO: (Perla - Would be a better idea to link each BP to the level, name of sc, and version) */
    if (getCookieValue("kpmCustom-custom-salesforce")) {
      $("select[id*='violation_']:first").after(addSuccessCriteria());

      // Add tags to the description field
      $("#update-sc").click(() => {
        // Format of options on-screen is: SC 1.1.1 Non-text Context (Level A) [WCAG 2.0]
        const select_sc_val = $("#select-sc").val().split("[");
        const wcag_sc = select_sc_val[0];
        const wcag_version = select_sc_val[1].split("]")[0];

        let text = $("textarea[id*='element']:first").val();
        text += `\n\n[WCAG Success Criteria]\n${wcag_sc}`; // Add success criteria
        text += `\n\n[WCAG Standard]\n${wcag_version}`; // Add version

        $("textarea[id*='element']:first").val(text);
      });
    }
  }
}

/* START USE CASE
   This stuff is for adding use case related functionality */
function generateSummary() {
  const UC_ISSUE_REGEXP =
    /\[(?<score>[1-4])\s*(STOPPER)?:\s*(?<description>.*)\]/gi;
  let ucGeneralComments = "";
  const issues = [];
  let finalScore = 0; // (1 through 5) The score of the lowest-scoring issue, or 5 if there are no issues.
  const steps = document.querySelectorAll(
    "textarea[name^='use_case_step_result']"
  );
  const rating = document.getElementById("rating");
  ucGeneralComments = "";
  for (let i = 0; i < steps.length; i++) {
    // Let stepInfo = document.querySelector("label[for=" + steps[i].id + "]").innerText;
    matches = steps[i].value.matchAll(UC_ISSUE_REGEXP);
    if (matches !== null) {
      for (const item of matches) {
        const issue = {
          score: item.groups.score,
          description: item.groups.description,
        };

        issues.push(issue);
      } // End for (item of matches)
    } // End if matches !== null
  } // End for (i < steps.length)
  if (issues.length > 0) {
    issues.sort((a, b) => {
      if (a.score < b.score) {
        return -1;
      }
      if (a.score > b.score) {
        return 1;
      }
      return 0;
    });
    finalScore = issues[0].score;
    const uniqueIssues = [
      ...new Map(issues.map((m) => [m.description.toLowerCase(), m])).values(),
    ];
    uniqueIssues.forEach((issue) => {
      /* This function gets called by the forEach on the list of issues sorted by score.
         scoreIndex will contain the current score. Since the list is sorted, the score will be the same for a while, then change. when it does, insert a new banner.
         lastScoreIndex is used to compare to see if a new banner needs to be inserted.
         Thanks stackoverflow for how to do static variables in js so I don't have to add globals. */
      const UC_BANNERS = [
        "STOPPERS:",
        "Major Issues:",
        "Minor Issues:",
        "Advisory Issues:",
      ];
      const scoreIndex = issue.score - 1;
      if (
        typeof lastScoreIndex === "undefined" ||
        scoreIndex != lastScoreIndex ||
        ucGeneralComments.length == 0
      ) {
        lastScoreIndex = scoreIndex;
        ucGeneralComments += `${UC_BANNERS[scoreIndex]}\n`;
      }
      if (issue.description.length > 0) {
        ucGeneralComments += `${issue.description}\n\n`;
      } else {
        ucGeneralComments += "WARNING: Issue with no description.\n\n";
      }
    });
    document.getElementById("description").value = ucGeneralComments;
  } else {
    finalScore = 5; // No accessibility issues.
    document.getElementById("description").value = "No accessibility issues.\n";
  }
  for (const opt of rating.options) {
    if (opt.value == finalScore) {
      rating.selectedIndex = opt.index;
      break;
    }
  }
  document.getElementById("rating").focus();
}

function addGenerateSummaryButton() {
  if (
    $("#amp_modal_reportModal").length !== 0 &&
    $("#AmpOpts").length === 0 &&
    window.location.href.indexOf("view_use_cases.php") > -1
  ) {
    const generateSumElement = document.createElement("button");
    const generateSumText = document.createTextNode("Generate Summary");
    generateSumElement.appendChild(generateSumText);
    generateSumElement.setAttribute("id", "generateSum");
    generateSumElement.setAttribute("type", "button");
    generateSumElement.style.display = "block";
    generateSumElement.addEventListener("click", (event) => {
      event.preventDefault();
      generateSummary();
    });
    document.querySelector("#description").after(generateSumElement);
  }
}

// END USE CASE

/* This is what injects into the page */
(function () {
  console.log("The ACE AMP Script function loaded on AMP");
  const target = document.body;
  const reportID = getID(location.href, "report_id");
  const moduleID = getID(location.href, "module_id");
  const instanceID = getID(location.href, "instance_id");

  // If running from an external link, check to see if it is already running by looking for something that is always on.
  if (document.getElementById("kpmScriptRunning") != null) {
    alert("AMP script is already running");
  }
  // Client mode - Don't do any add stuff and hide a few things.
  else if (
    getCookieValue("kpmPref-clientMode") &&
    getCookieValue("kpmPref-clientMode") == reportID
  ) {
    // Toggle report view to SIMPLE
    if (
      document.querySelector("#toggle-report-view") &&
      !document.querySelector("#toggle-report-view").checked
    ) {
      document.getElementById("toggle-report-view").click();
    }

    // Place the testing mode button in the side so that users can get back
    $("#container nav ul").append(
      '<li tabindex="-1"><a href="#" id="kpmPref-clientMode"><span class="fas fa-laptop-code"></span>Testing Mode</a></li>'
    );

    // Hide function
    clientHide();

    // Misc functions to clean up items after things have been removed
    const vmColspan = $('table[id*="view_module"] th[colspan]:first').attr(
      "colspan"
    );
    $('table[id*="view_module"] th[colspan]').attr(
      "colspan",
      parseInt(vmColspan, 10) - 2
    );
    $("#view_patterns_container thead th:not([width])").attr(
      "style",
      "width: 100%;"
    );

    // For the things I can't directly control, modify with CSS
    const cssArrayClient = {
      // General CSS
      "table.large, .view_patterns_container": "width: 100% !important;",
      "td.select-checkbox, th.select-checkbox, td.actions, th.actions, #view_use_cases_container table thead tr th:first-of-type, #view_use_cases_container table tbody tr td:first-of-type":
        "display: none;",
    };
    $("head").append(buildCSS(cssArrayClient));
  }
  // Testing Mode - Normal view for Level Access Testers
  else {
    // Add CSS to head
    $("head").append(buildCSS(dataCSS()));

    // Add button for client mode
    $("#container nav ul").append(
      '<li tabindex="-1"><a href="#" id="kpmPref-clientMode" title="Simulates the client\'s view for delivery calls"><span class="fas fa-laptop-code"></span>Client Mode</a></li>'
    );

    // EXPERIMENTAL - Get the table of patterns from the patterns page
    if (
      window.location.href.indexOf("/view_module.php?module_id=") >= 0 &&
      !getCookieValue("kpmPref-addPatterns")
    ) {
      const table = ajaxCall(
        `/public/reporting/view_globals_and_patterns.php?report_id=${reportID}`,
        "#view_patterns_container table"
      );
      setTimeout(() => {
        $("#MODULE_TAB_CONFIRMED-content").append(
          `<h3>Existing Patterns</h3><table>${table}</table>`
        );
      }, 1500);
    }

    // Builds the preferences box for the bottom of the page.
    if (
      reportID !== null &&
      $("#content") &&
      !getCookieValue("kpmPref-hidePrefs")
    ) {
      $("#content").append(preferencesBox());
    } else {
      $("#content").append(
        buildCheckbox(
          "hidePrefs",
          "Show AMP Script Preferences",
          "Shows The ACE AMP Script preferences box"
        )
      );
    }

    $("#kpmViewAll").on("click", () => {
      $("#container").html(listAllResponses(dataPreferred()));
    });

    // DASHBOARD (view_report.php)
    if (window.location.href.indexOf("/view_report.php") >= 0) {
      // ALWAYS ON: if Dashboard, checkbox for full description
      $(".description:first h3").prepend(
        buildCheckbox(
          "fullDescription",
          "Show Full Desciption",
          "Makes the description box show all the content",
          "kpmDescPref"
        )
      );
    }

    // VIEW MODULE (view_module.php)
    if (window.location.href.indexOf("/view_module.php?module_id=") >= 0) {
      // ALWAYS ON: This adds links/tabs/access keys to the View Module page.
      $("#menu_table_toolbar_actions").append(viewModuleAddInstance());
      $("#menu_table_toolbar_actions").append(viewModuleAddPattern());
      $("#menu_table_toolbar_actions").append(addRetestChekbox());
      $("a[onclick*='modal_edit_report_instances']").attr("accesskey", "z");
      $("a[onclick*='modal_delete_report_instances']").attr("accesskey", "x");
      $("ul[class='a11y-tabs-list']").append(viewModuleMark(moduleID));
      // ALWAYS ON: This makes the thumbnails retain their shape rather than being forced into a square
      $("table[id*='view_module'] img").attr("height", "auto");

      // FROM ALEX - FILTER FOR BP
      if (!getCookieValue("kpmPref-instanceFilter")) {
        $("#page_form").before(filterBP());
      }

      // Makes the ALT text visible for images. Doesn't work on the modal list as those are DIVs with background images
      if (!getCookieValue("kpmPref-thumbALT")) {
        viewAltText();
      }

      // Baseline Checkbox
      if (!getCookieValue("kpmPref-showBaseline")) {
        $(".view-module-container:first").prepend(baseLine(moduleID));
      }

      // For each patern in the list, creates a link button so that you can navigate there quickly
      if (!getCookieValue("kpmPref-addPatternLink")) {
        editPattern();
      }

      // Figure out if there is a status on this and apply a color.
      if (!getCookieValue("kpmPref-retestColor")) {
        retestColor();
      }

      /* Move the view instance link over to the Actions column
            Must occur before warning injection, or raw HTML warnings will
            break */
      if (!getCookieValue("kpmPref-moveInstanceLink")) {
        moveViewInstanceToActions();
      }

      // INJECT WARNINGS FOR EACH BEST PRACTICE
      if (!getCookieValue("kpmPref-bpWarnings")) {
        const bpRows = document.querySelectorAll("[id^='bp_']");
        bpRows.forEach((bpRow) => {
          const bpID = bpRow.getAttribute("id").replace("bp_", "");
          generateBPErrors(bpRow, bpID);
        });
      }

      // INJECT WARNINGS FOR EACH ISSUE
      if (!getCookieValue("kpmPref-tableWarning")) {
        const issueRows = document.querySelectorAll(
          "[id^='view_module_table'] tr:has(td.wrap.topvalign)"
        );
        issueRows.forEach((issueRow) => {
          const descriptionElement =
            issueRow.querySelector("td:nth-of-type(2)");
          const noteElement = issueRow.querySelector("td:nth-of-type(3)");
          generateIssueErrors(issueRow, descriptionElement, noteElement);
        });
      }
    }

    // TEST MODULE (test_module_alternate.php)
    if (window.location.href.indexOf("test_module_alternate.php") >= 0) {
      // ALWAYS ON: Makes the test module open with the review tab (mark complete) by default rather than an empty page.
      $("body").attr(
        "onload",
        "javascript:instHandler.showModule(); return false;"
      );

      // ALWAYS ON: Adds the links to the top of the page for mark complete and edit module.
      $("#menu_table_toolbar_actions").append(testModuleLinks(moduleID));
    }

    // VIEW PATTERN (view_pattern.php)
    if (window.location.href.indexOf("/view_pattern.php") >= 0) {
      // ALWAYS ON: Adds accesskey to the patterns side rather than the module details side.
      $("a[onclick*='modal_create_pattern_violation']").attr("accesskey", "a");
      $("a[onclick*='modal_delete_pattern_violations']").attr("accesskey", "x");
    }

    /* ADD INSTANCE (add_instance.php) - This is the window that appears if you mess up a submission from the modal
       TODO: this doesn't fully work. Look into it */
    if (window.location.href.indexOf("/add_instance.php") >= 0) {
      addEditor(reportID);
    }

    // USE CASES
    function copyUseCasesToClipboard() {
      const useCaseSet = new Set();
      const useCaseHeaderElements = document.querySelectorAll(
        "table.large td:nth-child(2) a"
      );
      console.log(useCaseHeaderElements);
      useCaseHeaderElements.forEach((useCaseHeaderElement) => {
        const useCaseNameRaw = useCaseHeaderElement.innerHTML;
        const useCaseName = useCaseNameRaw
          .split('<span class="accessibleAltText">')
          .at(0);
        useCaseSet.add(useCaseName);
      });
      console.log(useCaseSet);

      let useCaseList = "";

      useCaseSet.forEach((str) => {
        useCaseList = `${useCaseList + str}\n`;
      });

      const successfulCopy = () => {
        alert("Success: Copied plain text list of use cases to clipboard!");
      };

      const failedCopy = (err) => {
        console.error("Async: Could not copy use cases", err);
      };

      navigator.clipboard
        .writeText(useCaseList)
        .then(successfulCopy, failedCopy);
    }

    if (window.location.href.indexOf("/view_use_cases.php") >= 0) {
      const copyUseCaseLink = document.createElement("a");
      copyUseCaseLink.href = "#";
      copyUseCaseLink.classList.add("bulk_actions");
      copyUseCaseLink.innerHTML =
        "<i class='far fa-copy'></i>Copy use cases to clipboard";
      copyUseCaseLink.addEventListener("click", copyUseCasesToClipboard);
      const copyUseCaseListItem = document.createElement("li");
      copyUseCaseListItem.append(copyUseCaseLink);
      const injectionPoint = document.querySelector(
        "#menu_table_toolbar_actions"
      );
      injectionPoint.append(copyUseCaseListItem);
    }

    /* GLOBAL ELEMENTS
       GLOBAL ALWAYS ON: Adds the links to the header IF there is a report id (this way they don't appear on the best practices, etc.). */
    if (reportID) {
      $("#secondary-header>.chooser").after(mainNav(reportID, moduleID));
    }

    // GLOBAL ALWAYS ON: Add options to number of items shown in the Violations Lists
    $("#instances_length select").prepend(
      '<option value="5">5</option><option value="10">10</option>'
    );
    $("#instances_length select option[value='2000']").before(
      '<option value="500">500</option><option value="1000">1000</option>'
    );

    // GLOBAL: Any time there is a best practice modal link, create buttons to the page best practice and the copy best pratice
    if (!getCookieValue("kpmPref-addBPLink")) {
      bestPracticeLinks();
    }

    // GLOBAL: Hide Global Patterns
    if (!getCookieValue("kpmPref-globals")) {
      // Hides Globals from edit patern
      if (window.location.href.indexOf("/view_globals_and_patterns.php") >= 0) {
        $("h2:contains('Globals')").hide();
        $("#view_globals_container").hide();
        $("#view_globals_container").after(
          '<p class="kpmSmall">Globals hidden by the ACE AMP Script. You can make them show again in the preferences below.</p>'
        );
      }
      $("a[onclick^='modal_create_global']").hide();
    }

    /* The following should be done with mutationObersvers, but I can't figure it out right now. So for now, they are on delay.
       VIEW MODULES (view_modules.php) */
    if (window.location.href.indexOf("/view_modules.php") >= 0) {
      setTimeout(() => {
        viewModules();
      }, 1500);
    }

    if (window.location.href.indexOf("/view_instances.php") >= 0) {
      setTimeout(() => {
        viewInstance();
      }, 3000);
    }

    /* The following are tools for functionality, not functionality itself, so there is no preference for turning on/off.
       Pramaters for the mutation obsercers */
    const config = {
      attributes: true,
      childList: true,
      characterData: true,
      subtree: true,
    };

    // Add Editor
    if ($("#amp_modal_reportModal").length === 0) {
      // Set up the mutation observer for the view modules page
      const addObserver = new MutationObserver((mutations, me) => {
        const addModal = document.getElementById("modal_form");
        if (addModal) {
          if ($(addModal).prop("action").indexOf("edit_module.php") >= 0) {
            handleEditModuleForm();
          } else if (
            $(addModal).prop("action").indexOf("edit_multiple_modules.php") >= 0
          ) {
            handleEditMultipleModuleForm();
          } else if (
            $(addModal).prop("action").indexOf("perform_use_case_test.php") >= 0
          ) {
            addGenerateSummaryButton();
          } else {
            addEditor(reportID);
          }
          me.disconnect(); // Stop observing
          return;
        }
        const changeOrganization = document.getElementById(
          "organization-filter-form"
        );
        if (changeOrganization) {
          handleOrganizationFilterForm(reportID);
          me.disconnect(); // Stop observing
          return;
        }
        const testingCompleteCheckbox =
          document.getElementById("testing_complete");
        if (testingCompleteCheckbox) {
          handleTestingCompleteCheckbox(reportID);
          me.disconnect(); // Stop observing
        }
      });
      addObserver.observe(target, config);
    }
  }

  // Function to set the cookie if click on a checkbox happened. All the way at the bottom of the script to make sure that it catches everything
  $("[id*='kpmPref-']")
    .add("[id*='kpmChecklist-']")
    .click(function () {
      const clickID = $(this).attr("id");
      const cbCookie = getCookieValue(clickID);

      if (cbCookie) {
        Cookies.set(clickID, "", -1);
      } else if (clickID == "kpmPref-clientMode") {
        Cookies.set(clickID, reportID);
      } else if (clickID.indexOf("kpmChecklist-") !== -1) {
        Cookies.set(clickID, reportID, { expires: 60 });
      } else {
        Cookies.set(clickID, reportID, { expires: 7 });
      }
      location.reload();
    });

  // Set the cookie for custom formatting
  $("[id*='kpmCustom-']").click(function () {
    const clickID = $(this).attr("id");
    const customOptions = dataCustom();

    // Unset all cookies first
    let i;
    for (i = 0; i < customOptions.length; i++) {
      Cookies.set(`kpmCustom-${customOptions[i].id}`, "", -1);
    }

    // Set the new cookie if not default
    if (clickID != "kpmCustom-default") {
      Cookies.set(clickID, reportID, { expires: 7 });
    }
    location.reload();
  });
})();