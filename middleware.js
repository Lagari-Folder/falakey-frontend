export const config = {
  matcher: ["/:locale/challenge/:slug*"],
};

export default async function middleware(req) {
  const url = new URL(req.url);
  const pathname = url.pathname;

  // Server-side log (visible in Vercel logs or `vercel dev`)
  console.log("Middleware triggered:", pathname);

  // Skip static assets or file requests
  if (pathname.startsWith("/static") || pathname.includes(".")) {
    return new Response(null, { status: 404 });
  }

  const userAgent = req.headers.get("user-agent") || "";
  const botRegex =
    /Twitterbot|facebookexternalhit|Facebot|LinkedInBot|Pinterest|Slackbot|vkShare|W3C_Validator|WhatsApp/i;

  const isBot = botRegex.test(userAgent);

  // Extract slug and locale
  const parts = pathname.split("/");
  const locale = parts[1] || "en";
  const slug = parts[3] || "";

  // For debugging: show info for normal users in the browser
  if (!isBot) {
    return new Response(
      `
      <html>
        <body>
          <h1>Debug Middleware Output</h1>
          <pre>${JSON.stringify(
            { pathname, locale, slug, userAgent, isBot },
            null,
            2
          )}</pre>
        </body>
      </html>
      `,
      { headers: { "content-type": "text/html" } }
    );
  }

  if (!slug) {
    return; // fallback to SPA if slug is missing
  }

  const apiUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/challenges/show/${slug}?locale=${locale}`;
  console.log("Fetching SEO data from:", apiUrl);

  try {
    const response = await fetch(apiUrl);

    if (!response.ok) throw new Error("Failed to fetch challenge data");

    const challenge = await response.json();

    const title = challenge.title || `Challenge: ${slug}`;
    const description =
      challenge.short_description ||
      challenge.description ||
      `Join the challenge ${slug} now!`;
    const seoImage =
      challenge.media && challenge.media.length > 0
        ? challenge.media[0].original
        : "https://example.com/default-image.png";

    return new Response(
      `<!DOCTYPE html>
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
  } catch (error) {
    console.error("Middleware SEO fetch error:", error);
    return; // Let React handle it on error
  }
}
