module.exports = {
  siteUrl: "https://rational-decision.org",
  changefreq: "monthly",
  priority: 0.7,
  sitemapSize: 5000,
  generateRobotsTxt: true,
  exclude: ["/de/disclosure", "/en/disclosure", "/de/privacy", "/en/privacy", "/next/dist/pages/_error"],
  alternateRefs: [
    {
      href: "https://rational-decision.org",
      hreflang: "en"
    },
    {
      href: "https://rational-decision.org",
      hreflang: "de"
    }
  ],
  // Default transformation function
  transform: async (config, path) => {
    return {
      loc: path, // => this will be exported as http(s)://<config.siteUrl>/<path>
      changefreq: config.changefreq,
      priority: config.priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
      alternateRefs: config.alternateRefs ?? []
    };
  },
  // additionalPaths: async (config) => [await config.transform(config, "/additional-page")],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/"
      }
    ]
  }
};
