export const config = {
  matcher: ["/:locale/challenge/:slug*"],
};

export default async function middleware(req) {
  const url = new URL(req.url);
  const pathname = url.pathname;

  const userAgent = req.headers.get("user-agent") || "";
  console.log("Middleware triggered for", pathname, "User-Agent:", userAgent);

  // Skip static files
  if (pathname.startsWith("/static") || pathname.includes(".")) {
    return new Response(null, { status: 404 });
  }

  // Detect social bots
  const botRegex =
    /(Twitterbot|facebookexternalhit|Facebot|LinkedInBot|Pinterest|Slackbot|vkShare|W3C_Validator|WhatsApp)/i;
  const isBot = botRegex.test(userAgent);

  // Normal users just go to React
  // if (!isBot) return;

  // Extract slug/locale
  const parts = pathname.split("/");
  const locale = parts[1] || "en";
  const slug = parts[3] || "";
  if (!slug) return;

  const apiUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/challenges/show/${slug}?locale=${locale}`;
  console.log("Fetching SEO data:", apiUrl);

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) throw new Error("Failed to fetch challenge data");
    const challenge = await response.json()["data"];

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
<html lang="${locale}">
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
<body>
  <h1>${title}</h1>
  <p>${description}</p>
</body>
</html>`,
      {
        headers: { "content-type": "text/html" },
      }
    );
  } catch (error) {
    console.error("Middleware SEO fetch error:", error);
    return;
  }
}
