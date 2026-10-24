
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,

  images: {
    formats: ["image/avif", "image/webp"],
  },

  async redirects() {
    return [
      // EXHIBITOR SHORT LINKS
      {
        source: "/e/c1",
        destination:
          "/exhibitor-registration?utm_source=caller&utm_medium=referral&utm_campaign=odisha_mining_2027&utm_content=caller_1",
        permanent: false,
      },
      {
        source: "/e/c2",
        destination:
          "/exhibitor-registration?utm_source=caller&utm_medium=referral&utm_campaign=odisha_mining_2027&utm_content=caller_2",
        permanent: false,
      },

      // VISITOR SHORT LINKS
      {
        source: "/v/c1",
        destination:
          "/visitor-registration?utm_source=caller&utm_medium=referral&utm_campaign=odisha_mining_2027_visitor&utm_content=caller_1",
        permanent: false,
      },
      {
        source: "/v/c2",
        destination:
          "/visitor-registration?utm_source=caller&utm_medium=referral&utm_campaign=odisha_mining_2027_visitor&utm_content=caller_2",
        permanent: false,
      },

      // EXISTING WEBSITE REDIRECTS
      {
        source: "/index.html",
        destination: "/",
        permanent: true,
      },
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
      {
        source: "/faq.html",
        destination: "/faq",
        permanent: true,
      },
      {
        source: "/visitor-profile",
        destination: "/visit",
        permanent: true,
      },
      {
        source: "/download",
        destination: "/brochure",
        permanent: true,
      },
      {
        source: "/feedback-form",
        destination: "/contact",
        permanent: true,
      },
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
      {
        source: "/why-exhibit",
        destination: "/exhibit",
        permanent: true,
      },
      {
        source: "/visitor",
        destination: "/visit",
        permanent: true,
      },
      {
        source: "/exhibitor",
        destination: "/exhibit",
        permanent: true,
      },
      {
        source: "/about-show",
        destination: "/about",
        permanent: true,
      },
      {
        source: "/exhibitor-profile",
        destination: "/exhibit",
        permanent: true,
      },
      {
        source: "/about-organizers",
        destination: "/about",
        permanent: true,
      },
      {
        source: "/glimpses-odisha-mining-expo",
        destination: "/gallery",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
