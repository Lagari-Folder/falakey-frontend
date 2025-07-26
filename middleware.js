export const config = {
  matcher: ["/ar/challenge/:slug*"],
};

export default async function middleware(req) {
  // const url = new URL(req.url);
  // const pathname = url.pathname;

  console.log("HELLO THERE");
  // // Skip static assets
  // if (pathname.startsWith("/static") || pathname.includes(".")) {
  //   return new Response(null, { status: 404 });
  // }

  // const userAgent = req.headers.get("user-agent") || "";
  // const botRegex =
  //   /Twitterbot|facebookexternalhit|Facebot|LinkedInBot|Pinterest|Slackbot|vkShare|W3C_Validator/i;
  // const isBot = botRegex.test(userAgent);

  // if (!isBot) {
  //   // Let normal users load your React app (fallback to index.html)
  //   return Response.redirect(new URL("/", req.url), 307);
  // }

  // // Extract slug for SEO (e.g. /challenge/my-slug)
  // const slug = pathname.split("/").pop();

  // Ideally, fetch your SEO data here based on slug.
  // For demo, hardcoded data:
  const title = `Challenge: ${slug}`;
  const description = `Details for challenge ${slug}. Join now!`;
  const seoImage = "https://example.com/seo-image.png";

  return new Response(
    `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8" />
      <title>${title}</title>
      <meta name="description" content="${description}" />
      <meta property="og:title" content="${title}" />
      <meta property="og:description" content="${description}" />
      <meta property="og:image" content="${seoImage}" />
      <meta property="og:url" content="${req.url}" />
      <meta property="og:type" content="article" />
      <meta name="twitter:title" content="${title}" />
      <meta name="twitter:description" content="${description}" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:image" content="${seoImage}" />
    </head>
    <body><h1>${title}</h1></body>
    </html>`,
    {
      headers: { "content-type": "text/html" },
    }
  );
}
