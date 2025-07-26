export const config = {
  matcher: ["/:locale/challenge/:slug*"],
};

export default async function middleware(req) {
  const url = new URL(req.url);
  const pathname = url.pathname;

  // Skip static assets or files requests
  if (pathname.startsWith("/static") || pathname.includes(".")) {
    return new Response(null, { status: 404 });
  }

  const userAgent = req.headers.get("user-agent") || "";
  const botRegex =
    /Twitterbot|facebookexternalhit|Facebot|LinkedInBot|Pinterest|Slackbot|vkShare|W3C_Validator/i;
  const isBot = botRegex.test(userAgent);

  if (!isBot) {
    // Redirect normal users to the app, let React handle routing
    return Response.redirect(new URL("/", req.url), 307);
  }

  // Extract slug and locale from URL, assuming /:locale/challenge/:slug
  const parts = pathname.split("/");
  // parts example: ['', 'en', 'challenge', 'my-slug']
  const locale = parts[1] || "en";
  const slug = parts[3] || "";

  if (!slug) {
    // No slug found, fallback
    return Response.redirect(new URL("/", req.url), 307);
  }

  // Compose API URL - replace NEXT_PUBLIC_BASE_URL with your env variable name on Vercel
  const apiUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/challenges/show/${slug}?locale=${locale}`;

  try {
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error("Failed to fetch challenge data");
    }

    /** @type {import('./types').Challenge} */
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

    // Fallback to simple redirect for normal app if fetch fails
    return Response.redirect(new URL("/", req.url), 307);
  }
}
