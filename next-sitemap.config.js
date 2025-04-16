
export default {
    siteUrl: "http://localhost:3000",
    generateRobotsTxt: true,
    sitemapSize: 7000,
    exclude: ["/admin", "/authpage", "/useraccount"],
    robotsTxtOptions: {
      policies: [
        { userAgent: "*", allow: "/" },
        { userAgent: "*", disallow: ["/admin", "/authpage", "/useraccount"] },
      ],
    },
  };