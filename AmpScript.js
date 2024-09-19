// ==UserScript==
// @name         The ACE AMP Script (formerly 'AMP - Insert Add Instances')
// @namespace    http://tampermonkey.net/
// @version      6.13.2
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
// @require      https://unpkg.com/prettier@3.1.0/standalone.js
// @require      https://unpkg.com/prettier@3.1.0/plugins/html.js
// ==/UserScript==

// temp/BaseScript.js
const $ = window.jQuery;
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
      reason: "outdated",
      url: "accessibility.dev",
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
      url: "www.w3.org/TR/WCAG21",
    },
    {
      reason: "outdated",
      url: "w3.org/WAI/GL/",
    },
    {
      reason: "outdated",
      url: "w3.org/WAI/WCAG20",
    },
    {
      reason: "outdated",
      url: "w3.org/WAI/WCAG21",
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
function dataBaseline() {
  const blArray = [
    {
      key: "keyboardAccess",
      subs: [
        "Ensure all interactive functionality is operable with the keyboard",
      ],
      title: "Keyboard Access and interaction",
    },
    {
      key: "keyboardTrap",
      subs: ["Ensure keyboard focus is not trapped"],
      title: "Keyboard Trap",
    },
    {
      key: "focusOrder",
      subs: [
        "Ensure the focus order of interactive elements on the page is logical",
      ],
      title: "Focus Order",
    },
    {
      key: "focusVisible",
      subs: ["Ensure keyboard focus is indicated visually"],
      title: "Focus Visible",
    },
    {
      key: "focusIssues",
      subs: [
        "Ensure content updates define focus updates appropriately",
        "Avoid using event handlers that trigger focus or context changes on user input",
        "Avoid forced focus changes that are not user-initiated",
      ],
      title: "Focus Issues/movement on interaction",
    },
    {
      key: "content",
      subs: [
        "Ensure link text is meaningful within context",
        "Provide a mechanism for skipping past repetitive content",
        "Ensure there is more than one way to locate a web page in a set of pages",
        "Ensure that elements with the same functionality are consistently identified across pages",
        "Ensure pages use a consistent navigation structure",
      ],
      title: "Repetitive Content, link purpose, consistency, and multiple ways",
    },
    {
      key: "interactiveElements",
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
      title:
        "Information for all interactive elements including forms and frames",
    },
    {
      key: "errorConditions",
      subs: [
        "Provide suggestions for error messages when known",
        "Provide error prevention for legal commitments, financial transactions, test responses, and data changes",
        "Provide a clear indication of fields in error for information that is submitted",
        "Ensure instructions do not rely solely on sensory characteristic",
      ],
      title: "Error conditions and Instructions",
    },
    {
      key: "imageEquivalent",
      subs: [
        "Ensure images provide informative alternative text",
        "Ensure CSS background images that convey meaning have textual and visible equivalents",
        "Provide text equivalents for icon fonts",
      ],
      title:
        "Image equivalents, including background images, pseudo elements, and icon fonts",
    },
    {
      key: "imagesText",
      subs: [
        "Ensure text is used instead of images of text when technology allows unless it is essential",
      ],
      title: "Images of text",
    },
    {
      key: "videoAudio",
      subs: [
        "Provide a text transcript for audio only presentations",
        "Provide text transcript or audio track of video only presentation",
      ],
      title: "Video-only/Audio-only",
    },
    {
      key: "captions",
      subs: [
        "Provide synchronized audio description for video (which includes audio) or other multimedia",
        "Provide synchronized captions for video (which includes audio) or other multimedia",
      ],
      title: "Captions and audio descriptions",
    },
    {
      key: "colorDependence",
      subs: ["Ensure color is not the sole means of communicating information"],
      title: "Color Dependence",
    },
    {
      key: "contrast",
      subs: ["Ensure text and images of text provide sufficient contrast"],
      title: "Contrast",
    },
    {
      key: "pageTitles",
      subs: ["Provide an informative context-sensitive page title"],
      title: "Page Titles",
    },
    {
      key: "headings",

      subs: [
        "Avoid the use of implicit headings",
        "Ensure heading level matches the heading's visual importance/level",
      ],
      title: "Heading Presence and Order",
    },
    {
      key: "listItems",
      subs: ["Ensure implicit list markup is avoided"],
      title: "List Items",
    },
    {
      key: "readingOrder",
      subs: [
        "Ensure content that is intended to be hidden from all users is not rendered by assistive technology",
        "Ensure that the reading order of content is logical",
      ],
      title: "Reading Order and off-screen hidden content",
    },
    {
      key: "languageParts",
      subs: ["Ensure changes in natural language are identified inline"],
      title: "Language of Parts",
    },
    {
      key: "tableStructure",
      subs: [
        "Ensure data table headers are properly identified",
        "Ensure data tables are formatted using table elements",
        "Ensure layout tables do not contain structural markup",
      ],
      title: "Table structure and association of headers",
    },
    {
      key: "liveRegions",
      subs: ["Indicate live regions for dynamically changing content"],
      title: "Live Regions",
    },
    {
      key: "animatedContent",
      subs: [
        "Ensure auto-updating dynamic content can be paused, stopped, or hidden",
      ],
      title:
        "Pause , stop, or hide of animated or moving content including media",
    },
    {
      key: "flashing",
      subs: ["Ensure elements blink or flash in a safe threshold"],
      title: "Flashing",
    },
    {
      key: "timeOuts",
      subs: [
        "Ensure accessible usage of time based sessions and timed responses",
      ],
      title: "Time Outs",
    },
    {
      key: "resizeText",
      subs: ["Ensure text can be resized"],
      title: "Resize Text (zoom)",
    },
    {
      key: "parsing",
      subs: ["Ensure markup documents contain well-formed elements"],
      title: "Parsing",
    },
    {
      key: "conformanceRequirements",
      subs: [
        "Ensure pages that provide alternatives for non-accessible pages provide equivalent functionality",
        "Ensure non-interference of non-conforming or non-accessibility supported technology",
      ],
      title: "Conformance Requirements",
    },
  ];
  return blArray;
}
function dataCode() {
  const code = [
    {
      id: "css-visually-hidden",
      title: "Visually hidden class",
      value:
        ".visually-hidden {\n  position: absolute;\n  top: auto;\n  overflow: hidden;\n  clip: rect(1px, 1px, 1px, 1px);\n  width: 1px;\n  height: 1px;\n  white-space: nowrap;\n}",
    },
  ];
  return code;
}
function dataCSS() {
  const cssArray = {
    // General CSS
    "#cancel":
      "background-color: #ff0000 !important; background-image: none !important;",
    "#cancel:hover":
      "background-color: #ddd !important; background-image: none !important;",
    ".flex-center": "display: flex; align-items:center",
    ".kpmAlt": "font-size: 0.8em;",
    ".kpmButton": "margin: 0 0 0 0.25em !important;",
    ".kpmP":
      "margin: 0.25em 0 0.1em 0 !important; font-weight: bold !important",
    ".kpmSmall": "font-size: 0.9em; line-height: 0.8em;",
    ".right-margin": "margin-right: 3px !important;",
    'select[id^="violation_"]': "z-index: 1;",

    // Change Level styles
    "#menu_table_toolbar_actions a:hover": "text-decoration: none;",
    ".infopop": "display: none;",
    ".large td, .ssb-datatable td, tbody th": "vertical-align: top !important;",
    "td.actions": "text-align: right !important",
    "td.actions a": "padding: 0; margin: 0.25em 0 0 0;",

    // New truncate on patterns
    "#view_violations_container .truncate":
      "text-overflow: ellipsis; overflow: visible !important; white-space: pre-wrap !important;",
    "#view_violations_container .wrap":
      "text-overflow: ellipsis; overflow: visible !important; white-space: pre-wrap !important;",

    // Inserted Header Links
    "a.kpmAnchor:hover": "background-color: #82E51C;",
    "a.kpmHeaderAnchor":
      "color: #fff; margin-right: 1em; font-size: 1.25em; font-weight: bold;",
    "a.kpmHeaderAnchor:hover": "color: #82E51C; text-decoration: none;",

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
      "font-weight: normal; border: 1px solid #ddd !important; background: inherit; max-width: 40ch; overflow-wrap: break-word !important;",
    "#instances td":
      "max-width: 40ch; white-space: pre-wrap !important; overflow-wrap: break-word !important;",

    // Best Practice Buttons - Data Cells
    "td .modalButtons":
      "display: inline-block; color: #666; padding: 0; margin: 0; font-size: 1.2em;",
    "td .modalButtons a":
      "min-height: 1em; min-width: 1em; color: #666; margin: 0 0.25em;",
    "td .modalButtons a:hover": "color: #552c9f;",

    // Preferences Box
    "#kpmPrefs .heading_container a:hover":
      "color: #82E51C; text-decoration: none;",
    "#kpmPrefs p": "margin: 0 !important; padding: 0 !important;",
    "#kpmPrefs ul": "list-style-type: disc !important; margin: 0 0 0 1.4em;",
    "#kpmPrefs ul li ul":
      "list-style-type: circle !important; margin: 0 0 0 1em;",
    ".kpmPrefsDiv":
      "clear: both; width: 100% !important; height: auto !important; min-height: auto !important; margin-top: 0.5em;",
    ".kpmPrefsDiv table": "margin: 0; padding: 0; font-size: 0.9em;",
    ".kpmPrefsDiv table, .kpmPrefsDiv table tr, .kpmPrefsDiv table td":
      "border: none !important; background: none !important;",
    ".kpmPrefsDiv td":
      "vertical-align: top; width: 33%; padding: 0.5em; height: auto !important;",
    ".kpmPrefsDiv td label": "font-weight: normal !important",

    // Errors about content
    ".kpmAlert":
      "margin: 0 0 0.2em 0 !important; padding: 0.25em !important; font-weight: bold; font-size: 0.9em; color: #FFFFFF !important; background-color: #B60000; white-space: normal;",
    ".kpmAlert > svg": "margin: 0.2em 0 0 0.1em;",

    // Warnings about content
    ".kpmWarning":
      "max-width: 120ch; text-wrap: wrap; margin: 0.3em 0 0.2em 0 !important; padding: 0.25em 0.5em !important; font-weight: bold; font-size: 0.9em; color: #000000 !important; background-color: #FFFFAF;",
    ".kpmWarning > svg": "margin: 0.2em 0 0 0.1em;",

    // Buttons
    ".kpmFirstButton": "margin: 0 !important; padding: 0.25em !important;",
    "button:focus, a:focus, input:focus, select:focus, select > option:focus":
      "text-decoration: underline; outline: 3px solid #000;",

    // Dropdown Navigation on add modal
    "#ampOptsInpt": "margin-bottom: 0.3em; width: 100%;",
    "#kpmNav": "margin-top: 1em; margin-bottom: 1em;",
    "#kpmNav a": "text-decoration:none;",
    "#kpmNav li":
      "flex-basis:20%;font-weight:bold; color:#000; background:#d7d7d7; display:block; float:left; padding:0.2rem 0.5rem; position:relative; text-decoration:none; transition-duration:0.5s; border:1px solid #000; border-right:none; text-align:center;",
    "#kpmNav li a": "color:#000;",
    "#kpmNav li:focus-within a": "outline:none;",
    "#kpmNav li:hover, #kpmNav li:focus-within":
      "background:#5cd344; cursor:pointer;",
    "#kpmNav li:last-child": "border-right: 1px solid #000;",
    "#kpmNav ul":
      "background:#d7d7d7;display:flex;flex-wrap:wrap;list-style:none;margin:0;padding:0;",
    "#kpmNav ul li ul":
      "background:#3359ec; visibility:hidden; opacity:0; position:absolute; transition:all 0.5s ease; margin-top:0.1rem; left:0; display:none;",
    "#kpmNav ul li ul li":
      "border:1px solid #000; border-bottom: none; line-height:1em; clear:both; width:100%; padding:0.3em; margin:0; text-align:left; font-weight:normal;",
    "#kpmNav ul li ul li.divider":
      "color:#fff; font-weight:bold; margin:0; padding:0.2em;background:#552c9f; text-align:center;",
    "#kpmNav ul li ul li:last-child": "border-bottom: 1px solid #000;",
    "#kpmNav ul li:hover > ul, #kpmNav ul li:focus-within > ul, #kpmNav ul li ul:hover, #kpmNav ul li ul:focus":
      "visibility:visible; opacity:1; display:block;width:100%;",
    "#kpmNav, #kpmNav nav, #kpmNav ul, #kpmNav li": "z-index: 1000 !important;",

    // Show Instances by BP Name
    ".bpHide": "display: none!important;",
    ".kpmFilterWraper":
      "margin: 1.5em 0 0 .25em; padding: 0.1em; float: right; width: 20%; text-align: center; border: 1px solid #d3d7dd; border-radius: 3px;",
    ".kpmFilterWraper input": "margin: 0.1em 0 .25em 0;",

    // Baseline Checklist
    "#kpmBaseline":
      "float: right !important; width: 30% !important; background-color: #fff !important;",
    "#kpmBaseline #kpmBaselineBox":
      "overflow: auto !important; height: 10em !important;",
    "#kpmBaseline #kpmBaselineBox ul":
      "list-style-type: square !important; font-size: 0.7em !important; margin: 0 0 0 1em !important;",
    "#kpmBaseline #kpmBaselineBox ul li": "margin-left: 1em !important;",
    "#kpmBaseline #kpmBaselineFooter":
      "text-align: center !important; border-top: 1px solid #eee !important;",
    "#kpmBaseline legend": "display: inline !important;",
    "#kpmBaseline legend a": "margin-left: 1em !important;",
    "#kpmBaseline legend a:hover":
      "text-decoration: none !important; background-color: #eee;",

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

    // Description box on dashboard.
    ".content_container": "grid-template-rows: auto auto !important;",
    ".description": "height: auto !important;",
  };
  return cssArray;
}
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
    {
      id: "custom-thomsonReuters",
      name: "Thomson Reuters",
    },
    {
      id: "custom-pod-web",
      name: "Pod - Web",
    },
    {
      id: "custom-pod-mobile",
      name: "Pod - Mobile",
    },
    {
      id: "custom-disney",
      name: "Disney",
    },
  ];
  return custom;
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
      cause: "HeadingsMap",
      css: "headingsMap",
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
      cause: "Linguix",
      css: "linguix-spellcheck",
    },
    {
      cause: "Microsoft Editor",
      css: "data-ms-editor",
    },
    {
      cause: "the Target Size bookmarklet",
      css: 'aria-description="overlap"',
    },
    {
      cause: "various spellcheck extensions",
      css: "data-gramm",
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
      id: "1040",
      note: 'Consider using "Ensure layout tables indicate their use for presentation purposes" instead.',
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
      note: 'Consider using "Ensure text can be resized" or "Ensure pages reflow without requiring two-dimensional scrolling without loss of content or functionality" instead.',
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
    {
      id: "2044",
      note: "Consider marking this issue as [ADVISORY] or removing it.",
    },
    {
      id: "913",
      note: "Consider marking this issue as [ADVISORY] or removing it.",
    },
    {
      id: "3157",
      note: "Consider marking this issue as [ADVISORY] or removing it.",
    },
    {
      id: "3109",
      note: "Consider marking this issue as [ADVISORY] or removing it.",
    },
    {
      id: "623",
      note: "Consider marking this issue as [ADVISORY] or removing it.",
    },
    {
      id: "928",
      note: "Consider marking this issue as [ADVISORY] or removing it.",
    },
    {
      id: "2955",
      note: 'Consider using "Ensure parts of graphical objects essential for understanding content have sufficient contrast" instead.',
    },
    {
      id: "932",
      note: "Consider marking this issue as [ADVISORY] or removing it.",
    },
    {
      id: "2579",
      note: "Consider marking this issue as [ADVISORY] or removing it.",
    },
    {
      id: "3039",
      note: "Consider marking this issue as [ADVISORY] or removing it.",
    },
    {
      id: "898",
      note: 'Consider using "Provide a text transcript for audio only presentations" instead.',
    },
    {
      id: "1273",
      note: "Consider marking this issue as [ADVISORY] or removing it.",
    },
    {
      id: "920",
      note: 'Consider using "Ensure the visible text label for a control is included in the control\'s accessible name" instead.',
    },
    {
      id: "628",
      note: 'Consider using "Ensure data table headers are associated with data cells" instead.',
    },
    {
      id: "641",
      note: 'Consider using "Ensure tags are used to structure content in a valid manner" instead.',
    },
    {
      id: "1278",
      note: "Consider marking this issue as [ADVISORY] or removing it.",
    },
    {
      id: "2567",
      note: 'Consider using "Avoid using tables for non-tabular data" instead.',
    },
    {
      id: "1354",
      note: 'Consider using "Avoid using tables for non-tabular data" instead.',
    },
    {
      id: "717",
      note: 'Consider using "Ensure links are tagged structurally as links with a Link OBJR tag" instead.',
    },
    {
      id: "927",
      note: 'Consider using "Ensure the focus order of form fields is logical" instead.',
    },
    {
      id: "3200",
      note: "Consider marking this issue as [ADVISORY] or removing it.",
    },
    {
      id: "648",
      note: 'Consider using "Ensure list items are structured properly" instead.',
    },
    {
      id: "909",
      note: "Consider marking this issue as [ADVISORY] or removing it.",
    },
    {
      id: "656",
      note: 'Consider using "Ensure data table headers are associated with data cells" instead.',
    },
    {
      id: "2568",
      note: 'Consider using "Ensure list items are structured properly" instead.',
    },
    {
      id: "3011",
      note: "Consider marking this issue as [ADVISORY] or removing it.",
    },
    {
      id: "2969",
      note: "Consider marking this issue as [ADVISORY] or removing it.",
    },
    {
      id: "3025",
      note: "Consider marking this issue as [ADVISORY] or removing it.",
    },
    {
      id: "1280",
      note: "Consider marking this issue as [ADVISORY] or removing it.",
    },
    {
      id: "3053",
      note: "Consider marking this issue as [ADVISORY] or removing it.",
    },
    {
      id: "925",
      note: "Consider marking this issue as [ADVISORY] or removing it.",
    },
    {
      id: "3095",
      note: "Consider marking this issue as [ADVISORY] or removing it.",
    },
    {
      id: "929",
      note: 'Consider using "Ensure that document content is rendered in the proper order" instead.',
    },
    {
      id: "1297",
      note: 'Consider using "Ensure keyboard focus can be moved away from keyboard accessible components" instead.',
    },
    {
      id: "650",
      note: "Consider marking this issue as [ADVISORY] or removing it.",
    },
    {
      id: "1269",
      note: "Consider marking this issue as [ADVISORY] or removing it.",
    },
    {
      id: "1267",
      note: 'Consider using "Ensure auto-updating dynamic content can be paused, stopped, or hidden" instead.',
    },
    {
      id: "1950",
      note: 'Consider using "Ensure focus is logically set when a module opens and when pop-up alerts close" instead.',
    },
    {
      id: "2958",
      note: 'Consider using "Ensure parts of graphical objects essential for understanding content have sufficient contrast" instead.',
    },
    {
      id: "1944",
      note: 'Consider using "Provide textual equivalents for all non-text elements including sounds and images" instead.',
    },
    {
      id: "1937",
      note: "Consider marking this issue as [ADVISORY] or removing it.",
    },
    {
      id: "1930",
      note: 'Consider using "Provide textual equivalents for all non-text elements including sounds and images" instead.',
    },
    {
      id: "2585",
      note: "Consider marking this issue as [ADVISORY] or removing it.",
    },
    {
      id: "1940",
      note: 'Consider using "Ensure color and text formatting are not the sole means of communicating information" instead.',
    },
    {
      id: "1941",
      note: 'Consider using "Ensure color and text formatting are not the sole means of communicating information" instead.',
    },
    {
      id: "2614",
      note: "Consider marking this issue as [ADVISORY] or removing it.",
    },
    {
      id: "1952",
      note: 'Consider using "Ensure focus is logically set when a module opens and when pop-up alerts close" instead.',
    },
    {
      id: "1966",
      note: 'Consider using "Ensure element role and state are correct" instead.',
    },
    {
      id: "2625",
      note: 'Consider using "Ensure auto-updating dynamic content can be paused, stopped, or hidden" instead.',
    },
    {
      id: "1945",
      note: 'Consider using "Ensure auto-updating dynamic content can be paused, stopped, or hidden" instead.',
    },
    {
      id: "1992",
      note: "Consider marking this issue as [ADVISORY] or removing it.",
    },
    {
      id: "2509",
      note: 'Consider using "Ensure keyboard-operable elements which receive focus are not fully obscured" instead.',
    },
    {
      id: "1981",
      note: 'Consider using "Ensure element role and state are correct" instead.',
    },
    {
      id: "2589",
      note: 'Consider using "Ensure access to alternative input methods" instead.',
    },
    {
      id: "2687",
      note: 'Consider using "Ensure element role and state are correct" instead.',
    },
    {
      id: "3296",
      note: "Consider marking this issue as [ADVISORY] or removing it.",
    },
    {
      id: "2348",
      note: "Consider marking this issue as [ADVISORY] or removing it.",
    },
    {
      id: "2683",
      note: 'Consider using "Ensure element role and state are correct" instead.',
    },
    {
      id: "2345",
      note: "Consider marking this issue as [ADVISORY] or removing it.",
    },
    {
      id: "1991",
      note: 'Consider using "Provide sufficient area for pointer targets (minimum)" instead.',
    },
    {
      id: "1986",
      note: 'Consider using "Ensure events triggered by single-point activation can be cancelled" instead.',
    },
    {
      id: "2630",
      note: "Consider marking this issue as [ADVISORY] or removing it.",
    },
    {
      id: "1994",
      note: "Consider marking this issue as [ADVISORY] or removing it.",
    },
    {
      id: "1953",
      note: "Consider marking this issue as [ADVISORY] or removing it.",
    },
    {
      id: "2631",
      note: "Consider marking this issue as [ADVISORY] or removing it.",
    },
    {
      id: "1948",
      note: 'Consider using "Ensure auto-updating dynamic content can be paused, stopped, or hidden" instead.',
    },
    {
      id: "2562",
      note: 'Consider using "Ensure assistive technologies are aware of content changes in real time" instead.',
    },
    {
      id: "2612",
      note: "Consider marking this issue as [ADVISORY] or removing it.",
    },
    {
      id: "1982",
      note: "Consider marking this issue as [ADVISORY] or removing it.",
    },
    {
      id: "2620",
      note: 'Consider using "Ensure all controls and non-decorative content enable accessibility" instead.',
    },
    {
      id: "1902",
      note: 'Consider using "Ensure assistive technologies are aware of content changes in real time" instead.',
    },
    {
      id: "2961",
      note: 'Consider using "Ensure parts of graphical objects essential for understanding content have sufficient contrast" instead.',
    },
    {
      id: "1901",
      note: "Consider marking this issue as [ADVISORY] or removing it.",
    },
    {
      id: "1583",
      note: 'Consider using "Provide textual equivalents for all non-text elements including sounds and images" instead.',
    },
    {
      id: "1578",
      note: 'Consider using "Ensure color and text formatting are not the sole means of communicating information" instead.',
    },
    {
      id: "1579",
      note: 'Consider using "Ensure color and text formatting are not the sole means of communicating information" instead.',
    },
    {
      id: "1585",
      note: 'Consider using "Ensure focus is logically set when a module opens and when pop-up alerts close" instead.',
    },
    {
      id: "2513",
      note: 'Consider using "Ensure assistive technologies are aware of content changes in real time" instead.',
    },
    {
      id: "2622",
      note: 'Consider using "Ensure element traits (role and state) are correct" instead.',
    },
    {
      id: "2609",
      note: 'Consider using "Ensure auto-updating dynamic content can be paused, stopped, or hidden" instead.',
    },
    {
      id: "1571",
      note: 'Consider using "Ensure auto-updating dynamic content can be paused, stopped, or hidden" instead.',
    },
    {
      id: "1921",
      note: "Consider marking this issue as [ADVISORY] or removing it.",
    },
    {
      id: "1924",
      note: 'Consider using "Ensure keyboard-operable elements which receive focus are not fully obscured" instead.',
    },
    {
      id: "1914",
      note: 'Consider using "Ensure element traits (role and state) are correct" instead.',
    },
    {
      id: "2590",
      note: 'Consider using "Ensure access to alternative input methods" instead.',
    },
    {
      id: "2686",
      note: 'Consider using "Ensure element traits (role and state) are correct" instead.',
    },
    {
      id: "3295",
      note: "Consider marking this issue as [ADVISORY] or removing it.",
    },
    {
      id: "2507",
      note: "Consider marking this issue as [ADVISORY] or removing it.",
    },
    {
      id: "2682",
      note: 'Consider using "Ensure element traits (role and state) are correct" instead.',
    },
    {
      id: "2344",
      note: "Consider marking this issue as [ADVISORY] or removing it.",
    },
    {
      id: "1926",
      note: 'Consider using "Provide sufficient area for pointer targets (minimum)" instead.',
    },
    {
      id: "1919",
      note: 'Consider using "Ensure events triggered by single-point activation can be cancelled" instead.',
    },
    {
      id: "1927",
      note: "Consider marking this issue as [ADVISORY] or removing it.",
    },
    {
      id: "1594",
      note: "Consider marking this issue as [ADVISORY] or removing it.",
    },
    {
      id: "2618",
      note: "Consider marking this issue as [ADVISORY] or removing it.",
    },
    {
      id: "3158",
      note: "Consider marking this issue as [ADVISORY] or removing it.",
    },
    {
      id: "1574",
      note: 'Consider using "Ensure auto-updating dynamic content can be paused, stopped, or hidden" instead.',
    },
    {
      id: "2561",
      note: 'Consider using "Ensure assistive technologies are aware of content changes in real time" instead.',
    },
    {
      id: "1915",
      note: "Consider marking this issue as [ADVISORY] or removing it.",
    },
    {
      id: "2337",
      note: "Consider marking this issue as [ADVISORY] or removing it.",
    },
    {
      id: "2698",
      note: 'Consider using "Ensure parts of graphical objects essential for understanding content have sufficient contrast" instead.',
    },
    {
      id: "2355",
      note: "Consider marking this issue as [ADVISORY] or removing it.",
    },
    {
      id: "564",
      note: 'Consider using "Ensure objects and graphics provide textual names, descriptions, role, state, and value" instead.',
    },
    {
      id: "1465",
      note: "Consider marking this issue as [ADVISORY] or removing it.",
    },
    {
      id: "1138",
      note: 'Consider using "Ensure color and text formatting are not the sole means of communicating information" instead.',
    },
    {
      id: "557",
      note: 'Consider using "Ensure all functionality is accessible from the keyboard" instead.',
    },
    {
      id: "1357",
      note: 'Consider using "Ensure objects and graphics provide textual names, descriptions, role, state, and value" instead.',
    },
    {
      id: "529",
      note: 'Consider using "Ensure objects and graphics provide textual names, descriptions, role, state, and value" instead.',
    },
    {
      id: "822",
      note: 'Consider using "Ensure auto-updating dynamic content can be paused, stopped, or hidden" instead.',
    },
    {
      id: "517",
      note: 'Consider using "Ensure all functionality is accessible from the keyboard" instead.',
    },
    {
      id: "669",
      note: "Consider marking this issue as [ADVISORY] or removing it.",
    },
    {
      id: "515",
      note: 'Consider using "Ensure objects and graphics provide textual names, descriptions, role, state, and value" instead.',
    },
    {
      id: "496",
      note: "Consider marking this issue as [ADVISORY] or removing it.",
    },
    {
      id: "604",
      note: 'Consider using "Ensure keyboard-operable elements which receive focus are not fully obscured" instead.',
    },
    {
      id: "877",
      note: "Consider marking this issue as [ADVISORY] or removing it.",
    },
    {
      id: "1142",
      note: 'Consider using "Ensure all functionality is accessible from the keyboard" instead.',
    },
    {
      id: "2481",
      note: 'Consider using "Ensure auto-updating dynamic content can be paused, stopped, or hidden" instead.',
    },
    {
      id: "671",
      note: 'Consider using "Ensure all functionality is accessible from the keyboard" instead.',
    },
    {
      id: "2457",
      note: "Consider marking this issue as [ADVISORY] or removing it.",
    },
    {
      id: "823",
      note: 'Consider using "Ensure auto-updating dynamic content can be paused, stopped, or hidden" instead.',
    },
    {
      id: "2747",
      note: 'Consider using "Ensure all functionality is accessible from the keyboard" instead.',
    },
    {
      id: "497",
      note: 'Consider using "Ensure objects and graphics provide textual names, descriptions, role, state, and value" instead.',
    },
    {
      id: "3318",
      note: "Consider marking this issue as [ADVISORY] or removing it.",
    },
    {
      id: "668",
      note: 'Consider using "Ensure all functionality is accessible from the keyboard" instead.',
    },
    {
      id: "1137",
      note: "Consider marking this issue as [ADVISORY] or removing it.",
    },
    {
      id: "670",
      note: 'Consider using "Ensure all functionality is accessible from the keyboard" instead.',
    },
    {
      id: "2678",
      note: 'Consider using "Ensure objects and graphics provide textual names, descriptions, role, state, and value" instead.',
    },
    {
      id: "1141",
      note: 'Consider using "Ensure keyboard-operable elements which receive focus are not fully obscured" instead.',
    },
    {
      id: "2458",
      note: "Consider marking this issue as [ADVISORY] or removing it.",
    },
    {
      id: "382",
      note: 'Consider using "Ensure all functionality is accessible from the keyboard" instead.',
    },
    {
      id: "552",
      note: 'Consider using "Ensure all functionality is accessible from the keyboard" instead.',
    },
    {
      id: "514",
      note: "Consider marking this issue as [ADVISORY] or removing it.",
    },
    {
      id: "1134",
      note: "Consider marking this issue as [ADVISORY] or removing it.",
    },
    {
      id: "2459",
      note: "Consider marking this issue as [ADVISORY] or removing it.",
    },
    {
      id: "678",
      note: 'Consider using "Ensure auto-updating dynamic content can be paused, stopped, or hidden" instead.',
    },
    {
      id: "2963",
      note: 'Consider using "Ensure parts of graphical objects essential for understanding content have sufficient contrast" instead.',
    },
    {
      id: "1153",
      note: 'Consider using "Ensure objects and graphics provide textual names, descriptions, role, state, and value" instead.',
    },
    {
      id: "1185",
      note: 'Consider using "Ensure objects and graphics provide textual names, descriptions, role, state, and value" instead.',
    },
    {
      id: "1160",
      note: 'Consider using "Ensure color and text formatting are not the sole means of communicating information" instead.',
    },
    {
      id: "1173",
      note: 'Consider using "Ensure keyboard focus is provided to active elements and element functionality can be activated from the keyboard" instead.',
    },
    {
      id: "1157",
      note: 'Consider using "Provide a non-animated method to step through/control animation" instead.',
    },
    {
      id: "1187",
      note: 'Consider using "Provide labels for all form elements" instead.',
    },
    {
      id: "1200",
      note: "Consider marking this issue as [ADVISORY] or removing it.",
    },
    {
      id: "1174",
      note: "Consider marking this issue as [ADVISORY] or removing it.",
    },
    {
      id: "1179",
      note: "Consider marking this issue as [ADVISORY] or removing it.",
    },
    {
      id: "1178",
      note: "Consider marking this issue as [ADVISORY] or removing it.",
    },
    {
      id: "1142",
      note: 'Consider using "Ensure keyboard focus is provided to active elements and element functionality can be activated from the keyboard" instead.',
    },
    {
      id: "1170",
      note: 'Consider using "Ensure keyboard or alternative input access is not trapped" instead.',
    },
    {
      id: "1177",
      note: 'Consider using "Ensure keyboard focus is provided to active elements and element functionality can be activated from the keyboard" instead.',
    },
    {
      id: "1167",
      note: 'Consider using "Ensure keyboard focus is provided to active elements and element functionality can be activated from the keyboard" instead.',
    },
    {
      id: "2689",
      note: 'Consider using "Ensure objects and graphics provide textual names, descriptions, role, state, and value" instead.',
    },
    {
      id: "2750",
      note: 'Consider using "Ensure keyboard focus is provided to active elements and element functionality can be activated from the keyboard" instead.',
    },
    {
      id: "1197",
      note: 'Consider using "Ensure objects and graphics provide textual names, descriptions, role, state, and value" instead.',
    },
    {
      id: "1195",
      note: 'Consider using "Ensure objects and graphics provide textual names, descriptions, role, state, and value" instead.',
    },
    {
      id: "3319",
      note: "Consider marking this issue as [ADVISORY] or removing it.",
    },
    {
      id: "1148",
      note: 'Consider using "Ensure keyboard focus is provided to active elements and element functionality can be activated from the keyboard" instead.',
    },
    {
      id: "1184",
      note: 'Consider using "Provide labels for all form elements" instead.',
    },
    {
      id: "1176",
      note: 'Consider using "Ensure keyboard focus is provided to active elements and element functionality can be activated from the keyboard" instead.',
    },
    {
      id: "2680",
      note: 'Consider using "Ensure objects and graphics provide textual names, descriptions, role, state, and value" instead.',
    },
    {
      id: "1152",
      note: 'Consider using "Ensure keyboard-operable elements which receive focus are not fully obscured" instead.',
    },
    {
      id: "1166",
      note: 'Consider using "Ensure keyboard focus is provided to active elements and element functionality can be activated from the keyboard" instead.',
    },
    {
      id: "1169",
      note: 'Consider using "Ensure keyboard focus is provided to active elements and element functionality can be activated from the keyboard" instead.',
    },
    {
      id: "1196",
      note: "Consider marking this issue as [ADVISORY] or removing it.",
    },
    {
      id: "1190",
      note: "Consider marking this issue as [ADVISORY] or removing it.",
    },
  ];
  return nonBaselineBPs;
}
function dataPreferred() {
  const preferred = [
    {
      bp: 332,
      id: "response-radiogroup-no-name",
      impact:
        "Screen reader users will have difficulty understanding the purpose of this control group.",
      issue:
        'There are elements with role="radiogroup" that have no accessible name. Examples include:\n- ',
      recommendation:
        'Ensure fieldsets are labelled appropriately. If role="radiogroup" is used, the element with this role must have an accessible name. This can be set with an aria-label or aria-labelledby attribute.',
      stepsToReproduce:
        '1. Locate the radio buttons.\n2. Inspect them with Chrome DevTools.\n3. Select the role="radiogroup" element.\n4. In the Accessibility tab, expand the Computed Properties section.\n5. Review the value for "Name".',
      jawsFunctionalSteps:
        '1. Enable JAWS.\n2. Press TAB key to move focus to the first radio button in the group (not checked).\nExpected result: JAWS announces, "[Group name], group. [Radio name], radio button, not checked.\nActual result: JAWS announces, "[Radio name], radio button, not checked" and omits any group information.',
      successCriteria: ["1.3.1", "3.3.2"],
      title: 'role="radiogroup" with no accessible name',
      type: "web",
    },
    {
      bp: 338,
      id: "response-missing-label",
      impact:
        "Screen reader users and users with cognitive disabilities may be unable to determine what these controls are for. Speech input users will have difficulty navigating to them.",
      issue:
        "There are form controls without a programmatically associated label describing their purpose. Examples include:\n- ",
      recommendation:
        "Provide a valid label for form fields.\n\nLabels must meet the following requirements:\n- The label must be visible.\n- The label must be persistent. That is, a label must remain visible when text is entered into the field or an option is selected.\n- The label must be programmatically associated with the form field. The most common way to do this is with a <label> element with a for attribute set to the ID of the field.\n- The label must provide the accessible name of the field, or the label's exact text must be included in the accessible name.",
      stepsToReproduce:
        '1. Locate the form field.\n2. Inspect it with Chrome DevTools.\n3. In the Accessibility tab, expand the Computed Properties section.\n4. Review the value for "Name".',
      jawsFunctionalSteps:
        '1. Enable JAWS.\n2. Press TAB key to move focus to the form control.\nExpected result: JAWS announces, "[Name], [Role], [State/Value]".\nActual result: JAWS announces, "[Role], [State/Value]" and omits the name of the control.',
      successCriteria: ["1.3.1", "2.5.3", "4.1.2"],
      title: "Missing label",
      type: "web",
    },
    {
      bp: 338,
      id: "response-field-with-unassociated-label",
      impact:
        "Screen reader users will have difficulty determining the purpose of these controls. Speech input users will have difficulty navigating to them.",
      issue:
        "There are form controls with visual labels that are not programmatically associated with the control. Examples include:\n- ",
      recommendation:
        "Provide a valid label for form fields. The best way to do this is to use a <label> element with a for attribute set to the ID of the field it labels. For custom controls, use aria-labelledby on the control set to the ID of the labelling text.",
      stepsToReproduce:
        '1. Locate the form field.\n2. Inspect it with Chrome DevTools.\n3. In the Accessibility tab, expand the Computed Properties section.\n4. Review the value for "Name".',
      jawsFunctionalSteps:
        '1. Enable JAWS.\n2. Press TAB key to move focus to the form control.\nExpected result: JAWS announces, "[Name], [Role], [State/Value]".\nActual result: JAWS announces, "[Role], [State/Value]" and omits the name of the control.',
      successCriteria: ["1.3.1", "2.5.3", "4.1.2"],
      title: "Field with unassociated label",
      type: "web",
    },
    {
      bp: 341,
      id: "response-form-groups-lack-fieldset",
      impact:
        "Screen reader users will have difficulty understanding the relationship between these form controls.",
      issue:
        "There are visually grouped form controls that are not programmatically grouped. Examples include:\n- ",
      recommendation:
        "Provide fieldsets for groups of form controls. Common groups of form controls include related radio buttons, checkboxes, and shipping/billing address groupings. The <fieldset> element must have a descriptive <legend> element as its first child. The form controls must appear as descendants of the fieldset.",
      stepsToReproduce:
        '1. Locate the form field grouping.\n2. Inspect it with Chrome DevTools.\n3. In the Accessibility tab, expand the Computed Properties section.\n4. Review the value for "Role".',
      jawsFunctionalSteps:
        '1. Enable JAWS.\n2. Press TAB key to move focus to the first control in the group (not checked).\nExpected result: JAWS announces, "[Group name], group. [Name], [Role], not checked.\nActual result: JAWS announces, "[Name], [Role], not checked" and omits any group information.',
      successCriteria: ["1.3.1", "3.3.2"],
      title: "Form groups lack fieldset",
      type: "web",
    },
    {
      bp: 343,
      id: "response-area-without-equivalent",
      impact:
        "Screen reader users will be unable to determine what these images represent.",
      issue:
        "There are <area> elements with no textual equivalents. Examples include:\n- ",
      recommendation:
        "Ensure area alternative text is meaningful and concise. Add an alt attribute to the <area>, then set its value to a proper textual equivalent.",
      stepsToReproduce:
        '1. Locate the area.\n2. Inspect it with Chrome DevTools.\n3. In the Accessibility tab, expand the Computed Properties section.\n4. Review the value for "Name".',
      successCriteria: ["1.1.1", "2.4.4"],
      title: "area element with no alt text",
      type: "web",
    },
    {
      bp: 345,
      id: "response-skip-link-missing",
      impact:
        "Keyboard users will have to execute numerous key presses in order to get to the following content.",
      issue:
        "There is repetitive content without a mechanism to skip past it. Examples include:\n- ",
      recommendation:
        "Provide a mechanism for skipping past repetitive content. There must be a keyboard-only means of skipping past repeated blocks of content that occur on multiple pages, such as a link. This control must be the first focusable element before the repeated content and must visually appear on keyboard focus. When the control is activated, keyboard focus must be moved beyond the repeated content.",
      stepsToReproduce:
        "1. Press Tab repeatedly to navigate to the repeated content area.\n2. Notice that no mechanism to skip the content appears.",
      successCriteria: ["2.4.1"],
      title: "Skip link - General",
      type: "web",
    },
    {
      bp: 345,
      id: "response-skip-link-broken",
      impact:
        "Keyboard users will have to execute numerous key presses in order to get to the following content.",
      issue: "The skip link does not target the main content.",
      recommendation:
        "Provide a mechanism for skipping past repetitive content. There must be a keyboard-only means of skipping past repeated blocks of content that occur on multiple pages, such as a link. This control must be the first focusable element before the repeated content and must visually appear on keyboard focus. When the control is activated, keyboard focus must be moved beyond the repeated content.",
      stepsToReproduce:
        "1. Press Tab repeatedly until the skip link is focused.\n2. Press Enter on the skip link.\n3. Notice that the skip link does not shift focus past the repeated content.",
      successCriteria: ["2.4.1"],
      title: "Skip link broken",
      type: "web",
    },
    {
      bp: 345,
      id: "response-skip-link-not-far-enough",
      impact:
        "Keyboard users will have to execute numerous key presses in order to get to the main content in the page.",
      issue:
        "A skip link exists, but it does not skip past all repetitive content.",
      recommendation:
        "Provide a mechanism for skipping past repetitive content. There must be a keyboard-only means of skipping past repeated blocks of content that occur on multiple pages, such as a link. This control must be the first focusable element before the repeated content and must visually appear on keyboard focus. When the control is activated, keyboard focus must be moved beyond the repeated content.",
      stepsToReproduce:
        "1. Press Tab repeatedly until the skip link is focused.\n2. Press Enter on the skip link.\n3. Notice that the skip link does not shift focus past all of the repeated content.",
      successCriteria: ["2.4.1"],
      title: "Skip link does not skip all repetitive content",
      type: "web",
    },
    {
      bp: 347,
      id: "response-page-refreshes-automatically",
      impact:
        "Screen reader users and users with cognitive disabilities may be disoriented by this refresh. They may also not have sufficient time to access page content.",
      issue:
        'There is a <meta> element that has an "http-equiv" attribute set to the value of "refresh" and a "content" attribute set to greater than zero seconds.',
      recommendation:
        "Ensure pages do not automatically refresh. Users must be able to turn off, adjust, or extend the refresh, unless it happens after 20 hours, involves a real-time data transaction, or if it is essential to the purpose of the page.",
      stepsToReproduce:
        '1. Open Chrome DevTools.\n2. Locate the <meta http-equiv="refresh"> element and notice that the content attribute is set to a value greater than zero.',
      successCriteria: ["2.2.1", "2.2.4", "3.2.5"],
      title: "Page refreshes automatically",
      type: "web",
    },
    {
      bp: 358,
      id: "response-server-side-image-map",
      impact:
        "Keyboard users and screen reader users will be prevented from accessing the link in server-side image maps. Without alternative routes, these users will not be able to access the image map regions.",
      issue:
        "There are <img> elements with an ismap attribute. Examples include:\n- ",
      recommendation:
        "Provide alternatives for server-side image maps. Convert server-side image maps to client-side image maps or remove them altogether. If conversion or removal of the image maps is not possible, alternative links must be provided for each server-side image map.",
      stepsToReproduce:
        "1. Locate the image.\n2. Inspect it with Chrome DevTools.\n3. Notice the presence of an ismap attribute.",
      successCriteria: ["1.1.1", "2.1.1", "2.1.3"],
      title: "Server-side image map",
      type: "web",
    },
    {
      bp: 359,
      id: "response-device-dependent-event-handlers",
      impact:
        "Keyboard users will be prevented from accessing the functionality provided by these controls.",
      issue:
        "There are elements that use only mouse-related event handlers. Examples include:\n- ",
      recommendation:
        'Avoid the sole use of device-dependent event handlers. The best way to accomplish this is by using appropriate native controls, which come with keyboard functionality built in.\n\nIf using a native control is not possible, the control must have tabindex="0" and appropriate key-based JavaScript event handlers.',
      stepsToReproduce:
        "1. Press the Tab button repeatedly until the control is focused.\n2. Attempt to interact with the control using Enter or Space.\n3. Notice that the control cannot be activated with these keys.",
      successCriteria: ["2.1.1", "2.1.3"],
      title: "Device-dependent event handlers",
      type: "web",
    },
    {
      bp: 361,
      id: "response-invalid-headers-id",
      impact:
        "Screen reader users will not be able to determine which headers name these cells.",
      issue:
        "There are table data cells with a headers attribute set to an invalid ID or IDs. Examples include:\n- ",
      recommendation:
        "Ensure headers and cells are properly associated. All headers attributes must refer to existing IDs of elements that are descendants of the parent <table> element.",
      stepsToReproduce:
        "1. Locate the table data cell.\n2. Inspect it with Chrome DevTools.\n3. Note that the values for the headers attribute do not refer to valid, existing IDs on the page.",
      successCriteria: ["1.3.1"],
      title: "Headers attribute with invalid id",
      type: "web",
    },
    {
      bp: 361,
      id: "response-missing-rowgroup-colgroup",
      impact:
        "Screen reader users will not be able to determine which cells correspond to these headers.",
      issue:
        'There are table headers that span multiple rows or columns but do not have scope="rowgroup" or "colgroup". Examples include:\n-',
      recommendation:
        'Ensure headers and cells are properly associated. If a table header has a colspan or rowspan attribute set to a value other than "1", that header\'s scope attribute must be set to "colgroup" or "rowgroup" respectively.',
      stepsToReproduce:
        '1. Locate the table header.\n2. Inspect it with Chrome DevTools.\n3. Note that no scope="rowgroup" or scope="colgroup" attribute is present.',
      successCriteria: ["1.3.1"],
      title: "Missing rowgroup or colgroup",
      type: "web",
    },
    {
      bp: 361,
      id: "response-missing-scope",
      impact:
        "Screen reader users will not be able to determine which cells correspond to these headers.",
      issue:
        "There are table headers with no scope attributes. Examples include:\n- ",
      recommendation:
        'Ensure headers and cells are properly associated. All <th> elements must have a scope attribute set to "row" or "col" depending on whether the cell is a row header or a column header.',
      stepsToReproduce:
        "1. Locate the table header.\n2. Inspect it with Chrome DevTools.\n3. Note that no scope attribute is present.",
      successCriteria: ["1.3.1"],
      title: "Missing scope",
      type: "web",
    },
    {
      bp: 361,
      id: "response-missing-id",
      impact:
        "Screen reader users will not be able to determine which cells correspond to these headers.",
      issue:
        "There are table headers missing an id attribute, which is required when the headers attribute is used to associate cells with their headers. Examples include:\n- ",
      recommendation:
        "Ensure headers and cells are properly associated. When the headers attribute is used on data cells to associate headers, every <th> element must have an id attribute.",
      stepsToReproduce:
        "1. Locate the table header.\n2. Inspect it with Chrome DevTools.\n3. Note that no id attribute is present.",
      successCriteria: ["1.3.1"],
      title: "Header missing ID",
      type: "web",
    },
    {
      bp: 361,
      id: "response-missing-headers",
      impact:
        "Screen reader users will not be able to determine which headers name these cells.",
      issue:
        "There are table data cells missing a headers attribute, which is required if any other data cell in the table uses this attribute. Examples include:\n- ",
      recommendation:
        "Ensure headers and cells are properly associated. If the headers attribute is used to associate headers with a data cell, every data cell in the table must have the headers attribute.",
      stepsToReproduce:
        "1. Locate the table data cell.\n2. Inspect it with Chrome DevTools.\n3. Note that no headers attribute is present.",
      successCriteria: ["1.3.1"],
      title: "Cell missing headers attribute",
      type: "web",
    },
    {
      bp: 362,
      id: "response-meaningful-img-has-no-alternative-text",
      impact:
        "Screen reader users will be unable to determine what these images represent.",
      issue:
        "There are meaningful images without a textual equivalent. Examples include:\n- ",
      recommendation:
        "Provide alternative text for images. Meaningful images must have a concise but descriptive textual equivalent.\n\nTo add a textual equivalent to an <img> element, set its alt attribute to a descriptive value.\n\nTo add a textual equivalent to an <svg> element, add a <title> child to the SVG. Place the textual equivalent in the <title>, then add an ID to the <title>. Finally, on the <svg>, add an aria-labelledby attribute and set its value to the ID of the <title>.",
      stepsToReproduce:
        '1. Locate the image.\n2. Inspect it with Chrome DevTools.\n3. In the Accessibility tab, expand the Computed Properties section.\n4. Review the value for "Name".',
      jawsFunctionalSteps:
        '1. Enable JAWS.\nPress Down Arrow key to read content line by line.\n3. Alternatively, press the "G" key to move to the next graphic.\nExpected result: JAWS cursor moves to the graphic and announces a brief, meaningful description.\nActual result: JAWS cursor moves to this graphic, and is silent.',
      successCriteria: ["1.1.1"],
      title: "Meaningful image with no textual equivalent",
      type: "web",
    },
    {
      bp: 362,
      id: "response-img-is-not-marked-as-decorative",
      impact:
        'Screen readers may announce <img> elements with no alt attribute by their filename and SVGs with no accessible name as "group." This gives screen reader users irrelevant and confusing information.',
      issue:
        "There are images that serve a decorative purpose but are exposed to screen readers. Examples include:\n- ",
      recommendation:
        'Provide alternative text for images. Non-meaningful images must be marked as decorative, which causes screen readers to ignore them. To mark an <img> element as decorative, set its alt attribute to "" (that is, alt="" exactly as written, with no space between the quotation marks). To mark an <svg> element as decorative, add aria-hidden="true" to the element.',
      stepsToReproduce:
        "1. Locate the image.\n2. Inspect it with Chrome DevTools.\n3. In the Accessibility tab, expand the Computed Properties section.\n4. Verify that the accessibility node is not exposed.",
      jawsFunctionalSteps:
        '1. Enable JAWS.\n2. Press the Down Arrow key to read content line by line.\n3. Alternatively, press the "G" key to move to the next graphic.\nExpected result: JAWS cursor skips over this decorative content and does not announce it.\nActual result: JAWS cursor moves to the graphic and is silent.',
      successCriteria: ["1.1.1"],
      title: "Decorative image not marked decorative",
      type: "web",
    },
    {
      bp: 363,
      id: "response-object-element-accessible-name-missing",
      impact: "Screen reader users will not know the purpose of this object.",
      issue:
        "There are <object> elements with no accessible name. Examples include:\n- ",
      recommendation:
        "Provide text equivalents for object, audio, and video elements. Add an aria-labelledby, aria-label, or title attribute set to an appropriate accessible name.",
      stepsToReproduce:
        '1. Locate the object.\n2. Inspect it with Chrome DevTools.\n3. In the Accessibility tab, expand the Computed Properties section.\n4. Review the value for "Name".',
      successCriteria: ["1.1.1"],
      title: "Object with no accessible name",
      type: "web",
    },
    {
      bp: 363,
      id: "response-decorative video",
      impact:
        "Screen reader users will be unable to determine whether the contents of this video are meaningful or decorative.",
      issue:
        "There are videos that serve a decorative purpose but are exposed to screen readers. Examples include:\n- ",
      recommendation:
        'Provide text equivalents for object, audio, and video elements. If a video serves a purely decorative purpose, such as a background, hide it from assistive technologies by setting aria-hidden="true" on the element.',
      stepsToReproduce:
        "1. Locate the video.\n2. Inspect it with Chrome DevTools.\n3. In the Accessibility tab, expand the Computed Properties section.\n4. Verify that the accessibility node is not exposed.",
      successCriteria: ["1.1.1"],
      title: "Decorative video",
      type: "web",
    },
    {
      bp: 364,
      id: "response-title-element-missing",
      impact:
        "Screen reader users and some users with cognitive disabilities will have difficulty determining the purpose of the page.",
      issue: "The page has no title.",
      recommendation:
        "Ensure pages use the title element. Alter the page title to include the specific name for the page.",
      stepsToReproduce:
        "1. Open Chrome DevTools.\n2. Locate the <head> element, if any.\n3. Notice that no <title> element is present.",
      jawsFunctionalSteps:
        '1. Enable JAWS.\n2. Press the "T" key to read the document title.\nExpected result: JAWS announces a brief description of the current page, followed by the website name.\nActual result: The title is not announced.',
      successCriteria: ["2.4.2"],
      title: "Title element missing",
      type: "web",
    },
    {
      bp: 368,
      convertColorContrastText: true,
      id: "response-text-contrast-insufficient",
      impact:
        "Users with low vision will have difficulty reading this content.",
      issue:
        "There is text that does not meet the required minimum color contrast ratio with its background.\n\nForeground color: \nBackground color: \nContrast ratio: \nRequired contrast ratio for this content: \n\nExamples of text with this contrast ratio include:\n- ",
      recommendation:
        "Ensure text and images of text provide sufficient contrast. The following contrast ratios are required:\n\n- Text smaller than 18 pt (24 px), or smaller than 14 pt (19 px) if bold, must have a color contrast ratio of 4.50:1 or more with adjacent colors.\n\n- Text 18 pt (24 px) or larger, or 14 pt (19 px) or larger if bold, must have a color contrast ratio of 3.00:1 or more with adjacent colors.\n\nDisabled controls that do not accept user interaction are exempt from this requirement.\n\nTo calculate color contrast ratios, use a tool such as the Level Access Accessible Color Picker Chrome extension: https://chrome.google.com/webstore/detail/accessible-color-picker/bgfhbflmeekopanooidljpnmnljdihld or the Color Contrast Checker: https://www.levelaccess.com/color-contrast-checker-new/",
      stepsToReproduce:
        "1. Locate the text.\n2. Inspect it with Chrome DevTools.\n3. In the Styles tab, copy the text color and background color.\n4. Use a calculator such as https://www.levelaccess.com/color-contrast-checker-new/ to determine the contrast ratio.\n5. Notice that the contrast ratio is below the required value for this size of text.",
      successCriteria: ["1.4.3"],
      title: "Text contrast insufficient",
      type: "web",
    },
    {
      bp: 369,
      id: "response-color-only-identification",
      impact:
        "Users with color blindness will have difficulty identifying the colors used to convey this information.",
      issue:
        "There is content that uses color alone to visually indicate information. Examples include:\n- ",
      recommendation:
        "Ensure color is not the sole means of communicating information. Color can be used as long as other visual indicators of the information are also present. Common additional visual indicators include underlining, bolding, additional on-screen text conveying the information, or change in shape or size.",
      stepsToReproduce:
        "1. Locate the content.\n2. Notice that the content conveys its meaning through color alone.",
      successCriteria: ["1.4.1"],
      title: "Color only - General",
      type: "web",
    },
    {
      bp: 369,
      id: "response-color-only-links",
      impact:
        "Users with color blindness will have difficulty distinguishing which text is a link.",
      issue:
        "There are inline links that use color alone to visually indicate that they are links. Examples include:\n- ",
      recommendation:
        "Ensure color is not the sole means of communicating information. Color can be used as long as other visual indicators of the information are also present. Common additional visual indicators for links include underlining or bolding.",
      stepsToReproduce:
        "1. Locate the link.\n2. Notice that the link's presence is conveyed through the use of color alone.",
      successCriteria: ["1.4.1"],
      title: "Color only - Links",
      type: "web",
    },
    {
      bp: 370,
      id: "response-alt-text-not-meaningful",
      impact:
        "Screen reader users will not receive an accurate impression of the contents of these images.",
      issue:
        "There are images with insufficiently descriptive textual equivalents. Examples include:\n- ",
      recommendation:
        "Ensure images provide informative alternative text. Textual equivalents must be both concise and descriptive.",
      stepsToReproduce:
        '1. Locate the image.\n2. Inspect it with Chrome DevTools.\n3. In the Accessibility tab, expand the Computed Properties section.\n4. Review the value for "Name".',
      jawsFunctionalSteps:
        '1. Enable JAWS.\n2. Press the Down Arrow key to read content line by line.\n3. Alternatively, press the "G" key to move to the next graphic.\nExpected result: JAWS cursor moves to this image and announces, "[Expected Name], graphic".\nActual result: JAWS cursor moves to this image and announces, "[Actual Name], graphic", which is [Inappropriate/Insufficient]',
      successCriteria: ["1.1.1"],
      title: "Meaningful image with improper text equivalent",
      type: "web",
    },
    {
      bp: 370,
      id: "response-decorative-with-descriptive-alt",
      impact:
        "Screen reader users will receive unnecessary and potentially confusing information.",
      issue:
        "There are decorative images with textual equivalents. Examples include:\n- ",
      recommendation:
        'Ensure images provide informative alternative text. Non-meaningful images must be marked as decorative, which causes screen readers to ignore them. To mark an <img> element as decorative, set its alt attribute to "" (that is, alt="" exactly as written, with no space between the quotation marks). To mark an <svg> element as decorative, add aria-hidden="true" to the element.',
      stepsToReproduce:
        "1. Locate the image.\n2. Inspect it with Chrome DevTools.\n3. In the Accessibility tab, expand the Computed Properties section.\n4. Verify that the accessibility node is not exposed.",
      jawsFunctionalSteps:
        '1. Enable JAWS.\n2. Press the Down Arrow key to read content line by line.\n3. Alternatively, press the "G" key to move to the next graphic.\nExpected result: JAWS cursor skips over this decorative content and does not announce it.\nActual result: JAWS announces, "[Actual Name], graphic".',
      successCriteria: ["1.1.1"],
      title: "Decorative image with textual equivalent",
      type: "web",
    },
    {
      bp: 373,
      id: "response-button-short-name",
      impact:
        "Screen reader users will be unable to determine the purpose of these buttons.",
      issue:
        "There are buttons with insufficiently descriptive accessible names. Examples include:\n- ",
      recommendation:
        'Ensure headings and labels are descriptive and unique. This includes the accessible names of buttons. The accessible name of a button can be set with internal text, an aria-label attribute, or an aria-labelledby attribute. Good accessible names are both concise and descriptive. Avoid including the word "button" in the accessible name, as this information is already supplied by the button\'s role.',
      stepsToReproduce:
        '1. Locate the button.\n2. Inspect it with Chrome DevTools.\n3. In the Accessibility tab, expand the Computed Properties section.\n4. Review the value for "Name".',
      successCriteria: ["1.1.1", "4.1.2"],
      title: "Button with non-descriptive name",
      type: "web",
    },
    {
      bp: 375,
      id: "response-missing-table-headers",
      impact:
        "Screen reader users will not be able to determine the relationships between cells in these tables.",
      issue:
        "There are table headers that are not associated with their corresponding data cells. Examples include:\n- ",
      recommendation:
        'Ensure data table headers are properly identified. Ensure all cells that function as row or column headers use <th> elements. Additionally, ensure all <th> elements have a scope attribute set to "row" or "col" depending on whether the particular cell is a row header or a column header. Finally, if a header cell spans multiple rows or columns, set its rowspan or colspan attributes to the number of rows or cells it spans.\n\nIf a table is sufficiently complex that these methods cannot associate a header with its cell, each cell must have a headers attribute set to a space-separated list of the IDs of the headers associated with the cell. This is often time-consuming and prone to error. Splitting complex tables into separate, simpler tables is strongly recommended.',
      stepsToReproduce:
        "1. Locate the table header.\n2. Inspect it with Chrome DevTools.\n3. Notice that it is missing scope, rowspan, and/or colspan attributes that reflect its visual structure.",
      successCriteria: ["1.3.1"],
      title: "Unassociated table headers",
      type: "web",
    },
    {
      bp: 376,
      id: "response-implicit-table",
      impact:
        "Screen reader users will not be able to determine the relationships between cells in these tables.",
      issue:
        "There are data tables that do not use table markup. Examples include:\n- ",
      keepAttribute: true,
      keepElement: true,
      recommendation:
        'Ensure data tables are formatted using table elements. Table elements include <table>, <tr>, <th>, and <td>. <th> elements must have a scope attribute set to "col" or "row" according to whether it functions as a column header or a row header.',
      stepsToReproduce:
        '1. Locate the table.\n2. Inspect it with Chrome DevTools.\n3. Notice that it does not use <table> and related elements or role="table" and related roles.',
      successCriteria: ["1.3.1"],
      title: "Implicit table",
      type: "web",
    },
    {
      bp: 380,
      id: "response-timing-general",
      impact:
        "Users who require additional time to fill out forms will lose the information they've entered when a session times out.",
      issue:
        "There are time-based sessions or responses that cannot be turned off, extended, or accessibly adjusted. Examples include:\n- ",
      recommendation:
        "Ensure accessible usage of time based sessions and timed responses. Users must be able to extend, set, or remove any timeout unless the timeout is longer than 20 hours or the timeout is essential to the page's purpose (such as an auction).",
      stepsToReproduce:
        "1. Trigger the time-based session or response.\n2. Notice that the time limit is not essential, not longer than 20 hours, and that there is no way to extend, set, or remove the timeout.",
      successCriteria: ["2.2.1", "2.2.3"],
      title: "Timing - General",
      type: "web",
    },
    {
      bp: 387,
      id: "response-heading-levels-match-visual-heading-hierarchy.",
      impact:
        "Screen reader users will have difficulty efficiently navigating and gaining an accurate overview of the page.",
      issue:
        "There are headings with levels that do not match their visual level on the page. Examples include:\n- ",
      recommendation:
        "Ensure heading level matches the heading's visual importance/level. The level of heading element used (<h1>, <h2>, etc.) must reflect its visual appearance in the hierarchy of the page.",
      stepsToReproduce:
        '1. Locate the heading.\n2. Inspect it with Chrome DevTools.\n3. In the Accessibility tab, expand the Computed Properties section.\n4. Review the value for "Level".',
      jawsFunctionalSteps:
        '1. Enable JAWS.\n2. Press the Down Arrow key to read line by line.\n3. Alternatively, press the "H" key repeatedly to Go to Next Heading.\n4. Note the purpose and level of each heading.\nExpected result: JAWS announces, "[Text], heading level [Level]"\nActual Result: JAWS announces, "[Text], heading level [Level]" which is not appropriate for its purpose.',
      successCriteria: ["1.3.1", "2.4.10"],
      title: "Heading levels don't match visual heading hierarchy.",
      type: "web",
    },
    {
      bp: 389,
      id: "response-inline-lang-missing",
      impact:
        "Screen readers will use inappropriate pronunciation when announcing this text.",
      issue:
        "There is text in a different language from the rest of the page, but the language of this text is unspecified or incorrect. Examples include:\n- ",
      recommendation:
        "Ensure changes in natural language are identified inline. Elements containing text in a different language from the overall document must have a lang attribute set to a valid BCP 47 primary language subtag: https://r12a.github.io/app-subtags/",
      stepsToReproduce:
        "1. Locate the text.\n2. Inspect it with Chrome DevTools.\n3. Notice that the lang attribute is missing or its value is incorrect.",
      successCriteria: ["3.1.2"],
      title: "Inline language missing or incorrect",
      type: "web",
    },
    {
      bp: 393,
      id: "response-list-items-without-list-parent",
      impact: "Assistive technologies may be unable to parse this content.",
      issue: "There are improperly structured lists. Examples include:\n- ",
      recommendation:
        'Ensure sub-lists are marked up properly. <ul> and <ol> elements must only contain <li>, <script>, and <template> elements (without role attributes), and elements with role="listitem", as direct children. <li> elements must be direct children of an <ul> or an <ol> element.',
      stepsToReproduce:
        "1. Locate the list items.\n2. Inspect them with Chrome DevTools.\n3. Notice that the <li> elements are not direct children of an <ul> or <ol> element.",
      successCriteria: ["1.3.1"],
      title: "List items without list parent",
      type: "web",
    },
    {
      bp: 395,
      id: "response-layout-table-structural",
      impact:
        "Screen readers will treat this content as a data table, causing confusion about its layout and impeding navigation.",
      issue:
        "There are <table> elements used for layout purposes, but they are not marked as presentational. Examples include:\n- ",
      recommendation:
        'Ensure layout tables do not contain structural markup. This can be done by adding role="presentation" to <table> elements used for a layout purpose. Additionally, convert any <th> cells to <td> cells. It is strongly recommended to use CSS instead of HTML table elements for layout purposes.',
      stepsToReproduce:
        '1. Locate the layout table.\n2. Inspect it with Chrome DevTools.\n3. Select the <table> element.\n4. Verify that role="presentation" or role="none" is present. Alternatively, verify that the table and its descendants do not have any relationship elements and attributes, such as <th>, summary, scope, headers, role="columnheader", and role="rowheader".',
      successCriteria: ["1.3.1"],
      title: "Layout table marked for presentation",
      type: "web",
    },
    {
      bp: 401,
      id: "response-directly-linked-image",
      impact:
        "It is not possible to add a textual equivalent to an image file, so screen reader users will be prevented from accessing the contents of these images.",
      issue:
        "There are links that directly target image files. Examples include:\n- ",
      recommendation:
        "Ensure links do not directly target images. Instead, include the image inside a page. Add a proper textual equivalent or mark the image as decorative.",
      stepsToReproduce:
        "1. Locate the link to the image.\n2. Inspect it with Chrome DevTools.\n3. Notice that the href attribute references an image file directly.",
      successCriteria: ["1.1.1"],
      title: "Directly linked image",
      type: "web",
    },
    {
      bp: 409,
      id: "response-text-cannot-be-resized-to-200",
      impact:
        "Users with low vision who need to resize text will be prevented from accessing this content.",
      issue:
        "There is content that disappears, overlaps, or is cut off when viewing the page at 200% browser zoom and a 1280-pixel viewport width. Examples include:\n- ",
      recommendation:
        "Ensure text can be resized. Users must be able to resize text up to 200% zoom at a 1280-pixel viewport width without loss of content or functionality.\n\nMoving content to an accessible show/hide control, such as a hamburger menu, is acceptable.",
      stepsToReproduce:
        "1. Set the viewport width to 1280 pixels using Chrome DevTools.\n2. Increase the browser zoom level to 200% using Ctrl+Plus or by going to Customize and control Google Chrome > Zoom > Make Text Smaller.\n3. Refresh the page.\n4. Notice that content disappears, is cut off, or overlaps.",
      successCriteria: ["1.4.4"],
      title: "Text cannot be resized to 200%",
      type: "web",
    },
    {
      bp: 410,
      id: "response-meta-viewport",
      impact:
        "Some browsers prevent users from resizing a page if these attributes are set, so users with low vision who rely on resizing text will be prevented from reading content on the page.",
      issue:
        'The page has a <meta name="viewport"> element with a maximum-scale attribute set to less than 2 or a user-scalable attribute set to no.',
      recommendation:
        "Ensure containing elements allow text resize without loss of functionality. Users must be able to resize text up to 200% zoom at a 1280-pixel viewport width without loss of content or functionality.",
      stepsToReproduce:
        '1. Open Chrome DevTools.\n2. Locate the <meta name="viewport"> element.\n3. Notice that the maximum-scale attribute is set to a value less than 2 or the user-scalable attribute is set to "no".',
      successCriteria: ["1.4.4", "1.4.8"],
      title: "Meta viewport maximum-scale/user-scalable",
      type: "web",
    },
    {
      bp: 414,
      id: "response-multiple-row-headers",
      impact:
        "Screen reader users will not understand the relationships between cells in these tables.",
      issue:
        "There are table rows with multiple row headers. Examples include:\n- ",
      recommendation:
        'Ensure implicit row header cells use th elements with row scope. Only one descendant of a table row may be a row header. Ensure that only one element in the row is a <th scope="row"> element.',
      stepsToReproduce:
        '1. Locate the table row.\n2. Inspect it with Chrome DevTools.\n3. Notice that it contains multiple headers with scope="row".',
      successCriteria: ["1.3.1"],
      title: "Multiple row headers",
      type: "web",
    },
    {
      bp: 423,
      id: "response-suspicious-object-name",
      impact: "Screen reader users will not know what these objects represent.",
      issue:
        "There are <object> elements with insufficiently descriptive accessible names. Examples include:\n- ",
      recommendation:
        "Ensure applets provide valid text equivalents. This includes <object> elements. Alter the accessible name to a more descriptive value with an aria-label, aria-labelledby, or title attribute.",
      stepsToReproduce:
        '1. Locate the object.\n2. Inspect it with Chrome DevTools.\n3. In the Accessibility tab, expand the Computed Properties section.\n4. Review the value for "Name".',
      successCriteria: ["1.1.1"],
      title: "Insufficiently descriptive object name",
      type: "web",
    },
    {
      bp: 429,
      id: "response-page-lang-missing",
      impact:
        "Screen readers will use inappropriate pronunciation when announcing the text of the page.",
      issue: "The language of the page is unspecified or incorrect.",
      recommendation:
        "Ensure the language of a document is set. <html> elements must have a lang attribute set to a valid BCP 47 primary language subtag: https://r12a.github.io/app-subtags/\n\nFor pages in multiple languages, choose whichever language is used most frequently on the page. If two languages are used equally, choose the language which occurs first on the page.",
      stepsToReproduce:
        "1. Open Chrome DevTools.\n2. Inspect the <html> element.\n3. Notice that the lang attribute is missing or set to an incorrect value.",
      successCriteria: ["3.1.1"],
      title: "Page language missing or incorrect",
      type: "web",
    },
    {
      bp: 441,
      id: "response-marquee",
      impact:
        "Users with cognitive disabilities may be prevented from reading important content before it appears, or it may be too distracting for them to remain on the page. Users with vestibular disorders or migraine may experience symptoms caused by this movement.",
      issue: "There are <marquee> elements on the page. Examples include:\n- ",
      recommendation:
        "Ensure the marquee element is avoided. Replace this element with another element. If movement is required, provide an accessible mechanism to pause, stop, or hide the movement, such as a pause button.",
      stepsToReproduce:
        "1. Locate the marquee.\n2. Inspect it with Chrome DevTools.\n3. Notice that the <marquee> element is used.",
      successCriteria: ["2.2.2"],
      title: "Marquee present in page",
      type: "web",
    },
    {
      bp: 444,
      id: "response-video-no-name",
      impact:
        "Screen reader users will be unable to determine what these videos represent.",
      issue:
        "There are <video> elements without accessible names. Examples include:\n- ",
      recommendation:
        "Ensure embedded objects are directly accessible. The best way to do this is to set an aria-labelledby attribute on the video element to the ID of any visually present label for the video. Alternatively, add an aria-label attribute to the video with the video's name.",
      stepsToReproduce:
        '1. Locate the video.\n2. Inspect it with Chrome DevTools.\n3. In the Accessibility tab, expand the Computed Properties section.\n4. Review the value for "Name".',
      successCriteria: ["1.1.1", "4.1.2"],
      title: "Video accessible name missing",
      type: "web",
    },
    {
      bp: 456,
      id: "response-iframe-image",
      impact:
        "Screen reader users will be unable to determine what these images represent.",
      issue: "There are iframes with image sources. Examples include:\n- ",
      recommendation:
        "Ensure frames utilize markup files as their source. Place the image into the main document or change the iframe to target an HTML document or other accessible document type.",
      stepsToReproduce:
        "1. Locate the iframe.\n2. Inspect it with Chrome DevTools.\n3. Notice that the src attribute refers to an image file directly.",
      successCriteria: ["1.1.1"],
      title: "Iframe with image source",
      type: "web",
    },
    {
      bp: 457,
      id: "response-headings-are-implicit",
      impact:
        "Screen reader users will have difficulty efficiently navigating and gaining an accurate overview of the page.",
      issue:
        "There is content that functions as a heading but does not use heading markup. Examples include:\n- ",
      recommendation:
        "Avoid the use of implicit headings. Text that visually appears as a heading for a section of content must use <h1>, <h2>, etc. elements. Additionally, ensure the level of the heading accurately reflects the element's position in the visual hierarchy.",
      stepsToReproduce:
        '1. Locate the heading.\n2. Inspect it with Chrome DevTools.\n3. In the Accessibility tab, expand the Computed Properties section.\n4. Review the value for "Role".',
      jawsFunctionalSteps:
        '1. Enable JAWS.\n2. Press the Down Arrow key to read line by line.\n3. Alternatively, press the "H" key repeatedly to Go to Next Heading.\n4. Note the purpose and level of each heading.\nExpected result: JAWS announces, "[Text], heading level [Level]"\nActual Result: JAWS announces, "[Text]" without the heading role or level.',
      successCriteria: ["1.3.1"],
      title: "Headings are implicit",
      type: "web",
    },
    {
      bp: 464,
      id: "response-list-items-not-children-of-list",
      impact: "Assistive technologies may be unable to parse this content.",
      issue: "There are improperly structured lists. Examples include:\n- ",
      recommendation:
        'Ensure list items are found in a list container. <ul> and <ol> elements must only contain <li>, <script>, and <template> elements (without role attributes), and elements with role="listitem", as direct children. <li> elements must be direct children of an <ul> or an <ol> element.',
      stepsToReproduce:
        "1. Locate the list items.\n2. Inspect them with Chrome DevTools.\n3. Notice that the <li> elements are not direct children of an <ul> or <ol> element.",
      successCriteria: ["1.3.1"],
      title: "List items not children of list",
      type: "web",
    },
    {
      bp: 464,
      id: "response-description-list",
      impact: "Assistive technologies may be unable to parse this content.",
      issue:
        "There are description terms or details that are not appropriately nested in a description list element. Examples include:\n- ",
      recommendation:
        "Ensure list items are found in a list container. For description lists, ensure that any <dt> and <dd> elements are children of the <dl> element or that they are children of a <div> element that is a child of the <dl>.",
      stepsToReproduce:
        "1. Locate the description terms or details.\n2. Inspect them with Chrome DevTools.\n3. Notice that the <dd>/<dt> elements are not descendants of a <dl> element.",
      successCriteria: ["1.3.1"],
      title: "Terms or details not children of description list",
      type: "web",
    },
    {
      bp: 466,
      id: "response-navigation-inconsistent",
      impact:
        "Screen reader users, people with low vision, and people with cognitive disabilities may have difficulty locating repeated content and navigation structures.",
      issue:
        "There are pages that do not use a consistent navigation structure.",
      recommendation:
        "Ensure pages use a consistent navigation structure. Navigational mechanisms that are repeated on multiple pages must occur in the same relative order each time they are used.",
      stepsToReproduce:
        "1. Locate the navigation regions on the page.\n2. Notice that the order of items differs on different pages.",
      successCriteria: ["3.2.3"],
      title: "Navigation inconsistent",
      type: "web",
    },
    {
      bp: 476,
      id: "response-canvas-text-equivalent-missing",
      impact:
        "Screen reader users will be unable to determine what this canvas represents.",
      issue:
        "There are meaningful <canvas> elements with no textual equivalents. Examples include:\n- ",
      recommendation:
        "Ensure embedded elements and canvas elements provide a meaningful text equivalent.\nFor <canvas> elements, the best way to provide a textual equivalent is to add child HTML elements to the <canvas> element. Assistive technologies will access this content instead of the <canvas>.",
      stepsToReproduce:
        '1. Locate the canvas.\n2. Inspect it with Chrome DevTools.\n3. Review its contents.\n4. In the Accessibility tab, expand the Computed Properties section.\n5. Review the value for "Name".',
      successCriteria: ["1.1.1"],
      title: "Canvas text equivalent missing",
      type: "web",
    },
    {
      bp: 480,
      id: "response-hr-width",
      impact:
        "Users with low vision who use browser zoom may need to scroll excessively to access content.",
      issue:
        "There are <hr> elements with a width set in absolute units. Examples include:\n- ",
      recommendation:
        "Ensure hr elements utilize relative sizing. Specify the width of the <hr> element using relative units.",
      stepsToReproduce:
        "1. Locate the horizontal rule.\n2. Inspect it with Chrome DevTools.\n3. In the Styles tab, locate the value for the width property.\n4. Notice that the value is set in absolute units.",
      successCriteria: ["1.4.4", "1.4.8"],
      title: "hr element with width",
      type: "web",
    },
    {
      bp: 490,
      id: "response-non-focusable-links",
      impact:
        "Keyboard users will be prevented from accessing the functionality provided by these controls.",
      issue:
        "There are links that cannot receive keyboard focus. Examples include:\n- ",
      recommendation:
        'Ensure all active elements receive keyboard focus or can be activated with the keyboard. In order for an <a> element to be focusable with the keyboard, it must have an href attribute set to a non-null value, or it must have tabindex="0".',
      stepsToReproduce:
        "1. Press Tab repeatedly to navigate through the focusable elements on the page.\n2. Notice that the links are never focused.",
      successCriteria: ["2.1.1", "2.1.3"],
      title: "Links that cannot be focused",
      type: "web",
    },
    {
      bp: 523,
      id: "response-frame-with-no-title",
      impact:
        "Screen reader users will have difficulty determining the purpose of these iframes.",
      issue:
        "There are <iframe> elements without an accessible name. Examples include:\n- ",
      recommendation:
        "Ensure frame titles are meaningful. All meaningful iframes must have a title attribute set to a short description of the iframe.",
      stepsToReproduce:
        '1. Locate the frame.\n2. Inspect it with Chrome DevTools.\n3. In the Accessibility tab, expand the Computed Properties section.\n4. Review the value for "Name".',
      successCriteria: ["4.1.2"],
      title: "Frame with no title",
      type: "web",
    },
    {
      bp: 523,
      id: "response-decorative-iframe",
      impact:
        "Screen readers may generate irrelevant or confusing announcements for this content.",
      issue:
        "There are visually hidden or decorative iframes that are exposed to assistive technologies. Examples include:\n- ",
      recommendation:
        'Ensure frame titles are meaningful. If an <iframe> is decorative or meant to be hidden, hide it with display: none. Alternatively, set aria-hidden="true", tabindex="-1", and title="empty" on the iframe.',
      stepsToReproduce:
        "1. Locate the iframe.\n2. Inspect it with Chrome DevTools.\n3. In the Accessibility tab, expand the Computed Properties section.\n4. Verify that the accessibility node is not exposed.",
      successCriteria: ["4.1.2"],
      title: "Decorative iframe",
      type: "web",
    },
    {
      bp: 524,
      id: "response-focusable-aria-hidden-true",
      impact:
        "Keyboard users will be able to navigate to this element even if it is off screen. Screen reader users will be able to focus this element if they press Tab, but they will be unable to determine its purpose.",
      issue:
        'There are keyboard-focusable controls with aria-hidden="true". Examples include:\n- ',
      recommendation:
        "Avoid placing inactive elements in the focus order. If content is meant to be hidden from all users, hide it with display: none or visibility: hidden. If content is meant to be accessed by all users, remove any aria-hidden attributes.",
      stepsToReproduce:
        '1. Locate the control.\n2. Inspect it with Chrome DevTools.\n3. In the Accessibility tab, expand the Computed Properties section.\n4. Notice that both "hidden" and "Focusable" are set to true.',
      successCriteria: ["2.1.1"],
      title: 'Focusable aria-hidden="true" element',
      type: "web",
    },
    {
      bp: 542,
      id: "response-page-title-repetitive",
      impact:
        "Screen reader users and users with cognitive disabilities will have difficulty determining the purpose of the page.",
      issue: "The page title insufficiently describes the page's purpose.",
      recommendation:
        "Provide an informative, context-sensitive page title. Alter the page title to include the specific name for the page.",
      stepsToReproduce:
        "1. Inspect the page with Chrome DevTools.\n2. Locate the <title> element within the <head>.\n3. Review its text.",
      jawsFunctionalSteps:
        '1. Enable JAWS.\n2. Press the "T" key to read the document title.\nExpected result: JAWS announces, "[Recommended Title]".\nActual result: JAWS announces, "[Actual Title]".',
      successCriteria: ["2.4.2"],
      title: "Page title repetitive",
      type: "web",
    },
    {
      bp: 551,
      id: "response-multiple-labels",
      impact:
        "Assistive technologies may not associate all of the labels with the control. Different assistive technologies and browser combinations may use different labels as the accessible name.",
      issue:
        "There are form controls with multiple associated <label> elements. Examples include:\n- ",
      recommendation:
        "Ensure elements with multiple labels are rendered appropriately. Only one <label> element can be associated with a control at a time.",
      stepsToReproduce:
        "1. Locate the form control.\n2. Inspect it with Chrome DevTools.\n3. Note the value of its id attribute.\n3. Search the source code for the id.\n4. Notice that multiple <label> elements reference this id in their for attributes.",
      successCriteria: ["1.3.1", "4.1.2"],
      title: "Fields with multiple labels",
      type: "web",
    },
    {
      bp: 566,
      id: "response-implicit-lists",
      impact:
        "Screen reader users will have difficulty understanding that this content is a list.",
      issue:
        "There is content that appears as a list but does not use list markup. Examples include:\n- ",
      recommendation:
        "Ensure implicit list markup is avoided. Lists must use <ul>, <ol>, <li>, <dl>, <dt>, and <dd> elements as appropriate.",
      stepsToReproduce:
        "1. Locate the list.\n2. Inspect it with Chrome DevTools.\n3. Note that it does not use <ul>, <ol>, <dl> and related elements.",
      successCriteria: ["1.3.1"],
      title: "Implicit lists",
      type: "web",
    },
    {
      bp: 588,
      id: "response-avoid-unnecessary-use-headings",
      impact:
        "Screen reader users will have difficulty efficiently navigating and gaining an accurate overview of the page.",
      issue:
        "There is content that uses heading markup but does not function as a heading. Examples include:\n- ",
      recommendation:
        "Avoid unnecessary use of heading elements. Only text that functions as a heading can use heading markup. Convert this content to a <p>, <div>, or <span> element.",
      stepsToReproduce:
        '1. Locate the text.\n2. Inspect it with Chrome DevTools.\n3. Notice that the text uses <h1>-<h6> elements or role="heading".',
      jawsFunctionalSteps:
        '1. Enable JAWS.\n2. Press the Down Arrow key to read line by line.\n3. Alternatively, press the "H" key repeatedly to Go to Next Heading.\n4. Note the purpose and level of each heading.\nExpected result: JAWS announces, "[Expected Output]"\nActual Result: JAWS announces, "[Text], heading level [Level]" which is not appropriate for its purpose.',
      successCriteria: ["1.3.1"],
      title: "Unnecessary headings are used",
      type: "web",
    },
    {
      bp: 590,
      id: "response-nested-tables",
      impact:
        "Screen readers may be unable to parse this content. This may cause incorrect header announcements and break table navigation shortcuts for users.",
      issue:
        "There are table cells with children that are <table> elements. Examples include:\n- ",
      recommendation:
        "Avoid using sub-tables in header elements. Do not nest <table> elements within <th> or <td> elements. Instead, use CSS to lay out content inside table cells.",
      stepsToReproduce:
        "1. Locate the table.\n2. Inspect it with Chrome DevTools.\n3. Notice that there is a <table> element nested within another <table> element.",
      successCriteria: ["1.3.1"],
      title: "Nested tables",
      type: "web",
    },
    {
      bp: 592,
      id: "response-page-tabs-lack-state-or-role",
      impact:
        "Screen reader users will be unable to determine that these controls reveal panels of content and which panel is currently revealed.",
      issue:
        "There are tabs without appropriate name, role, and/or state information. Examples include:\n- ",
      recommendation:
        'Ensure page tabs provide state and role.\n\nFor tabs, the following information is expected:\n- The container for the set of tabs must have role="tablist".\n- Each tab must have role="tab" and must be a descendant of the tablist element.\n- Each panel container must have role="tabpanel".\n- If the tablist has a visible label, the tablist element must have aria-labelledby set to the ID of the labelling element. Otherwise, the tablist element must have aria-label set to the accessible name.\n- Each tab must have aria-controls set to the ID of its corresponding tabpanel.\n- The selected tab must have aria-selected="true". All other tabs must have aria-selected="false".\n- Tabpanel elements must have aria-labelledby set to the ID of their corresponding tab.\n- If the tablist is vertically oriented, it must have aria-orientation="vertical".',
      stepsToReproduce:
        '1. Locate the tabs.\n2. Inspect them with Chrome DevTools.\n3. Review their nesting structure.\n4. In the Accessibility tab, expand the Computed Properties section.\n5. Review the values for "Role" and "Selected".',
      jawsFunctionalSteps:
        '1. Enable JAWS.\n2. Press the Tab key to move focus to the first tab control.\nExpected result: JAWS announces, "[@TODO]".\nActual result: JAWS announces, "[Actual Output]".',
      successCriteria: ["1.4.1", "4.1.2"],
      title: "Page tabs lack state or role",
      type: "web",
    },
    {
      bp: 602,
      id: "response-custom-controls-lack-name-role-state",
      impact:
        "Screen reader users will have difficulty determining the purpose and state of these controls.",
      issue:
        "There are controls without appropriate name, role, and/or state information. Examples include:\n- ",
      recommendation:
        "Ensure custom controls provide proper textual name, role, and state information. Properly structured native controls provide this information automatically. For custom controls, developers must explicitly add this information by using ARIA attributes.\n\nMost modern browsers have an Accessibility section in the developer tools panel that will display an element's calculated name, role, and state information.\n\nA control's name must represent the general purpose of the control and include any visible labeling text. It can be set through a variety of methods. Custom controls typically use the aria-label attribute or the aria-labelledby attribute to supply the name.\n\nA control's role indicates the type of control, such as \"checkbox\" or \"button\". For custom controls, the role must be set with the role attribute. The ARIA specification only permits certain values for this attribute. Additionally, the ARIA in HTML specification prevents the use of certain roles on some elements. For a list of HTML elements and their permitted roles, see the ARIA in HTML specification: https://www.w3.org/TR/html-aria/#docconformance\n\nA control's state indicates several possible pieces of information. Common states include expanded, current, selected, checked, and disabled. Most are indicated with similarly named ARIA attributes. Certain states can only be used with certain roles. For a list of roles and their allowed states, see the ARIA specification: https://www.w3.org/TR/wai-aria/#role_definitions\n\nThe Web Accessibility Initiative (WAI) of the W3C publishes suggested patterns for custom controls in the WAI-ARIA Authoring Practices: https://www.w3.org/WAI/ARIA/apg/ These patterns are not tested or endorsed by the W3C, but they often serve as good starting points for developing custom controls.",
      stepsToReproduce:
        "1. Locate the control.\n2. Inspect its element with Chrome DevTools.\n3. In the Accessibility tab, expand the Computed Properties section.\n4. Review the values in this section.",
      jawsFunctionalSteps:
        '1. Enable JAWS.\n2. Press Tab key to move focus to the control.\nExpected result: JAWS announces, "[Expected Output]".\nActual result: JAWS announces, "[Actual Output]".',
      successCriteria: ["1.1.1", "4.1.2"],
      title: "Custom controls - General",
      type: "web",
    },
    {
      bp: 602,
      id: "response-custom-controls-accordion",
      impact:
        "Screen reader users will be unable to determine that these controls expand and collapse content. They will also have difficulty determining whether the controls are currently expanded or collapsed.",
      issue:
        "There are accordions without appropriate role and/or state information. Examples include:\n- ",
      recommendation:
        'Ensure custom controls provide proper textual name, role, and state information.\n\nFor accordions, the following information is expected:\n- Each accordion header must be enclosed in a <button> element.\n- Each of these buttons must be enclosed in a heading element of an appropriate level. The <button> element must be the only child of this heading element.\n- When the panel is visible, the header button must have aria-expanded="true". When it is hidden, the header button must have aria-expanded="false".\n- The button must have aria-controls set to the ID of the panel container.\n- If a panel is visible and locked in the expanded state, its header button must have aria-disabled="true".',
      stepsToReproduce:
        '1. Locate the accordion header.\n2. Inspect its element with Chrome DevTools.\n3. Review its nesting structure.\n4. In the Accessibility tab, expand the Computed Properties section.\n5. Review the values for "Role", "Disabled", and "Expanded".',
      jawsFunctionalSteps:
        '1. Enable JAWS.\n2. Press Tab key to move focus to the accordion header.\nExpected result: JAWS announces, "[@TODO]".\nActual result: JAWS announces, "[Actual Output]".',
      successCriteria: ["1.1.1", "4.1.2"],
      title: "Custom controls - Accordion",
      type: "web",
    },
    {
      bp: 602,
      id: "response-custom-controls-breadcrumbs",
      impact:
        "Screen reader users will have difficulty determining that this is a breadcrumb navigation and their current position within the breadcrumb.",
      issue:
        "There are breadcrumb navigation controls without appropriate name, role, and/or state information. Examples include:\n- ",
      recommendation:
        'Ensure custom controls provide proper textual name, role, and state information.\n\nFor breadcrumbs, the following information is expected:\n- The breadcrumb links must be contained in a <nav> element.\n- The <nav> element must have an accessible name provided by an aria-label or aria-labelledby attribute.\n- The link to the current page, if any, must have aria-current="true".',
      stepsToReproduce:
        '1. Locate the breadcrumbs.\n2. Inspect them with Chrome DevTools.\n3. Review their structure and attributes.\n4. If a <nav> element is present, select it. Then, in the Accessibility tab, expand the Computed Properties section. Review the value for "Name". ',
      jawsFunctionalSteps:
        '1. Enable JAWS.\n2. Press Tab key to move focus to the first Breadcrumb link.\nExpected result: JAWS announces, "@TODO".\nActual result: JAWS announces, "[Actual Output]".',
      successCriteria: ["1.1.1", "4.1.2"],
      title: "Custom controls - Breadcrumbs",
      type: "web",
    },
    {
      bp: 602,
      id: "response-custom-controls-buttons",
      impact:
        "Screen reader users will be unable to determine that this content is interactive.",
      issue:
        "There are buttons without appropriate role information. Examples include:\n- ",
      recommendation:
        'Ensure custom controls provide proper textual name, role, and state information.\n\nThe best way to do this is to use native controls, as they come with this information built in. In this case, <button> elements would be most appropriate.\n\nIf conversion to native buttons is not possible, developers must add role="button" to these controls. If the buttons have insufficient internal text, developers must add an aria-label attribute or an aria-labelledby attribute to provide a name.',
      stepsToReproduce:
        '1. Locate the button.\n2. Inspect its element with Chrome DevTools.\n3. In the Accessibility tab, expand the Computed Properties section.\n4. Review the value for "Role".',
      jawsFunctionalSteps:
        '1. Enable JAWS.\n2. Press Tab key to move focus to the button.\nExpected result: JAWS announces, "[Name], button".\nActual result: JAWS announces, "[Actual Output]".',
      successCriteria: ["1.1.1", "4.1.2"],
      title: "Custom controls - Buttons",
      type: "web",
    },
    {
      bp: 602,
      id: "response-custom-controls-checkboxes",
      impact:
        "Screen reader users will be unable to determine that these controls can be checked or unchecked. They will also be unable to review which options they have chosen.",
      issue:
        "There are checkboxes without appropriate name, role, and/or state information. Examples include:\n- ",
      recommendation:
        'Ensure custom controls provide proper textual name, role, and state information.\n\nThe best way to do this is to use native controls, as they come with this information built in. In this case, <input type="checkbox"> elements would be most appropriate.\n\nDevelopers can often achieve the same visual appearance using progressively enhanced CSS. Alternatively, they can visually hide the checkboxes with opacity: 0 and use SVGs to fake their appearance.\n\nIf conversion to native checkboxes is not possible, the following information is expected:\n- The element functioning as the checkbox must have role="checkbox".\n- This checkbox element must have a label provided by internal text, aria-label, or aria-labelledby.\n- When checked, the checkbox element must have aria-checked="true", and when not checked, it must have aria-checked="false". If partially checked, it must have aria-checked="mixed".\n- Checkboxes in a logical group must be children of an element with role="group". That element must have aria-labelledby set to the ID of text labelling the group.',
      stepsToReproduce:
        '1. Locate the checkbox.\n2. Inspect it with Chrome DevTools.\n3. In the Accessibility tab, expand the Computed Properties section.\n4. Review the values for "Name", "Role", and "Checked".',
      jawsFunctionalSteps:
        '1. Enable JAWS.\n2. Press Tab key to move focus to the checkbox (not checked).\n3. Press the Space key to activate the checkbox.\nExpected result: JAWS announces, "[Group Name], group. [Name], checkbox, not checked." Once activated, JAWS announces, "checked".\nActual result: JAWS announces, "[Actual Output]".',
      successCriteria: ["1.1.1", "4.1.2"],
      title: "Custom controls - Checkboxes",
      type: "web",
    },
    {
      bp: 602,
      id: "response-custom-controls-comboboxes",
      impact:
        "Screen reader users will be unable to determine that a list of options are present. They will also be prevented from reviewing any options they have chosen.",
      issue:
        "There are comboboxes without appropriate name, role, and/or state information. Examples include:\n- ",
      recommendation:
        'Ensure custom controls provide proper textual name, role, and state information.\n\nFor comboboxes, the following information is expected:\n- The element that receives input and displays the value must have role="combobox".\n- The combobox must have aria-controls set to the ID of its suggestion popup.\n- The popup container must have role="listbox", "tree", "grid", or "dialog" depending on its function and include all other necessary ARIA properties for its role.\n- For tree, grid, and dialog popups, the combobox element must have aria-haspopup="grid", "tree", or "dialog" as appropriate.\n- When the popup is shown, the combobox element must have aria-expanded="true". Otherwise, it must be set to "false".\n- For listbox, grid, or tree popups, when a descendant element is visually focused, the actual keyboard focus must remain on the combobox and the combobox must have aria-activedescendant set to the ID of the visually focused element.\n- For listbox, grid, or tree popups, when a suggested value is visually selected, that value\'s element must have aria-selected="true".\n- The combobox element must have a label provided by a <label> with its for attribute set to the combobox ID, aria-label, or aria-labelledby.\n- The combobox must have aria-autocomplete set to an appropriate value. Use "none" if the suggestions are always the same, regardless of text entered. Use "list" if the suggestions change based on what is typed. Use "both" if the suggestions change based on what is typed and a suggested completion string is shown after the input text.',
      stepsToReproduce:
        '1. Locate the combobox.\n2. Inspect it with Chrome DevTools.\n3. In the Accessibility tab, expand the Computed Properties section.\n4. Review the values for "Name", "Role", "Has autocomplete", "hasPopup", "Expanded", "Active descendant", and "Controls".',
      jawsFunctionalSteps:
        '1. Enable JAWS.\n2. Press Tab key to move focus to the combobox.\nExpected result: JAWS announces, "@TODO".\nActual result: JAWS announces, "[Actual Output]".',
      successCriteria: ["1.1.1", "4.1.2"],
      title: "Custom controls - Comboboxes",
      type: "web",
    },
    {
      bp: 602,
      id: "response-custom-controls-links",
      impact:
        "Screen reader users will be unable to determine that these controls navigate to new pages.",
      issue:
        "There are links without appropriate role information. Examples include:\n- ",
      recommendation:
        'Ensure custom controls provide proper textual name, role, and state information.\n\nThe best way to do this is to use native controls, as they come with this information built in. In this case, an <a> element with a non-null href would be most appropriate for these controls. An href is required because <a> elements without href attributes are not always considered links by assistive technology. If necessary, developers can set the href to "#" or "javascript:void(0);".\n\nIf using <a> elements is not possible, the links must be given role="link". If the links have insufficient internal text, developers must add an aria-label attribute or an aria-labelledby attribute to provide a name.',
      stepsToReproduce:
        '1. Locate the link.\n2. Inspect its <a> or role="link" element with Chrome DevTools.\n3. In the Accessibility tab, expand the Computed Properties section.\n4. Review the value for "Name".',
      jawsFunctionalSteps:
        '1. Enable JAWS.\n2. Press Tab key to move focus to the link.\nExpected result: JAWS announces, "[Name], link" or "[Name], visited link".\nActual result: JAWS announces, "[Actual Output]".',
      successCriteria: ["1.1.1", "4.1.2"],
      title: "Custom controls - Links",
      type: "web",
    },
    {
      bp: 602,
      id: "response-custom-controls-radio",
      impact:
        "Screen reader users will be unable to determine that only one of these controls can be checked or unchecked. They will also be prevented from reviewing which option they have chosen.",
      issue:
        "There are radio buttons without appropriate name, role, and/or state information. Examples include:\n- ",
      recommendation:
        'Ensure custom controls provide proper textual name, role, and state information.\n\nThe best way to do this is to use native controls, as they come with this information built in. In this case, <input type="radio"> elements would be most appropriate.\n\nDevelopers can often achieve the same visual appearance using progressively enhanced CSS. Alternatively, they can visually hide the radio buttons with opacity: 0 and use SVGs to fake their appearance.\n\nIf conversion to native radio buttons is not possible, the following information is expected:\n- Radio buttons in the same logical group are children of an element with role="radiogroup".\n- Each radio button element has role="radio".\n- When a radio button is checked, it must have aria-checked="true". Otherwise, it must have aria-checked="false".\n- The radio button must have an accessible name provided by internal text, aria-label, or aria-labelledby.\n- The radiogroup element must have an accessible name set with aria-labelledby or aria-label.',
      stepsToReproduce:
        '1. Locate the radio button.\n2. Inspect it with Chrome DevTools.\n3. In the Accessibility tab, expand the Computed Properties section.\n4. Review the values for "Name", "Role", and "Checked".',
      jawsFunctionalSteps:
        '1. Enable JAWS.\n2. Press Tab key to move focus to the first radio button in the group (not checked).\n3. Press the Space key to activate the radio button.\nExpected result: JAWS announces, "[Group Name], group. [Name], radio button, not checked". Once checked, JAWS announces, "checked".\nActual result: JAWS announces, "[Actual Output]".',
      successCriteria: ["1.1.1", "4.1.2"],
      title: "Custom controls - Radio buttons",
      type: "web",
    },
    {
      bp: 602,
      id: "response-custom-controls-selects",
      impact:
        "Screen reader users will have difficulty determining that a list of options is available for selection and which options they have selected.",
      issue:
        "There are custom select controls without appropriate name, role, and/or state information. Examples include:\n- ",
      recommendation:
        'Ensure custom controls provide proper textual name, role, and state information.\n\nThe best way to do this is to use native controls, as they come with this information built in. In this case, <select> elements would be most appropriate for these controls.\n\nIf conversion to native selects is not possible, the following information is expected:\n- The element that receives input and displays the value must have role="combobox".\n- The combobox element must have aria-controls set to the ID of its listbox.\n- The listbox container must have role="listbox". This element and its descendants must include all other ARIA attributes necessary for its role.\n- When the popup is shown, the combobox element must have aria-expanded="true". Otherwise, it must be set to "false".\n- When a descendant element is visually focused, the actual keyboard focus must remain on the combobox element, and it must have aria-activedescendant set to the ID of the visually focused element.\n- When an option is visually selected, that option element must have aria-selected="true".\n- The combobox element must have a label provided by a <label> with its for attribute set to the combobox ID, aria-label, or aria-labelledby.',
      stepsToReproduce:
        '1. Locate the select.\n2. Inspect it with Chrome DevTools.\n3. In the Accessibility tab, expand the Computed Properties section.\n4. Review the values for "Name", "Role", "hasPopup", and "Expanded".',
      jawsFunctionalSteps:
        '1. Enable JAWS.\n2. Press Tab key to move focus to the select.\nExpected result: JAWS announces, "@TODO".\nActual result: JAWS announces, "[Actual Output]".',
      successCriteria: ["1.1.1", "4.1.2"],
      title: "Custom controls - Selects",
      type: "web",
    },
    {
      bp: 602,
      id: "response-custom-controls-show-hide",
      impact:
        "Screen reader users will be unable to determine that these controls expand and collapse content. They will also have difficulty determining whether a control is currently expanded or collapsed.",
      issue:
        "There are show/hide controls without appropriate name, role, and/or state information. Examples include:\n- ",
      recommendation:
        'Ensure custom controls provide proper textual name, role, and state information.\n\nFor show/hide controls, the following information is expected:\n- The element that shows and hides a content area must be a <button>.\n- When the content area is visible, the button must have aria-expanded="true". Otherwise, the button must have aria-expanded="false".\n- The button must have an accessible name set with internal text, aria-label, or aria-labelledby.',
      stepsToReproduce:
        '1. Locate the show/hide control.\n2. Inspect its element with Chrome DevTools.\n3. Review its nesting structure.\n4. In the Accessibility tab, expand the Computed Properties section.\n5. Review the values for "Role" and "Expanded".',
      jawsFunctionalSteps:
        '1. Enable JAWS.\n2. Press Tab key to move focus to the show/hide button (collapsed).\n3. Press the Space key or Enter key to expand the button.\nExpected result: JAWS announces, "[Name], button, collapsed". Once activated, JAWS announces, "expanded".\nActual result: JAWS announces, "[Actual Output]".',
      successCriteria: ["1.1.1", "4.1.2"],
      title: "Custom controls - Show/hide controls",
      type: "web",
    },
    {
      bp: 602,
      id: "response-custom-controls-toggletips",
      impact:
        "Screen reader users will be prevented from accessing the tooltip's text and will have difficulty determining the purpose of the control.",
      issue:
        "There are toggletips without corresponding name and role information. Examples include:\n- ",
      recommendation:
        'Ensure custom controls provide proper textual name, role, and state information.\n\nIn this case, these elements function as "toggletips". A toggletip is any button that only exists to show a tooltip. Common examples include question mark buttons and information buttons. Although toggletips are similar to tooltips, they require different accessibility information.\n\nThe expected structure is as follows:\n- The control that opens the tooltip must be a <button>.\n- The button must have an accessible name set through internal text, aria-label, or aria-labelledby.\n- The tooltip container element must be available on page load, but it can be visually hidden with a .visually-hidden or .sr-only CSS class.\n- This tooltip container must have role="status".\n- To display the tooltip visually, inject text into this <div role="status"> element. If properly implemented, this will cause screen readers to announce the contents of the tooltip after the next pause in speech.',
      stepsToReproduce:
        '1. Locate the control that opens the toggletip.\n2. Inspect it with Chrome DevTools.\n3. In the Accessibility tab, expand the Computed Properties section.\n4. Review the values for "Name" and "Role".\n5. Inspect the toggletip container with DevTools.\n6. In the Accessibility tab, review the values for "Name" and "Live region".',
      jawsFunctionalSteps:
        '1. Enable JAWS.\n2. Press Tab key to move focus to the toggletip.\nExpected result: JAWS announces, "@TODO".\nActual result: JAWS announces, "[Actual Output]".',
      successCriteria: ["1.1.1", "4.1.2"],
      title: "Custom controls - Toggletips",
      type: "web",
    },
    {
      bp: 602,
      id: "response-custom-controls-tooltips",
      impact:
        "Screen reader users will be unable to determine that these tooltips are present.",
      issue:
        "There are tooltips without corresponding name and/or role information. Examples include:\n- ",
      recommendation:
        'Ensure custom controls provide proper textual name, role, and state information.\n\nFor tooltips, the following information is expected:\n- The control that opens the tooltip must have aria-describedby set to the ID of the tooltip element.\n- The tooltip element must have role="tooltip".',
      stepsToReproduce:
        '1. Locate the control that opens the tooltip.\n2. Inspect it with Chrome DevTools.\n3. In the Accessibility tab, expand the Computed Properties section.\n4. Review the values for "Name", "Role", and "Description".',
      jawsFunctionalSteps:
        '1. Enable JAWS.\n2. Press Tab key to move focus to the tooltip.\nExpected result: JAWS announces, "[Expected Output]".\nActual result: JAWS announces, "[Actual Output]".',
      successCriteria: ["1.1.1", "4.1.2"],
      title: "Custom controls - Tooltips",
      type: "web",
    },
    {
      bp: 602,
      id: "response-button-no-name",
      impact:
        "Screen reader users will be unable to determine the purpose of these buttons. Speech input users will have difficulty activating them.",
      issue:
        "There are buttons without accessible names. Examples include:\n- ",
      recommendation:
        "Ensure custom controls provide proper textual name, role, and state information. The accessible name of a button can be set with internal text, an aria-label attribute, or an aria-labelledby attribute. Good accessible names are both concise and descriptive.",
      stepsToReproduce:
        '1. Locate the button.\n2. Inspect it with Chrome DevTools.\n3. In the Accessibility tab, expand the Computed Properties section.\n4. Review the value for "Name".',
      jawsFunctionalSteps:
        '1. Enable JAWS.\n2. Press Tab key to move focus to the button.\nExpected result: JAWS announces, "[Name], button".\nActual result: JAWS announces an empty button, or tries to guess the button name using nearby text.',
      successCriteria: ["1.1.1", "4.1.2"],
      title: "Buttons - No accessible names",
      type: "web",
    },
    {
      bp: 605,
      id: "response-focus-not-moved-to-dialog",
      impact:
        "Screen reader users and screen magnification users will be unable to determine that these dialogs have appeared unless they review the entire page. Keyboard users will have difficulty navigating into the dialog.",
      issue:
        "There are dialogs that do not receive focus when they appear. Examples include:\n- ",
      recommendation:
        "Ensure content updates define focus updates appropriately. When modal dialogs appear, focus must move to the first focusable element in the dialog. Use the JavaScript focus() method to move keyboard focus to this element.",
      stepsToReproduce:
        '1. Open Chrome DevTools.\n2. In the Console tab, activate the "Create live expression" (eye icon) control.\n3. In the Expression field, enter document.activeElement.\n4. On the page, press the Tab key repeatedly until the dialog trigger is focused.\n5. Press Enter on the dialog trigger.\n6. Review the value shown for document.activeElement live expression to determine the currently focused element.\n7. Notice that the focused element is not the first focusable element or the role="dialog" element.',
      jawsFunctionalSteps:
        '1. Enable JAWS.\n2. Press Tab key to move focus to the dialog trigger.\n3. Press the Enter key to activate the dialog.\nExpected result: JAWS announces, "[Dialog Name], dialog".\nActual result: JAWS announces, "[Actual Output]".',
      successCriteria: ["1.3.1", "2.4.3"],
      title: "Focus not moved to dialog",
      type: "web",
    },
    {
      bp: 605,
      id: "response-focus-not-moved-to-top-of-form-error",
      impact:
        "Screen reader users and screen magnification users will be unable to determine that these errors have appeared unless they review the entire page.",
      issue:
        "There are top-of-form errors that do not receive focus when they appear. Examples include:\n- ",
      recommendation:
        'Ensure content updates define focus updates appropriately. When top-of-form errors appear, focus must move to the container of the error. Set tabindex="-1" on the element, then use the JavaScript focus() method to move keyboard focus to this element.\n\nAlternatively, a properly structured ARIA live region may be used to announce the error when it appears.',
      stepsToReproduce:
        '1. Open Chrome DevTools.\n2. In the Console tab, activate the "Create live expression" (eye icon) control.\n3. In the Expression field, enter document.activeElement.\n4. On the page, press the Tab key repeatedly until the form submission control is focused.\n5. Press Enter on the submission control.\n6. Review the value shown for document.activeElement live expression to determine the currently focused element.\n7. Notice that the focused element is not the top-of-form error container.',
      jawsFunctionalSteps:
        "1. Enable JAWS.\n2. Partially complete the form, leaving one or more fields with invalid entries.\n3. Press Tab key to move focus to the form submission control.\n4. Activate form submit using Enter key.\nExpected result: Focus moves to the top-of-form error. JAWS announces error message.\nActual result: [Actual result].",
      successCriteria: ["1.3.1", "2.4.3"],
      title: "Focus not moved to top-of-form error",
      type: "web",
    },
    {
      bp: 605,
      id: "response-focus-not-moved-to-first-error-field",
      impact:
        "Screen reader users and screen magnification users will be unable to determine that these errors have appeared unless they review the entire page.",
      issue:
        "After submitting a form when inline errors are present, focus does not move to the first field in error.",
      recommendation:
        "Ensure content updates define focus updates appropriately. When inline errors appear, focus must move to the first field in error and the form field must have aria-describedby set to the ID of the error so that the error is announced when the field is focused.",
      stepsToReproduce:
        '1. Open Chrome DevTools.\n2. In the Console tab, activate the "Create live expression" (eye icon) control.\n3. In the Expression field, enter document.activeElement.\n4. On the page, press the Tab key repeatedly until the form submission control is focused.\n5. Press Enter on the submission control.\n6. Review the value shown for document.activeElement live expression to determine the currently focused element.\n7. Notice that the focused element is not the first form field with an error.',
      jawsFunctionalSteps:
        "1. Enable JAWS.\n2. Partially complete the form, leaving one or more fields with invalid entries.\n3. Press Tab key to move focus to the form submission control.\n4. Activate form submit using Enter key.\nExpected result: Focus moves to the first invalid field. JAWS announces the field information, invalid state, and error message.\nActual result: [Actual result].",
      successCriteria: ["1.3.1", "2.4.3"],
      title: "Focus not moved to first field in error",
      type: "web",
    },
    {
      bp: 605,
      id: "response-focus-not-returned-to-trigger",
      impact:
        "Screen reader users and screen magnification users may become disoriented. Keyboard users will have to navigate through the contents of the page in order to return to the opening control.",
      issue:
        "After closing a dialog, focus does not return to the element that opened the dialog.",
      recommendation:
        "Ensure content updates define focus updates appropriately. When a dialog is closed, return focus to the control that opened the dialog. Use the JavaScript focus() method to move keyboard focus to this element.",
      stepsToReproduce:
        '1. Open Chrome DevTools.\n2. In the Console tab, activate the "Create live expression" (eye icon) control.\n3. In the Expression field, enter document.activeElement.\n4. On the page, press the Tab key repeatedly until the dialog close control is focused.\n5. Press Enter on the close control.\n6. Review the value shown for document.activeElement live expression to determine the currently focused element.\n7. Notice that the focused element is not the control that opened the dialog.',
      successCriteria: ["1.3.1", "2.4.3"],
      title: "Focus not returned to triggering element",
      type: "web",
    },
    {
      bp: 605,
      id: "response-focus-load-more",
      impact:
        "Screen reader users and screen magnification users may become disoriented. Keyboard users will have to navigate backwards through the page to locate the newly revealed content.",
      issue:
        "After activating a load more control, focus does not move to the newly revealed content.",
      recommendation:
        "Ensure content updates define focus updates appropriately. When new content appears after activating a load more control, keyboard focus must move to the newly revealed content. Use the JavaScript focus() method to move keyboard focus to the first focusable element in the newly revealed content.",
      stepsToReproduce:
        '1. Open Chrome DevTools.\n2. In the Console tab, activate the "Create live expression" (eye icon) control.\n3. In the Expression field, enter document.activeElement.\n4. On the page, press the Tab key repeatedly until the load more control is focused.\n5. Press Enter on the close control.\n6. Review the value shown for document.activeElement live expression to determine the currently focused element.\n7. Notice that the focused element is not the first focusable element in the newly revealed content.',
      successCriteria: ["1.3.1", "2.4.3"],
      title: "Focus not updated with load more controls",
      type: "web",
    },
    {
      bp: 609,
      id: "response-inline-unassociated-errors",
      impact:
        "Screen reader users will have difficulty determining which fields are in error and which errors correspond with which field.",
      issue:
        "There are inline errors that are not programmatically associated with their corresponding fields. Examples include:\n- ",
      recommendation:
        "Ensure form field constraints and errors are associated with their corresponding field.\n\nFor most form controls, the best way to associate the error is to use an aria-describedby attribute on the field set to the ID of the corresponding error.\n\nFor groups of form controls like radio buttons and checkboxes, it is best to include the error text inside the element that labels the group (such as a <legend>).",
      stepsToReproduce:
        '1. Locate the form field with an inline error.\n2. Inspect its element with Chrome DevTools.\n3. In the Accessibility tab, expand the Computed Properties section.\n4. Review the value for "Description".',
      jawsFunctionalSteps:
        '1. Enable JAWS.\n2. Reproduce the inline form errors.\n3. Press Tab key to move focus to the [Example Name] field.\n4. Repeat for each field with an inline error.\nExpected result: JAWS announces the field information, followed by the error message. For example, "[Name], [Role], [State/Value], [Error Message].".\nActual result: [Actual result].',
      successCriteria: ["1.3.1", "3.3.2", "4.1.2"],
      title: "Unassociated inline errors",
      type: "web",
    },
    {
      bp: 609,
      id: "response-inline-unassociated-constraints",
      impact:
        "Screen reader users will have difficulty determining which constraints correspond with which field.",
      issue:
        "There are constraints that are not programmatically associated with their corresponding fields. Examples include:\n- ",
      recommendation:
        "Ensure form field constraints and errors are associated with their corresponding field.\n\nFor most form controls, the best way to associate the constraint is to add an aria-describedby attribute to the field. Set the value of aria-describedby to the ID of the corresponding constraint.\n\nFor groups of form controls like radio buttons and checkboxes, it is best to include the constraint text inside the element that labels the group (such as a <legend>).",
      stepsToReproduce:
        '1. Locate the form field with inline constraints or instructions.\n2. Inspect its element with Chrome DevTools.\n3. In the Accessibility tab, expand the Computed Properties section.\n4. Review the value for "Description".',
      jawsFunctionalSteps:
        '1. Enable JAWS.\n2. Press the Tab key to move focus to the [Name] field.\n3. Repeat for each field with a constraint or help text.\nExpected result: JAWS announces the field information, followed by the constraint/help text. For example, "[Name], [Role], [State/Value], [Constraint/Help Text].".\nActual result: [Actual result].',
      successCriteria: ["1.3.1", "3.3.2", "4.1.2"],
      title: "Unassociated constraints",
      type: "web",
    },
    {
      bp: 624,
      id: "response-pdf-implicit-table-header",
      impact:
        "Screen reader users will not understand the relationships between cells in these tables.",
      issue:
        "There are table headers that do not use TH tags. Examples include:\n- ",
      recommendation:
        'Ensure table headers are properly tagged. Table headers must use a TH tag with a Scope attribute set to Row or Column as appropriate.\n\nTo set table headers and scope in Acrobat Pro:\n1. Go to the Accessibility tools pane.\n2. Go to Reading Order.\n3. Open the context menu (right-click) on the table with the header and select Table Editor.\n4. Open the context menu on the header and select Table Cell Properties. (You can set this information for multiple cells at once by holding down Shift while selecting a table cell, then selecting Table Cell Properties.)\n5. Check the Header Cell radio button.\n6. Select an appropriate value in the Scope field. Use "Column" if this cell names a column or "Row" if this cell names a row.\n7. Select OK and save the document.',
      successCriteria: ["1.3.1"],
      title: "Implicit table header",
      type: "pdf",
    },
    {
      bp: 626,
      id: "response-pdf-table-span",
      impact:
        "Screen reader users will not be able to determine the relationships between cells in these tables.",
      issue:
        "There are table headers that span multiple rows/columns do not have values set for the Row Span/Column Span attributes",
      recommendation:
        'Ensure merged row and column header cells define ColSpan or RowSpan attributes. These attributes should be set to the number of columns or rows the cell covers, respectively.\n\nTo set row span and column span in Acrobat Pro:\n1. Open the Order panel from the left-hand navigation pane.\n2. Open the Options menu and select "Show reading order panel".\n3. Open the context menu (right-click) on the target table tag and select "Table Editor".\n4. Open the context menu on the target cell and select "Table Cell Properties".\n5. Enter the correct numbers in the Row Span and Column Span fields.\n6. Press OK and save the document.\n7. Repeat for all headers that span multiple rows/columns.\n',
      successCriteria: ["1.3.1"],
      title: "Merged row and column headers",
      type: "pdf",
    },
    {
      bp: 630,
      id: "response-pdf-bad-tags",
      impact:
        "Screen readers users may have difficulty navigating and understanding this content.",
      issue:
        "There are tags structured in an invalid manner. Examples include:\n- ",
      recommendation:
        'Ensure tags are used to structure content in a valid manner.\n\nTo open the Tags panel in Acrobat Pro, activate "Add, delete or edit accessibility tags" (tag icon) in the right toolbar.',
      successCriteria: ["1.3.1", "4.1.2"],
      title: "Invalid tag structure",
      type: "pdf",
    },
    {
      bp: 631,
      id: "response-pdf-document-lang",
      impact:
        "Screen readers will use inappropriate pronunciation when announcing the text of the document.",
      issue: "The language of the document is unspecified or incorrect.",
      recommendation:
        "Ensure the document specifies a language. \nAll documents must have a language set to a valid BCP 47 language subtag: https://r12a.github.io/app-subtags/\n\nTo alter the language of a document in Acrobat Pro:\n1. Navigate to the File menu.\n2. Choose Properties.\n3. Navigate to the Advanced tab.\n4. In the Language field, enter the appropriate code in the Language field. Some languages may be selected from the field without needing to enter a code.",
      successCriteria: ["3.1.1"],
      title: "Missing or incorrect document language",
      type: "pdf",
    },
    {
      bp: 633,
      id: "response-pdf-heading-level",
      impact:
        "Screen reader users will have difficulty efficiently navigating and gaining an accurate overview of the document.",
      issue:
        "There are headings with levels that do not match their visual level on the document. Examples include:\n- ",
      recommendation:
        'Ensure heading elements are properly ordered. The level of heading tag used (H1, H2, etc.) must reflect its visual appearance in the hierarchy of the document.\n\nTo change the level of a heading tag in Acrobat Pro:\n1. Open the Tags panel.\n2. Select the tag of the text.\n3. Open the context menu (right-click) on the tag and choose "Properties…"\n4. In the "Type" field, choose an option from "Heading Level 1" through "Heading Level 6" as appropriate. (Do not choose just "Heading".)',
      successCriteria: ["1.3.1", "2.4.10"],
      title: "Headings with improper levels",
      type: "pdf",
    },
    {
      bp: 634,
      id: "response-pdf-implicit-headings",
      impact:
        "Screen reader users will have difficulty efficiently navigating and gaining an accurate overview of the document.",
      issue:
        "There is content that functions as a heading but does not use heading tags. Examples include:\n- ",
      recommendation:
        'Ensure headings are denoted through structure and not implicitly. Text that visually appears as a heading for a section of content must use H1, H2, etc. tags. Additionally, ensure the level of the heading accurately reflects the tag\'s position in the visual hierarchy.\n\nTo change a tag to a heading tag in Acrobat Pro:\n1. Open the Tags panel.\n2. Select the tag of the text.\n3. Open the context menu (right-click) on the tag and choose "Properties…"\n4. In the "Type" field, choose an option from "Heading Level 1" through "Heading Level 6" as appropriate. (Do not choose just "Heading".)',
      successCriteria: ["1.3.1"],
      title: "Implicit headings",
      type: "pdf",
    },
    {
      bp: 635,
      id: "response-pdf-formulas",
      impact:
        "Screen reader users will have difficulty understanding these formulas.",
      issue:
        "There are mathematical formulas with no textual equivalents. Examples include:\n- ",
      recommendation:
        'Provide mathematical formulas through appropriate markup or as text. The best way to do so is to wrap the formula in a <Formula> tag. Then, set a descriptive value for the alternate text attribute of the formula.\n\nTo provide a textual equivalent for a formula in Acrobat Pro:\n1. Activate "Add, delete or edit accessibility tags" (tag icon) in the right toolbar.\n2. Locate the tag for the formula.\n3. Open the context menu (right-click) for the tag, then select "Properties..."\n4. In "Type", select "Formula".\n5. In "Alternate Text for Images", enter the desired description.',
      successCriteria: ["1.1.1", "1.3.1", "1.4.5"],
      title: "Math formulas",
      type: "pdf",
    },
    {
      bp: 638,
      id: "response-pdf-decorative-with-alt",
      impact:
        "Screen reader users will receive unnecessary and potentially confusing information.",
      issue:
        "There are decorative images with textual equivalents. Examples include:\n- ",
      recommendation:
        'Ensure alternative text for images is meaningful. Non-meaningful images must be marked as decorative, which causes screen readers to ignore them.\n\nTo mark an image as decorative in Acrobat Pro:\n1. Open the Tags panel.\n2. Navigate to the Figure tag that contains the Image container of the image you want to mark as decorative.\n3. Open the context menu on the image container (not the Figure tag) and choose "Change Tag to Artifact...".\n4. In the dialog that appears, press OK.\n5. Delete the now-empty Figure tag with the Delete key or by opening the context menu and choosing Delete Tag.',
      successCriteria: ["1.1.1"],
      title: "Decorative image with text equivalent",
      type: "pdf",
    },
    {
      bp: 638,
      id: "response-pdf-meaningful-with-bad-alt",
      impact:
        "Screen reader users will not receive an accurate impression of the contents of these images.",
      issue:
        "There are images with insufficiently descriptive textual equivalents. Examples include:\n- ",
      recommendation:
        'Ensure alternative text for images is meaningful. Textual equivalents must be both concise and descriptive.\n\nTo alter alternative text in Acrobat Pro:\n1. Open the Tags panel.\n2. Open the context menu (right-click) on the tag containing the image and select Properties.\n3. If the tag is not already a Figure tag, choose "Figure" from the Type field.\n4. Enter a value in the Alternate Text field.\n5. Activate Close and save the document.',
      successCriteria: ["1.1.1"],
      title: "Meaningful image with non-descriptive text equivalent",
      type: "pdf",
    },
    {
      bp: 640,
      id: "response-pdf-missing-ocr",
      impact:
        "Screen reader users will be prevented from accessing the text content within the scan.",
      issue:
        "There is scanned text content that has not been processed with optical character recognition (OCR). Examples include:\n- ",
      recommendation:
        'Provide text equivalents for scanned pages. \n\nTo perform optical character recognition in Acrobat Pro:\n1. Select "All tools".\n2. Activate "Scan & OCR".\n3. In the RECOGNIZE TEXT section, activate "In this file".\n4. In "Language", ensure the language of the document is selected, then activate "Recognize text".\n5. Save the document.',
      successCriteria: ["1.1.1", "1.4.8"],
      title: "Missing OCR",
      type: "pdf",
    },
    {
      bp: 649,
      id: "response-pdf-list-structure",
      impact:
        "Screen reader users will have difficulty understanding that this content is a list.",
      issue:
        "There is content that appears as a list but does not use list tags. Examples include:\n- ",
      recommendation:
        "Ensure list items are structured properly. Lists must use L, LI, Lbl, and LBody tags as appropriate. The L tag must enclose all elements in the visual list, even if they are on different pages. Each separate list item should be an LI child of this L tag. All text of the list item must be included in an LBody child of the LI tag. Optionally, bullets and numbers can be separated into an Lbl tag as a sibling of the LBody. Nested child lists should be a child of the parent LI tag.",
      successCriteria: ["1.3.1"],
      title: "List structure",
      type: "pdf",
    },
    {
      bp: 651,
      id: "response-pdf-missing-bookmarks",
      impact:
        "Keyboard users will have difficulty efficiently navigating the document.",
      issue:
        "The document is 20 pages or longer but does not provide bookmarks.",
      recommendation:
        'Ensure that lengthy documents provide bookmarks. A document is considered lengthy if it is greater than 20 pages. Each bookmark should be named after a heading and should closely mirror the structure of the table of contents.\n\nTo add bookmarks automatically based on heading structure in Acrobat Pro:\n1. Open the Bookmarks panel.\n2. From the Options menu, select "New Bookmarks from Structure."\n3. Select the tags you would like to create bookmarks from. In most cases, H1-H3 tags are appropriate.\n4. In the Bookmarks panel, edit the bookmarks as desired.',
      successCriteria: ["2.4.5", "2.4.8"],
      title: "Missing bookmarks",
      type: "pdf",
    },
    {
      bp: 652,
      id: "response-pdf-reading-order",
      impact: "Screen reader users will be unable to understand this content.",
      issue: "The following reading order is illogical:\n1.",
      recommendation:
        "Ensure that document content is rendered in the proper order. Rearrange the tags of the document to reflect the visual reading order.",
      successCriteria: ["1.3.2"],
      title: "Reading order",
      type: "pdf",
    },
    {
      bp: 653,
      id: "response-pdf-text-contrast-insufficient",
      impact:
        "Users with low vision will have difficulty reading this content.",
      issue:
        "There is text that does not meet the required minimum color contrast ratio with its background.\n\nForeground color: \nBackground color: \nContrast ratio: \nRequired contrast ratio for this content: \n\nExamples of text with this contrast ratio include:\n- ",
      recommendation:
        "Ensure text and images of text provide sufficient contrast. The following contrast ratios are required:\n\n- Text smaller than 18 pt (24 px), or smaller than 14 pt (19 px) if bold, must have a color contrast ratio of 4.50:1 or more with adjacent colors.\n\n- Text 18 pt (24 px) or larger, or 14 pt (19 px) or larger if bold, must have a color contrast ratio of 3.00:1 or more with adjacent colors.\n\nDisabled controls that do not accept user interaction are exempt from this requirement.\n\nTo calculate color contrast ratios, use a tool such as the Level Access Color Contrast Checker: https://www.levelaccess.com/color-contrast-checker-new/",
      successCriteria: ["1.4.3"],
      title: "Text contrast insufficient",
      type: "pdf",
    },
    {
      bp: 655,
      id: "response-pdf-header-footer",
      impact:
        "Screen readers will read this header/footer text in the middle of a paragraph, causing confusion for users.",
      issue:
        "There is repeated header/footer content that is not marked as an artifact. Examples include:\n- ",
      recommendation:
        "Ensure non-distinct header and footer content are labeled as artifacts. Header content should be marked as an artifact on all but the first page it appears, and footer content should be marked as an artifact on all but the last page it appears.\n\nTo mark content as an artifact in Acrobat Pro:\n1. Open the Order Panel.\n2. Open the Options menu and select Show reading order panel.\n3. Select the tag to be marked as an artifact.\n4. Activate Background/Artifact.\n5. Activate Close and save the document.",
      successCriteria: ["1.3.2"],
      title: "Header/footer content",
      type: "pdf",
    },
    {
      bp: 663,
      id: "response-pdf-unnecessary-headings",
      impact:
        "Screen reader users will have difficulty efficiently navigating and gaining an accurate overview of the document.",
      issue:
        "There is content that uses heading tags but does not function as a heading. Examples include:\n- ",
      recommendation:
        'Avoid unnecessary use of heading elements. Only text that functions as a heading can use heading tags. Convert this content to a Div or Span tag.\n\nTo change the tag in Acrobat Pro:\n1. Open the Tags panel.\n2. Select the tag of the text.\n3. Open the context menu (right-click) on the tag and choose "Properties…"\n4. In the "Type" field, choose "Division" or "Span."\n',
      successCriteria: ["4.1.2"],
      title: "Unnecessary headings",
      type: "pdf",
    },
    {
      bp: 665,
      id: "response-pdf-untagged",
      impact:
        "Screen reader users will not have reliable access to content within the document.",
      issue: "The document has no tags.",
      recommendation:
        'Ensure all content is tagged. The best way to provide tags is to enable settings in the source document that export the PDF with tags. If this is not possible, the document must be autotagged. In both cases, tags must be reviewed and edited to ensure they are in the right order and are semantically accurate.\n\nTo autotag a document in Acrobat Pro:\n1. Go to View > Tools > Accessibility.\n2. Activate "Autotag Document."',
      successCriteria: ["1.1.1", "1.3.2", "4.1.2", "1.4.8"],
      title: "Untagged PDF",
      type: "pdf",
    },
    {
      bp: 665,
      id: "response-pdf-untagged-annotations",
      impact: "Screen reader users will not have access to this content.",
      issue: "There are annotations that are not tagged. Examples include:\n- ",
      recommendation:
        'Ensure all content is tagged, including annotations like forms and links.\n\nTo tag Annotations in Acrobat Pro:\n1. Open the Tags panel and select "Tags".\n2. In the Options menu, select "Find...".\n3. In the dialog that appears, choose "Unmarked Annotations".\n4. Ensure that "Search Document" is checked.\n5. Press "Find".\n6. Press "Tag Element".\n7. In the Type field, choose "Form" if the target item is a form field, "Annotation" if it is a comment, and "Link" if it is a link. Then press OK.\n8. Repeat for all unmarked annotations.',
      successCriteria: ["1.1.1", "1.3.2", "4.1.2", "1.4.8"],
      title: "Untagged PDF annotations",
      type: "pdf",
    },
    {
      bp: 666,
      id: "response-pdf-unicode",
      impact: "Screen reader users may not properly announce this content.",
      issue:
        "There are characters that do not map to Unicode values. Examples include:\n- ",
      recommendation:
        "Ensure characters map to Unicode values. The best way to resolve this issue is to alter the original document to use only Unicode fonts. If this is not possible, consider using a third-party tool such as axesPDF to edit the Unicode mapping.",
      successCriteria: ["1.1.1"],
      title: "Non-Unicode characters",
      type: "pdf",
    },
    {
      bp: 722,
      id: "response-pdf-unassociated-header",
      impact:
        "Screen reader users will not be able to determine the relationships between cells in these tables.",
      issue:
        "There are table headers that are not associated with their corresponding data cells. Examples include:\n- ",
      recommendation:
        'Ensure data table headers are associated with data cells. All TH tags must have a Scope attribute set to Row or Column depending on whether the particular cell is a row header or a column header.\n\nIf a table is sufficiently complex that this method cannot associate a header with its cell, each cell must have a Headers attribute set to a list of the IDs of the headers associated with the cell. This is often time-consuming and prone to error. Splitting complex tables into separate, simpler tables is strongly recommended.\n\nTo set header scope Acrobat Pro:\n1. Go to the Accessibility tools pane.\n2. Go to Reading Order.\n3. Open the context menu (right-click) on the table with the header and select Table Editor.\n4. Open the context menu on the header and select Table Cell Properties. (You can set this information for multiple cells at once by holding down Shift while selecting a table cell, then selecting Table Cell Properties.)\n5. Check the Header Cell radio button.\n6. Select an appropriate value in the Scope field. Use "Column" if this cell names a column or "Row" if this cell names a row.\n7. Select OK and save the document.',
      successCriteria: ["1.3.1"],
      title: "Unassociated table header",
      type: "pdf",
    },
    {
      bp: 733,
      id: "response-visually-hidden-content-exposed-to-at",
      impact:
        "Screen reader and keyboard users will be able to access hidden content, such as form fields, text, or links.",
      issue:
        "There is visually hidden content meant to be hidden from all users, but it can still be accessed by keyboard or screen reader users. Examples include:\n- ",
      recommendation:
        'Ensure content that is intended to be hidden from all users is not rendered by assistive technology. The best way to do this is by setting the display CSS property of the element to "none".',
      stepsToReproduce:
        "1. Open Chrome DevTools.\n2. Locate the cited HTML within the source code.\n3. In the Accessibility tab, expand the Computed Properties section.\n4. Verify that the accessibility node is not exposed.",
      jawsFunctionalSteps:
        '1. Enable JAWS.\n2. Press the Down Arrow key to read content line by line.\nExpected result: JAWS only announces visible content.\nActual result: JAWS cursor moves to visually hidden content. JAWS announces, "[Actual Output]", when it should be hidden.',
      successCriteria: ["1.1.1"],
      title: "Visually hidden content exposed to AT",
      type: "web",
    },
    {
      bp: 733,
      id: "response-dialog-focus-behind",
      impact:
        "Keyboard and/or screen reader users will have difficulty determining their position in the page. They could also have unintended access to controls behind the dialog.",
      issue:
        "There are modal dialogs that allow keyboard and/or screen reader access to elements behind the dialog. Examples include:\n- ",
      recommendation:
        'Ensure content that is intended to be hidden from all users is not rendered by assistive technology. This includes content behind modal dialogs.\n\nThe best way to prevent access to content behind dialogs is with the "inert" attribute and associated polyfill.\n- Move the dialog element to be a sibling of the element containing the rest of the page content. This makes it easier to control keyboard access to underlying content.\n- Add the following polyfill script to the page: https://github.com/WICG/inert\n- When the dialog is present, add the "inert" attribute to the container of the rest of the site content. When the dialog is absent, remove the inert attribute.',
      stepsToReproduce:
        "1. Press Tab repeatedly to focus controls on the page.\n2. Notice that focus can access controls behind the dialog.",
      successCriteria: ["1.1.1"],
      title: "Dialogs that allow focus behind them",
      type: "web",
    },
    {
      bp: 794,
      id: "response-focus-change-on-radio-button-input",
      impact:
        "Screen reader and keyboard users will be unable to select the option they want after focus or context updates occur.",
      issue:
        "There are radio buttons that trigger focus or context changes upon selection. Examples include:\n- ",
      recommendation:
        "Avoid using event handlers that trigger focus or context changes on user input. Instead of moving focus or changing context when a radio button is selected, add a submission button for the change. Other alternatives include applying the change when the entire group of radio buttons loses focus or warning the user of this behavior in visible text before the controls.",
      stepsToReproduce:
        "1. Press Tab repeatedly until the radio button is focused.\n2. Notice that the keyboard focus changes immediately when the radio button is focused.",
      successCriteria: ["3.2.2", "3.2.5"],
      title: "Focus change on radio button input",
      type: "web",
    },
    {
      bp: 794,
      id: "response-focus-change-on-select-input",
      impact:
        "Screen reader and keyboard users will be unable to select the option they want after focus or context updates occur.",
      issue:
        "There are select controls that trigger focus or context changes upon selection. Examples include:\n- ",
      recommendation:
        "Avoid using event handlers that trigger focus or context changes on user input. Instead of moving focus or changing context when a select's option is selected, add a submission button for the change. Other alternatives include applying the change when the select loses focus or warning the user of this behavior in visible text before the control.",
      stepsToReproduce:
        "1. Press Tab repeatedly until the select is focused.\n2. Press the Down Arrow key to change the selected option.\n3. Notice that the keyboard focus changes immediately when a new option is selected.",
      successCriteria: ["3.2.2", "3.2.5"],
      title: "Focus change on select input",
      type: "web",
    },
    {
      bp: 794,
      id: "response-focus-change-on-input",
      impact:
        "Screen reader users and keyboard users will have difficulty reviewing the contents of these fields",
      issue:
        "There are text fields that trigger focus or context changes after text is entered. Examples include:\n- ",
      recommendation:
        "Avoid using event handlers that trigger focus or context changes on user input. Instead of moving focus or changing context when text is entered, add a submission button for the change. Other alternatives include applying the change when the field loses focus or warning the user of this behavior in visible text before the field.",
      stepsToReproduce:
        "1. Press Tab repeatedly until the text field is focused.\n2. Enter text into the field.\n3. Notice that the keyboard focus changes immediately when text is entered.",
      successCriteria: ["3.2.2", "3.2.5"],
      title: "Focus change on text field input",
      type: "web",
    },
    {
      bp: 796,
      id: "response-focus-order-not-meaningful",
      impact:
        "Screen reader users and keyboard users will have difficulty efficiently navigating the site.",
      issue: "The following focus order is illogical:\n1. ",
      recommendation:
        "Ensure the focus order of interactive elements on the page is logical. The best way to set the focus order is to reorder the elements in the DOM.",
      stepsToReproduce:
        "1. Press Tab repeatedly to focus controls on the page.\n2. Notice the controls are focused in an illogical order.",
      successCriteria: ["2.4.3"],
      title: "Focus order not meaningful",
      type: "web",
    },
    {
      bp: 801,
      id: "response-focus-is-shifted-on-focus",
      impact:
        "Screen reader users and keyboard users will lose their spot on the page and may be prevented from accessing the information they intended.",
      issue:
        "There are elements that trigger a focus or context change as soon as they receive focus. Examples include:\n- ",
      recommendation:
        "Avoid forced focus changes that are not user-initiated. Do not shift focus after a control receives focus except when immediate user interaction is needed (such as time-based alerts).",
      stepsToReproduce:
        "1. Press Tab repeatedly until the control is focused.\n2. Notice the keyboard focus is immediately moved elsewhere when the control is focused.",
      successCriteria: ["3.2.1", "3.2.5"],
      title: "Focus is shifted on focus",
      type: "web",
    },
    {
      bp: 802,
      id: "response-radio-buttons-not-grouped",
      impact:
        "Screen reader users will have difficulty understanding the relationship between these form controls.",
      issue:
        "There are grouped radio buttons that do not have their name attributes set to the same value. Examples include:\n- ",
      recommendation:
        "Ensure radio button groups are properly formed. Radio buttons in a logical group must all have their name attribute set to the same value.",
      stepsToReproduce:
        "1. Locate the radio buttons.\n2. Inspect them with Chrome DevTools.\n3. Review the values for their name attributes.\n4. Notice that radio buttons in the same group have different values for their name attribute.",
      successCriteria: ["1.3.1", "4.1.2"],
      title: "Radio buttons with different name attributes",
      type: "web",
    },
    {
      bp: 807,
      id: "response-pdf-link-objr",
      impact:
        "Keyboard users will be prevented from accessing this link. Screen reader users will be unable to determine that it is a link.",
      issue:
        "There are links that are not structured as <Link> tags with a Link - OBJR child. Examples include:\n- ",
      recommendation:
        'Ensure links are tagged structurally as links with a Link OBJR tag. The Link - OBJR tag should open the link URL.\n\nTo add a link in Acrobat Pro:\n1. Open the Order panel and select Show reading order panel from the Options menu. \n2. Draw a rectangle around the text you intend to turn into a link and select Text/Paragraph.\n3. Locate the newly created object with the text of the URL in the Tags panel. \n4. Create a new Link tag as a sibling to this text and relocate the text inside of the Link tag. \n5.  Finally, go to Tools > Edit PDF > Link > Add/Edit Web or Document Link.\n6. Draw a rectangle that encompasses all lines of content that contain the target link, even if those lines contain content unrelated to the link. \n7. Choose "Invisible Rectangle" in the Link Type field, select Open a web page from the Link Action radio button list, then select Next. \n8. In the Enter a URL for this link field, enter the URL of the link as it is written. \n9. Next, open the Tags panel and select Find... from the Options menu. \n10. Choose Unmarked Links from the Find field, and select the Search Document radio button, then press Find until the newly created link is highlighted. \n11. Choose "Tag Element". Open the Tags panel and locate the Link tag that contains the text of the link and ensure that the Link - OBJR tag has been moved there; if not, relocate the newly created Link - OBJR tag into that Link tag.',
      successCriteria: ["2.1.1", "4.1.2"],
      title: "Link structure",
      type: "pdf",
    },
    {
      bp: 808,
      id: "response-css-images-missing-text-equivalent",
      impact:
        "Screen reader users will be unable to determine what these images represent.",
      issue:
        "There are meaningful CSS background images with no textual equivalents. Examples include:\n- ",
      recommendation:
        "Ensure CSS background images that convey meaning have textual and visible equivalents.\n\nThe best way to do this is to use a real <img> or SVG element. To add a textual equivalent to an <img> element, set its alt attribute to a descriptive value.\n\nTo add a textual equivalent to an <svg> element, add a <title> child to the SVG. Place the textual equivalent in the <title>, then add an ID to the <title>. Finally, on the <svg>, add an aria-labelledby attribute and set its value to the ID of the <title>.",
      stepsToReproduce:
        '1. Locate the image.\n2. Inspect it with Chrome DevTools.\n3. Notice that the image is not created with an <img>, <svg>, or role="img" element.',
      successCriteria: ["1.1.1"],
      title: "CSS images missing text equivalent",
      type: "web",
    },
    {
      bp: 809,
      id: "response-reading-order-not-meaningful",
      impact: "Screen reader users will be unable to understand this content.",
      issue: "The following reading order is illogical:\n1. ",
      recommendation:
        "Ensure that the reading order of content is logical. The best way to set the reading order is to reorder the elements in the DOM.",
      stepsToReproduce:
        "1. Enable a screen reader.\n2. Navigate through the content using the Down Arrow key to move element by element.\n3. Review the order in which the screen reader announces content.",
      jawsFunctionalSteps:
        '1. Enable JAWS.\n2. Press the Down Arrow key to read the content line by line.\n3. Compare the order of the JAWS announcement to the visual order of content.\nExpected result: JAWS announces the content in a logical order which follows the visual order.\nActual Result: JAWS announces, "[Text]" first, followed by "[Text]".',
      successCriteria: ["1.3.2"],
      title: "Reading order not meaningful",
      type: "web",
    },
    {
      bp: 886,
      id: "response-dialog-lacks-boundaries",
      impact:
        "Screen reader users will be unable to determine where the dialog ends and begins. They will also have difficulty determining the purpose of the dialog.",
      issue:
        "There are dialogs without appropriate name and/or role information. Examples include:\n- ",
      recommendation:
        'Ensure dialogs use proper structure. Dialog containers must have role="dialog". If the dialog has a visible title, set aria-labelledby on the dialog container to the ID of the visible title. For dialogs without a visible title, set a descriptive aria-label on the dialog element.',
      stepsToReproduce:
        '1. Locate the dialog.\n2. Inspect it with Chrome DevTools.\n3. In the Accessibility tab, expand the Computed Properties section.\n4. Review the values for "Name" and "Role".',
      jawsFunctionalSteps:
        '1. Enable JAWS.\n2. Press Tab key to move focus to the dialog trigger.\n3. Press the Enter key to activate the dialog.\nExpected result: JAWS announces, "[Dialog Name], dialog".\nActual result: JAWS announces, "[Actual Output]".',
      successCriteria: ["1.3.1", "4.1.2"],
      title: "Dialog without proper role and state",
      type: "web",
    },
    {
      bp: 897,
      id: "response-pdf-meaningful-image-without-alt",
      impact:
        "Screen reader users will be unable to determine what these images represent.",
      issue:
        "There are meaningful images without a textual equivalent. Examples include:\n- ",
      recommendation:
        'Provide alternative text for images. Meaningful images must have a concise but descriptive textual equivalent.\n\nTo add alternative text in Acrobat Pro:\n1. Open the Tags panel.\n2. Open the context menu (right-click) on the tag containing the image and select Properties.\n3. If the tag is not already a Figure tag, choose "Figure" from the Type field.\n4. Enter a value in the Alternate Text field.\n5. Activate Close and save the document.',
      successCriteria: ["1.1.1"],
      title: "Meaningful image without textual equivalent",
      type: "pdf",
    },
    {
      bp: 899,
      id: "response-pdf-implicit-data-table",
      impact:
        "Screen reader users will not be able to determine the relationships between cells in these tables.",
      issue:
        "There are data tables that do not use table tags. Examples include:\n- ",
      recommendation:
        "Ensure data tables are formatted using table elements. Table tags include Table, TR, TH, and TD. The tag structure should match the semantic structure that is conveyed visually.\n- The entire table should be wrapped in a Table tag. The only children that a Table tag may have are TR tags and one Caption tag.\n- Each row of the table should be contained in a TR tag. This tag should be a child of the Table tag. The only children that a TR tag can have are TH and/or TD cells.\n- Each header of the table should be contained in a TH tag with a Scope attribute set to Row or Column as appropriate. These tags should be children of the appropriate TR tag.\n- Each data cell of the table should be contained in a TD tag. These tags should be children of the appropriate <TR> Tag.",
      successCriteria: ["1.3.1"],
      title: "Implicit data table",
      type: "pdf",
    },
    {
      bp: 910,
      id: "response-pdf-role-mapping",
      impact:
        "Screen readers users may have difficulty navigating and understanding this content.",
      issue:
        "There are tags with incorrect role mappings. Examples include:\n- ",
      recommendation:
        'Ensure correct role mappings within the tags structure.\n\nTo edit the role map in Acrobat Pro:\n1. Activate "Add, delete or edit accessibility tags" (tag icon) in the right toolbar.\n2. Activate "Options" (three-dot icon).\n3. Select "Edit Role Map..."\n4. Expand "Document Roles".\n5. Locate and select the role with an invalid mapping.\n6. Activate "Change Item".\n7. In "Value", change the value to an appropriate standard PDF tag name.\n8. Activate "OK", then save the document.',
      successCriteria: ["1.3.1"],
      title: "Incorrect role mapping",
      type: "pdf",
    },
    {
      bp: 914,
      id: "response-pdf-inline-lang",
      impact:
        "Screen readers will use inappropriate pronunciation when announcing this text.",
      issue:
        "There is text in a different language from the rest of the document, but the language of this text is unspecified. Examples include:\n- ",
      recommendation:
        "Ensure changes in natural language are identified in-line. Tags containing text in a different language from the overall document must have a Lang attribute set to a valid BCP 47 primary language subtag: https://r12a.github.io/app-subtags/\n\nTo alter a tag's language in Acrobat Pro:\n1. Open the Tags panel.\n2. Open the context menu on the tag that contains the content and select Properties.\n3. In the Language field, enter the appropriate code in the Language field. Some languages may be selected from the field without needing to enter a code.",
      successCriteria: ["3.1.2"],
      title: "Missing or incorrect inline language",
      type: "pdf",
    },
    {
      bp: 918,
      id: "response-pdf-color-only-identification",
      impact:
        "Users with color blindness will have difficulty identifying the colors used to convey this information.",
      issue:
        "There is content that uses color alone to visually indicate information. Examples include:\n- ",
      recommendation:
        "Ensure color is not the sole means of communicating information. Color can be used as long as other visual indicators of the information are also present. Common additional visual indicators include underlining, bolding, additional on-screen text conveying the information, or change in shape or size.",
      successCriteria: ["1.4.1"],
      title: "Color only",
      type: "pdf",
    },
    {
      bp: 921,
      id: "response-pdf-missing-constraint",
      impact:
        "Screen reader users will have difficulty determining which constraints correspond with which field.",
      issue:
        "There are form controls with visible constraints or instructions that are not reflected programmatically. Examples include:\n- ",
      recommendation:
        'Ensure form field constraints are clearly indicated. Add the instructional text to the end of any existing text in the Tooltip property to match the text of the visible instruction.\n\nTo alter the Tooltip property in Acrobat Pro:\n\n1. Select "All tools".\n2. Activate "Prepare a form".\n3. In the "Fields" pane, select a form field and open the context menu (right-click), then select "Properties..."\n4. Select "General".\n5. Add the instructional text after the existing value in the "Tooltip" field, separated by a hyphen, comma, or space.\n6. Activate "Close" and save the document.',
      successCriteria: ["1.3.1", "3.3.2", "4.1.2"],
      title: "Constraint not indicated",
      type: "pdf",
    },
    {
      bp: 922,
      id: "response-pdf-missing-group",
      impact:
        "Screen reader users and users with cognitive disabilities may be unable to determine what these controls are for. Speech input users will have difficulty navigating to them.",
      issue:
        "There are form controls with a visible group label that is not reflected programmatically. Examples include:\n- ",
      recommendation:
        'Ensure elements identify a group name when a group name is present on-screen. For radio buttons, set the Tooltip property to match the text of the visible group label. For other grouped controls, add the group label to the end of the existing Tooltip property.\n\nTo set form group names in Acrobat Pro:\n\n1. Select "All tools".\n2. Activate "Prepare a form".\n3. In the "Fields" pane, select a form field and open the context menu (right-click), then select "Properties..."\n4. Select "General".\n5. For radio buttons, enter the group name into the "Tooltip" field.\n6. For other form fields, add the form group name after the existing value in the "Tooltip" field, separated by a hyphen, comma, or space.\n7. Activate "Close" and save the document.',
      successCriteria: ["1.3.1"],
      title: "Missing group",
      type: "pdf",
    },
    {
      bp: 923,
      id: "response-pdf-focus-order-not-meaningful",
      impact:
        "Screen reader users and keyboard users will have difficulty efficiently navigating the form.",
      issue: "The following focus order is illogical:\n1. ",
      recommendation:
        'Ensure the focus order of form fields is logical. In the Fields pane, ensure the order of fields reflects the logical navigation order of the fields.\n\nTo access the Fields pane in Acrobat Pro:\n1. Select "All tools".\n2. Activate "Prepare a form".\n3. In the Fields pane, activate the order control (AZ icon).\n4. Select "Tab order".\n5. In the Fields pane, rearrange the form fields so that the top to bottom order reflects the logical tabbing order of the form.',
      successCriteria: ["2.4.3"],
      title: "Focus order not meaningful",
      type: "pdf",
    },
    {
      bp: 924,
      id: "response-pdf-radio-group",
      impact:
        "Screen reader users will have difficulty understanding the relationship between these form controls.",
      issue:
        "There are radio buttons that are not programmatically grouped. Examples include:\n- ",
      recommendation:
        'Ensure radio button groups are properly formed. Radio buttons in the same group must have the same value for their Name properties.\n\nTo group radio buttons in Acrobat Pro:\n\n1. Select "All tools".\n2. Activate "Prepare a form".\n3. In the "Fields" pane, select a form field and open the context menu (right-click), then select "Properties..."\n4. Select "General" and enter a value in the "Name" field.\n5. Activate "Close".\n6. Repeat for all radio buttons in the same group, making sure to set the same value in the "Name" field for each.\n7. Save the document.',
      successCriteria: ["1.3.1", "4.1.2"],
      title: "Ungrouped radio buttons",
      type: "pdf",
    },
    {
      bp: 926,
      id: "response-pdf-missing-label",
      impact:
        "Screen reader users and users with cognitive disabilities may be unable to determine what these controls are for. Speech input users will have difficulty navigating to them.",
      issue:
        "There are form controls without an accessible name. Examples include:\n- ",
      recommendation:
        'Provide explicit labels for form fields. For text fields, checkboxes, drop-down lists, and list boxes, set the Tooltip property to the desired accessible name. For radio buttons, set the Radio Button Choice property to the desired accessible name.\n\nTo set form field accessible names in Acrobat Pro:\n\n1. Select "All tools".\n2. Activate "Prepare a form".\n3. In the "Fields" pane, select a form field and open the context menu (right-click), then select "Properties..."\n4. For text fields, checkboxes, drop-down lists, and list boxes, select "General" and enter the accessible name into the "Tooltip" field.\n5. For radio buttons, select "Options" and enter the accessible name into the "Radio Button Choice" field.\n6. Activate "Close" and save the document.',
      successCriteria: ["1.3.1", "4.1.2"],
      title: "Missing label",
      type: "pdf",
    },
    {
      bp: 930,
      id: "response-pdf-toc-structure",
      impact:
        "Screen reader users will have difficulty efficiently navigating the document.",
      issue: "The table of contents is not appropriately tagged.",
      recommendation:
        "Ensure table of contents lists are structured properly. Tables of contents must be enclosed in one <TOC> tag. Each line of the TOC is must enclosed in a <TOCI> tag within the parent <TOC> tag.",
      successCriteria: ["1.3.1"],
      title: "Improper TOC structure",
      type: "pdf",
    },
    {
      bp: 931,
      id: "response-pdf-font-attributes",
      impact:
        "Screen reader users will be unaware of the presence of this styling.",
      issue:
        "There is underlined, overlined, or stricken text content that does not have an appropriate value for the TextDecorationType attribute. Examples include:\n- ",
      recommendation:
        'Ensure font attributes are properly indicated through attributes objects. When text decoration lines are used to convey meaning, ensure that the tag enclosing the content has a TextDecorationType attribute set to "Underline," "Overline," or "LineThrough" as appropriate.\n\nTo add a font attribute in Acrobat Pro:\n1. Open the Tags panel.\n2. Open the context menu on tag containing the target text and select "Properties."\n3. Activate "Edit Attribute Objects…"\n4. Activate "New Item."\n5. Focus the /Attribute Object that was created and activate "New Item" again.\n6. In the Key field, enter "TextDecorationType."\n7. In the Value field, enter the appropriate value mentioned above.\n8. Select "String" from the "Value Type" field.\n9. Activate "OK," close all dialogs, and save the document.',
      successCriteria: ["1.1.1"],
      title: "Font attributes",
      type: "pdf",
    },
    {
      bp: 941,
      id: "response-table-headers-empty",
      impact:
        "Screen reader users will be unable to understand the purpose of their associated columns or rows.",
      issue: "There are empty table headers. Examples include:\n- ",
      recommendation:
        "Ensure data table headers cells are not blank. The best way to resolve this issue is to add visual text to the table header. Alternatively, this text can be hidden with a .visually-hidden or .sr-only CSS class.",
      stepsToReproduce:
        "1. Locate the table.\n2. Inspect it with Chrome DevTools.\n3. Notice that a <th> element does not contain content.",
      successCriteria: ["1.3.1"],
      title: "Table headers empty",
      type: "web",
    },
    {
      bp: 954,
      id: "response-controls-screen-reader-keyboard",
      impact:
        "Screen reader users will be prevented from accessing the functionality provided by these controls.",
      issue:
        "There are interactive controls that cannot be navigated to and/or operated with the keyboard alone while a screen reader is running. Examples include:\n- ",
      recommendation:
        "Ensure custom controls are keyboard accessible. Users must be able to navigate to and operate controls while a screen reader is running.",
      stepsToReproduce:
        "1. Enable a screen reader.\n2. Navigate to the control using the Down Arrow key or the Tab key\n3. Attempt to interact with Enter, Space, and arrow keys.\n4. Notice that the control cannot be interacted with using the keyboard while the screen reader is running.",
      successCriteria: ["2.1.1", "2.1.3"],
      title:
        "Controls cannot be used with keyboard while screen reader running",
      type: "web",
    },
    {
      bp: 963,
      id: "response-captcha-no-visual-challenge",
      impact:
        "Deaf and hard of hearing users will be prevented from completing the CAPTCHA.",
      issue: "The CAPTCHA only provides an audio challenge.",
      recommendation:
        "Ensure CAPTCHAs are accessible both visually and audibly. Add an alternative visual challenge to the CAPTCHA.",
      stepsToReproduce:
        "1. Locate the CAPTCHA.\n2. Notice that there is no way to complete the CAPTCHA that does not require hearing.",
      successCriteria: ["1.1.1"],
      title: "CAPTCHA with no visual challenge",
      type: "web",
    },
    {
      bp: 963,
      id: "response-captcha-no-audio-challenge",
      impact:
        "Users who are blind or have low vision will be prevented from completing the CAPTCHA.",
      issue: "The CAPTCHA only provides a visual challenge.",
      recommendation:
        "Ensure CAPTCHAs are accessible both visually and audibly. Add an alternative audio challenge to the CAPTCHA.",
      stepsToReproduce:
        "1. Locate the CAPTCHA.\n2. Notice that there is no way to complete the CAPTCHA that does not require vision.",
      successCriteria: ["1.1.1"],
      title: "CAPTCHA with no audio challenge",
      type: "web",
    },
    {
      bp: 967,
      id: "response-form-and-link-improperly-nested",
      impact: "Assistive technologies may be unable to parse this content.",
      issue:
        "There are link and form elements that are improperly nested within one another. Examples include:\n- ",
      recommendation:
        "Avoid improper nesting of form elements and links. For example, <button> elements must not be nested in <a> elements. To detect many of these errors automatically, use the Nu Html Checker: https://validator.w3.org/nu/",
      stepsToReproduce:
        "1. Locate the controls.\n2. Open Chrome DevTools.\n3. Review the nesting structure of the controls.",
      successCriteria: ["4.1.2"],
      title: "Form and link improperly nested",
      type: "web",
    },
    {
      bp: 971,
      id: "response-live-region-needed",
      impact:
        "Screen reader users will be unaware of important updates to this content when they occur.",
      issue:
        "There are dynamically changing content areas that do not indicate live regions. Examples include:\n- ",
      recommendation:
        'Indicate live regions for dynamically changing content. Live regions can be created by adding a role attribute set to "log", "status", "alert", "progressbar", "marquee", or "timer" as appropriate. Alternatively, custom behavior can be created by using the aria-live, aria-atomic, and aria-relevant attributes. Text injected into this live region element will be announced by screen readers.\n\nImportantly, the element with the ARIA live attributes must be available when the page loads. Otherwise, many screen readers will not detect updates to the element. Additionally, the element must be empty on page load unless an immediate screen reader announcement is desired.',
      stepsToReproduce:
        "1. Enable a screen reader.\n2. Using the Down Arrow key or Tab key, navigate to the dynamically updating content. Trigger it with the Enter key if necessary.\n3. Review any announcements given by the screen reader in response to the dynamic content update.",
      jawsFunctionalSteps:
        '1. Enable JAWS.\n2. Using the Down Arrow key or Tab key, navigate to the dynamically updating content. Trigger it with the Enter key if necessary.\nExpected result: JAWS announces, "" (or equivalent) when the [Dynamic Content] appears.\nActual result: JAWS does not indicate any changes to content.',
      successCriteria: ["1.3.1"],
      title: "Live region needed",
      type: "web",
    },
    {
      bp: 1031,
      id: "response-pdf-reflow",
      impact:
        "Users with low vision who need to resize text will be prevented from accessing this content.",
      issue:
        "There is content that disappears, overlaps, is cut off, or requires horizontal scrolling to view when the page is zoomed to 400%. Examples include:\n- ",
      recommendation: "Ensure documents reflow properly.",
      successCriteria: ["1.4.8"],
      title: "Reflow",
      type: "pdf",
    },
    {
      bp: 1143,
      id: "response-transcript-missing-for-audio",
      impact:
        "Users who are deaf or hard of hearing will not have access to this content.",
      issue:
        "There is audio-only content without a transcript. Examples include:\n- ",
      recommendation:
        'Provide a text transcript for audio only presentations. This transcript should be present on the same page as the audio. It should be in the same language as the spoken language. If the audio is provided by a <video> element, developers may provide a caption track instead using <track kind="captions">.',
      stepsToReproduce:
        "1. Locate the audio.\n2. Notice that there is no transcript available for the content.",
      successCriteria: ["1.2.1"],
      title: "Transcript missing for audio",
      type: "web",
    },
    {
      bp: 1144,
      id: "response-alternative-missing-for-video-only",
      impact:
        "Users who are blind or have low vision will not have access to this content.",
      issue:
        "There is video-only content without a transcript, audio file, or non-animated textual representation. Examples include:\n- ",
      recommendation:
        "Provide text transcript or audio track of video only presentations.",
      stepsToReproduce:
        "1. Locate the video.\n2. Notice that there is no transcript or audio equivalent available for the content.",
      successCriteria: ["1.2.1"],
      title: "Alternative missing for video only",
      type: "web",
    },
    {
      bp: 1233,
      id: "response-images-of-text",
      impact:
        "Users with low vision and users with cognitive disabilities will be prevented from modifying or enlarging this text.",
      issue:
        "There is text created with images of text rather than actual text elements styled with CSS. Examples include:\n- ",
      recommendation:
        "Ensure text is used instead of images of text when technology allows unless it is essential. Common exceptions include logotypes or images of single letters.",
      stepsToReproduce:
        "1. Locate the text.\n2. Inspect it with Chrome DevTools.\n3. Notice that the text is created without text nodes.",
      successCriteria: ["1.4.5"],
      title: "Images of text",
      type: "web",
    },
    {
      bp: 1237,
      id: "response-sensory-dependent-instructions",
      impact:
        "Users who are blind, have low vision, are deaf, or are hard of hearing may have difficulty following these instructions.",
      issue:
        "There are instructions that rely solely on sensory characteristics. Examples include:\n- ",
      recommendation:
        "Ensure instructions do not rely solely on sensory characteristics. Examples include instructions that refer solely to shape, location, size, orientation, or sound, like 'Click the red button'. Rewrite the instructions to avoid using sensory descriptions.",
      stepsToReproduce:
        "1. Locate the instructions.\n2. Notice that the instructions rely on sensory language to convey their meaning.",
      successCriteria: ["1.3.3"],
      title: "Sensory dependent instructions",
      type: "web",
    },
    {
      bp: 1238,
      id: "response-web-text-level-semantics",
      impact:
        "Screen reader users will not be aware of the presence of this formatting.",
      issue:
        "There is strikethrough text without proper markup. Examples include:\n-",
      recommendation:
        'Ensure proper markup is used to mark emphasized or special text formatting. For strikethrough text, such as old prices replaced with a sale price, use the <s> element to wrap the strikethrough text. Additionally, add visually hidden text before and after the strikethrough text that describes the meaning of the strikethrough, such as "Old price" and "New price."',
      stepsToReproduce:
        "1. Locate the stricken text.\n2. Inspect it with Chrome DevTools.\n3. Notice that the text does not use the <s> element and visually hidden text describing the meaning of the stricken text.",
      successCriteria: ["1.3.1"],
      title: "Strikethrough text",
      type: "web",
    },
    {
      bp: 1243,
      id: "response-keyboard-trap",
      impact:
        "Keyboard users will have difficulty accessing controls of the page beyond this point.",
      issue:
        "There are controls that trap keyboard focus. Examples include:\n- ",
      recommendation:
        "Ensure keyboard focus is not trapped. Users must be able to use the keyboard alone to move away from controls. When moving away from the component requires more than arrow keys, Tab, Shift+Tab, or Esc, the user must be advised of the method for moving focus away.",
      stepsToReproduce:
        "1. Press Tab repeatedly until the control is focused.\n2. Notice that there is no way to pass the control by pressing the Tab key or move before the control using Shift+Tab.",
      successCriteria: ["2.1.2"],
      title: "Keyboard trap",
      type: "web",
    },
    {
      bp: 1244,
      id: "response-dynamic-auto-updating-without-pause-stop-hide",
      impact:
        "Users with cognitive disabilities may be prevented from reading important content before it appears, or it may be too distracting for them to remain on the page. Users with vestibular disorders or migraine may experience symptoms caused by this movement.",
      issue:
        "There is content that plays or moves automatically without a clear mechanism to pause, stop, or hide it. Examples include:\n- ",
      recommendation:
        "Ensure auto-updating dynamic content can be paused, stopped, or hidden. Common examples include autoplaying videos (with or without audio) and GIFs. The best way to do this is to add an accessible pause <button> element near to the element that allows the movement to be stopped.",
      stepsToReproduce:
        "1. Locate the content.\n2. Notice that there is no way to pause, stop, or hide the content.",
      successCriteria: ["2.2.2", "3.2.5"],
      title: "Auto-updating content that cannot be paused",
      type: "web",
    },
    {
      bp: 1247,
      id: "response-one-way-page-location",
      impact:
        "Users with cognitive disabilities may be prevented from locating these pages.",
      issue:
        "There are pages that can only be located by one method. Examples include:\n- ",
      recommendation:
        "Ensure there is more than one way to locate a web page in a set of pages. Common methods include:\n- A site map\n- Links to other pages on the page, such as a navigation bar or menu\n- Site search\n- Table of contents\n\nPages that represent steps in a process (such as shipping and payment pages in a checkout flow) are exempt from this requirement.",
      stepsToReproduce:
        "1. Review the navigational structures and features of the page.\n2. Notice that there is only one method to locate the page.",
      successCriteria: ["2.4.5"],
      title: "One way page location",
      type: "web",
    },
    {
      bp: 1248,
      id: "response-button-bad-name",
      impact:
        "Screen reader users will be unable to determine the purpose of these buttons.",
      issue:
        "There are buttons with insufficiently descriptive accessible names. Examples include:\n- ",
      recommendation:
        'Ensure headings and labels are descriptive and unique. This includes the accessible names of buttons. The accessible name of a button can be set with internal text, an aria-label attribute, or an aria-labelledby attribute. Good accessible names are both concise and descriptive. Avoid including the word "button" in the accessible name, as this information is already supplied by the button\'s role.',
      stepsToReproduce:
        '1. Locate the button.\n2. Inspect it with Chrome DevTools.\n3. In the Accessibility tab, expand the Computed Properties section.\n4. Review the value for "Name".',
      jawsFunctionalSteps:
        '1. Enable JAWS.\n2. Press the Tab key to move focus to the button.\nExpected result: JAWS announces, "[Name], button".\nActual result: "JAWS announces, "[Name], button" with no indication of [Missing Context].',
      successCriteria: ["2.4.6"],
      title: "Button with non-descriptive name",
      type: "web",
    },
    {
      bp: 1249,
      id: "response-visual-keyboard-focus-missing",
      impact:
        "Keyboard users will have difficulty determining their position on the page.",
      issue:
        "There are interactive controls without a visible keyboard focus indicator. Examples include:\n- ",
      recommendation:
        "Ensure keyboard focus is indicated visually. When interactive controls receive focus, the control must appear on screen and a visible focus indicator must be present.\n\nFocus can be indicated in a variety of ways. Most commonly, the browser default outline is used. To use the browser default, remove any outline: none or outline: 0 CSS declarations. Alternatives to the browser default outline include underlines, a change of background, and borders. A custom focus indicator must have a minimum contrast ratio of 3.00:1 against the background.",
      stepsToReproduce:
        "1. Press Tab repeatedly until the control is focused.\n2. Notice that there is no visual indicator that the control is focused, such as an outline.",
      successCriteria: ["2.4.7"],
      title: "Visual keyboard focus missing",
      type: "web",
    },
    {
      bp: 1253,
      id: "response-inconsistent-identification-for-same-functionality",
      impact:
        "Screen reader users and users with cognitive disabilities will have difficulty locating and identifying controls and content.",
      issue:
        "There are elements with the same functionality that are inconsistently identified across pages. Examples include:\n- ",
      recommendation:
        "Ensure that elements with the same functionality are consistently identified across pages. Use labels, names, and text alternatives to consistently identify elements with the same functionality across multiple pages.",
      stepsToReproduce:
        "1. Locate the element.\n2. Compare its name and appearance to the same element on different pages.\n3. Notice that the element's name or appearance are different on different pages.",
      successCriteria: ["3.2.4"],
      title: "Inconsistent identification for same functionality",
      type: "web",
    },
    {
      bp: 1254,
      id: "response-fields-without-visual-labels-or-instructions",
      impact:
        "Users with cognitive disabilities may be unable to determine the purpose of these fields.",
      issue:
        "There are form fields without persistent visual labels. Examples include:\n- ",
      recommendation:
        "Provide visual labels or instructions for user input. Labels for form controls must remain visible when content is entered or options are selected. Additionally, individual form controls in a group must each have their own labels.",
      stepsToReproduce:
        "1. Locate the field.\n2. Enter text or select a value for the field.\n3. Notice that no visual label is available to indicate the purpose of the field after setting a value.",
      successCriteria: ["3.3.2"],
      title: "Fields without visual labels or instructions",
      type: "web",
    },
    {
      bp: 1254,
      id: "response-unexplained-asterisks",
      impact:
        "Users with cognitive disabilities may be unable to understand what asterisks are meant to represent.",
      issue:
        "There is no text explaining that asterisks indicate required fields.",
      recommendation:
        'Provide visual labels or instructions for user input. When asterisks are used to denote required fields, add text to the top of the form that explains their purpose, such as "Asterisks (*) indicate required fields."',
      stepsToReproduce:
        "1. Locate the asterisk.\n2. Notice that there is no visible text that explains the meaning of the asterisk.",
      successCriteria: ["3.3.2"],
      title: "Asterisks without instructions",
      type: "web",
    },
    {
      bp: 1255,
      id: "response-form-errors-without-suggestions",
      impact:
        "Users with cognitive disabilities and screen reader users will have difficulty determining how to resolve the error.",
      issue:
        "There are error messages that provide no suggestions on how to fix the issue. Examples include:\n- ",
      recommendation:
        "Provide suggestions for error messages when known. This can include specific examples of valid input or format examples.\n\nIf providing a suggestion would jeopardize the security of a page, the error message is exempt from this requirement. For example, a password field error is not required to suggest the correct password to the user.",
      stepsToReproduce:
        "1. Locate the error.\n2. Notice that it does not provide suggestions on how to resolve the issue.",
      successCriteria: ["3.3.3"],
      title: "Form errors without suggestions",
      type: "web",
    },
    {
      bp: 1256,
      id: "response-form-errors-without-prevention-financial",
      impact:
        "Users with disabilities may submit the form with errors by mistake.",
      issue:
        "There are forms that do not provide error prevention for user actions that result in a financial transaction.",
      recommendation:
        "Provide error prevention for legal commitments, financial transactions, test responses, and data changes. Examples of unprevented errors for financial transactions include credit card fields with no validation. Provide one or more of the following methods to prevent errors:\n\n- If the user has entered data, automatically check the user's data entry for input errors and give the user an opportunity to correct them before committing.\n- Provide a review step and allow the user to make corrections before committing.\n- Allow the user to reverse the commitment.",
      stepsToReproduce:
        "1. Submit a form that results in a financial transaction.\n2. Notice that there is no error checking for the transaction.",
      successCriteria: ["3.3.4"],
      title: "Form errors without prevention (financial)",
      type: "web",
    },
    {
      bp: 1256,
      id: "response-form-errors-without-prevention-legal",
      impact:
        "Users with disabilities may submit the form with errors by mistake.",
      issue:
        "There are forms that do not provide error prevention for user actions that result in a legal commitment.",
      recommendation:
        "Provide error prevention for legal commitments, financial transactions, test responses, and data changes. Provide one or more of the following methods to prevent errors:\n\n- If the user has entered data, automatically check the user's data entry for input errors and give the user an opportunity to correct them before committing.\n- Provide a review step and allow the user to make corrections before committing.\n- Allow the user to reverse the commitment.",
      stepsToReproduce:
        "1. Submit a form resulting in legal commitment.\n2. Notice that there is no error checking for the submission.",
      successCriteria: ["3.3.4"],
      title: "Form errors without prevention (legal)",
      type: "web",
    },
    {
      bp: 1256,
      id: "response-form-errors-without-prevention-user-data",
      impact:
        "Users with disabilities may submit the form with errors by mistake.",
      issue:
        "There are forms that do not provide error prevention for user actions that change or delete any user-controllable data.",
      recommendation:
        "Provide error prevention for legal commitments, financial transactions, test responses, and data changes. Examples of unprevented errors for data changes include editing a personal profile, posting to social media, or deleting an incoming email message. Provide one or more of the following methods to prevent errors:\n\n- If the user has entered data, automatically check the user's data entry for input errors and give the user an opportunity to correct them before committing.\n- Provide a review step and allow the user to make corrections before committing.\n- Allow the user to reverse the commitment.",
      stepsToReproduce:
        "1. Submit a form that results in the change or deletion of user data.\n2. Notice that there is no error checking for the submission.",
      successCriteria: ["3.3.4"],
      title: "Form errors without prevention (user data)",
      type: "web",
    },
    {
      bp: 1256,
      id: "response-form-errors-without-prevention-test-responses",
      impact:
        "Users with disabilities may submit the form with incomplete or empty responses by mistake",
      issue:
        "There are tests that do not prevent a user from submitting an empty or incomplete response.",
      recommendation:
        "Provide error prevention for legal commitments, financial transactions, test responses, and data changes. Provide one or more of the following methods to prevent errors:\n\n- If the user has entered data, automatically check the user's data entry for input errors and give the user an opportunity to correct them before committing.\n- Provide a review step and allow the user to make corrections before committing.\n- Allow the user to reverse the commitment.",
      stepsToReproduce:
        "1. Submit a form with an empty or incomplete response.\n2. Notice that there is no error checking for the submission.",
      successCriteria: ["3.3.4"],
      title: "Form errors without prevention (test responses)",
      type: "web",
    },
    {
      bp: 1261,
      id: "response-pdf-transcript-missing-for-audio",
      impact:
        "Users who are deaf or hard of hearing will not have access to this content.",
      issue:
        "There is audio-only content without a transcript. Examples include:\n- ",
      recommendation:
        "Provide a text transcript for audio only presentations. This transcript should be present on the same page as the audio. It should be in the same language as the spoken language.",
      successCriteria: ["1.2.1"],
      title: "Transcript missing for audio",
      type: "pdf",
    },
    {
      bp: 1262,
      id: "response-pdf-alternative-missing-for-video-only",
      impact:
        "Users who are blind or have low vision will not have access to this content.",
      issue:
        "There is video-only content without a transcript, audio file, or non-animated textual representation. Examples include:\n- ",
      recommendation:
        "Provide a text transcript or audio track of video only presentations.",
      successCriteria: ["1.2.1"],
      title: "Alternative missing for video only",
      type: "pdf",
    },
    {
      bp: 1263,
      id: "response-pdf-sensory-dependent-instructions",
      impact:
        "Users who are blind, have low vision, are deaf, or are hard of hearing may have difficulty following these instructions.",
      issue:
        "There are instructions that rely solely on sensory characteristics. Examples include:\n- ",
      recommendation:
        "Ensure instructions do not rely solely on sensory characteristics. Examples include instructions that refer solely to shape, location, size, orientation, or sound, like 'Click the red button'. Rewrite the instructions to avoid using sensory descriptions.",
      successCriteria: ["1.3.3"],
      title: "Sensory dependent instructions",
      type: "pdf",
    },
    {
      bp: 1264,
      id: "response-pdf-audio-plays-automatically",
      impact:
        "Screen reader users may have difficulty hearing speech output over autoplaying audio. Users with cognitive disabilities may be distracted by the audio.",
      issue:
        "There is audio that is played automatically when the page loads. Examples include:\n- ",
      recommendation:
        "Ensure audio that plays automatically can be controlled within the containing page. If audio content must load automatically, ensure the audio output plays for a maximum of three seconds or that there is a mechanism near the top of the page to stop or pause the audio.",
      successCriteria: ["1.4.2"],
      title: "Audio plays automatically",
      type: "pdf",
    },
    {
      bp: 1265,
      id: "response-pdf-keyboard-trap",
      impact:
        "Keyboard users will have difficulty accessing controls of the page beyond this point.",
      issue:
        "There are controls that trap keyboard focus. Examples include:\n- ",
      recommendation:
        "Ensure keyboard focus can be moved away from keyboard accessible components. Users must be able to use the keyboard alone to move away from controls. When moving away from the component requires more than arrow keys, Tab, Shift+Tab, or Esc, the user must be advised of the method for moving focus away.",
      successCriteria: ["2.1.2"],
      title: "Keyboard trap",
      type: "pdf",
    },
    {
      bp: 1268,
      id: "response-pdf-blinking-or-flashing",
      impact:
        "Users with photosensitive epilepsy may experience a seizure from excessive flashing. Users with cognitive disabilities may be distracted by the movement.",
      issue:
        "There are elements that blink or flash more than three times per second. Examples include:\n- ",
      recommendation:
        "Ensure blinking or flashing elements are avoided. Avoid flashing more than three times per second unless the content falls within the safe threshold for dimness and size.\n\nFor size, the safe threshold can be calculated as 25% of 10 degrees. When calculated at a typical viewing distance of 11 to 26 inches for a 15-17 inch screen at a resolution of 1024x768, the area of flashing must be less than 21,824 pixels.\n\nIf a flashing element is larger than the threshold and flashes more than three times per second and cannot be changed, the flash must then be evaluated by a tool. The Trace Center Photosensitive Epilepsy Analysis Tool (PEAT) can be used for this purpose: http://trace.wisc.edu/peat/",
      successCriteria: ["2.3.2"],
      title: "Blinking or flashing",
      type: "pdf",
    },
    {
      bp: 1270,
      id: "response-pdf-title",
      impact:
        "Screen reader users and some users with cognitive disabilities will have difficulty determining the purpose of the document.",
      issue: "The document has no title.",
      recommendation:
        "Provide a clear identifying title property for the document. This title should be concise, descriptive, and customer-facing.\n\nTo alter the document title in Acrobat Pro:\n1. Navigate to the File > Properties.\n2. Navigate to the Description tab.\n3. Enter a title in the Title field.",
      successCriteria: ["2.4.2"],
      title: "Missing or incorrect title",
      type: "pdf",
    },
    {
      bp: 1270,
      id: "response-pdf-title-not-shown",
      impact:
        "Screen reader users and users with cognitive disabilities will have difficulty determining the purpose of the document.",
      issue:
        "Acrobat does not display the title of the document in its tabs. Instead, it displays the filename.",
      recommendation:
        "Provide a clear identifying title property for the document. This title must be displayed in the window and tab when the file is open in Acrobat.\n\nTo display the title in Acrobat Pro:\n1. Go to File > Properties.\n2. Go to the Initial View tab.\n3. In the Show field under Window Options, ensure that Document Title is selected.",
      successCriteria: ["2.4.2"],
      title: "Title not shown",
      type: "pdf",
    },
    {
      bp: 1272,
      id: "response-pdf-focus-change-on-input",
      impact:
        "Screen reader and keyboard users will be unable to enter or select the option they want after focus or context updates occur.",
      issue:
        "There are controls that trigger focus or context changes upon selection or text entry. Examples include:\n- ",
      recommendation:
        "Ensure event handlers that trigger context changes on input are avoided. Instead of moving focus or changing context when an option is selected or text is entered, add a submission button for the change. Other alternatives include applying the change when the control loses focus or warning the user of this behavior in visible text before the control.",
      successCriteria: ["3.2.2", "3.2.5"],
      title: "Focus change on input",
      type: "pdf",
    },
    {
      bp: 1274,
      id: "response-pdf-labels-instructions",
      impact:
        "Users with cognitive disabilities may be unable to determine the purpose of these fields.",
      issue:
        "There are form fields without visual labels. Examples include:\n- ",
      recommendation:
        "Provide labels or instructions for user input. Each individual form field must have a visible label. Alter the original document to ensure each field has a label.",
      successCriteria: ["3.3.2"],
      title: "Fields without visual labels or instructions",
      type: "pdf",
    },
    {
      bp: 1275,
      id: "response-pdf-images-of-text",
      impact:
        "Users with low vision and users with cognitive disabilities will be prevented from modifying or enlarging this text.",
      issue:
        "There is text created with images of text rather than actual text. Examples include:\n- ",
      recommendation:
        "Ensure text is used instead of images of text when technology allows unless it is essential. Common exceptions include logotypes or images of single letters.",
      successCriteria: ["1.4.5", "1.4.8"],
      title: "Images of text",
      type: "pdf",
    },
    {
      bp: 1277,
      id: "response-pdf-headings-labels",
      impact:
        "Screen reader users and users with cognitive disabilities will have difficulty determining the purpose of these sections.",
      issue:
        "There are headings that do not accurately describe the contents of their sections. Examples include:\n- ",
      recommendation:
        "Ensure headings and labels are descriptive and unique. In the source document, alter the heading text to accurately describe the purpose of the section.",
      successCriteria: ["2.4.6"],
      title: "Insufficiently descriptive heading",
      type: "pdf",
    },
    {
      bp: 1281,
      id: "response-pdf-errors-suggestions",
      impact:
        "Users with cognitive disabilities and screen reader users will have difficulty determining how to resolve the error.",
      issue:
        "There are error messages that provide no suggestions on how to fix the issue. Examples include:\n- ",
      recommendation:
        "Provide suggestions for error messages when known. This can include specific examples of valid input or format examples.\n\nIf providing a suggestion would jeopardize the security of a document, the error message is exempt from this requirement. For example, a password field error is not required to suggest the correct password to the user.",
      successCriteria: ["3.3.3"],
      title: "Form errors without suggestions",
      type: "pdf",
    },
    {
      bp: 1282,
      id: "response-pdf-form-errors-without-prevention-financial",
      impact:
        "Users with disabilities may submit the form with errors by mistake.",
      issue:
        "There are forms that do not provide error prevention for user actions that result in a financial transaction.",
      recommendation:
        "Provide error prevention for legal commitments and financial data. Examples of unprevented errors for financial transactions include credit card fields with no validation. Provide one or more of the following methods to prevent errors:\n\n- If the user has entered data, automatically check the user's data entry for input errors and give the user an opportunity to correct them before committing.\n- Provide a review step and allow the user to make corrections before committing.\n- Allow the user to reverse the commitment.",
      successCriteria: ["3.3.4"],
      title: "Form errors without prevention (financial)",
      type: "pdf",
    },
    {
      bp: 1282,
      id: "response-pdf-form-errors-without-prevention-legal",
      impact:
        "Users with disabilities may submit the form with errors by mistake.",
      issue:
        "There are forms that do not provide error prevention for user actions that result in a legal commitment.",
      recommendation:
        "Provide error prevention for legal commitments and financial data. Provide one or more of the following methods to prevent errors:\n\n- If the user has entered data, automatically check the user's data entry for input errors and give the user an opportunity to correct them before committing.\n- Provide a review step and allow the user to make corrections before committing.\n- Allow the user to reverse the commitment.",
      successCriteria: ["3.3.4"],
      title: "Form errors without prevention (legal)",
      type: "pdf",
    },
    {
      bp: 1288,
      id: "response-pdf-timing",
      impact:
        "Users who require additional time to fill out forms will lose the information they've entered when the timeout occurs.",
      issue:
        "There are timed responses that cannot be turned off, extended, or accessibly adjusted. Examples include:\n- ",
      recommendation:
        "Ensure timed responses are not required. Users must be able to extend, set, or remove any timeout unless the timeout is longer than 20 hours or the timeout is essential to the page's purpose (such as an auction).",
      successCriteria: ["2.2.1", "2.2.3"],
      title: "Timing",
      type: "pdf",
    },
    {
      bp: 1289,
      id: "response-pdf-dynamic-auto-updating-without-pause-stop-hide",
      impact:
        "Users with cognitive disabilities may be prevented from reading important content before it appears, or it may be too distracting for them to remain on the page. Users with vestibular disorders or migraine may experience symptoms caused by this movement.",
      issue:
        "There is content that plays or moves automatically without a clear mechanism to pause, stop, or hide it. Examples include:\n- ",
      recommendation:
        "Ensure auto-updating dynamic content can be paused, stopped, or hidden. Common examples include autoplaying videos (with or without audio) and GIFs. The best way to do this is to add an accessible pause button near to the element that allows the movement to be stopped.",
      successCriteria: ["2.2.2", "3.2.5"],
      title: "Auto-updating content that cannot be paused",
      type: "pdf",
    },
    {
      bp: 1301,
      id: "response-links-without-meaningful-text",
      impact:
        "Screen reader users will be unable to determine the purpose of these links. Speech input users will have difficulty activating them.",
      issue: "There are links without accessible names. Examples include:\n- ",
      recommendation:
        "Ensure link text is meaningful within context. The accessible name of a link can be set with internal text, an aria-label attribute, or an aria-labelledby attribute. Good accessible names are both concise and descriptive.",
      stepsToReproduce:
        '1. Locate the link.\n2. Inspect it with Chrome DevTools.\n3. In the Accessibility tab, expand the Computed Properties section.\n4. Review the value for "Name".',
      jawsFunctionalSteps:
        '1. Enable JAWS.\n2. Press the Tab key to move focus to the link.\nExpected result: JAWS announces, "[Recommended Name], link".\nActual result: JAWS announces, "[Actual Name], link" which is not sufficiently meaningful.',
      successCriteria: ["2.4.4"],
      title: "Links without meaningful text",
      type: "web",
    },
    {
      bp: 1301,
      id: "response-links-with-non-descriptive-names",
      impact:
        "Screen reader users will have difficulty determining where these links go.",
      issue:
        "There are links with insufficiently descriptive accessible names. Examples include:\n- ",
      recommendation:
        "Ensure link text is meaningful within context. A link's purpose must be determinable from the link's accessible name alone or in combination with the immediately surrounding paragraph, table cell, or associated table header. Good accessible names are both concise and descriptive.",
      stepsToReproduce:
        '1. Locate the link.\n2. Inspect it with Chrome DevTools.\n3. In the Accessibility tab, expand the Computed Properties section.\n4. Review the value for "Name".',
      jawsFunctionalSteps:
        '1. Enable JAWS.\n2. Press the Tab key to move focus to the link.\nExpected result: JAWS announces, "[Recommended Name], link". The link name includes [Missing Context].\nActual result: JAWS announces, "[Actual Name], link". There is no indication of [Missing Context].',
      successCriteria: ["2.4.4"],
      title: "Links with non-descriptive accessible names",
      type: "web",
    },
    {
      bp: 1302,
      id: "response-pdf-links-with-non-descriptive-names",
      impact:
        "Screen reader users will have difficulty determining where these links go.",
      issue:
        "There are links with insufficiently descriptive accessible names. Examples include:\n- ",
      recommendation:
        "Ensure link text is meaningful within context. A link's purpose must be determinable from the link's accessible name alone or in combination with the immediately surrounding paragraph, table cell, or associated table header. Good accessible names are both concise and descriptive.",
      successCriteria: ["2.4.4"],
      title: "Links with non-descriptive accessible names",
      type: "pdf",
    },
    {
      bp: 1342,
      id: "response-blinking-or-flashing",
      impact:
        "Users with photosensitive epilepsy may experience a seizure from excessive flashing. Users with cognitive disabilities may be distracted by the movement.",
      issue:
        "There are elements that blink or flash more than three times per second. Examples include:\n- ",
      recommendation:
        "Ensure elements blink or flash in a safe threshold. Avoid flashing more than three times per second unless the content falls within the safe threshold for dimness and size.\n\nFor size, the safe threshold can be calculated as 25% of 10 degrees. When calculated at a typical viewing distance of 11 to 26 inches for a 15-17 inch screen at a resolution of 1024x768, the area of flashing must be less than 21,824 pixels.\n\nIf a flashing element is larger than the threshold and flashes more than three times per second and cannot be changed, the flash must then be evaluated by a tool. The Trace Center Photosensitive Epilepsy Analysis Tool (PEAT) can be used for this purpose: http://trace.wisc.edu/peat/",
      stepsToReproduce:
        "1. Locate the content.\n2. Determine that the content flashes more than three times per second using manual means or by recording a video using the Photosensitive Epilepsy Analysis Tool (PEAT): http://trace.wisc.edu/peat/ to automatically analyze the content.\n3. Notice that the thresholds for flashing content are exceeded.",
      successCriteria: ["2.3.1", "2.3.2"],
      title: "Blinking or flashing",
      type: "web",
    },
    {
      bp: 1352,
      id: "response-duplicated-attribute",
      impact: "Assistive technologies may be unable to parse this content.",
      issue:
        "There are elements with duplicated attributes. Examples include:\n- ",
      recommendation:
        "Ensure markup documents contain well-formed elements. Elements must have only one instance of an attribute assigned to them. This can be tested by running the document through an HTML validator such as W3C's Nu Html Checker: https://validator.w3.org/nu/\n\nNote that, under WCAG 2.1, all HTML documents are considered to meet this requirement. Under WCAG 2.2, the requirement has been removed entirely.",
      stepsToReproduce:
        '1. Use https://validator.w3.org/nu/ to review the source code of the page.\n2. Notice that there are "Duplicate attribute" errors.',
      successCriteria: ["4.1.1"],
      title: "Duplicated attribute",
      type: "web",
    },
    {
      bp: 1352,
      id: "response-duplicated-id",
      impact: "Assistive technologies may be unable to parse this content.",
      issue:
        "There are IDs used on more than one element. Examples include:\n- ",
      recommendation:
        "Ensure markup documents contain well-formed elements. Each ID in the page must be unique. This can be tested by running the document through an HTML validator such as W3C's Nu Html Checker: https://validator.w3.org/nu/\n\nNote that, under WCAG 2.1, all HTML documents are considered to meet this requirement. Under WCAG 2.2, the requirement has been removed entirely.",
      stepsToReproduce:
        '1. Use https://validator.w3.org/nu/ to review the source code of the page.\n2. Notice that there are "Duplicate ID" errors.',
      successCriteria: ["4.1.1"],
      title: "Duplicated ID",
      type: "web",
    },
    {
      bp: 1352,
      id: "response-improper-element-nesting",
      impact: "Assistive technologies may be unable to parse this content.",
      issue:
        "There are elements nested in a way that is not permitted by the HTML specification. Examples include:\n- ",
      recommendation:
        "Ensure markup documents contain well-formed elements. Elements must be nested according to specification. This can be tested by running the document through an HTML validator such as W3C's Nu Html Checker: https://validator.w3.org/nu/\n\nNote that, under WCAG 2.1, all HTML documents are considered to meet this requirement. Under WCAG 2.2, the requirement has been removed entirely.",
      stepsToReproduce:
        '1. Use https://validator.w3.org/nu/ to review the source code of the page.\n2. Notice that there are "Element X not allowed as child of element Y in this context" errors.',
      successCriteria: ["4.1.1"],
      title: "Improper element nesting",
      type: "web",
    },
    {
      bp: 1352,
      id: "response-incomplete-start-end-tag",
      impact: "Assistive technologies may be unable to parse this content.",
      issue:
        "There are elements with incomplete start or end tags. Examples include:\n- ",
      recommendation:
        "Ensure markup documents contain well-formed elements. All elements must have complete start and end tags where required by the HTML specification. This can be tested by running the document through an HTML validator such as W3C's Nu Html Checker: https://validator.w3.org/nu/\n\nNote that, under WCAG 2.1, all HTML documents are considered to meet this requirement. Under WCAG 2.2, the requirement has been removed entirely.",
      stepsToReproduce:
        '1. Use https://validator.w3.org/nu/ to review the source code of the page.\n2. Notice that there are "End tag for X seen, but there were unclosed elements" and/or "Unclosed element X" errors.',
      successCriteria: ["4.1.1"],
      title: "Incomplete starting/ending tags",
      type: "web",
    },
    {
      bp: 1471,
      id: "response-form-errors-without-clear-indication",
      impact:
        "Screen reader users and users with cognitive disabilities will have difficulty determining that these messages are errors instead of general instructions on how to fill the fields. They will also have difficulty determining which error corresponds to which field.",
      issue:
        "There are errors that do not mention the name of the field in error. Examples include:\n- ",
      recommendation:
        "Provide a clear indication of fields in error for information that is submitted. Include the name of the field in the error message.",
      stepsToReproduce:
        "1. Locate the error.\n2. Notice that the error text does not include the name of the field(s) in error.",
      successCriteria: ["3.3.1"],
      title: "Form errors without clear indication",
      type: "web",
    },
    {
      bp: 1564,
      id: "response-ios-dialog-focus",
      impact:
        "Screen reader users will be unable to determine that these dialogs have appeared unless they review the entire screen. Keyboard users will have difficulty navigating into the dialog.",
      issue:
        "There are dialogs that do not receive focus when they appear. Examples include:\n- ",
      recommendation:
        "Ensure focus is logically set when a module opens and when pop-up alerts close. When modal dialogs appear, focus must move to the first focusable element in the dialog. Post a UIAccessibilityScreenChangedNotification to move focus to this element.",
      stepsToReproduce:
        "1. Attach a keyboard to the device.\n2. Go to Settings > Accessibility > Keyboards > Full Keyboard Access and ensure that it is toggled on.\n3. Using the Tab and arrow keys, navigate until the dialog trigger is focused.\n4. Press Space to activate the dialog trigger.\n5. Notice that the focused element is not the first interactive element within the dialog.",
      successCriteria: ["2.4.3"],
      title: "Focus not moving to dialogs",
      type: "ios",
    },
    {
      bp: 1566,
      id: "response-ios-keyboard-focus-missing",
      impact:
        "Keyboard users will have difficulty determining their position on the screen.",
      issue:
        "There are interactive controls without a visible keyboard focus indicator. Examples include:\n- ",
      recommendation:
        "Ensure navigation and input focus is indicated visually and programmatically. When interactive controls receive focus, the control must appear on screen and a visible focus indicator must be present. Focus can be indicated in a variety of ways, but the most reliable method is to use system-provided focus effects.",
      stepsToReproduce:
        "1. Attach a keyboard to the device.\n2. Go to Settings > Accessibility > Keyboards > Full Keyboard Access and ensure that it is toggled on.\n3. Using the Tab and arrow keys, navigate until the control is focused.\n4. Notice that there is no visual indicator that the control is focused, such as an outline.",
      successCriteria: ["2.4.7"],
      title: "Visual keyboard focus missing",
      type: "ios",
    },
    {
      bp: 1577,
      id: "response-ios-color-only-identification",
      impact:
        "Users with color blindness will have difficulty identifying the colors used to convey this information.",
      issue:
        "There is content that uses color alone to visually indicate information. Examples include:\n- ",
      recommendation:
        "Ensure color and text formatting are not the sole means of communicating information. Color can be used as long as other visual indicators of the information are also present. Common additional visual indicators include underlining, bolding, additional on-screen text conveying the information, or change in shape or size.",
      stepsToReproduce:
        "1. Locate the content.\n2. Notice that the content conveys its meaning through color alone.",
      successCriteria: ["1.4.1"],
      title: "Color only - General",
      type: "ios",
    },
    {
      bp: 1577,
      id: "response-ios-color-only-links",
      impact:
        "Users with color blindness will have difficulty distinguishing which text is a link.",
      issue:
        "There are inline links that use color alone to visually indicate that they are links. Examples include:\n- ",
      recommendation:
        "Ensure color and text formatting are not the sole means of communicating information. Color can be used as long as other visual indicators of the information are also present. Common additional visual indicators for links include underlining or bolding.",
      stepsToReproduce:
        "1. Locate the link.\n2. Notice that the link's presence is conveyed through the use of color alone.",
      successCriteria: ["1.4.1"],
      title: "Color only - Links",
      type: "ios",
    },
    {
      bp: 1581,
      id: "response-ios-text-contrast-insufficient",
      impact:
        "Users with low vision will have difficulty reading this content.",
      issue:
        "There is text that does not meet the required minimum color contrast ratio with its background.\n\nForeground color: \nBackground color: \nContrast ratio: \nRequired contrast ratio for this content: \n\nExamples of text with this contrast ratio include:\n- ",
      recommendation:
        "Ensure text and images of text provide sufficient contrast. The following contrast ratios are required:\n\n- Text smaller than 18 pt (24 px), or smaller than 14 pt (19 px) if bold, must have a color contrast ratio of 4.50:1 or more with adjacent colors.\n\n- Text 18 pt (24 px) or larger, or 14 pt (19 px) or larger if bold, must have a color contrast ratio of 3.00:1 or more with adjacent colors.\n\nDisabled controls that do not accept user interaction are exempt from this requirement.\n\nTo calculate color contrast ratios, use a tool such as the Level Access Color Contrast Checker: https://www.levelaccess.com/color-contrast-checker-new/",
      stepsToReproduce:
        "1. Locate the text.\n2. Determine the text color, background color, and font size.\n3. Use a calculator such as https://www.levelaccess.com/color-contrast-checker-new/ to determine the contrast ratio.\n4. Notice that the contrast ratio is below the required value for this size of text.",
      successCriteria: ["1.4.3"],
      title: "Text contrast insufficient",
      type: "ios",
    },
    {
      bp: 1584,
      id: "response-ios-elements-no-name",
      impact:
        "Screen reader users will not be able to determine the purpose of these controls.",
      issue:
        "There are interactive controls with no accessible names. Examples include:\n- ",
      recommendation:
        "Ensure elements are sufficiently described. Add an accessibilityLabel property to the control with an appropriate description.",
      stepsToReproduce:
        "1. Locate the control.\n2. Turn on VoiceOver.\n3. Swipe right until the control is focused.\n4. Notice that VoiceOver does not announce any name for the control.",
      successCriteria: ["1.3.1", "4.1.2"],
      title: "Elements without accessible names",
      type: "ios",
    },
    {
      bp: 1585,
      id: "response-ios-top-of-form-errors",
      impact:
        "Screen reader users will be unable to determine that these errors have appeared unless they review the entire screen.",
      issue:
        "There are top-of-form errors that do not receive focus when they appear. Examples include:\n- ",
      recommendation:
        "Ensure error messages are in a platform specific alert or focus is moved to the error message after submit. When top-of-form errors appear, focus must move to the container of the error by posting a UIAccessibilityScreenChangedNotification.",
      stepsToReproduce:
        "1. Attach a keyboard to the device.\n2. Go to Settings > Accessibility > Keyboards > Full Keyboard Access and ensure that it is toggled on.\n3. Using the Tab and arrow keys, navigate until the error trigger is focused.\n4. Press Space to activate the trigger.\n5. Notice that the top-of-form error does not receive focus.",
      successCriteria: ["3.3.1"],
      title: "Focus not moving to top-of-form errors",
      type: "ios",
    },
    {
      bp: 1585,
      id: "response-ios-inline-errors",
      impact:
        "Screen reader users will be unable to determine that these errors have appeared unless they review the entire screen.",
      issue:
        "After submitting a form when inline errors are present, focus does not move to the first field in error.",
      recommendation:
        "Ensure error messages are in a platform specific alert or focus is moved to the error message after submit. When inline errors appear, move focus to the first field in error by posting a UIAccessibilityScreenChangedNotification. Additionally, the form field's accessibilityLabel property must have the text of the error appended to the end.",
      stepsToReproduce:
        "1. Attach a keyboard to the device.\n2. Go to Settings > Accessibility > Keyboards > Full Keyboard Access and ensure that it is toggled on.\n3. Using the Tab and arrow keys, navigate until the error trigger is focused.\n4. Press Space to activate the trigger.\n5. Notice that keyboard focus does not move to the first field with an inline error.",
      successCriteria: ["3.3.1"],
      title: "Focus not moving to first field in error",
      type: "ios",
    },
    {
      bp: 1598,
      id: "response-ios-unassociated-label",
      impact:
        "Screen reader users will have difficulty determining the purpose of these controls. Speech input users will have difficulty navigating to them.",
      issue:
        "There are form controls with visual labels that are not programmatically associated with the control. Examples include:\n- ",
      recommendation:
        "Provide valid labels for all form elements. Set the accessibilityLabel property of the field to the exact visual text.",
      stepsToReproduce:
        "1. Locate the control.\n2. Turn on VoiceOver.\n3. Swipe right until the form control is focused.\n4. Notice that VoiceOver does not announce the visual label for the control.",
      successCriteria: ["1.3.1", "4.1.2"],
      title: "Unassociated label",
      type: "ios",
    },
    {
      bp: 1626,
      id: "response-aria-invalid",
      impact: "Assistive technologies may be unable to parse this content.",
      issue:
        "There are elements with invalid ARIA attributes or values. Examples include:\n- ",
      recommendation:
        "Ensure ARIA roles, states, and properties are valid. Many ARIA attributes can only be used on certain elements. Some can only be used in combination with other attributes. Additionally, if an attribute references an ID, that ID must be present in the page.\n\nTo detect many of these errors automatically, use the Nu Html Checker: https://validator.w3.org/nu/",
      stepsToReproduce:
        "1. Open Chrome DevTools.\n2. Locate the element identified in the code reference.\n3. Notice that the element's ARIA attributes and/or nesting do not conform to the ARIA specification: https://www.w3.org/TR/wai-aria/ and/or the ARIA in HTML specification: https://www.w3.org/TR/html-aria/",
      successCriteria: ["4.1.2"],
      title: "ARIA invalid",
      type: "web",
    },
    {
      bp: 1646,
      id: "response-ios-sr-focus",
      impact:
        "Screen reader users will be prevented from accessing this content.",
      issue:
        "There is meaningful content that cannot receive VoiceOver focus. Examples include:\n- ",
      recommendation:
        "Ensure all controls and non-decorative content enable accessibility. Set the isAccessibilityElement property of these elements to YES.",
      stepsToReproduce:
        "1. Locate the content.\n2. Turn on VoiceOver.\n3. Swipe right through the contents of the screen.\n4. Notice that VoiceOver never focuses the mentioned content.",
      successCriteria: ["4.1.2"],
      title: "Content that cannot receive VoiceOver focus",
      type: "ios",
    },
    {
      bp: 1775,
      id: "response-layout-table-marked-for-presentation",
      impact:
        "Screen readers will treat this content as a data table, causing confusion about its layout and impeding navigation.",
      issue:
        "There are <table> elements used for layout purposes, but they are not marked as presentational. Examples include:\n- ",
      recommendation:
        'Ensure layout tables indicate their use for presentation purposes. This can be done by adding role="presentation" to <table> elements used for a layout purpose. Additionally, convert any <th> cells to <td> cells. It is strongly recommended to use CSS instead of HTML table elements for layout purposes.',
      stepsToReproduce:
        "1. Locate the layout table.\n2. Inspect it with Chrome DevTools.\n3. Select the <table> element.\n4. In the Accessibility tab, expand the Computed Properties section.\n5. Verify that the accessibility node is not exposed.",
      successCriteria: ["1.3.1"],
      title: "Layout table marked for presentation",
      type: "web",
    },
    {
      bp: 1869,
      id: "response-pdf-document-security",
      impact:
        "Screen reader users will be prevented from accessing this document.",
      issue:
        "The document security settings prevent screen readers from accessing the document.",
      recommendation:
        'Ensure document security is compatible with assistive technologies.\n\nTo ensure screen readers have access to documents in Acrobat Pro:\n1. Activate "Menu".\n2. Select "Document Properties..."\n3. Select "Security".\n4. Activate "Change Settings..."\n5. In "Permissions", uncheck "Enable text access for screen reader devices for the visually impaired".\n6. Activate "OK" and save the document.',
      successCriteria: ["4.1.2"],
      title: "Document security",
      type: "pdf",
    },
    {
      bp: 1871,
      id: "response-aria-properties-focusable-aria-hidden",
      impact:
        "Keyboard users will be able to navigate to this element even if it is off screen. Screen reader users will be able to focus this element if they press Tab, but they will be unable to determine its purpose.",
      issue:
        'There are keyboard-focusable controls with aria-hidden="true". Examples include:\n- ',
      recommendation:
        "Avoid inappropriate use of ARIA roles, states, and properties. If content is meant to be hidden from all users, hide it with display: none or visibility: hidden. If content is meant to be accessed by all users, remove any aria-hidden attributes.",
      stepsToReproduce:
        '1. Locate the control.\n2. Inspect it with Chrome DevTools.\n3. In the Accessibility tab, expand the Computed Properties section.\n4. Notice that both "hidden" and "Focusable" are set to true.',
      successCriteria: ["4.1.2"],
      title: 'Focusable aria-hidden="true" element',
      type: "web",
    },
    {
      bp: 1893,
      id: "response-no-dialog-title",
      impact:
        "Screen reader users will have difficulty determining the purpose of these dialogs.",
      issue:
        "There are dialogs that lack an accessible name. Examples include:\n- ",
      recommendation:
        "Provide a descriptive dialog title. If the dialog has a visible title, set aria-labelledby on the dialog container to the ID of the visible title. For dialogs without a visible title, set a descriptive aria-label on the dialog element.",
      stepsToReproduce:
        '1. Locate the dialog.\n2. Inspect it with Chrome DevTools.\n3. In the Accessibility tab, expand the Computed Properties section.\n4. Review the value for "Name".',
      successCriteria: ["1.3.1", "2.4.2"],
      title: "No dialog title",
      type: "web",
    },
    {
      bp: 1907,
      id: "response-ios-decorative-with-alt",
      impact:
        "Screen reader users will receive unnecessary and potentially confusing information.",
      issue:
        "There are decorative images with textual equivalents. Examples include:\n- ",
      recommendation:
        "Ensure hidden, decorative and duplicate content and artifact elements are not exposed to assistive technologies. Non-meaningful images must be marked as decorative, which causes screen readers to ignore them. To mark an image as decorative, remove any accessibilityLabel property and set its isAccessibilityElement property to YES.",
      stepsToReproduce:
        "1. Locate the image.\n2. Turn on VoiceOver.\n3. Swipe right until the image is focused.\n4. Notice that VoiceOver announces the presence and contents of the image unnecessarily.",
      successCriteria: ["1.1.1", "4.1.2"],
      title: "Decorative images with textual equivalents",
      type: "ios",
    },
    {
      bp: 1907,
      id: "response-ios-hidden-content",
      impact:
        "Screen reader and keyboard users will be able to access hidden content, such as form fields, text, or links.",
      issue:
        "There is visually hidden content meant to be hidden from all users, but it can still be accessed by keyboard or screen reader users. Examples include:\n- ",
      recommendation:
        "Ensure hidden, decorative and duplicate content and artifact elements are not exposed to assistive technologies. Set the isAccessibilityElement properties of these elements to NO.",
      stepsToReproduce:
        "1. Turn on VoiceOver.\n2. Swipe right until the content is focused.\n3. Notice that VoiceOver announces the presence of the content even though it is not present visually on-screen and is not meant to be conveyed to users.",
      successCriteria: ["1.1.1", "4.1.2"],
      title: "Hidden content exposed to ATs",
      type: "ios",
    },
    {
      bp: 1907,
      id: "response-ios-content-focusable-behind-dialog",
      impact:
        "Keyboard and/or screen reader users will have difficulty determining their position in the screen. They could also have unintended access to controls behind the dialog.",
      issue:
        "There are modal dialogs that allow keyboard and/or screen reader access to elements behind the dialog. Examples include:\n- ",
      recommendation:
        "Ensure hidden, decorative and duplicate content and artifact elements are not exposed to assistive technologies. This includes content behind modal dialogs.\n\nThe best way to prevent access to content behind dialogs is to:\n- Ensure that the dialog container is separate from the container that holds the rest of the screen's content.\n- For the container that holds the rest of the screen's content, set the accessibilityElementsHidden property to YES.\n- When the dialog is closed, remove the accessibilityElementsHidden property.",
      stepsToReproduce:
        "1. Turn on VoiceOver.\n2. Swipe right until content is focused.\n3. Notice that VoiceOver announces the content behind the dialog.",
      successCriteria: ["1.1.1", "4.1.2"],
      title: "Content focusable behind dialog",
      type: "ios",
    },
    {
      bp: 1908,
      id: "response-ios-decorative-with-bad-alt",
      impact:
        "Screen reader users will not receive an accurate impression of the contents of these images.",
      issue:
        "There are images with insufficiently descriptive textual equivalents. Examples include:\n- ",
      recommendation:
        "Ensure non-decorative images provide informative alternative text. Textual equivalents must be both concise and descriptive. Alter the accessibilityLabel property of the image.",
      stepsToReproduce:
        "1. Locate the image.\n2. Turn on VoiceOver.\n3. Swipe right until the image is focused.\n4. Notice that VoiceOver announces an improper name for the image.",
      successCriteria: ["1.1.1"],
      title: "Meaningful images with improper equivalents",
      type: "ios",
    },
    {
      bp: 1909,
      id: "response-ios-meaningful-without-alt",
      impact:
        "Screen reader users will be unable to determine what these images represent.",
      issue:
        "There are meaningful images without a textual equivalent. Examples include:\n- ",
      recommendation:
        "Provide textual equivalents for all non-text elements including sounds and images. Meaningful images must have a concise but descriptive textual equivalent. To add a textual equivalent to an image, set its accessibilityLabel property to a meaningful equivalent.",
      stepsToReproduce:
        "1. Locate the image.\n2. Turn on VoiceOver.\n3. Swipe right until the image is focused.\n4. Notice that VoiceOver announces no name for the image.",
      successCriteria: ["1.1.1"],
      title: "Meaningful images without textual equivalents",
      type: "ios",
    },
    {
      bp: 1911,
      id: "response-ios-role-state",
      impact:
        "Screen reader users will have difficulty understanding the purpose and current state of these controls.",
      issue:
        "There are elements with improper role and/or state information. Examples include:\n- ",
      recommendation:
        "Ensure element traits (role and state) are correct. The best way to do this is to use native views and states, which come with this information built in.\n\nIf using native views is not possible, this information must be set manually through the use of UIAccessibilityTraits. A list of these traits can be found on the Apple website: https://developer.apple.com/documentation/uikit/uiaccessibility/uiaccessibilitytraits",
      stepsToReproduce:
        "1. Locate the content.\n2. Turn on VoiceOver.\n3. Swipe right until the content is focused.\n4. Notice that VoiceOver does not announce the appropriate role or state for the content.",
      successCriteria: ["4.1.2"],
      title: "Elements with improper roles and states",
      type: "ios",
    },
    {
      bp: 1916,
      id: "response-ios-no-keyboard-interactivity",
      impact:
        "Keyboard users will be prevented from accessing the functionality provided by these controls.",
      issue:
        "There are interactive controls that cannot be navigated to and/or operated with the keyboard alone. Examples include:\n- ",
      recommendation:
        "Ensure access to alternative input methods. The best way to accomplish this is by using appropriate native controls, which come with keyboard functionality built in.\n\nIf using a native control is not possible, the control must have their canBecomeFocused property set to true. Pressing Enter or Space must perform the same functionality as tapping the element. The up and down arrows must be able to select the value of the control, if applicable.",
      stepsToReproduce:
        "1. Attach a keyboard to the device.\n2. Go to Settings > Accessibility > Keyboards > Full Keyboard Access and ensure that it is toggled on.\n3. Using the Tab and arrow keys, navigate to the control.\n4. Notice that the control cannot be focused with the keyboard, or that Enter, Space, or the arrow keys cannot be used to activate it or change its value.",
      successCriteria: ["2.1.1", "2.1.3"],
      title: "Keyboard interactive functionality",
      type: "ios",
    },
    {
      bp: 1922,
      id: "response-ios-reading-order",
      impact: "Screen reader users will be unable to understand this content.",
      issue: "The following reading order is illogical:\n1.",
      recommendation:
        "Ensure that the reading order of content is logical. Ensure the elements follow the screen layout order. Alternatively, use the accessibilityElementAtIndex, accessibilityElementCount and indexOfAccessibilityElement properties to set the order.",
      stepsToReproduce:
        "1. Turn on VoiceOver.\n2. Swipe right until the content is focused.\n3. Notice that the order in which VoiceOver focuses content does not follow the natural reading order of the screen.",
      successCriteria: ["1.3.2"],
      title: "Reading order",
      type: "ios",
    },
    {
      bp: 1928,
      id: "response-ios-text-resizing",
      impact:
        "Users with low vision who need to resize text will be prevented from accessing this content.",
      issue:
        "There is content that disappears, overlaps, or is cut off when the font size is increased by 200%. Examples include:\n- ",
      recommendation:
        'Provide for user control of font size. Users must be able to resize text up to 200%. \n\nThe best way to do this is to allow the app to respond to changes in the OS font size through the use of Dynamic Type. When using Dynamic Type, apps should allow their text to be resized up to the AX2 font size, which is twice the default. This font size can be activated by going to Accessibility > Display & Text Size > Larger Text and toggling on Larger Accessibility Sizes. Then, select the fourth notch from the right (announced as "73%" by VoiceOver).\n',
      stepsToReproduce:
        "1. Go to Settings > Accessibility > Display & Text Size > Larger Text.\n2. Toggle on Larger Accessibility Sizes.\n3. In the slider, select the fourth notch from the right.\n4. Return to the app.\n5. Notice that content disappears, is cut off, or overlaps.",
      successCriteria: ["1.4.4"],
      title: "Content cut off at 200%",
      type: "ios",
    },
    {
      bp: 1928,
      id: "response-ios-text-resizing-not-responding",
      impact:
        "Users with low vision who need to resize text will be prevented from accessing this content.",
      issue:
        "When users change the OS font size, the text in the app does not increase to reflect this setting.",
      recommendation:
        'Provide for user control of font size. Users must be able to resize text up to 200%. \n\nThe best way to do this is to allow the app to respond to changes in the OS font size through the use of Dynamic Type. When using Dynamic Type, apps should allow their text to be resized up to the AX2 font size, which is twice the default. This font size can be activated by going to Accessibility > Display & Text Size > Larger Text and toggling on Larger Accessibility Sizes. Then, select the fourth notch from the right (announced as "73%" by VoiceOver).\n',
      stepsToReproduce:
        "1. Go to Settings > Accessibility > Display & Text Size > Larger Text.\n2. Toggle on Larger Accessibility Sizes.\n3. In the slider, select the fourth notch from the right.\n4. Return to the app.\n5. Notice that the app text size has not increased.",
      successCriteria: ["1.4.4"],
      title: "App text does not increase when OS font size increases",
      type: "ios",
    },
    {
      bp: 1943,
      id: "response-android-text-contrast-insufficient",
      impact:
        "Users with low vision will have difficulty reading this content.",
      issue:
        "There is text that does not meet the required minimum color contrast ratio with its background.\n\nForeground color: \nBackground color: \nContrast ratio: \nRequired contrast ratio for this content: \n\nExamples of text with this contrast ratio include:\n- ",
      recommendation:
        "Ensure text and images of text provide sufficient contrast. The following contrast ratios are required:\n\n- Text smaller than 18 pt (24 px), or smaller than 14 pt (19 px) if bold, must have a color contrast ratio of 4.50:1 or more with adjacent colors.\n\n- Text 18 pt (24 px) or larger, or 14 pt (19 px) or larger if bold, must have a color contrast ratio of 3.00:1 or more with adjacent colors.\n\nDisabled controls that do not accept user interaction are exempt from this requirement.\n\nTo calculate color contrast ratios, use a tool such as the Level Access Color Contrast Checker: https://www.levelaccess.com/color-contrast-checker-new/",
      stepsToReproduce:
        "1. Locate the text.\n2. Determine the text color, background color, and font size.\n3. Use a calculator such as https://www.levelaccess.com/color-contrast-checker-new/ to determine the contrast ratio.\n4. Notice that the contrast ratio is below the required value for this size of text.",
      successCriteria: ["1.4.3"],
      title: "Text contrast insufficient",
      type: "android",
    },
    {
      bp: 1952,
      id: "response-android-top-of-form-error",
      impact:
        "Screen reader users will be unable to determine that these errors have appeared unless they review the entire screen.",
      issue:
        "There are top-of-form errors that do not receive focus when they appear. Examples include:\n- ",
      recommendation:
        'Ensure error messages are in a platform specific alert or focus is moved to the error message after submit. When top-of-form errors appear, focus must move to the container of the error through the use of sendAccessibilityEvent(AccessibilityEvent.TYPE_VIEW_FOCUSED).\n\nAlternatively, the error may be placed in an element with an accessibilityLiveRegion attribute set to "polite" or moved to an AlertDialog.',
      stepsToReproduce:
        "1. Attach a keyboard to the device.\n2. Using the Tab and arrow keys, navigate until the error trigger is focused.\n3. Press Enter or Space to activate the trigger.\n4. Notice that the top-of-form error does not receive focus.",
      successCriteria: ["3.3.1"],
      title: "Focus not moved to top-of-form error",
      type: "android",
    },
    {
      bp: 1952,
      id: "response-android-inline-error",
      impact:
        "Screen reader users will be unable to determine that these errors have appeared unless they review the entire screen.",
      issue:
        "After submitting a form when inline errors are present, focus does not move to the first field in error.",
      recommendation:
        "Ensure error messages are in a platform specific alert or focus is moved to the error message after submit. When inline errors appear, move focus to the first field in error through the use of sendAccessibilityEvent(AccessibilityEvent.TYPE_VIEW_FOCUSED). Additionally, the form field's contentDescription attribute must have the text of the error appended to the end.",
      stepsToReproduce:
        "1. Attach a keyboard to the device.\n2. Using the Tab and arrow keys, navigate until the error trigger is focused.\n3. Press Enter or Space to activate the trigger.\n4. Notice that the first field in error does not receive focus.",
      successCriteria: ["3.3.1"],
      title: "Focus not moved to first field in error",
      type: "android",
    },
    {
      bp: 1960,
      id: "response-android-dialog-focus",
      impact:
        "Screen reader users will be unable to determine that these dialogs have appeared unless they review the entire screen. Keyboard users will have difficulty navigating into the dialog.",
      issue:
        "There are dialogs that do not receive focus when they appear. Examples include:\n- ",
      recommendation:
        "Ensure focus is logically set when a module opens and when pop-up alerts close. When modal dialogs appear, focus must move to the first focusable element in the dialog. Use the sendAccessibilityEvent(AccessibilityEvent.TYPE_VIEW_FOCUSED) method to move keyboard focus to this element.",
      stepsToReproduce:
        "1. Attach a keyboard to the device.\n2. Using the Tab and arrow keys, navigate until the dialog trigger is focused.\n3. Press Enter or Space to activate the trigger.\n4. Notice that the first focusable element in the dialog does not receive focus.",
      successCriteria: ["2.4.3"],
      title: "Focus not moved to dialog",
      type: "android",
    },
    {
      bp: 1962,
      id: "response-android-not-keyboard-focusable",
      impact: "Keyboard users will be prevented from accessing these controls.",
      issue:
        "There are controls that cannot be navigated to with the keyboard. Examples include:\n- ",
      recommendation:
        'Ensure all elements and controls can receive focus. Set the android:focusable attribute of interactive elements to "true".',
      stepsToReproduce:
        "1. Attach a keyboard to the device.\n2. Using the Tab and arrow keys, navigate through the controls on the screen.\n3. Notice that the control never receives keyboard focus.",
      successCriteria: ["2.1.1"],
      title: "Controls not keyboard focusable",
      type: "android",
    },
    {
      bp: 1963,
      id: "response-android-control-no-name",
      impact:
        "Screen reader users will not be able to determine the purpose of these controls.",
      issue:
        "There are interactive controls with no accessible names. Examples include:\n- ",
      recommendation:
        "Ensure elements are sufficiently described. Add an android:contentDescription attribute to the control with an appropriate description.",
      stepsToReproduce:
        "1. Locate the control.\n2. Turn on TalkBack.\n3. Swipe right until the control is focused.\n4. Notice that TalkBack does not announce any name for the control.",
      successCriteria: ["1.3.1", "4.1.2"],
      title: "Controls with no name",
      type: "android",
    },
    {
      bp: 1968,
      id: "response-android-unassociated-label",
      impact:
        "Screen reader users will have difficulty determining the purpose of these controls. Speech input users will have difficulty navigating to them.",
      issue:
        "There are form controls with visual labels that are not programmatically associated with the control. Examples include:\n- ",
      recommendation:
        "Provide valid labels for all form elements. Add an android:labelFor attribute to the label, then set it to the ID of the corresponding form field.",
      stepsToReproduce:
        "1. Locate the control.\n2. Turn on TalkBack.\n3. Swipe right until the form control is focused.\n4. Notice that TalkBack does not announce the visual label for the control.",
      successCriteria: ["1.3.1", "4.1.2"],
      title: "Unassociated label",
      type: "android",
    },
    {
      bp: 1970,
      id: "response-android-sr-focus",
      impact:
        "Screen reader users will be prevented from accessing this content.",
      issue:
        "There is meaningful content that cannot receive TalkBack focus. Examples include:\n- ",
      recommendation:
        'Ensure all controls and non-decorative content support accessibility. Set the android:importantForAccessibility attribute of meaningful content to "yes". If it is non-text content, also set the element\'s android:contentDescription attribute to a meaningful equivalent.',
      stepsToReproduce:
        "1. Locate the content.\n2. Turn on TalkBack.\n3. Swipe right through the content on the screen.\n4. Notice that TalkBack does not focus the content.",
      successCriteria: ["1.3.1", "4.1.2"],
      title: "Content that cannot be focused with TalkBack",
      type: "android",
    },
    {
      bp: 1973,
      id: "response-android-role-state",
      impact:
        "Screen reader users will have difficulty understanding the purpose and current state of these controls.",
      issue:
        "There are controls with improper role and/or state information. Examples include:\n- ",
      recommendation:
        "Ensure element role and state are correct. The best way to do this is to use native views and states, which come with this information built in.\n\nIf using native views is not possible, this information must be set manually. To set an element's role manually, use the setClassName() method with an argument to the getter of the desired Android native control class name, such as Button.class.getName().",
      stepsToReproduce:
        "1. Locate the control.\n2. Turn on TalkBack.\n3. Swipe right until TalkBack focuses the control.\n4. Notice that TalkBack does not announce the appropriate role or state for the control.",
      successCriteria: ["4.1.2"],
      title: "Controls with improper role and state",
      type: "android",
    },
    {
      bp: 1975,
      id: "response-android-meaningful-with-bad-alt",
      impact:
        "Screen reader users will not receive an accurate impression of the contents of these images.",
      issue:
        "There are images with insufficiently descriptive textual equivalents. Examples include:\n- ",
      recommendation:
        "Ensure non-decorative images provide informative alternative text. Textual equivalents must be both concise and descriptive. Alter the contentDescription attribute of the image.",
      stepsToReproduce:
        "1. Locate the image.\n2. Turn on TalkBack.\n3. Swipe right until TalkBack focuses the image.\n4. Notice that TalkBack does not announce an appropriate name for the image.",
      successCriteria: ["1.1.1"],
      title: "Meaningful images with improper textual equivalents",
      type: "android",
    },
    {
      bp: 1976,
      id: "response-android-meaningful-without-alt",
      impact:
        "Screen reader users will be unable to determine what these images represent.",
      issue:
        "There are meaningful images without a textual equivalent. Examples include:\n- ",
      recommendation:
        "Provide textual equivalents for all non-text elements including sounds and images. Meaningful images must have a concise but descriptive textual equivalent. To add a textual equivalent to an image, set its android:contentDescription attribute to a meaningful equivalent.",
      stepsToReproduce:
        "1. Locate the image.\n2. Turn on TalkBack.\n3. Swipe right until TalkBack focuses the image.\n4. Notice that TalkBack does not announce any name for the image.",
      successCriteria: ["1.1.1"],
      title: "Meaningful images without textual equivalents",
      type: "android",
    },
    {
      bp: 1978,
      id: "response-android-decorative-with-alt",
      impact:
        "Screen reader users will receive unnecessary and potentially confusing information.",
      issue:
        "There are decorative images with textual equivalents. Examples include:\n- ",
      recommendation:
        'Ensure hidden, decorative and duplicate content and artifact elements are not exposed to assistive technologies. Non-meaningful images must be marked as decorative, which causes screen readers to ignore them. To mark an image as decorative, remove any contentDescription attribute and set its importantForAccessibility attribute to "no".',
      stepsToReproduce:
        "1. Locate the image.\n2. Turn on TalkBack.\n3. Swipe right until TalkBack focuses the image.\n4. Notice that TalkBack announces the presence of the image unnecessarily.",
      successCriteria: ["1.1.1", "4.1.2"],
      title: "Decorative image with textual equivalent",
      type: "android",
    },
    {
      bp: 1978,
      id: "response-android-duplicated-elements",
      impact:
        "Screen reader users will receive redundant information and will be prevented from navigating efficiently.",
      issue:
        "There are non-meaningful, duplicated elements exposed to screen readers. Examples include:\n- ",
      recommendation:
        'Ensure hidden, decorative and duplicate content and artifact elements are not exposed to assistive technologies.  Mark non-meaningful, duplicated content as decorative by setting its android:importantForAccessibility attribute to "no".',
      stepsToReproduce:
        "1. Locate the content.\n2. Turn on TalkBack.\n3. Swipe right through the contents of the screen.\n4. Notice that TalkBack focuses on the content twice.",
      successCriteria: ["1.1.1", "4.1.2"],
      title: "Duplicated elements",
      type: "android",
    },
    {
      bp: 1978,
      id: "response-android-hidden-content",
      impact:
        "Screen reader and keyboard users will be able to access hidden content, such as form fields, text, or links.",
      issue:
        "There is visually hidden content meant to be hidden from all users, but it can still be accessed by keyboard or screen reader users. Examples include:\n- ",
      recommendation:
        'Ensure hidden, decorative and duplicate content and artifact elements are not exposed to assistive technologies. Set the android:importantForAccessibility attribute of this content to "no".',
      stepsToReproduce:
        "1. Turn on TalkBack.\n2. Swipe right through the contents of the screen.\n3. Notice that TalkBack focuses on hidden content that is not meant to be exposed to users.",
      successCriteria: ["1.1.1", "4.1.2"],
      title: "Hidden content exposed to ATs",
      type: "android",
    },
    {
      bp: 1978,
      id: "response-android-content-behind-dialog",
      impact:
        "Keyboard and/or screen reader users will have difficulty determining their position in the screen. They could also have unintended access to controls behind the dialog.",
      issue:
        "There are modal dialogs that allow keyboard and/or screen reader access to elements behind the dialog. Examples include:\n- ",
      recommendation:
        "Ensure hidden, decorative and duplicate content and artifact elements are not exposed to assistive technologies. This includes content behind modal dialogs.\n\nThe best way to prevent access to content behind dialogs is to:\n- Ensure that the dialog container is separate from the container that holds the rest of the screen's content.\n- For the container that holds the rest of the screen's content, set the android:importantForAccessibility attribute to \"noHideDescendants\".\n- When the dialog is closed, remove the importantForAccessibility attribute from the container holding the rest of the screen's contents.",
      stepsToReproduce:
        "1. Turn on TalkBack.\n2. Swipe right through the contents of the screen.\n3. Notice that TalkBack focuses on content behind the dialog.",
      successCriteria: ["1.1.1", "4.1.2"],
      title: "Dialogs allow focus behind them",
      type: "android",
    },
    {
      bp: 1983,
      id: "response-android-not-keyboard-operable",
      impact: "Keyboard users will be prevented from accessing these controls.",
      issue:
        "There are controls that cannot be operated with the keyboard. Examples include:\n- ",
      recommendation:
        "Ensure access to alternative input methods. This includes external keyboards, which may be used directly by people with dexterity disabilities or as an interface for switch controls and Braille displays. Generally, controls should be activatable with the Enter key or allow selection with the arrow keys. To respond to keyboard events, implement methods from the KeyEvent.Callback interface,such as onKeyUp().",
      stepsToReproduce:
        "1. Attach a keyboard to the device.\n2. Using the Tab and arrow keys, navigate to the control.\n3. Notice that Enter, Space, or the arrow keys cannot be used to activate it or change its value.",
      successCriteria: ["2.1.1", "2.1.3"],
      title: "Controls not keyboard operable",
      type: "android",
    },
    {
      bp: 1993,
      id: "response-android-reading-order",
      impact: "Screen reader users will be unable to understand this content.",
      issue: "The following reading order is illogical:\n1.",
      recommendation:
        "Ensure that the reading order of content is logical. Ensure the elements follow the screen layout order. Alternatively, use the accessibilityTraversalBefore or accessibilityTraversalAfter attributes to manually set the focus order.",
      stepsToReproduce:
        "1. Turn on TalkBack.\n2. Swipe right through the contents of the screen.\n3. Notice that the order in which TalkBack focuses content does not reflect the natural reading order of the content.",
      successCriteria: ["1.3.2"],
      title: "Reading order",
      type: "android",
    },
    {
      bp: 1995,
      id: "response-android-text-resizing",
      impact:
        "Users with low vision who need to resize text will be prevented from accessing this content.",
      issue:
        "There is content that disappears, overlaps, or is cut off when the font size is increased by 200%. Examples include:\n- ",
      recommendation:
        "Provide for user control of font size. Users must be able to resize text up to 200%. Allow the app's text to resize according to the font size set in the OS settings.",
      stepsToReproduce:
        '1. Go to Settings > Accessibility > Display size and text.\n2. In "Font size", select the maximum value.\n3. In "Display", select the second notch from the left.\n4. Return to the app.\n5. Note that the text in the application has not resized to match the OS font size settings.',
      successCriteria: ["1.4.4"],
      title: "Text cannot be resized to 200%",
      type: "android",
    },
    {
      bp: 2042,
      id: "response-audio-plays-automatically",
      impact:
        "Screen reader users may have difficulty hearing speech output over autoplaying audio. Users with cognitive disabilities may be distracted by the audio.",
      issue:
        "There is audio that is played automatically when the page loads. Examples include:\n- ",
      recommendation:
        "Ensure audio is not played automatically on load. If audio content must load automatically, ensure the audio output plays for a maximum of three seconds or that there is a mechanism near the top of the page to stop or pause the audio.",
      stepsToReproduce:
        "1. Open the page.\n2. Notice that audio plays automatically.",
      successCriteria: ["1.4.2"],
      title: "Audio plays automatically",
      type: "web",
    },
    {
      bp: 2049,
      id: "response-captions-missing",
      impact:
        "Users who are deaf or hard of hearing will be prevented from accessing this content.",
      issue:
        "There are videos with audio that have no captions. Examples include:\n- ",
      recommendation:
        "Provide synchronized captions for video (which includes audio) or other multimedia. This includes all spoken language as well as music and sounds pertinent to the content of the video.",
      stepsToReproduce:
        "1. Locate the video.\n2. Notice that there are no captions.",
      successCriteria: ["1.2.2"],
      title: "Captions missing",
      type: "web",
    },
    {
      bp: 2049,
      id: "response-inaccurate-captions",
      impact:
        "Users who are deaf or hard of hearing will be unable to receive an accurate impression of the contents of the video.",
      issue:
        "There are captions that inaccurately reflect the contents of the video. Examples include:\n- ",
      recommendation:
        "Provide synchronized captions for video (which includes audio) or other multimedia. Captions must accurately represent the audio content in the video.",
      stepsToReproduce:
        "1. Locate the video.\n2. Review the captions.\n3. Notice that the captions are inaccurate or incomplete.",
      successCriteria: ["1.2.2"],
      title: "Inaccurate captions",
      type: "web",
    },
    {
      bp: 2264,
      id: "response-android-images-of-text",
      impact:
        "Users with low vision and users with cognitive disabilities will be unable to modify or enlarge this text.",
      issue:
        "There is text created with images of text rather than actual text elements. Examples include:\n- ",
      recommendation:
        "Ensure text is used instead of images of text when technology allows. Common exceptions include logotypes or images of single letters.",
      stepsToReproduce:
        "1. Locate the text.\n2. Turn on TalkBack.\n3. Swipe right until the text is focused.\n4. Note that TalkBack announces that the content is an image.",
      successCriteria: ["1.4.5"],
      title: "Images of text",
      type: "android",
    },
    {
      bp: 2265,
      id: "response-ios-images-of-text",
      impact:
        "Users with low vision and users with cognitive disabilities will be unable to modify or enlarge this text.",
      issue:
        "There is text created with images of text rather than actual text elements. Examples include:\n- ",
      recommendation:
        "Ensure text is used instead of images of text when technology allows. Common exceptions include logotypes or images of single letters.",
      stepsToReproduce:
        "1. Locate the text.\n2. Turn on VoiceOver.\n3. Swipe right until the text is focused.\n4. Note that VoiceOver announces that the content is an image.",
      successCriteria: ["1.4.5"],
      title: "Images of text",
      type: "ios",
    },
    {
      bp: 2349,
      id: "response-ios-focus-order",
      impact:
        "Screen reader users and keyboard users will have difficulty efficiently navigating the app.",
      issue: "The following focus order is illogical:\n1. ",
      recommendation:
        "Ensure the focus order of interactive elements on the page is logical. Generally, the focus order follows the reading order. For English text, this goes from left to right, then from top to bottom. When multiple elements in the vertical plane should be read before some on the horizontal plane, such as a column, set their focusGroupIdentifier property to the same value. To set the order of focused elements within a focus group, set the focusGroupPriority property.",
      stepsToReproduce:
        "1. Attach a keyboard to the device.\n2. Go to Settings > Accessibility > Keyboards > Full Keyboard Access and ensure that it is toggled on.\n3. Using the Tab and arrow keys, navigate through the controls on the screen.\n4. Notice that the order in which controls are focused does not match the logical reading order of the screen.",
      successCriteria: ["2.4.3"],
      title: "Focus order not meaningful",
      type: "ios",
    },
    {
      bp: 2440,
      id: "response-avoid-placeholder-to-label-input",
      impact:
        "Users with cognitive disabilities may be unable to determine the purpose of the field after the placeholder disappears. Some assistive technologies will not use the placeholder attribute as a field's accessible name, so screen reader users will have difficulty determining what fields are for and speech input users will have difficulty navigating to them.",
      issue:
        "There are form fields that rely on the placeholder attribute to supply their accessible name. Examples include:\n- ",
      recommendation:
        "Avoid use of placeholder values to label or explain input.\n\nLabels must meet the following requirements:\n- The label must be visible.\n- The label must be persistent. That is, a label must not disappear when text is entered into the field or an option is selected.\n- The label must be programmatically associated with the form field. The most common way to do this is with a <label> element with a for attribute set to the ID of the field.\n- The label must provide the accessible name of the field, or the label's exact text must be included in the accessible name.",
      stepsToReproduce:
        "1. Locate the form field.\n2. Inspect it with Chrome DevTools.\n3. In the Accessibility tab, expand the Computed Properties section.\n4. Notice that the accessible name is computed from the placeholder attribute.",
      successCriteria: ["1.3.1", "4.1.2"],
      title: "Placeholder text is used to label or explain input",
      type: "web",
    },
    {
      bp: 2493,
      id: "response-ios-implicit-headings",
      impact:
        "Screen reader users will have difficulty efficiently navigating the screen.",
      issue:
        "There is content that functions as a heading but is not marked as a heading. Examples include:\n- ",
      recommendation:
        "Ensure headings are denoted through structure and not implicitly. Set a UIAccessibilityTraitHeader trait on elements that function as headings.",
      stepsToReproduce:
        "1. Locate the text.\n2. Turn on VoiceOver.\n3. Swipe right until the text is focused.\n4. Note that VoiceOver does not announce the content as a heading.",
      successCriteria: ["1.3.1"],
      title: "Implicit headings",
      type: "ios",
    },
    {
      bp: 2519,
      id: "response-non-unique-nav-name",
      impact:
        "Screen reader users will have difficulty distinguishing between these regions.",
      issue:
        "Multiple <nav> elements are present in the page, but they do not each have accessible names. Examples include:\n- ",
      recommendation:
        "Ensure ARIA regions, landmarks and HTML sections are identifiable. When multiple <nav> elements appear on the same page, ensure that they each have an accessible name. This can be set with aria-labelledby (if there is visible text naming the region) or aria-label (if no visual label is present).",
      stepsToReproduce:
        '1. Locate the navigation section.\n2. Inspect it with Chrome DevTools.\n3. In the Accessibility tab, expand the Computed Properties section.\n4. Review the value for "Name".\n5. Review the name for other <nav> elements on the page.',
      successCriteria: ["1.3.1"],
      title: "Navigation without unique name",
      type: "web",
    },
    {
      bp: 2519,
      id: "response-non-unique-aside-name",
      impact:
        "Screen reader users will have difficulty distinguishing between these regions.",
      issue:
        "Multiple <aside> elements are present in the page, but they do not each have accessible names. Examples include:\n- ",
      recommendation:
        "Ensure ARIA regions, landmarks and HTML sections are identifiable. When multiple <aside> elements appear on the same page, ensure that they each have an accessible name. This can be set with aria-labelledby (if there is visible text naming the region) or aria-label (if no visual label is present).",
      stepsToReproduce:
        '1. Locate the aside.\n2. Inspect it with Chrome DevTools.\n3. In the Accessibility tab, expand the Computed Properties section.\n4. Review the value for "Name".\n5. Review the name for other <aside> elements on the page.',
      successCriteria: ["1.3.1"],
      title: "Aside without unique name",
      type: "web",
    },
    {
      bp: 2519,
      id: "response-non-unique-region-name",
      impact:
        "Screen reader users will be unable to determine the purpose of these regions.",
      issue:
        'There are role="region" elements with no accessible names. Examples include:\n- ',
      recommendation:
        'Ensure ARIA regions, landmarks and HTML sections are identifiable. Elements with role="region" must have an accessible name set with aria-label or aria-labelledby.',
      stepsToReproduce:
        '1. Locate the region.\n2. Inspect it with Chrome DevTools.\n3. In the Accessibility tab, expand the Computed Properties section.\n4. Review the value for "Name".',
      successCriteria: ["1.3.1"],
      title: "Region without name",
      type: "web",
    },
    {
      bp: 2520,
      id: "response-ios-keyboard-inaccessible",
      impact: "Keyboard users will be prevented from accessing these controls.",
      issue:
        "There are controls that cannot be navigated to with the keyboard. Examples include:\n- ",
      recommendation:
        "Ensure all input elements and controls can receive focus. This can generally be accomplished by using standard input controls or supporting becoming a first responder on custom input fields.",
      stepsToReproduce:
        "1. Attach a keyboard to the device.\n2. Go to Settings > Accessibility > Keyboards > Full Keyboard Access and ensure that it is toggled on.\n3. Using the Tab and arrow keys, navigate through the controls on the screen.\n4. Notice that the control cannot be focused with the keyboard.",
      successCriteria: ["2.1.1"],
      title: "Content that cannot receive keyboard focus",
      type: "ios",
    },
    {
      bp: 2554,
      id: "response-progress-accessible-name-missing",
      impact:
        "Screen reader users will not know the purpose of these progress bars.",
      issue:
        "There are <progress> elements without accessible names. Examples include:\n- ",
      recommendation:
        "Provide accessible names for progress bars and meters. Use an aria-label, aria-labelledby, or title attribute on the element to provide the accessible name.",
      stepsToReproduce:
        '1. Locate the progress bar.\n2. Inspect it with Chrome DevTools.\n3. In the Accessibility tab, expand the Computed Properties section.\n4. Review the value for "Name".',
      successCriteria: ["1.1.1", "4.1.2"],
      title: "Progress accessible name missing",
      type: "web",
    },
    {
      bp: 2561,
      id: "response-ios-loading",
      impact:
        "Screen reader users will be unaware when the screen is in a loading state.",
      issue:
        "There are loading indicators that are not announced for screen reader users. Examples include:\n- ",
      recommendation:
        "Provide an accessible alert method for content changes that occur without explicit user knowledge. Post a UIAccessibilityLayoutChangedNotification when this indicator appears.",
      stepsToReproduce:
        "1. Turn on VoiceOver.\n2. Swipe right repeatedly until the trigger for the loading indicator is focused.\n3. Double tap the trigger.\n4. Notice that VoiceOver does not announce anything to suggest that content is loading.",
      successCriteria: ["4.1.2"],
      title: "Loading indicator",
      type: "ios",
    },
    {
      bp: 2562,
      id: "response-android-loading",
      impact:
        "Screen reader users will be unaware when the screen is in a loading state.",
      issue:
        "There are loading indicators that are not announced for screen reader users. Examples include:\n- ",
      recommendation:
        'Provide an accessible alert method for content changes that occur without explicit user knowledge.\n\nSet an accessibilityLiveRegion attribute on the loading element to "polite" or use the announceForAccessibility() method.',
      stepsToReproduce:
        "1. Turn on TalkBack.\n2. Swipe right repeatedly until the trigger for the loading indicator is focused.\n3. Double tap the trigger.\n4. Notice that TalkBack does not announce anything to suggest that content is loading.",
      successCriteria: ["4.1.2"],
      title: "Loading indicator",
      type: "android",
    },
    {
      bp: 2570,
      id: "response-pdf-hidden",
      impact: "Screen reader will be able to access hidden content.",
      issue:
        "There is visually hidden content meant to be hidden from all users, but it can still be accessed by screen reader users. Examples include:\n- ",
      recommendation:
        'Ensure hidden content is not accessible by assistive technologies. Mark all non-meaningful hidden content as an artifact.\n\nTo mark content as an artifact in Acrobat Pro:\n1. Activate "Add, delete or edit accessibility tags" (tag icon) in the right toolbar.\n2. Locate the container of the hidden content.\n3. Open the context menu (right-click) for the container, then select "Change Tag to Artifact..."\n4. Activate "OK", then save the document.',
      successCriteria: [],
      title: "Hidden content exposed to screen readers",
      type: "pdf",
    },
    {
      bp: 2587,
      id: "response-pdf-captions-missing",
      impact:
        "Users who are deaf or hard of hearing will be prevented from accessing this content.",
      issue:
        "There are videos with audio that have no captions. Examples include:\n- ",
      recommendation:
        "Provide synchronized equivalent for multimedia (audio and video). This includes all spoken language as well as music and sounds pertinent to the content of the video.",
      successCriteria: ["1.2.2", "1.2.3", "1.2.4", "1.2.5"],
      title: "Captions missing",
      type: "pdf",
    },
    {
      bp: 2587,
      id: "response-pdf-audio-descriptions",
      impact:
        "Users who are blind will be prevented from accessing important visual information provided in the video.",
      issue:
        "There are prerecorded videos with audio that do not have audio descriptions. Examples include:\n- ",
      recommendation:
        "Provide synchronized equivalent for multimedia (audio and video). Audio description must accurately convey all important visual information, such as actions or unspoken text.",
      successCriteria: ["1.2.2", "1.2.3", "1.2.4", "1.2.5"],
      title: "Audio descriptions missing",
      type: "pdf",
    },
    {
      bp: 2587,
      id: "response-pdf-live-captions-missing",
      impact:
        "Users who are deaf or hard of hearing will be prevented from accessing this content.",
      issue:
        "There are live videos with audio that have no captions. Examples include:\n- ",
      recommendation:
        "Provide synchronized equivalent for multimedia (audio and video). This includes all spoken language as well as music and sounds pertinent to the content of the video.",
      successCriteria: ["1.2.2", "1.2.3", "1.2.4", "1.2.5"],
      title: "Live captions missing",
      type: "pdf",
    },
    {
      bp: 2607,
      id: "response-icon-fonts-without-text-equivalent",
      impact:
        "Screen reader users will be unable to determine what these images represent.",
      issue:
        "There are meaningful font icons with no textual equivalents. Examples include:\n- ",
      recommendation:
        'Provide text equivalents for icon fonts. Font icon pseudo-elements must be set apart in their own real element, such as a <span>. To add a textual equivalent, add role="img" to the element and an aria-label attribute set to an appropriate textual description.',
      stepsToReproduce:
        '1. Locate the icon.\n2. Inspect it with Chrome DevTools.\n3. In the Accessibility tab, expand the Computed Properties section.\n4. Review the values for "Name" and "Role".',
      successCriteria: ["1.1.1"],
      title: "Font icons without textual equivalents",
      type: "web",
    },
    {
      bp: 2607,
      id: "response-decorative-font-icons",
      impact:
        "Screen readers may announce this content by its Unicode name. This gives screen reader users confusing and irrelevant information.",
      issue:
        "There are decorative font icons that are exposed to screen readers. Examples include:\n- ",
      recommendation:
        'Provide text equivalents for icon fonts. Font icon pseudo-elements must be set apart in their own real element, such as a <span>. To mark the icon as decorative, set aria-hidden="true" on this element.',
      stepsToReproduce:
        "1. Locate the icon.\n2. Inspect it with Chrome DevTools.\n3. In the Accessibility tab, expand the Computed Properties section.\n4. Verify that the accessibility node is not exposed.",
      successCriteria: ["1.1.1"],
      title: "Decorative font icons",
      type: "web",
    },
    {
      bp: 2617,
      id: "response-android-focusable-containers",
      impact:
        "Static content within focusable containers cannot be focused, so screen reader users will not be able to access this content.",
      issue: "There are focusable containers. Examples include:\n- ",
      recommendation:
        "Avoid making containers focusable. This can usually be achieved by removing any android:focusable or android:contentDescription properties that are set on the container.",
      stepsToReproduce:
        "1. Turn on TalkBack.\n2. Swipe right repeatedly until the container is focused.\n3. Continue swiping right and note that content within the container cannot be focused.",
      successCriteria: ["2.1.1"],
      title: "Focusable containers",
      type: "android",
    },
    {
      bp: 2619,
      id: "response-ios-focusable-containers",
      impact:
        "Some content within focusable containers cannot be focused, so screen reader users will not be able to access it.",
      issue: "There are focusable containers. Examples include:\n- ",
      recommendation:
        "Ensure container views themselves are not accessible. Set isAccessibilityElement to NO on the container.",
      stepsToReproduce:
        "1. Turn on VoiceOver.\n2. Swipe right repeatedly until the container is focused.\n3. Continue swiping right and note that content within the container cannot be focused.",
      successCriteria: ["2.1.1"],
      title: "Focusable containers",
      type: "ios",
    },
    {
      bp: 2621,
      id: "response-pdf-layout-tables",
      impact:
        "Screen readers will treat this content as a data table, causing confusion about its layout and impeding navigation.",
      issue:
        "There are Table tags used for layout purposes. Examples include:\n- ",
      recommendation:
        "Avoid using tables for non-tabular data. Convert this content into other semantically appropriate tags.",
      successCriteria: ["1.3.1"],
      title: "Layout tables",
      type: "pdf",
    },
    {
      bp: 2622,
      id: "response-ios-multipart",
      impact:
        "Screen reader users will have difficulty understanding and interacting with the controls.",
      issue:
        "There are controls that function as a single unit but are not presented as a single control. Examples include:\n- ",
      recommendation:
        "Ensure multi part controls that act as a single unit appear as a single accessible control. Consolidate these controls into a single accessible element with appropriate accessibility traits and a label. Once this is done, hide any controls with duplicate functionality from assistive technologies by using the isAccessibilityEnabled() function.",
      stepsToReproduce:
        "1. Turn on VoiceOver.\n2. Swipe right repeatedly until you reach the multi-part control.\n3. Notice that VoiceOver focuses each part of the control independently rather than as one single element.",
      successCriteria: ["4.1.2"],
      title: "Multi-part controls",
      type: "ios",
    },
    {
      bp: 2627,
      id: "response-pdf-decorative-not-hidden",
      impact:
        'Screen readers may announce images with no accessible name by number or as simply "graphic." This gives screen reader users irrelevant and confusing information.',
      issue:
        "There are images that serve a decorative purpose but are exposed to screen readers. Examples include:\n- ",
      recommendation:
        'Ensure decorative images are tagged as artifacts. Non-meaningful images must be marked as decorative, which causes screen readers to ignore them.\n\nTo mark an image as decorative in Acrobat Pro:\n1. Activate "Add, delete or edit accessibility tags" (tag icon) in the right toolbar.\n2. Navigate to the Figure tag that contains the Image container of the image you want to mark as decorative.\n3. Open the context menu (right-click) for the image container (not the Figure tag) and choose "Change Tag to Artifact...".\n4. In the dialog that appears, press OK.\n5. Delete the now-empty Figure tag with the Delete key or by opening the context menu and choosing Delete Tag.',
      successCriteria: [],
      title: "Decorative image not hidden from screen readers",
      type: "pdf",
    },
    {
      bp: 2891,
      id: "response-form-fields-missing-autocomplete",
      impact:
        "Users with cognitive and motor disabilities will be unable to use autofill form features to quickly prefill common form fields. Additionally, some users with cognitive disabilities use assistive technologies that add icons next to common form fields. This allows them to identify the field's purpose more easily. When the input purpose is not programmatically indicated, these icons will not be displayed, so these users will have difficulty determining the fields' purpose.",
      issue:
        "There are common form controls that lack a programmatic way to communicate purpose, such as an autocomplete attribute. Examples include:\n- ",
      recommendation:
        "Ensure that common input fields allow autocomplete and use standard autocomplete values.\n\nCommon inputs include names, emails, passwords, and addresses, among others. For a full list of values, see the WCAG standard: https://www.w3.org/TR/WCAG22/#input-purposes",
      stepsToReproduce:
        "1. Locate the field.\n2. Inspect it with Chrome DevTools.\n3. Review the value for its autocomplete attribute, if any.",
      successCriteria: ["1.3.5"],
      title: "Form fields missing autocomplete",
      type: "web",
    },
    {
      bp: 2892,
      id: "response-reflow-content-loss",
      impact:
        "Users with low vision who need to resize text will be prevented from accessing this content.",
      issue:
        "There is content that disappears, overlaps, is cut off, or requires horizontal scrolling to view when the page has a viewport width of 320 CSS pixels. Examples include:\n- ",
      recommendation:
        "Ensure pages reflow without requiring two-dimensional scrolling without loss of content or functionality. When the page has a viewport width of 320 CSS pixels, all content and functionality must still be available without requiring horizontal scrolling.\n\nMoving content to an accessible show/hide control, such as a hamburger menu, is acceptable.\n\nContent that requires two dimensions to be understood, such as a map or data table, is exempt from this requirement.",
      stepsToReproduce:
        '1. Open Chrome DevTools.\n2. Activate "Toggle device toolbar" (laptop and cell phone icon).\n3. In "Dimensions", select "Responsive".\n4. In "Width", enter "320".\n5. Refresh the page.\n6. Notice that content disappears, is cut off, or overlaps.',
      successCriteria: ["1.4.10"],
      title: "Reflow content loss",
      type: "web",
    },
    {
      bp: 2893,
      id: "response-multipoint-path-based-gestures-required",
      impact:
        "Users with dexterity or mobility disabilities may be unable to perform these gestures.",
      issue:
        "There is functionality that requires multipoint and/or path-based gestures. Examples include:\n- ",
      recommendation:
        "Ensure that functionality can be operated through a single pointer except when a multi-point or path-based gesture is essential. Multipoint gestures include any action conducted with multiple fingers, such as multi-finger taps and pinching to zoom. Path-based gestures include specifically drawn shapes or patterns. Essential applications for path-based gestures include signatures and artistic drawing. Instead of relying on multipoint or path-based gestures, use single-point activation instead. Single-point activation includes tapping, double-tapping, and long-presses.",
      stepsToReproduce:
        "1. Locate the functionality.\n2. Notice that there is no way to activate the functionality without using multipoint touch or swipe gestures.",
      successCriteria: ["2.5.1"],
      title: "Multipoint path-based gestures required",
      type: "web",
    },
    {
      bp: 2894,
      id: "response-single-point-activation-cannot-be-cancelled",
      impact:
        "Users with disabilities may accidentally trigger touch or mouse events with unwanted results.",
      issue:
        "There are controls that are triggered by the mousedown or touchdown JavaScript events. Examples include:\n- ",
      recommendation:
        "Ensure events triggered by single-point activation can be cancelled. Use the up event to reverse the down event effects if the user has moved off of the target area of the control, or do not rely on the down event for activation unless other up event functionality is essential. When completion of the event is on the up event, such as a drag, make sure users can abort or undo the action.",
      stepsToReproduce:
        "1. Locate the control.\n2. Click and hold on the control or long press the control.\n3. Notice that the control is activated immediately when the click or long press is initiated, not when it is released.",
      successCriteria: ["2.5.2"],
      title: "Single-point activation cannot be cancelled",
      type: "web",
    },
    {
      bp: 2895,
      id: "response-audio-descriptions-for-visual-only-content-missing",
      impact:
        "Users who are blind will be prevented from accessing important visual information provided in the video.",
      issue:
        "There are prerecorded videos with audio that do not have audio descriptions. Examples include:\n- ",
      recommendation:
        "Provide synchronized audio description for video (which includes audio) or other multimedia. Audio description must accurately convey all important visual information, such as actions or unspoken text.",
      stepsToReproduce:
        "1. Locate the video.\n2. Notice that an audio description track is not provided.",
      successCriteria: ["1.2.3", "1.2.5", "1.2.7"],
      title: "Audio descriptions missing",
      type: "web",
    },
    {
      bp: 2896,
      id: "response-text-spacing-content-loss",
      impact:
        "Users with low vision and users with dyslexia will have difficulty reading this content.",
      issue:
        "There is content that disappears, overlaps, or is cut off when viewing the page with custom text spacing. Examples include:\n- ",
      recommendation:
        "Ensure that content and functionality is available when the user overrides text spacing properties.\n\nContent must adapt up to the following specific spacing requirements identified in WCAG:\n- Line height must be able to adapt to 1.5 times the font size.\n- Letter spacing must be able to adapt to 0.12 times the font size.\n- Word spacing must be able to adapt to 0.16 times the font size.\n- Spacing underneath paragraphs must be able to adapt to 2 times the font size.\n\nFor assistance testing content against this standard, install a user style management extension, such as Stylus. Then, create a user style with the following CSS:\n* {\n  line-height: 1.5 !important;\n  letter-spacing: 0.12em !important;\n  word-spacing: 0.16em !important;\n}\n\np {\n  margin-bottom: 2em !important;\n}",
      stepsToReproduce:
        "1. Install a user style management extension, such as Stylus.\n2. Create a user style with the following CSS: *{line-height:1.5 !important;letter-spacing:0.12em !important;word-spacing:0.16em !important}p{margin-bottom:2em !important}\n3. Activate the user style on the page.\n4. Notice that content disappears, overlaps, or is cut off when custom text spacing is active.",
      successCriteria: ["1.4.12"],
      title: "Text spacing content loss",
      type: "web",
    },
    {
      bp: 2899,
      id: "response-motion-required-to-use-function",
      impact:
        "Users with dexterity and mobility disabilities may be unable to perform these actions, or they may inadvertently activate it.",
      issue:
        "There is functionality that is operable through device motion alone. Examples include:\n- ",
      recommendation:
        "Ensure that motion is not the only method to activate user interface components. Provide a means to activate the functionality by other means, like a user interface control. If motion is essential, then it is exempt. For example, functions that require sensor input, such as pedometer or geolocation sensors, are exempt. Additionally, allow users to turn off motion actuation to prevent accidental activation.",
      stepsToReproduce:
        "1. Locate the functionality.\n2. Notice that there is no way to activate the functionality without device motion sensing.",
      successCriteria: ["2.5.4"],
      title: "Motion required to use function",
      type: "web",
    },
    {
      bp: 2900,
      id: "response-orientation-locked",
      impact:
        "Users with a mounted device in a different orientation, such as some wheelchair users, will have difficulty viewing and interacting with the app.",
      issue:
        "The application does not allow both portrait and landscape orientation views.",
      recommendation:
        "Avoid restricting the operation or viewing of content in different display orientations.",
      stepsToReproduce:
        '1. Open Chrome DevTools.\n2. Activate "Toggle device toolbar" (laptop and cell phone icon).\n3. In "Dimensions", select "Responsive".\n4. Activate "Rotate" (rotating rectangle icon).\n5. Refresh the page.\n6. Notice that content is unavailable in either the portrait or landscape orientations.',
      successCriteria: ["1.3.4"],
      title: "Orientation locked",
      type: "web",
    },
    {
      bp: 2901,
      id: "response-status-message-not-communicated",
      impact:
        "Screen reader users will be unaware of important updates to this content when they occur.",
      issue:
        "There are dynamically changing content areas that do not indicate live regions. Examples include:\n- ",
      recommendation:
        'Ensure that status messages can be determined programmatically without receiving focus. This can be done with ARIA live regions. Live regions can be created by adding a role attribute set to "log", "status", "alert", "progressbar", "marquee", or "timer" as appropriate. Alternatively, custom behavior can be created by using the aria-live, aria-atomic, and aria-relevant attributes. Text injected into this live region element will be announced by screen readers.\n\nImportantly, the element with the ARIA live attributes must be available when the page loads. Otherwise, many screen readers will be unable to detect updates to the element. Additionally, the element must be empty on page load unless an immediate screen reader announcement is desired.',
      stepsToReproduce:
        "1. Enable a screen reader.\n2. Using the Down Arrow key or Tab key, navigate to the dynamically updating content. Trigger it with the Enter key if necessary.\n3. Review any announcements given by the screen reader in response to the dynamic content update.",
      successCriteria: ["4.1.3"],
      title: "Status message not communicated",
      type: "web",
    },
    {
      bp: 2901,
      id: "response-status-message-loading",
      impact:
        "Screen reader users will be unaware when the page is in a loading state.",
      issue:
        "There are loading indicators that are not announced for screen reader users. Examples include:\n- ",
      recommendation:
        'Ensure that status messages can be determined programmatically without receiving focus.\n\nFor a loading indicator, the best way to do this is to use a "status" ARIA live region. To create such a region:\n- Ensure that a visually hidden container <div> is present when the page loads. The <div> must be empty unless a visual loading indicator is visible.\n- Add a role="status" attribute to this <div>.\n- When the page is in a loading state, use JavaScript to inject text into this <div role="status"> that describes the loading behavior (e.g. "Loading more posts", "Processing email", etc.). If properly configured, this text will be announced to screen readers.',
      stepsToReproduce:
        "1. Enable a screen reader.\n2. Using the Down Arrow key or Tab key, navigate to the dynamically updating content. Trigger it with the Enter key if necessary.\n3. Review any announcements given by the screen reader in response to the dynamic content update.",
      successCriteria: ["4.1.3"],
      title: "Loading status message",
      type: "web",
    },
    {
      bp: 2901,
      id: "response-status-message-search-results",
      impact:
        "Screen reader users will be unaware that these search suggestions have appeared.",
      issue:
        "There are search results that appear but are not announced to screen reader users. Examples include:\n- ",
      recommendation:
        'Ensure that status messages can be determined programmatically without receiving focus.\n\nFor dynamically updated search results, the best way to do this is to use a "status" ARIA live region. To create such a region:\n- Ensure that a visually hidden container <div> is present when the page loads. The <div> must be empty until results are returned.\n- Add a role="status" attribute to this <div>.\n- When the page is in a loading state, use JavaScript to inject text into this <div role="status"> that describes the results available (e.g., "83 results available" or "Results available"). If properly configured, this text will be announced to screen readers.',
      stepsToReproduce:
        "1. Enable a screen reader.\n2. Using the Down Arrow key or Tab key, navigate to the dynamically updating content. Trigger it with the Enter key if necessary.\n3. Review any announcements given by the screen reader in response to the dynamic content update.",
      successCriteria: ["4.1.3"],
      title: "Search results status message",
      type: "web",
    },
    {
      bp: 2902,
      id: "response-shortcuts-cannot-reconfigure-or-deactivated",
      impact:
        "Speech input users will inadvertently activate the character shortcut whenever they dictate text or speak a command that contains the characters in the shortcut.",
      issue:
        "There are character-only key shortcuts that can't be altered or turned off. Examples include:\n- ",
      recommendation:
        "Ensure that character key shortcuts without modifiers can be reconfigured or deactivated. Unmodified character key shortcuts are shortcuts that use only letter, punctuation, number, or symbol characters. They do not include shortcuts that use Ctrl, Alt, and other non-printable characters. They also do not include shortcuts that are only available when a control has keyboard focus.\n\nTo resolve the issue, provide users a way to turn off or change the shortcut.",
      stepsToReproduce:
        "1. Ensure that no controls have keyboard focus.\n2. Activate all character keys on the keyboard.\n3. Note that single-character keyboard shortcuts exist and cannot be disabled or changed.",
      successCriteria: ["2.1.4"],
      title: "Character key shortcuts",
      type: "web",
    },
    {
      bp: 2903,
      id: "response-form-label-in-name-missing",
      impact:
        "Speech input users will have difficulty navigating to these controls.",
      issue:
        "There are controls with accessible names that do not include the text of their visual labels. Examples include:\n- ",
      recommendation:
        "Ensure the visible text label for a control is included in the control's accessible name.",
      stepsToReproduce:
        '1. Locate the control.\n2. Inspect it with Chrome DevTools.\n3. In the Accessibility tab, expand the Computed Properties section.\n4. Review the value for "Name".\n5. Notice that this value does not include the visible text of the control as a substring.',
      successCriteria: ["2.5.3"],
      title: "Form label in name missing",
      type: "web",
    },
    {
      bp: 2904,
      id: "response-hover-or-focus-content-cannot-be-dismissed",
      impact:
        "Screen magnification users will have difficulty moving the cursor or focus off the trigger while still keeping the content behind the revealed content in view. Keyboard users will be unable to review the content behind the revealed content.",
      issue:
        "There is content that appears on hover and/or focus, obscures other content, and cannot be dismissed without moving focus or the cursor. Examples include:\n- ",
      recommendation:
        "Ensure that content that appears on hover or focus may be dismissed by the user. The best way to do this is to allow the hover/focus content to be hidden with the Esc key.",
      stepsToReproduce:
        "1. Trigger the appearance of the content.\n2. Attempt to dismiss the content without moving keyboard focus or the cursor, such as by pressing Esc.\n3. Notice that there is no way to dismiss the content.",
      successCriteria: ["1.4.13"],
      title: "Hover or focus content cannot be dismissed",
      type: "web",
    },
    {
      bp: 2905,
      id: "response-hover-or-focus-content-disappears-when-pointer-moves-over",
      impact:
        "Screen magnification users will be unable to review the revealed content.",
      issue:
        "There is content that appears on hover but cannot be moved over with a pointer without disappearing. Examples include:\n- ",
      recommendation:
        "Ensure that content that appears on hover may be moved over with a pointer without disappearing. For example, users must be able to hover over tooltips without the tooltip disappearing.",
      stepsToReproduce:
        "1. Trigger the appearance of the content.\n2. Attempt to hover over the revealed content with the mouse.\n3. Notice that the content disappears when it is hovered over.",
      successCriteria: ["1.4.13"],
      title: "Hover or focus content disappears when pointer moves over",
      type: "web",
    },
    {
      bp: 2909,
      id: "response-active-interface-contrast-insufficient",
      impact:
        "Users with low vision will have difficulty identifying this content.",
      issue:
        "There are user interface components with a contrast ratio below 3.00:1.\n\nForeground color: \nBackground color: \nContrast ratio: \n\nExamples of this user interface component include:\n- ",
      recommendation:
        "Ensure active user interface components have sufficient contrast. The required minimum contrast ratio is 3.00:1.\n\nCommon examples of qualifying components include text field borders, check marks for checkboxes, fillings for radio buttons, focus indicators, and icon-only controls. Non-interactive controls are exempt from this requirement.\n\nTo calculate color contrast ratios, use a tool such as the Level Access Accessible Color Picker Chrome extension: https://chrome.google.com/webstore/detail/accessible-color-picker/bgfhbflmeekopanooidljpnmnljdihld or the Color Contrast Checker: https://www.levelaccess.com/color-contrast-checker-new/",
      stepsToReproduce:
        "1. Locate the user interface component.\n2. Inspect it with Chrome DevTools.\n3. Review its CSS to determine the foreground and background colors or select the colors of the foreground and background with a color picker.\n4. Use a calculator such as https://www.levelaccess.com/color-contrast-checker-new/ to determine the contrast ratio.\n5. Notice that the contrast ratio is below 3.00:1.",
      successCriteria: ["1.4.11"],
      title: "Active interface contrast insufficient",
      type: "web",
    },
    {
      bp: 2910,
      id: "response-graphical-object-contrast-insufficient",
      impact:
        "Users with low vision will have difficulty identifying this content.",
      issue:
        "There are graphical objects with a color contrast ratio below 3.00:1.\n\nForeground color: \nBackground color: \nContrast ratio: \n\nExamples include:\n- ",
      recommendation:
        "Ensure parts of graphical objects essential for understanding content have sufficient contrast. The required minimum contrast ratio is 3.00:1.\n\nCommon examples of qualifying objects include lines in a chart, meaningful icons, and annotations within an image. Graphics that require particular presentation to preserve their meaning are exempt from this requirement.\n\nTo calculate color contrast ratios, use a tool such as the Level Access Accessible Color Picker Chrome extension: https://chrome.google.com/webstore/detail/accessible-color-picker/bgfhbflmeekopanooidljpnmnljdihld or the Color Contrast Checker: https://www.levelaccess.com/color-contrast-checker-new/",
      stepsToReproduce:
        "1. Locate the graphical object.\n2. Inspect it with Chrome DevTools.\n3. Review its CSS to determine the foreground and background colors or select the colors of the foreground and background with a color picker.\n4. Use a calculator such as https://www.levelaccess.com/color-contrast-checker-new/ to determine the contrast ratio.\n5. Notice that the contrast ratio is below 3.00:1.",
      successCriteria: ["1.4.11"],
      title: "Graphical object contrast insufficient",
      type: "web",
    },
    {
      bp: 2927,
      id: "response-pdf-active-interface-contrast-insufficient",
      impact:
        "Users with low vision will have difficulty identifying this content.",
      issue:
        "There are user interface components with a contrast ratio below 3.00:1.\n\nForeground color: \nBackground color: \nContrast ratio: \n\nExamples of this user interface component include:\n- ",
      recommendation:
        'Ensure active user interface components have sufficient contrast. The required minimum contrast ratio is 3.00:1.\n\nCommon examples of qualifying components include text field borders, check marks for checkboxes, fillings for radio buttons, focus indicators, and icon-only controls.\n\nFor borders, the "adjacent color" can be the color that touches the outside of the border or the color that touches the inside of the border. Contrast with both is not required.\n\nDisabled controls that cannot be navigated to with the keyboard are exempt from this requirement.\n\nTo calculate color contrast ratios, use a tool such as the Level Access Color Contrast Checker: https://www.levelaccess.com/color-contrast-checker-new/',
      successCriteria: ["1.4.11"],
      title: "Active interface contrast insufficient",
      type: "pdf",
    },
    {
      bp: 2930,
      id: "response-android-active-interface-contrast-insufficient",
      impact:
        "Users with low vision will have difficulty identifying this content.",
      issue:
        "There are user interface components with a contrast ratio below 3.00:1.\n\nForeground color: \nBackground color: \nContrast ratio: \n\nExamples of this user interface component include:\n- ",
      recommendation:
        'Ensure active user interface components have sufficient contrast. The required minimum contrast ratio is 3.00:1.\n\nCommon examples of qualifying components include text field borders, check marks for checkboxes, fillings for radio buttons, focus indicators, and icon-only controls.\n\nFor borders, the "adjacent color" can be the color that touches the outside of the border or the color that touches the inside of the border. Contrast with both is not required.\n\nDisabled controls that cannot be navigated to with the keyboard are exempt from this requirement.\n\nTo calculate color contrast ratios, use a tool such as the Level Access Color Contrast Checker: https://www.levelaccess.com/color-contrast-checker-new/',
      stepsToReproduce:
        "1. Locate the component.\n2. Determine the component color and background color.\n3. Use a calculator such as https://www.levelaccess.com/color-contrast-checker-new/ to determine the contrast ratio.\n4. Notice that the contrast ratio is below 3.00:1.",
      successCriteria: ["1.4.11"],
      title: "Active interface contrast insufficient",
      type: "android",
    },
    {
      bp: 2933,
      id: "response-ios-active-interface-contrast-insufficient",
      impact:
        "Users with low vision will have difficulty identifying this content.",
      issue:
        "There are user interface components with a contrast ratio below 3.00:1.\n\nForeground color: \nBackground color: \nContrast ratio: \n\nExamples of this user interface component include:\n- ",
      recommendation:
        'Ensure active user interface components have sufficient contrast. The required minimum contrast ratio is 3.00:1.\n\nCommon examples of qualifying components include text field borders, check marks for checkboxes, fillings for radio buttons, focus indicators, and icon-only controls.\n\nFor borders, the "adjacent color" can be the color that touches the outside of the border or the color that touches the inside of the border. Contrast with both is not required.\n\nDisabled controls that cannot be navigated to with the keyboard are exempt from this requirement.\n\nTo calculate color contrast ratios, use a tool such as the Level Access Color Contrast Checker: https://www.levelaccess.com/color-contrast-checker-new/',
      stepsToReproduce:
        "1. Locate the component.\n2. Determine the component color and background color.\n3. Use a calculator such as https://www.levelaccess.com/color-contrast-checker-new/ to determine the contrast ratio.\n4. Notice that the contrast ratio is below 3.00:1.",
      successCriteria: ["1.4.11"],
      title: "Active interface contrast insufficient",
      type: "ios",
    },
    {
      bp: 2912,
      id: "response-hover-or-focus-content-disappears-without-user-action",
      impact:
        "Users with low vision or cognitive disabilities will have difficulty reading the content before it disappears.",
      issue:
        "There is content that appears on hover and/or focus that disappears without user initiation. Examples include:",
      recommendation:
        "Ensure content that appears on hover or focus is persistent until dismissed, not valid, or the trigger is removed. New content that appears on hover and/or focus must remain visible until the pointer or keyboard focus is moved away from the triggering control, the new content is dismissed, or the new content is no longer relevant.",
      stepsToReproduce:
        "1. Trigger the appearance of the content.\n2. Notice that the revealed content eventually disappears without user action.",
      successCriteria: ["1.4.13"],
      title: "Hover or focus content disappears without user action",
      type: "web",
    },
    {
      bp: 2941,
      id: "response-pdf-graphical-object-contrast-insufficient",
      impact:
        "Users with low vision will have difficulty identifying this content.",
      issue:
        "There are graphical objects with a color contrast ratio below 3.00:1.\n\nForeground color: \nBackground color: \nContrast ratio: \n\nExamples include:\n- ",
      recommendation:
        "Ensure parts of graphical objects essential for understanding content have sufficient contrast. The required minimum contrast ratio is 3.00:1.\n\nCommon examples of qualifying objects include lines in a chart, meaningful icons, and annotations within an image.\n\nGraphics that require particular presentation to preserve their meaning are exempt from this requirement.\n\nTo calculate color contrast ratios, use a tool such as the Level Access Color Contrast Checker: https://www.levelaccess.com/color-contrast-checker-new/",
      successCriteria: ["1.4.11"],
      title: "Graphical object contrast insufficient",
      type: "pdf",
    },
    {
      bp: 2944,
      id: "response-android-graphical-object-contrast-insufficient",
      impact:
        "Users with low vision will have difficulty identifying this content.",
      issue:
        "There are graphical objects with a color contrast ratio below 3.00:1.\n\nForeground color: \nBackground color: \nContrast ratio: \n\nExamples include:\n- ",
      recommendation:
        "Ensure parts of graphical objects essential for understanding content have sufficient contrast. The required minimum contrast ratio is 3.00:1.\n\nCommon examples of qualifying objects include lines in a chart, meaningful icons, and annotations within an image.\n\nGraphics that require particular presentation to preserve their meaning are exempt from this requirement.\n\nTo calculate color contrast ratios, use a tool such as the Level Access Color Contrast Checker: https://www.levelaccess.com/color-contrast-checker-new/",
      stepsToReproduce:
        "1. Locate the graphic.\n2. Determine the graphic color and background color.\n3. Use a calculator such as https://www.levelaccess.com/color-contrast-checker-new/ to determine the contrast ratio.\n4. Notice that the contrast ratio is below 3.00:1.",
      successCriteria: ["1.4.11"],
      title: "Graphical object contrast insufficient",
      type: "android",
    },
    {
      bp: 2947,
      id: "response-ios-graphical-object-contrast-insufficient",
      impact:
        "Users with low vision will have difficulty identifying this content.",
      issue:
        "There are graphical objects with a color contrast ratio below 3.00:1.\n\nForeground color: \nBackground color: \nContrast ratio: \n\nExamples include:\n- ",
      recommendation:
        "Ensure parts of graphical objects essential for understanding content have sufficient contrast. The required minimum contrast ratio is 3.00:1.\n\nCommon examples of qualifying objects include lines in a chart, meaningful icons, and annotations within an image.\n\nGraphics that require particular presentation to preserve their meaning are exempt from this requirement.\n\nTo calculate color contrast ratios, use a tool such as the Level Access Color Contrast Checker: https://www.levelaccess.com/color-contrast-checker-new/",
      stepsToReproduce:
        "1. Locate the graphic.\n2. Determine the graphic color and background color.\n3. Use a calculator such as https://www.levelaccess.com/color-contrast-checker-new/ to determine the contrast ratio.\n4. Notice that the contrast ratio is below 3.00:1.",
      successCriteria: ["1.4.11"],
      title: "Graphical object contrast insufficient",
      type: "ios",
    },
    {
      bp: 2983,
      id: "response-pdf-label-in-name",
      impact:
        "Speech input users will have difficulty navigating to these controls.",
      issue:
        "There are controls with accessible names that do not include the text of their visual labels. Examples include:\n- ",
      recommendation:
        'Ensure the visible text label for a control is included in the control\'s accessible name.\n\nTo check the accessible name of form controls:\n1. Open the "Prepare Form" tools pane.\n2. Locate the field you want to add an accessible name to in the "FIELDS" section of the right-hand pane.\n3. Open the context menu (right-click) on the form field and choose "Properties."\n4. In the dialog that appears, review the "Tooltip" field. For text, dropdown, signature, and date fields, this field must contain the exact visible text of the field and any instructional text for that specific field, as well as any additional text needed to distinguish the field from other fields with the same name. For radio buttons, this field must contain the exact text of the grouping question for the radio buttons and not the text of the radio buttons themselves. For checkboxes, this must contain both the grouping question AND the visible text for the individual checkbox.\n5. If the form field is a radio button, go to the "Options" tab in the dialog. Review the contents of the "Radio Button Choice" field.\n\nTo check the accessible names of links:\n1. Locate the Link tag in the Tags panel.\n2. Open the context menu for the Link tag and select "Properties".\n3. Review the "Actual Text" and "Alternate Text" fields.',
      successCriteria: ["2.5.3"],
      title: "Accessible name does not include visible text",
      type: "pdf",
    },
    {
      bp: 2986,
      id: "response-android-label-in-name",
      impact:
        "Speech input users will have difficulty navigating to these controls.",
      issue:
        "There are controls with accessible names that do not include the text of their visual labels. Examples include:\n- ",
      recommendation:
        "Ensure the visible text label for a control is included in the control's accessible name. Alter the android:contentDescription attribute to include all of the visual text of the control.",
      stepsToReproduce:
        "1. Locate the control.\n2. Turn on TalkBack.\n3. Swipe right until the control is focused.\n4. Notice that TalkBack announces a name that does not include the visual label for the control.",
      successCriteria: ["2.5.3"],
      title: "Accessible name does not include visible text",
      type: "android",
    },
    {
      bp: 2989,
      id: "response-ios-label-in-name",
      impact:
        "Speech input users will have difficulty navigating to these controls.",
      issue:
        "There are controls with accessible names that do not include the text of their visual labels. Examples include:\n- ",
      recommendation:
        "Ensure the visible text label for a control is included in the control's accessible name. Alter the accessibilityLabel property to include all of the visual text of the control.",
      stepsToReproduce:
        "1. Locate the control.\n2. Turn on VoiceOver.\n3. Swipe right until the control is focused.\n4. Notice that VoiceOver announces a name that does not include the visual label for the control.",
      successCriteria: ["2.5.3"],
      title: "Accessible name does not include visible text",
      type: "ios",
    },
    {
      bp: 3067,
      id: "response-pdf-single-point-activation-cannot-be-cancelled",
      impact:
        "Users with disabilities may accidentally trigger mouse events with unwanted results.",
      issue:
        "There are controls that are triggered by the mousedown event. Examples include:\n- ",
      recommendation:
        "Ensure events triggered by single-point activation can be cancelled. Use the up event to reverse the down event effects if the user has moved off of the target area of the control, or do not rely on the down event for activation unless other up event functionality is essential. When completion of the event is on the up event, such as a drag, make sure users can abort or undo the action.",
      successCriteria: ["2.5.2"],
      title: "Single-point activation cannot be cancelled",
      type: "pdf",
    },
    {
      bp: 3112,
      id: "response-android-orientation",
      impact:
        "Users with a mounted device in a different orientation, such as some wheelchair users, will have difficulty viewing and interacting with the app.",
      issue: "The screen is restricted to portrait orientation.",
      recommendation:
        "Avoid restricting the operation or viewing of content in different display orientations. Reflow the content of the screen according to the orientation communicated by the OS.",
      stepsToReproduce:
        '1. Go to Settings > Display and ensure that "Auto-rotate screen" is toggled on.\n2. Rotate the device into landscape orientation.\n3. Return to the app.\n4. Notice that the app content does not rotate into landscape orientation.',
      successCriteria: ["1.3.4"],
      title: "Content restricted to one orientation",
      type: "android",
    },
    {
      bp: 3115,
      id: "response-ios-orientation",
      impact:
        "Users with a mounted device in a different orientation, such as some wheelchair users, will have difficulty viewing and interacting with the app.",
      issue: "The screen is restricted to portrait orientation.",
      recommendation:
        "Avoid restricting the operation or viewing of content in different display orientations. Reflow the content of the screen according to the orientation communicated by the OS.",
      stepsToReproduce:
        "1. Open Control Center by swiping down from the top-right corner.\n2. Ensure the Portrait Orientation Lock control is off.\n3. Rotate the device into landscape orientation.\n4. Open the app.\n5. Note that the app's content does not rotate into landscape orientation.",
      successCriteria: ["1.3.4"],
      title: "Content restricted to one orientation",
      type: "ios",
    },
    {
      bp: 3159,
      id: "response-no-keyboard-interactivity",
      impact:
        "Keyboard users will be prevented from accessing the functionality provided by these controls.",
      issue:
        "There are interactive controls that cannot be navigated to and/or operated with the keyboard alone. Examples include:\n- ",
      recommendation:
        'Ensure all interactive functionality is operable with the keyboard. The best way to accomplish this is by using appropriate native controls, which come with keyboard functionality built in.\n\nIf using a native control is not possible, the control must have tabindex="0" and have JavaScript event listeners that allow the control to be activated when Enter is pressed.',
      stepsToReproduce:
        "1. Press Tab repeatedly to navigate through the elements in the page.\n2. If the control can be focused, attempt to interact with the control using Enter, Space, Up/Down Arrow, and any other applicable keystrokes.\n3. Notice that the control cannot be focused or that the control cannot be interacted with using the keyboard alone.",
      successCriteria: ["2.1.1", "2.1.3"],
      title: "Keyboard interactive functionality",
      type: "web",
    },
    {
      bp: 3160,
      id: "response-pdf-text-resizing",
      impact:
        "Users with low vision who need to resize text will be prevented from accessing this content.",
      issue:
        "There is content that disappears, overlaps, or is cut off when viewing the page at 200% browser zoom. Examples include:\n- ",
      recommendation: "Ensure text can be resized to 200% of the default.",
      successCriteria: ["1.4.4"],
      title: "Text resizing",
      type: "pdf",
    },
    {
      bp: 3195,
      id: "response-live-captions-missing",
      impact:
        "Users who are deaf or hard of hearing will be prevented from accessing this content.",
      issue:
        "There are live videos with audio that have no captions. Examples include:\n- ",
      recommendation:
        "Provide synchronized captions for live video (which includes audio) or other multimedia. This includes all spoken language as well as music and sounds pertinent to the content of the video.",
      stepsToReproduce:
        "1. Locate the video.\n2. Notice that there are no captions.",
      successCriteria: ["1.2.4"],
      title: "Live captions missing",
      type: "web",
    },
    {
      bp: 3196,
      id: "response-android-implicit-heading",
      impact:
        "Screen reader users will have difficulty efficiently navigating the screen.",
      issue:
        "There is content that functions as a heading but is not marked as a heading. Examples include:\n- ",
      recommendation:
        'Ensure headings are denoted through structure and not implicitly. Set the android:accessibilityHeading attribute to "true" on elements meant to serve as headings.',
      stepsToReproduce:
        "1. Locate the text.\n2. Turn on TalkBack.\n3. Swipe right until the text is focused.\n4. Note that TalkBack does not announce the content as a heading.",
      successCriteria: ["1.3.1"],
      title: "Implicit headings",
      type: "android",
    },
    {
      bp: 3199,
      id: "response-pdf-focus-is-shifted-on-focus",
      impact:
        "Screen reader users and keyboard users will lose their spot on the page and may be prevented from accessing the information they intended.",
      issue:
        "There are elements that trigger a focus or context change as soon as they receive focus. Examples include:\n- ",
      recommendation:
        "Ensure event handlers that trigger context changes on focus are avoided. Do not shift focus after a control receives focus except when immediate user interaction is needed (such as time-based alerts).",
      successCriteria: ["3.2.1", "3.2.5"],
      title: "Focus is shifted on focus",
      type: "pdf",
    },
    {
      bp: 3206,
      id: "response-web-dragging-movements",
      impact:
        "Users with dexterity and mobility disabilities may be unable to perform dragging movements to use this functionality.",
      issue:
        "There is functionality that uses a dragging movement with no other single-pointer trigger. Examples include:\n- ",
      recommendation:
        "Ensure all functionality that uses a dragging movement can be operated by a single pointer without dragging. One way to meet this requirement is to require users to perform a series of single-pointer, non-path-based interactions instead of dragging. Keyboard alternatives are not sufficient to meet this requirement. Exceptions include freeform drawing or games that require dragging.",
      stepsToReproduce:
        "1. Locate the functionality.\n2. Note that it can only be performed by dragging.",
      successCriteria: ["2.5.7"],
      title: "Dragging movements",
      type: "web",
    },
    {
      bp: 3207,
      id: "response-web-target-minimum",
      impact:
        "Users with dexterity disabilities may be unable to activate these controls.",
      issue:
        "There are pointer targets that are too small. Examples include:\n- ",
      recommendation:
        'Provide a sufficient area for pointer targets. Pointer targets must have an area with a width and height of at least 24 CSS pixels. Exceptions include undersized targets for which one can place a 24 CSS pixel diameter circle on the center of the target\'s bounding box without intersecting with any other targets or circles of undersized targets. Additional exceptions include targets within a sentence or with a line height that is otherwise constrained by non-target text, targets that are controlled by the user agent and not modified by the author, targets with a presentation that is essential to convey accurate information, and targets with a presentation that is legally required.\n\nTo quickly determine whether a target is large enough or qualifies for exceptions, use the "Display a 24x24 rectangle cursor" bookmarklet: https://mraccess77.github.io/favlets/cursor.html',
      stepsToReproduce:
        "1. Turn on a bookmarklet to draw 24x24 circles on interactive controls, such as https://mraccess77.github.io/favlets/cursor.html\n2. Notice that the 24x24px circle for the control overlaps with the interactive area or 24x24px circle of another control.",
      successCriteria: ["2.5.8"],
      title: "Minimum target size",
      type: "web",
    },
    {
      bp: 3209,
      id: "response-web-consistent-help",
      impact:
        "Users with cognitive disabilities may be unable to find help with tasks on the website.",
      issue: "Help is not consistently located across a set of related pages.",
      recommendation:
        "Ensure that access to help is provided in the same relative order within a set of web pages. This applies to human contact details, such as an email, phone number, or hours of operation; human contact mechanisms, such as chat, contact forms, or social media; self-help options, such as FAQs or support pages; and fully automated contact mechanisms, such as chatbots. Common ways to meet this requirement include consistently putting links to help mechanisms in a footer, header, or navigation menu. Exceptions to this requirement include websites with no help, archival content, academic or certification testing applications, and non-web documents such as PDFs.",
      stepsToReproduce:
        "1. Locate where access to help is provided on the page.\n2. Notice that the location of this content differs on different pages.",
      successCriteria: ["3.2.6"],
      title: "Inconsistently located help",
      type: "web",
    },
    {
      bp: 3210,
      id: "response-web-pasting-disabled",
      impact:
        "Users with cognitive disabilities may be unable to manually transcribe their username, password, or MFA codes.",
      issue:
        "Username, password, and/or MFA fields in the authentication process do not allow pasting or autofill.",
      recommendation:
        "Ensure that each step in an authentication process does not rely on a cognitive function test or provides assistance. This applies to all steps in an authentication process, including multi-factor authentication (MFA). It also applies to email and password recovery processes.\n\nA common form of cognitive function test is transcription. This includes disabling pasting or autofill on username, password, and MFA fields, as it forces users to transcribe the values of these fields.\n\nTo resolve this issue, developers must enable the ability to paste or autofill into username, password, and MFA fields.",
      stepsToReproduce:
        "1. Locate the authentication process.\n2. Notice that the username, password, and/or MFA fields disable pasting or autofill.",
      successCriteria: ["3.3.8"],
      title: "Pasting disabled on username, password, or MFA fields",
      type: "web",
    },
    {
      bp: 3210,
      id: "response-web-cognitive-captcha",
      impact:
        "Users with cognitive disabilities may be unable to successfully solve the CAPTCHA in order to authenticate.",
      issue:
        "The authentication process requires a CAPTCHA that uses a non-exempt cognitive function test.",
      recommendation:
        "Ensure that each step in an authentication process does not rely on a cognitive function test or provides assistance. This applies to all steps in an authentication process, including multi-factor authentication (MFA). It also applies to email and password recovery processes.\n\nCommon examples of cognitive function tests include memorization, transcription, use of correct spelling, calculations, and puzzles. However, tests that require visual/audio object recognition and tests that require identification of user-supplied non-text content are exempt from this requirement.\n\nCommon examples of CAPTCHAs that do not meet these requirements include transcribing text from an image, transcribing text from spoken-word audio, rotating or moving an object until it is in its correct position, and solving math problems.\n\nEven if the site does not always present a CAPTCHA to the user during authentication, the CAPTCHA must conform to these requirements.\n\nCommon solutions include changing the CAPTCHA to use an exempt test or providing an alternative login method that never requires a CAPTCHA.Alternative, non-CAPTCHA login methods include authentication via emailed links, APIs such as WebAuthn that allow users to authenticate with a device instead of a username and password, or third-party logins such as OAuth.",
      stepsToReproduce:
        "1. Locate the authentication process.\n2. Notice that the process relies on a CAPTCHA that uses a non-exempt cognitive function test.",
      successCriteria: ["3.3.8"],
      title: "Authentication requires non-exempt CAPTCHA",
      type: "web",
    },
    {
      bp: 3211,
      id: "response-web-redundant-entry",
      impact:
        "Users with cognitive disabilities may be unable to remember information that they previously entered into the form, so they may be prevented from completing the form.",
      issue:
        "There are processes that require redundant entry of information. Examples include:\n- ",
      recommendation:
        "Provide support for redundant entry of information within a process unless re-entry is essential. Common ways to meet this requirement include automatically populating information based on earlier answers or presenting information from an earlier step so that users can copy-paste it. Browser autofill functionality is not sufficient to meet this requirement.\n\nExceptions include information entered in an earlier user session, password re-entry when creating a new password or for security purposes, and memory games. It is also acceptable to require redundant entry if the redundant information is in a different format, such as an uploaded document.",
      stepsToReproduce:
        "1. Locate the process.\n2. Notice that the process requires users to re-enter information they have already supplied.",
      successCriteria: ["3.3.7"],
      title: "Redundant entry required",
      type: "web",
    },
    {
      bp: 3224,
      id: "response-web-obscured-focused-element",
      impact:
        "Keyboard users will have difficulty finding their position on the page.",
      issue:
        "There are focused elements that are fully obscured by other content. Examples include:\n- ",
      recommendation:
        "Ensure keyboard-operable elements which receive focus are not fully obscured. Examples include focusable content behind sticky headers/footers and non-modal dialogs. This requirement applies to each page variation, such as responsive breakpoints.\n\nIf the interface allows the user to move elements, only the first positions of the movable content must meet this requirement. However, authors must ensure that the first positions do not fully obscure focused elements even if users can move or resize the obscuring element.\n\nWhen elements can receive focus behind non-modal content that can be opened/expanded over top of it, a method to dismiss that content without moving the keyboard focus needs to be provided.",
      stepsToReproduce:
        "1. Navigate through the controls on the page using the Tab and arrow keys.\n.2. Notice that some controls are fully obscured when they are focused with the keyboard.",
      successCriteria: ["2.4.11"],
      title: "Obscured focused element",
      type: "web",
    },
    {
      bp: 3285,
      id: "response-ios-obscured-focused-element",
      impact:
        "Keyboard users will have difficulty finding their position on the page.",
      issue:
        "There are focused elements that are fully obscured by other content. Examples include:\n- ",
      recommendation:
        "Ensure keyboard-operable elements which receive focus are not fully obscured. Examples include focusable content behind sticky headers/footers and non-modal dialogs.\n\nIf the interface allows the user to move elements, only the first positions of the movable content must meet this requirement. However, authors must ensure that the first positions do not fully obscure focused elements even if users can move or resize the obscuring element.\n\nWhen elements can receive focus behind non-modal content that can be opened/expanded over top of it, a method to dismiss that content without moving the keyboard focus needs to be provided.",
      stepsToReproduce:
        "1. Attach a keyboard to the device.\n2. Go to Settings > Accessibility > Keyboards > Full Keyboard Access and ensure that it is toggled on.\n3. Using the Tab and arrow keys, navigate through the controls on the screen.\n4. Notice that some elements are fully obscured when they are focused with the keyboard.",
      successCriteria: ["2.4.11"],
      title: "Obscured focused element",
      type: "ios",
    },
    {
      bp: 3293,
      id: "response-ios-target-minimum",
      impact:
        "Users with dexterity disabilities may be unable to activate these controls.",
      issue:
        "There are pointer targets that are too small. Examples include:\n- ",
      recommendation:
        "Provide a sufficient area for pointer targets. Pointer targets must have an area with a width and height of at least 24 pixels. Exceptions include undersized targets for which one can place a 24 pixel diameter circle on the center of the target's bounding box without intersecting with any other targets or circles of undersized targets. Additional exceptions include targets within a sentence or with a line height that is otherwise constrained by non-target text, targets that are controlled by the user agent and not modified by the author, targets with a presentation that is essential to convey accurate information, and targets with a presentation that is legally required.",
      stepsToReproduce:
        "1. Place an imaginary 24x24px circle on the center of all controls.\n2. Note that some of these circles overlap.",
      successCriteria: ["2.5.8"],
      title: "Minimum target size",
      type: "ios",
    },
    {
      bp: 3303,
      id: "response-pdf-target-minimum",
      impact:
        "Users with dexterity disabilities may be unable to activate these controls.",
      issue:
        "There are pointer targets that are too small. Examples include:\n- ",
      recommendation:
        "Provide a sufficient area for pointer targets. Pointer targets must have an area with a width and height of at least 24 pixels. Exceptions include undersized targets for which one can place a 24 pixel diameter circle on the center of the target's bounding box without intersecting with any other targets or circles of undersized targets. Additional exceptions include targets within a sentence or with a line height that is otherwise constrained by non-target text, targets that are controlled by the user agent and not modified by the author, targets with a presentation that is essential to convey accurate information, and targets with a presentation that is legally required.",
      successCriteria: ["2.5.8"],
      title: "Minimum target size",
      type: "pdf",
    },
  ];
  return preferred;
}

// Related to the data, this filters the preferred list
function dataPreferredFiltered(bp) {
  const preferred = dataPreferred();
  const output = [];

  if (bp) {
    preferred.forEach((boilerplate) => {
      if (boilerplate.bp === bp) {
        output.push(boilerplate);
      }
    });
  }

  return output;
}
function dataReading() {
  const reading = [
    {
      id: "reading-blank",
      title: "Blank",
      value: "",
    },
    {
      id: "reading-accordions",
      title: "Accordions",
      value:
        "For more information about creating accessible accordions, please see the W3C Web Accessibility Initiative's ARIA Authoring Practices Guide: https://www.w3.org/WAI/ARIA/apg/patterns/accordion/",
    },
    {
      id: "reading-audio-description",
      title: "Audio description",
      value:
        "For more information about audio description for videos, please see the W3C Web Accessibility Initiative website: https://www.w3.org/WAI/media/av/description/",
    },
    {
      id: "reading-breadcrumbs",
      title: "Breadcrumbs",
      value:
        "For more information about creating accessible breadcrumb navigation, please see the W3C Web Accessibility Initiative's ARIA Authoring Practices Guide: https://www.w3.org/WAI/ARIA/apg/patterns/breadcrumb/",
    },
    {
      id: "reading-captcha",
      title: "CAPTCHAs",
      value:
        "For more information about creating accessible CAPTCHAs and possible alternatives, please see the W3C website: https://www.w3.org/TR/turingtest/",
    },
    {
      id: "reading-captions",
      title: "Captions",
      value:
        "For more information about video captions, please see the W3C Web Accessibility Initiative website: https://www.w3.org/WAI/media/av/captions/",
    },
    {
      id: "reading-cards",
      title: "Cards",
      value:
        "For more information about creating accessible cards, please see the Inclusive Components website: https://inclusive-components.design/cards/",
    },
    {
      id: "reading-carousels",
      title: "Carousels",
      value:
        "For more information about creating accessible carousels, please see the W3C Web Accessibility Initiative website: https://www.w3.org/WAI/tutorials/carousels/",
    },
    {
      id: "reading-checkboxes",
      title: "Checkboxes",
      value:
        "For more information about creating accessible custom checkboxes, please see the W3C Web Accessibility Initiative's ARIA Authoring Practices Guide: https://www.w3.org/WAI/ARIA/apg/patterns/checkbox/",
    },
    {
      id: "reading-comboboxes",
      title: "Comboboxes",
      value:
        "For more information about creating accessible comboboxes, please see the W3C Web Accessibility Initiative's ARIA Authoring Practices Guide: https://www.w3.org/WAI/ARIA/apg/patterns/combobox/",
    },
    {
      id: "reading-complex-images",
      title: "Complex images",
      value:
        "For more information about describing complex images, please see the W3C Web Accessibility Initiative website: https://www.w3.org/WAI/tutorials/images/complex/",
    },
    {
      id: "reading-date-picker",
      title: "Date pickers",
      value:
        "For more information about creating accessible custom date pickers, please see the W3C Web Accessibility Initiative's ARIA Authoring Practices Guide: https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/examples/datepicker-dialog/",
    },
    {
      id: "reading-dialogs",
      title: "Dialogs",
      value:
        "For more information about creating accessible modal dialogs, please see the W3C Web Accessibility Initiative's ARIA Authoring Practices Guide: https://www.w3.org/WAI/ARIA/apg/patterns/dialogmodal/",
    },
    {
      id: "reading-errors",
      title: "Errors",
      value:
        "For more information on creating accessible error messages, please see the W3C Web Accessibility Initiative website: https://www.w3.org/WAI/tutorials/forms/notifications/",
    },
    {
      id: "reading-fieldsets",
      title: "Fieldsets",
      value:
        "For more information about using <fieldset> elements to group related form controls, please see the W3C Web Accessibility Initiative website: https://www.w3.org/WAI/tutorials/forms/grouping/",
    },
    {
      id: "reading-headings",
      title: "Headings",
      value:
        "For more information about creating accessible heading structures, please see the W3C Web Accessibility Initiative website: https://www.w3.org/WAI/tutorials/page-structure/headings/",
    },
    {
      id: "reading-images-of-text",
      title: "Images of text",
      value:
        "For more information about addressing images of text, please see the W3C Web Accessibility Initiative website: https://www.w3.org/WAI/tutorials/images/textual/",
    },
    {
      id: "reading-invalid-aria",
      title: "Invalid ARIA",
      value:
        "For more information about using ARIA attributes according to specification, please see our website: https://www.levelaccess.com/how-not-to-misuse-aria-states-properties-and-roles/",
    },
    {
      id: "reading-labeling-form-fields",
      title: "Labeling fields",
      value:
        "For more information about labeling form fields, please see the W3C Web Accessibility Initiative website: https://www.w3.org/WAI/tutorials/forms/labels/",
    },
    {
      id: "reading-labeling-regions",
      title: "Labeling regions",
      value:
        "For more information about labeling page regions, please see the W3C Web Accessibility Initiative website: https://www.w3.org/WAI/tutorials/page-structure/labels/",
    },
    {
      id: "reading-live-regions",
      title: "Live regions",
      value:
        "For more information about labeling page regions, please see the MDN Web Docs website: https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Live_Regions",
    },
    {
      id: "reading-menu-buttons",
      title: "Menu buttons",
      value:
        "For more information about creating accessible menu buttons, please see the W3C Web Accessibility Initiative website: https://www.w3.org/WAI/ARIA/apg/patterns/menu-button/",
    },
    {
      id: "reading-multi-thumb-sliders",
      title: "Multi-thumb sliders",
      value:
        "For more information about creating accessible multi-thumb sliders, please see the W3C Web Accessibility Initiative's ARIA Authoring Practices Guide: https://www.w3.org/WAI/ARIA/apg/patterns/slidertwothumb/",
    },
    {
      id: "reading-navigation-bar",
      title: "Navigation",
      value:
        "For more information about creating accessible navigation controls, please see the W3C Web Accessibility Initiative's ARIA Authoring Practices Guide: https://www.w3.org/WAI/ARIA/apg/example-index/disclosure/disclosure-navigation.html",
    },
    {
      id: "reading-radio-buttons",
      title: "Radio buttons",
      value:
        "For more information about creating accessible custom radio buttons, please see the W3C Web Accessibility Initiative's ARIA Authoring Practices Guide: https://www.w3.org/WAI/ARIA/apg/patterns/radiobutton/",
    },
    {
      id: "reading-selects",
      title: "Selects",
      value:
        "For more information about creating accessible custom <select> controls, please see the W3C Web Accessibility Initiative's ARIA Authoring Practices Guide: https://www.w3.org/WAI/ARIA/apg/example-index/combobox/combobox-select-only.html",
    },
    {
      id: "reading-show-hide",
      title: "Show/hide controls",
      value:
        "For more information about creating accessible show/hide controls, please see the W3C Web Accessibility Initiative's ARIA Authoring Practices Guide: https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/",
    },
    {
      id: "reading-spinbuttons",
      title: "Spinbuttons",
      value:
        "For more information about creating accessible spinbuttons, please see the W3C Web Accessibility Initiative's ARIA Authoring Practices Guide: https://www.w3.org/WAI/ARIA/apg/patterns/spinbutton/",
    },
    {
      id: "reading-star-ratings",
      title: "Star ratings",
      value:
        "For more information about creating accessible star rating controls, please see the W3C Web Accessibility Initiative website: https://www.w3.org/WAI/tutorials/forms/custom-controls/#a-star-rating",
    },
    {
      id: "reading-step-indicators",
      title: "Step indicators",
      value:
        "For more information about creating accessible step indicators, please see the W3C Web Accessibility Initiative website: https://www.w3.org/WAI/tutorials/forms/multi-page/#using-step-by-step-indicator",
    },
    {
      id: "reading-tables-general",
      title: "Tables - General",
      value:
        "For more information about creating accessible data tables, please see the W3C Web Accessibility Initiative website: https://www.w3.org/WAI/tutorials/tables/",
    },
    {
      id: "reading-tables-sortable",
      title: "Tables - Sortable",
      value:
        "For more information about creating accessible sortable tables, please see the W3C Web Accessibility Initiative's ARIA Authoring Practices Guide: https://www.w3.org/WAI/ARIA/apg/patterns/table/examples/sortable-table/",
    },
    {
      id: "reading-tabs",
      title: "Tabs",
      value:
        "For more information about creating accessible tab controls, please see the W3C Web Accessibility Initiative's ARIA Authoring Practices Guide: https://www.w3.org/WAI/ARIA/apg/patterns/tabpanel/",
    },
    {
      id: "reading-toggles-switches",
      title: "Toggles/switches",
      value:
        "For more information about creating accessible toggles, please see the Inclusive Components website: https://inclusive-components.design/toggle-button/",
    },
    {
      id: "reading-toggletips",
      title: "Toggletips",
      value:
        "For more information about creating accessible toggletips, please see the Inclusive Components website: https://inclusive-components.design/tooltips-toggletips/#inclusivetoggletips",
    },
    {
      id: "reading-toolbars",
      title: "Toolbars",
      value:
        "For more information about creating accessible toolbars, please see the W3C Web Accessibility Initiative's ARIA Authoring Practices Guide: https://www.w3.org/WAI/ARIA/apg/patterns/toolbar/",
    },
    {
      id: "reading-tooltips",
      title: "Tooltips",
      value:
        "For more information about creating accessible tooltips, please see the Inclusive Components website: https://inclusive-components.design/tooltips-toggletips/#inclusivetooltips",
    },
    {
      id: "reading-tree-views",
      title: "Tree views",
      value:
        "For more information about creating accessible tree views, please see the W3C Web Accessibility Initiative's ARIA Authoring Practices Guide: https://www.w3.org/WAI/ARIA/apg/patterns/treeview/",
    },
  ];
  return reading;
}
function dataReviews() {
  const reviews = [
    {
      date: "name",
      div: "Reviews",
      id: "reviews-inQA",
      title: "Under Review",
      var1: "in_qa",
    },
    {
      id: "reviews-clearQA",
      title: "Updated",
      var1: "in_qa",
    },
    {
      id: "reviews-completeQA",
      title: "Complete",
      var1: "new",
    },
    {
      date: "name",
      id: "reviews-missingQA",
      title: "Missing or Unidentified Violation",
      var1: "in_qa",
    },
    {
      date: "name",
      id: "reviews-snippetQA",
      title: "Code snippet length too long",
      var1: "in_qa",
    },
    {
      date: "name",
      id: "reviews-cceMissingQA",
      title: "Compliant Code Example or Recommendation Missing (Web Only)",
      var1: "in_qa",
    },
    {
      date: "name",
      id: "reviews-cceNotRequiredQA",
      title: "Compliant Code Example Not Required (Mobile Only)",
      var1: "in_qa",
    },
    {
      date: "name",
      id: "reviews-meaningQA",
      title: "Issue does not make sense",
      var1: "in_qa",
    },
    {
      date: "name",
      id: "reviews-misalignmentQA",
      title: "Issue Misalignment - Success Criteria or Best Practice",
      var1: "in_qa",
    },
    {
      date: "name",
      id: "reviews-notIssueQA",
      title: "Not an Issue, removal required",
      var1: "in_qa",
    },
    {
      date: "name",
      id: "reviews-patternWrongQA",
      title: "Pattern incorrectly used",
      var1: "in_qa",
    },
    {
      date: "name",
      id: "reviews-recommendationBadQA",
      title: "Recommendation does not make sense",
      var1: "in_qa",
    },
    {
      date: "name",
      id: "reviews-sillyQA",
      title: "Silly Mistake",
      var1: "in_qa",
    },
    {
      date: "name",
      id: "reviews-typosQA",
      title: "Typo or Grammar Issue",
      var1: "in_qa",
    },
    {
      date: "name",
      id: "reviews-ucResultQA",
      title: "Use case result issue missing",
      var1: "in_qa",
    },
    {
      date: "name",
      id: "reviews-questionForPT",
      title: "Question for PT",
      var1: "in_qa",
    },
  ];
  return reviews;
}
function dataSchemas() {
  return new Map([
    [
      "adobe",
      {
        description: [
          {
            appearsByDefault: true,
            instructions: "",
            mapsTo: [],
            name: "SUMMARY - Bug title for Jira.",
            requiredToExist: true,
            requiredToHaveCode: false,
            requiredToHaveContent: true,
          },
          {
            appearsByDefault: true,
            instructions: "",
            mapsTo: [],
            name: "CONTEXT - Keep one or customize. Enter your actual versions numbers.",
            requiredToExist: true,
            requiredToHaveCode: false,
            requiredToHaveContent: true,
          },
          {
            appearsByDefault: true,
            instructions: "",
            mapsTo: ["stepsToReproduce"],
            name: "STEPS TO REPRODUCE - Keep one or customize. Enter your actual versions numbers.",
            requiredToExist: true,
            requiredToHaveCode: false,
            requiredToHaveContent: true,
          },
          {
            appearsByDefault: true,
            instructions: "",
            mapsTo: ["issue", "impact"],
            name: "ACTUAL BEHAVIOR - Required. Examples or non-compliant code is optional.",
            requiredToExist: true,
            requiredToHaveCode: false,
            requiredToHaveContent: true,
          },
          {
            appearsByDefault: true,
            instructions: "",
            mapsTo: [],
            name: "AFFECTED POPULATIONS - Optional. Only if different from default FPC.",
            requiredToExist: true,
            requiredToHaveCode: false,
            requiredToHaveContent: false,
          },
          {
            appearsByDefault: true,
            instructions: "",
            mapsTo: ["successCriteria"],
            name: "WCAG PRIMARY SC - Required. Use the SC the issue should be identified under in an ACR.",
            requiredToExist: true,
            requiredToHaveCode: false,
            requiredToHaveContent: false,
          },
          {
            appearsByDefault: true,
            instructions: "",
            mapsTo: [],
            name: "WCAG RELATED - Optional. Use sparingly.",
            requiredToExist: true,
            requiredToHaveCode: false,
            requiredToHaveContent: false,
          },
          {
            appearsByDefault: true,
            instructions: "",
            mapsTo: [],
            name: "SCREENSHOT(S) - Optional. Use when it's the easiest way to explain.",
            requiredToExist: true,
            requiredToHaveCode: false,
            requiredToHaveContent: false,
          },
        ],
        note: [
          {
            appearsByDefault: true,
            instructions: "",
            mapsTo: ["recommendation"],
            name: "EXPECTED BEHAVIOR - Description is required. Compliant code is optional.",
            requiredToExist: true,
            requiredToHaveCode: false,
            requiredToHaveContent: true,
          },
          {
            appearsByDefault: true,
            instructions: "",
            mapsTo: [],
            name: "ADDITIONAL INFORMATION - Optional link to a resource. Use sparingly.",
            requiredToExist: true,
            requiredToHaveCode: false,
            requiredToHaveContent: false,
          },
        ],
        thumbnail: {
          required: false,
        },
      },
    ],
    [
      "disney",
      {
        description: [
          {
            appearsByDefault: true,
            instructions: "",
            mapsTo: [],
            name: "Type: *** DEV/DESIGN ***",
            requiredToExist: false,
            requiredToHaveCode: false,
            requiredToHaveContent: false,
          },
          {
            appearsByDefault: true,
            instructions: "",
            mapsTo: ["successCriteria"],
            name: "WCAG Requirement",
            requiredToExist: true,
            requiredToHaveCode: false,
            requiredToHaveContent: true,
          },
          {
            appearsByDefault: true,
            instructions: "",
            mapsTo: [],
            name: "Test URL",
            requiredToExist: true,
            requiredToHaveCode: false,
            requiredToHaveContent: true,
          },
          {
            appearsByDefault: true,
            instructions: "",
            mapsTo: ["issue"],
            name: "Issue",
            requiredToExist: true,
            requiredToHaveCode: false,
            requiredToHaveContent: true,
          },
          {
            appearsByDefault: true,
            instructions: "",
            mapsTo: ["stepsToReproduce"],
            name: "Steps to Reproduce",
            requiredToExist: true,
            requiredToHaveCode: false,
            requiredToHaveContent: true,
          },
          {
            appearsByDefault: true,
            instructions: "",
            mapsTo: ["impact"],
            name: "User Impact",
            requiredToExist: true,
            requiredToHaveCode: false,
            requiredToHaveContent: true,
          },
          {
            appearsByDefault: true,
            instructions: "",
            mapsTo: ["codeReference"],
            name: "Code Reference",
            requiredToExist: true,
            requiredToHaveCode: true,
            requiredToHaveContent: true,
          },
        ],
        note: [
          {
            appearsByDefault: true,
            instructions: "",
            mapsTo: ["recommendation"],
            name: "Recommendation",
            requiredToExist: true,
            requiredToHaveCode: false,
            requiredToHaveContent: true,
          },
          {
            appearsByDefault: true,
            instructions: "",
            mapsTo: ["compliantExample"],
            name: "Compliant Code Example",
            requiredToExist: false,
            requiredToHaveCode: true,
            requiredToHaveContent: true,
          },
        ],
        thumbnail: {
          required: false,
        },
      },
    ],

    [
      "pdf-software",
      {
        description: [
          {
            appearsByDefault: true,
            instructions: "",
            mapsTo: ["issue"],
            name: "Issue",
            requiredToExist: true,
            requiredToHaveCode: false,
            requiredToHaveContent: true,
          },
          {
            appearsByDefault: true,
            instructions: "",
            mapsTo: ["impact"],
            name: "User Impact",
            requiredToExist: true,
            requiredToHaveCode: false,
            requiredToHaveContent: true,
          },
        ],
        note: [
          {
            appearsByDefault: true,
            instructions: "",
            mapsTo: ["recommendation"],
            name: "Recommendation",
            requiredToExist: true,
            requiredToHaveCode: false,
            requiredToHaveContent: true,
          },
        ],
        thumbnail: {
          required: false,
        },
      },
    ],
    [
      "pod-web",
      {
        description: [
          {
            appearsByDefault: true,
            instructions: "",
            mapsTo: ["issue"],
            name: "Issue",
            requiredToExist: true,
            requiredToHaveCode: false,
            requiredToHaveContent: true,
          },
          {
            appearsByDefault: true,
            instructions: "",
            mapsTo: ["impact"],
            name: "User Impact",
            requiredToExist: true,
            requiredToHaveCode: false,
            requiredToHaveContent: true,
          },
          {
            appearsByDefault: true,
            instructions: "",
            mapsTo: ["codeReference"],
            name: "Code Reference",
            requiredToExist: false,
            requiredToHaveCode: true,
            requiredToHaveContent: true,
          },
          {
            appearsByDefault: true,
            instructions: "",
            mapsTo: ["stepsToReproduce"],
            name: "Steps to Reproduce",
            requiredToExist: true,
            requiredToHaveCode: false,
            requiredToHaveContent: true,
          },
        ],
        note: [
          {
            appearsByDefault: true,
            instructions: "",
            mapsTo: ["recommendation"],
            name: "Recommendation",
            requiredToExist: true,
            requiredToHaveCode: false,
            requiredToHaveContent: true,
          },
          {
            appearsByDefault: true,
            instructions: "",
            mapsTo: ["compliantExample"],
            name: "Compliant Code Example",
            requiredToExist: false,
            requiredToHaveCode: true,
            requiredToHaveContent: true,
          },
        ],
        thumbnail: {
          required: true,
        },
      },
    ],
    [
      "pod-mobile",
      {
        description: [
          {
            appearsByDefault: true,
            instructions: "",
            mapsTo: ["issue"],
            name: "Issue",
            requiredToExist: true,
            requiredToHaveCode: false,
            requiredToHaveContent: true,
          },
          {
            appearsByDefault: true,
            instructions: "",
            mapsTo: ["impact"],
            name: "User Impact",
            requiredToExist: true,
            requiredToHaveCode: false,
            requiredToHaveContent: true,
          },
          {
            appearsByDefault: true,
            instructions: "",
            mapsTo: ["stepsToReproduce"],
            name: "Steps to Reproduce",
            requiredToExist: true,
            requiredToHaveCode: false,
            requiredToHaveContent: true,
          },
        ],
        note: [
          {
            appearsByDefault: true,
            instructions: "",
            mapsTo: ["recommendation"],
            name: "Recommendation",
            requiredToExist: true,
            requiredToHaveCode: false,
            requiredToHaveContent: true,
          },
        ],
        thumbnail: {
          required: true,
        },
      },
    ],
    [
      "progressiveAPQ",
      {
        description: [
          {
            appearsByDefault: true,
            instructions:
              "** When using AMPScript template text, be sure to make the issue description specific, and include ALL instances that you observe on the page **",
            mapsTo: ["issue"],
            name: "Issue",
            requiredToExist: true,
            requiredToHaveCode: false,
            requiredToHaveContent: true,
          },
          {
            appearsByDefault: true,
            instructions: "",
            mapsTo: ["impact"],
            name: "User Impact",
            requiredToExist: true,
            requiredToHaveCode: false,
            requiredToHaveContent: true,
          },
          {
            appearsByDefault: true,
            instructions:
              "** Describe how a developer can reproduce the issue, including whether to use ANDI, JAWS, or some other tool. **",
            mapsTo: ["stepsToReproduce"],
            name: "Steps to Reproduce",
            requiredToExist: true,
            requiredToHaveCode: false,
            requiredToHaveContent: true,
          },
          {
            appearsByDefault: true,
            instructions:
              "** Pick only one:\nManually detected violation\nGuided Automatic (with Manual Review) violation\nAutomatically detected violation\n**",
            mapsTo: [],
            name: "Type",
            requiredToExist: true,
            requiredToHaveCode: false,
            requiredToHaveContent: true,
          },
          {
            appearsByDefault: true,
            instructions: "",
            mapsTo: ["codeReference"],
            name: "Code Reference",
            requiredToExist: false,
            requiredToHaveCode: true,
            requiredToHaveContent: true,
          },
        ],
        note: [
          {
            appearsByDefault: true,
            instructions: "",
            mapsTo: ["recommendation"],
            name: "Recommendation",
            requiredToExist: true,
            requiredToHaveCode: false,
            requiredToHaveContent: true,
          },
          {
            appearsByDefault: true,
            instructions: "",
            mapsTo: ["compliantExample"],
            name: "Compliant Code Example",
            requiredToExist: false,
            requiredToHaveCode: true,
            requiredToHaveContent: true,
          },
        ],
        thumbnail: {
          required: false,
        },
      },
    ],
    [
      "progressiveDQ",
      {
        description: [
          {
            appearsByDefault: true,
            instructions:
              "** When using AMPScript template text, be sure to make the issue description specific, and include ALL instances that you observe on the page **",
            mapsTo: ["issue"],
            name: "Issue",
            requiredToExist: true,
            requiredToHaveCode: false,
            requiredToHaveContent: true,
          },
          {
            appearsByDefault: true,
            instructions: "",
            mapsTo: ["impact"],
            name: "User Impact",
            requiredToExist: true,
            requiredToHaveCode: false,
            requiredToHaveContent: true,
          },
          {
            appearsByDefault: true,
            instructions:
              "** Describe how a developer can reproduce the issue, including whether to use ANDI, JAWS, or some other tool. **",
            mapsTo: ["stepsToReproduce"],
            name: "Steps to Reproduce",
            requiredToExist: true,
            requiredToHaveCode: false,
            requiredToHaveContent: true,
          },
          {
            appearsByDefault: true,
            instructions:
              "** Pick only one:\nManually detected violation\nGuided Automatic (with Manual Review) violation\nAutomatically detected violation\n**",
            mapsTo: [],
            name: "Type",
            requiredToExist: true,
            requiredToHaveCode: false,
            requiredToHaveContent: true,
          },
          {
            appearsByDefault: true,
            instructions:
              "** Pick one or more (but this whole section can be omitted for desktop-only issues):\niOS with Safari browser\nAndroid with Chrome browser\nWindows with Chrome browser\n**",
            mapsTo: [],
            name: "Platform",
            requiredToExist: false,
            requiredToHaveCode: false,
            requiredToHaveContent: true,
          },
          {
            appearsByDefault: true,
            instructions: "",
            mapsTo: ["codeReference"],
            name: "Code Reference",
            requiredToExist: false,
            requiredToHaveCode: true,
            requiredToHaveContent: true,
          },
        ],
        note: [
          {
            appearsByDefault: true,
            instructions: "",
            mapsTo: ["recommendation"],
            name: "Recommendation",
            requiredToExist: true,
            requiredToHaveCode: false,
            requiredToHaveContent: true,
          },
          {
            appearsByDefault: true,
            instructions: "",
            mapsTo: ["compliantExample"],
            name: "Compliant Code Example",
            requiredToExist: false,
            requiredToHaveCode: true,
            requiredToHaveContent: true,
          },
        ],
        thumbnail: {
          required: false,
        },
      },
    ],
    [
      "salesforce",
      {
        description: [
          {
            appearsByDefault: true,
            instructions: "",
            mapsTo: ["issue"],
            name: "Issue",
            requiredToExist: true,
            requiredToHaveCode: false,
            requiredToHaveContent: true,
          },
          {
            appearsByDefault: true,
            instructions: "",
            mapsTo: ["impact"],
            name: "User Impact",
            requiredToExist: true,
            requiredToHaveCode: false,
            requiredToHaveContent: true,
          },
          {
            appearsByDefault: true,
            instructions: "",
            mapsTo: [],
            name: "Salesforce Prioritization",
            requiredToExist: true,
            requiredToHaveCode: false,
            requiredToHaveContent: true,
          },
          {
            appearsByDefault: true,
            instructions:
              "** Provide 'X' if issue affects screen reader. Otherwise, leave empty. **",
            mapsTo: [],
            name: "Screen Reader",
            requiredToExist: true,
            requiredToHaveCode: false,
            requiredToHaveContent: false,
          },
          {
            appearsByDefault: true,
            instructions:
              "** Provide 'X' if issue is not Advisory. Otherwise, leave empty. **",
            mapsTo: [],
            name: "Include in ACR",
            requiredToExist: true,
            requiredToHaveCode: false,
            requiredToHaveContent: false,
          },
          {
            appearsByDefault: true,
            instructions: "",
            mapsTo: [],
            name: "Image File - Optional. Use when it's the easiest way to explain.",
            requiredToExist: true,
            requiredToHaveCode: false,
            requiredToHaveContent: false,
          },
          {
            appearsByDefault: true,
            instructions: "",
            mapsTo: ["codeReference"],
            name: "Code Reference",
            requiredToExist: false,
            requiredToHaveCode: true,
            requiredToHaveContent: true,
          },
          {
            appearsByDefault: true,
            instructions: "",
            mapsTo: ["successCriteria"],
            name: "WCAG Success Criteria",
            requiredToExist: true,
            requiredToHaveCode: false,
            requiredToHaveContent: true,
          },
          {
            appearsByDefault: true,
            instructions: "",
            mapsTo: ["salesforceStandard"],
            name: "WCAG Standard",
            requiredToExist: true,
            requiredToHaveCode: false,
            requiredToHaveContent: true,
          },
        ],
        note: [
          {
            appearsByDefault: true,
            instructions: "",
            mapsTo: ["recommendation"],
            name: "Recommendation",
            requiredToExist: true,
            requiredToHaveCode: false,
            requiredToHaveContent: true,
          },
          {
            appearsByDefault: true,
            instructions: "",
            mapsTo: ["compliantExample"],
            name: "Compliant Code Example",
            requiredToExist: false,
            requiredToHaveCode: true,
            requiredToHaveContent: true,
          },
        ],
        thumbnail: {
          required: false,
        },
      },
    ],
    [
      "thomsonReuters",
      {
        description: [
          {
            appearsByDefault: true,
            instructions: "",
            mapsTo: ["successCriteria"],
            name: "WCAG",
            requiredToExist: true,
            requiredToHaveCode: false,
            requiredToHaveContent: true,
          },
          {
            appearsByDefault: true,
            instructions: "",
            mapsTo: [],
            name: "Title",
            requiredToExist: true,
            requiredToHaveCode: false,
            requiredToHaveContent: true,
          },
          {
            appearsByDefault: true,
            instructions: "",
            mapsTo: ["issue"],
            name: "Issue",
            requiredToExist: true,
            requiredToHaveCode: false,
            requiredToHaveContent: true,
          },
          {
            appearsByDefault: true,
            instructions: "",
            mapsTo: ["impact"],
            name: "User Impact",
            requiredToExist: true,
            requiredToHaveCode: false,
            requiredToHaveContent: true,
          },
          {
            appearsByDefault: true,
            instructions: "",
            mapsTo: ["codeReference"],
            name: "Code Reference",
            requiredToExist: false,
            requiredToHaveCode: true,
            requiredToHaveContent: true,
          },
          {
            appearsByDefault: true,
            instructions: "",
            mapsTo: ["stepsToReproduce"],
            name: "Steps to Reproduce",
            requiredToExist: true,
            requiredToHaveCode: false,
            requiredToHaveContent: true,
          },
        ],
        note: [
          {
            appearsByDefault: true,
            instructions: "",
            mapsTo: ["recommendation"],
            name: "Recommendation",
            requiredToExist: true,
            requiredToHaveCode: false,
            requiredToHaveContent: true,
          },
          {
            appearsByDefault: true,
            instructions: "",
            mapsTo: [""],
            name: "Screencast",
            requiredToExist: true,
            requiredToHaveCode: false,
            requiredToHaveContent: true,
          },
          {
            appearsByDefault: true,
            instructions: "",
            mapsTo: ["compliantExample"],
            name: "Compliant Code Example",
            requiredToExist: false,
            requiredToHaveCode: true,
            requiredToHaveContent: true,
          },
        ],
        thumbnail: {
          required: false,
        },
      },
    ],
    [
      "wellsFargo",
      {
        description: [
          {
            appearsByDefault: true,
            instructions: "**ADA_ One line, reasonably specific**",
            mapsTo: [],
            name: "Summary",
            requiredToExist: true,
            requiredToHaveCode: false,
            requiredToHaveContent: true,
          },
          {
            appearsByDefault: true,
            instructions:
              "**Describe the problem or symptom, the User Impact, and sufficient info about how to reproduce.**",
            mapsTo: ["issue", "impact", "stepsToReproduce"],
            name: "Issue Description",
            requiredToExist: true,
            requiredToHaveCode: false,
            requiredToHaveContent: true,
          },
          {
            appearsByDefault: true,
            instructions: "****",
            mapsTo: [],
            name: "Devices",
            requiredToExist: true,
            requiredToHaveCode: false,
            requiredToHaveContent: true,
          },
          {
            appearsByDefault: true,
            instructions:
              '**Optional or type "None". Avoid lengthy blocks. Newlines and indentation spaces will be stripped.**',
            mapsTo: ["codeReference"],
            name: "Non-Compliant Example",
            requiredToExist: false,
            requiredToHaveCode: true,
            requiredToHaveContent: false,
          },
          {
            appearsByDefault: true,
            instructions: "",
            mapsTo: ["type"],
            name: "Defect Grade",
            requiredToExist: false,
            requiredToHaveCode: false,
            requiredToHaveContent: false,
          },
        ],
        note: [
          {
            appearsByDefault: true,
            instructions: "",
            mapsTo: ["recommendation"],
            name: "Recommendation",
            requiredToExist: true,
            requiredToHaveCode: false,
            requiredToHaveContent: true,
          },
          {
            appearsByDefault: true,
            instructions:
              '**Optional or type "None". Avoid lengthy blocks. Newlines and indentation spaces will be stripped.**',
            mapsTo: ["compliantExample"],
            name: "Compliant Example",
            requiredToExist: false,
            requiredToHaveCode: true,
            requiredToHaveContent: false,
          },
          {
            appearsByDefault: true,
            instructions: '**Optional or type "None"**',
            mapsTo: [],
            name: "Recommended Reading",
            requiredToExist: false,
            requiredToHaveCode: false,
            requiredToHaveContent: true,
          },
        ],
        thumbnail: {
          required: false,
        },
      },
    ],
    [
      "default",
      {
        description: [
          {
            appearsByDefault: true,
            instructions: "",
            mapsTo: ["issue"],
            name: "Issue",
            requiredToExist: true,
            requiredToHaveCode: false,
            requiredToHaveContent: true,
          },
          {
            appearsByDefault: true,
            instructions: "",
            mapsTo: ["impact"],
            name: "User Impact",
            requiredToExist: true,
            requiredToHaveCode: false,
            requiredToHaveContent: true,
          },
          {
            appearsByDefault: true,
            instructions: "",
            mapsTo: ["codeReference"],
            name: "Code Reference",
            requiredToExist: false,
            requiredToHaveCode: true,
            requiredToHaveContent: true,
          },
        ],
        note: [
          {
            appearsByDefault: true,
            instructions: "",
            mapsTo: ["recommendation"],
            name: "Recommendation",
            requiredToExist: true,
            requiredToHaveCode: false,
            requiredToHaveContent: true,
          },
          {
            appearsByDefault: true,
            instructions: "",
            mapsTo: ["compliantExample"],
            name: "Compliant Code Example",
            requiredToExist: false,
            requiredToHaveCode: true,
            requiredToHaveContent: true,
          },
          {
            appearsByDefault: false,
            instructions: "",
            mapsTo: [],
            name: "Recommended Reading",
            requiredToExist: false,
            requiredToHaveCode: false,
            requiredToHaveContent: true,
          },
        ],
        thumbnail: {
          required: false,
        },
      },
    ],
  ]);
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
function dataStatus() {
  const status = [
    {
      div: "Pattern",
      id: "code-pattern",
      title: "Pattern",
    },
    {
      id: "extras-Occurrences",
      title: "Occurrences",
      var1: "Occurrences",
    },
    {
      date: "no",
      div: "Status",
      id: "status-advisory",
      title: "Advisory",
    },
    {
      id: "status-fixed",
      title: "Fixed",
      var1: "fixed",
    },
    {
      id: "status-not-fixed",
      title: "Not Fixed",
      var1: "failed_retesting",
    },
    {
      id: "status-new",
      title: "New",
      var1: "new",
    },
    {
      id: "status-not",
      title: "Not Retested",
      var1: "needs_retesting",
    },
    {
      date: "no",
      div: "Work In Progress",
      id: "status-wip",
      title: "WIP",
    },
    {
      date: "name",
      id: "status-wipName",
      title: "WIP - Name",
    },
    {
      div: "Special",
      id: "current-date",
      loc: "1",
      title: "[DATE]",
      var1: "[DATE]",
    },
    {
      id: "code-modIns",
      title: "Module/Instance",
    },
    {
      id: "special-typeDev",
      loc: "1",
      title: "Type: DEV",
      var1: "Type: DEV",
    },
    {
      id: "special-typeDes",
      loc: "1",
      title: "Type: DESIGN",
      var1: "Type: DESIGN",
    },
    {
      id: "status-wcag-a",
      title: "WCAG: A",
    },
    {
      id: "status-wcag-aa",
      title: "WCAG: AA",
    },
    {
      id: "status-wcag-aaa",
      title: "WCAG: AAA",
    },
  ];
  return status;
}
function dataSuccessCriteria() {
  const sc = [
    {
      level: "A",
      name: "Non-text Content",
      number: "1.1.1",
      version: "2.0",
    },
    {
      level: "A",
      name: "Audio-only and Video-only (Prerecorded)",
      number: "1.2.1",
      version: "2.0",
    },
    {
      level: "A",
      name: "Captions (Prerecorded)",
      number: "1.2.2",
      version: "2.0",
    },
    {
      level: "A",
      name: "Audio Description or Media Alternative (Prerecorded)",
      number: "1.2.3",
      version: "2.0",
    },
    {
      level: "AA",
      name: "Captions (Live)",
      number: "1.2.4",
      version: "2.0",
    },
    {
      level: "AA",
      name: "Audio Description (Prerecorded)",
      number: "1.2.5",
      version: "2.0",
    },
    {
      level: "AAA",
      name: "Sign Language (Prerecorded)",
      number: "1.2.6",
      version: "2.0",
    },
    {
      level: "AAA",
      name: "Extended Audio Description (Prerecorded)",
      number: "1.2.7",
      version: "2.0",
    },
    {
      level: "AAA",
      name: "Media Alternative (Prerecorded)",
      number: "1.2.8",
      version: "2.0",
    },
    {
      level: "AAA",
      name: "Audio-only (Live)",
      number: "1.2.9",
      version: "2.0",
    },
    {
      level: "A",
      name: "Info and Relationships",
      number: "1.3.1",
      version: "2.0",
    },
    {
      level: "A",
      name: "Meaningful Sequence",
      number: "1.3.2",
      version: "2.0",
    },
    {
      level: "A",
      name: "Sensory Characteristics",
      number: "1.3.3",
      version: "2.0",
    },
    {
      level: "AA",
      name: "Orientation",
      number: "1.3.4",
      version: "2.1",
    },
    {
      level: "AA",
      name: "Identify Input Purpose",
      number: "1.3.5",
      version: "2.1",
    },
    {
      level: "AAA",
      name: "Identify Purpose",
      number: "1.3.6",
      version: "2.1",
    },
    {
      level: "A",
      name: "Use of Color",
      number: "1.4.1",
      version: "2.0",
    },
    {
      level: "A",
      name: "Audio Control",
      number: "1.4.2",
      version: "2.0",
    },
    {
      level: "AA",
      name: "Contrast (Minimum)",
      number: "1.4.3",
      version: "2.0",
    },
    {
      level: "AA",
      name: "Resize Text",
      number: "1.4.4",
      version: "2.0",
    },
    {
      level: "AA",
      name: "Images of Text",
      number: "1.4.5",
      version: "2.0",
    },
    {
      level: "AAA",
      name: "Contrast (Enhanced)",
      number: "1.4.6",
      version: "2.0",
    },
    {
      level: "AAA",
      name: "Low or No Background Audio",
      number: "1.4.7",
      version: "2.0",
    },
    {
      level: "AAA",
      name: "Visual Presentation",
      number: "1.4.8",
      version: "2.0",
    },
    {
      level: "AAA",
      name: "Images of Text (No Exception)",
      number: "1.4.9",
      version: "2.0",
    },
    {
      level: "AA",
      name: "Reflow",
      number: "1.4.10",
      version: "2.1",
    },
    {
      level: "AA",
      name: "Non-text Contrast",
      number: "1.4.11",
      version: "2.1",
    },
    {
      level: "AA",
      name: "Text Spacing",
      number: "1.4.12",
      version: "2.1",
    },
    {
      level: "AA",
      name: "Content on Hover or Focus",
      number: "1.4.13",
      version: "2.1",
    },
    {
      level: "A",
      name: "Keyboard",
      number: "2.1.1",
      version: "2.0",
    },
    {
      level: "A",
      name: "No Keyboard Trap",
      number: "2.1.2",
      version: "2.0",
    },
    {
      level: "AAA",
      name: "Keyboard (No Exception)",
      number: "2.1.3",
      version: "2.0",
    },
    {
      level: "A",
      name: "Character Key Shortcuts",
      number: "2.1.4",
      version: "2.1",
    },
    {
      level: "A",
      name: "Timing Adjustable",
      number: "2.2.1",
      version: "2.0",
    },
    {
      level: "A",
      name: "Pause, Stop, Hide",
      number: "2.2.2",
      version: "2.0",
    },
    {
      level: "AAA",
      name: "No Timing",
      number: "2.2.3",
      version: "2.0",
    },
    {
      level: "AAA",
      name: "Interruptions",
      number: "2.2.4",
      version: "2.0",
    },
    {
      level: "AAA",
      name: "Re-authenticating",
      number: "2.2.5",
      version: "2.0",
    },
    {
      level: "AAA",
      name: "Timeouts",
      number: "2.2.6",
      version: "2.1",
    },
    {
      level: "A",
      name: "Three Flashes or Below Threshold",
      number: "2.3.1",
      version: "2.0",
    },
    {
      level: "AAA",
      name: "Three Flashes",
      number: "2.3.2",
      version: "2.0",
    },
    {
      level: "AAA",
      name: "Animation from Interactions",
      number: "2.3.3",
      version: "2.1",
    },
    {
      level: "A",
      name: "Bypass Blocks",
      number: "2.4.1",
      version: "2.0",
    },
    {
      level: "A",
      name: "Page Titled",
      number: "2.4.2",
      version: "2.0",
    },
    {
      level: "A",
      name: "Focus Order",
      number: "2.4.3",
      version: "2.0",
    },
    {
      level: "A",
      name: "Link Purpose (In Context)",
      number: "2.4.4",
      version: "2.0",
    },
    {
      level: "AA",
      name: "Multiple Ways",
      number: "2.4.5",
      version: "2.0",
    },
    {
      level: "AA",
      name: "Headings and Labels",
      number: "2.4.6",
      version: "2.0",
    },
    {
      level: "AA",
      name: "Focus Visible",
      number: "2.4.7",
      version: "2.0",
    },
    {
      level: "AAA",
      name: "Location",
      number: "2.4.8",
      version: "2.0",
    },
    {
      level: "AAA",
      name: "Link Purpose (Link Only)",
      number: "2.4.9",
      version: "2.0",
    },
    {
      level: "AAA",
      name: "Section Headings",
      number: "2.4.10",
      version: "2.0",
    },
    {
      level: "AA",
      name: "Focus Not Obscured (Minimum)",
      number: "2.4.11",
      version: "2.2",
    },
    {
      level: "AAA",
      name: "Focus Not Obscured (Enhanced)",
      number: "2.4.12",
      version: "2.2",
    },
    {
      level: "AAA",
      name: "Focus Appearance",
      number: "2.4.13",
      version: "2.2",
    },
    {
      level: "A",
      name: "Pointer Gestures",
      number: "2.5.1",
      version: "2.1",
    },
    {
      level: "A",
      name: "Pointer Cancellation",
      number: "2.5.2",
      version: "2.1",
    },
    {
      level: "A",
      name: "Label in Name",
      number: "2.5.3",
      version: "2.1",
    },
    {
      level: "A",
      name: "Motion Actuation",
      number: "2.5.4",
      version: "2.1",
    },
    {
      level: "AAA",
      name: "Target Size (Enhanced)",
      number: "2.5.5",
      version: "2.1",
    },
    {
      level: "AAA",
      name: "Concurrent Input Mechanisms",
      number: "2.5.6",
      version: "2.1",
    },
    {
      level: "AA",
      name: "Dragging Movements",
      number: "2.5.7",
      version: "2.2",
    },
    {
      level: "AA",
      name: "Target Size (Minimum)",
      number: "2.5.8",
      version: "2.2",
    },
    {
      level: "A",
      name: "Language of Page",
      number: "3.1.1",
      version: "2.0",
    },
    {
      level: "AA",
      name: "Language of Parts",
      number: "3.1.2",
      version: "2.0",
    },
    {
      level: "AAA",
      name: "Unusual Words",
      number: "3.1.3",
      version: "2.0",
    },
    {
      level: "AAA",
      name: "Abbreviations",
      number: "3.1.4",
      version: "2.0",
    },
    {
      level: "AAA",
      name: "Reading Level",
      number: "3.1.5",
      version: "2.0",
    },
    {
      level: "AAA",
      name: "Pronunciation",
      number: "3.1.6",
      version: "2.0",
    },
    {
      level: "A",
      name: "On Focus",
      number: "3.2.1",
      version: "2.0",
    },
    {
      level: "A",
      name: "On Input",
      number: "3.2.2",
      version: "2.0",
    },
    {
      level: "AA",
      name: "Consistent Navigation",
      number: "3.2.3",
      version: "2.0",
    },
    {
      level: "AA",
      name: "Consistent Identification",
      number: "3.2.4",
      version: "2.0",
    },
    {
      level: "AAA",
      name: "Change on Request",
      number: "3.2.5",
      version: "2.0",
    },
    {
      level: "A",
      name: "Consistent Help",
      number: "3.2.6",
      version: "2.2",
    },
    {
      level: "A",
      name: "Error Identification",
      number: "3.3.1",
      version: "2.0",
    },
    {
      level: "A",
      name: "Labels or Instructions",
      number: "3.3.2",
      version: "2.0",
    },
    {
      level: "AA",
      name: "Error Suggestion",
      number: "3.3.3",
      version: "2.0",
    },
    {
      level: "AA",
      name: "Error Prevention (Legal, Financial, Data)",
      number: "3.3.4",
      version: "2.0",
    },
    {
      level: "AAA",
      name: "Help",
      number: "3.3.5",
      version: "2.0",
    },
    {
      level: "AAA",
      name: "Error Prevention (All)",
      number: "3.3.6",
      version: "2.0",
    },
    {
      level: "A",
      name: "Redundant Entry",
      number: "3.3.7",
      version: "2.2",
    },
    {
      level: "AA",
      name: "Accessible Authentication (Minimum)",
      number: "3.3.8",
      version: "2.2",
    },
    {
      level: "AAA",
      name: "Accessible Authentication (Enhanced)",
      number: "3.3.9",
      version: "2.2",
    },
    {
      level: "A",
      name: "Parsing",
      number: "4.1.1",
      version: "2.0",
    },
    {
      level: "A",
      name: "Name, Role, Value",
      number: "4.1.2",
      version: "2.0",
    },
    {
      level: "AA",
      name: "Status Messages",
      number: "4.1.3",
      version: "2.1",
    },
  ];
  return sc;
}
/* Experimental stuff I am working on */

// EXPERIMENTAL: use Ajax to grab something from another page
function ajaxCall(url, css) {
  let output = "";
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
  let thisID = "";
  let givenURL = sPageURL;
  if (givenURL.search(sKey) < 0 && $(`a[href*='${sKey}']`)) {
    givenURL = $(`a[href*='${sKey}']:last`).attr("href");
  }
  const urlParam = (name) => {
    const results = new RegExp(`[?&]${name}=([^&#]*)`).exec(givenURL);
    if (results) {
      return results[1] ?? 0;
    }
    return 0;
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
  if (b) {
    return b.pop();
  }
  return "";
}

// TOOL: Simple function for hiding elements based on CSS declaration.
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

/* GLOBALS: Things that appear on every page */

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

function getSchema() {
  const schemaMap = dataSchemas();
  let currentSchema = {};
  if (getCookieValue("kpmCustom-custom-adobe")) {
    currentSchema = schemaMap.get("adobe");
  } else if (getCookieValue("kpmCustom-custom-disney")) {
    currentSchema = schemaMap.get("disney");
  } else if (getCookieValue("kpmCustom-custom-pdf")) {
    currentSchema = schemaMap.get("pdf-software");
  } else if (getCookieValue("kpmCustom-custom-pod-web")) {
    currentSchema = schemaMap.get("pod-web");
  } else if (getCookieValue("kpmCustom-custom-pod-mobile")) {
    currentSchema = schemaMap.get("pod-mobile");
  } else if (getCookieValue("kpmCustom-custom-progressive-apq")) {
    currentSchema = schemaMap.get("progressiveAPQ");
  } else if (getCookieValue("kpmCustom-custom-progressive-dq-inc-mobile")) {
    currentSchema = schemaMap.get("progressiveDQ");
  } else if (getCookieValue("kpmCustom-custom-salesforce")) {
    currentSchema = schemaMap.get("salesforce");
  } else if (getCookieValue("kpmCustom-custom-thomsonReuters")) {
    currentSchema = schemaMap.get("thomsonReuters");
  } else if (getCookieValue("kpmCustom-custom-wf")) {
    currentSchema = schemaMap.get("wellsFargo");
  } else {
    currentSchema = schemaMap.get("default");
  }
  return currentSchema;
}

function mapifyDescNote(rawString) {
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

function injectProblems(element, type) {
  const currentSchema = getSchema();
  const problemContainer = document.createElement("div");

  if (type === "best practice") {
    /* BEST PRACTICE ERROR HANDLING
    /* Check if there are any warnings associated with this BP */
    const bpLink = element.querySelector("[onclick^='modal_best_practice']");
    const nonBaselineBPs = dataNonBaselineBPs();
    const bpId = bpLink.getAttribute("onclick").split(", ")?.at(1);

    let warning = "";
    nonBaselineBPs.forEach((nonBaselineBP) => {
      if (bpId === nonBaselineBP.id) {
        warning = nonBaselineBP.note;
      }
    });

    // If there are, then inject a warning below the BP's table header
    if (warning) {
      const problemContents = `<p class="kpmWarning">Warning: This is not a <a href='https://academy.levelaccess.com/learn/learning-path/baseline-testing-methodology'>Baseline best practice</a>. ${warning}`;
      problemContainer.innerHTML = problemContents;
      element.append(problemContainer);
    }
  } else if (type === "description" || type === "note") {
    /* DESCRIPTION/NOTE ERROR HANDLING
    /* Generate a Map of the sections */
    const sectionMap = mapifyDescNote(element.textContent);

    // Detect errors, using the Map to simplify things
    const badCodeStrings = dataErrors();
    const badSiteStrings = dataBadSites();
    const errorArray = [];
    let schemaSections = {};
    if (type === "description") {
      schemaSections = currentSchema.description;
    } else if (type === "note") {
      schemaSections = currentSchema.note;
    }
    const sectionsRequiredToExist =
      schemaSections.filter((section) => section.requiredToExist) ?? [];
    const sectionsRequiredToHaveContent =
      schemaSections.filter((section) => section.requiredToHaveContent) ?? [];
    const sectionsRequiredToHaveCode =
      schemaSections.filter((section) => section.requiredToHaveCode) ?? [];

    // Detect any missing required sections
    sectionsRequiredToExist.forEach((section) => {
      if (!sectionMap.has(section.name)) {
        errorArray.push(
          `Error: Required section [${section.name}] was not found. Please add this section or double-check its spelling.`
        );
      }
    });

    sectionMap.forEach((sectionContents, sectionName) => {
      // Detect any empty sections that are required to have content
      if (
        sectionsRequiredToHaveContent.find(
          (section) => section.name === sectionName
        )
      ) {
        if (sectionContents === "") {
          errorArray.push(
            `Error: [${sectionName}] appears to be empty. Please add content in this section.`
          );
        }
      }

      // Detect any code sections that don't contain code
      if (
        sectionsRequiredToHaveCode.find(
          (section) => section.name === sectionName
        )
      ) {
        if (!sectionContents.match(/[<>{}]|(\/\*)|(\*\/)|^N\/A|^None|^$/gmu)) {
          errorArray.push(
            `Error: [${sectionName}] does not appear to contain code. Please ensure HTML or CSS code is present or put "N/A".`
          );
        }

        // Detect code sections that contain disallowed code strings
        badCodeStrings.forEach((badString) => {
          if (sectionContents.includes(badString.css)) {
            errorArray.push(
              `Error: [${sectionName}] contains ${badString.css} attribute injected by ${badString.cause}. Please remove this attribute.`
            );
          }
        });
      }

      // Detect any content that contains links to disallowed resources
      badSiteStrings.forEach((badString) => {
        if (sectionContents.includes(badString.url)) {
          errorArray.push(
            `Error: [${sectionName}] contains ${badString.reason} site ${badString.url}. Please change or remove this link.`
          );
        }
      });

      // Detect remnant instructions from client-specific templates
      if (sectionContents.includes("**")) {
        errorArray.push(
          `Error: [${sectionName}] contains two asterisks in a row (**). This is usually from instructions in client-specific custom issue formats. Please make sure these instructions are removed if present.`
        );
      }

      if (
        sectionContents.at(-1) === ":" ||
        sectionContents.match(/^-\s*$/gmu)
      ) {
        errorArray.push(
          `Error: Content appears to be missing in [${sectionName}].`
        );
      }
    });

    // Inject the error array into the problem container
    let concatenatedErrors = "";
    errorArray.forEach((error) => {
      const errorString = `<p class="kpmAlert">${error}</p>`;
      concatenatedErrors += errorString;
    });
    problemContainer.innerHTML = concatenatedErrors;
    element.prepend(problemContainer);
  } else if (type === "thumbnail" && currentSchema.thumbnail.required) {
    // Check if it contains an image; if so, add error
    if (
      !(
        element.innerHTML.includes("<img") ||
        element.innerHTML.includes('role="img"')
      )
    ) {
      const errorContents =
        "<p class='kpmAlert'>Error: This issue appears to be missing a screenshot. Please add one.</p>";
      problemContainer.innerHTML = errorContents;
      element.prepend(problemContainer);
    }
  } else if (type === "module name") {
    // Check if it contains special characters
    const specialCharacters = dataSpecialCharacters();
    let hasSpecialCharacters = false;
    specialCharacters.forEach((specialCharacter) => {
      if (element.innerText.includes(specialCharacter.id)) {
        hasSpecialCharacters = true;
      }
    });

    // If so, inject an error
    if (hasSpecialCharacters) {
      const errorContents =
        "<p class='kpmAlert'>Error: This text appears to contain special or escaped characters. Please edit the module and remove them.</p>";
      problemContainer.innerHTML = errorContents;
      element.appendChild(problemContainer);
    }
  }
}

// MULTI PAGE: Function for building the best practice buttons
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
  customOptions.forEach((customOption) => {
    const currentID = `kpmCustom-${customOption.id}`;
    const cbCookie = getCookieValue(currentID);
    selectCustom += `<li><a href='#' id='kpmCustom-${customOption.id}'>${customOption.name}`;
    if (cbCookie) {
      selectCustom += " [Custom Selected]";
    }
    selectCustom += "</a></li>";
  });

  selectCustom +=
    '</ul><p>Post in <a href=\'https://level-access.slack.com/messages/CK79W4PPU/\'>the Level Access #as-access-companion Slack channel</a> if you have any other custom formatting needs.</p><br /><p><strong>New</strong>: <a href="#" id="kpmViewAll">View all preferred responses.</a></p>';

  const prefTable = document.createElement("table");
  prefTable.setAttribute("role", "presentation");
  const prefTR = document.createElement("tr");
  const prefTD1 = document.createElement("td");
  const prefTD3 = document.createElement("td");
  const prefTD4 = document.createElement("td");
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
      "Hides the fields added February 2019 such as 'Content Identifier' and 'User Impact'"
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
      "In the patterns edit, globals are hidden"
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
  $("td img").each((index, element) => {
    const thisImage = $(element);
    const altText = thisImage.attr("alt");
    const imgP = document.createElement("p");
    const imgTxt = document.createTextNode(`ALT: ${escapeHtml(altText)}`);
    imgP.className = "kpmAlt";
    imgP.appendChild(imgTxt);
    thisImage.after(imgP);
  });
}

// MULTI PAGE: Show TITLE on <div> elements that are background images (Like viewAltText function above)
function viewDivAltText() {
  $("div [class='thumbnail']").each((index, element) => {
    const thisTD = $(element);
    const thisTitle = $(element).attr("title");
    thisTD.after(`<p class="kpmAlt">ALT: ${escapeHtml(thisTitle)}</p>`);
  });
}

// MULTI PAGE: Create dialog to replace alert() and similar

function createDialog(title, description) {
  const dialog = document.createElement("dialog");
  dialog.innerHTML = `<h2>${title}</h2><p>${description}</p><form method='dialog'><button>OK</button></form>`;
  document.body.append(dialog);
  return dialog;
}

// MULTI PAGE: Add links for Best Practices
function bestPracticeLinks() {
  $("a[onclick^='modal_best_practice']").each((index, element) => {
    const EditPattern = $(element);
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
      const copyDialog = createDialog(
        "Success",
        `Copied Best Practice URL\n\n${completeURL}`
      );
      copyDialog.showModal();
      const temp = $("<input>").val(completeURL).appendTo("body").select();
      document.execCommand("copy");
      temp.remove();
    });
  });
}

/* Client View specific functions */

// CLIENT VIEW: The whole list of hidden elements for client view.
function clientHide() {
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

  li.forEach((item) => {
    hideElement(item, "li");
  });

  td.forEach((cell) => {
    hideElement(cell, "td");
  });

  th.forEach((header) => {
    hideElement(header, "th");
  });

  none.forEach((item) => {
    hideElement(item);
  });
}

/* Format the element
   Note that custom template *instructions* that need to be removed by the tester
     must have "**" at the start of a line (i.e. "\n**"), and then finish
     with "**" (the "**" at the end can either be on the same line as the start,
     or on a different line). */
function formatDescription(boilerplate) {
  let output = "";
  const currentSchema = getSchema();
  const descriptionSchema = currentSchema.description;

  descriptionSchema.forEach((schemaSection) => {
    // Only add the section if it's marked to include by default
    if (schemaSection.appearsByDefault) {
      output += `[${schemaSection.name}]\n`;
      if (schemaSection.instructions) {
        output += `${schemaSection.instructions}\n\n`;
      }

      // If the section maps to any boilerplate sections, add them all
      if (schemaSection.mapsTo.length > 0) {
        let concatenatedBoilerplate = "";
        schemaSection.mapsTo.forEach((mappedBoilerplateSection) => {
          const boilerplateSectionContents =
            boilerplate[mappedBoilerplateSection];
          if (boilerplateSectionContents) {
            concatenatedBoilerplate += boilerplate[mappedBoilerplateSection];
          }
          concatenatedBoilerplate += "\n\n";
        });
        output += concatenatedBoilerplate;
      }
      output = output.trim();
      output += "\n\n";
    }
  });

  output = output.trim();
  return output;
}

// Format the attribute
function formatNote(boilerplate) {
  let output = "";
  const currentSchema = getSchema();
  const noteSchema = currentSchema.note;

  noteSchema.forEach((schemaSection) => {
    if (schemaSection.appearsByDefault) {
      output += `[${schemaSection.name}]\n`;
      if (schemaSection.instructions) {
        output += `${schemaSection.instructions}\n\n`;
      }

      if (schemaSection.mapsTo.length > 0) {
        let concatenatedBoilerplate = "";
        schemaSection.mapsTo.forEach((mappedBoilerplateSection) => {
          const boilerplateSectionContents =
            boilerplate[mappedBoilerplateSection];
          if (boilerplateSectionContents) {
            concatenatedBoilerplate += boilerplate[mappedBoilerplateSection];
          }
          concatenatedBoilerplate += "\n\n";
        });
        output += concatenatedBoilerplate;
      }

      output = output.trim();
      output += "\n\n";
    }
  });

  /* Boilerplate modifications for specific clients. Please use sparingly.
   * Creating a schema should be sufficient for most clients. */
  if (
    getCookieValue("kpmCustom-custom-progressive-apq") ||
    getCookieValue("kpmCustom-custom-progressive-dq-inc-mobile")
  ) {
    output = output.replace(
      "\n\n[Compliant Code Example]",
      "\n\n** When using AMPScript template text here, be sure that the recommendation is specific, usually by editing the following line: **\n\nIn this case, {designers OR developers} must ...\n\n[Compliant Code Example]"
    );
  }

  output = output.trim();
  return output;
}

function listAllResponses(array) {
  let output = '<div id="kpmAllResponsesPage"><h1>All Responses</h1>';

  array.sort((o1, o2) => o1.title.localeCompare(o2.title));

  array.forEach((item) => {
    const tempElement = escapeHtml(formatDescription(item));
    const tempAttribute = escapeHtml(formatNote(item));

    output += `<h2>${item.title}: `;
    output += item.bp;
    output +=
      '<span style="float: right;">[ <a href="#" onclick="window.location.reload();">Close</a> ]</span></h2>';
    output += "<h3>Element</h3>";
    output += `<code>${tempElement}</code>`;
    output += "<h3>Attribute</h3>";
    output += `<code>${tempAttribute}</code>`;
  });

  output += "</div>";
  return output;
}

function handleOrganizationFilterForm(reportID) {
  let organizationFilterFormFirstOpen = true;
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

// Colorize rows based on status message that was inserted
function retestColor() {
  $("td:has(pre) pre")
    .add("td:has(span) span")
    .each((index, element) => {
      const thisTD = $(element);
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
        const number00 = thisTD.closest("tr").children("td").length;
        thisTD
          .closest("tr")
          .before(
            `<tr><td colspan="${number00}" style="background-color: #BF590F; color: #ffffff; text-align: center; font-weight: bold;">Code Snippet Error</td></th>`
          );
      }

      if (thisTD.text().split("]")[0].indexOf("MOBILE ONLY") >= 0) {
        const number00 = thisTD.closest("tr").children("td").length;
        thisTD
          .closest("tr")
          .before(
            `<tr><td colspan="${number00}" style="background-color: #BF590F; color: #ffffff; text-align: center; font-weight: bold;">Compliant Code Example Not Required (Mobile Only)</td></th>`
          );
      }

      if (thisTD.text().split("]")[0].indexOf("WEB ONLY") >= 0) {
        const number00 = thisTD.closest("tr").children("td").length;
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
        const number00 = thisTD.closest("tr").children("td").length;
        thisTD
          .closest("tr")
          .before(
            `<tr><td colspan="${number00}" style="background-color: #BF590F; color: #ffffff; text-align: center; font-weight: bold;">Missing or Unidentified Violation</td></th>`
          );
      }

      if (
        thisTD.text().split("]")[0].indexOf("ISSUE DOES NOT MAKE SENSE") >= 0
      ) {
        const number00 = thisTD.closest("tr").children("td").length;
        thisTD
          .closest("tr")
          .before(
            `<tr><td colspan="${number00}" style="background-color: #BF590F; color: #ffffff; text-align: center; font-weight: bold;">Issue does not make sense</td></th>`
          );
      }
      if (thisTD.text().split("]")[0].indexOf("ISSUE MISALIGNMENT") >= 0) {
        const number00 = thisTD.closest("tr").children("td").length;
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
        const number00 = thisTD.closest("tr").children("td").length;
        thisTD
          .closest("tr")
          .before(
            `<tr><td colspan="${number00}" style="background-color: #BF590F; color: #ffffff; text-align: center; font-weight: bold;">Not an Issue</td></th>`
          );
      }

      if (
        thisTD.text().split("]")[0].indexOf("PATTERN INCORRECTLY USED") >= 0
      ) {
        const number00 = thisTD.closest("tr").children("td").length;
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
        const number00 = thisTD.closest("tr").children("td").length;
        thisTD
          .closest("tr")
          .before(
            `<tr><td colspan="${number00}" style="background-color: #BF590F; color: #ffffff; text-align: center; font-weight: bold;">Recommendation does not make sense</td></th>`
          );
      }

      if (thisTD.text().split("]")[0].indexOf("SILLY MISTAKE") >= 0) {
        const number00 = thisTD.closest("tr").children("td").length;
        thisTD
          .closest("tr")
          .before(
            `<tr><td colspan="${number00}" style="background-color: #BF590F; color: #ffffff; text-align: center; font-weight: bold;">Silly Mistake</td></th>`
          );
      }

      if (thisTD.text().split("]")[0].indexOf("TYPO OR GRAMMAR ISSUE") >= 0) {
        const number00 = thisTD.closest("tr").children("td").length;
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
        const number00 = thisTD.closest("tr").children("td").length;
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

      if (thisTD.text().split("]")[0].indexOf("QUESTION FOR PT") >= 0) {
        const number2 = thisTD.closest("tr").children("td").length;
        thisTD
          .closest("tr")
          .before(
            `<tr><td colspan="${number2}" style="background-color: #673ab7; color: #ffffff; text-align: center; font-weight: bold;">QUESTION FOR PT</td></th>`
          );
      }
    });
}
/* Add Instance (Modal) Specific Functions */

// ADD INSTANCE: Function for creating the dropdowns.
function createList2(array, name, id) {
  let output = "";
  if (array.length > 0) {
    output += `<li id="${id}"><a href="#" aria-haspopup="true">${name} <span class="fas fa-angle-down" title="${array.length}"></span></a>`;
    output += '<ul class="dropdown">';
    array.forEach((item) => {
      const li = "<li>";
      if (item.div) {
        output += `<li class='divider'>${item.div}</li>`;
      }
      output += `${li}<a href="#" id='${item.id}'>${item.title}</a></li>`;
    });
    output += "</ul></li>";
  }
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
function bestPracticeList2(elements) {
  // Get all the currently displayed best practices and turn them into an array
  const bpList = [];
  let category = "";
  $(elements).each((index, element) => {
    const myOpt = $(element);
    const myOptValue = myOpt.attr("value");
    const myOptText = myOpt.text().trim();
    if (myOptValue !== "" && myOptValue > "0") {
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
  const newList = [];
  let newCategory = "";
  $.each(bpList, (index, element) => {
    let myText = "";
    if (getCookieValue("kpmPref-bpListCompact")) {
      // MyText = document.createTextNode();
      myText = `${element.Category}: ${element.Text}`;
    } else {
      if (element.Category && newCategory !== element.Category) {
        const catOption = document.createElement("option");
        const catText = document.createTextNode(element.Category);
        catOption.appendChild(catText);
        newList.push(catOption);
        newCategory = element.Category;
      }
      // MyText = document.createTextNode("* " + element.Text);
      myText = `* ${element.Text}`;
    }
    const newOption = document.createElement("option");
    // NewOption.appendChild(myText);
    newOption.value = myText;
    newOption.setAttribute("data-value", element.Value);
    newOption.setAttribute("data-text", element.Text.trim());
    newOption.title = element.Category;
    newList.push(newOption);
  });
  return newList;
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
function createAddInstanceButtons(preferred, status, reading, code, reviews) {
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
  createButtons += createList2(reading, "Reading", "kpmReading");
  createButtons += createList2(code, "Code", "kpmCode");
  createButtons += createList2(status, "Specials", "kpmSpecials");
  createButtons += createList2(reviews, "Reviews", "kpmReviews");
  createButtons += "</ul></nav>";

  customFormat.forEach((item) => {
    if (getCookieValue(`kpmCustom-${item.id}`)) {
      createButtons += `<p style='clear:both;margin:0; padding:0;'><strong>Note</strong>: Custom formatting applied - ${item.name}</p>`;
    }
  });
  return createButtons;
}

function convertColorContrastTextFromAE(noteTextFromAE) {
  // Var colorContrastRE = /This (\w+) contains text with a background color of (#[0-9a-fA-F]+) (rgb\(\d+, \d+, d+\)) and foreground color of (#[0-9a-fA-F]+) (rgb\(\d+, \d+, d+\)) that is (less than 18 point in size; or bold text less than 14 point in size) that has a luminosity contrast ratio of ([0-9\.]+), which is below (0-9\.]+:1)/
  const bgColorRE = /background color of (#[0-9a-fA-F]+)/;
  const fgColorRE = /foreground color of (#[0-9a-fA-F]+)/;
  const contrastRatioRE = /contrast ratio of ([0-9\.]{1,4})/;
  const requiredRatioRE = /([0-9\.])+:1/;
  let colorContrastTextAll = "";

  if (noteTextFromAE && typeof noteTextFromAE === "string") {
    const fgColorExists = noteTextFromAE.match(fgColorRE);
    const bgColorExists = noteTextFromAE.match(bgColorRE);
    const contrastRatioExists = noteTextFromAE.match(contrastRatioRE);
    const requiredRatioExists = noteTextFromAE.match(requiredRatioRE);

    let fgColor = "";
    if (fgColorExists) {
      fgColor = fgColorExists[1].toUpperCase();
    }

    let bgColor = "";
    if (bgColorExists) {
      bgColor = bgColorExists[1].toUpperCase();
    }

    let contrastRatio = "";
    if (contrastRatioExists) {
      contrastRatio = contrastRatioExists[1];
    }

    let requiredRatio = "";
    if (requiredRatioExists) {
      requiredRatio = parseFloat(requiredRatioExists[0]).toFixed(2);
    }

    if (fgColor && bgColor && contrastRatio && requiredRatio) {
      colorContrastTextAll =
        `\n\n` +
        `Foreground color: ${fgColor}\n` +
        `Background color: ${bgColor}\n` +
        `Contrast ratio: ${contrastRatio}:1` +
        `\n` +
        `Required contrast ratio for this content: ${requiredRatio}:1`;
    }
  }
  return colorContrastTextAll;
}

function stripAngularFeatures(codeText) {
  let editedText = codeText;
  if (editedText) {
    editedText = editedText.replaceAll(/ _ngcontent\-\w+\-\w+\=\"\"/g, "");
    editedText = editedText.replaceAll(/ _nghost\-\w+\-\w+\=\"\"/g, "");
    editedText = editedText.replaceAll(/\<\!\-\-\-\-\>/g, "");
  }

  return codeText;
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
      $("#ajax_submit").on("click", () => {
        setTimeOut($(`#${instanceID}`).focus(), 1000);
      });
    }

    const currentID = parseInt(
      $("[id*='violation_']").children("option:selected").attr("value"),
      10
    );

    // Place the buttons
    $("#AmpOpts").after(
      createAddInstanceButtons(
        dataPreferredFiltered(currentID),
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
        $(`#AmpOpts option[value="${inputValue}"]`).attr("data-value"),
        10
      );

      if (newBP && newBP > 0) {
        $("select[id*='violation_']:first").val(newBP);
        const BPValue = 0;
        $("select[id*='severity_']:first").val(BPValue).val();
        const newPreferredListList = dataPreferredFiltered(newBP);
        if (newPreferredListList.length > 0) {
          $("#kpmPreferred").replaceWith(
            createList2(newPreferredListList, "Preferred", "kpmPreferred")
          );
        }
      } else {
        const bpDialog = createDialog("Error", "No Best Practice Selected");
        bpDialog.showModal();
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
        const bpDialog = createDialog("Error", "No Best Practice Selected");
        bpDialog.showModal();
      }
    });

    // Two single use statuses - Blank and clear everything
    $("#addLangBlank").on("click", () => {
      let origVal = $("textarea[id*='element']:first").val();
      let newText = formatDescription({});
      if (
        getCookieValue("kpmCustom-custom-progressive-apq") ||
        getCookieValue("kpmCustom-custom-progressive-dq-inc-mobile")
      ) {
        origVal = stripAngularFeatures(origVal);
      }
      newText += origVal;
      const origVal2 = $("textarea[id*='attribute']:first")
        .add("textarea[id*='note']:first")
        .val();
      let newText2 = formatNote({});
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

    // INJECT BOILERPLATE
    // When a response is given, this fills in the fields.
    $("body").delegate("[id*='response-']", "click", async (event) => {
      const clickID = $(event.target).attr("id");
      const responses = dataPreferred();
      const boilerplate = responses.find((e) => e.id === clickID);
      const currentSchema = getSchema();
      const descriptionTextarea = document.querySelector(
        "textarea[id*='element']"
      );
      const previousDescription = descriptionTextarea.value;
      const previousMap = mapifyDescNote(previousDescription);

      // ISSUE SECTION MODIFICATIONS
      // Inject formatted color contrast information.
      if (boilerplate.convertColorContrastText) {
        const oldVar2 = $("textarea[id*='attribute']:first")
          .add("textarea[id*='note']:first")
          .val();

        const colorContrastStats = convertColorContrastTextFromAE(oldVar2);

        if (colorContrastStats) {
          const issueLines = boilerplate.issue.split("\n\n");
          boilerplate.issue = `${issueLines[0] + colorContrastStats}\n\n${
            issueLines[2]
          }`;
        }
      }

      // Change some wording for Progressive.
      if (
        getCookieValue("kpmCustom-custom-progressive-apq") ||
        getCookieValue("kpmCustom-custom-progressive-dq-inc-mobile")
      ) {
        boilerplate.issue = boilerplate.issue.replaceAll(
          "Examples include:",
          "Specific instances are:"
        );
      }

      // Customize steps to reproduce for Disney
      if (getCookieValue("kpmCustom-custom-disney")) {
        /* If JAWS functional steps to reproduce exist, then replace the normal 
          steps to reproduce with the JAWS ones. */
        if (boilerplate.jawsFunctionalSteps) {
          boilerplate.stepsToReproduce = boilerplate.jawsFunctionalSteps;
        } else {
          /* Otherwise, keep the existing steps to reproduce, but add some 
             extra wording. */
          boilerplate.stepsToReproduce += "\nExpected result:\nActual result:";
        }
      }

      // CODE REFERENCE SECTION MODIFICATIONS
      // Extract any existing code reference from the description
      boilerplate.codeReference = "";
      // If the map exists, then this issue already has boilerplate
      if (previousMap.size > 0) {
        // Get the code reference section
        const codeReferenceSections = currentSchema.description.filter(
          (section) => section.mapsTo.includes("codeReference")
        );

        // If any code reference sections exist...
        if (codeReferenceSections.length > 0) {
          // Search the old description map to get the existing code reference
          boilerplate.codeReference = previousMap.get(
            codeReferenceSections[0].name
          );
        }
      } else {
        /* Otherwise, it doesn't have any boilerplate.
           It's either empty or has an existing code reference, so just reuse 
           the original description.*/
        boilerplate.codeReference = previousDescription;
      }

      // If any code reference was extracted, format it
      if (boilerplate.codeReference) {
        // Get rid of AE's invalid `/>` ending of every tag
        boilerplate.codeReference = boilerplate.codeReference.replaceAll(
          "/>",
          ">"
        );

        // For Progressive, get rid of Angular cruft
        if (
          getCookieValue("kpmCustom-custom-progressive-apq") ||
          getCookieValue("kpmCustom-custom-progressive-dq-inc-mobile")
        ) {
          boilerplate.codeReference = stripAngularFeatures(
            boilerplate.codeReference
          );
        }

        // Try to format it, otherwise do nothing
        try {
          boilerplate.codeReference = await prettier.format(
            boilerplate.codeReference,
            {
              parser: "html",
              plugins: prettierPlugins,
              htmlWhitespaceSensitivity: "ignore",
            }
          );
        } catch (error) {
          // Do nothing
        }
      }

      // SUCCESS CRITERIA SECTION MODIFICATIONS
      // Expand success criteria from number to full details
      let expandedStructure = [];
      boilerplate.successCriteria.forEach((criterion) => {
        let details = dataSuccessCriteria();
        expandedStructure.push(
          details.find((detail) => detail.number === criterion)
        );
      });
      boilerplate.successCriteria = expandedStructure;

      // Filter out AAA for now
      boilerplate.successCriteria = boilerplate.successCriteria.filter(
        (criterion) => criterion.level !== "AAA"
      );

      // Handle formats for different clients
      let formattedCriteria = "";
      if (getCookieValue("kpmCustom-custom-adobe")) {
        boilerplate.successCriteria.forEach((criterion) => {
          formattedCriteria += `SC ${criterion.number} ${criterion.name}\n`;
        });
      } else if (getCookieValue("kpmCustom-custom-disney")) {
        boilerplate.successCriteria.forEach((criterion) => {
          formattedCriteria += `${criterion.number} ${criterion.name}\n`;
        });
      } else if (getCookieValue("kpmCustom-custom-salesforce")) {
        let formattedStandard = "";
        boilerplate.successCriteria.forEach((criterion) => {
          formattedCriteria += `SC ${criterion.number} ${criterion.name} (Level ${criterion.level})\n`;
          formattedStandard += `WCAG ${criterion.version}\n`;
        });
        boilerplate.salesforceStandard = formattedStandard;
      } else if (getCookieValue("kpmCustom-custom-thomsonReuters")) {
        boilerplate.successCriteria.forEach((criterion) => {
          formattedCriteria += `${criterion.number}\n`;
        });
      }
      boilerplate.successCriteria = formattedCriteria;

      // DEFECT GRADE SECTION MODIFICATIONS
      // Modify "type" for use as defect grade by WF
      if (getCookieValue("kpmCustom-custom-wf")) {
        if (boilerplate.type === "web") {
          boilerplate.type = "ADA_Grade_Web";
        } else if (
          boilerplate.type === "ios" ||
          boilerplate.type === "android"
        ) {
          boilerplate.type = "ADA_Grade_Native";
        }
      }

      // Generate and inject the new description
      const newDescription = formatDescription(boilerplate);
      descriptionTextarea.value = newDescription;

      // Inject the note
      const newNote = formatNote(boilerplate);
      const noteTextarea = document.querySelector(
        "textarea[id*='attribute'], textarea[id*='note']"
      );
      noteTextarea.value = newNote;
    });
    // Chad added button handler
    $("[id*='reviews-']").on("click", (event) => {
      const clickID = $(event.target).attr("id");
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
      if (index1 !== -1) {
        thisIndex1 = index1;
      } else if (index2 !== -1) {
        thisIndex1 = index2;
      } else if (index3 !== -1) {
        thisIndex1 = index3;
      } else if (index4 !== -1) {
        thisIndex1 = index4;
      } else if (index5 !== -1) {
        thisIndex1 = index5;
      } else if (index6 !== -1) {
        thisIndex1 = index6;
      } else {
        thisIndex1 = index7;
      }

      //         Var thisIndex1 = str1.indexOf("[Issue]");
      const formatted1 = str1.substr(thisIndex1);

      const entry1 = reviews.find((e) => e.id === clickID);
      // For Under Review or Missing
      if (entry1.date === "name") {
        const name1 = $("#userinfo ul li:first").text();
        const newText1 = entry1.title.split("-")[0].trim();
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
        if (entry1.title === "Complete") {
          text1 = formatted1;
        } else if (entry1.title === "Updated") {
          text1 = `[${$today1}: ${entry1.title.toUpperCase()}]\n\n--------------------------\n\n${formatted1}`;
        } else {
          text1 = `[${$today1}: ${entry1.title.toUpperCase()}]\n\n--------------------------\n\n${$(
            "textarea[id*='element']:first"
          ).val()}`;
        }
      }
      // For Clear Review
      if (entry1.var1) {
        $("select[id*='defect_status_']:first").val(entry1.var1);
        if (entry1.var1 === "new") {
          if (entry1.title === "Complete") {
            $("textarea[id*='defect_comments_']:first").val("");
          } else {
            $("textarea[id*='defect_comments_']:first").val(
              "Please go into the baseline list and locate the test for this missing violation."
            );
          }
        }
      }
      if (entry1.title) {
        $("textarea[id*='element']:first").val(text1);
      }
    });
    // When a status is given, this prepends the first field
    $("[id*='status-']").on("click", (event) => {
      const clickID = $(event.target).attr("id");
      const status = dataStatus();
      const entry = status.find((e) => e.id === clickID);
      let text = "";
      if (clickID.indexOf("status-wcag") >= 0) {
        const level = clickID.split("-")[2].toUpperCase();
        text = `[WCAG Level: ${level}]\n\n${$(
          "textarea[id*='element']:first"
        ).val()}`;
      } else if (entry.date === "name") {
        const name = $("#userinfo ul li:first").text();
        const newText = entry.title.split("-")[0].trim();
        text = `[${newText.toUpperCase()} -${name}]\n\n${$(
          "textarea[id*='element']:first"
        ).val()}`;
      } else if (entry.date === "no") {
        text = `[${entry.title.toUpperCase()}]\n\n${$(
          "textarea[id*='element']:first"
        ).val()}`;
      } else {
        let $today = new Date();
        const dd = $today.getDate();
        const mm = $today.getMonth() + 1;
        const yyyy = $today.getFullYear();
        $today = `${mm}/${dd}/${yyyy}`;
        text = `[${$today}: ${entry.title.toUpperCase()}]\n\n--------------------------\n\n${$(
          "textarea[id*='element']:first"
        ).val()}`;
      }
      if (entry.title) {
        $("textarea[id*='element']:first").val(text);
      }
      if (entry.var1) {
        $("select[id*='defect_status_']:first").val(entry.var1);
      }
    });

    // When code is given, this appends the second field
    $("[id*='css-']").on("click", (event) => {
      const clickID = $(event.target).attr("id");
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
    $("[id*='reading-']").on("click", (event) => {
      const clickID = $(event.target).attr("id");
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
    $("[id*='special-']").on("click", (event) => {
      const clickID = $(event.target).attr("id");
      const status = dataStatus();
      const entry = status.find((e) => e.id === clickID);

      if (entry.var1 && entry.loc === "1") {
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
    $("[id*='extras-']").on("click", (event) => {
      const clickID = $(event.target).attr("id");
      const status = dataStatus();
      const entry = status.find((e) => e.id === clickID);
      let text = $("textarea[id*='element']:first").val();
      text += `\n\n[${entry.var1}]\n`;
      $("textarea[id*='element']:first").val(text);
    });

    // Pattern: Add Pattern and Name if Available to the top of the First field.
    $("#code-pattern").on("click", () => {
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
    $("#code-modIns").on("click", () => {
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
    $("#current-date").on("click", () => {
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
  }
}
/* Add buttons to the Edit Module Form to fix any escaped HTML entities in the 
module name and thumbnail alt text. */
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
/* START USE CASE
   This stuff is for adding use case related functionality */
function generateSummary() {
  const UC_ISSUE_REGEXP =
    /\[(?<score>[1-4])\s*(STOPPER)?:\s*(?<description>.*)\]/gi;
  let ucGeneralComments = "";
  const issues = [];
  /* (1 through 5) The score of the lowest-scoring issue, or 5 if there are no 
  issues. */
  let finalScore = 0;
  const steps = document.querySelectorAll(
    "textarea[name^='use_case_step_result']",
  );
  const rating = document.getElementById("rating");
  ucGeneralComments = "";
  steps.forEach((step) => {
    matches = step.value.matchAll(UC_ISSUE_REGEXP);
    if (matches !== null) {
      for (const item of matches) {
        const issue = {
          score: item.groups.score,
          description: item.groups.description,
        };
        issues.push(issue);
      }
    }
  });
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
           Thanks stack overflow for how to do static variables in js so I don't have to add globals. */
      const UC_BANNERS = [
        "STOPPERS:",
        "Major Issues:",
        "Minor Issues:",
        "Advisory Issues:",
      ];
      const scoreIndex = issue.score - 1;
      if (
        typeof lastScoreIndex === "undefined" ||
        scoreIndex !== lastScoreIndex ||
        ucGeneralComments.length === 0
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
    // No accessibility issues.
    finalScore = 5;
    document.getElementById("description").value = "No accessibility issues.\n";
  }
  for (const opt of rating.options) {
    if (opt.value === finalScore) {
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
/* Test Module Specific Functions */

// TEST MODULE: Adds links to the Test Module Table Top
function testModuleLinks(moduleID) {
  let editLink = `<li><a href="/public/reporting/view_module.php?module_id=${moduleID}">Edit Module/Instances</a></li>`;
  editLink +=
    '<li><a href="#" onclick="window.location.search=window.location.search+\'&mark_complete=true\'; instHandler.showModule(); return false;">Mark Complete<span class="accessibleAltText">Opens separate pane</span></a></li>';
  return editLink;
}
function testModuleAlternate() {
  // ALWAYS ON: Makes the test module open with the review tab (mark complete) by default rather than an empty page.
  $("body").attr(
    "onload",
    "javascript:instHandler.showModule(); return false;"
  );

  // ALWAYS ON: Adds the links to the top of the page for mark complete and edit module.
  $("#menu_table_toolbar_actions").append(testModuleLinks(moduleID));
}function viewGlobalsAndPatterns() {
  if (!getCookieValue("kpmPref-globals")) {
    $("h2:contains('Globals')").hide();
    $("#view_globals_container").hide();
    $("#view_globals_container").after(
      '<p class="kpmSmall">Globals hidden by the ACE AMP Script. You can make them show again in the preferences below.</p>'
    );
    $("a[onclick^='modal_create_global']").hide();
  }
}
function updateInstancesTable() {
  // INJECT WARNINGS FOR EACH BEST PRACTICE
  if (!getCookieValue("kpmPref-bpWarnings")) {
    const bpTableHeaders = document.querySelectorAll(
      "td:has([onclick^='modal_best_practice'])"
    );
    bpTableHeaders.forEach((bpRow) => {
      injectProblems(bpRow, "best practice");
    });
  }

  // INJECT WARNINGS FOR EACH ISSUE
  if (!getCookieValue("kpmPref-tableWarning")) {
    const headers = Array.from(
      document.querySelectorAll("#instances thead tr th")
    );
    const descriptionColumnPosition =
      headers.find((header) => header.innerText === "Description")?.cellIndex +
      1;
    const noteColumnPosition =
      headers.find((header) => header.innerText === "Note")?.cellIndex + 1;
    const thumbnailColumnPosition =
      headers.find((header) => header.innerText === "Thumbnail")?.cellIndex + 1;

    const issueRows = document.querySelectorAll("#instances tbody tr");
    issueRows.forEach((issueRow) => {
      if (!isNaN(descriptionColumnPosition)) {
        const descriptionElement = issueRow.querySelector(
          `tr > :nth-child(${descriptionColumnPosition})`
        );
        injectProblems(descriptionElement, "description");
      }

      if (!isNaN(noteColumnPosition)) {
        const noteElement = issueRow.querySelector(
          `tr > :nth-child(${noteColumnPosition})`
        );
        injectProblems(noteElement, "note");
      }

      if (!isNaN(thumbnailColumnPosition)) {
        const thumbnailElement = issueRow.querySelector(
          `tr > :nth-child(${thumbnailColumnPosition})`
        );
        injectProblems(thumbnailElement, "thumbnail");
      }
    });
  }
}

// This looks at the View All Instances list page.
function viewInstances() {
  if (!getCookieValue("kpmPref-retestColor")) {
    retestColor();
  }
  if (!getCookieValue("kpmPref-thumbALT")) {
    viewDivAltText();
  }

  $("#instances").on("draw.dt", function () {
    updateInstancesTable();
  });
}
/* View Module Specific Functions */

// VIEW MODULE: Baseline Checklist
function baseLine(id) {
  const blArray = dataBaseline();
  const showDetailsKey = `kpmChecklist-details-${id}`;
  const showCompletedKey = `kpmChecklist-show-${id}`;

  let output = "";
  output += '<fieldset id="kpmBaseline">';
  output +=
    '<legend>Baseline Checklist <a href="#" id="kpmPref-showBaseline">[ Hide ]</a></legend>';
  output += '<div id="kpmBaselineBox">';

  blArray.forEach((item) => {
    const thisKey = `kpmChecklist-${id}-${item.key}`;

    if (!getCookieValue(thisKey) || getCookieValue(showCompletedKey)) {
      output += `<label><input id="${thisKey}" type="checkbox"`;
      if (getCookieValue(thisKey)) {
        output += ' checked="checked"';
      }
      output += ">";
      output += item.title;
      output += "</label><ul>";
      if (getCookieValue(showDetailsKey)) {
        $.each(item.subs, (k, m) => {
          output += `<li>${m}</li>`;
        });
      }
      output += "</ul>";
    }
  });
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

// VIEW MODULE: Filter modules list by BP [ALEX]
function filterClearBPs(ipt) {
  const temp = ipt;
  if (ipt !== null && typeof ipt !== "undefined") {
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
            chx.checked = false;
          });

        if (
          elem.querySelector("th") &&
          String(elem.querySelector("th").innerText).match(reg) !== null
        ) {
          elem.classList.remove("bpHide");
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
            dataRow.classList.remove("bpHide");
          }
        }
      });
  } else {
    [].slice.call(document.querySelectorAll(".bpHide")).forEach((el) => {
      el.classList.remove("bpHide");
    });
  }
}

// VIEW MODULE: Create filters by BP [ALEX]
function filterBP() {
  const wrapperDiv = document.createElement("div");
  wrapperDiv.className = "kpmFilterWrapper";
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

// VIEW MODULE: Edit Pattern button
function editPattern() {
  $("a[onclick^='modal_edit_pattern']").each((index, element) => {
    const EditPattern = $(element);
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
function addRetestCheckbox() {
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

// VIEW MODULE: Add Mark Complete button to "View Module" tabs
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

function viewModule(reportID, moduleID) {
  // EXPERIMENTAL - Get the table of patterns from the patterns page
  if (!getCookieValue("kpmPref-addPatterns")) {
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

  // ALWAYS ON: This adds links/tabs/access keys to the View Module page.
  $("#menu_table_toolbar_actions").append(viewModuleAddInstance());
  $("#menu_table_toolbar_actions").append(viewModuleAddPattern());
  $("#menu_table_toolbar_actions").append(addRetestCheckbox());
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

  // For each pattern in the list, creates a link button so that you can navigate there quickly
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
    const bpTableHeaders = document.querySelectorAll("[id^='bp_']");
    bpTableHeaders.forEach((bpRow) => {
      injectProblems(bpRow, "best practice");
    });
  }

  // INJECT WARNINGS FOR EACH ISSUE
  if (!getCookieValue("kpmPref-tableWarning")) {
    const headerRow = document.querySelector("[id^='view_module_table'] thead");
    const issueRows = document.querySelectorAll(
      "[id^='view_module_table'] tr:has(td.wrap.topvalign)"
    );
    issueRows.forEach((issueRow) => {
      const descriptionElement = issueRow.querySelector("td:nth-of-type(2)");
      const noteElement = issueRow.querySelector("td:nth-of-type(3)");
      injectProblems(descriptionElement, "description");
      injectProblems(noteElement, "note");

      if (headerRow.innerText.includes("Thumbnail")) {
        const thumbnailElement = issueRow.querySelector("td:nth-of-type(5)");
        injectProblems(thumbnailElement, "thumbnail");
      }
    });
  }
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

  navigator.clipboard.writeText(moduleList).then(
    () => {
      const copyDialog = createDialog(
        "Success",
        "Copied plain text list of modules to clipboard!"
      );
      copyDialog.showModal();
    },
    (err) => {
      const copyDialog = createDialog("Error", err);
      copyDialog.showModal();
    }
  );
}

function updateModulesTable() {
  $("td:contains('http')").each((index, element) => {
    const thisTD = $(element);
    const thisURL = thisTD.html();
    thisTD.html(
      `<a href="${thisURL}" target="_blank">${thisURL}<span class="accessibleAltText"> (Opens in New Window)</span></a>`
    );
  });

  // Add warnings for garbage characters
  const moduleDetails = document.querySelectorAll(
    "#modules th[scope='row'], #modules td:nth-child(4), #modules td:nth-child(6)"
  );

  const specialCharacters = dataSpecialCharacters();
  moduleDetails.forEach((moduleDetail) => {
    injectProblems(moduleDetail, "module name");
  });
}

/* These are the containers of functions that are called below dynamically using mutation observers or delays */

// This looks at the view modules page.
function viewModules() {
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

  if (!getCookieValue("kpmPref-thumbALT")) {
    viewDivAltText();
  }

  $("#modules").on("draw.dt", function () {
    updateModulesTable();
  });
}
function viewPattern() {
  // ALWAYS ON: Adds accesskey to the patterns side rather than the module details side.
  $("a[onclick*='modal_create_pattern_violation']").attr("accesskey", "a");
  $("a[onclick*='modal_delete_pattern_violations']").attr("accesskey", "x");
}
function viewReport() {
  // ALWAYS ON: if Dashboard, checkbox for full description
  $(".description:first h3").prepend(
    buildCheckbox(
      "fullDescription",
      "Show Full Description",
      "Makes the description box show all the content",
      "kpmDescPref"
    )
  );
}
// USE CASES
function copyUseCasesToClipboard() {
  const useCaseSet = new Set();
  const useCaseHeaderElements = document.querySelectorAll(
    "table.large td:nth-child(2) a"
  );
  useCaseHeaderElements.forEach((useCaseHeaderElement) => {
    const useCaseNameRaw = useCaseHeaderElement.innerHTML;
    const useCaseName = useCaseNameRaw
      .split('<span class="accessibleAltText">')
      .at(0);
    useCaseSet.add(useCaseName);
  });

  let useCaseList = "";

  useCaseSet.forEach((str) => {
    useCaseList = `${useCaseList + str}\n`;
  });

  navigator.clipboard.writeText(useCaseList).then(
    () => {
      const copyDialog = createDialog(
        "Success",
        "Copied plain text list of use cases to clipboard!"
      );
      copyDialog.showModal();
    },
    (err) => {
      const copyDialog = createDialog("Error", err);
      copyDialog.showModal();
    }
  );
}

function viewUseCases() {
  const copyUseCaseLink = document.createElement("a");
  copyUseCaseLink.href = "#";
  copyUseCaseLink.classList.add("bulk_actions");
  copyUseCaseLink.innerHTML =
    "<i class='far fa-copy'></i>Copy use cases to clipboard";
  copyUseCaseLink.addEventListener("click", copyUseCasesToClipboard);
  const copyUseCaseListItem = document.createElement("li");
  copyUseCaseListItem.append(copyUseCaseLink);
  const injectionPoint = document.querySelector("#menu_table_toolbar_actions");
  injectionPoint.append(copyUseCaseListItem);
}
/* This is what injects into the page */
(function () {
  "use strict";
  console.log("The AMP Script has begun loading.");
  const startTime = performance.now();
  const target = document.body;
  const reportID = getID(location.href, "report_id");
  const moduleID = getID(location.href, "module_id");
  const instanceID = getID(location.href, "instance_id");

  // If running from an external link, check to see if it is already running by looking for something that is always on.
  if (document.getElementById("kpmScriptRunning") !== null) {
    const doubleScriptDialog = createDialog(
      "Error",
      "You have multiple versions of the AMP Script running. Go to Tampermonkey and ensure only one is toggled on."
    );
    doubleScriptDialog.showModal();
  }
  // Client mode - Don't do any add stuff and hide a few things.
  else if (
    getCookieValue("kpmPref-clientMode") &&
    getCookieValue("kpmPref-clientMode") === reportID
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
      viewReport();
    }

    // VIEW MODULE (view_module.php)
    if (window.location.href.indexOf("/view_module.php?module_id=") >= 0) {
      viewModule(reportID, moduleID);
    }

    // TEST MODULE (test_module_alternate.php)
    if (window.location.href.indexOf("test_module_alternate.php") >= 0) {
      testModuleAlternate();
    }

    // VIEW PATTERN (view_pattern.php)
    if (window.location.href.indexOf("/view_pattern.php") >= 0) {
      viewPattern();
    }

    if (window.location.href.indexOf("/view_use_cases.php") >= 0) {
      viewUseCases();
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

    // GLOBAL: Any time there is a best practice modal link, create buttons to the page best practice and the copy best practice
    if (!getCookieValue("kpmPref-addBPLink")) {
      bestPracticeLinks();
    }

    // GLOBAL: Hide Global Patterns
    // Hides Globals from edit pattern
    if (window.location.href.indexOf("/view_globals_and_patterns.php") >= 0) {
      viewGlobalsAndPatterns();
    }

    // VIEW MODULES (view_modules.php)
    if (window.location.href.indexOf("/view_modules.php") >= 0) {
      viewModules();
    }

    // VIEW INSTANCES (view_instances.php)
    if (window.location.href.indexOf("/view_instances.php") >= 0) {
      viewInstances();
    }

    const modalObserver = new MutationObserver((mutations, observer) => {
      mutations.forEach((mutation) => {
        if (mutation.type === "childList") {
          mutation.addedNodes.forEach((node) => {
            if (node.nodeType === 1) {
              const action = node.getAttribute("action");
              if (action?.includes("/public/audit/edit_module.php")) {
                handleEditModuleForm();
              } else if (
                action?.includes("/public/audit/edit_multiple_modules.php")
              ) {
                handleEditMultipleModuleForm();
              } else if (
                action?.includes(
                  "/public/audit/use_case/perform_use_case_test.php"
                )
              ) {
                addGenerateSummaryButton();
              } else if (
                action?.includes("/public/audit/add_instance.php") ||
                action?.includes("/public/audit/edit_instance.php") ||
                action?.includes("/public/audit/edit_pattern_member.php") ||
                action?.includes("/public/audit/edit_pattern.php")
              ) {
                addEditor(reportID);
              } else if (node.id === "organizationTable") {
                handleOrganizationFilterForm(reportID);
              } else if (node.id === "testing_complete") {
                handleTestingCompleteCheckbox(reportID);
              }
            }
          });
        }
      });
    });

    modalObserver.observe(document.body, { childList: true, subtree: true });
  }

  // Function to set the cookie if click on a checkbox happened. All the way at the bottom of the script to make sure that it catches everything
  $("[id*='kpmPref-']")
    .add("[id*='kpmChecklist-']")
    .on("click", (event) => {
      const clickID = $(event.target).attr("id");
      const cbCookie = getCookieValue(clickID);

      if (cbCookie) {
        Cookies.set(clickID, "", -1);
      } else if (clickID === "kpmPref-clientMode") {
        Cookies.set(clickID, reportID);
      } else if (clickID.indexOf("kpmChecklist-") !== -1) {
        Cookies.set(clickID, reportID, { expires: 60 });
      } else {
        Cookies.set(clickID, reportID, { expires: 7 });
      }
      location.reload();
    });

  // Set the cookie for custom formatting
  $("[id*='kpmCustom-']").on("click", (event) => {
    const clickID = $(event.target).attr("id");
    const customOptions = dataCustom();

    // Unset all cookies first
    customOptions.forEach((option) => {
      Cookies.set(`kpmCustom-${option.id}`, "", -1);
    });

    // Set the new cookie if not default
    if (clickID !== "kpmCustom-default") {
      Cookies.set(clickID, reportID, { expires: 7 });
    }
    location.reload();
  });

  const endTime = performance.now();
  const duration = (endTime - startTime).toFixed(2);
  console.log(
    `The AMP Script has finished loading. Time taken: ${duration} ms`
  );
})();
