const express = require("express");
const path = require("path");
const fetch = require("node-fetch");

const app = express();
const PORT = process.env.PORT || 3000;

// Localized default SEO content
const localizedContent = {
  en: {
    title: "Falakey | Free Stock Photos",
    description:
      "Discover free high-quality stock photos and creative photography challenges.",
    image: "https://falakey-frontend.vercel.app/star-icon.svg",
  },
  ar: {
    title: "فلكي | صور مجانية عالية الجودة",
    description:
      "اكتشف صورًا مجانية عالية الجودة وتحديات إبداعية في التصوير الفوتوغرافي.",
    image: "https://falakey-frontend.vercel.app/star-icon.svg",
  },
};

// Detect social bots
const botRegex =
  /(Twitterbot|facebookexternalhit|Facebot|LinkedInBot|Pinterest|Slackbot|vkShare|W3C_Validator|WhatsApp)/i;

// Helper to generate SEO HTML
function seoHTML(locale, title, description, seoImage, url, error) {
  const errorHTML = error
    ? `<p>Error loading dynamic SEO: ${error.message}</p>`
    : "";
  return `<!DOCTYPE html>
<html lang="${locale}">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${title}</title>
  <meta name="description" content="${description}" />
  <meta property="og:title" content="${title}" />
  <meta property="og:description" content="${description}" />
  <meta property="og:image" content="${seoImage}" />
  <meta property="og:url" content="${url}" />
  <meta property="og:type" content="website" />
</head>
<body>
  <h1>${title}</h1>
  <p>${description}</p>
  ${errorHTML}
</body>
</html>`;
}

// Serve React build files
app.use(express.static(path.join(__dirname, "build")));

app.get("*", async (req, res) => {
  const userAgent = req.headers["user-agent"] || "";
  const url = req.originalUrl;
  const pathname = url.split("?")[0];
  const isBot = botRegex.test(userAgent);

  console.log("Request:", pathname, "User-Agent:", userAgent);

  // If not a bot → Serve the SPA index.html
  if (!isBot) {
    return res.sendFile(path.join(__dirname, "build", "index.html"));
  }

  // Extract path parts (handle routes with or without locale)
  const parts = pathname.split("/").filter(Boolean);
  let locale = "en";
  let routeIndex = 0;

  if (parts[0] === "en" || parts[0] === "ar") {
    locale = parts[0];
    routeIndex = 1;
  }

  const route = parts[routeIndex];
  let {
    title,
    description,
    image: seoImage,
  } = localizedContent[locale] || localizedContent.en;

  try {
    let apiUrl = null;

    if (route === "challenge") {
      const slug = parts[routeIndex + 1];
      if (!slug) throw new Error("No slug provided");
      apiUrl = `https://admin.falakey.com/api/v1/challenges/show/${slug}?locale=${locale}`;
      const response = await fetch(apiUrl);
      const json = await response.json();
      const data = json.data;
      if (data) {
        title = data.title || title;
        description = data.short_description || data.description || description;
        seoImage = data.media?.[0]?.original || seoImage;
      }
    } else if (route === "listing") {
      const picture = parts[routeIndex + 1];
      if (!picture) throw new Error("No picture provided");
      apiUrl = `https://admin.falakey.com/api/v1/posts/show/${picture}?locale=${locale}`;
      const response = await fetch(apiUrl);
      const json = await response.json();
      const data = json.data;
      if (data) {
        title = data.title || title;
        description = data.description || description;
        seoImage = data.preview_links?.original || seoImage;
      }
    } else if (route === "author") {
      const username = parts[routeIndex + 1];
      if (!username) throw new Error("No username provided");
      apiUrl = `https://admin.falakey.com/api/v1/users/${username}/profile/public`;
      const response = await fetch(apiUrl);
      const json = await response.json();
      const data = json.data;
      if (data) {
        title = data.display_name || title;
        description = data.bio || description;
        seoImage = data.avatar || seoImage;
      }
    } else {
      // Route not matched → Return default SEO page
      return res.send(
        seoHTML(
          locale,
          title,
          description,
          seoImage,
          req.protocol + "://" + req.get("host") + req.originalUrl
        )
      );
    }

    return res.send(
      seoHTML(
        locale,
        title,
        description,
        seoImage,
        req.protocol + "://" + req.get("host") + req.originalUrl
      )
    );
  } catch (error) {
    console.error("SEO error:", error);
    return res.send(
      seoHTML(
        locale,
        title,
        description,
        seoImage,
        req.protocol + "://" + req.get("host") + req.originalUrl,
        error
      )
    );
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
