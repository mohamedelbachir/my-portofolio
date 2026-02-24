import type { NextConfig } from "next";
import { createSecureHeaders } from "next-secure-headers";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { hostname: "www.gravatar.com", protocol: "https" },
      { hostname: "bachdev.vercel.app", protocol: "https" },
      { hostname: "img.logo.dev", protocol: "https" },
      { hostname: "i.scdn.co", protocol: "https" },
      { hostname: "shared.akamai.steamstatic.com", protocol: "https" },
      {
        hostname: "oku.ams3.cdn.digitaloceanspaces.com",
        protocol: "https",
      },
      { hostname: "templify.woilasoft.com", protocol: "https" },
      { hostname: "ui.woilasoft.com", protocol: "https" },
    ],
  },

  // biome-ignore lint/suspicious/useAwait: "headers" is async
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: createSecureHeaders({
          // HSTS Preload: https://hstspreload.org/
          forceHTTPSRedirect: [
            true,
            {
              maxAge: 63072000,
              includeSubDomains: true,
              preload: true,
            },
          ],
        }),
      },
    ];
  },

  // biome-ignore lint/suspicious/useAwait: "redirects" is async
  async redirects() {
    return [
      {
        source: "/community",
        destination: "/",
        permanent: true,
      },
      {
        source: "/code",
        destination: "https://github.com/mohamedelbachir",
        permanent: true,
      },
    ];
  },
};

export default withNextIntl(nextConfig);
