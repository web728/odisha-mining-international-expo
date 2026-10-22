
import type { Metadata } from "next";

import {
  LegalPage,
  type LegalSection,
} from "@/components/legal/LegalPage";

export const metadata: Metadata = {
  title: "Privacy Policy | Odisha Mining Expo 2027",
  description:
    "Read how Odisha Mining & Infrastructure International Expo handles website enquiries, registration information and personal data.",
  alternates: {
    canonical: "/privacy-policy",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const sections: LegalSection[] = [
  {
    id: "introduction",
    title: "Introduction",
    paragraphs: [
      'This Privacy Policy explains how Futurex Trade Fair & Events Pvt. Ltd. ("we", "us" or "our"), organiser of the 5th Odisha Mining & Infrastructure International Expo 2027, handles personal information collected through odishaminingexpo.com and its event-related communications.',
      "The exhibition is scheduled for 7–10 January 2027 at Baramunda Exhibition Ground, Bhubaneswar, Odisha, India. This policy applies to visitors, exhibitors, sponsors, business contacts and other individuals interacting with our website or event services.",
    ],
  },
  {
    id: "information-collected",
    title: "Information We Collect",
    paragraphs: [
      "Depending on how you interact with us, the following categories of information may be collected:",
    ],
    bullets: [
      "Contact and identity information, such as name, company, designation, email address, phone number and location.",
      "Registration and business information, such as attendee or exhibitor category, industry, products, organisation details and requests submitted through forms.",
      "Communications and enquiries sent to our team, including messages and correspondence relating to event participation.",
      "Technical information, such as browser type, device details, IP address, pages visited and cookie preferences, where collected by the website's active tools.",
      "Event-related photographs or recordings where photography or videography takes place, subject to applicable notices and permissions.",
    ],
  },
  {
    id: "use-of-information",
    title: "How We Use Information",
    bullets: [
      "To respond to enquiries and administer exhibitor, visitor or partner registrations.",
      "To communicate relevant event details, logistics, confirmations and service updates.",
      "To coordinate event operations, security, participation and support.",
      "To improve website performance, accessibility, user experience and event services.",
      "To send promotional event communications where legally permitted or with any required consent.",
      "To comply with legal obligations and protect legitimate organisational interests where permitted by law.",
    ],
  },
  {
    id: "consent-and-choices",
    title: "Consent and Your Choices",
    paragraphs: [
      "Where processing requires consent, we seek that consent through the relevant form, notice or other appropriate mechanism. You may withdraw consent using the method provided at the point of collection or by contacting us, subject to applicable law and any processing permitted or required independently of consent.",
      "You can request that marketing communications stop. Operational messages necessary to manage an existing registration or respond to a request may still be sent where permitted.",
    ],
  },
  {
    id: "cookies",
    title: "Cookies and Similar Technologies",
    paragraphs: [
      "The website may use essential cookies and, where enabled, optional analytics or other technologies. Cookies can support website functionality, remember preferences and help us understand use of our website.",
      "You can manage cookies using the website's available consent controls and your browser settings. Optional cookies should be deployed in accordance with applicable consent requirements. The precise cookie categories depend on the services configured on the live website.",
    ],
  },
  {
    id: "sharing",
    title: "Sharing of Information",
    paragraphs: [
      "Information may be shared with service providers that support website hosting, forms, communications, registration or event operations, only as reasonably needed for those services and subject to appropriate safeguards.",
      "We may disclose information where required by applicable law, a lawful request or to address security and legal issues. Any sharing of registration details with exhibitors, sponsors or other independent parties for their own promotional purposes should be separately disclosed and, where required, consented to before it occurs.",
    ],
  },
  {
    id: "retention-and-security",
    title: "Data Retention and Security",
    paragraphs: [
      "We aim to keep personal information only for as long as needed for the stated purposes, event administration, applicable recordkeeping obligations or legitimate dispute resolution needs. Retention periods can vary by data category and purpose.",
      "We use reasonable organisational and technical safeguards appropriate to the information involved. No internet transmission or storage system can be guaranteed to be completely secure.",
    ],
  },
  {
    id: "rights",
    title: "Your Privacy Rights",
    paragraphs: [
      "Subject to applicable Indian law and the commencement of relevant legal provisions, you may have rights to obtain information about processing, request correction, completion, updating or erasure of your personal data, withdraw consent and seek grievance redressal.",
      "For a privacy request, email info@futurextrade.com with sufficient details for us to identify and process your request. We may seek reasonable verification before acting. Requests are handled in accordance with applicable law.",
    ],
  },
  {
    id: "third-parties",
    title: "Third-Party Websites",
    paragraphs: [
      "Our website may link to third-party websites, social networks and services. Their collection and handling of information are governed by their own policies. We are not responsible for the privacy practices of independent third parties.",
    ],
  },
  {
    id: "children",
    title: "Children's Privacy",
    paragraphs: [
      "Our website and event registration services are primarily intended for business and professional audiences. Where information about a child is processed, we will follow applicable legal requirements concerning parental consent and related safeguards.",
    ],
  },
  {
    id: "updates",
    title: "Changes to This Policy",
    paragraphs: [
      "This policy may be updated to reflect changes in website functionality, event operations or legal requirements. A revised version will be posted on this page with an updated effective date. Material changes will be communicated where required by law.",
    ],
  },
  {
    id: "contact",
    title: "Contact and Grievances",
    paragraphs: [
      "Futurex Trade Fair & Events Pvt. Ltd., E-52, 1st Floor, Kalkaji, New Delhi – 110019, India.",
      "Email: info@futurextrade.com | Telephone: +91 98108 55697.",
      "Privacy and grievance queries may be directed to the contact details above. Before publication, the organiser should confirm and identify its designated grievance contact and response procedure, if required by applicable law.",
    ],
  },
];

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      label="Your data. Our responsibility."
      title="Privacy Policy"
      description="Understand what information may be collected, why it is used and how to reach us about your privacy choices."
      updated="22 October 2026"
      sections={sections}
      otherPage={{
        label: "Terms & Conditions",
        href: "/terms-and-conditions",
      }}
    />
  );
}
