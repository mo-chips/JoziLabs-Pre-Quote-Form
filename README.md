# JoziLabs – Website Project Discovery Form

A responsive, accessible, multi-step website project discovery questionnaire built for **[JoziLabs](https://www.jozilabs.tech/)** (`Build. Fix. Grow. Teach.`).

The purpose of this application is to guide prospective clients through a structured onboarding and scoping workflow so JoziLabs can understand their business goals, technical requirements, and budget expectations before preparing a transparent, fixed-price project quotation.

---

## 1. Technology Stack

Built strictly with vanilla web standards (zero frontend frameworks or CSS libraries):

- **HTML5** – Semantic structure, accessible landmarks, `<fieldset>` / `<legend>` groupings, and ARIA attributes (`aria-invalid`, `aria-describedby`, `aria-live`, `role="dialog"`).
- **CSS3** – Custom properties (CSS Variables), responsive CSS Grid & Flexbox layouts, dark/light theme support, print stylesheet, and JoziLabs' circuit-inspired brand palette extracted from `assets/img/og.png` (`#0B1118` deep circuit obsidian, `#3FB8C4` electric cyan-teal, `#2F3B4B` slate navy, `#2C4F61` deep teal-slate).
- **Vanilla JavaScript (ES6 Modules)** – Modular state management, session persistence (`sessionStorage`), conditional question evaluation, inline & step-level validation, dynamic final review rendering, and structured JSON payload generation.

---

## 2. Project Structure

```text
/
├── index.html
├── styles/
│   └── main.css
├── scripts/
│   ├── app.js
│   ├── form-data.js
│   └── validation.js
├── assets/
│   └── img/
│       ├── logo-mark-white.png
│       ├── logo-word-white.png
│       ├── logo-mark.png
│       ├── logo-word.png
│       ├── og.png
│       ├── balance-1.png
│       ├── balance-2.png
│       ├── balance-3.png
│       └── ... (favicons & app icons)
└── README.md
```

---

## 3. Questionnaire Steps & Features

1. **Step 1 – Business Information**: Collects organisation name, contact person, email address, optional phone/WhatsApp and existing URL, business description, industry sector (with conditional *"Other"* input), target audience, and operating locations.
2. **Step 2 – Project Overview**: Covers project type (New website, Redesign, E-commerce, Web app, Other), primary purposes, problems to solve, key visitor actions, success criteria, and admired reference websites.
3. **Step 3 – Website Structure**: Interactive page selector grid (Home, About Us, Our Team, Services, Individual Service Pages, Products, Pricing, Portfolio / Gallery, Testimonials, Blog / News, FAQ, Contact Us, Booking, Login / Customer Portal, Other), additional custom pages, custom interactive sections, and multi-language requirements.
4. **Step 4 – Design & Content**: Existing brand assets, preferred visual style cards, creative assistance needed (Logo, Branding, Copywriting, Photography, Graphic design), design preferences, reference URLs, and a collapsible JoziLabs mobile-first UI showcase featuring the *Balance* app (`assets/img/balance-*.png`).
5. **Step 5 – Features & Functionality**: Five selectable feature groups (*Communication*, *Business Operations*, *E-commerce*, *User Accounts*, *Content Management*) with dynamic conditional follow-up panels for:
   - **E-commerce** (product counts, product types, SA payment gateways such as Yoco/PayFast/Paystack/Ozow, delivery/courier notes)
   - **User Accounts** (account roles and logged-in user capabilities)
   - **Booking & Scheduling** (booking types, upfront payment/deposit rules, calendar sync)
   - Third-party software/API integrations and custom requirements.
6. **Step 6 – Domain & Infrastructure**: Domain ownership, existing/desired domain name, hosting status, business email status, setup/deployment assistance, ongoing maintenance (JoziLabs Care Plans), and platform integrations (Google Analytics, Search Console, Business Profile, CRM, Payment providers).
7. **Step 7 – Budget & Timeline**: Discovery budget ranges in ZAR (`Under R2,500` to `R40,000+` and `Not sure yet`) with a clear discovery disclaimer, desired launch date, deadline flexibility, event/milestone connection, and ongoing service preferences.
8. **Step 8 – Final Review & Prototype Confirmation**:
   - Displays a complete summary of Steps 1–7 with direct **Edit Step** buttons on every section card.
   - Requires accuracy confirmation and contact consent checkboxes linked to the **JoziLabs Privacy Notice (POPIA)** modal.
   - Transitions upon submission to an honest **Frontend MVP Prototype Confirmation Screen** that clearly states no backend is connected yet, while allowing the user to copy the formatted brief, download the JSON payload, or print/save as PDF.

---

## 4. Running Locally

Because the application uses native ES6 modules (`<script type="module" src="scripts/app.js"></script>`), serve the root folder over any local HTTP server:

```bash
# Using Python 3
python -m http.server 8080

# Or using Node.js npx serve
npx serve .
```

Then open `http://localhost:8080` in your browser.

---

## 5. Connecting a Production Backend Later

When JoziLabs is ready to connect an API endpoint or form submission service:
1. Call `buildSubmissionPayload(this.state.data)` (imported from `scripts/form-data.js`) inside `handleFormSubmit()` in `scripts/app.js`.
2. Send the returned JSON object via `fetch('https://api.jozilabs.tech/enquiries', { method: 'POST', body: JSON.stringify(payload) })`.
3. Update the Privacy Notice modal in `index.html` with the final production POPIA processing and retention disclosures.
