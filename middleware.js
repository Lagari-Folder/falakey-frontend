export const config = {
  matcher: [
    "/:locale/challenge/:slug*",
    "/:locale/listing/:picture*",
    "/:locale/author/:username*",
  ],
};

const localizedContent = {
  en: {
    title: "Falakey | Free Stock Photos",
    description:
      "Discover free high-quality stock photos and creative photography challenges.",
    image: "https://falakey.com/star-icon.svg",
  },
  ar: {
    title: "فلكي | صور مجانية عالية الجودة",
    description:
      "اكتشف صورًا مجانية عالية الجودة وتحديات إبداعية في التصوير الفوتوغرافي.",
    image: "https://falakey.com/star-icon.svg",
  },
};

export default async function middleware(req) {
  const url = new URL(req.url);
  const pathname = url.pathname;
  const userAgent = req.headers.get("user-agent") || "";

  console.log("Middleware triggered for", pathname, "User-Agent:", userAgent);

  // Ignore static files
  if (pathname.startsWith("/static")) {
    return new Response(null, { status: 404 });
  }

  const botRegex =
    /(Twitterbot|facebookexternalhit|Facebot|LinkedInBot|Pinterest|Slackbot|vkShare|W3C_Validator|WhatsApp)/i;
  const isBot = botRegex.test(userAgent);

  if (!isBot) {
    return; // SPA handles normal users
  }

  const parts = pathname.split("/");
  const locale = parts[1] || "en";
  const route = parts[2];

  // Default values from localizedContent
  let {
    title,
    description,
    image: seoImage,
  } = localizedContent[locale] || localizedContent.en;

  let apiUrl = null;

  try {
    if (route === "challenge") {
      const slug = parts[3] || "";
      if (!slug) throw new Error("No slug provided in challenge route");

      apiUrl = `https://admin.falakey.com/api/v1/challenges/show/${slug}?locale=${locale}`;
      const response = await fetch(apiUrl);
      if (!response.ok)
        throw new Error(
          `Failed to fetch challenge data, status: ${response.status}`
        );
      const json = await response.json();
      const challenge = json.data;
      if (!challenge) throw new Error("Challenge data missing");

      title = challenge.title || title;
      description =
        challenge.short_description || challenge.description || description;
      seoImage =
        challenge.media && challenge.media.length > 0
          ? challenge.media[0].original
          : seoImage;
    } else if (route === "listing") {
      const picture = parts[3] || "";
      if (!picture) throw new Error("No picture provided in listing route");

      apiUrl = `https://admin.falakey.com/api/v1/posts/show/${picture}?locale=${locale}`;
      const response = await fetch(apiUrl);
      if (!response.ok)
        throw new Error(
          `Failed to fetch picture data, status: ${response.status}`
        );
      const json = await response.json();
      const pictureData = json.data;
      if (!pictureData) throw new Error("Picture data missing");

      title = pictureData.title || title;
      description = pictureData.description || description;
      seoImage = pictureData.preview_links?.original || seoImage;
    } else if (route === "author") {
      const username = parts[3] || "";
      if (!username) throw new Error("No username provided in author route");

      apiUrl = `https://admin.falakey.com/api/v1/users/${username}/profile/public`;
      const response = await fetch(apiUrl);
      if (!response.ok)
        throw new Error(
          `Failed to fetch author data, status: ${response.status}`
        );
      const json = await response.json();
      const author = json.data;
      if (!author) throw new Error("Author data missing");

      title = author.display_name || title;
      description = author.bio || description;
      seoImage = author.avatar || seoImage;
    } else {
      // No matching route, return localized default SEO
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
  <meta property="og:type" content="website" />
</head>
<body>
  <h1>${title}</h1>
  <p>${description}</p>
</body>
</html>`,
        { headers: { "content-type": "text/html" } }
      );
    }

    // Return successful SEO page
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

    // Return localized fallback even on error
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
  <meta property="og:type" content="website" />
</head>
<body>
  <h1>${title}</h1>
  <p>${description}</p>
  <p>Error loading dynamic SEO: ${error.message}</p>
</body>
</html>`,
      { status: 200, headers: { "content-type": "text/html" } }
    );
  }
}
