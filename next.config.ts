import type { NextConfig } from "next";
const campaign = "odisha_mining_2027";
const links = [
  ["/sv", "/visitor-registration", "social_media", "social", "social"],
  ["/se", "/exhibitor-registration", "social_media", "social", "social"],
  ["/av", "/visitor-registration", "ads", "paid_ads", "cpc"],
  ["/ae", "/exhibitor-registration", "ads", "paid_ads", "cpc"],
  ["/ca", "/contact", "combined_ads", "paid_ads", "cpc"],
  ["/wv", "/visitor-registration", "whatsapp_ads", "whatsapp", "paid_social"],
  ["/we", "/exhibitor-registration", "whatsapp_ads", "whatsapp", "paid_social"],
  ["/gv", "/visitor-registration", "email", "email", "email"],
  ["/ge", "/exhibitor-registration", "email", "email", "email"],
] as const;
const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: { formats: ["image/avif", "image/webp"] },
  async redirects() {
    return [
      ...links.map(([source, target, id, utmSource, medium]) => ({
        source,
        destination: `${target}?utm_source=${utmSource}&utm_medium=${medium}&utm_campaign=${campaign}&utm_content=${id}`,
        permanent: false,
      })),
      ...(["c1", "c2"] as const).flatMap((caller, index) => [
        {
          source: `/e/${caller}`,
          destination: `/exhibitor-registration?utm_source=caller&utm_medium=referral&utm_campaign=${campaign}&utm_content=caller_${index + 1}`,
          permanent: false,
        },
        {
          source: `/v/${caller}`,
          destination: `/visitor-registration?utm_source=caller&utm_medium=referral&utm_campaign=${campaign}_visitor&utm_content=caller_${index + 1}`,
          permanent: false,
        },
      ]),
      { source: "/index.html", destination: "/", permanent: true },
      {
        source: "/exhibitor-registration.html",
        destination: "/exhibitor-registration",
        permanent: true,
      },
      {
        source: "/visitor-registration.html",
        destination: "/visitor-registration",
        permanent: true,
      },
      { source: "/faq.html", destination: "/faq", permanent: true },
      { source: "/visitor-profile", destination: "/visit", permanent: true },
      { source: "/download", destination: "/brochure", permanent: true },
      { source: "/feedback-form", destination: "/contact", permanent: true },
      {
        source: "/mining-exhibitor-registration",
        destination: "/exhibitor-registration",
        permanent: true,
      },
      {
        source: "/contact/index.html",
        destination: "/contact",
        permanent: true,
      },
      {
        source: "/show-catalogue-2022",
        destination: "/brochure",
        permanent: true,
      },
      { source: "/why-exhibit", destination: "/exhibit", permanent: true },
      { source: "/visitor", destination: "/visit", permanent: true },
      { source: "/exhibitor", destination: "/exhibit", permanent: true },
      { source: "/about-show", destination: "/about", permanent: true },
      {
        source: "/exhibitor-profile",
        destination: "/exhibit",
        permanent: true,
      },
      { source: "/about-organizers", destination: "/about", permanent: true },
      {
        source: "/glimpses-odisha-mining-expo",
        destination: "/gallery",
        permanent: true,
      },
    ];
  },
};
export default nextConfig;
