export const config = {
  matcher: ["/:locale/challenge/:slug*"],
};

export default async function middleware(req) {
  const url = new URL(req.url);
  const pathname = url.pathname;
  const userAgent = req.headers.get("user-agent") || "";

  console.log("Middleware triggered for", pathname, "User-Agent:", userAgent);

  // Ignore static files (images, js, css, etc.)
  if (pathname.startsWith("/static") || pathname.includes(".")) {
    return new Response(null, { status: 404 });
  }

  // Detect social bots (SEO crawlers)
  const botRegex =
    /(Twitterbot|facebookexternalhit|Facebot|LinkedInBot|Pinterest|Slackbot|vkShare|W3C_Validator|WhatsApp)/i;
  const isBot = botRegex.test(userAgent);

  // If NOT a bot, let the React SPA handle routing
  if (!isBot) {
    return; // return undefined means pass-through
  }

  // Extract locale and slug from /:locale/challenge/:slug
  const parts = pathname.split("/");
  const locale = parts[1] || "en";
  const slug = parts[3] || "";
  if (!slug) {
    return; // fallback to React SPA
  }

  const apiUrl = `https://admin.falakey.com/api/v1/challenges/show/${slug}?locale=${locale}`;
  console.log("Fetching SEO data:", apiUrl);

  try {
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(
        `Failed to fetch challenge data. Status: ${response.status}`
      );
    }

    const json = await response.json();
    const challenge = json.data;
    if (!challenge) {
      throw new Error("Challenge data missing from API response");
    }

    const title = challenge.title || `Challenge: ${slug}`;
    const description =
      challenge.short_description ||
      challenge.description ||
      `Join the challenge ${slug} now!`;
    const seoImage =
      challenge.media && challenge.media.length > 0
        ? challenge.media[0].original
        : "https://example.com/default-image.png";

    // Return SEO-friendly HTML
    return new Response(
      `<!DOCTYPE html>
<html lang="${locale}">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${title}</title>
  <meta name="description" content="${description}" />
  <meta property="og:title" content="${title}" />
  <meta property="og:description" content="${description}" />
  <meta property="og:image" content="${seoImage}" />
  <meta property="og:url" content="${req.url}" />
  <meta property="og:type" content="article" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${title}" />
  <meta name="twitter:description" content="${description}" />
  <meta name="twitter:image" content="${seoImage}" />
</head>
<body>
  <h1>${title}</h1>
  <p>${description}</p>
</body>
</html>`,
      { headers: { "content-type": "text/html" } }
    );
  } catch (error) {
    console.error("Middleware SEO fetch error:", error);

    // On error, fallback to client-side rendering
    return; // Let React handle it
  }
}
