/*
  Text of the two legal pages, kept here so the pages stay thin and the company
  details (CIN, addresses, contact) come from one place.

  Drafted against the IT (Reasonable Security Practices and Procedures and Sensitive
  Personal Data or Information) Rules 2011 and the Digital Personal Data Protection
  Act 2023. It is a working draft, not legal advice — have a lawyer or company
  secretary confirm the wording, and confirm that the grievance officer named below
  has actually been appointed.
*/
import { company } from "@/data/company";

export type LegalBlock = { p: string } | { ul: string[] };
export type LegalSection = { heading: string; blocks: LegalBlock[] };

const p = (text: string): LegalBlock => ({ p: text });
const ul = (items: string[]): LegalBlock => ({ ul: items });

export const legalUpdated = "15 November 2026";

const cin = company.registrations.find((r) => r.label === "CIN No.")?.value ?? "";
const officeAddress = company.office.lines.join(", ");

export const grievanceOfficer = {
  name: company.contactPerson.name,
  role: `${company.contactPerson.role}, ${company.shortName}`,
  email: company.email,
  phone: company.phoneDisplay,
};

export const privacySections: LegalSection[] = [
  {
    heading: "Who we are",
    blocks: [
      p(`${company.name} (CIN ${cin}, GST ${company.gst}) is a private limited company incorporated in India. Our registered office is at ${company.registeredAddress}, and our operating office is at ${officeAddress}.`),
      p(`In this policy, "we", "us" and "our" mean ${company.name}, and "you" means anyone who sends us an inquiry through this website.`),
      p("This policy explains what personal data we collect on this website, why we collect it, who we share it with, how long we keep it, and what you can ask us to do with it."),
    ],
  },
  {
    heading: "What we collect",
    blocks: [
      p("We collect only what you choose to type into an inquiry form on this website:"),
      ul([
        "Your name",
        "Your mobile number",
        "Your email address, if you choose to give one — it is optional",
        "The product you are asking about, and the requirement you describe",
        "The page of the website you sent the inquiry from",
      ]),
      p("Our server also briefly notes the IP address of the device sending an inquiry, purely so that the form cannot be flooded by automated scripts. It is held for a few minutes and is not stored alongside your inquiry."),
      p("We do not use cookies, analytics, advertising pixels or any other tracking on this website. Videos are embedded through the YouTube no-cookie player, so watching one does not set an advertising cookie."),
      p("We do not ask for, and do not want, financial information, passwords, government identity numbers, health information or any other sensitive personal data. Please do not send such details through the inquiry form."),
    ],
  },
  {
    heading: "Why we collect it",
    blocks: [
      p("For one purpose only: to read your inquiry and reply to it. That includes quoting a price, confirming availability and packing, sending a COA or MSDS, arranging dispatch, and following up on the requirement you described."),
      p("We do not sell your data, rent it or trade it. We do not add you to a marketing list or send you promotional messages about unrelated products on the strength of an inquiry alone — that would need your separate consent."),
    ],
  },
  {
    heading: "Your consent",
    blocks: [
      p("You give us consent when you tick the consent box and send an inquiry. That consent is specific to the purpose set out above, and we tell you what we will do with your details before you send them."),
      p(`You may withdraw your consent at any time by writing to ${company.email}. Withdrawing consent is as easy as giving it. It does not undo anything we lawfully did with your data before you withdrew, and we may still keep the minimum needed to meet a legal, tax or audit obligation.`),
    ],
  },
  {
    heading: "Who we share it with",
    blocks: [
      p("Your inquiry is read by a small number of people inside our company who handle sales and dispatch. Beyond that, it passes through these service providers:"),
      ul([
        "Google — your inquiry is recorded in a Google Forms response sheet and emailed to our inbox, so that no requirement is missed.",
        "Vercel — the hosting provider that serves this website and runs the form endpoint.",
      ]),
      p("These providers process the data on our behalf in order to run the service, and may do so on servers outside India. We share with them only what your inquiry contains — nothing more."),
      p("We may also disclose personal data where we are required to do so by law, by a court, or by a government authority acting within its powers."),
    ],
  },
  {
    heading: "How long we keep it",
    blocks: [
      p("We keep an inquiry for as long as it takes to deal with your requirement and to maintain the business relationship that follows from it. After that, we keep only what we are required to keep for legal, tax or audit purposes, and only for as long as those rules require."),
      p("If you would like your inquiry deleted sooner, write to us and we will delete it, unless a law requires us to retain it."),
    ],
  },
  {
    heading: "How we protect it",
    blocks: [
      p("Access to inquiries is limited to the people who need it. The website is served over HTTPS, so what you type is encrypted in transit, and the accounts that receive inquiries are protected by passwords and, where the provider offers it, two-factor authentication."),
      p("We follow reasonable security practices and procedures of the kind contemplated by the IT (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011. No system can be guaranteed completely secure, and we do not claim otherwise."),
    ],
  },
  {
    heading: "Your rights",
    blocks: [
      p("Under the Digital Personal Data Protection Act, 2023, you may ask us to:"),
      ul([
        "Give you a summary of the personal data we hold about you and what we have done with it",
        "Correct, complete or update anything that is inaccurate or out of date",
        "Erase your personal data, where we are not required to keep it",
        "Deal with a grievance about how we have handled your data",
        "Recognise a person you nominate to exercise these rights on your behalf if you die or are unable to act",
      ]),
      p("Write to the grievance officer named below to exercise any of these. We may need to confirm your identity first, so that we do not disclose one person's data to another."),
    ],
  },
  {
    heading: "Children",
    blocks: [
      p("This is a business-to-business website and it is not directed at children. We do not knowingly collect the personal data of anyone under 18. If you believe a child has sent us their details, write to us and we will delete them."),
    ],
  },
  {
    heading: "Grievance officer",
    blocks: [
      p(`Any question, request or complaint about your personal data should go to ${grievanceOfficer.name}, ${grievanceOfficer.role}.`),
      ul([`Email: ${grievanceOfficer.email}`, `Phone: +91 ${grievanceOfficer.phone}`, `Post: ${officeAddress}`]),
      p("We will acknowledge your request and respond within a reasonable time. If you are not satisfied with our response, you may escalate the matter to the Data Protection Board of India under the Digital Personal Data Protection Act, 2023."),
    ],
  },
  {
    heading: "Changes to this policy",
    blocks: [
      p("We may update this policy as our practices or the law change. The date shown at the top of this page is the date it was last changed. Where a change is material, we will say so on this page."),
    ],
  },
];

