# DIC Tools & Resources — rules for any AI editing this site (ChatGPT, Claude, others)

Owner: Stephen Alvarado, DIC Manager. Make only the changes he asks for, and show a preview before anything goes live.

## Always
1. Start from the latest version of `index.html` on `main`. Never paste in an older copy. Older copies undo approved work.
2. Change only what was asked. Keep everything listed below as is.
3. Check every change on computer and phone before saving.
4. Preview first at `preview/index.html` (served at /dic-tools/preview/). Update the live `index.html` only after the owner approves.

## Locked: do not undo
- **No Claude or ChatGPT pages.** Every button opens a page on this GitHub site (or a Google page). Never link to claude.ai or chatgpt.com.
- **One page per tool.** booking/, classroom/, schedule/, calculator/, pricechart/, consumables/, dashboard/ each have a small index.html that loads the main index.html. Old "#name" links forward to these pages. Edit only the main index.html.
- **Prices.** The Price Chart is the master price list. The Calculator reads its prices from the Price Chart (`dicPrices()`). Never type prices into the Calculator.
  - Bond: "Universal Bond (36″ roll)", $0.66 / linear ft.
  - Plotter heading: "36″ & 44″ rolls".
- **Staff tools.** Consumables and the Workshop Dashboard always ask for the admin password, every time. This applies from home page cards, menus, direct links and the back button.
  - Each card shows the small 12px lock icon in its lower-right corner.
  - In every dotted menu, Consumables and Workshop Dashboard show the same 12px lock icon on the right side of the row.
  - Workshop Dashboard: the correct password opens the black-and-white Workshop Dashboard design on the same page (no new tab, no Google page). Never swap in the older Google dashboard design.
  - Dashboard numbers are live: the DIC Consumables Helper copies the booking script's dashboard feed weekdays at 8 AM, 12 PM, 3 PM and 6 PM (refreshDashboard triggers). The page asks the helper for them after the password. Never edit the booking script; only read it.
  - Consumables: the correct password opens Consumables on the same page. Counts save to the "DIC Consumables" Google Sheet through its helper script (tools/consumables_helper.gs).
  - Never show a "Private DIC tool" page.
- **Menu.** Every page shows the same dotted menu (Home, Workshops & Classes, Staff Schedule, Print Studio, Inventory). The script `menu-here` marks the page you are on with "You're already here" (Home on the landing page only). Do not remove it. The dotted menu is the main navigation: never add back links such as "← All DIC tools" or "Back to DIC Tools" on any page.
- **Footer.** The footer is pinned to the bottom of the screen on every page, on computer and phone.
  - The credit line is small and light gray.
- **Home page.** 4 aligned columns: Workshops & Classes, Print Studio, Inventory, Staff Schedule.
  - 2 columns on tablet, 1 on phone.
- **Student Worker Schedule.** Reads the Student Workers Google Calendar live through the DIC helper script. Do not type in shifts by hand.
  - First names only. Never show last names.
  - Department: DIC.
  - Locations: 5th Floor (Reception Office) and 1st Floor (Print Studio).
  - Current Day is the default view.
  - Week at a Glance is split by floor: a "5th Floor · Reception Office" section, then a "1st Floor · Print Studio" section, each with its own day cards and a one-line "Possible gaps" note underneath.
  - **Week at a Glance design is locked.** Do not change its spacing, floor subheadings, day cards, gap between the two floors, or the "Possible gaps" lines (computer and phone).
  - Current Day uses the same floor subheadings, spacing, floor separation and one "Possible gaps" line under each floor as Week at a Glance, with the large name cards.
- **Design.** Black-and-white DIC style. Fields line up on computer and phone.
- **Calculator layout is locked.** Computer: every input box lines up top and bottom with its price box. Phone: each row is one line (B/W, Color, 2-sided, price; or Length/Cuts, price) with even 10px gaps; the length note sits under its box without touching the line below.
- **Page header is locked to the landing page.** Logo, divider, title line, "Digital Imaging Center" and menu dots sit in exactly the same spot on every page (computer and phone). Every title uses the same type size as "DIC TOOLS & RESOURCES"; only the words change. Short titles: Workshop Booking, Classroom Lookup, Student Workers, DIC Calculator, DIC Price Chart, Workshop Dashboard, Consumables Report. The script `title-lock` keeps the title height fixed and ends the title line where the title text ends; do not remove it. It must run once per load, resize or title change only (it skips its own edits); never let it re-trigger itself, or Safari on iPhone freezes.
