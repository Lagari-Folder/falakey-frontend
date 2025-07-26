export const config = {
  matcher: [
    "/:locale/challenge/:slug*",
    "/:locale/listing/:picture*",
    "/:locale/author/:username*",
  ],
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
    return;
  }

  const parts = pathname.split("/");

  // Extract locale (assumed always first)
  const locale = parts[1] || "en";

  // Determine route type and extract slug/identifier
  let apiUrl = null;
  let title = "";
  let description = "";
  let seoImage = "";

  try {
    if (pathname.startsWith(`/${locale}/challenge/`)) {
      // /:locale/challenge/:slug
      const slug = parts[3] || "";
      if (!slug) return;

      apiUrl = `https://admin.falakey.com/api/v1/challenges/show/${slug}?locale=${locale}`;

      const response = await fetch(apiUrl);
      if (!response.ok) throw new Error(`Failed to fetch challenge data`);
      const json = await response.json();
      const challenge = json.data;
      if (!challenge) throw new Error("Challenge data missing");

      title = challenge.title || `Challenge: ${slug}`;
      description =
        challenge.short_description ||
        challenge.description ||
        `Join the challenge ${slug} now!`;
      seoImage =
        challenge.media && challenge.media.length > 0
          ? challenge.media[0].original
          : "https://example.com/default-image.png";
    } else if (pathname.startsWith(`/${locale}/listing/`)) {
      // /:locale/listing/:picture
      const picture = parts[3] || "";
      if (!picture) return;

      apiUrl = `https://admin.falakey.com/api/v1/posts/show/${slug}?locale=${local}`;

      const response = await fetch(apiUrl);
      if (!response.ok) throw new Error(`Failed to fetch picture data`);
      const json = await response.json();
      const pictureData = json.data;
      if (!pictureData) throw new Error("Picture data missing");

      title = pictureData.title || `Picture: ${picture}`;
      description = pictureData.description || `View picture ${picture}`;
      seoImage =
        pictureData.media?.original || "https://example.com/default-image.png";
    } else if (pathname.startsWith(`/${locale}/author/`)) {
      // /:locale/author/:username
      const username = parts[3] || "";
      if (!username) return;

      apiUrl = `https://admin.falakey.com/api/v1/users/${username}/profile/public`;

      const response = await fetch(apiUrl);
      if (!response.ok) throw new Error(`Failed to fetch author data`);
      const json = await response.json();
      const author = json.data;
      if (!author) throw new Error("Author data missing");

      title = author.name || `Author: ${username}`;
      description = author.bio || `Explore works by ${author.name || username}`;
      seoImage = author.avatar || "https://example.com/default-image.png";
    } else {
      // If route not matched, let React handle
      return;
    }

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
    return;
  }
}
