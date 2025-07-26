export const config = {
  matcher: ["/challenge/:slug*"],
};

export default async function middleware(req) {
  const userAgent = req.headers.get("user-agent");

  const socialMediaCrawlerUserAgents =
    /Twitterbot|facebookexternalhit|Facebot|LinkedInBot|Pinterest|Slackbot|vkShare|W3C_Validator/i;
  const isSocialMediaCrawler = socialMediaCrawlerUserAgents.test(userAgent);

  // return the actual page if it's a user request
  if (!isSocialMediaCrawler) {
    return;
  }

  return new Response(
    `
    <html>
    <head>
      <meta charset="UTF-8">
      <title>${title}</title>
      <meta name="title" content="${title}" />
      <meta name="description" content="${description}" />
      <meta name="author" content="${author}" />
      <meta property="og:title" content="${title}" />
      <meta property="og:description" content="${description}" />
      <meta property="og:image" content="${seoImage}" />
      <meta property="og:url" content="${req.url}" />
      <meta property="og:type" content="article" />
      <meta name="twitter:title" content="${title}" />
      <meta name="twitter:description" content="${description}" />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:site" content="@seam_xyz" />
      <meta name="twitter:image" content="${seoImage}" />
    </head>
    <body><img src=${seoImage} /></body>
    </html>`,
    {
      headers: { "content-type": "text/html" },
    }
  );
}
