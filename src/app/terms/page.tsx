
import type { Metadata } from "next";

import {
  LegalPage,
  type LegalSection,
} from "@/components/legal/LegalPage";

export const metadata: Metadata = {
  title: "Terms & Conditions | Odisha Mining Expo 2027",
  description:
    "Review website use, visitor and exhibitor registration conditions for Odisha Mining & Infrastructure International Expo 2027.",
  alternates: {
    canonical: "/terms-and-conditions",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const sections: LegalSection[] = [
  {
    id: "acceptance",
    title: "Acceptance of Terms",
    paragraphs: [
      'These Terms & Conditions ("Terms") govern access to and use of odishaminingexpo.com (the "Website"), operated in connection with the 5th Odisha Mining & Infrastructure International Expo 2027 by Futurex Trade Fair & Events Pvt. Ltd. (the "Organiser").',
      "By using the Website, you agree to these Terms. If you do not agree, please discontinue use of the Website. Separate written agreements and published rules may apply to paid exhibitor or sponsorship participation and will prevail on the relevant subject where expressly agreed.",
    ],
  },
  {
    id: "event-information",
    title: "Event Information",
    paragraphs: [
      "The event is scheduled for 7–10 January 2027 at Baramunda Exhibition Ground, Bhubaneswar, Odisha, India. Programme details, exhibitors, schedules, venue arrangements and facilities may change due to operational needs or events outside the Organiser's reasonable control.",
      "Information published on the Website is for general event information. The Organiser will aim to communicate material changes through appropriate channels.",
    ],
  },
  {
    id: "website-use",
    title: "Permitted Website Use",
    bullets: [
      "Use this Website only for lawful, genuine event-related and informational purposes.",
      "Provide accurate information when submitting enquiries or registrations.",
      "Do not attempt unauthorised access, disruption, scraping that harms site operation or the introduction of malicious code.",
      "Do not impersonate another person or organisation, misrepresent affiliation or submit fraudulent registrations.",
      "Do not copy or commercially exploit Website content without appropriate permission, except as permitted by applicable law.",
    ],
  },
  {
    id: "visitor-registration",
    title: "Visitor Registration and Entry",
    paragraphs: [
      "Trade visitor registration is currently advertised as free. Registration submission does not necessarily guarantee admission where identity verification, venue capacity, security, eligibility or other legitimate event requirements apply.",
      "Attendees must follow applicable venue safety instructions and reasonable event conduct requirements. Any age restrictions, access controls, badge requirements or visitor policies should be communicated at registration or entry.",
    ],
  },
  {
    id: "exhibitors",
    title: "Exhibitor and Sponsor Participation",
    paragraphs: [
      "Requests for stand space, exhibitor participation or sponsorship are enquiries unless and until participation is confirmed through an authorised booking process or agreement. Pricing, allocations, payment schedules, cancellation rights, refunds, installation requirements and other commercial terms must be established in the applicable exhibitor or sponsorship agreement.",
      "Exhibitors are responsible for the legality, safety and accuracy of the products, materials, demonstrations and claims they present, as well as compliance with applicable venue and event requirements.",
    ],
  },
  {
    id: "changes",
    title: "Changes, Postponement or Cancellation",
    paragraphs: [
      "The Organiser may adjust the event schedule, activities, participating organisations or venue arrangements where reasonably necessary, including for safety, governmental restrictions or circumstances beyond its reasonable control.",
      "Any rights regarding payments, cancellation, refund or credit for exhibitors and sponsors are governed by their applicable signed agreements and mandatory law. Nothing on this Website alone establishes a refund entitlement or a no-refund policy.",
    ],
  },
  {
    id: "intellectual-property",
    title: "Intellectual Property",
    paragraphs: [
      "Website text, graphics, layouts, branding, photographs, videos and other materials may be protected by copyright, trademark and related rights held by the Organiser or their respective owners.",
      "Third-party exhibitor, sponsor and partner names and logos remain the property of their respective owners. Display of a logo does not imply endorsement beyond the relationship stated on the Website.",
    ],
  },
  {
    id: "photography",
    title: "Photography and Media",
    paragraphs: [
      "Photography, videography and media coverage may take place at the exhibition. Specific arrangements for notice, consent, filming areas and use of identifiable images should be made available at the venue or through relevant event communications in accordance with applicable law.",
    ],
  },
  {
    id: "external-links",
    title: "Third-Party Links and Services",
    paragraphs: [
      "The Website may include links to third-party websites, social media or services. Those services are independently operated and may have different terms and privacy practices. Linking to a third party does not constitute a warranty or endorsement of its offerings.",
    ],
  },
  {
    id: "disclaimers",
    title: "Information and Liability",
    paragraphs: [
      "The Organiser endeavours to keep Website information accurate and current but does not guarantee that all material will be uninterrupted, complete or error-free at all times.",
      "To the extent permitted by applicable law, the Organiser is not responsible for indirect or consequential losses arising solely from Website use or reliance on general informational content. Nothing in these Terms excludes liabilities or consumer rights that cannot lawfully be excluded.",
    ],
  },
  {
    id: "governing-law",
    title: "Governing Law",
    paragraphs: [
      "These Terms are governed by the laws of India. Disputes are subject to the jurisdiction of the competent courts as determined by applicable law and any binding participation agreement. These Terms do not override any mandatory statutory rights or procedures.",
    ],
  },
  {
    id: "amendments",
    title: "Updates to These Terms",
    paragraphs: [
      "These Terms may be revised to reflect changes in the Website, event operations or applicable legal requirements. The current version will be available on this page. Continued use after a revision may constitute acceptance to the extent permitted by law.",
    ],
  },
  {
    id: "contact",
    title: "Contact Information",
    paragraphs: [
      "Futurex Trade Fair & Events Pvt. Ltd., E-52, 1st Floor, Kalkaji, New Delhi – 110019, India.",
      "Email: info@futurextrade.com | Telephone: +91 98108 55697.",
      "For exhibitor or commercial participation questions, refer to the relevant booking documentation or contact the Organiser directly.",
    ],
  },
];

export default function Terms() {
  return (
    <LegalPage
      label="Guidelines & responsibilities"
      title="Terms & Conditions"
      description="Important information about using our website and participating in Odisha Mining & Infrastructure International Expo 2027."
      updated="22 October 2026"
      sections={sections}
      otherPage={{
        label: "Privacy Policy",
        href: "/privacy-policy",
      }}
    />
  );
}