export const termsSections: LegalSection[] = [
  {
    heading: "Accepting these terms",
    blocks: [
      p(`These terms govern your use of the ${company.name} website. By browsing it or sending an inquiry through it, you accept them. If you do not agree with them, please do not use the website.`),
    ],
  },
  {
    heading: "What this website is",
    blocks: [
      p("This website is a catalogue and company profile. We are an importer, trader, wholesaler and bulk supplier of chemicals and ingredients. Unless a page says otherwise, we are not the manufacturer of the products listed — we source them from manufacturers in India and abroad."),
      p("There is no shopping cart and no online payment on this website. Nothing can be bought here directly."),
    ],
  },
  {
    heading: "Product information is indicative",
    blocks: [
      p("Product names, descriptions, grades, specifications, applications and images on this website are indicative and are given for general guidance only. Images are illustrative and may not show the actual packing supplied."),
      p("The specification that governs any supply is the one in the Certificate of Analysis, technical data sheet and MSDS issued for the specific batch supplied to you — not the description on this website. Where the two differ, the batch documents prevail."),
      p("We take care to keep this website current, but we do not warrant that every detail is accurate, complete or up to date at the moment you read it."),
    ],
  },
  {
    heading: "No offer, and no price commitment",
    blocks: [
      p("Nothing on this website is an offer to sell, and no price is published here. Prices are quoted on request, and a quotation is valid only on the terms, quantity, packing and period stated in it."),
      p("A contract comes into existence only when we accept your order in writing. An inquiry sent through this website is a request for a quotation, and nothing more."),
    ],
  },
  {
    heading: "Your responsibility when buying chemicals",
    blocks: [
      p("Chemicals must be handled by people who know what they are doing. Before you buy or use any product we supply, it is for you to satisfy yourself that it is suitable and safe for your intended use, your process and your formulation."),
      p("You are responsible for reading the MSDS, and for complying with every law that applies to you for the storage, handling, transport, use, labelling and disposal of the product, including any licence or registration you need — for example under food, drug, pollution control or hazardous substance rules."),
      ul([
        "We do not provide regulatory, formulation, medical or safety advice, and nothing on this website should be treated as such advice.",
        "Nothing supplied by us may be used for any unlawful purpose.",
        "Where a product is supplied for a particular grade or application, it should not be used for another without confirming suitability with us in writing.",
      ]),
    ],
  },
  {
    heading: "Intellectual property",
    blocks: [
      p("The text, layout, photographs, graphics and logos on this website belong to us or are used by us under licence. You may not copy, republish, sell or otherwise exploit them without our written permission."),
      p("Product names, brand names and trade marks of manufacturers mentioned on this website belong to their respective owners, and are used only to describe the products we supply."),
    ],
  },
  {
    heading: "Links to other websites",
    blocks: [
      p("Where this website links to another website, we do so for convenience. We do not control those websites and we are not responsible for their content, their products or their privacy practices."),
    ],
  },
  {
    heading: "Limitation of liability",
    blocks: [
      p("To the extent the law allows, we are not liable for any indirect or consequential loss, loss of profit, loss of business or loss of data arising out of your use of this website or your reliance on information published on it."),
      p("Nothing in these terms limits any liability that cannot be limited or excluded under the law of India."),
    ],
  },
  {
    heading: "Privacy",
    blocks: [
      p("How we handle the details you send us is set out in our Privacy Policy, which forms part of these terms."),
    ],
  },
  {
    heading: "Changes to these terms",
    blocks: [
      p("We may revise these terms at any time. The date at the top of this page shows when they were last changed, and continuing to use the website after a change means you accept the revised terms."),
    ],
  },
  {
    heading: "Governing law and jurisdiction",
    blocks: [
      p("These terms are governed by the laws of India. The courts at Ahmedabad, Gujarat have exclusive jurisdiction over any dispute arising out of this website or these terms."),
    ],
  },
  {
    heading: "Contact",
    blocks: [
      p(`${company.name}, ${officeAddress}.`),
      ul([`Email: ${company.email}`, `Phone: +91 ${company.phoneDisplay}`, `CIN: ${cin}`, `GST: ${company.gst}`]),
    ],
  },
];
