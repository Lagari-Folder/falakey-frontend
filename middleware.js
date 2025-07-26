import { NextResponse } from "next/server";

export const config = {
  matcher: ["/challenge/:slug*"], // Only challenge detail pages
};

export default async function middleware(req) {
  const { pathname } = new URL(req.url);

  // Skip static files (important!)
//   if (pathname.startsWith("/static") || pathname.includes(".")) {
//     return NextResponse.next();
//   }

//   const userAgent = req.headers.get("user-agent") || "";
//   const botRegex =
//     /Twitterbot|facebookexternalhit|Facebot|LinkedInBot|Pinterest|Slackbot|vkShare|W3C_Validator/i;
//   const isSocialMediaCrawler = botRegex.test(userAgent);

//   // Let normal users load the app
//   if (!isSocialMediaCrawler) {
//     return NextResponse.next();
//   }

  // TODO: fetch SEO data dynamically using slug from `pathname`
  const title = "Challenge Title";
  const description = "This is a challenge description.";
  const seoImage = "https://yourcdn.com/seo.jpg";
  const author = "Falakey";

  return new Response(
    `
    <!DOCTYPE html>
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
      <meta name="twitter:site" content="@falakey" />
      <meta name="twitter:image" content="${seoImage}" />
    </head>
    <body><p>Social media preview for ${title}</p></body>
    </html>`,
    {
      headers: { "content-type": "text/html" },
    }
  );
}
